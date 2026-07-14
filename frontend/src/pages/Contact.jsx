import { useState } from "react";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      setError("Please fill in all fields.");
      return;
    }

    // Replace with a real API call once you have a backend, e.g.:
    // await api.post("/contact", form);
    console.log("Contact form submitted:", form);

    setError("");
    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });
  }

  const inputClass = "px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coffee-dark";

  return (
    <div>
      <section className="text-center py-16 px-8 bg-coffee-light">
        <h1 className="text-4xl font-bold text-coffee-dark">Contact Us</h1>
        <p className="mt-3 text-gray-700">We'd love to hear from you.</p>
      </section>

      <section className="p-8 max-w-4xl mx-auto grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-10">
        {/* Contact Info */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
          <p className="text-gray-600 mb-2"><strong>Address:</strong> 123 Coffee Lane, Lahore, Pakistan</p>
          <p className="text-gray-600 mb-2"><strong>Phone:</strong> +92 300 1234567</p>
          <p className="text-gray-600 mb-2"><strong>Email:</strong> hello@beanandbrew.com</p>
          <p className="text-gray-600 mb-2"><strong>Hours:</strong> Mon–Sun, 8am – 10pm</p>
        </div>

        {/* Contact Form */}
        <div>
          {submitted ? (
            <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-4">
              Thanks for reaching out! We'll get back to you soon.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {error && <p className="text-red-600 text-sm">{error}</p>}

              <input
                name="name" placeholder="Your Name" value={form.name}
                onChange={handleChange} className={inputClass}
              />
              <input
                name="email" type="email" placeholder="Your Email" value={form.email}
                onChange={handleChange} className={inputClass}
              />
              <textarea
                name="message" placeholder="Your Message" value={form.message}
                onChange={handleChange} rows={5} className={inputClass}
              />

              <button
                type="submit"
                className="py-2.5 bg-coffee-dark text-white rounded-lg hover:bg-[#2a1a10] transition"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

export default Contact;