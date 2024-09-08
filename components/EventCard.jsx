"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const EventCard = ({ post, handleEdit, handleDelete, handleTagClick }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();
  const [copied, setCopied] = useState("");

  const updateSignup = async () => {
    console.log(post._id)
    try {
      const response = await fetch(`/api/event/${post._id.toString()}`, { 
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: session?.user       
        }),
      });

      if (response.ok) {
        // Update state or refetch data instead of reloading the page
        router.refresh(); // Use Next.js router to refresh data
      } else {
        console.error('Failed to update signup');
      }
    } catch (error) {
      console.error('Error updating signup:', error);
    } 
  };

  const handleSignups = () => {
    const hasConfirmed = confirm(
      "Confirm you would like to sign up."
    );
    if (hasConfirmed){
      updateSignup();
    }
  };

  const SignUpList = ({ data }) => {
    if (!Array.isArray(data)) {
      return <p>No signups available</p>;
    }

    return (
      <div className='event_layout'> 
        {data.map((user) => (
          <div key={user.id}> {/* Ensure user.id is unique */}
            <p>{user.name}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className='event_card'>
      <div className='flex justify-between items-start gap-5'>
        <div className='flex-1 flex justify-start items-center gap-3'>
          <Image
            src={post.creator.image}
            alt='user_image'
            width={40}
            height={40}
            className='rounded-full object-contain'
          />

          <div className='flex flex-col'>
            <h3 className='font-satoshi font-semibold text-gray-900'>
              {post.creator.username}
            </h3>
            <p className='font-inter text-sm text-gray-500'>
              {post.creator.email}
            </p>
          </div>
        </div>

        {session?.user ? (
          <div className="outline_btn" onClick={handleSignups}>
            <p>Sign Up!</p>
          </div>
        ) : null}
      </div>

      <p className='my-4 font-satoshi text-sm text-gray-700'>{post.event}</p>
      <p
        className='font-inter text-sm blue_gradient cursor-pointer'
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        #{post.tag}
      </p>

      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
          <p
            className='font-inter text-sm green_gradient cursor-pointer'
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className='font-inter text-sm orange_gradient cursor-pointer'
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}

      <div>
        <br/>
        <hr/>
        <br/>
        <h1 className="font-bold">SignUps</h1>
        <SignUpList data={post.signups || []} />
      </div>
    </div>
  );
};

export default EventCard;
