import Event from "@models/event";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
  console.log("GET /api/event handler triggered");
  try {
    console.log('connecting to db');
    await connectToDB();
    console.log('connected to db');
    const events = await Event.find({}).populate('creator');
    console.log(events);
  
    return new Response(JSON.stringify(events), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Failed to fetch events:', error);
    return new Response(
    JSON.stringify({ message: 'Failed to fetch all events', error: error.message }),
    {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    }
    );
  }
};
  