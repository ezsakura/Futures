import tkinter as tk
from tkinter import filedialog, messagebox, Text
import pyexiv2
import datetime


# --- Функции ---
def choose_file():
    file_types = [("Изображения", "*.jpg *.jpeg *.png")]
    filename = filedialog.askopenfilename(filetypes=file_types)
    if filename:
        entry_path.delete(0, tk.END)
        entry_path.insert(0, filename)
        clear_metadata()
        show_thumbnail(filename)


def clear_metadata():
    text_info.delete(1.0, tk.END)
    label_image.config(image=None)
    label_image.image = None


def show_thumbnail(file_path):
    try:
        image = Image.open(file_path)
        image.thumbnail((150, 150))
        photo = ImageTk.PhotoImage(image)
        label_image.config(image=photo)
        label_image.image = photo
    except Exception as e:
        print("Ошибка при отображении миниатюры:", e)


def load_all_metadata(path):
    metadata = {}

    try:
        img = pyexiv2.Image(path)
        exif = img.read_exif()
        iptc = img.read_iptc()
        xmp = img.read_xmp()

        metadata["EXIF"] = exif
        metadata["IPTC"] = iptc
        metadata["XMP"] = xmp

        img.close()
    except Exception as e:
        raise RuntimeError(f"Ошибка чтения метаданных: {e}")

    return metadata


def display_metadata(metadata):
    output = ""

    for section in metadata:
        output += f"\n--- {section} ---\n"
        for key, val in metadata[section].items():
            output += f"{key}: {val}\n"

    text_info.delete(1.0, tk.END)
    text_info.insert(tk.END, output.strip() or "Метаданные отсутствуют")


def show_metadata():
    file_path = entry_path.get()
    if not file_path:
        messagebox.showwarning("Ошибка", "Выберите файл изображения!")
        return

    try:
        metadata = load_all_metadata(file_path)
        display_metadata(metadata)

    except Exception as e:
        messagebox.showerror("Ошибка", f"Не удалось загрузить метаданные: {e}")


def edit_metadata():
    file_path = entry_path.get()
    if not file_path:
        messagebox.showwarning("Ошибка", "Выберите файл изображения!")
        return

    try:
        author = entry_author.get()
        camera_model = entry_camera.get()
        description = entry_description.get()
        title = entry_title.get()
        date_time = entry_datetime.get()
        gps_lat = entry_gps_lat.get()
        gps_lon = entry_gps_lon.get()

        img = pyexiv2.Image(file_path)
        metadata = {
            "EXIF": img.read_exif(),
            "IPTC": img.read_iptc(),
            "XMP": img.read_xmp(),
        }

        # Редактирование
        if author:
            img.modify_exif({"Exif.Image.Artist": author})
        if camera_model:
            img.modify_exif({"Exif.Image.Model": camera_model})
        if description:
            img.modify_exif({"Exif.Image.ImageDescription": description})
        if title:
            img.modify_xmp({"Xmp.dc.title": title})
        if date_time:
            img.modify_exif({"Exif.Photo.DateTimeOriginal": date_time})
        if gps_lat and gps_lon:
            # GPS нужно форматировать правильно
            lat_deg = float(gps_lat)
            lon_deg = float(gps_lon)
            img.modify_exif({
                "Exif.GPSInfo.GPSLatitude": _deg_to_dms(lat_deg),
                "Exif.GPSInfo.GPSLatitudeRef": "N" if lat_deg >= 0 else "S",
                "Exif.GPSInfo.GPSLongitude": _deg_to_dms(lon_deg),
                "Exif.GPSInfo.GPSLongitudeRef": "E" if lon_deg >= 0 else "W",
            })

        new_path = file_path.rsplit(".", 1)[0] + "_modified.jpg"
        img.write(pretty=True)
        img.close()

        os.rename(file_path, new_path)
        messagebox.showinfo("Успех", f"Файл сохранён с новыми метаданными:\n{new_path}")

    except Exception as e:
        messagebox.showerror("Ошибка", f"Не удалось изменить метаданные: {e}")


def _deg_to_dms(deg):
    d = int(deg)
    m = int((deg - d) * 60)
    s = round((deg - d - m/60) * 3600, 2)
    return f"{d}/1,{m}/1,{s}/1"


def delete_all_metadata():
    file_path = entry_path.get()
    if not file_path:
        messagebox.showwarning("Ошибка", "Выберите файл изображения!")
        return

    try:
        from PIL import Image
        image = Image.open(file_path)
        data = list(image.getdata())
        image_without_exif = Image.new(image.mode, image.size)
        image_without_exif.putdata(data)

        new_path = file_path.rsplit(".", 1)[0] + "_clean.jpg"
        image_without_exif.save(new_path)

        messagebox.showinfo("Успех", f"Все метаданные удалены. Сохранено как:\n{new_path}")

    except Exception as e:
        messagebox.showerror("Ошибка", f"Не удалось удалить метаданные: {e}")


def export_metadata_to_txt():
    file_path = entry_path.get()
    if not file_path:
        messagebox.showwarning("Ошибка", "Выберите файл изображения!")
        return

    try:
        metadata = load_all_metadata(file_path)
        save_path = filedialog.asksaveasfilename(defaultextension=".txt", filetypes=[("Текст", "*.txt")])
        if save_path:
            with open(save_path, 'w', encoding='utf-8') as f:
                for section in metadata:
                    f.write(f"\n--- {section} ---\n")
                    for key, val in metadata[section].items():
                        f.write(f"{key}: {val}\n")
            messagebox.showinfo("Успех", f"Метаданные экспортированы в:\n{save_path}")

    except Exception as e:
        messagebox.showerror("Ошибка", f"Не удалось экспортировать метаданные: {e}")


# --- GUI ---
import tkinter as tk
from tkinter import filedialog, messagebox
from PIL import Image, ImageTk

root = tk.Tk()
root.title("Редактор метаданных фото")
root.geometry("800x700")

# Выбор файла
tk.Label(root, text="Путь к файлу:").pack(pady=(10, 0), anchor='w', padx=10)
frame_top = tk.Frame(root)
frame_top.pack(pady=5)
entry_path = tk.Entry(frame_top, width=60)
entry_path.pack(side=tk.LEFT, padx=5)
tk.Button(frame_top, text="Обзор", command=choose_file).pack(side=tk.LEFT)

# Кнопка показать метаданные
tk.Button(root, text="Загрузить метаданные", command=show_metadata).pack(pady=5)

# Миниатюра
label_image = tk.Label(root)
label_image.pack(pady=5)

# Информация о метаданных
text_info = Text(root, wrap=tk.WORD, height=15, width=90)
text_info.pack(padx=10, pady=5)

# Редактирование метаданных
tk.Label(root, text="Редактирование метаданных (только для JPG):").pack(anchor='w', padx=10)

frame_edit = tk.Frame(root)
frame_edit.pack(pady=5)

tk.Label(frame_edit, text="Автор:").grid(row=0, column=0, sticky='w', padx=5)
entry_author = tk.Entry(frame_edit, width=50)
entry_author.grid(row=0, column=1, padx=5)

tk.Label(frame_edit, text="Модель камеры:").grid(row=1, column=0, sticky='w', padx=5)
entry_camera = tk.Entry(frame_edit, width=50)
entry_camera.grid(row=1, column=1, padx=5)

tk.Label(frame_edit, text="Дата (YYYY:MM:DD HH:MM:SS):").grid(row=2, column=0, sticky='w', padx=5)
entry_datetime = tk.Entry(frame_edit, width=50)
entry_datetime.grid(row=2, column=1, padx=5)

tk.Label(frame_edit, text="Описание:").grid(row=3, column=0, sticky='w', padx=5)
entry_description = tk.Entry(frame_edit, width=50)
entry_description.grid(row=3, column=1, padx=5)

tk.Label(frame_edit, text="Заголовок:").grid(row=4, column=0, sticky='w', padx=5)
entry_title = tk.Entry(frame_edit, width=50)
entry_title.grid(row=4, column=1, padx=5)

tk.Label(frame_edit, text="Геопозиция (широта долгота):").grid(row=5, column=0, sticky='w', padx=5)
entry_gps_lat = tk.Entry(frame_edit, width=24)
entry_gps_lat.grid(row=5, column=1, sticky='w', padx=5)
entry_gps_lon = tk.Entry(frame_edit, width=24)
entry_gps_lon.grid(row=5, column=1, sticky='e', padx=5)

# Кнопки действий
btn_frame = tk.Frame(root)
btn_frame.pack(pady=10)

tk.Button(btn_frame, text="Сохранить изменения", command=edit_metadata, width=20).pack(side=tk.LEFT, padx=5)
tk.Button(btn_frame, text="Экспортировать метаданные", command=export_metadata_to_txt, width=20).pack(side=tk.LEFT, padx=5)
tk.Button(btn_frame, text="Удалить все метаданные", command=delete_all_metadata, width=20).pack(side=tk.LEFT, padx=5)

# Запуск
root.mainloop()