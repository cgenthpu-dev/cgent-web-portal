import mailgen from "mailgen";
import nodemailer from "nodemailer";

const emailVerificationContent = (username, verificationLink) => {
  return {
    body: {
      name: username,
      intro: "Welcome! We're excited to have you on board.",
      action: {
        instructions:
          "To get started, please verify your email address by clicking the button below:",
        button: {
          text: "Verify Email",
          link: verificationLink,
          color: "rgba(117, 46, 175, 1)",
        },
      },
      outro: "If you did not create an account, no further action is required.",
    },
  };
};

const forgotPasswordEmailContent = (username, verificationLink) => {
  return {
    body: {
      name: username,
      intro: "Welcome! We're excited to have you on board.",
      action: {
        instructions:
          "To get started, please verify your email address by clicking the button below:",
        button: {
          text: "Verify Email",
          link: verificationLink,
          color: "rgba(117, 46, 175, 1)",
        },
      },
      outro: "If you did not create an account, no further action is required.",
    },
  };
};

const sendEmail = async (options) => {
  const mailGenerator = new mailgen({
    theme: "default",
    product: {
      name: process.env.WEBSITE_NAME,
      link: process.env.WEBSITE_LINK,
    },
  });

  const emailContentInText = mailGenerator.generatePlaintext(
    options.mailgenContent
  );
  const emailContentInHTML = mailGenerator.generate(options.mailgenContent);

  const mailFormat = {
    from: process.env.SENDER_EMAIL,
    to: options.receiverEmail,
    subject: options.subject,
    text: emailContentInText,
    html: emailContentInHTML,
  };

  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  transporter.sendMail(mailFormat, (error, info) => {
    if (error) {
      return console.log("An error happened - ", error);
    }
    console.log("Email sent successfully - ", info.messageId);
  });
};

export { sendEmail, emailVerificationContent, forgotPasswordEmailContent };
