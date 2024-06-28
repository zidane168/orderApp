import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { User } from "@/app/models/User";

// ---------------------------------
// xem tiep 4:02:00
// ---------------------------------

export async function PUT(req: any) {
    mongoose.connect(process.env.MONGO_URL)
    const data = await req.json();
    const session: any = await getServerSession( authOptions )

    console.log({ session, data })

    const email = session?.user.email;
    const user = await User.findOne({ email })
    user.name = data.name
    await user.save() 
    console.log ({ email }, { name: data.name } )
    

    return Response.json(true)
}

export async function GET() {
    mongoose.connect(process.env.MONGO_URL)
    const session = await getServerSession( authOptions )
    const email = session?.user?.email

    if (!email) {
        return Response.json({});
    }
    return Response.json(
        await User.findOne({ email })
    )
}