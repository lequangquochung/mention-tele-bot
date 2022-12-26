require('dotenv').config()
const express = require('express')
const axios = require('axios')
const bodyParser = require('body-parser')
const {html: format} = require('telegram-format');
// const {markdownv2: format} = require('telegram-format');


const { TOKEN, SERVER_URL } = process.env
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`
const URI = `/webhook/${TOKEN}`
const WEBHOOK_URL = SERVER_URL + URI

const app = express()
app.use(bodyParser.json())

const init = async () => {
    const res = await axios.get(`${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`)
    console.log(res.data)
}

app.post(URI, async (req, res) => {
    console.log(req.body.message)

    

    const chatId= req.body.message?.chat.id
    const text = req.body.message?.text
    const isMention = req.body.message?.entities?.length
    

    if(isMention && text.startsWith('@pgd_mention_bot')){
      if(text === "@pgd_mention_bot " +"ty") {
        
        await axios.post(`${TELEGRAM_API}/sendMessage`, {
          chat_id: chatId,
          text: "la mot nguoi tot"
        })
      }
      else if(text === "@pgd_mention_bot " + "thim"){
        await axios.post(`${TELEGRAM_API}/sendMessage`, {
          chat_id: chatId,
          text: "la mot nguoi xau"
        })
      }
      else if(text === "@pgd_mention_bot " + "long"){
        await axios.post(`${TELEGRAM_API}/sendMessage`, {
          chat_id: chatId,
      
          text: "@Long la mot thang map"
        })
      } 
       else {
         let txt = "[Snow min](tg://user?id=5441762434) [Pi](tg://user?id=1713158826) "
        await axios.post(`${TELEGRAM_API}/sendMessage`, {
          chat_id: chatId,
          parse_mode: "MarkdownV2",
          text: [Everyone] + txt
        })
      }
     
    }
    // console.log('isMention',isMention);
    // (tg://user?id=1713158826) 
    
    return res.send()
})

app.listen(process.env.PORT || 5000, async () => {
    console.log('🚀 app running on port', process.env.PORT || 5000)
    await init()
})