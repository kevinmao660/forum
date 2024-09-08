import Feed from '@components/Feed';

async function fetchEvents() {
  console.log('Fetching events...');
  try {
    const response = await fetch('https://forum-ruddy.vercel.app/api/event', {
      headers: {
        'Cache-Control': 'no-cache', // Ensure no cache
      },
    });
    console.log('Response status:', response.status);

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    // Check content type
    const contentType = response.headers.get('content-type');
    console.log('Content-Type:', contentType);

    // Parse response based on content type
    let data;
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      const text = await response.text();
      data = JSON.parse(text);
    }

    console.log('Fetched events data:', data);
    
    return data;
  } catch (error) {
    console.error('Failed to fetch events:', error);
    return [];
  }
}

const Home = async () => {
  const allPosts = await fetchEvents();

  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center"> 
        Discover & Share Events
        <br className="mex-md:hidden" />
        <span className="purple_gradient">FORUM</span>
      </h1>
      <br></br>
      <p className="desc text-center">
        Forum is a social platform that connects event goers to event coordinators.
      </p>

      <Feed allPosts={allPosts} />
    </section>
  );
};

export default Home;
