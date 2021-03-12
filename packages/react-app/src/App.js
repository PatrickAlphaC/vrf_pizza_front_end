import React from "react"
import { Contract } from "@ethersproject/contracts"
import { getDefaultProvider } from "@ethersproject/providers"
import { useQuery } from "@apollo/react-hooks"
import { ethers } from "ethers"

import { Body, Button, Header, Image, Link } from "./components"
import logo from "./pizzame.png"
import useWeb3Modal from "./hooks/useWeb3Modal"

import { addresses, abis } from "@project/contracts"
import GET_TRANSFERS from "./graphql/subgraph"

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
  await vrf_pizza.connect(signer)
  let seed_phrase = (Math.random()) * 1000000000000000000
  await vrf_pizza.order_pizza(seed_phrase)
}

function WalletButton({ provider, loadWeb3Modal, logoutOfWeb3Modal }) {
  return (
    <Button
      onClick={() => {
        if (!provider) {
          loadWeb3Modal()
        } else {
          logoutOfWeb3Modal()
        }
      }}
    >
      {!provider ? "Connect Wallet" : "Disconnect Wallet"}
    </Button>
  )
}

function App() {
  const { loading, error, data } = useQuery(GET_TRANSFERS)
  const [provider, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal()

  React.useEffect(() => {
    if (!loading && !error && data && data.transfers) {
      console.log({ transfers: data.transfers })
    }
  }, [loading, error, data])

  return (
    <div>
      <Header>
        <WalletButton provider={provider} loadWeb3Modal={loadWeb3Modal} logoutOfWeb3Modal={logoutOfWeb3Modal} />
      </Header>
      <Body>
        <center>
          <p>
            This was created in about 20 minutes
          <br></br>
          Please don't order anything outside of 11AM EDT - 10PM EDT. It won't work if you do that.
          Please swap to the *Polygon Mainnet*.
          <br></br>
            <
              Button onClick={() => orderPizza()}>
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
