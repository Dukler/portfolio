
type Props = {
    className?:string,
    children: React.ReactNode
}

export default ({className, children} : Props)=> 
    <div className={`${className} dark:text-white font-roboto`} >{children}</div>