import { User } from "@/app/models/User"
import mongoose from "mongoose"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from 'bcrypt';

const handler = NextAuth( { 
    secret: process.env.SECRET,
    providers: [ 
        CredentialsProvider({ 
            name: 'Credentials', 
            id: 'credentials',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "huuvi168@gmail.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // You need to provide your own logic here that takes the credentials
                // submitted and returns either a object representing a user or value
                // that is false/null if the credentials are invalid.
                // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
                // You can also use the `req` object to obtain additional parameters
                // (i.e., the request IP address)
                // const res = await fetch("/your/endpoint", {
                //     method: 'POST',
                //     body: JSON.stringify(credentials),
                //     headers: { "Content-Type": "application/json" }
                // })
 
                console.log(credentials)
                const email = credentials?.email 
                const password = credentials?.password

                console.log(credentials)
                console.log(password)

                mongoose.connect(process.env.MONGO_URL)
                const user =  User.findOne({ email })
        
                // const passwordChecked = bcrypt.compare(password, user.password)

                // console.log('==--->')
                // console.log (passwordChecked)
                // if (user && passwordChecked) {
                //     return user
                // }
                  
            }
        })
    ]
})

export { handler as GET, handler as POST }