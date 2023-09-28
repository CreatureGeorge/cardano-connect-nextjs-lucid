import { useEffect, useState } from "react";
import Wallets from "./Wallets";
import Header from "../Header"

export default function WalletSelection({ selectedWallet, setSelectedWallet }) {
  const [wallets, setWallets] = useState({})

  useEffect(() => {
    (
      async () => {
        await getWallets()
      }
    )()
  }, [])

  const getWallets = async () => {
    let foundWallets = {}
    const cardano = await window.cardano
    if (!cardano) {
      return
    }

    Object.keys(cardano).map(obj => {
      const curObj = cardano[obj]
      if (curObj.apiVersion && curObj.icon)
        foundWallets[(curObj.name).split(' ')[0]] = curObj
    })

    setWallets(foundWallets)
  }

  return (
    <>
      <Header title={`select a wallet >>`} />
      <div className={`flex justify-center items-center h-full my-5`}>
        <Wallets wallets={wallets} setSelectedWallet={setSelectedWallet}/>
      </div>
    </>
  )
}