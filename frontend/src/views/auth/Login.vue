<template>
    <div class="login-container">
        <h2>Login</h2>
        <form @submit.prevent="handleLogin">
        <div>
            <label>Email:</label>
            <input type="email" v-model="email" required />
        </div>

        <div>
            <label>Password:</label>
            <input type="password" v-model="password" required />
        </div>

        <button type="submit">Login</button>
        </form>
    </div>
</template>

<script>
export default {
    name: "Login",
    data() {
        return {
        email: "",
        password: "",
        };
    },
    methods: {
        handleLogin() {
        console.log("Email:", this.email);
        console.log("Password:", this.password);
        alert("Login attempt!");
        },
    },
    };
</script>

<style scoped>
.login-container {
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    border-radius: 10px;
    background: #f7f7f7;
    box-shadow: 0 0 10px #ccc;
}

input {
    width: 100%;
    padding: 8px;
    margin: 5px 0 15px;
}

button {
    background: #42b983;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
}
</style>
