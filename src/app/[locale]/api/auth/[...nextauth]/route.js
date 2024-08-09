
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"; 
import { memberApi } from '../../members/member.api';  

const authOptions = 
{ 
    secret: process.env.SECRET, 
   // adapter: MongoDBAdapter(clientPromise),
    providers: [ 
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                    params: {
                    prompt: 'consent',
                    access_type: 'offline',
                    response_type: 'code'
                }
            }
        }),
        CredentialsProvider({ 
            name:   'Credentials', 
            id:     'credentials',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "your email address" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {  
                const { login } = memberApi() 

                const res =  await login({
                    email:      credentials.email,
                    password:   credentials.password,
                })  
  
                if (res.data.status === 200) { 
                    return { status: true, user_data:  res.data.params, access_token: res.data.params.token}
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

            // account
            // {
            //     provider: 'google',
            //     type: 'oauth',
            //     providerAccountId: '10899958223318809603',
            //     access_token: 'ya29.a0A0znBcYtsRpUQmw-Q0171',
            //     expires_at: 1723116218,
            //     scope: 'openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
            //     token_type: 'Bearer',
            //     id_token: 'eyJhbGciOiJShAxCjGYVXRWIQNZW4C6VjEnSqWrLtEJuYWtNFDnWOnAxDPQ'
            //   }
 
            if (account.provider === "google") {  
 
                const { loginGoogle } = memberApi(); 
                const response = await loginGoogle({
                    access_token: account.access_token,
                    type: 1
                });
                
                if (response.data.status === 200) { 
                    return true;        // xac nhan login thanh cong tu BE, ko biet vi sao ket qua tra ve o day ko den dc jwt, nên ko thể lay dc token moi gen trong DB, chi co the lay access_token tu google tra ve 
                  
                } else {
                    return false;       // nếu false sẽ ko thể nào dang nhap google dc
                }
            }
            return true; // Do different verification for other providers that don't have `email_verified`
        },
            
        async jwt({ token, user, account, profile, isNewUser }) {   

            if (account) {
                if (account.provider === "credentials") {
                    token.access_token = await user.user_data.token
                
                } else if (account.provider === "google") { 
                    token.access_token = await account.access_token
                }  
            }
            return Promise.resolve(token);
        },

        async session({ session, token } ) {    

            const { getProfileByToken } = memberApi();
            const res = await getProfileByToken(token.access_token)
 
            if (res.data.status === 200) {
                session.user = res.data.params;
                return Promise.resolve(session);
            }

            return Promise.resolve(null);
        },
    },
}

const handler = NextAuth( authOptions )

export { handler as GET, handler as POST }
// export default NextAuth( authOptions )

