import Wallet from "./Wallet"

const walletImgDir = `/images/wallets/`

export default function Wallets({ wallets, setSelectedWallet }) {
  return (
    <ul className="space-y-5">
      {
        Object.keys(wallets).map(wallet => {
          const currentWallet = wallets[wallet]
          const icon = returnIcon(currentWallet)
          return (
            <Wallet key={wallet}
              icon={icon}
              description={wallet}
              wallet={currentWallet}
              setSelectedWallet={setSelectedWallet} />
          )
        })
      }
    </ul>
  )
}

function returnIcon(wallet) {
  const name = wallet.name.toLowerCase()

  if (name.includes("typhon"))
    return `${walletImgDir}typhon.svg`
  else if (name.includes("eternl"))
    return `${walletImgDir}eternl.svg`
  else if (name.includes("gero"))
    return `${walletImgDir}gerowallet.svg`
  else
    return wallet.icon
}