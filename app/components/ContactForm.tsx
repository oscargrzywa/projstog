"use client";

import { useState } from "react";

type Fields = { name: string; email: string; phone: string; message: string };

const INITIAL: Fields = { name: "", email: "", phone: "", message: "" };

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 11,
  fontWeight: 700,
  color: "#6b8068",
  marginBottom: 6,
  textTransform: "uppercase",
  letterSpacing: 0.8,
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 8,
  background: "#0a110a",
  border: "1px solid rgba(52,225,46,0.15)",
  color: "#ECE7DD",
  fontSize: 14,
  boxSizing: "border-box",
};

export function ContactForm() {
  const [fields, setFields] = useState<Fields>(INITIAL);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  function set(k: keyof Fields) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setFields((f) => ({ ...f, [k]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1200);
  }

  if (sent) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "40px 0",
          gap: 16,
        }}
      >
        <svg
          width="64"
          height="64"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden={true}
        >
          <circle cx="32" cy="32" r="32" fill="rgba(52,225,46,0.1)" />
          <polyline
            points="20,32 28,40 44,24"
            stroke="#34E12E"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <h3 style={{ fontSize: 20, fontWeight: 700, color: "#ECE7DD", margin: 0 }}>
          Wiadomość wysłana!
        </h3>
        <p style={{ fontSize: 14, color: "#6b8068", margin: 0 }}>
          Odpiszę w ciągu 24 godzin.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div>
        <label htmlFor="cf-name" style={labelStyle}>
          Imię i nazwisko
        </label>
        <input
          id="cf-name"
          type="text"
          value={fields.name}
          onChange={set("name")}
          required
          className="form-field"
          style={inputStyle}
        />
      </div>
      <div>
        <label htmlFor="cf-email" style={labelStyle}>
          Email
        </label>
        <input
          id="cf-email"
          type="email"
          value={fields.email}
          onChange={set("email")}
          required
          className="form-field"
          style={inputStyle}
        />
      </div>
      <div>
        <label htmlFor="cf-phone" style={labelStyle}>
          Telefon (opcjonalnie)
        </label>
        <input
          id="cf-phone"
          type="tel"
          value={fields.phone}
          onChange={set("phone")}
          className="form-field"
          style={inputStyle}
        />
      </div>
      <div>
        <label htmlFor="cf-message" style={labelStyle}>
          Opisz swój projekt
        </label>
        <textarea
          id="cf-message"
          value={fields.message}
          onChange={set("message")}
          required
          rows={4}
          className="form-field"
          style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit" }}
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        style={{
          background: "linear-gradient(135deg,#1B9D17,#34E12E)",
          color: "#060807",
          fontWeight: 700,
          fontSize: 15,
          padding: "14px",
          borderRadius: 10,
          border: "none",
          cursor: loading ? "not-allowed" : "pointer",
          opacity: loading ? 0.7 : 1,
          transition: "opacity 0.2s",
          boxShadow: "0 0 20px rgba(52,225,46,0.2)",
        }}
      >
        {loading ? "Wysyłanie..." : "Wyślij wiadomość"}
      </button>
    </form>
  );
}
