import axios from "axios";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      try {
        console.log(user);
        const userData = {
          googleId: user.id,
          name: user.name,
          email: user.email,
          profilePicture: user.image,
        };

        let { data } = await axios.post(
          `${process.env.BACKEND_URL}/api/auth/google-signup`,
          userData
        );

        if (data.success) {
          return true;
        }
        return false;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
