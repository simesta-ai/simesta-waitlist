import { Request, Response, NextFunction } from "express"
import nodemailer from "nodemailer"
import addedToWatchList from "./genWatchListMail"

import User from "../database/user.model"

async function sendMail(to: string, subject: string, text?: string, html?: string) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.HOST_EMAIL_ADDRESS,
        pass: process.env.HOST_EMAIL_PASSWORD,
      },
    })
    const mailOptions = {
      from: `Simesta AI <${process.env.HOST_EMAIL_ADDRESS}>`,
      to,
      subject,
      text: text ? text : '',
      html: html ? html : '',
    }
    const mailResponse = await new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error) => {
        if (error) {
          reject(error)
        } else {
          resolve({
            message: 'Mail sent',
            email: to,
          })
        }
      })
    })
    if (mailResponse) return mailResponse
    return null
  }



export const addToWaitList = async (req, res, next) => {
    try {
        const { email, phone, name } = req.body;
        if (!email || !phone || !name) {
            return res.status(400).json({ message: "Please fill all fields" });
        }
        if (!email.includes("@") || !email.includes(".")) {
            return res.status(400).json({ message: "Please enter a valid email" });
        }
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        await User.create({ email, phone, name });
        setImmediate(() => {
            sendMail(email, "Welcome to the Simesta Community", undefined, addedToWatchList(name, email));
        })
        return res.status(200).json({ message: `${email} has been added to community` });
    } catch (error) {
        next(error);
    }
}