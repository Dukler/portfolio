import Image from "next/image"
import HTML5 from "../assets/HTML5.svg"
import nextjsLight from "../assets/nextjs-light.svg"
import nextjsDark from "../assets/nextjs-dark.svg"
import CSS from "../assets/CSS.svg"
import javascript from "../assets/javascript.svg"
import typescript from "../assets/typescript.svg"
import python from "../assets/python.svg"
import nodejs from "../assets/nodejs.svg"
import react from "../assets/react.svg"
import solidityDark from "../assets/solidity-dark.svg"
import solidityLight from "../assets/solidity-light.svg"
import etherjsDark from "../assets/etherjs-dark.svg"
import etherjsLight from "../assets/etherjs-light.svg"
import metamask from "../assets/metamask.svg"
import hardhat from "../assets/hardhat.svg"
import java from "../assets/java.svg"
import go from "../assets/go.svg"
import gatsbyjs from "../assets/gatsbyjs.svg"
import redux from "../assets/redux.svg"
import tux from "../assets/Tux.svg"
import React from "react"

const getIcons = (theme: 'dark' | 'light') => [
    {
        src: HTML5,
        name:'HTML'
    },
    {
        src: CSS,
        name:'CSS'
    },
    {
        src: javascript,
        name:'Javascript'
    },
    {
        src: typescript,
        name:'Typescript'
    },
    {
        src: react,
        name:'React'
    },
    {
        src: redux,
        name:'Redux'
    },
    {
        src: theme === 'dark' ? nextjsLight : nextjsDark,
        name:'Next.js'
    },
    {
        src: gatsbyjs,
        name:'Gatsby.js'
    },
    {
        src:  theme === 'dark' ? solidityDark : solidityLight,
        name:'Solidity'
    },
    {
        src:  theme === 'dark' ? etherjsDark : etherjsLight,
        name:'Ether.js'
    },
    {
        src:  metamask,
        name:'Web3.js/py'
    },
    {
        src:  hardhat,
        name:'Hardhat'
    },
    {
        src: nodejs,
        name:'Node.js'
    },
    {
        src: python,
        name:'Python'
    },
    {
        src: java,
        name:'Java'
    },
    {
        src: go,
        name:'Go'
    },
    {
        src: tux,
        name:'Linux'
    }
]

export default ({ theme }: { theme: 'dark' | 'light' }) => {
    return <div className="grid grid-cols-1 min-h-screen justify-center items-center px-8">
        <h1 className="dark:text-white font-roboto text-5xl lg:text-6xl text-center ">Skills</h1>
        <div className="flex justify-center items-center select-none self-start">
            <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-5 md:gap-8 lg:gap-12">
                {getIcons(theme).map(item =>
                    <div key={item.name} className="flex flex-col items-center ">
                        <div className="w-12 h-12 md:w-20 md:h-20 lg:w-28 lg:h-28 relative">
                            <Image src={item.src} layout="fill"/>
                        </div>
                        <p className="dark:text-white font-roboto text-md lg:text-xl text-center pt-0.5">{item.name}</p>
                    </div>
                )}
            </div>
        </div>
    </div>
}