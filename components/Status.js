export default function Status({ statusMessage }) {
  return (
    <div className={`px-4 py-2 bg-opacity-50 border-t-[1px] border-4 lowercase font-thin rounded-b-xl
        ${(statusMessage.type == "error") ?
        "text-red-600 bg-red-600 border-red-600" :
        "text-main-text bg-main-primary border-main-primary"}`}>
      <p className={`${(statusMessage.type == "alert") ? "animate-beat text-red-600" : "animate-none"}`}>
          {statusMessage.message}
      </p>
    </div>
  )
}