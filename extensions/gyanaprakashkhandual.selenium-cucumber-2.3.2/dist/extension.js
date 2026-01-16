"use strict";var k=Object.create;var p=Object.defineProperty;var D=Object.getOwnPropertyDescriptor;var T=Object.getOwnPropertyNames;var y=Object.getPrototypeOf,E=Object.prototype.hasOwnProperty;var c=(t,e)=>p(t,"name",{value:e,configurable:!0});var W=(t,e)=>{for(var n in e)p(t,n,{get:e[n],enumerable:!0})},C=(t,e,n,s)=>{if(e&&typeof e=="object"||typeof e=="function")for(let a of T(e))!E.call(t,a)&&a!==n&&p(t,a,{get:()=>e[a],enumerable:!(s=D(e,a))||s.enumerable});return t};var S=(t,e,n)=>(n=t!=null?k(y(t)):{},C(e||!t||!t.__esModule?p(n,"default",{value:t,enumerable:!0}):n,t)),N=t=>C(p({},"__esModule",{value:!0}),t);var U={};W(U,{activate:()=>$,deactivate:()=>R});module.exports=N(U);var i=S(require("vscode")),g=S(require("path"));function $(t){let e=i.commands.registerCommand("cucumberStepGen.generateStep",async()=>await w()),n=i.commands.registerCommand("cucumberStepGen.configure",async()=>await v()),s=i.commands.registerCommand("cucumberStepGen.createStepFile",async()=>await b()),a=i.commands.registerCommand("cucumberStepGen.quickActions",async()=>await G());t.subscriptions.push(e,n,s,a);let o=i.window.createStatusBarItem(i.StatusBarAlignment.Right,100);o.command="cucumberStepGen.quickActions",o.text="$(code) Cucumber Steps",o.tooltip="Cucumber Step Definition Generator - Click for quick actions",o.show(),t.subscriptions.push(o),t.subscriptions.push(i.commands.registerCommand("cucumberStepGen.generateFromSelection",async()=>{await w(!0)})),V()}c($,"activate");async function G(){let t=[{label:"$(code) Generate Step Definitions",description:"Generate step definitions from current file or selection",action:"generate"},{label:"$(file-add) Create Step Definition File",description:"Create a new step definition file",action:"createFile"},{label:"$(gear) Configure Settings",description:"Configure generation settings",action:"configure"},{label:"$(info) About Extension",description:"View extension information",action:"about"}],e=await i.window.showQuickPick(t,{placeHolder:"Select an action",matchOnDescription:!0});if(e)switch(e.action){case"generate":await w();break;case"createFile":await b();break;case"configure":await v();break;case"about":await O();break}}c(G,"showQuickActions");async function w(t=!1){try{let e=i.window.activeTextEditor;if(!e){i.window.showErrorMessage(" No active editor found. Please open a Cucumber feature file.");return}let n=e.document;if(!A(n)&&await i.window.showWarningMessage("This doesn't appear to be a Cucumber feature file. Continue anyway?","Yes","No")!=="Yes")return;await i.window.withProgress({location:i.ProgressLocation.Notification,title:"Generating Step Definitions",cancellable:!1},async s=>{s.report({increment:10,message:"Parsing steps..."});let a="",o="";if(t||!e.selection.isEmpty){let m=e.selection;a=n.getText(m).trim(),o=` (${m.end.line-m.start.line+1} lines selected)`}else a=n.getText(),o=" (entire file)";if(s.report({increment:30,message:"Processing steps..."}),!a){i.window.showWarningMessage("No content to process.");return}let l=a.split(`
`).map(m=>m.trim()),u=B(l);if(u.length===0){i.window.showWarningMessage(`No valid Cucumber steps found${o}. Make sure your steps start with Given, When, Then, or And.`);return}s.report({increment:40,message:"Generating code..."});let r=h(),d=await x(u,r);s.report({increment:80,message:"Copying to clipboard..."}),await i.env.clipboard.writeText(d),s.report({increment:100,message:"Complete!"});let f=await i.window.showInformationMessage(`Generated ${u.length} step definition(s)${o} and copied to clipboard!`,"Create File","View Output","Configure");f==="Create File"?await b(d):f==="View Output"?await H(d):f==="Configure"&&await v()})}catch(e){let n=e instanceof Error?e.message:"Unknown error occurred";i.window.showErrorMessage(`\u274C Error generating step definitions: ${n}`),console.error("Step generation error:",e)}}c(w,"generateStepDefinitions");function A(t){let e=g.basename(t.fileName).toLowerCase(),n=t.getText();return e.endsWith(".feature")||/^\s*(Feature:|Scenario:|Given|When|Then|And)/m.test(n)}c(A,"isValidCucumberFile");function B(t){let e=/^(Given|When|Then|And|But)\s+/,n=new Set;for(let s of t){let a=s.trim();if(!(!a||a.startsWith("#")||a.startsWith("Feature:")||a.startsWith("Scenario:")||a.startsWith("Background:")||a.startsWith("Examples:")||a.startsWith("|"))&&e.test(a)){let o=a;(a.startsWith("And ")||a.startsWith("But "))&&(o=a.replace(/^(And|But)\s+/,"Given ")),n.add(o)}}return Array.from(n)}c(B,"getValidCucumberSteps");async function x(t,e){let n=t.map(l=>I(l)),s=new Set,a=L(e),o=n.map(l=>l?P(l,s,e):"").filter(l=>l!=="").join(`

`);return a+=o,a+=j(e),q(a)}c(x,"generateAdvancedStepDefinitions");function I(t){let e=t.match(/^(Given|When|Then|And|But)\s+(.*)$/);if(!e)return null;let n=e[1]==="And"||e[1]==="But"?"Given":e[1],s=e[2],a=[],o=s;o=o.replace(/"([^"]*)"/g,(u,r)=>(a.push(`String param${a.length+1}`),'"(.*?)"')),o=o.replace(/<([^>]*)>/g,(u,r)=>(a.push(`String ${r.replace(/\s+/g,"_").toLowerCase()}`),"(.*)")),o=o.replace(/\b\d+\b/g,u=>(a.push(`int number${a.length+1}`),"(\\d+)"));let l=F(s);return{originalStep:t,annotation:n,stepText:s,parameters:a,methodName:l,parameterizedRegex:o}}c(I,"parseStep");function F(t){return t.replace(/[^a-zA-Z0-9\s]/g,"").trim().split(/\s+/).map((e,n)=>n===0?e.toLowerCase():e.charAt(0).toUpperCase()+e.slice(1).toLowerCase()).join("").replace(/^\d+/,"")||"generatedStep"}c(F,"generateMethodName");function P(t,e,n){let s=t.methodName,a=1,o=s;for(;e.has(o);)o=`${s}${a}`,a++;e.add(o);let l=t.parameters.join(", "),u=t.parameters.length>0?l:"",r="";return r+=`    /**
`,r+=`     * Step: ${t.originalStep}
`,t.parameters.length>0&&(r+=`     * Parameters: ${t.parameters.length}
`),r+=`     */
`,r+=`    @${t.annotation}("^${t.parameterizedRegex}$")
`,r+=`    public void ${o}(${u}) {
`,r+=`        try {
`,r+=`            // TODO: Implement step logic for: ${t.stepText}
`,t.parameters.length>0&&(r+=`            // Available parameters:
`,t.parameters.forEach((d,f)=>{r+=`            //   ${d}
`})),r+=M(t.annotation,t.stepText),r+=`            
`,r+=`            // Add assertions for verification
`,r+=`            // Assert.assertTrue("Step verification failed", condition);
`,r+=`            
`,r+=`        } catch (Exception e) {
`,r+=`            throw new RuntimeException("Failed to execute step: ${t.stepText}", e);
`,r+=`        }
`,r+="    }",r}c(P,"generateAdvancedStepDefinition");function M(t,e){let n="",s=e.toLowerCase();switch(t.toLowerCase()){case"given":n+=`            // Setup/precondition logic
`,s.includes("navigate")||s.includes("open")?n+=`            // driver.get("URL");
`:s.includes("login")||s.includes("user")?n+=`            // Perform login or user setup
`:n+=`            // Setup test data or initial state
`;break;case"when":n+=`            // Action/interaction logic
`,s.includes("click")?(n+=`            // WebElement element = driver.findElement(By.id("elementId"));
`,n+=`            // element.click();
`):s.includes("enter")||s.includes("input")?(n+=`            // WebElement inputField = driver.findElement(By.id("inputId"));
`,n+=`            // inputField.sendKeys("value");
`):s.includes("select")?(n+=`            // Select dropdown = new Select(driver.findElement(By.id("selectId")));
`,n+=`            // dropdown.selectByVisibleText("optionText");
`):n+=`            // Perform the main action
`;break;case"then":n+=`            // Verification/assertion logic
`,s.includes("should see")||s.includes("displayed")?(n+=`            // WebElement element = driver.findElement(By.id("elementId"));
`,n+=`            // Assert.assertTrue("Element should be displayed", element.isDisplayed());
`):s.includes("text")||s.includes("contains")?(n+=`            // String actualText = driver.findElement(By.id("elementId")).getText();
`,n+=`            // Assert.assertTrue("Text verification failed", actualText.contains("expectedText"));
`):n+=`            // Verify the expected outcome
`;break;default:n+=`            // Implement step logic
`}return n}c(M,"generateStepTemplate");function L(t){let e="";t.packageName&&(e+=`package ${t.packageName};

`);let n=["io.cucumber.java.en.Given","io.cucumber.java.en.When","io.cucumber.java.en.Then","org.openqa.selenium.WebDriver","org.openqa.selenium.WebElement","org.openqa.selenium.By","org.openqa.selenium.support.ui.Select","org.openqa.selenium.support.ui.WebDriverWait","org.testng.Assert","java.time.Duration"];return[...new Set([...n,...t.imports])].forEach(a=>{e+=`import ${a};
`}),e+=`
`,e+=`/**
`,e+=` * Cucumber Step Definitions
`,e+=` * Generated by Selenium-Cucumber Extension
`,e+=` * 
`,e+=` * This class contains step definitions for Cucumber scenarios.
`,e+=` * Each method represents a step that can be used in feature files.
`,e+=` */
`,t.baseTestClass?e+=`public class ${t.className} extends ${t.baseTestClass} {

`:e+=`public class ${t.className} {

`,e+=`    private WebDriver driver;
`,e+=`    private WebDriverWait wait;

`,e+=`    public ${t.className}() {
`,e+=`        // Initialize WebDriver and WebDriverWait if needed
`,e+=`        // this.driver = DriverManager.getDriver();
`,e+=`        // this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
`,e+=`    }

`,e}c(L,"generateClassHeader");function j(t){let e=`
`;return e+=`    /**
`,e+=`     * Helper method to find element with wait
`,e+=`     */
`,e+=`    private WebElement findElementWithWait(By locator) {
`,e+=`        return wait.until(driver -> driver.findElement(locator));
`,e+=`    }

`,e+=`    /**
`,e+=`     * Helper method to verify element is displayed
`,e+=`     */
`,e+=`    private boolean isElementDisplayed(By locator) {
`,e+=`        try {
`,e+=`            return driver.findElement(locator).isDisplayed();
`,e+=`        } catch (Exception e) {
`,e+=`            return false;
`,e+=`        }
`,e+=`    }
`,e+=`}
`,e}c(j,"generateClassFooter");function q(t){let e=t.split(`
`),n=0,s=4;return e.map(o=>{let l=o.trim();if(!l)return"";(l==="}"||l.startsWith("} "))&&(n=Math.max(0,n-1));let u=" ".repeat(n*s)+l;return l.endsWith("{")&&n++,u}).join(`
`)}c(q,"formatJavaCode");function h(){let t=i.workspace.getConfiguration("cucumberStepGen");return{packageName:t.get("packageName","com.example.stepdefinitions"),className:t.get("className","StepDefinitions"),baseTestClass:t.get("baseTestClass",""),imports:t.get("imports",[]),annotations:t.get("annotations",[]),framework:t.get("framework","cucumber")}}c(h,"getConfiguration");function V(){let t=i.workspace.getConfiguration("cucumberStepGen");t.has("packageName")||t.update("packageName","com.example.stepdefinitions",i.ConfigurationTarget.Global),t.has("className")||t.update("className","StepDefinitions",i.ConfigurationTarget.Global)}c(V,"initializeConfiguration");async function v(){let t=h(),e=await i.window.showInputBox({prompt:"Enter package name",value:t.packageName,placeHolder:"com.example.stepdefinitions"});if(e===void 0)return;let n=await i.window.showInputBox({prompt:"Enter class name",value:t.className,placeHolder:"StepDefinitions"});if(n===void 0)return;let s=await i.window.showInputBox({prompt:"Enter base test class (optional)",value:t.baseTestClass,placeHolder:"BaseTest"}),a=i.workspace.getConfiguration("cucumberStepGen");await a.update("packageName",e,i.ConfigurationTarget.Global),await a.update("className",n,i.ConfigurationTarget.Global),await a.update("baseTestClass",s||"",i.ConfigurationTarget.Global),i.window.showInformationMessage("Configuration updated successfully!")}c(v,"showConfigurationDialog");async function b(t){t||(t=await z());let e=await i.window.showInputBox({prompt:"Enter file name",value:"StepDefinitions.java",placeHolder:"StepDefinitions.java"});if(!e)return;let n=i.workspace.workspaceFolders;if(!n){i.window.showErrorMessage("No workspace folder found. Please open a folder first.");return}let s=g.join(n[0].uri.fsPath,e),a=i.Uri.file(s);try{await i.workspace.fs.writeFile(a,Buffer.from(t));let o=await i.workspace.openTextDocument(a);await i.window.showTextDocument(o),i.window.showInformationMessage(`Step definition file created: ${e}`)}catch(o){i.window.showErrorMessage(`Failed to create file: ${o}`)}}c(b,"createStepDefinitionFile");async function z(){let t=h();return await x(["Given I am on the homepage","When I click on the login button","Then I should see the login form"],t)}c(z,"generateDefaultStepDefinitionFile");async function H(t){let e=await i.workspace.openTextDocument({content:t,language:"java"});await i.window.showTextDocument(e,{preview:!0,viewColumn:i.ViewColumn.Beside})}c(H,"showOutputPreview");async function O(){let t=`
 Selenium-Cucumber Extension

Version: 1.0.0
Author: Gyana Prakash Khandual

Features:
\u2705 Generate step definitions from Cucumber steps
\u2705 Support for parameterized steps
\u2705 Configurable package and class names
\u2705 Professional code formatting
\u2705 Error handling and validation
\u2705 Quick actions and shortcuts

Support: github.com/gyanaprakashkhandual/selenium-cucumber-extension
  `.trim();i.window.showInformationMessage(t,{modal:!0})}c(O,"showAboutDialog");function R(){}c(R,"deactivate");0&&(module.exports={activate,deactivate});
