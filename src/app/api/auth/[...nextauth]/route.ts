// imports
import NextAuth from "next-auth"

import TwitterProvider from "next-auth/providers/twitter"

const handler = NextAuth({
    providers: [
        TwitterProvider({
            clientId: process.env.TWITTER_CONSUMER_KEY as string,
            clientSecret: process.env.TWITTER_CONSUMER_SECRET as string,
            version: "2.0",
        }),
    ]
})

export { handler as GET, handler as POST }