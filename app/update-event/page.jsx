"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";

const EditEventContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const eventId = searchParams.get('id'); 

  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ event: "", tag: "" });

  useEffect(() => {
    const getEventDetails = async () => {
      const response = await fetch(`/api/event/${eventId}`);
      const data = await response.json();

      setPost({
        event: data.event,
        tag: data.tag,
        signups: data.signups,
      });
    };
    if (eventId) getEventDetails();
  }, [eventId]);

  const updateEvent = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!eventId) return alert('Event ID not found');

    try {
      const response = await fetch(`/api/event/${eventId}`, {
        method: "PATCH",
        body: JSON.stringify({
          event: post.event,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type='Edit'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updateEvent}
    />
  );
};

const EditEvent = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <EditEventContent />
  </Suspense>
);

export default EditEvent;
