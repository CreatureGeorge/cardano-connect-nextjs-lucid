import Image from "next/image";

export default function Loading({ message }) {
  return (
    <div className="grid place-items-center p-2">
     <div className="relative h-[80px] w-[60px]">
     <Image
          id="loading"
          className={`absolute object-cover`}
          src="/gifs/loading.gif"
          alt="loading"
          fill
        />
      </div>
      <p className="font-light text-sm mt-2 lowercase">{message}<span className="animate-pulse font-bold ml-[2px]">|</span></p>
    </div>
  )
}