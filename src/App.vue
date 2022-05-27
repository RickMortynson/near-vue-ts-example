<template>
  <main class="container">
    <div class="base-button" v-if="!user.loggedIn" @click="handleClickLogIn">Log in</div>
    <div v-else class="user-info-block">
      <div><span>account id:</span> {{ user.accountId }}</div>
      <div><span>balance:</span> {{ user.balance }}</div>
      <div><span>human-format balance:</span> {{ near.formatBalanceToHuman(user.balance) }}</div>

      <div class="logout-button" @click="handleClickLogOut">Logout</div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from 'vue'
import * as near from './near'

const handleClickLogIn = () => {
  console.log('log in click')
  near.connectWallet()
}

const handleClickLogOut = () => {
  near.logout()
}

const user = reactive({
  loggedIn: false,
  balance: '',
  accountId: ''
})

onMounted(() => {
  if (near.wallet.getAccountId()) {
    near.getWalletBalance().then(balance => {
      // prettier-ignore
      user.accountId = near.wallet.getAccountId(),
      user.balance = balance,
      user.loggedIn = true
    })
  }
})
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

span {
  font-weight: bold;
}

.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.user-info-block {
  text-align: left;
}

.logout-button {
  width: fit-content;
  margin: auto;
  text-align: center;
  margin-top: 1rem;
}

.logout-button,
.base-button {
  padding: 1rem 2.5rem;
  background-color: magenta;
  filter: brightness(0.9);
  font-weight: bold;
  padding: 1rem 2.5rem;
  user-select: none;
  cursor: pointer;
}
</style>
