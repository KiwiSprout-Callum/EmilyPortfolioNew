import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "./ButtonReact";

const contactFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().min(1, "Name is required"),
  subject: z.string().optional(),
  message: z.string().min(1, "Message is required"),
});

type ContactFormSchema = z.infer<typeof contactFormSchema>;

export default function ContactForm({
  showForm,
  setShowForm,
}: {
  showForm: boolean;
  setShowForm: (show: boolean) => void;
}) {
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittedSuccessfully, setIsSubmittedSuccessfully] = useState(false);
  const [submissionFailed, setSubmissionFailed] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(contactFormSchema),
  });

  async function onSubmit(formData: ContactFormSchema) {
    setIsSubmitting(true);
    setSubmissionFailed(false);
    console.log("Form submitted with data:", formData);

    try {
      const response = await fetch("/api/contact-form", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      if (data.message) {
        setResponseMessage(data.message);
        setIsSubmittedSuccessfully(true);
        setShowMessage(true);

        setTimeout(() => {
          setShowMessage(false);
          setTimeout(() => {
            setResponseMessage(null);
            setIsSubmittedSuccessfully(false);
            setShowForm(false);
            reset();
          }, 500); // Wait for fade-out animation
        }, 9500); // Show message for 9.5 seconds before fading
      } else {
        throw new Error("Unexpected response");
      }
    } catch (error) {
      console.error("Form submission failed:", error);
      setResponseMessage("Submission failed. Please try again.");
      setSubmissionFailed(true);
      setIsSubmittedSuccessfully(true);
      setShowMessage(true);

      setTimeout(() => {
        setShowMessage(false);
        setTimeout(() => {
          setResponseMessage(null);
          setIsSubmittedSuccessfully(false);
          setShowForm(false);
          reset();
        }, 500);
      }, 9500);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSubmittedSuccessfully) {
    return (
      <div
        className={`mt-4 mx-auto text-center rounded-2xl flex flex-col items-center py-4 px-6 md:py-8 w-fit md:px-12 transition-all duration-500 ease-in-out ${
          showMessage ? "opacity-100 scale-100" : "opacity-0 scale-95"
        } ${
          submissionFailed
            ? "text-[#633C1B] bg-[#FFD0A8]"
            : "text-[#2F4B1D] bg-[#C7E6B9]"
        }`}
      >
        <p className="title-s mb-4">Thanks for reaching out!</p>
        <p className="subtitle-l">
          {submissionFailed
            ? "Something went wrong - please send me an email instead."
            : "I will be in touch shortly."}
        </p>
      </div>
    );
  }

  if (!showForm && !isSubmittedSuccessfully) {
    return null;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 body-small-alt relative"
    >
      <div className="flex flex-col lg:grid lg:grid-cols-3 gap-5 font-s text-white z-10">
        <label htmlFor="name" className="flex flex-col">
          <input
            type="text"
            placeholder="Name"
            className={`w-full bg-white text-black p-3 outline-none rounded-md ${
              errors.name ? "border-2 border-red-400 bg-red-100" : ""
            }`}
            {...register("name")}
            disabled={isSubmitting}
          />
          {errors.name && (
            <p className="text-red-400 mt-1 text-sm">{errors.name.message}</p>
          )}
        </label>

        <label htmlFor="email" className="flex flex-col">
          <input
            type="email"
            placeholder="Email"
            className={`w-full bg-white text-black p-3 outline-none rounded-md ${
              errors.email ? "border-2 border-red-400 bg-red-100" : ""
            }`}
            {...register("email")}
            disabled={isSubmitting}
          />
          {errors.email && (
            <p className="text-red-400 mt-1 text-sm">{errors.email.message}</p>
          )}
        </label>

        <label htmlFor="subject" className="flex flex-col">
          <input
            type="text"
            placeholder="Subject"
            className={`w-full bg-white text-black p-3 outline-none rounded-md ${
              errors.subject ? "border-2 border-red-400 bg-red-100" : ""
            }`}
            {...register("subject")}
            disabled={isSubmitting}
          />
          {errors.subject && (
            <p className="text-red-400 mt-1 text-sm">
              {errors.subject.message}
            </p>
          )}
        </label>

        <label htmlFor="message" className="flex flex-col col-span-3">
          <textarea
            placeholder="Write your message"
            className={`textarea w-full bg-white text-black p-3 outline-none rounded-md h-[150px] ${
              errors.message ? "border-2 border-red-400 bg-red-100" : ""
            }`}
            {...register("message")}
            disabled={isSubmitting}
          />
          {errors.message && (
            <p className="text-red-400 mt-1 text-sm">
              {errors.message.message}
            </p>
          )}
        </label>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex justify-end mt-8 md:mt-12 z-10"
      >
        <Button text={"Send"} className="w-fit" onClick={() => {}} />
      </button>
    </form>
  );
}
