import React, { useLayoutEffect, useState } from 'react';
import Typography from './Typography';
import Image from "next/image"
// import githubLight from "../assets/Github-Light.png"
// import boxArrow from "../assets/box-arrow.svg"

type props = {
  data: Array<{
    name:string,
    description:string,
    live?:string,
    demo?:string,
    repositories:Array<{
      title:string,
      src:string
    }>,
}>
}

const Accordion = ({ data }: props) => {
  const [isActive, setIsActive] = useState<Array<boolean>>([]);

  const toggleActive = (index:number) => {
    let auxActive = [...isActive];
    auxActive[index] = !auxActive[index];
    data.forEach((element, i) => {
      if (index !== i) auxActive[i] = false
    });
    setIsActive(auxActive)
  }

  const onClickHandler = (src:string) => {
    window.open(
      src,
      '_blank'
    )
  }

  useLayoutEffect(() => {
    let auxActive:Array<boolean> = []
    data.forEach((element, index) => {
      auxActive[index] = false;
    });
    setIsActive(auxActive)
  }, [])

  return <div className='w-5/6 xl:text-xl border-2 divide-y-2 rounded-lg h-fit'>
    {(data.map(({ name, description, ...item }, index) => (
      <div className='divide-y-2'>
        <div className='flex flex-row justify-between px-2 h-14 items-center'
          onClick={() => toggleActive(index)}>
          <div className={isActive[index]?`text-blue-600 dark:text-yellow-300`:``}>{name}</div>
          <div className={isActive[index]?`text-blue-600 dark:text-yellow-300`:``}>
            {/* <StaticImage src="../images/arrowhead.png" layout="fixed" /> */}
            {isActive[index] ? '⌄' : '⌃'}
          </div>
        </div>
        {<div className={`transition-all ease-in duration-300 ${isActive[index] ? 'max-h-96 opacity-100': 'max-h-0 overflow-hidden opacity-0'}`}>
          <div className='p-2 '>{description}</div>
          {/* links */}
          <div className="flex flex-row items-center gap-2 md:gap-x-10 py-4 flex-wrap justify-center">
            {item.repositories.map((repo, index) =>
              <button
                key={index}
                type="button"
                className="h-9 px-1 inline-flex items-center border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                onClick={() => onClickHandler(repo.src)}
              >
                <Typography className="pr-1">{repo?.title || "View on Github"}</Typography>
                <div className="relative h-4 w-4">
                  <Image src={'/github-light.png'} layout='fill' />
                </div>
              </button>
            )}
            {item?.live ?
              <button
                type="button"
                className="h-9 px-1 inline-flex items-center  border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                onClick={() => onClickHandler(item.live!)}
              >
                <Typography className="pr-2 pt-0.5 text-md">Live</Typography>
                <div className="relative h-5 w-4">
                  <Image src={'/box-arrow.svg'} layout='fill' />
                </div>
              </button> :
              null}
          </div>
        </div>}
      </div>)))}
  </div>
};

export default Accordion;
