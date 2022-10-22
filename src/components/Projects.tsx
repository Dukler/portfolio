import Image from "next/image"
import githubLight from "../assets/Github-Light.png"
import boxArrow from "../assets/box-arrow.svg"
import Typography from "./Typography"
import React, { useEffect, useState } from "react"

const projects = [
    {
        name: 'Duckstack UI v1',
        demo: 'https://duckstackui.firebaseapp.com/',
        description: 'Duckstack UI is a dynamic server rendered JSON based React framework that very efficiently lazy loads any component built into the library. \n' +
            "It leverages redux to manage the state of the application and it's side effects, react hooks to handle the life cycles of each component " +
            "and Material UI to bootstrap the interface components. \n" +
            "The JSONs containing the UI of the whole application are stored in the DSBackend server, and sent to the front-end on every refresh.\n" +
            "DSAppServer is the server that connects and queries to the database that stores which application belongs to each domain. \n" +
            "Both servers are developed in Go, and the db is in PostgreSQL",
        repositories: [
            { title: 'DSUI', src: 'https://github.com/Dukler/duckstackui' },
            { title: 'DSBackend', src: 'https://github.com/Dukler/DSBackend' },
            { title: 'DSAppServer', src: 'https://github.com/Dukler/DSAppServer' }
        ],
        live: "https://duckstackui.firebaseapp.com/"
    },
    {
        name: 'Duckstack UI v2',
        description: 'This is the version 2 of the same UI, but using Next.js and with a few improvements to the code, the JSON readability and implematation to some libraries like Redux.',
        repositories: [{ title: '', src: 'https://github.com/Dukler/duckstackui-v2' }]
    },
    {
        name: 'Duklerplace',
        live: 'https://duklerplace.vercel.app/',
        description: 'This is a NFT marketplace for the ethereum network built with React + Next.js and deployed in the Goerli Testnet.',
        repositories: [
            { title: 'Front-end', src: 'https://github.com/Dukler/duklerplace-frontend' },
            { title: 'Contracts', src: 'https://github.com/Dukler/duklerplace-contracts' }
        ]
    },
    {
        name: 'NFArcade',
        live: 'https://nfarcade.herokuapp.com/',
        description: 'This is a live website I built for a Web3 game of a startup company.',
        repositories: [{ title: '', src: 'https://github.com/Dukler/nfarcade' }]
    },
    {
        name: 'Dukler bot',
        description: 'This is a discord bot developed in node.js meant to handle any dedicated game servers like minecraft, valheim or zomboid through discord, ' +
            'you can send admin commands or even configure a shutdown timer if no one is online.',
        repositories: [{ title: '', src: 'https://github.com/Dukler/dukler-bot' }]
    },
    {
        name: 'DuklerSea bot',
        description: 'This is a discord bot developed in python that searches any collection hosted in OpenSea and then you can query for the collection floor price or the price and attributes of any specific asset.',
        repositories: [{ title: '', src: 'https://github.com/Dukler/DuklerSea-bot' }]
    },
    // {
    //     name: 'dukler bot',
    //     repositories: [{ title: '', src: 'https://github.com/Dukler/dukler-bot' }]
    // },
]
let scrollBuffer=0;
export default ({ setCanScroll, isScrollDown, setCurrentIndex, canScroll, currentIndex }) => {
    
    const [buffer, setBuffer] = useState(20)
    

    const handleMouseEnter = (e) => {
        if(e.type ==='touchmove') return
        const state = {up:false, down:false}
        // scrollBuffer=0;
        setCanScroll(state)
    }
    const handleMouseLeave = (e) => {
        if(e.type ==='touchmove') return
        const state = {up:true, down:true}
        setCanScroll(state)
    }
    const onClickHandler = (src) => {
        window.open(
            src,
            '_blank'
        )
    }
    
    useEffect(()=>{
        scrollBuffer = 0
    },[currentIndex])

    const handleScroll = (e) =>{
        // const botMobile = e.currentTarget.scrollHeight - e.currentTarget.scrollTop === e.currentTarget.clientHeight;
        // const bot = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        // const bottom = e.type === 'touchmove' ? botMobile : bot;
        const bottom = e.currentTarget.scrollTop + e.currentTarget.clientHeight >= e.currentTarget.scrollHeight
        console.log(bottom)
        const top = e.currentTarget.scrollTop === 0;
        let state = {down:false,up:false}
        // if (e.type === 'touchemove') 
        if (bottom) {
            scrollBuffer++;
            state = {down:true,up:false}
            // console.log('bot')
        }
        if(top) {
            scrollBuffer++;
            state = {down:false,up:true}
            // console.log('top')
        }
        console.log('scrollbuffer',scrollBuffer)
        if (scrollBuffer <= buffer) return
        setCanScroll(state)
    }

    const handleTouchStart = () =>{
        console.log('touchstart',canScroll)
        setBuffer(25)
        if (buffer > scrollBuffer)
            setCanScroll({up:false,down:false})
        
        
    }

    const handleTouchEnd = (e)=>{
        // setPointers('pointer-events-none')
        if(canScroll.down){
            setCurrentIndex(currentIndex + 1)
        }else if (canScroll.up){
            setCurrentIndex(currentIndex - 1)
        }
    }

    return <div className="flex flex-col items-center w-full h-screen pt-2 pb-16 md:pb-12">
        <Typography className="text-2xl h-20">Check some of my work out!</Typography>
        <div onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} onTouchMove={handleScroll} onWheel={handleScroll} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
            // style={projectStyles}
            className={` scrollbar dark:scrollbar-dark flex flex-col select-none overflow-x-hidden overflow-y-auto w-4/5 relative max-h-fit border-1 gap-y-7 pt-4`}
        >
            {projects.map((item, index) =>

                <div key={index} className="w-full ">

                    <div className="flex flex-col items-center p-2 mx-2 border-solid border-4 hover:border-double rounded-lg border-black dark:border-white ">
                        <div className="flex justify-center w-full -mb-4">
                            <Typography className="text-xl text-center px-1 w-fit relative -top-7 bg-white dark:bg-black border-2 rounded-md border-black dark:border-white">{item.name}</Typography>
                        </div>
                        <Typography className="w-full whitespace-pre-line text-lg">{item?.description}</Typography>

                        <div className="flex flex-row items-center gap-2 md:gap-x-10 pt-4 flex-wrap">
                            {item.repositories.map((repo, index) =>
                                <button
                                    key={index}
                                    type="button"
                                    className="h-9 px-1 inline-flex items-center border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                    onClick={() => onClickHandler(repo.src)}
                                >
                                    <Typography className="pr-1">{repo?.title || "View on Github"}</Typography>
                                    <div className="relative h-4 w-4">
                                        <Image src={githubLight} layout='fill' />
                                    </div>
                                </button>
                            )}
                            {item?.live ?
                                <button
                                    type="button"
                                    className="h-9 px-1 inline-flex items-center  border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                                    onClick={() => onClickHandler(item.live)}
                                >
                                    <Typography className="pr-2 pt-0.5 text-md">Live</Typography>
                                    <div className="relative h-5 w-4">
                                        <Image src={boxArrow} layout='fill' />
                                    </div>
                                </button> :
                                null}
                        </div>
                    </div>
                </div>
            )}
        </div>
    </div>
}