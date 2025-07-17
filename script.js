const products = [
  {
    id: 1,
    name: "Laptop Dell XPS 13",
    price: 999,
    image: "https://www.laptoparena.net/images/DELL_XPS_13_9315_2-in-1_1019164321860_image_4.jpg"
  },
  {
    id: 2,
    name: "Gaming PC i7 RTX 4060",
    price: 1299,
    image: "https://tse4.mm.bing.net/th/id/OIP.-KmTkPMzdLJfAfMdZlFVoQHaHa?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: 3,
    name: "24\" Monitor LG",
    price: 149,
    image: "https://external-preview.redd.it/monitor-lg-24-ips-fhd-100hz-freesync-monitor-hdmi-79-99-v0-25DB3hH0KJpbw5tNuuRlNTaCm8NNUV3ocND77-UuigE.jpg?auto=webp&s=4031871924d6efb3099453eeecf22197c56e56ed"
  },
  {
    id: 4,
    name: "Mechanical Keyboard RGB",
    price: 89,
    image: "https://tse4.mm.bing.net/th/id/OIP._quDYaJ6Y3bVlzUo3p2xbQHaFW?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: 5,
    name: "Wireless Mouse Logitech",
    price: 29,
    image: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6420/6420880ld.jpg"
  },
  {
    id: 6,
    name: "SSD 1TB Samsung EVO",
    price: 119,
    image: "https://th.bing.com/th/id/R.ac97014db6587f9b22b2fb1de0edc025?rik=t2PLM7PEfmpRMg&pid=ImgRaw&r=0"
  },
  {
    id: 7,
    name: "HP Laser Printer",
    price: 199,
    image: "https://www.bhphotovideo.com/images/images2000x2000/hp_cf484a_m225dn_laserjet_pro_mfp_1109649.jpg"
  },
  {
    id: 8,
    name: "ASUS Motherboard B550",
    price: 149,
    image: "https://tse3.mm.bing.net/th/id/OIP.KaQ-J2EdUbgPtzgGito1mgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: 9,
    name: "intel core i9 processor 14900k",
    price: 499,
    image: "https://www.tradeinn.com/f/14047/140472438/intel-core-i9-14900k-processor.jpg"
  },
  {
    id: 10,
    name: "Corsair 750W Power Supply",
    price: 109,
    image: "https://tse2.mm.bing.net/th/id/OIP.8TLlxkq-gxT7uSauITE8kAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
   {
    id: 11,
    name: "Laptop Dell XPS 13",
    price: 999,
    image: "https://th.bing.com/th/id/R.bbe58c8447552bc0e3b77fb7981e71fc?rik=IvCoYOSQPKcwUQ&pid=ImgRaw&r=0"
  },
  {
    id: 12,
    name: "Gaming PC i7 RTX 4060",
    price: 1299,
    image: "https://level-up.gg/cdn/shop/products/i7-gaming-pc-i7-12700f-rtx-4060-ti-559548.jpg?v=1701334485&width=1214"
  },
  {
    id: 13,
    name: "27\" Monitor ROG",
    price: 349,
    image: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/af7022ae-dffd-48c3-8bcb-9e2e016454ae.png"
  },
  {
    id: 14,
    name: "Mechanical Keyboard TUF RGB",
    price: 89,
    image: "https://dlcdnwebimgs.asus.com/files/media/e816804d-ab96-435a-a3ba-2a553875d917/v1/img/aura/tuf-gaming-k3-gen-ii.png"
  }
];
const productContainer = document.getElementById("products");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");


let cart = [];

function renderProducts() {
  if (!productContainer) return;

  productContainer.innerHTML = "";

  products.forEach((product, index) => {
    const div = document.createElement("div");
    div.className = "product";
    div.style.animationDelay = `${index * 0.1}s`;
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>$${product.price.toFixed(2)}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productContainer.appendChild(div);
  });
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;


  const cartItem = cart.find(item => item.product.id === id);
  if (cartItem) {
    cartItem.quantity++;
  } else {
    cart.push({ product, quantity: 1 });
  }
  updateCart();
}

function removeFromCart(id) {
  const index = cart.findIndex(item => item.product.id === id);
  if (index > -1) {
    cart.splice(index, 1);
  }
  updateCart();
}

function decreaseQuantity(id) {
  const cartItem = cart.find(item => item.product.id === id);
  if (cartItem) {
    cartItem.quantity--;
    if (cartItem.quantity <= 0) {
      removeFromCart(id);
    }
    updateCart();
  }
}

function updateCart() {
  if (!cartItems || !cartTotal || !cartCount) return;

  cartItems.innerHTML = "";
  let total = 0;
  let totalItems = 0;

  cart.forEach(({ product, quantity }) => {
    const li = document.createElement("li");
    const subtotal = product.price * quantity;
    total += subtotal;
    totalItems += quantity;

    li.style.display = "flex";
    li.style.alignItems = "center";
    li.style.gap = "10px";
    li.style.marginBottom = "10px";

    li.innerHTML = `
      <img src="${product.image}" alt="${product.name}" style="width:50px; height:auto; border-radius:6px; object-fit:cover;">
      <div style="flex-grow:1;">
        <strong>${product.name}</strong><br>
        $${product.price.toFixed(2)} x ${quantity} = $${subtotal.toFixed(2)}
      </div>
      <button onclick="decreaseQuantity(${product.id})" style="margin-left:10px;">-</button>
      <button onclick="removeFromCart(${product.id})" style="margin-left:5px;">Remove</button>
    `;

    cartItems.appendChild(li);
  });

  cartTotal.textContent = total.toFixed(2);
  cartCount.textContent = totalItems;
}
function calculateTotal() {
  let total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  cartTotal.textContent = total.toFixed(2);


  document.getElementById("discount-total").textContent = total.toFixed(2);
}

function applyDiscount() {
  let total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  let discount = total * 0.1;
  let discountedTotal = total - discount;


  cartTotal.textContent = total.toFixed(2);


  document.getElementById("discount-total").textContent = discountedTotal.toFixed(2);
}
function payNow() {
  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discounted = total * 0.9;

  alert(`Thank you for your purchase!\nTotal: $${total.toFixed(2)}\nAfter Discount: $${discounted.toFixed(2)}`);
  
  // Reset cart
  cart = [];
  updateCart();
  document.getElementById("discount-total").textContent = "0.00";
}





renderProducts();