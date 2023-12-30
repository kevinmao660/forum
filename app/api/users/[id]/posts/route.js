import Event from "@models/event";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const events = await Event.find({ creator: params.id }).populate("creator")

        return new Response(JSON.stringify(events), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch events created by user", { status: 500 })
    }
} 