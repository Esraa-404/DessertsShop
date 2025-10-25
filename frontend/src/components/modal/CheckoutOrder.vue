<template>
    <div class="checkout-order">
        <h2>Checkout</h2>

        <!-- عرض الأوردر -->
        <div class="order-items">
        <div v-for="item in items" :key="item.id" class="item">
            <p>{{ item.name }} x {{ item.qty }} @ ${{ item.price.toFixed(2) }}</p>
        </div>
        </div>

        <p><strong>Total: ${{ total.toFixed(2) }}</strong></p>

        <!-- الفورم لجمع بيانات المستخدم -->
        <form @submit.prevent="submitOrder">
        <div>
            <label>Name:</label>
            <input v-model="customer.name" required />
        </div>
        <div>
            <label>Phone:</label>
            <input v-model="customer.phone" required />
        </div>
        <div>
            <label>Address:</label>
            <input v-model="customer.address" required />
        </div>

        <button type="submit">Confirm Order</button>
        </form>

        <p v-if="message">{{ message }}</p>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const router = useRouter();

const items = JSON.parse(route.query.items || "[]");
const total = parseFloat(route.query.total || 0);

const customer = ref({
    name: '',
    phone: '',
    address: ''
});

const message = ref('');

async function submitOrder() {
    console.log("Items being sent:", items);
    console.log("Customer data:", customer.value);

    try {
        const response = await axios.post('http://127.0.0.1:8000/orders/create/', {
            user_id: 1, // لو عندك نظام مستخدمين ممكن تغيريها
            customer_name: customer.value.name,
            customer_phone: customer.value.phone,
            customer_address: customer.value.address,
            items: items.map(i => ({ product_id: i.id, quantity: i.qty }))
        });

        console.log("Server response:", response.data);
        message.value = 'Order successfully created!';

        router.push({ 
            name: 'ConfirmOrder', 
            query: { items: JSON.stringify(items), total: total } 
        });

    } catch (error) {
        console.error("Error details:", error.response?.data || error.message);
        message.value = 'Error creating order: ' + (error.response?.data?.detail || error.message);
    }
}





</script>

<style scoped>
.checkout-order {
    max-width: 500px;
    margin: 2rem auto;
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 8px;
}
.order-items {
    margin-bottom: 1rem;
}
.item {
        margin-bottom: 0.5rem;
}
form div {
        margin-bottom: 0.5rem;
}
button {
    padding: 0.5rem 1rem;
    background: #1EA575;
    color: white;
    border: none;
    border-radius: 5px;
}
</style>
