
const express = require('express')
const expressApp = express()
const axios = require("axios");
expressApp.use(express.static('static'))
expressApp.use(express.json());
require('dotenv').config();

const { TOKEN } = process.env
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`


const { Telegraf } = require('telegraf');
const telegrafGetChatMembers = require('telegraf-getchatmembers')

const bot = new Telegraf(process.env.TOKEN);
 
bot.use(telegrafGetChatMembers)

bot.command('all', async (ctx) => {
    let txt = `[Bi](tg://user?id=1713158826) [Ty](tg://user?id=1959826105) [Rot](tg://user?id=1730449615) [Chuong](tg://user?id=5376812878) [Thim](tg://user?id=1756511821) [Long](tg://user?id=5035545397)`
    await axios.post(`${TELEGRAM_API}/sendMessage`, {
        chat_id: ctx.chat.id,
        parse_mode: "MarkdownV2",
        text: txt
    })
});

bot.command('quy', async (ctx) => {
    let txt = `Đóng quỹ đi mấy thằng lồn [Bi](tg://user?id=1713158826) [Ty](tg://user?id=1959826105) [Rot](tg://user?id=1730449615) [Chuong](tg://user?id=5376812878)`
    await axios.post(`${TELEGRAM_API}/sendMessage`, {
        chat_id: ctx.chat.id,
        parse_mode: "MarkdownV2",
        text: txt
    })
});

bot.command('quydone', async (ctx) => {
    let txt = `Quỹ tuần ni đủ rồi háy [Bi](tg://user?id=1713158826) [Ty](tg://user?id=1959826105) [Rot](tg://user?id=1730449615) [Chuong](tg://user?id=5376812878)`
    await axios.post(`${TELEGRAM_API}/sendMessage`, {
        chat_id: ctx.chat.id,
        parse_mode: "MarkdownV2",
        text: txt
    })
});

bot.command('help', async (ctx) => {
    const message = "/quy: Nhắc nộp quỹ \n\/quydone: Thông báo nộp quỹ đầy đủ\n\/all: Tag all"
    bot.telegram.sendMessage(ctx.chat.id, message, {})
});

bot.launch()