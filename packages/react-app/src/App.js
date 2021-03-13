import React from "react"
import { Contract } from "@ethersproject/contracts"
import { getDefaultProvider } from "@ethersproject/providers"
import { ethers } from "ethers"
import Navbar from "./components/navbar/Navbar"

import { Body, Button, Header, Image, Link } from "./components"
import logo from "./pizzame.png"

import { addresses, abis } from "@project/contracts"

async function readOnChainData() {
  // Should replace with the end-user wallet, e.g. Metamask
  const defaultProvider = getDefaultProvider()
  // Create an instance of an ethers.js Contract
  // Read more about ethers.js on https://docs.ethers.io/v5/api/contract/contract/
  const ceaErc20 = new Contract(addresses.ceaErc20, abis.erc20, defaultProvider)
  // A pre-defined address that owns some CEAERC20 tokens
  const tokenBalance = await ceaErc20.balanceOf("0x3f8CB69d9c0ED01923F11c829BaE4D9a4CB6c82C")
  console.log({ tokenBalance: tokenBalance.toString() })
}

async function orderPizza() {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()
  // Should replace with the end-user wallet, e.g. Metamask
  console.log(addresses.kovan_pizza_vrf)
  // console.log(abis.vrf_pizza)
  const vrf_pizza = new Contract(addresses.kovan_pizza_vrf, abis.vrf_pizza, provider)
  const pizzaPriceInMatic = await vrf_pizza.view_matic_pizza_price()
  let contract_with_signer = await vrf_pizza.connect(signer)
  let seed_phrase = Math.floor(Math.random() * 1000000)
  console.log(seed_phrase)
  // await contract_with_signer.order_pizza(seed_phrase)
}


function App() {
  return (
    <div>
      <Navbar></Navbar>
      <Header>
      </Header>
      <Body>
        <center>
          <p>
            This was created in about 20 minutes
          <br></br>
          Please don't order anything outside of 11AM EDT - 10PM EDT. It won't work if you do that.
          Please swap to the *Polygon Mainnet*.
          <br></br>
            <Button onClick={() => orderPizza()}>
              Order Patrick a Random Pizza
        </Button>
          </p>
        </center>
        <Image src={logo} alt="react-logo" />
        {/* Remove the "hidden" prop and open the JavaScript console in the browser to see what this function does */}
        <Button hidden onClick={() => readOnChainData()}>
          Read On-Chain Balance
        </Button>
        <Link href="https://chain.link/hackathon">Join the Chainlink Hackathon</Link>
      </Body>
    </div >
  )
}

export default App
