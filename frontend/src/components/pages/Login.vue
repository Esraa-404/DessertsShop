<template>
    <div class="login-container">
        <h2>Login</h2>
        <form @submit.prevent="login">
        <input v-model="username" placeholder="Username" required />
        <input type="password" v-model="password" placeholder="Password" required />
        <button type="submit">Login</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')
const password = ref('')

function login() {
    if(username.value === 'admin' && password.value === '1234') {
        localStorage.setItem('user', username.value)
        router.push({ name: 'Home' })
    } else {
        alert('Invalid credentials')
    }
}
</script>

<style scoped>
.login-container {
    max-width: 400px;
    margin: 5rem auto;
    padding: 2rem;
    border: 1px solid #ccc;
    border-radius: 8px;
}

input {
    display: block;
    width: 100%;
    margin-bottom: 1rem;
    padding: 0.5rem;
}

button {
    padding: 0.5rem 1rem;
    background-color: #ff7e5f;
    color: #fff;
    border: none;
    cursor: pointer;
    border-radius: 4px;
}
</style>
