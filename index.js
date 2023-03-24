
const express = require('express')
const expressApp = express()
const axios = require("axios");
expressApp.use(express.static('static'))
expressApp.use(express.json());
require('dotenv').config();
// const cron = require('node-cron');
const { TOKEN } = process.env
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`
const { Telegraf } = require('telegraf');
const telegrafGetChatMembers = require('telegraf-getchatmembers')
const bot = new Telegraf(process.env.TOKEN);
 
const fs = require('fs');


bot.use(telegrafGetChatMembers)

bot.command('all', async (ctx) => {
    console.log(ctx);
    let txt = `[Bi](tg://user?id=1713158826) [Ty](tg://user?id=1959826105) [Rot](tg://user?id=1730449615) [Chuong](tg://user?id=5376812878) [Thim](tg://user?id=1756511821) [Long](tg://user?id=5035545397)`
    await axios.post(`${TELEGRAM_API}/sendMessage`, {
        chat_id: ctx.chat.id,
        parse_mode: "MarkdownV2",
        text: txt
    })
});

bot.command('quy', async (ctx) => {
   try {
    let txt = `Đóng quỹ đi [Bi](tg://user?id=1713158826) [Ty](tg://user?id=1959826105) [Rot](tg://user?id=1730449615) [Chuong](tg://user?id=5376812878)`
    await axios.post(`${TELEGRAM_API}/sendMessage`, {
        chat_id: ctx.chat.id,
        parse_mode: "MarkdownV2",
        text: txt
    })

    // send photo
    let filePath  = 'momo.jpg';
    const photo = fs.createReadStream(filePath);
    await ctx.replyWithPhoto({ source: photo }, { chat_id: ctx.chat.id });
   } catch (error) {
    console.error('Error sending:', error);
   }
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

// # Use the hash sign to prefix a comment
// # +---------------- minute (0 - 59)
// # |  +------------- hour (0 - 23)
// # |  |  +---------- day of month (1 - 31)    
// # |  |  |  +------- month (1 - 12)
// # |  |  |  |  +---- day of week (0 - 7) (Sunday=0 or 7)
// # |  |  |  |  |
// # *  *  *  *  *  command to be executed


// cron.schedule('0 9 * * 1', () => {
//     // sendMessage();
//     console.log("cronjob run");
//   });

bot.launch()

function sendMessageToGroup(member) {
    member.message.from.id
}