
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from '@/libs/mongoConnect' 
import { memberApi } from '../../members/member.api';  
import { useSessionData } from '@/customHook/useSessionData';

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
                const session = await useSessionData()
                const { login } = memberApi(session)

                const res = await login({
                    email:      credentials.email,
                    password:   credentials.password,
                }) 
  
                if (res.data.status === 200) {
                    return { status: true, user_data:  res.data.params}
                    // return Promise.resolve(response.params);  // ket qua tra ve tu server se di xuong function jwt b
                 
                } else { 
                    throw new Error(
                        JSON.stringify({  status: false, message: res.data.message })
                    );
                }
            }
        })
    ],
    pages: {
        signIn: "/auth/login",
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },

    callbacks: {
        async signIn({ user, account, profile }) {
            if (account.provider !== "credentials") {
                // const response = await loginSocial(
                //   account.provider,
                //   account.providerAccountId,
                //   profile?.picture,
                //   profile.email,
                //   profile.name
                // );
                // if (response?.params?.token) {
                //   user.token = response?.params?.token;
                //   return true;
                // } else {
                //   return false;
                // }
            }
            return true; // Do different verification for other providers that don't have `email_verified`
        },
            
        async jwt({ token, user, account, profile, isNewUser }) { 
         
            if (account) {
                token.user_info = user;   // save token from server  

                // data : 
                //     expires: "2024-08-04T03:47:13.781Z" 
                //     user : 
                //         email: "huuvi168@gmail.com"
                //         enabled: 1
                //         name: "Vi"
                //         token:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IntcImVtYWlsXCI6XCJodXV2aTE2OEBnbWFpbC5jb21cIixcInR5cGVcIjoyfSI.QZ20ElnzhhPxAlRt7d3_QDIFs5kaAlG0KSOC_W405q8"
                //     status: "authenticated"
            }
            return Promise.resolve(token);
        },

        async session({ session, token }) {   
            session.user = token.user_info.user_data;    
            return Promise.resolve(session);
        },
    },
} 
const handler = NextAuth( authOptions )

export { handler as GET, handler as POST }