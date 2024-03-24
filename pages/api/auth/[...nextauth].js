import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from "next-auth/providers/credentials"

const protocol = process.env.VERCEL_ENV === 'production' ? 'https' : 'http';
const baseURL = process.env.VERCEL_URL ? `${protocol}://${process.env.VERCEL_URL}` : `${protocol}://localhost:3000`;
const apiRoute = `${baseURL}/api/user`; //"http://localhost:3000/api/user"

console.log(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);
console.log(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET);
console.log(apiRoute);

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
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
            // Here, you can decide what data from the user object should be included in the session
            // For example, if the user object includes an id, email, and name:
            session.user.id = token.id;
            session.user.email = token.email;
            session.user.name = token.name;
            return session;
        },
        async jwt({ token, user }) {
            // If the user object is returned by `authorize`, it's passed here
            if (user) {
                token.id = user._id;
                token.email = user.email_address;
                token.name = `${user.firstname} ${user.lastname}`;
            }
            return token;
        },
    },
    secret: "4145a805fafd541a071924eed5742f83",
    // Additional NextAuth configuration here
});