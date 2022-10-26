import type { NextPage } from 'next'
import Head from 'next/head'
import {useEffect, useState, WheelEvent  } from 'react'
import Contact from '../src/components/Contact'
import Description from '../src/components/Description'
import Intro from '../src/components/Intro'
import PageIndicator from '../src/components/PageIndicator'
import Projects from '../src/components/Projects'
import Skills from '../src/components/Skills'
import Transition from '../src/components/animations/Transition'
import { TouchEvent } from 'react'
import { Touch } from 'react'

export enum Screens {
  Intro,
  Description,
  Skills,
  Projects,
  Contact
}


const Home: NextPage = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isScrollDown, setIsScrollDown] = useState<boolean>(false);
  const [canScroll, setCanScroll] = useState<{ up: boolean, down: boolean }>({ up: true, down: true });
  const [scrollDelayActive, setScrollDelayActive] = useState<boolean>(false);
  const screenCount = (Object.keys(Screens).length / 2) - 1;
  const textShadow = theme === 'dark' ? '0px 2px 40px #ffffff20, 0px 2px 5px #ffffff30' : '0px 2px 40px #00000020, 0px 2px 5px #00000030'
  const scrollDelay = 400
  let start:Touch;

  const pcScrollDelay = () => {
    //if pc
    setScrollDelayActive(true)
    //
  }
  const handleTouchStart = (e:TouchEvent) => {
    start = e.changedTouches[0]

  }
  const handleTouchEnd = (e:TouchEvent) => {
    if (e.type === 'wheel') return
    let end = e.changedTouches[0];
    if (!end?.screenY || !start?.screenY) return
    if (currentIndex > 0 && end.screenY - start.screenY > 0) {
      setIsScrollDown(false);
      setCurrentIndex(currentIndex - 1)
    } else if (currentIndex < screenCount && end.screenY - start.screenY < 0) {
      setIsScrollDown(true);
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handleScroll = async (event: WheelEvent<HTMLDivElement>) => {
    if (scrollDelayActive) return
    if (event.deltaY > 0) {
      if (currentIndex < screenCount && canScroll.down) {
        setCurrentIndex(currentIndex + 1)
        setIsScrollDown(true)
        pcScrollDelay()
      }
    } else {
      if (currentIndex > 0 && canScroll.up) {
        setCurrentIndex(currentIndex - 1)
        setIsScrollDown(false)
        pcScrollDelay()
      }
    }
  };
  useEffect(() => {
    setCanScroll({ up: true, down: true })
    setTimeout(() => {
      setScrollDelayActive(false)
    }, scrollDelay)
  }, [currentIndex])

  return (
    <div className={theme}>
      <Head>
        <title>Martin Ochoa</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <main style={{ textShadow }} className={`w-full bg-white dark:bg-black dark:text-white font-roboto`} onWheel={handleScroll} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        {/* <div className='dark:bg-black h-full w-full absolute'/> */}
        <Transition currentIndex={currentIndex} isScrollDown={isScrollDown}>
          <Intro />
          <Description />
          <Skills theme={theme} />
          <Projects />
          <Contact theme={theme} />
        </Transition>
        <PageIndicator currentIndex={currentIndex} screenCount={screenCount} />

      </main>
    </div>
  )

}

export default Home
