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
  console.log(addresses.mainnet_pizza_vrf)
  // console.log(abis.vrf_pizza)
  const vrf_pizza = new Contract(addresses.mainnet_pizza_vrf, abis.vrf_pizza, provider)
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
          <p className="smaller">
            VRF Pizza is an app that allows you to buy Patrick a verifiably random pizza on the Polygon chain, using <a href="https://docs.chain.link/docs/get-a-random-number">Chainlink VRF</a> to get the RNG, <a href="https://docs.chain.link/docs/get-the-latest-price">Chainlink Data Feeds</a> to get the Matic->USD->Pizza price, and <a href="https://docs.chain.link/docs/make-a-http-get-request">Chainlink API Calls</a> and <a href="https://docs.chain.link/docs/contract-creators">external adapters</a> to have Dominos deliver. If you need some Polygon (Matic) token, you can swap it with their <a href="https://wallet.matic.network/bridge">bridge</a>. The cost is associated to being the max cost of an insanly disgusting pizza, which is about $55 in MATIC. If a lot of people do this, I'll probably do a reverse NFT airdrop or something. But this is really just for fun.
          </p>
        </div>
      </Body>
    </div >
  )
}

export default App
