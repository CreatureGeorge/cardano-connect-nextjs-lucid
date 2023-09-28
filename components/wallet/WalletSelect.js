import { Lucid, Blockfrost } from 'lucid-cardano'

import { useEffect, useState } from "react";
import Loading from "../Loading";
import Status from "../Status";
import WalletInfo from "./WalletInfo";
import WalletSelection from "./WalletSelection";

import { makeHexID, returnStakeAddressFromBech32, sleep } from '../../lib/base'
import { requestJWT, requestWhitelistCheck, requestTokenCount } from '../../lib/fetch'


export default function WalletSelect(
  { 
    funds, setFunds,
    statusMessage, setMessage, 
    loading, setLoading,
    lucid, setLucid, 
    api, setAPI, 
    selectedWallet, setSelectedWallet,
    setJWT,}) {
  const [loadingMessage, setLoadingMessage] = useState()

  useEffect(() => {
    (
      async () => {
        const lucid = await Lucid.new(
          new Blockfrost(process.env.api_url, process.env.api_key), process.env.api_net
        )
        setLucid(lucid)
      }
    )()
  }, [])

  useEffect(() => {
    (
      async () => {
        if (selectedWallet != null) {
          setLoading(true)
          setLoadingMessage("selecting wallet")
          const api = await selectedWallet.enable().catch((err) => {
            console.log(err)

            if (err.info) setMessage(err.info, "error")
            else if (err.message) setMessage(err.message, "error")
            else setMessage(JSON.stringify(err), "error")

            return null
          })

          if (!api) {
            reset()
            return
          }

          const networkId = await api.getNetworkId()
          if (networkId != process.env.network) {
            setMessage(`Wallet is not on network!`, "error")
            reset()
            return
          }

          await lucid.selectWallet(api)

          let verified = await verifyWallet()

          if (!verified) {
            setMessage(`Signature not verified!`, "error")
            reset()
            return
          }

          const utxos = await lucid.wallet.getUtxos()

          const walletAda = getTotalAda(utxos)
          setFunds(walletAda)

          setMessage(`${selectedWallet.name} loaded!`, "update")
          setAPI(api)

          await sleep(1000)
          setLoading(false)
        } else {
          reset()
        }
      }
    )()
  }, [selectedWallet])

  const getTotalAda = (utxos) => {
    let totalLovelace = 0

    for (const utxo in utxos) {
      let assets = utxos[utxo].assets

      Object.keys(assets).map(asset => {
        if (asset == 'lovelace') totalLovelace += Number(assets[asset])
      })
    }

    return (totalLovelace / 1000000).toFixed(2)
  }

  const reset = (all = false) => {
    if (all) 
      setMessage("Loaded!", "update")

    setLoading(false)
    setSelectedWallet(null)
    setAPI(null)
    setFunds(0)
  }

  const verifyWallet = async () => {
    const recipient = await lucid.wallet.address()

    const payload = makeHexID(100)

    const verify = await lucid.newMessage(recipient, payload).sign().then(async (message) => {
      const { status_code, jwt } = await requestJWT(recipient, payload, message)
      if (status_code != 200) return false
      setJWT(jwt)
      return {address: recipient, jwt: jwt}
    }).catch((error) => {
      console.log(error)
      return false
    })

    return verify
  }

  return (
    <div className={`justify-center text-center relative font-main text-main-text lowercase grid pointer-events-auto`}>
      <div className={`flex justify-end w-full ${(api == null) ? "max-w-[300px]" : "max-w-[50%] min-w-[300px]"} `}>
        <WalletInfo wallet={selectedWallet} api={api} funds={funds} reset={reset}/>
      </div>
      <div className={`grid border-main-primary  border-2 transition-all
                     bg-main-primary bg-opacity-90 z-10 ${(api != null && selectedWallet != null) ? "hidden" : "visible"}
                      max-w-[95vw] min-w-[300px]`}>
        <div className={`flex flex-col items-center 
                     row-start-1 row-end-2 col-start-1 col-end-2 
                     transition-opacity duration-500 ease-in-out  
                     ${(api == null) ? `opacity-100 z-10 visible` : `opacity-0 z-0 hidden`}`}>
          <WalletSelection selectedWallet={selectedWallet} setSelectedWallet={setSelectedWallet} />
        </div>
        <div className={`flex justify-center items-center 
                     row-start-1 row-end-3 col-start-1 col-end-2
                     transition-opacity duration-500 ease-in-out bg-black bg-opacity-75 
                     ${(loading) ? `opacity-100 z-20` : `opacity-0 z-0`}`}>
          <Loading message={loadingMessage} />
        </div>
      </div>
      <div className={`grid grid-flow-col text-center ${(api == null) ? "max-w-[300px]" : "max-w-[50%] min-w-[300px]"} `}>
        <Status statusMessage={statusMessage} />
      </div>
    </div>
  )
}