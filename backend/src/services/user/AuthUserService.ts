import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from 'jsonwebtoken';

interface AuthRequest {
    email: string;
    password: string;
}

class AuthUserService {
    async execute({ email, password }: AuthRequest) {
        // verify if email already exists
        const user = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })

        if (!user) {
            throw new Error("User/password incorrect")
        }

        // compare if password is correct
        const passwordMatch = await compare(password, user.password)

        if (!passwordMatch) {
            throw new Error("User/password incorrect")
        }


        //if ok, generate token JWT and return data user
        const token = sign(
            {
                name: user.name,
                email: user.email,
            },
            process.env.JWT_SECRET,{
                subject: user.id,
                expiresIn: '30d'
            }
        )

        return {
            id: user.id,
            mame: user.name,
            email: user.email,
            token: token
        }
    }
}


export { AuthUserService };