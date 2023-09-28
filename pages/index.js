import { Inter } from 'next/font/google'
import WalletSelect from '@/components/wallet/WalletSelect'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [loading, setLoading] = useState(false)

  const [statusMessage, setStatusMessage] = useState({ type: "update", message: "Loaded!" })

  const [selectedWallet, setSelectedWallet] = useState(null)
  const [api, setAPI] = useState(null)
  const [funds, setFunds] = useState(0)

  const [lucid, setLucid] = useState(null)
  const [jwt, setJWT] = useState(null)

  function setMessage(message, type) {
    setStatusMessage({
      type: type,
      message: message
    })
  }

  return (
    <main className={`flex min-h-screen bg-main-background  w-full flex-col items-center justify-center p-24 ${inter.className}`}>
      <div className={`flex h-full p-2 pointer-events-none transition-all ${(api != null && selectedWallet != null) ? "justify-center sm:justify-end items-start" : "justify-center items-center"}`}>
          <WalletSelect
            funds={funds} setFunds={setFunds}
            statusMessage={statusMessage} setMessage={setMessage}
            loading={loading} setLoading={setLoading}
            lucid={lucid} setLucid={setLucid}
            api={api} setAPI={setAPI}
            selectedWallet={selectedWallet} setSelectedWallet={setSelectedWallet}
            setJWT={setJWT} />
        </div>
    </main>
  )
}
