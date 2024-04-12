import LinkCard from '@/components/LinkCard'

export default function Cards() {
  return (
    <>

      <LinkCard
        href="/uni"
        title="University"
        description="Register your uni to start creating tokens and NFTs!"
      />

      <LinkCard
        href="/stu"
        title="Student"
        description="Get your student ID anytime, anywhere!"
      />

      <LinkCard
        href="https://github.com/thisisashugupta/souldity"
        title="Github"
        description="Codebase of the project"
      />

    </>
  )
}