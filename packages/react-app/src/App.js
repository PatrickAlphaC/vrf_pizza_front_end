import React from "react"
import { Contract } from "@ethersproject/contracts"
import { getDefaultProvider } from "@ethersproject/providers"
import { ethers } from "ethers"
import Navbar from "./components/navbar/Navbar"
import "./App.css"
import { Body, Button, Image, Link } from "./components"
import logo from "./pizzame.png"

import { addresses, abis } from "@project/contracts"

async function orderPizza() {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()
  // Should replace with the end-user wallet, e.g. Metamask
  console.log(addresses.kovan_pizza_vrf)
  // console.log(abis.vrf_pizza)
  const vrf_pizza = new Contract(addresses.kovan_pizza_vrf, abis.vrf_pizza, provider)
  const pizzaPriceInMatic = await vrf_pizza.view_matic_pizza_price()
  console.log(pizzaPriceInMatic)
  let contract_with_signer = await vrf_pizza.connect(signer)
  let seed_phrase = Math.floor(Math.random() * 1000000)
  console.log(seed_phrase)
  await contract_with_signer.order_pizza(seed_phrase, { 'value': pizzaPriceInMatic + 1 })
}


function App() {
  return (
    <div>
      <Navbar></Navbar>
      <Body>
        <div className="main-box">
          <p >
            <br></br>
          1. Please don't order anything outside of 11AM EDT - 10PM EDT. It won't work if you do that.
          <br></br>
            <br></br>
          2. Please swap to the *Polygon Mainnet*.
          <br></br>
          </p>
          <Button onClick={() => orderPizza()}>
            Order Patrick a Random Pizza
            </Button>
          <center>
            <Image src={logo} alt="react-logo" />
          </center>
          {/* Remove the "hidden" prop and open the JavaScript console in the browser to see what this function does */}
          <center>
            <Link href="https://chain.link/hackathon">Join the Chainlink Hackathon</Link>
          </center>
        </div>
      </Body>
    </div >
  )
}

export default App
