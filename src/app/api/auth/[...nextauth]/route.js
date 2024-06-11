
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from '@/libs/mongoConnect'

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
    
                const email = credentials?.email 
                const password = credentials?.password 
                
                console.log(req)

                // mongoose.connect(process.env.MONGO_URL)
                // const user = await User.findOne({ email })
                // console.log(user)
        
                // const passwordChecked = bcrypt.compare(password, user.password)

                console.log('==--->')
                console.log (credentials)
                if (email == 'huuvi168@gmail.com') {
                    return {"username": "huuvi168", "name": "Vi"}
                } 
                return null; 
            }
        })
    ]
} 
const handler = NextAuth( authOptions )

export { handler as GET, handler as POST }