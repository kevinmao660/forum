"use client"; // This is a client component 👈🏽

import Feed from '@components/Feed';

import { useState, useEffect } from 'react'

function Home(){
  const [allPosts, setAllPosts] = useState([]);

  async function fetchEvents() {
    console.log('Fetching events...');
    try {
      const response = await fetch('/api/event', {cache: 'no-store'});
      console.log('Response status:', response.status);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      let data = await response.json();
      setAllPosts(data);
      return data;
    } catch (error) {
      console.error('Failed to fetch events:', error);
      return [];
    }
  }

  useEffect(()=>{
    fetchEvents()
  },[])

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
      {allPosts ? <Feed allPosts={allPosts}></Feed>:<></>}
    </section>
  );
};

export default Home;
