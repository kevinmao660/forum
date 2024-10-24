import Event from "@models/event";
import { connectToDB } from "@utils/database";

export const GET = async (request) => {
    try {
      await connectToDB();
      const events = await Event.find({}).populate('creator');
  
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
  