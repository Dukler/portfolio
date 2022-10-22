// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    name:string, 
    email:string, 
    subject:string, 
    description:string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    let nodemailer = require('nodemailer')
    const email = process.env.EMAIL_ADDRESS;
    const transporter = nodemailer.createTransport({
        port: 465,
        host: "smtp.gmail.com",
        auth: {
            user: email,
            pass: process.env.EMAIL_PASSWORD,
            // pass:123,
        },
        secure: true,
    })
    const mailData = {
        from: email,
        to: '8amartin@gmail.com',
        subject: req.body.subject,
        text: `${req.body?.description} Sent from: ${req.body.email}`,
        html: `<div>${req.body?.description}</div><p>Sent from:
        ${req.body.email}</p>`
    }
    try {
        const info = await transporter.sendMail(mailData);
        res.status(200).json({})
    } catch (error) {
        res.status(500).json({})
    }
    
    
    
    // res.status(200).json()
}
