const products = [
    { id: 1, name: "Velvet Lipstick", price: 199 },
    { id: 2, name: "Liquid Foundation", price: 349 },
    { id: 3, name: "Rose Pink Blush", price: 249 },
    { id: 4, name: "Black Kajal", price: 99 },
    { id: 5, name: "Liquid Concealer", price: 229 }
];

let cart = [];

function shopNow() {
    document.getElementById("products").scrollIntoView({
        behavior: "smooth"
    });
}

function addToCart(id) {
    const product = products.find(item => item.id === id);

    if (!product) return;

    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    renderCart();

    const button = document.querySelector(
        `.add-button[onclick="addToCart(${id})"]`
    );

    if (button) {
        const originalHTML = button.dataset.original ||
            button.innerHTML;

        button.dataset.original = originalHTML;
        button.classList.add("added");
        button.innerHTML = "✓ ADDED SUCCESSFULLY";

        clearTimeout(button.resetTimer);

        button.resetTimer = setTimeout(() => {
            button.classList.remove("added");
            button.innerHTML = originalHTML;
        }, 1300);
    }

    showMessage(product.name + " added to your cart! 💗");
}

function changeQuantity(id, amount) {
    const item = cart.find(product => product.id === id);

    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {
        cart = cart.filter(product => product.id !== id);
    }

    renderCart();
}

function removeFromCart(id) {
    const product = cart.find(item => item.id === id);

    if (!product) return;

    cart = cart.filter(item => item.id !== id);

    renderCart();
    showMessage(product.name + " removed from cart.");
}

function clearCart() {
    cart = [];
    renderCart();
    showMessage("Your cart has been cleared.");
}

function renderCart() {
    const cartItems = document.getElementById("cartItems");
    const totalElement = document.getElementById("total");
    const cartCount = document.getElementById("cartCount");
    const summaryCount = document.getElementById("summaryCount");

    const totalQuantity = cart.reduce(
        (sum, item) => sum + item.quantity, 0
    );

    const totalPrice = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    cartCount.textContent = totalQuantity;
    summaryCount.textContent = totalQuantity;
    totalElement.textContent = "₹" + totalPrice;

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <div>🛍️</div>
                <h3>Your cart is empty</h3>
                <p>Add your favourite products to get started!</p>
            </div>
        `;
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div>
                <div class="item-name">${item.name}</div>

                <div class="item-info">
                    ₹${item.price} each · Subtotal ₹${item.price * item.quantity}
                </div>

                <div class="quantity-controls">
                    <button onclick="changeQuantity(${item.id}, -1)"
                            aria-label="Decrease quantity">−</button>

                    <strong>${item.quantity}</strong>

                    <button onclick="changeQuantity(${item.id}, 1)"
                            aria-label="Increase quantity">+</button>
                </div>
            </div>

            <button class="remove-button"
                    onclick="removeFromCart(${item.id})">
                🗑 Remove
            </button>
        </div>
    `).join("");
}

function showMessage(message) {
    const element = document.getElementById("message");

    element.textContent = message;

    clearTimeout(showMessage.timer);

    showMessage.timer = setTimeout(() => {
        element.textContent = "";
    }, 2500);
}

renderCart();
