import CredentialsProvider from "next-auth/providers/credentials";

export const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;
export const authOptions = {
session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/auth/login",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const credentialDetails = {
          email: credentials.email,
          password: credentials.password,
        };

        const resp = await fetch(backendURL + "/signin", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentialDetails),
        });
        const user = await resp.json();
        console.log("user",user);
        if (resp.ok) {
          return user;
        } else {
          console.log("check your credentials");
          return null;
        }
      },
    }),
  ],
callbacks: {
  async jwt({ token, user }) {
    console.log("user2",user);
    // Persist the OAuth access_token and or the user id to the token right after signin
    if (user) {
      token.email = user.user.email;
      token.id = user.user.id;
      token.accessToken = user.accessToken
    }
    return token
  },
    session: ({ session, token, user }) => {
      if (token) {
        session.user.email = token.email;
        session.user.id = token.id;
        session.user.name="pritam"
        session.user.accessToken = token.accessToken;
      }
      return session;
    },
  },
};