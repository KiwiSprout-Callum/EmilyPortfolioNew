import sgMail from "@sendgrid/mail";

const sendGridApiKey =
  import.meta.env.SENDGRID_API_KEY ?? process.env.SENDGRID_API_KEY;
sgMail.setApiKey(sendGridApiKey);

export function sendEmail(emailInput) {
  const emailFrom = emailInput.from;
  const emailName = emailInput.name;
  const emailSubject = "New portfolio site message from " + emailName;
  const testUse = "e.eaton@outlook.com";
  const testUse2 = "contact@emilyeaton.work";
  const msg = {
    //  to: process.env.EMAIL_TO,
    to: [testUse, "callum@kiwisprout.nz"],
    from: {
      email: testUse2,
      name: "Freelance Contact Form",
    },
    subject: emailSubject,
    text: emailFrom + " wants to reach out: " + emailInput.message,
    // html: emailInput?.html,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error.response.body);
    });
}
