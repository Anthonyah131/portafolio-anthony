import { useState } from "react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section
      id="contact"
      className="section-container min-h-screen lg:h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-16 py-8 lg:py-0 relative"
    >
      <div
        style={{
          maxWidth: "800px",
          width: "100%",
          color: "white",
          zIndex: 10,
          position: "relative",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(2rem, 5vw, 3rem)",
            marginBottom: "1rem",
            textAlign: "center",
            background: "linear-gradient(135deg, #6ec6ff 0%, #9f7aea 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Get In Touch
        </h2>
        <p
          style={{
            textAlign: "center",
            opacity: 0.9,
            marginBottom: "3rem",
            fontSize: "1.125rem",
          }}
        >
          Let's work together on something great
        </p>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} style={{ marginBottom: "3rem" }}>
          <div style={{ marginBottom: "1.5rem" }}>
            <label
              htmlFor="name"
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontSize: "1rem",
                opacity: 0.9,
              }}
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "0.875rem",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(110, 198, 255, 0.3)",
                borderRadius: "8px",
                color: "white",
                fontSize: "1rem",
                outline: "none",
                transition: "all 0.3s ease",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#6ec6ff";
                e.target.style.background = "rgba(255, 255, 255, 0.08)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(110, 198, 255, 0.3)";
                e.target.style.background = "rgba(255, 255, 255, 0.05)";
              }}
            />
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label
              htmlFor="email"
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontSize: "1rem",
                opacity: 0.9,
              }}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "0.875rem",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(110, 198, 255, 0.3)",
                borderRadius: "8px",
                color: "white",
                fontSize: "1rem",
                outline: "none",
                transition: "all 0.3s ease",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#6ec6ff";
                e.target.style.background = "rgba(255, 255, 255, 0.08)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(110, 198, 255, 0.3)";
                e.target.style.background = "rgba(255, 255, 255, 0.05)";
              }}
            />
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label
              htmlFor="message"
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontSize: "1rem",
                opacity: 0.9,
              }}
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              style={{
                width: "100%",
                padding: "0.875rem",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(110, 198, 255, 0.3)",
                borderRadius: "8px",
                color: "white",
                fontSize: "1rem",
                outline: "none",
                transition: "all 0.3s ease",
                resize: "vertical",
                fontFamily: "inherit",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#6ec6ff";
                e.target.style.background = "rgba(255, 255, 255, 0.08)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(110, 198, 255, 0.3)";
                e.target.style.background = "rgba(255, 255, 255, 0.05)";
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "1rem",
              background: "linear-gradient(135deg, #6ec6ff 0%, #9f7aea 100%)",
              border: "none",
              borderRadius: "8px",
              color: "white",
              fontSize: "1.125rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 10px 30px rgba(110, 198, 255, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Send Message
          </button>
        </form>

        {/* Social Links */}
        <div
          style={{
            textAlign: "center",
          }}
        >
          <p
            style={{
              marginBottom: "1.5rem",
              opacity: 0.8,
            }}
          >
            Or connect with me on
          </p>
          <div
            style={{
              display: "flex",
              gap: "1.5rem",
              justifyContent: "center",
            }}
          >
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.75rem 1.5rem",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(110, 198, 255, 0.2)",
                borderRadius: "8px",
                color: "white",
                textDecoration: "none",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                e.currentTarget.style.borderColor = "#6ec6ff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                e.currentTarget.style.borderColor = "rgba(110, 198, 255, 0.2)";
              }}
            >
              <span style={{ fontSize: "1.5rem" }}>🐙</span>
              GitHub
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.75rem 1.5rem",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(110, 198, 255, 0.2)",
                borderRadius: "8px",
                color: "white",
                textDecoration: "none",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                e.currentTarget.style.borderColor = "#6ec6ff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                e.currentTarget.style.borderColor = "rgba(110, 198, 255, 0.2)";
              }}
            >
              <span style={{ fontSize: "1.5rem" }}>💼</span>
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
