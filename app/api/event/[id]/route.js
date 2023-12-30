import Event from "@models/event";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const event = await Event.findById(params.id).populate("creator")
        if (!event) return new Response("Event Not Found", { status: 404 });

        return new Response(JSON.stringify(event), { status: 200 })

    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
}

export const PUT = async (request, { params }) => {
    const { user } = await request.json();
    try {
        await connectToDB();
        const existingEvent = await Event.findById(params.id);
        const temp = existingEvent.signups
        temp.push(user);
        existingEvent.signups = temp;
        await existingEvent.save();
        return new Response("Signup successful", { status: 200 });
    } catch (error) {
        return new Response("Error Signing Up", { status: 500 });
    } 
};

export const PATCH = async (request, { params }) => {
    const { event, tag } = await request.json();
    try {
        await connectToDB();

        // Find the existing event by ID
        const existingEvent = await Event.findById(params.id);

        if (!existingEvent) {
            return new Response("Event not found", { status: 404 });
        }

        // Update the event with new data
        existingEvent.event = event;
        existingEvent.tag = tag;

        await existingEvent.save();

        return new Response("Successfully updated the Events", { status: 200 });
    } catch (error) {
        return new Response("Error Updating Event", { status: 500 });
    }
};

export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        await Event.findByIdAndDelete(params.id);

        return new Response("Event deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting Event", { status: 500 });
    }
};
