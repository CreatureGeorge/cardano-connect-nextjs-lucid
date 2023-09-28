export default function Header({ title }) {
  return (
    <p className="text-lg border-b border-main-primary rounded-tr-xl
                   w-full bg-main-secondary p-4 lowercase">
      {title}
    </p>
  )
}