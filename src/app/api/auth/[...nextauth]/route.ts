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
    ],
    callbacks: {
        session: ({ session, token,user }) => ({
          ...session,
          user: {
            ...session.user,
            id: token.sub,
            token: token,
            user
          },
        }),
      },
})

export { handler as GET, handler as POST }