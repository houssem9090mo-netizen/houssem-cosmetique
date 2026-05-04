document.addEventListener('DOMContentLoaded', () => {
    const products = [
        {
            id: 1,
            name: "Sérum Visage Éclat",
            price: "3500 DA",
            description: "Sérum à la vitamine C pour un teint lumineux.",
            image: "images/serum_visage.png"
        },
        {
            id: 2,
            name: "Crème Hydratante Intense",
            price: "2800 DA",
            description: "Hydratation 24h pour peaux sèches et sensibles.",
            image: "images/creme_hydratante.png"
        },
        {
            id: 3,
            name: "Huile d'Argan Bio",
            price: "1500 DA",
            description: "100% pure et naturelle, pressée à froid.",
            image: "images/huile_argan.png"
        },
        {
            id: 4,
            name: "Savon Noir Artisanal",
            price: "850 DA",
            description: "Traditionnel pour un gommage en profondeur.",
            image: "images/savon_noir.png"
        },
        {
            id: 5,
            name: "Gommage au Café",
            price: "1200 DA",
            description: "Exfoliant naturel pour une peau douce.",
            image: "images/gommage_cafe.png"
        },
        {
            id: 6,
            name: "Rouge à Lèvres Mat",
            price: "1800 DA",
            description: "Tenue longue durée et fini velours.",
            image: "images/rouge_levres.png"
        },
        {
            id: 7,
            name: "Gloss Kiko",
            price: "500 DA",
            description: "Brillance intense et fini cristallin.",
            image: "images/gloss_kiko.png"
        },
        {
            id: 8,
            name: "Huile de Figue de Barbarie",
            price: "4500 DA",
            description: "Élixir anti-âge 100% pur et précieux.",
            image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=400"
        },
        {
            id: 9,
            name: "Ghassoul aux 7 Herbes",
            price: "1200 DA",
            description: "Masque traditionnel pour peau et cheveux.",
            image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&q=80&w=400"
        },
        {
            id: 10,
            name: "Eau de Rose de Blida",
            price: "950 DA",
            description: "Tonique naturel rafraîchissant et apaisant.",
            image: "https://images.unsplash.com/photo-1558191053-8edcb01e1da3?auto=format&fit=crop&q=80&w=400"
        },
        {
            id: 11,
            name: "Musc Tahara Pur",
            price: "1500 DA",
            description: "Parfum blanc crémeux, douceur extrême.",
            image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=400"
        },
        {
            id: 12,
            name: "Khol Artisanal Sahara",
            price: "800 DA",
            description: "Soin des yeux traditionnel et protecteur.",
            image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=400"
        },
        {
            id: 13,
            name: "Crème Bave d'Escargot",
            price: "3200 DA",
            description: "Réparation intense et régénération cutanée.",
            image: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&q=80&w=400"
        },
        {
            id: 14,
            name: "Savon Olive de Kabylie",
            price: "450 DA",
            description: "Savon naturel riche en vitamine E.",
            image: "https://images.unsplash.com/photo-1605264964528-06403738d6dc?auto=format&fit=crop&q=80&w=400"
        }
    ];

    const productList = document.getElementById('product-list');
    const productSelect = document.getElementById('product');
    const orderForm = document.getElementById('order-form');
    const orderMessage = document.getElementById('order-message');

    // Display products
    products.forEach(product => {
        // Add to grid
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p style="color: #888; font-size: 0.9rem; margin-bottom: 10px;">${product.description}</p>
            <div class="price">${product.price}</div>
            <a href="#order" class="btn" onclick="selectProduct('${product.name}')">Commander</a>
        `;
        productList.appendChild(card);

        // Add to select options
        const option = document.createElement('option');
        option.value = product.name;
        option.textContent = `${product.name} - ${product.price}`;
        productSelect.appendChild(option);
    });

    // Handle form submission
    orderForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value,
            product: document.getElementById('product').value
        };

        try {
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const result = await response.json();
                orderMessage.style.display = 'block';
                orderMessage.style.color = 'green';
                orderMessage.innerHTML = `<i class="fas fa-check-circle"></i> Merci ${formData.name} ! Votre commande pour <strong>${formData.product}</strong> a été enregistrée. Nous vous contacterons bientôt au ${formData.phone}.`;
                orderForm.reset();
            } else {
                throw new Error('Erreur lors de la commande');
            }
        } catch (error) {
            orderMessage.style.display = 'block';
            orderMessage.style.color = 'red';
            orderMessage.textContent = "Une erreur est survenue. Veuillez réessayer.";
        }
    });
});

// Helper function to auto-select product when clicking "Commander"
function selectProduct(productName) {
    document.getElementById('product').value = productName;
}
