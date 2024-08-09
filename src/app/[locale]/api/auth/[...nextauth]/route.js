
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
                    console.log(' <--------tra ve tu BE ') 
                    console.log(res.data.params)
                    console.log(' <--------tra ve tu BE ')

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
                    // user.token = response?.data.params?.token;

                    console.log(' <--------tra ve tu BE ')
                    user = response?.data.params;
                    console.log(user)
                    console.log(' <--------tra ve tu BE ') 
                    return true;        // xac nhan login thanh cong tu BE, 
                  
                } else {
                    return false;       // nếu false sẽ ko thể nào dang nhap google dc
                }
            }
            return true; // Do different verification for other providers that don't have `email_verified`
        },
            
        async jwt({ token, user, account, profile, isNewUser }) { 
          
            if (account) {
                token.user_info = await user;   // save token from server  

                console.log( '========>  token ')
                console.log(token ) 
                console.log( '========> ')
                
                console.log( '========>  account ')
                console.log(account ) 
                console.log( '========> ')

                console.log( '========>  user ')
                console.log(user ) 
                console.log( '========> ')
                // data : 
                //     expires: "2024-08-04T03:47:13.781Z" 
                //     user : 
                //         email: "xyzabc@gmail.com"
                //         enabled: 1
                //         name: "Vi"
                //         token:"eyJ0eXAiOiJKV9.Fs5kaAlG0KSOC_W405q8"
                //     status: "authenticated"
            }
            return Promise.resolve(token);
        },

        async session({ session, token } ) {   
            session.user = token.user_info.user_data;    

            console.log( '<======== console.log(session.user) ')
            console.log(token ) 
            console.log( '<======== ')
            return Promise.resolve(session);
        },
    },
}

const handler = NextAuth( authOptions )

export { handler as GET, handler as POST }
// export default NextAuth( authOptions )

