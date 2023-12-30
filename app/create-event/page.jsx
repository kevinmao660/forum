"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";

const CreateEvent = () => {
  
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ event: "", tag: "", signups: [session?.user] });

  const createEvent = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/event/new", {
        method: "POST",
        body: JSON.stringify({
          event: post.event,
          userId: session?.user.id,
          tag: post.tag,
          signups: post.signups,
        }),
      });

      if (response.ok) {
        router.push("/");
        console.log(post)
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className = "sm:flex hidden">
      {session?.user ?(  
      <Form
      type='Create'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createEvent}
    />
    ): (
      <div>
        sign in please
      </div>
    )}
  </div>
  );
};

export default CreateEvent;