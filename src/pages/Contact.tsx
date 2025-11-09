"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, Loader2 } from "lucide-react";
import emailjs from "@emailjs/browser";
import { cn } from "@/lib/utils";

/* =========================
   Geometric Background
========================= */
function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]",
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -150, rotate: rotate - 15 }}
      animate={{ opacity: 1, y: 0, rotate }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{ width, height }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "backdrop-blur-[2px] border-2 border-white/[0.15]",
            "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]"
          )}
        />
      </motion.div>
    </motion.div>
  );
}

function GeometricBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#030303]" />
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl" />

      <ElegantShape
        delay={0.3}
        width={600}
        height={140}
        rotate={12}
        gradient="from-indigo-500/[0.15]"
        className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
      />
      <ElegantShape
        delay={0.5}
        width={500}
        height={120}
        rotate={-15}
        gradient="from-rose-500/[0.15]"
        className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
      />
      <ElegantShape
        delay={0.4}
        width={300}
        height={80}
        rotate={-8}
        gradient="from-violet-500/[0.15]"
        className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
      />
      <ElegantShape
        delay={0.6}
        width={200}
        height={60}
        rotate={20}
        gradient="from-amber-500/[0.15]"
        className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
      />
      <ElegantShape
        delay={0.7}
        width={150}
        height={40}
        rotate={-25}
        gradient="from-cyan-500/[0.15]"
        className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
    </div>
  );
}

/* =========================
   Contact Page
========================= */
const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const validateForm = (): boolean => {
    const newErrors: { name?: string; email?: string; message?: string } = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Please enter a valid email address";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");
    try {
      await emailjs.send(
        "service_imr7m0a",
        "template_5o36pq2",
        { name: formData.name, email: formData.email, message: formData.message },
        "Yn4Sc73fc1UopQy0-"
      );
      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("Email send error:", err);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  return (
    <section className="relative min-h-screen pt-32 pb-24 px-4 overflow-hidden">
      <GeometricBackground />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-light mb-6">
            Get in{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300">
              Touch
            </span>
          </h1>
          <p className="text-gray-400">
            Let’s create something extraordinary together. Whether you have a
            specific project in mind or just want to explore possibilities, I’m
            here to help.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto space-y-8"
        >
          <div className="space-y-6">
            <div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className={cn(
                    "w-full bg-white/5 border rounded-lg px-6 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all",
                    errors.name
                      ? "border-red-500 focus:ring-red-500/20"
                      : "border-white/10 focus:border-white/20 focus:ring-white/20"
                  )}
                />
              </motion.div>
              {errors.name && <p className="mt-2 text-sm text-red-400">{errors.name}</p>}
            </div>

            <div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className={cn(
                    "w-full bg-white/5 border rounded-lg px-6 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all",
                    errors.email
                      ? "border-red-500 focus:ring-red-500/20"
                      : "border-white/10 focus:border-white/20 focus:ring-white/20"
                  )}
                />
              </motion.div>
              {errors.email && <p className="mt-2 text-sm text-red-400">{errors.email}</p>}
            </div>

            <div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  rows={6}
                  className={cn(
                    "w-full bg-white/5 border rounded-lg px-6 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all resize-none",
                    errors.message
                      ? "border-red-500 focus:ring-red-500/20"
                      : "border-white/10 focus:border-white/20 focus:ring-white/20"
                  )}
                />
              </motion.div>
              {errors.message && <p className="mt-2 text-sm text-red-400">{errors.message}</p>}
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isSubmitting}
            className={cn(
              "w-full py-4 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors",
              isSubmitting
                ? "bg-white/50 cursor-not-allowed"
                : "bg-white text-black hover:bg-gray-100"
            )}
          >
            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
          </motion.button>

          {submitStatus === "success" && (
            <p className="text-center text-green-400">Message sent successfully</p>
          )}
          {submitStatus === "error" && (
            <p className="text-center text-red-400">
              Error sending message. Try again later.
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;
