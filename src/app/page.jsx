import Hero from '../components/Hero'
import CarnivalBanner from '../components/CarnivalBanner'
import Features from '../components/Features'
import Facilities from '../components/Facilities'
import Location from '../components/Location'
import Tickets from '../components/Tickets'
import Info from '../components/Info'
import Essentials from '../components/Essentials'
import Awards from '../components/Awards'
import Gallery from '../components/Gallery'
import CTA from '../components/CTA'
import FAQ from '../components/FAQ'

export default async function HomePage() {
  // Add a small artificial delay so the user can see the custom Loader animation
  await new Promise((resolve) => setTimeout(resolve, 800));

  return (
    <>
      <Hero/>
      <CarnivalBanner/>
      <Features/>
      <Facilities/>
      <Location/>
      <Tickets/>
      <Info/>
      <Essentials/>
      <Awards/>
      <Gallery/>
      <CTA/>
      <FAQ/>
    </>
  )
}
