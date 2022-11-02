import React, { Dispatch, SetStateAction } from "react"
import Image from "next/image"

type props = {
    theme: 'dark' | 'light' | undefined,
    setTheme: Dispatch<SetStateAction<"dark" | "light" | undefined>>
}

export default ({theme, setTheme}: props)=>{
    return <div>
        <div className="flex flex-col min-h-screen text-center justify-center">
            {/* <Image src={`${theme == 'dark' ? '/dark-mode.png' : '/light-mode.svg'}`} width={35} height={35}/> */}
            
            <h1 className="dark:text-white font-roboto text-8xl ">Martín Ochoa</h1>
            <h2 className="dark:text-white font-roboto text-5xl ">Fullstack developer</h2>
        </div>
        <div className="absolute top-0 right-10 border-2 border-t-0 rounded-b-lg border-black dark:border-white cursor-pointer" onClick={()=>setTheme(theme == 'light' ? 'dark' : 'light')}>
            <Image src={`${theme == 'light' ? '/dark-mode.png' : '/light-mode.svg'}`} width={35} height={35}/>
        </div>
    </div>
}