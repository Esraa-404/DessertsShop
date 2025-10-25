<template>
  <div class="container my-5">
    <div class="row">
      <!-- المنتجات -->
      <div class="col-md-8">
        <h2 class="mb-4">Desserts</h2>

        <div class="products">
          <div
            class="product-card"
            v-for="product in products"
            :key="product.id"
          >
          <img :src="product.image"  class="product-img" :alt="product.name" />
<!--       -->
            <!-- overlay: Add / qty controls -->
            <div class="overlay">
              <button
                v-if="!inCart(product.id)"
                class="add-btn"
                @click="addToCart(product)"
              >
                <!-- inline cart icon (SVG) -->
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20"><g fill="#C73B0F" clip-path="url(#a)"><path d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z"/><path d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M.333 0h20v20h-20z"/></clipPath></defs></svg>
                <span>Add to Cart</span>
              </button>

              <div v-else class="qty-controls">
                <button @click="updateQty({ id: product.id, qty: getQty(product.id) - 1 })">-</button>
                <span class="qty">{{ getQty(product.id) }}</span>
                <button @click="updateQty({ id: product.id, qty: getQty(product.id) + 1 })">+</button>
              </div>
            </div>

            <div class="card-body">
              <h5 class="product-title">{{ product.name }}</h5>
              <p class="product-price">${{ product.price.toFixed(2) }}</p>
              <button class="details-btn" @click="$router.push(`/product/${product.id}`)">
                Details
              </button>

            </div>
          </div>
        </div>
      </div>

      <!-- الكارت (sidebar) -->
      <div class="col-md-4">
        <Cart
          :cart="cart"
          :total="total"
          @remove-item="removeItem"
          @update-qty="updateQty"
        />
      </div>
    </div>
  </div>
</template>





<script setup>
import { ref, computed, onMounted } from "vue";
import Cart from "../cart/Cart.vue";

const products = ref([]);
const cart = ref([]);

async function fetchProducts() {
  try {
    const response = await fetch("http://127.0.0.1:8000/products/");
    if (!response.ok) throw new Error("Network error");
    const data = await response.json();

    products.value = data.map(p => {
      const image = p.image || "";
      const imageUrl =
        image && (image.startsWith("http") || image.startsWith("data:"))
          ? image
          : image
          ? `http://127.0.0.1:8000${image.startsWith("/") ? "" : "/"}${image}`
          : "";
      return { ...p, image: imageUrl, price: Number(p.price || 0) };
    });
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

onMounted(fetchProducts);

function addToCart(product) {
  const item = cart.value.find(i => i.id === product.id);
  if (item) item.qty += 1;
  else cart.value.push({ id: product.id, name: product.name, price: product.price, image: product.image, qty: 1 });
}

// حذف منتج
function removeItem(id) {
  cart.value = cart.value.filter(i => i.id !== id);
}

// تعديل الكمية
function updateQty({ id, qty }) {
  const item = cart.value.find(i => i.id === id);
  const newQty = Math.max(0, parseInt(qty) || 0);
  if (item) {
    item.qty = newQty;
    if (item.qty === 0) removeItem(id);
  } else if (newQty > 0) {
    const p = products.value.find(x => x.id === id);
    if (p) cart.value.push({ id: p.id, name: p.name, price: p.price, image: p.image, qty: newQty });
  }
}

const total = computed(() => cart.value.reduce((s, i) => s + i.price * i.qty, 0));

function inCart(id) {
  return cart.value.some(i => i.id === id);
}

function getQty(id) {
  const item = cart.value.find(i => i.id === id);
  return item ? item.qty : 0;
}
</script>













<style>
/* grid 3 columns */
.products {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.product-card {
    position: relative;
    border: none;
    border-radius: 16px;
    overflow: hidden;
    background: #fff;
    padding-bottom: 14px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  
}

.product-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.12);
}


.product-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-bottom: 1px solid #eee;
  display: block;
  position: relative;
}

.overlay {
  position: absolute;
  bottom: 0px;
  left: 50%;
  transform: translate( -50%,50%);
  width: 80%;
  display: flex;
  justify-content: center;
  z-index: 5;  
  margin-bottom: 150px;


}


/* Add button style */
.add-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 100%;
  padding: 10px 12px; /* شوية padding علشان شكله أنعم */
  border-radius: 30px;
  border: 1px solid hsl(14, 86%, 42%);
  background: #fff;
  color: hsl(14, 86%, 42%);
  font-weight: 600;
  font-size: 14px;
  transition: 0.3s;
  box-shadow: 0 2px 5px rgba(0,0,0,0.08); /* ظل خفيف */
}
.add-btn svg {
  color: hsl(14, 86%, 42%);
  transition: fill 0.3s ease;
}

.add-btn:hover svg path {
  fill: #fff;
}

.add-btn:hover {
  background: hsl(14, 86%, 42%);
  color: #fff;
  /* transform: scale(1.05); */
}
.add-btn:hover svg { color: #fff; }

/* qty controls */
.qty-controls {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: hsl(14, 86%, 42%);
  border-radius: 24px;
  padding: 6px 10px;
}
.qty-controls button {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: none;
  background: #fff;
  color: hsl(14, 86%, 42%);
  font-weight: bold;
  cursor: pointer;
}
.qty {
  min-width: 20px;
  text-align: center;
  font-weight: 600;
  color: #fff;
}
/* title and price */
.product-title {
  margin-bottom: 4px;
  font-size: 16px;
  font-weight: 600;
  text-align: start;
}
.product-price {
  text-align: start;
  color: hsl(14, 86%, 42%);
  margin-top: 6px;
}
.category {
  font-size: 14px;
  color: hsl(12, 20%, 44%);
  margin-top: 18px;
  margin-bottom: 4px;
  text-align: start;
}
/* text alignment left */
.card-body {
  padding: 16px 18px;
  text-align: start;
}



@media (max-width: 575.98px) {
  .products {
    grid-template-columns: 1fr; /* عمود واحد */
    gap: 12px;
  }

  .product-img {
    height: 180px;
  }

  .overlay {
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translate( -50%,50%);
  width: 80%;
  display: flex;
  justify-content: center;
  z-index: 5;  
  margin-bottom: 85px;  }

  .product-title {
    font-size: 14px;
  }

  .product-price, .category {
    font-size: 12px;
  }

  .add-btn, .qty-controls {
    font-size: 12px;
    padding: 6px 8px;
  }
}

/* Medium devices: tablets (576px - 768px) */
@media (min-width: 576px) and (max-width: 767.98px) {
  .products {
    grid-template-columns: repeat(2, 1fr); /* عمودين */
    gap: 16px;
  }

  .product-img {
    height: 180px;
  }

  .overlay {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translate( -50%,50%);
  width: 80%;
  display: flex;
  justify-content: center;
  z-index: 5;  
  margin-bottom: 135px;  }
}

/* Large devices: laptops (768px - 992px) */
@media (min-width: 768px) and (max-width: 991.98px) {
  .products {
    grid-template-columns: repeat(2, 1fr);
    gap: 18px;
  }

  .product-img {
    height: 200px;
  }

  .overlay {
position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translate( -50%,50%);
  width: 80%;
  display: flex;
  justify-content: center;
  z-index: 5;  
  margin-bottom: 139px;  }
}

/* Extra large devices: desktops (992px - 1440px) */
@media (min-width: 992px) and (max-width: 1439.98px) {
  .products {
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }

  .product-img {
    height: 200px;
  }

  .overlay {
position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translate( -50%,50%);
  width: 80%;
  display: flex;
  justify-content: center;
  z-index: 5;  
  margin-bottom: 140px;  }
}



.details-btn {
  width: 60%;
  display: block;
  margin: 12px auto 0;
  padding: 6px 10px;
  border: 1px solid hsl(14, 86%, 42%);
  border-radius: 20px;
  background: #fff;
  color: hsl(14, 86%, 42%);
  font-weight: 600;
  font-size: 12px;
  cursor: pointer;
  transition: 0.3s;
}


.details-btn:hover {
  background: hsl(14, 86%, 42%);
  color: #fff;
}




</style>
