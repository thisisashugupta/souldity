import Cards from '@/components/home/Cards'

export default function Page() {
  return (
    <div className="p-4 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-left gap-5">
      <Cards />
    </div>
  )
}