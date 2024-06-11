import { User } from "@/app/models/User";
import mongoose from "mongoose";
import bcrypt from 'bcrypt'

export async function POST(req: any) {

    const body = await req.json()
    mongoose.connect(process?.env?.MONGO_URL)

    const { password } = body

    if (!password?.length || password.length < 5) {
        new Error('Pw must be 5 characters')
    }

    const notHashedPW = password
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    body.password  = bcrypt.hashSync(notHashedPW, salt); 

    const createUser = await User.create(body)
    return Response.json(createUser);
}