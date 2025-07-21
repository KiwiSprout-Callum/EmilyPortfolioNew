import { useState } from "react";
import ContactForm from "../ContactForm";

export default function ContactSection() {
  const [showForm, setShowForm] = useState(false);

  return (
    <section
      className="page-layout-constrained flex flex-col gap-6"
      id="contact"
    >
      <div className="bg-[#F8DD9A] rounded-2xl px-3 py-6 md:px-12 md:py-14 transition-all duration-500">
        <div className="md:px-0 px-6">
          <h2 className="subtitle-m mb-6 text-[#503C08]">
            Alright, enough about me. What’s your big idea?
          </h2>
          <p className="body-alt text-[#503C08] mb-12">
            I’d love to chat to you about how I can help. Get in touch!
          </p>
        </div>

        <div className="subtitle-s md:text-2xl text-lg flex flex-col gap-5">
          {/* Email Row */}
          <div className="bg-white flex justify-between items-center rounded-xl pl-6 pr-3 md:px-12 md:py-6 h-[72px] md:h-24">
            <span className="hidden md:flex">Email</span>
            <div className="flex-row-reverse justify-between w-full md:w-fit md:flex-row flex items-center gap-4">
              <button
                style={{
                  "--color": "#141414",
                  "--bg": "#E4FF35",
                  "--clickColor": "#CAE423",
                }}
                className="btn rounded-[32px] btn-text leading-none w-full flex gap-2.5 items-center"
                onClick={() =>
                  navigator.clipboard.writeText("e.eaton@outlook.com")
                }
              >
                Copy
              </button>
              <span>e.eaton@outlook.com</span>
            </div>
          </div>

          {/* Send a Message Toggle */}
          <button
            onClick={() => setShowForm((prev) => !prev)}
            className="bg-white flex justify-between items-center rounded-xl pl-6 pr-3 md:px-12 md:py-6 h-[72px] md:h-24 w-full text-left outline-0"
          >
            <span>Send a Message</span>
            <div
              className={`transform transition-transform duration-300 ${
                showForm ? "rotate-90" : ""
              }`}
            >
              {/* Arrow SVG */}
              <svg
                width="30"
                height="21"
                viewBox="0 0 30 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.5 0.38c.3 0 .56.11.79.34l8.93 8.92c.13.13.22.26.27.39.05.13.08.27.08.42s-.03.29-.08.42c-.05.13-.14.26-.27.39l-8.93 8.93c-.23.23-.49.34-.79.34s-.56-.11-.79-.34a1.11 1.11 0 0 1 0-1.57l7.01-7.01H1.12a1.06 1.06 0 0 1-.8-1.81c.21-.21.48-.32.8-.32h25.4L18.71 2.29a1.11 1.11 0 0 1 0-1.57c.23-.23.49-.34.79-.34z"
                  fill="#3C3C3C"
                  stroke="#3C3C3C"
                />
              </svg>
            </div>
          </button>

          {/* Contact Form Disclosure Panel */}
          <div
            className={`transition-all duration-1000 overflow-hidden ${
              showForm
                ? "max-h-[1200px] opacity-100 scale-100"
                : "max-h-0 opacity-0 scale-95"
            }`}
          >
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
