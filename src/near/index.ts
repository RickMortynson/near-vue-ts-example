import * as nearAPI from 'near-api-js'
import { Buffer } from 'buffer'

// IMPORTANT!!
window.Buffer = Buffer

const near = new nearAPI.Near({
  headers: {},
  networkId: 'testnet',
  keyStore: new nearAPI.keyStores.BrowserLocalStorageKeyStore(),
  nodeUrl: 'https://rpc.testnet.near.org',
  walletUrl: 'https://wallet.testnet.near.org',
  helperUrl: 'https://helper.testnet.near.org',
  explorerUrl: 'https://explorer.testnet.near.org'
} as nearAPI.ConnectConfig)

export const wallet = new nearAPI.WalletConnection(near, 'nice-prefix')

export const connectWallet = async () => {
  return await wallet.requestSignIn()
}

export const getWalletBalance = async () => {
  const balance = (await wallet.account().state()).amount
  return nearAPI.utils.format.formatNearAmount(balance) as string
}

export const formatBalanceToHuman = (balance: string) => {
  const numberBalance = Number(balance)

  return numberBalance.toFixed(3)
}

export const logoutNear = () => {
  wallet.signOut()
  location.reload()
}
