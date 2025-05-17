import asyncio

from telethon.sync import TelegramClient, events

api_id = 'ВАШ API ID' # Замените на ваш API ID

api_hash = 'ВАШ API Hash' # Замените на ваш API Hash

phone = 'ВАШ НОМЕР ТЕЛЕФОНА' # Замените на ваш номер телефона

async def main():

async with TelegramClient(phone, api_id, api_hash) as client:

# Получаем идентификатор своего аккаунта

me = await client.get_me()

@client.on(events.NewMessage)

async def handler(event):

sender = await event.get_sender()

# Проверяем, не отправитель ли это мы сами

if sender.id != me.id:

# Проверяем тип чата (убрать условие, если нужны посты из каналов)

if event.is_private or event.is_group:

await event.message.forward_to('me')

print(f"Переслано новое сообщение от {sender.first_name}: {event.message.message}")

print("Запущен обработчик новых сообщений")

# Ожидание отключения (вместо бесконечного цикла)

await client.run_until_disconnected()

# Запускаем функцию main() с помощью asyncio.run()

asyncio.run(main())