import { useEffect, useRef, useState, TouchEvent} from "react"
import Typography from "./Typography";
import { SyntheticEvent } from "react";

type Props = {
    className?: string
}

export default ({ className }: Props) => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [subject, setSubject] = useState<string>('');
    const [status, setStatus] = useState<number>(0);
    const [description, setDescription] = useState<string>('');
    const [requiredName, setRequiredName] = useState<boolean>(false);
    const [requiredEmail, setRequiredEmail] = useState<boolean>(false);
    const [requiredSubject, setRequiredSubject] = useState<boolean>(false);
    const [sending, setSending] = useState<boolean>(false);
    const emailRegx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const [emailClassName, setEmailClassName] = useState("")
    const [emailBlur, setEmailBlur] = useState("")

    const handleTouchEmail = ()=>{
        setEmailClassName("absolute inset-0 bg-inherit h-screen z-50")
    }

    useEffect(() => {
        if (requiredName) setRequiredName(false)
    }, [name])
    useEffect(() => {
        if (requiredEmail && email.match(emailRegx)) setRequiredEmail(false)
    }, [email])
    useEffect(() => {
        if (requiredSubject) setRequiredSubject(false)
    }, [subject])
    // useEffect(()=>{
    //     if(status !== 0) setStatus(0)
    // },[name,email,subject,description])


    const handleSend = async () => {
        if (sending) setSending(false)
        if (status !== 0) setStatus(0)
        const data = { name, email, subject, description }
        let canSend = true;
        if (name === '') { setRequiredName(true); canSend = false }
        if (!email.match(emailRegx)) { setRequiredEmail(true); canSend = false }
        if (subject === '') { setRequiredSubject(true); canSend = false }

        if (!canSend) return
        console.log('sending')
        setSending(true)
        fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => {
            setStatus(response.status)
        })
    }
    const nameRef = useRef<HTMLInputElement>(null);
    const [firstFocus, setFirstFocus] = useState(true)
    const handleFocus = (e:TouchEvent) => {
        if (firstFocus) { 
            setEmailBlur('bg-transparent relative inset-x-0 bottom-0 h-full z-10')
            setEmailClassName("absolute inset-0 bg-inherit h-screen z-50")
            nameRef.current!.focus() 
            nameRef.current!.select()
            setFirstFocus(false)
        }
        
        // nameRef.current.select()
    }
    const handleBlur = (e:SyntheticEvent) =>{
        e.stopPropagation()
        setEmailBlur('')
        setEmailClassName("")
        setFirstFocus(true)
    }

    return <div className={emailClassName}  >
        
        <div onTouchStart={handleFocus} className={`${className} border border-gray-300 rounded-lg shadow-sm overflow-hidden focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 m-1 bg-white dark:bg-black z-40`}>
            <div className="flex flex-row">
                <label className="sr-only">
                    Name
                </label>
                <input
                    ref={nameRef}
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required={requiredName}
                    className="required:border-red-500 required:border-2 block w-full border-0 pt-2.5 pl-1 text-lg font-medium placeholder-gray-500 focus:ring-0 focus:outline-none bg-inherit dark:text-white"
                    placeholder="Name"
                />
                <label className="sr-only">
                    Email
                </label>
                <input
                    type="text"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required={requiredEmail}
                    className="required:border-red-500 required:border-2 block w-full border-0 pt-2.5 pl-1 text-lg font-medium placeholder-gray-500 focus:ring-0 focus:outline-none bg-inherit dark:text-white border-l-2"
                    placeholder="Email"
                />
            </div>
            <div className="flex flex-col">
                <label className="sr-only">
                    Subject
                </label>
                <input
                    type="text"
                    name="subject"
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required={requiredSubject}
                    className="required:border-red-500 border-y-2 required:border-2 block w-full border-0 pt-2.5 pl-1 text-lg font-medium placeholder-gray-500 focus:ring-0 focus:outline-none bg-inherit dark:text-white"
                    placeholder="Subject"
                />
                <label className="sr-only">
                    Description
                </label>
                <textarea
                    name="description"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="block w-full border-0 py-0 pl-1 resize-none placeholder-gray-500 focus:ring-0 sm:text-sm focus:outline-none h-40 bg-inherit dark:text-white"
                    placeholder="Write a description..."
                />
            </div>
            {/* Spacer element to match the height of the toolbar */}
            {/* <div aria-hidden="true">
                    <div className="py-2">
                        <div className="h-9" />
                    </div>
                    <div className="h-px" />
                    <div className="py-2">
                        <div className="py-px">
                            <div className="h-9" />
                        </div>
                    </div>
                </div> */}
            <div className="border-t border-gray-200 px-2 py-2 flex justify-between items-center space-x-3 sm:px-3">
                <div className="flex">
                    {requiredEmail || requiredName || requiredSubject ? <Typography>🟥</Typography> : null}
                    {(requiredEmail && email === '') || requiredName || requiredSubject ? <Typography>Fields are required.&nbsp;</Typography> : null}
                    {requiredEmail && email !== '' ? <Typography> Please enter a valid email.</Typography> : null}
                    {status === 200 ? <Typography>🟩 Email sent.</Typography> : null}
                    {status === 0 && sending ? <Typography className="flex flex-row">
                        <svg aria-hidden="true" className="mr-2 w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        Sending email.
                    </Typography> : null}
                    {/* <button
                        type="button"
                        className="-ml-2 -my-2 rounded-full px-3 py-2 inline-flex items-center text-left text-gray-400 group"
                    >
        
                        <span className="text-sm text-gray-500 group-hover:text-gray-600 italic">Attach a file</span>
                    </button> */}
                </div>
                <div className="">
                    <button
                        type="submit"
                        className=" items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={handleSend}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
        <div onTouchEnd={handleBlur} className={emailBlur}/>
    </div>
}
