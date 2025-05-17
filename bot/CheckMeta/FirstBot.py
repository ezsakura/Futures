#!/usr/bin/env python3
# meta_viewer_gui.py — GUI-просмотрщик EXIF-метаданных с отображением GPS

import tkinter as tk
from tkinter import filedialog, messagebox, ttk
from PIL import Image
from PIL.ExifTags import TAGS, GPSTAGS

def get_exif_data(image_path):
    """Читает EXIF-данные и возвращает словарь тегов."""
    print(f"\n[DEBUG] Попытка чтения EXIF из файла: {image_path}")
    try:
        with Image.open(image_path) as img:
            info = img._getexif()
    except Exception as e:
        print(f"[ERROR] Ошибка открытия файла: {str(e)}")
        return {}

    if not info:
        print("[DEBUG] EXIF данные не найдены")
        return {}
    
    exif = {}
    for tag_id, value in info.items():
        tag = TAGS.get(tag_id, tag_id)
        if tag == "GPSInfo":
            gps_data = {}
            for t in value:
                sub_tag = GPSTAGS.get(t, t)
                gps_data[sub_tag] = value[t]
            exif[tag] = gps_data
        else:
            exif[tag] = value
    
    print(f"[DEBUG] Найдено EXIF-тегов: {len(exif)}")
    return exif

def _ratio_to_float(ratio):
    """Конвертирует кортеж (num, den) или число в float."""
    try:
        num, den = ratio
        return float(num) / float(den)
    except Exception:
        return float(ratio)

def get_gps_coordinates(gps_info):
    """Из GPSInfo-словаря возвращает (lat, lon) в десятичных градусах."""
    print("[DEBUG] Обработка GPS данных...")
    try:
        lat_vals = gps_info["GPSLatitude"]
        lat_ref = gps_info["GPSLatitudeRef"]
        lon_vals = gps_info["GPSLongitude"]
        lon_ref = gps_info["GPSLongitudeRef"]
    except KeyError as e:
        print(f"[ERROR] Отсутствует GPS-тег: {str(e)}")
        return None

    def convert(dms, ref):
        d = _ratio_to_float(dms[0])
        m = _ratio_to_float(dms[1])
        s = _ratio_to_float(dms[2])
        dec = d + (m / 60.0) + (s / 3600.0)
        if ref in ["S", "W"]:
            dec = -dec
        return dec

    lat = convert(lat_vals, lat_ref)
    lon = convert(lon_vals, lon_ref)
    print(f"[DEBUG] Преобразованные координаты: {lat}, {lon}")
    return (lat, lon)

class MetadataViewer(tk.Tk):
    def __init__(self):
        super().__init__()
        self.title("Просмотрщик EXIF-метаданных")
        self.geometry("750x550")

        btn = tk.Button(self, text="Открыть изображение…", command=self.open_file)
        btn.pack(pady=10)

        cols = ("Тег", "Значение")
        self.tree = ttk.Treeview(self, columns=cols, show="headings")
        for c in cols:
            self.tree.heading(c, text=c)
            self.tree.column(c, width=350, anchor="w")
        self.tree.pack(expand=True, fill="both", padx=10, pady=10)

        gps_frame = tk.Frame(self)
        gps_frame.pack(pady=5)
        self.lat_var = tk.StringVar(value="Широта: n/a")
        self.lon_var = tk.StringVar(value="Долгота: n/a")
        tk.Label(gps_frame, textvariable=self.lat_var).pack(side="left", padx=10)
        tk.Label(gps_frame, textvariable=self.lon_var).pack(side="left", padx=10)

    def open_file(self):
        path = filedialog.askopenfilename(
            title="Выберите изображение",
            filetypes=[
                ("Изображения (JPG, JPEG, PNG)", "*.jpg *.jpeg *.png"),
                ("Все файлы", "*.*")
            ]
        )
        if not path:
            print("[DEBUG] Файл не выбран")
            return

        print(f"\n{'='*50}\n[DEBUG] Выбран файл: {path}")
        
        # Проверка расширения
        ext = path.lower().rsplit(".", 1)[-1] if "." in path else ""
        print(f"[DEBUG] Расширение файла: {ext}")
        if ext not in ("jpg", "jpeg", "png"):
            print("[ERROR] Неподдерживаемое расширение")
            messagebox.showerror("Ошибка", "Поддерживаются только JPG, JPEG и PNG-файлы.")
            return

        # Проверка формата через Pillow
        try:
            with Image.open(path) as img:
                fmt = img.format.upper()
                print(f"[DEBUG] Формат Pillow: {fmt}")
        except Exception as e:
            print(f"[ERROR] Ошибка Pillow: {str(e)}")
            messagebox.showerror("Ошибка", f"Некорректный формат файла:\n{str(e)}")
            return

        if fmt not in ("JPEG", "PNG"):
            print(f"[ERROR] Неподдерживаемый формат Pillow: {fmt}")
            messagebox.showerror("Ошибка", f"Найден формат {fmt}, ожидался JPEG/PNG.")
            return

        # Чтение EXIF
        try:
            exif = get_exif_data(path)
        except Exception as e:
            print(f"[ERROR] Ошибка чтения EXIF: {str(e)}")
            messagebox.showerror("Ошибка", f"Не удалось прочитать EXIF:\n{str(e)}")
            return

        # Очистка предыдущих данных
        for item in self.tree.get_children():
            self.tree.delete(item)
        self.lat_var.set("Широта: n/a")
        self.lon_var.set("Долгота: n/a")

        if not exif:
            print("[DEBUG] EXIF отсутствуют")
            messagebox.showinfo("Информация", "EXIF-метаданные не найдены.")
            return

        # Заполнение таблицы
        print("\n[DEBUG] Содержимое EXIF:")
        for tag, val in exif.items():
            display_val = str(val)[:100] + "..." if len(str(val)) > 100 else str(val)
            print(f"  {tag}: {display_val}")
            self.tree.insert("", "end", values=(tag, display_val))

        # Обработка GPS
        gps_info = exif.get("GPSInfo")
        if gps_info:
            print("\n[DEBUG] Обнаружены GPS-теги:")
            for k, v in gps_info.items():
                print(f"  {k}: {str(v)[:50]}")
            
            coords = get_gps_coordinates(gps_info)
            if coords:
                lat, lon = coords
                print(f"[DEBUG] Координаты: {lat:.6f}, {lon:.6f}")
                self.lat_var.set(f"Широта: {lat:.6f}°")
                self.lon_var.set(f"Долгота: {lon:.6f}°")
            else:
                print("[WARNING] Не удалось извлечь координаты")

if __name__ == "__main__":
    print("[DEBUG] Приложение запущено")
    app = MetadataViewer()
    app.mainloop()