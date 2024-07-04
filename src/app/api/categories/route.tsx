import { Category } from "@/app/models/Category"
import Log from "@/utils/log"
import mongoose from "mongoose"

export async function POST(req: any) {
    const { name } = await req.json() 
 
    mongoose.connect(process.env.MONGO_URL)
    const categoryDoc = await Category.create({ name })
    return Response.json(categoryDoc);
}

export async function PUT(req: any) {
    const { _id, name }  = await req.json() 
 
    mongoose.connect(process.env.MONGO_URL)
    const updated = await Category.updateOne({_id} , {name}) 
    return Response.json(updated);
}



export async function GET() {
    return Response.json(
        await Category.find()
    )
}