const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const https = require('https');

const app = express();
const PORT = process.env.PORT || 3000;

// --- CONFIGURATION TELEGRAM ---
// Remplissez ces deux infos pour recevoir les notifications sur votre téléphone
const TELEGRAM_BOT_TOKEN = 'VOTRE_TOKEN_ICI';
const TELEGRAM_CHAT_ID = 'VOTRE_CHAT_ID_ICI';

function sendTelegramMessage(text) {
    if (TELEGRAM_BOT_TOKEN === 'VOTRE_TOKEN_ICI') return; // Ne rien faire si pas configuré

    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&text=${encodeURIComponent(text)}`;
    
    https.get(url, (res) => {
        console.log('Notification Telegram envoyée !');
    }).on('error', (e) => {
        console.error('Erreur Telegram:', e);
    });
}
// ------------------------------

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Store orders in memory (simple for beginner version)
const orders = [];

// API Route to receive orders
app.post('/api/orders', (req, res) => {
    const order = req.body;
    
    // Add timestamp
    order.timestamp = new Date().toLocaleString();
    
    // Log to console as requested
    console.log('--- NOUVELLE COMMANDE REÇUE ---');
    console.log(JSON.stringify(order, null, 2));
    console.log('-------------------------------');
    
    // Save to file (commandes.json for persistence)
    let allOrders = [];
    const filePath = path.join(__dirname, 'commandes.json');
    
    if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath);
        allOrders = JSON.parse(fileData);
    }
    
    allOrders.push(order);
    fs.writeFileSync(filePath, JSON.stringify(allOrders, null, 2));

    // Envoyer la notification Telegram
    const telegramText = `
🛍 NOUVELLE COMMANDE !
------------------------
👤 Client: ${order.name}
📞 Tel: ${order.phone}
📍 Adresse: ${order.address}
💄 Produit: ${order.product}
🚛 Mode: Paiement à la livraison
------------------------
`;
    sendTelegramMessage(telegramText);

    orders.push(order); // Also update in-memory list
    
    res.status(201).json({ 
        message: 'Commande reçue avec succès !',
        orderId: allOrders.length 
    });
});

// Mot de passe pour accéder à la partie Admin
const ADMIN_PASSWORD = 'admin_houssem';

// Route to view orders (protected by password)
app.get('/api/admin/orders', (req, res) => {
    const password = req.headers['x-admin-password'];
    
    if (password !== ADMIN_PASSWORD) {
        return res.status(401).json({ message: 'Accès non autorisé' });
    }

    const filePath = path.join(__dirname, 'commandes.json');
    if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath);
        res.json(JSON.parse(fileData));
    } else {
        res.json([]);
    }
});

app.listen(PORT, () => {
    console.log(`Serveur Houssem Cosmetics lancé sur http://localhost:${PORT}`);
});
