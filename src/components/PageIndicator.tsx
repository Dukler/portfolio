import React, { useEffect, useState } from "react"

export default ({screenCount, currentIndex}) => {
    const [dots, setDots] = useState<React.ReactNode[]>([])

    useEffect(() => {
      
        const dots = []
        for (let index = 0; index <= screenCount; index++) {
            const color = currentIndex === index ? 'bg-zinc-900 dark:bg-gray-200' : 'bg-zinc-500 dark:bg-gray-500'
            const brightness = currentIndex === index ? 'brightness-200' : 'brightness-75'
            // const shadow = currentIndex === index ? 'shadow-md shadow-white' : ''
            const opacity = currentIndex === index ? 'opacity-100' : 'opacity-40'
            dots.push(<div key={index} className={`${color} rounded-full w-3 h-3 ${brightness} ${opacity}`}></div>)
        }
        setDots(dots)
    }, [screenCount, currentIndex])
    


    return <div className="fixed w-full h-full flex flex-row-reverse pointer-events-none ">
        <div className="flex flex-col gap-y-2 self-center mr-3">
            {dots}
        </div>
    </div>
}