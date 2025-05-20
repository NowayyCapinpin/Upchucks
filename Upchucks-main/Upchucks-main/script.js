// Load cart from localStorage or initialize
let cart = JSON.parse(localStorage.getItem("cart")) || [];
updateCart();

function addToCart(product, price) {
    price = Number(price);
    let existingProduct = cart.find(item => item.product === product);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ product, price, quantity: 1 });
    }

    updateCart();
    showCartSection();
}

function updateCart() {
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        const itemDiv = document.createElement("div");
        itemDiv.classList.add("cart-item");
        itemDiv.innerHTML = `
            <span>${item.product} - ₱${item.price} (${item.quantity}x)</span>
            <div class="quantity-controls">
                <button onclick="decreaseQuantity(${index})">-</button>
                <span>${item.quantity}</span>
                <button onclick="increaseQuantity(${index})">+</button>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItems.appendChild(itemDiv);
    });

    document.getElementById("total").textContent = total;
    document.getElementById("checkout-total").textContent = total;
    localStorage.setItem("cart", JSON.stringify(cart));
}

function increaseQuantity(index) {
    cart[index].quantity++;
    updateCart();
}

function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        cart.splice(index, 1);
    }
    updateCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function addProduct() {
    const name = document.getElementById("sell-name").value.trim();
    const price = document.getElementById("sell-price").value.trim();
    const imageInput = document.getElementById("sell-image");
    const image = imageInput.files[0];

    if (name.length === 0 || name.length > 40) {
        alert("Product name must be between 1 and 40 characters.");
        return;
    }

    if (!price || isNaN(price) || price <= 0 || price > 999999) {
        alert("Please enter a valid price (1 - 999999).");
        return;
    }

    if (!image) {
        alert("Please upload an image for your product.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");
        productDiv.innerHTML = `
            <img src="${e.target.result}" alt="${name}" class="product-image" style="width: 100px; height: auto; display: block; margin-bottom: 10px;">
            <h3>${name}</h3>
            <p>Price: ₱${price}</p>
            <button onclick="addToCart('${name}', ${price})">Add to Cart</button>
            <button class="remove-btn" onclick="removeProduct(this)">Remove</button>
        `;
        document.getElementById("user-products").appendChild(productDiv);
    };
    reader.readAsDataURL(image);

    document.getElementById("sell-name").value = "";
    document.getElementById("sell-price").value = "";
    imageInput.value = "";
}

function removeProduct(button) {
    button.parentElement.remove();
}

function searchProducts() {
    const query = document.getElementById("search-bar").value.toLowerCase();
    const products = document.querySelectorAll(".product");

    products.forEach(product => {
        const name = product.querySelector("h3").textContent.toLowerCase();
        product.style.display = name.includes(query) || query === "" ? "inline-block" : "none";
    });
}

function showTab(tabId) {
    document.querySelectorAll(".tab-content").forEach(tab => tab.classList.add("hidden"));
    document.getElementById(tabId).classList.remove("hidden");

    document.querySelectorAll(".tab").forEach(btn => btn.classList.remove("active"));
    document.querySelector(`[onclick="showTab('${tabId}')"]`).classList.add("active");
}

document.getElementById("checkout-form").addEventListener("submit", function (event) {
    event.preventDefault();

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const address = document.getElementById("address").value.trim();
    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (address === "") {
        alert("Please fill in your address.");
        return;
    }

    alert(`Order placed successfully!\n\nAddress: ${address}\nTotal: ₱${totalAmount}`);
    cart = [];
    updateCart();
    document.getElementById("checkout-form").reset();
});

function showCartSection() {
    document.getElementById("cart-section").style.display = "block";
}
