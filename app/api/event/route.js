export const GET = async (request) => {
    try {
      await connectToDB();
      const events = await Event.find({}).populate('creator');
      console.log('Returning events:', events);
  
      return new Response(JSON.stringify(events), {
        status: 200,
        headers: {
          'Content-Type': 'application/json', // Ensure this header is set correctly
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
  