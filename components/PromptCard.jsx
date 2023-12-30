"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const PromptCard = ({ post, handleEdit, handleDelete, handleTagClick }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();
  const [copied, setCopied] = useState("");

  const updateSignup = async () => {
    console.log(post._id)
    try {
      const response = await fetch(`/api/prompt/${post._id.toString()}`, { 
        method: "PUT",
        body: JSON.stringify({
          user: session?.user       
        }),
      });

      if(response.ok) {
        location.reload();
      }
    } catch (error) {
      console.log(error);
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
    return (
      <div className='mt-16 prompt_layout'> 
        {data.map((user) => (
          <div>
            <h1>
            {user.name}
            </h1>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className='prompt_card'>
      <div className='flex justify-between items-start gap-5'>
        <div
          className='flex-1 flex justify-start items-center gap-3 cursor-pointer'
        >
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

        {session?.user ?(
          <div className='copy_btn' onClick={handleSignups}>
            <Image
            src={
              copied === post.prompt
              ? "/assets/icons/tick.svg"
              : "/assets/icons/copy.svg"
            }
            alt={copied === post.prompt ? "tick_icon" : "copy_icon"}
            width={12}
            height={12}
            />
          </div>
        ): (
          <div>
          </div>
        )}
      </div>

      <p className='my-4 font-satoshi text-sm text-gray-700'>{post.prompt}</p>
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
        <SignUpList data = {post.signups} />
      </div>
    </div>
    
  );
};

export default PromptCard;