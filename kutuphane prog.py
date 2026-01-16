
kutuphane = []

def kitap_ekle():
    kitap_adi = input("Kitap adi gir: ")
    yazar_adi = input("Yazar adi gir: ")
    yil = input("Basim yili gir: ")

    kitap = {
        "ad": kitap_adi,
        "yazar": yazar_adi,
        "yil": yil
    }

    kutuphane.append(kitap)
    print("Kitap basariyla eklendi")

def kitaplari_listele():
    if not kutuphane:
        print("Kutuphane bos")
        return

    for sira, kitap in enumerate(kutuphane, start=1):
        print(sira, "-", kitap["ad"], "|", kitap["yazar"], "|", kitap["yil"])

def kitap_sil():
    kitaplari_listele()
    if not kutuphane:
        return

    try:
        no = int(input("Silinecek kitap numarasi: "))
        kutuphane.pop(no - 1)
        print("Kitap silindi")
    except:
        print("Hatali giris")

def menu():
    while True:
        print("\nKutuphane Menu")
        print("1 - Kitap Ekle")
        print("2 - Kitaplari Listele")
        print("3 - Kitap Sil")
        print("4 - Cikis")

        secim = input("Secim yap: ")

        if secim == "1":
            kitap_ekle()
        elif secim == "2":
            kitaplari_listele()
        elif secim == "3":
            kitap_sil()
        elif secim == "4":
            print("Program kapandi")
            break
        else:
            print("Gecersiz secim")

menu()
