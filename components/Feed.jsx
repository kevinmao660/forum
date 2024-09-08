"use client";

import { useState } from "react";
import EventCard from "./EventCard";

const EventCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 event_layout">
      {data.map((post) => (
        <EventCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = ({ allPosts }) => {
  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const filterEvents = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.event)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterEvents(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterEvents(tagName);
    setSearchedResults(searchResult);
  };

  // Determine if there are no events
  const hasEvents = allPosts.length > 0;
  const filteredPosts = searchText ? searchedResults : allPosts;

  return (
    <section className="feed">
      <input
        type="text"
        placeholder="Search for a tag or a username"
        value={searchText}
        onChange={handleSearchChange}
        required
        className="search_input peer"
      />

      {/* All Events */}
      {hasEvents ? (
        filteredPosts.length > 0 ? (
          <EventCardList
            data={filteredPosts}
            handleTagClick={handleTagClick}
          />
        ) : (
          <p>No events found for the search criteria.</p>
        )
      ) : (
        <p>There are currently no events.</p>
      )}
    </section>
  );
};

export default Feed;
