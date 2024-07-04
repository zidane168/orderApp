
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from '@/libs/mongoConnect' 
import memberApi from '../../members/member.api';
import Log from '@/utils/log';
import toast from 'react-hot-toast';

export const authOptions = 
{ 
    secret: process.env.SECRET, 
    adapter: MongoDBAdapter(clientPromise),
    providers: [ 
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        CredentialsProvider({ 
            name:   'Credentials', 
            id:     'credentials',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "your email address" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) { 
                const res = await memberApi.login({
                    email:      credentials.email,
                    password:   credentials.password,
                })

                if (res.data.status === 200) {
                    localStorage.setItem('token', res.data.params.token);
                } else {
                    toast.error('Login failed. Please check your credentials')
                }

                console.log('==--->')
                console.log (localStorage.getItem('token'))
                return null; 
            }
        })
    ]
} 
const handler = NextAuth( authOptions )

export { handler as GET, handler as POST }