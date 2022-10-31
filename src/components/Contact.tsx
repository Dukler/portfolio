import React, { useState } from "react"
import EmailForm from "./EmailForm"
import Typography from "./Typography"
import Image from "next/image"
// import javascript from "../assets/javascript.svg"
// import typescript from "../assets/typescript.svg"
// import python from "../assets/python.svg"
// import nodejs from "../assets/nodejs.svg"
// import react from "../assets/react.svg"
// import go from "../assets/go.svg"
// import solidityDark from "../assets/solidity-dark.svg"
// import solidityLight from "../assets/solidity-light.svg"

// import githubLight from "../assets/Github-Light.png"
// import githubDark from "../assets/Github.png"
// import linkedin from "../assets/linkedin.svg"
// import discord from "../assets/discord.svg"


export default ({ theme }: { theme: 'dark' | 'light' | undefined }) => {
    const [tooltip, setTooltip] = useState(false)
    const [emailClassName, setEmailClassName] = useState("")
    const [emailFocus, setEmailFocus] = useState(false)

    

    const handleClickDiscord = ()=> {
        navigator.clipboard.writeText('dukler#3602')
        setTooltip(true)
        const timeout = setTimeout(()=>{
            setTooltip(false)
            clearTimeout(timeout)
        }, 5000);
    }


    return <div className="grid grid-cols-2 h-screen gap-x-4 pt-4 gap-y-2 lg:px-10 py-4 px-2 ">
        <Typography className="text-center text-4xl col-span-2">More about me</Typography>
        <div className="col-span-2 lg:px-32">
            <Typography className="text-md md:text-xl text-left">
                Over the years I worked with many technologies and multiple software architectures.
                So if you want to talk to me, go to the contact section below! <br />
                My main focus right now is on full stack systems, with the main technologies being:
            </Typography>
            <Typography className="text-md md:text-xl text-left pt-3 flex flex-row flex-wrap gap-x-4">
                <div className="flex items-center">
                    <Image src={'/react.svg'} width='28px' height='28px'/>React
                </div>
                <div className="flex items-center">
                    <Image src={theme === 'dark' ? '/solidity-dark.svg' : '/solidity-light.svg'} width='28px' height='28px'/>Solidity
                </div>
                <div className="flex items-center">
                    <Image src={'/nodejs.svg'} width='28px' height='28px'/>Node.js
                </div>
                <div className="flex items-center">
                    <Image src={'/python.svg'} width='28px' height='28px'/>Python
                </div>
                <div className="flex items-center">
                    <Image src={'/go.svg'} width='28px' height='28px'/>Go
                </div>
                {/* <ul className="marker:text-dark dark:marker:text-white list-inside">
                    <li className="flex flex-row items-start gap-x-2 pb-2">
                        <Image src={javascript} width='28px' height='28px'/>
                        <Image src={typescript} width='28px' height='28px'/>
                        Javascript/Typescript
                    </li>
                    <li className="flex flex-row items-start gap-x-2 pb-2"><Image src={react} width='28px' height='28px'/>React</li>
                    <li className="flex flex-row items-start gap-x-2 pb-2"><Image src={theme === 'dark' ? solidityDark : solidityLight} width='28px' height='28px'/>Solidity</li>
                    <li className="flex flex-row items-start gap-x-2 pb-2"><Image src={nodejs} width='28px' height='28px'/>Node.js</li>
                    <li className="flex flex-row items-start gap-x-2 pb-2"><Image src={python} width='28px' height='28px'/>Python</li>
                    <li className="flex flex-row items-start gap-x-2 pb-2"><Image src={go} width='28px' height='28px'/>Go</li>
                </ul> */}
            </Typography>
        </div>
        <Typography className="text-center text-4xl col-span-2">Contact me</Typography>
        <div><EmailForm /></div>
        
        <div className="select-none">
            <Typography className="text-3xl">Other places</Typography>
            
            <a href="https://github.com/Dukler/" target='_blank' className="flex flex-row gap-x-2 py-1 w-fit">
                <Image src={theme === 'dark' ? '/GitHub-Light.png' : '/GitHub.png'} width='26px' height='26px'/>
                <Typography className="text-xl">Github</Typography>
            </a>
            
            <a href="https://www.linkedin.com/in/mart%C3%ADn-ochoa-b9b74b84/" target='_blank' className="flex flex-row gap-x-2 py-1 w-fit">
                <Image src={'/linkedin.svg'} width='26px' height='26px'/>
                <Typography className="text-xl">Linkedin</Typography>
            </a>
            
            {/* <div className="flex flex-row gap-x-2 py-1 cursor-pointer w-fit" onClick={handleClickDiscord}>
                <div className="bg-[#5865F2] w-7 h-7 rounded-full flex justify-center">
                    <Image src={discord} width='18px' height='18px'/>
                </div>
                <Typography className="text-xl">
                    Discord
                    <span className={`${!tooltip ? 'hidden' : ''} absolute ml-2 bg-zinc-400 px-1.5 rounded-md text-white`} >User copied!</span>
                </Typography>
            </div> */}
        </div>
        
    </div>
}