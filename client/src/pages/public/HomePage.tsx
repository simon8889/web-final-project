import Hero from '@/components/ui/Hero'
import Pricing from '@/components/ui/Pricing'
import Contact from '@/components/ui/Contact'
import { BubbleBackground } from '@/components/ui/shadcn-io/bubble-background'

const colorConfig = {
  first: '113,113,122',
  second: '161,161,170',
  third: '212,212,216',
  fourth: '63,63,70',
  fifth: '39,39,42',
  sixth: '24,24,27',
}

const HomePage = () => {
  return (
    <div className="relative">
      <BubbleBackground
        interactive={true}
        colors={colorConfig}
        className="fixed inset-0 z-0 bg-black"
      />
      <div className="relative z-200">
        <Hero />
        <Pricing />
        <Contact />
      </div>
    </div>
  )
}

export default HomePage
