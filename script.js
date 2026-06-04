const profileText = [
  "Name: Omar Mohamed Samir",
  "Phone Number: +201016585250",
  "Email: omarsamir2956@gmail.com",
  "iCloud: omarms28@icloud.com",
  "Occupation: Web & Graphics Designer"
].join("\n");

const toast = document.querySelector(".toast");
const copyButton = document.querySelector("[data-copy-card]");
const cursorLight = document.querySelector(".cursor-light");
let toastTimer;

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 2200);
}

copyButton?.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(profileText);
    showToast("Details copied");
  } catch {
    showToast("Copy unavailable");
  }
});

window.addEventListener("pointermove", (event) => {
  if (!cursorLight) return;
  cursorLight.style.setProperty("--x", `${event.clientX}px`);
  cursorLight.style.setProperty("--y", `${event.clientY}px`);
}, { passive: true });

document.querySelectorAll(".identity-card").forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(900px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg) translateY(-2px)`;
  });

  card.addEventListener("pointerleave", () => {
    card.style.transform = "";
  });
});
