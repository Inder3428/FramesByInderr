"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Send, Mail } from "lucide-react";
import emailjs from "@emailjs/browser";

const cn = (...c: string[]) => c.filter(Boolean).join(" ");

/* =========================
   YOUR NUMBER (digits only)
========================= */
const YOUR_PHONE = "13479358153";



/* =====================================================
   BACKGROUND
===================================================== */
function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/10",
}: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -150, rotate: rotate - 10 }}
      animate={{ opacity: 1, y: 0, rotate }}
      transition={{ duration: 2.4, delay }}
      className={cn("absolute rounded-full blur-3xl", className)}
      style={{ width, height, background: `linear-gradient(to right, ${gradient})` }}
    />
  );
}

function GeometricBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#030303]">
      <ElegantShape width={600} height={140} rotate={12} className="left-[-10%] top-[20%] bg-indigo-500/20" />
      <ElegantShape width={500} height={120} rotate={-15} className="right-[-5%] top-[70%] bg-rose-500/20" />
      <ElegantShape width={300} height={100} rotate={8} className="left-[20%] bottom-[10%] bg-violet-500/20" />
    </div>
  );
}



/* =====================================================
   PROFILE CARD
===================================================== */
function GlassProfileCard() {
  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ repeat: Infinity, duration: 4 }}
      className="mx-auto w-80 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl p-6 mb-12 text-white"
    >
      <div className="flex flex-col items-center">
        <img
          src="https://ik.imagekit.io/fpxbgsota/memoji-alex.png"
          className="h-28 w-28 rounded-full border-2 border-white/30 mb-4"
        />

        <h3 className="text-xl font-semibold">Inderpreet Singh</h3>
        <p className="text-white/70 text-sm mb-2">Photographer</p>

        <p className="text-white/60 text-sm mt-2">+1 347-935-8153</p>
        <p className="text-white/60 text-sm">singhinderpreet286@gmail.com</p>
      </div>
    </motion.div>
  );
}



/* =====================================================
   CONTACT FORM
===================================================== */
function ContactForm() {
  const [data, setData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const inputStyle =
    "w-full rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 px-5 py-4 text-white placeholder-white/50 focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-400 transition";

  const update = (e: any) =>
    setData({ ...data, [e.target.name]: e.target.value });



  /* =========================
     ✅ REQUIRED VALIDATION
  ========================= */
  const valid = () =>
    data.name.trim() &&
    data.phone.trim() &&
    data.email.trim() &&
    data.message.trim();

  const buildMessage = () =>
    `Name: ${data.name}
Phone: ${data.phone}
Email: ${data.email}
Message: ${data.message}`;



  /* ===== EMAIL ===== */
  const sendEmail = async () => {
    if (!valid()) return alert("Please fill Name, Phone, Email and Message");

    setLoading(true);

    try {
      await emailjs.send(
        "service_imr7m0a",
        "template_5o36pq2",
        data,
        "Yn4Sc73fc1UopQy0-"
      );

      setSuccess("Message sent successfully ✨");
      setData({ name: "", phone: "", email: "", message: "" });
    } catch {
      alert("Email failed. Check EmailJS keys.");
    }

    setLoading(false);
  };



  /* ===== WHATSAPP ===== */
  const openWhatsApp = () => {
    if (!valid()) return alert("Please fill all fields first");

    window.open(
      `https://wa.me/${YOUR_PHONE}?text=${encodeURIComponent(buildMessage())}`,
      "_blank"
    );
  };



  /* ===== iMESSAGE ===== */
  const openSMS = () => {
    if (!valid()) return alert("Please fill all fields first");

    window.location.href = `sms:${YOUR_PHONE}?body=${encodeURIComponent(buildMessage())}`;
  };



  const btn =
    "flex items-center justify-center gap-2 rounded-xl py-3 font-medium transition hover:scale-105 active:scale-95";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 space-y-5 shadow-2xl"
    >
      <input required name="name" placeholder="Your Name *" value={data.name} onChange={update} className={inputStyle} />

      <input required name="phone" placeholder="Your Phone *" value={data.phone} onChange={update} className={inputStyle} />

      <input
        required
        type="email"
        name="email"
        placeholder="Your Email *"
        value={data.email}
        onChange={update}
        className={inputStyle}
      />

      <textarea
        required
        name="message"
        rows={5}
        placeholder="Your Message *"
        value={data.message}
        onChange={update}
        className={inputStyle}
      />

      {success && <p className="text-green-400 text-sm">{success}</p>}

      <div className="grid md:grid-cols-3 gap-4">
        <button onClick={openWhatsApp} className={cn(btn, "bg-green-500 text-white")}>
          <MessageCircle size={18} /> WhatsApp
        </button>

        <button onClick={openSMS} className={cn(btn, "bg-blue-500 text-white")}>
          <Send size={18} /> iMessage
        </button>

        <button onClick={sendEmail} disabled={loading} className={cn(btn, "bg-white text-black")}>
          <Mail size={18} /> {loading ? "Sending..." : "Email"}
        </button>
      </div>
    </motion.div>
  );
}



/* =====================================================
   MAIN PAGE
===================================================== */
export default function ContactPage() {
  return (
    <section className="relative min-h-screen pt-32 pb-24 px-4 overflow-hidden text-white">
      <GeometricBackground />

      <div className="relative z-10 text-center max-w-7xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-light mb-12">
          Get in <span className="text-indigo-300">Touch</span>
        </h1>

        <GlassProfileCard />

        <ContactForm />
      </div>
    </section>
  );
}
