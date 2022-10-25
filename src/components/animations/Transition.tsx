import React, { useState, useCallback, useEffect } from 'react'
import { useTransition, animated, useSpringRef } from '@react-spring/web'

import styles from '../../../styles/transition.module.css'
import { ReactNode } from 'react'

type props = {
  children: Array<ReactNode>,
  currentIndex:number,
  isScrollDown:boolean
}

export default ({children, currentIndex, isScrollDown} : props) => {
  const [index, set] = useState(0)
  // const onClick = useCallback(() => set(state => (state + 1) % screenCount), [])
  
  useEffect(() => {
    set(currentIndex)
  }, [currentIndex])

  const transRef = useSpringRef()

  const transitions = useTransition(index, {
    ref: transRef,
    keys: null,
    from: ()=> {
        const sign = isScrollDown ? '' : '-';
        return { opacity: 0, transform: `translate3d(0%,${sign}100%,0)`, backgroundColor: 'inherit'}
    },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)', backgroundColor: 'inherit' },
    leave: ()=>{
        const sign = isScrollDown ? '-' : ''
        return{ opacity: 0, transform: `translate3d(0%,${sign}50%,0)`, backgroundColor: 'inherit' }
    },
  })
  useEffect(() => {
    transRef.start()
  }, [index])
  return (
    <div className={`w-full h-full dark:bg-black ${styles.container}`} >
      {transitions((style, i) => <div className={`bg-inherit`}><animated.div style={style}>{children![i]}</animated.div></div>)}
    </div>
  )
}
