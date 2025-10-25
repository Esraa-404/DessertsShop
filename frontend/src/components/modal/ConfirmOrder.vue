<template>
  <div class="confirm-order">
    <HomeBackground /> 
    <!-- <div class="overlay"></div> -->
    <div class="card">
      <div class="header">


        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 32.121L13.5 24.6195L15.6195 22.5L21 27.879L32.3775 16.5L34.5 18.6225L21 32.121Z" fill="#1EA575"/>
        <path d="M24 3C19.8466 3 15.7865 4.23163 12.333 6.53914C8.8796 8.84665 6.18798 12.1264 4.59854 15.9636C3.0091 19.8009 2.59323 24.0233 3.40352 28.0969C4.21381 32.1705 6.21386 35.9123 9.15077 38.8492C12.0877 41.7861 15.8295 43.7862 19.9031 44.5965C23.9767 45.4068 28.1991 44.9909 32.0364 43.4015C35.8736 41.812 39.1534 39.1204 41.4609 35.667C43.7684 32.2135 45 28.1534 45 24C45 18.4305 42.7875 13.089 38.8493 9.15076C34.911 5.21249 29.5696 3 24 3ZM24 42C20.4399 42 16.9598 40.9443 13.9997 38.9665C11.0397 36.9886 8.73256 34.1774 7.37018 30.8883C6.0078 27.5992 5.65134 23.98 6.34587 20.4884C7.04041 16.9967 8.75474 13.7894 11.2721 11.2721C13.7894 8.75473 16.9967 7.0404 20.4884 6.34587C23.98 5.65133 27.5992 6.00779 30.8883 7.37017C34.1774 8.73255 36.9886 11.0397 38.9665 13.9997C40.9443 16.9598 42 20.4399 42 24C42 28.7739 40.1036 33.3523 36.7279 36.7279C33.3523 40.1036 28.7739 42 24 42Z" fill="#1EA575"/>
        </svg>

        <h2>Order Confirmed</h2>
        <p>We hope you enjoy your food!</p>
      </div>

      <div class="order-box">
        <div class="items">
          <div v-for="(item, index) in order.items" :key="item.id" class="item">
            <img :src="item.image" alt="" class="thumb" />
            <div class="details">
                <p class="name">{{ item.name }}</p>
                <p class="qty">{{ item.qty }}x <span>@ ${{ Number(item.price).toFixed(2) }}</span></p>
            </div>
            <p class="price">
            ${{ (Number(item.price) * Number(item.qty)).toFixed(2) }}
            </p> 
          </div>
          <!-- hr بين العناصر -->
          <hr v-for="(item, index) in order.items" :key="'hr-'+index" v-if="index < order.items.length - 1" />
        </div>

        <!-- التوتال جوا نفس الديف -->
        <div class="total">
          <span>Order Total</span>
          <strong>${{ order.total.toFixed(2) }}</strong>
        </div>
      </div>

      <button class="new-order" @click="startNewOrder">
        Start New Order
      </button>
    </div>
    
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import HomeBackground from "@/components/HomeBackground.vue";


const route = useRoute();
const router = useRouter();

const items = JSON.parse(route.query.items || "[]");
const total = parseFloat(route.query.total || 0);

const order = { items, total };

function startNewOrder() {
  router.push("/");
}
</script>

<style scoped>

.confirm-order {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  position: relative;
}
.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.2);
  z-index: 5;
}
.card {
  position: relative;
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  max-width: 400px;
  width: 100%;
  z-index: 10;
}
.header {
  text-align: start;
  margin-bottom: 1rem;
}
h2{
    font-size: 40px;
}
.order-box {
  background:hsl(60, 75%, 98%);
  padding: 1rem;
  border-radius: 0.5rem;
  margin: 1rem 0;
}
.items {
  margin-bottom: 1rem;
}
.item {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 1rem;
}
.thumb {
  width: 40px;
  height: 40px;
  border-radius: 0.5rem;
  margin-right: 0.5rem;
}
.details {
  flex: 1;
}
.name {
  font-weight: bold;
}
.qty {
  color: gray;
  font-size: 0.9rem;
}
.price {
  font-weight: bold;
}
.items hr {
  border: none;
  border-top: 1px solid #ddd;
  margin: 0.5rem 0;
}
.total {
  display: flex;
  justify-content: space-between;
  font-size: 1.1rem;
  font-weight: bold;
}
.new-order {
  width: 100%;
  padding: 0.75rem;
  background: #db2f29;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
}
.new-order:hover {
  background: #c9302c;
}
.qty{
    color: #a1423e;
    justify-content: flex-start;
}
span{
    color: rgb(46, 40, 40);
}



/* ====== Responsive ====== */

/* Small devices: phones (320px - 575px) */
@media (max-width: 575.98px) {
  .card {
    padding: 1rem;
    max-width: 95%;
  }

  h2 {
    font-size: 28px;
  }

  .order-box {
    padding: 0.75rem;
  }

  .item {
    flex-direction: column;
    align-items: flex-start;
  }

  .thumb {
    width: 35px;
    height: 35px;
    margin-bottom: 6px;
  }

  .details {
    margin-bottom: 6px;
  }

  .total {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }

  .new-order {
    padding: 0.6rem;
    font-size: 14px;
  }
}

/* Medium devices: tablets (576px - 767px) */
@media (min-width: 576px) and (max-width: 767.98px) {
  .card {
    max-width: 90%;
  }

  h2 {
    font-size: 32px;
  }

  .thumb {
    width: 38px;
    height: 38px;
  }

  .new-order {
    font-size: 15px;
  }
}

/* Large devices: laptops (768px - 991px) */
@media (min-width: 768px) and (max-width: 991.98px) {
  .card {
    max-width: 400px;
  }

  h2 {
    font-size: 36px;
  }
}



</style>
