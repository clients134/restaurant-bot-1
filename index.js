require('dotenv').config();
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const MY_SECRET_KEY = process.env.BOT_KEY || "12345";

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { args: ['--no-sandbox', '--disable-setuid-sandbox'] }
});

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
    console.log('QR CODE SCAN KARO');
});

client.on('ready', () => {
    console.log('Bot Ready Hai! Key ke saath!');
});

client.on('message', async msg => {
    const text = msg.body.toLowerCase();

    if (text === MY_SECRET_KEY) {
        msg.reply('Key Bilkul Sahi Hai! Bot On Ho Gaya.\n\nMenu ke liye 1 likhein\nOrder ke liye 2 likhein');
        return;
    }

    if (text === '1') {
        msg.reply('MENU:\n1. Zinger Burger - 450 Rs\n2. Chicken Karahi - 1200 Rs\n3. Cold Drink - 150 Rs');
    } else if (text === '2') {
        msg.reply('Apna Order Likhein, Hamara Banda Apko Reply Karega.');
    }
});

client.initialize();
