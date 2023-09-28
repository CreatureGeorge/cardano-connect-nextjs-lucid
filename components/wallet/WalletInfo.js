export default function WalletInfo({ wallet, api, funds, reset }) {
  return (
    <div className={`flex lowercase rounded-t-xl border-4 border-b-0 border-main-primary
                     bg-main-primary bg-opacity-50
                     px-4 py-2 w-full h-10 object-contain items-center 
                     ${(api != null && wallet != null) ? "justify-between" : "justify-center"}`}>
      <div className={`flex justify-center items-center`} >
        <button className={`p-1 hover:scale-105 hover:font-semibold hover:animate-pulse ${(api != null && wallet != null) ? "visible" : "hidden"}`} title="reset">
          <img className="object-contain h-5 mr-2" src={`${(api != null && wallet != null) ? wallet.icon : ""}`} alt="walleticon" />
        </button>
        <p className="">{(api != null && wallet != null) ? `${funds} ₳` : "-no wallet-"}</p>
      </div>
      <button onClick={() => reset(true)} className={`p-1 group hover:scale-105 transition-all duration-300 flex ${(api != null && wallet != null) ? "visible" : "hidden"}`} title="reset">
        <div>
          <img className="object-contain h-5 mr-2 group-hover:animate-spin transition-all duration-300" src={"/images/icons/reset.png"} alt="reset" />
        </div>
        <p className="group-hover:animate-pulse transition-all duration-300">
          reset
        </p>
      </button>
    </div>
  )
}