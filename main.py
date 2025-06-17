from aiogram import Bot, Dispatcher, types
from aiogram.filters import Command

bot = Bot(token="8089362822:AAHQWUfQuciGzzBghHV9Dh1MOeBCMcI_FaU")
dp = Dispatcher()

@dp.message(Command(commands=["start"]))
async def start(message: types.Message):
     await message.answer("👋Привет ты попал в игру кликер, зарабатывай деньги и получай удовольствие от этой игры!")
dp.run_polling(bot)