# Houssem Cosmetics - E-commerce

Un site e-commerce complet pour une boutique de cosmétiques en Algérie.

## Fonctionnalités
- Design Moderne Noir & Blanc (Premium)
- Liste de produits interactive
- Formulaire de commande simple
- Paiement manuel via BaridiMob
- Backend Node.js Express qui enregistre les commandes

## Installation sur Linux

1. Assurez-vous que **Node.js** est installé :
   ```bash
   node -v
   ```

2. Allez dans le dossier du projet :
   ```bash
   cd /home/sidahmed/.gemini/antigravity/scratch/houssem-cosmetics
   ```

3. Installez les dépendances :
   ```bash
   npm install
   ```

4. Lancez le serveur :
   ```bash
   npm start
   ```

5. Ouvrez votre navigateur sur :
   [http://localhost:3000](http://localhost:3000)

## Comment utiliser
- Parcourez les produits.
- Cliquez sur "Commander" pour remplir le formulaire.
- Effectuez le paiement BaridiMob (le RIP est affiché dans le formulaire).
- Entrez la preuve de paiement (ID ou texte du SMS).
- Validez. La commande apparaîtra dans le terminal où tourne le serveur Node.js.

## Bonus
- Bouton WhatsApp flottant pour contacter le vendeur directement.
