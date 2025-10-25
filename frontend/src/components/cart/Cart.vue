<template>
  <div class="cart">
    <h2>Your Cart ({{ cart.length }})</h2>

    <!-- حالة الكارت الفاضي -->
    <div v-if="cart.length === 0" class="empty-cart">
      <img :src="emptycake" alt="Empty Cart" />
      <p>Your added items will appear here</p>
    </div>

    <!-- حالة الكارت الممتلئ -->
    <div v-else>
      <ul>
        <li v-for="item in cart" :key="item.id" class="cart-item">
          <div class="item-details">
            <span class="name">{{ item.name }}</span>
            <div class="meta">
              <span class="cart-item-qty">{{ item.qty }}x</span>
              <span class="unit-price">@ ${{ item.price.toFixed(2) }}</span>
              <span class="total-price">${{ (item.price * item.qty).toFixed(2) }}</span>
            </div>
          </div>

          <button class="remove" @click="$emit('remove-item', item.id)">
            <!-- أيقونة X اللي بعتّيها -->
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10">
              <path fill="#CAAFA7" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/>
            </svg>
          </button>
        </li>
      </ul>

      <!-- المجموع -->
      <div class="order-total">
        <span>Order Total</span>
        <strong>${{ total.toFixed(2) }}</strong>
      </div>

      <!-- Carbon neutral box -->
      <div class="carbon-box">
        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20">
          <path fill="#1EA575" d="M8 18.75H6.125V17.5H8V9.729L5.803 8.41l.644-1.072 2.196 1.318a1.256 1.256 0 0 1 .607 1.072V17.5A1.25 1.25 0 0 1 8 18.75Z"/>
          <path fill="#1EA575" d="M14.25 18.75h-1.875a1.25 1.25 0 0 1-1.25-1.25v-6.875h3.75a2.498 2.498 0 0 0 2.488-2.747 2.594 2.594 0 0 0-2.622-2.253h-.99l-.11-.487C13.283 3.56 11.769 2.5 9.875 2.5a3.762 3.762 0 0 0-3.4 2.179l-.194.417-.54-.072A1.876 1.876 0 0 0 5.5 5a2.5 2.5 0 1 0 0 5v1.25a3.75 3.75 0 0 1 0-7.5h.05a5.019 5.019 0 0 1 4.325-2.5c2.3 0 4.182 1.236 4.845 3.125h.02a3.852 3.852 0 0 1 3.868 3.384 3.75 3.75 0 0 1-3.733 4.116h-2.5V17.5h1.875v1.25Z"/>
        </svg>
        <p>This is a <strong>carbon-neutral</strong> delivery</p>
      </div>

      <!-- زرار التأكيد -->
      <button 
    class="confirm" 
    @click="$router.push({ 
      name: 'CheckoutOrder', 
      query: { 
        items: JSON.stringify(cart), 
        total: total 
      } 
    })"
  >
    Confirm Order
  </button>

  </div>
  </div>
</template>

<script setup>
import emptycake from "@/assets/images/illustration-empty-cart.svg"
defineProps(["cart", "total"]);
defineEmits(["remove-item", "update-qty"]);
</script>

<style>
.cart {
  width: 100%;
  padding: 20px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

/* عنوان */
.cart h2 {
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: bold;
  color: hsl(14, 59%, 48%);
}

/* عناصر الكارت */
.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
  border-bottom: 1px solid #eee;
  padding-bottom: 12px;
}

.item-details {
  flex: 1;
}

.name {
  display: block;
  font-weight: 600;
  margin-bottom: 4px;
}
.item-details .name {
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 4px;
  display: block;
}

.meta {
  font-size: 13px;
  color: #777;
  display: flex;
  gap: 8px;
}
.cart-item-qty {
  color: rgb(173, 61, 61);          /* يخليها حمراء */
  font-weight: bold;   /* اختياري لو عايزة تبان قوية */
  margin-right: 5px;   /* مسافة صغيرة قبل اسم المنتج */
}
/*  */

.total-price {
  /* font-weight: bold; */
  color: #777474;
}

/* زرار X */
.remove {
  border: 1px solid #ddd;
  border-radius: 50%;
  background: transparent;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.remove:hover {
  background: #f8f8f8;
}

/* المجموع */
.order-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
  font-size: 16px;
  /* font-weight: 600; */
}
.order-total strong {
  font-size: 20px;
  color: #000;
}

/* Carbon neutral box */
.carbon-box {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #fafafa;
  padding: 10px;
  border-radius: 8px;
  font-size: 14px;
  margin-bottom: 20px;
  color: #333;
}

/* زرار التأكيد */
.confirm {
  width: 100%;
  padding: 12px;
  border-radius: 24px;
  border: none;
  background: hsl(14, 86%, 42%);
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}
.confirm:hover {
  background: hsl(14, 92%, 29%);
}
.cart-title {
  color: red;
  font-weight: bold;
}
.cart-title {
  color: red;
  font-weight: bold;
}



/* ====== Responsive ====== */

/* Small devices: phones (320px - 575px) */
@media (max-width: 575.98px) {
  .cart {
    padding: 12px;
    width: 100%;
  }

  .cart h2 {
    font-size: 16px;
    margin-bottom: 12px;
  }

  .cart-item {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 12px;
    padding-bottom: 8px;
  }

  .meta {
    flex-wrap: wrap;
    gap: 4px;
    font-size: 12px;
  }

  .remove {
    width: 20px;
    height: 20px;
  }

  .order-total {
    font-size: 14px;
  }

  .order-total strong {
    font-size: 16px;
  }

  .carbon-box {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    font-size: 12px;
    padding: 8px;
  }

  .confirm {
    padding: 10px;
    font-size: 14px;
  }
}

/* Medium devices: tablets (576px - 767px) */
@media (min-width: 576px) and (max-width: 767.98px) {
  .cart {
    padding: 16px;
  }

  .cart h2 {
    font-size: 18px;
  }

  .meta {
    font-size: 13px;
  }

  .order-total {
    font-size: 15px;
  }

  .order-total strong {
    font-size: 18px;
  }

  .confirm {
    font-size: 15px;
    padding: 11px;
  }
}

/* Large devices: laptops (768px - 991px) */
@media (min-width: 768px) and (max-width: 991.98px) {
  .cart h2 {
    font-size: 18px;
  }

  .meta {
    font-size: 14px;
  }

  .order-total {
    font-size: 16px;
  }

  .order-total strong {
    font-size: 19px;
  }

  .confirm {
    font-size: 16px;
  }
}



</style>
