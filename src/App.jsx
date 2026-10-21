import { MotionConfig } from 'motion/react'
import Background from './components/layout/Background'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import { BackToTop, ScrollProgress } from './components/layout/ScrollExtras'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Cybersecurity from './components/sections/Cybersecurity'
import Skills from './components/sections/Skills'
import Expertise from './components/sections/Expertise'
import Projects from './components/sections/Projects'
import Education from './components/sections/Education'
import Experience from './components/sections/Experience'
import Contact from './components/sections/Contact'

export default function App() {
  return (
    // reducedMotion="user" respects the OS "reduce motion" setting for all Motion animations
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only z-[70] rounded-full bg-primary px-4 py-2 text-sm font-medium text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <Background />
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Cybersecurity />
        <Skills />
        <Expertise />
        <Projects />
        <Education />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </MotionConfig>
  )
}
