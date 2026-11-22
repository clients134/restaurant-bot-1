const { Client, LocalAuth } = require('whatsapp-web.js');

const PHONE_NUMBER = '923001234567'; // <-- Yahan apna number likho, + ke baghair

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--disable-gpu',
            '--disable-extensions'
        ],
        timeout: 300000
    }
});

client.on('qr', (qr) => {
    console.log('QR RECEIVED');
});

client.on('ready', () => {
    console.log('BOT IS READY! Restaurant Bot is Online!');
});

client.on('authenticated', () => {
    console.log('AUTHENTICATED SUCCESSFULLY!');
});

client.on('auth_failure', (msg) => {
    console.log('AUTH FAILURE: ' + msg);
});

client.on('disconnected', (reason) => {
    console.log('DISCONNECTED: ' + reason);
});

const menu = `🍽️ *Welcome to Our Restaurant!* 🍽️

Please choose:
1️⃣ - View Menu
2️⃣ - Place Order
3️⃣ - Timings / Location
4️⃣ - Talk to Staff`;

const fullMenu = `📋 *OUR MENU* 📋

🍔 *Burgers*
1. Zinger Burger - Rs 550
2. Beef Burger - Rs 650
3. Chicken Burger - Rs 450

🍕 *Pizza*
4. Chicken Tikka Pizza - Rs 1200
5. Cheese Pizza - Rs 900

🥤 *Drinks*
6. Cold Drink - Rs 150
7. Mint Margarita - Rs 300

Order karne ke liye likhein:
*Order 1*`;

client.on('message', async (msg) => {
    const text = msg.body.toLowerCase().trim();

    if (text === 'hi' || text === 'hello' || text === 'salam' || text === 'menu' || text === '1') {
        msg.reply(menu);
        return;
    }
    if (text === '2' || text.includes('menu')) {
        msg.reply(fullMenu);
        return;
    }
    if (text === '3' || text.includes('timing') || text.includes('location')) {
        msg.reply('🕒 *Timings:* 12 PM - 12 AM\n📍 *Location:* Main Bazaar, Lahore\n📞 *Phone:* 0300-1234567');
        return;
    }
    if (text.startsWith('order')) {
        msg.reply('✅ *Order Received!* Thank you!\nAapka order 30-40 min me deliver ho jayega.');
        return;
    }
    if (text === '4') {
        msg.reply('👨‍🍳 Staff se baat karne ke liye thora wait karein.');
        return;
    }
});

console.log('Starting Restaurant Bot...');
client.initialize();

// Pairing Code - 10 second baad mangwayega
setTimeout(async () => {
    try {
        const code = await client.requestPairingCode(PHONE_NUMBER);
        console.log('PAIRING CODE: ' + code);
        console.log('Is code ko WhatsApp me dalo: ' + PHONE_NUMBER);
    } catch (err) {
        console.log('Pairing Code Error: ' + err);
    }
}, 10000);
