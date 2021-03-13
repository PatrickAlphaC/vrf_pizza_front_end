import React, { useState } from 'react'
import { MenuItems } from "./MenuItems"
import './Navbar.css'
import { Button } from "../Button"
import useWeb3Modal from "../../hooks/useWeb3Modal"

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

const Navbar = () => {
    const [provider, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal()
    const [clicked, setClicked] = useState(false)

    const handleClick = () => {
        setClicked(!clicked)
    }

    return (
        <nav className="NavbarItems">
            <h1 className="navbar-logo">
                VRF Pizza <i className="fab fa-pizza-slice"></i>
            </h1>
            <div className="menu-icon" onClick={handleClick}>
                <i className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
            </div>

            <ul className={clicked ? 'nav-menu active' : 'nav-menu'}>
                {MenuItems.map((item, index) => {
                    return (
                        <li key={index}>
                            <a className={item.cName} href={item.url}>
                                {item.title}
                            </a>
                        </li>
                    )
                })}
            </ul>
            <WalletButton provider={provider} loadWeb3Modal={loadWeb3Modal} logoutOfWeb3Modal={logoutOfWeb3Modal} />
        </nav>
    )
}

export default Navbar
