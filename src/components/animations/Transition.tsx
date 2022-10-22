import React, { useState, useCallback, useEffect } from 'react'
import { useTransition, animated, AnimatedProps, useSpringRef } from '@react-spring/web'

import styles from '../../../styles/transition.module.css'

export default ({children, screenCount, currentIndex, isScrollDown}) => {
  const [index, set] = useState(0)
  const onClick = useCallback(() => set(state => (state + 1) % screenCount), [])
  
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
    
    <div className={`w-full h-full bg-black ${styles.container}`} >
      {transitions((style, i) => <div className={`bg-inherit`}><animated.div style={style}>{children[i]}</animated.div></div>)}
    </div>
  )
}
