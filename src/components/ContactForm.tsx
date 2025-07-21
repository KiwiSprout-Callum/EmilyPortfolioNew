import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "./ButtonReact";

import ContactBg from "../assets/Background.png";

const contactFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().min(1, "Name is required"),
  subject: z.string().optional(),
  message: z.string().min(1, "Message is required"),
});

type ContactFormSchema = z.infer<typeof contactFormSchema>;

export default function ContactForm() {
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  async function onSubmit(formData: ContactFormSchema) {
    try {
      console.log("true");

      const response = await fetch("/api/contact-form", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      console.log("data", data);
      if (data.message) {
        setResponseMessage(data.message);
      }
      reset();
    } catch (error) {
      console.error("Form submission failed:", error);
    }
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(contactFormSchema),
  });
  //const onSubmit = (data) => console.log(data);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6   body-small-alt relative overflow-hidden "
    >
      {/* <img
      src={ContactBg.src}
      alt="bg"
      className="absolute inset-0 opacity-30 z-0   w-full h-auto  object-cover rounded-2xl rotate-180"
    /> */}
      {/* <h2 className="title-s  md:mb-12 mb-8 z-10">
        Send me a message — right here, right now
      </h2> */}
      <div className="flex flex-col lg:grid lg:grid-cols-3 gap-5 font-s text-white  z-10">
        <label htmlFor="name">
          <input
            type="text"
            placeholder="Name"
            className="  w-full flex items-center gap-2 bg-white text-black p-3 outline-none rounded-md"
            style={{
              ...(Object.keys(errors).includes("name") && {
                borderWidth: "1px 1px 1px 10px",
                borderStyle: "solid",
                borderColor: "#CFFF04",
                background: "rgb(250 255 228)",
              }),
            }}
            {...register("name")}
          />
        </label>

        <label htmlFor="email">
          <input
            type="email"
            placeholder="Email"
            className=" w-full flex items-center gap-2 bg-white text-black p-3 outline-none rounded-md"
            style={{
              ...(Object.keys(errors).includes("email") && {
                borderWidth: "1px 1px 1px 10px",
                borderStyle: "solid",
                borderColor: "#CFFF04",
                background: "rgb(250 255 228)",
              }),
            }}
            {...register("email")}
          />
        </label>
        <label htmlFor="subject">
          <input
            type="subject"
            placeholder="Subject"
            className=" w-full flex items-center gap-2 bg-white text-black p-3 outline-none rounded-md"
            style={{
              ...(Object.keys(errors).includes("subject") && {
                borderWidth: "1px 1px 1px 10px",
                borderStyle: "solid",
                borderColor: "#CFFF04",
                background: "rgb(250 255 228)",
              }),
            }}
            {...register("subject")}
          />
        </label>
        <label htmlFor="message" className="font-s text-white col-span-3">
          <textarea
            placeholder="Write your message"
            className="textarea w-full flex items-center gap-2 bg-white text-black p-3 outline-none rounded-md h-[150px]"
            style={{
              ...(Object.keys(errors).includes("message") && {
                borderWidth: "1px 1px 1px 10px",
                borderStyle: "solid",
                borderColor: "#CFFF04",
                background: "rgb(250 255 228)",
              }),
            }}
            {...register("message")}
          />
        </label>
      </div>

      <button
        type="submit"
        className="flex justify-end mt-8 md:mt-12 z-10"
        // className="flex justify-center text-emYellow font-m items-center gap-2 px-5 py-3 border-2 border-emYellow rounded-lg  "
      >
        <Button
          text="Send"
          // className="w-full justify-center text-emYellow font-m items-center gap-2 px-5 py-3 border-2 border-emYellow rounded-lg"
          className="w-fit"
          onClick={() => {}}
        />
      </button>
    </form>
  );
}
