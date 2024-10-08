const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar) {
    bar.addEventListener ('click', () =>{
        nav.classList.add('active');
    }) 
}

if (close) {
    close.addEventListener ('click', () =>{
        nav.classList.remove('active');
    }) 
}

// CART

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productId, name, price, image) {
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({id: productId, name: name, price: price, image: image, quantity: 1});
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    updateCartDisplay();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    updateCartDisplay();
}

function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = cartCount;
}

function updateCartDisplay() {
    const cartTable = document.getElementById('cart-items');
    const subtotalElement = document.getElementById('cart-subtotal');
    const totalElement = document.getElementById('cart-total');
    
    if (!cartTable) return;

    let total = 0;
    cart.forEach((item, index) => {
        const row = document.createElement('tr');
        const subtotal = item.price * item.quantity;
        total += subtotal;

        row.innerHTML = `
            <td><a href="#" onclick="removeFromCart(${index})"><i class="far fa-times-circle"></i></a></td>
            <td><img src="${item.image}" alt="${item.name}"></td>
            <td>${item.name}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td><input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value)"></td>
            <td>$${subtotal.toFixed(2)}</td>
        `;
        cartTable.appendChild(row);
    });

    if (subtotalElement) {
        subtotalElement.textContent = `$${total.toFixed(2)}`;
    }

    if (totalElement) {
        totalElement.textContent = `$${total.toFixed(2)}`;
    }
}

function updateQuantity(index, newQuantity) {
    cart[index].quantity = parseInt(newQuantity);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    updateCartDisplay();
}

function proceedToCheckout() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.style.display = 'none';
    }

    const modal = document.createElement('div');
    modal.className = 'payment-modal';
    modal.innerHTML = `
        <div class="payment-card">
            <h2>Payment Confirmation</h2>
            <form id="payment-form">
                <label for="card-number">Card Number:</label>
                <input type="text" id="card-number" required maxlength="16" pattern="\\d{16}">
                <label for="cvv">CVV:</label>
                <input type="text" id="cvv" required maxlength="3" pattern="\\d{3}">
                <label for="pin">Pin:</label>
                <input type="password" id="pin" required maxlength="4" pattern="\\d{4}">
                <button type="submit">Confirm Payment</button>
            </form>
        </div>
    `;
    document.body.appendChild(modal);

    const form = document.getElementById('payment-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (this.checkValidity()) {
            alert('Payment confirmed! Thank you for your purchase.');
            cart = [];
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            updateCartDisplay();
            modal.remove();
        } else {
            alert('Please fill in all fields correctly.');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    updateCartDisplay();

    const productContainers = document.querySelectorAll('.pro-container');
    productContainers.forEach(container => {
        container.addEventListener('click', (e) => {
            if (e.target.classList.contains('cart')) {
                const product = e.target.closest('.pro');
                const productId = product.dataset.id;
                const name = product.querySelector('h5').textContent;
                const price = parseFloat(product.querySelector('h4').textContent.replace('$', ''));
                const image = product.querySelector('img').src;
                addToCart(productId, name, price, image);
            }
        });
    });

    const checkoutButton = document.querySelector('#subtotal button');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', proceedToCheckout);
    }
});