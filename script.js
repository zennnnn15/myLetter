const home = document.getElementById("home");
const letter = document.getElementById("letter");
const response = document.getElementById("response");

document.getElementById("openBtn").addEventListener("click", () => {
  home.classList.add("hidden");
  letter.classList.remove("hidden");
  window.scrollTo({top: 0, behavior: "smooth"});
});

document.getElementById("yesBtn").addEventListener("click", () => submitAnswer("YES"));
document.getElementById("noBtn").addEventListener("click", () => submitAnswer("NO"));

if (window.emailjs && !EMAILJS_CONFIG.publicKey.startsWith("YOUR_")) {
  emailjs.init({publicKey: EMAILJS_CONFIG.publicKey});
}

async function submitAnswer(answer) {
  const buttons = document.querySelectorAll(".choices button");
  buttons.forEach(b => b.disabled = true);

  const now = new Date();
  const date = now.toLocaleDateString("en-PH", {
    year: "numeric", month: "long", day: "numeric"
  });
  const time = now.toLocaleTimeString("en-PH", {
    hour: "numeric", minute: "2-digit", second: "2-digit"
  });

  const params = {
    answer: answer,
    date: date,
    time: time,
    recipient_email: EMAILJS_CONFIG.recipientEmail,
    message: answer === "YES" ? "They said YES! ❤️" : "They said NO. 💌"
  };

  let emailSent = false;

  try {
    if (EMAILJS_CONFIG.publicKey.startsWith("YOUR_")) {
      throw new Error("EmailJS is not configured.");
    }

    await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      params
    );
    emailSent = true;
  } catch (error) {
    console.error("EmailJS error:", error);
  }

  showResponse(answer, emailSent);
}

function showResponse(answer, emailSent) {
  letter.classList.add("hidden");
  response.classList.remove("hidden");

  const title = document.getElementById("responseTitle");
  const text = document.getElementById("responseText");
  const icon = document.getElementById("responseIcon");

  if (answer === "YES") {
    icon.textContent = "💖";
    title.textContent = "You Said Yes!";
    text.textContent = "You have no idea how happy you just made me. Thank you for giving me a chance. ❤️";
  } else {
    icon.textContent = "💌";
    title.textContent = "Thank You for Being Honest";
    text.textContent = "Whatever your answer, I'm glad I finally found the courage to tell you.";
  }

  if (!emailSent) {
    console.warn("The answer was displayed, but the email notification was not sent. Check EmailJS configuration.");
  }
}
