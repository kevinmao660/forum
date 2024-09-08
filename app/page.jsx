import Feed from '@components/Feed';

async function fetchPosts() {
  const response = await fetch(`https://forum-ruddy.vercel.app/api/event`);
  const data = await response.json();
  return data;
}

const Home = async () => {
  const allPosts = await fetchPosts();

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
