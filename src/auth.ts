import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { InvalidAccountError, InvalidEmailPasswordError } from "./utils/errors";
import { sendRequest } from "./utils/api";
import { IUser } from "./types/next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {}
            },
            authorize: async (credentials) => {

                const res = await sendRequest<IBackendRes<ILogin>>({
                    method: "POST",
                    url: "http://localhost:8000/api/auth/login",
                    body: {
                        username: credentials.email,
                        password: credentials.password,
                    }
                });

                console.log("check user", res);

                if (!res.statusCode) {
                    return {
                        _id: res.data?.user._id,
                        name: res.data?.user.name,
                        email: res.data?.user.email,
                        access_token: res.data?.user.access_token
                    };
                } else if (+res.statusCode === 401) {
                    throw new InvalidEmailPasswordError();
                } else if (+res.statusCode === 400) {
                    throw new InvalidAccountError();
                } else {
                    throw new Error("Internal server error");
                }

                // user = {
                //     _id: "123",
                //     username: "123",
                //     email: "123",
                //     isVerify: "123",
                //     type: "123",
                //     role: "123"
                // }

                // if (!user) {
                //     throw new InvalidEmailPasswordError();
                // }
            }
        })
    ],
    pages: {
        signIn: "/auth/login"
    },
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                token.user = (user as IUser);
            }
            return token;
        },
        session({ session, token }) {
            (session.user as IUser) = token.user;
            return session;
        }
    }
})