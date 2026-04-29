// Footer year

document.getElementById("year").textContent = new Date().getFullYear();

 

// Timestamp + page URL capture (sends with the form)

const submittedAt = document.getElementById("submittedAt");

const pageUrl = document.getElementById("pageUrl");

if (submittedAt) submittedAt.value = new Date().toISOString();

if (pageUrl) pageUrl.value = window.location.href;

 

// Nice Formspree submit experience (no redirect)

const form = document.getElementById("quoteForm");

const statusEl = document.getElementById("formStatus");

const submitBtn = document.getElementById("submitBtn");

 

if (form) {

  form.addEventListener("submit", async (e) => {

    e.preventDefault();

 

    // refresh timestamp at send time

    if (submittedAt) submittedAt.value = new Date().toISOString();

    if (pageUrl) pageUrl.value = window.location.href;

 

    statusEl.textContent = "";

    submitBtn.disabled = true;

    submitBtn.textContent = "Sending…";

 

    try {

      const formData = new FormData(form);

 

      const res = await fetch(form.action, {

        method: form.method,

        body: formData,

        headers: { "Accept": "application/json" }

      });

 

      if (res.ok) {

        form.reset();

        statusEl.textContent = "✅ Thanks! We received your request and will reply ASAP.";

        statusEl.style.color = "#16a34a";

      } else {

        statusEl.textContent = "⚠️ Something went wrong. Please call/text instead.";

        statusEl.style.color = "#dc2626";

      }

    } catch (err) {

      statusEl.textContent = "⚠️ Network error. Please call/text instead.";

      statusEl.style.color = "#dc2626";

    } finally {

      submitBtn.disabled = false;

      submitBtn.textContent = "Send Quote Request";

    }

  });

}
