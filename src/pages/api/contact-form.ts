import type { APIRoute } from "astro";
import { sendEmail } from "../../lib/send-email";
export const prerender = false;
export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  const name = body?.name;
  const email = body?.email;
  const message = body?.message;
  const subject = body?.subject;
  // Validate the data - you'll probably want to do more than this
  if (!name || !email || !message) {
    return new Response(
      JSON.stringify({
        message: "Missing required fields",
      }),
      { status: 400 }
    );
  }
  sendEmail({
    from: email,
    name: name,
    message: message,
    subject: subject || "No Subject",
  });
  // Do something with the data, then return a success response
  return new Response(
    JSON.stringify({
      message: "Success!",
    }),
    { status: 200 }
  );
};
