import Typography from "./Typography"
import React from "react"
import Accordion from "./Accordion"

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
        description: 'This is a NFT marketplace for the ethereum network built with React + Next.js and deployed in the Goerli Testnet.' + 
        ' It supports any Standard ERC721 nft collection and also minting new NFTs, uploading images and metadata to IPFS, I created nft cards collection to test it.',
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
    {
        name: 'This portfolio',
        description: 'This is my webpage developed in React Next.js and TailwindCSS',
        repositories: [{ title: '', src: 'https://github.com/Dukler/portfolio' }]
    },
    // {
    //     name: 'dukler bot',
    //     repositories: [{ title: '', src: 'https://github.com/Dukler/dukler-bot' }]
    // },
]

export default () => {
    
    return <div className="flex flex-col items-center w-full h-screen space-y-5 ">
        <Typography className="text-2xl h-14 leading-[3.5rem] md:h-32 md:leading-[8rem]">Check some of my work out!</Typography>
        <div id='aco' className="flex items-center h-full w-full justify-center">
            <Accordion data={projects} />
        </div>
    </div>
}