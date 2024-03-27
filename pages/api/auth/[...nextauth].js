import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/user";

import connectMongoDB from "@/lib/mongodb";

const protocol = process.env.VERCEL_ENV === 'production' ? 'https' : 'http';
const baseURL = process.env.VERCEL_URL ? `${protocol}://${process.env.VERCEL_URL}` : `${protocol}://localhost:3000`;
const apiRoute = `${baseURL}/api/user`; //"http://localhost:3000/api/user"

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                // Determine the base URL based on the environment (Vercel or local)


                const res = await fetch(apiRoute, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        'x-api-key': process.env.DATA_API_KEY,
                    },
                    body: JSON.stringify({
                        'email_address': credentials.emailAddress,
                        'password': credentials.password,
                        'type': credentials.type,
                    }),
                });
                const user = await res.json();
                console.log(user);
                // Assuming your API returns a status code of 200 for successful authentication
                if (res.ok && user) {
                    return user;
                }
                // Return null if user data could not be retrieved
                return null;
            }
        }),
    ],
    // Add custom pages for sign in, sign out, error, verify request, etc.
    pages: {
        signIn: '/login',
        signOut: '/login',
    },
    session: {
        // Use JWT for session so we don't need a database
        strategy: "jwt",
    },
    callbacks: {
        async session({ session, token, user }) {
            await connectMongoDB();

            const dbUser = await User.findOne({ email_address: token.email }).lean();
            if (dbUser) {
                session.user.id = dbUser._id;
                session.user.email = dbUser.email_address;
                session.user.name = `${dbUser.firstname} ${dbUser.lastname ?? ''}`;
            }
            return session;
        },
        // async jwt({ token, user }) {
        //     // If the user object is returned by `authorize`, it's passed here
        //     if (user) {
        //         token.id = user._id;
        //         token.email = user.email_address;
        //         token.name = user.name ?? `${user.firstname} ${user.lastname}`;
        //     }
        //     return token;
        // },
        async signIn({ user, account, profile }) {
            if (account.provider === "google") {
                await connectMongoDB();
                console.log(user);
                const { email, name } = user;
                try {
                    // Check if user exists, if not, create a new user
                    await User.findOneAndUpdate(
                        { email_address: email },
                        {
                            $setOnInsert: { firstname: name, email_address: email },
                        },
                        { upsert: true, new: true }
                    );
                    return true; // Sign-in successful
                } catch (error) {
                    console.error("Error during sign-in/sign-up:", error);
                    return false; // Sign-in failed
                }
            }

            return true; // Allow sign-in for other providers
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    // Additional NextAuth configuration here
});