import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Validate Form Inputs
  const validateForm = (): boolean => {
    const newErrors: { name?: string; email?: string; message?: string } = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Send Email Using EmailJS
      await emailjs.send(
        'service_imr7m0a', // Replace with your EmailJS Service ID
        'template_5o36pq2', // Replace with your EmailJS Template ID
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        'Yn4Sc73fc1UopQy0-' // Replace with your EmailJS Public Key
      );

      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Email send error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Input Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h1 className="text-6xl font-light mb-6">Get in Touch</h1>
          <p className="text-gray-400">
            Let’s create something extraordinary together. Whether you have a specific 
            project in mind or just want to explore possibilities, I’m here to help.
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
                  className={`w-full bg-white/5 border rounded-lg px-6 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
                    errors.name ? 'border-red-500 focus:ring-red-500/20' : 'border-white/10 focus:border-white/20 focus:ring-white/20'
                  }`}
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
                  className={`w-full bg-white/5 border rounded-lg px-6 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
                    errors.email ? 'border-red-500 focus:ring-red-500/20' : 'border-white/10 focus:border-white/20 focus:ring-white/20'
                  }`}
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
                  className={`w-full bg-white/5 border rounded-lg px-6 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all resize-none ${
                    errors.message ? 'border-red-500 focus:ring-red-500/20' : 'border-white/10 focus:border-white/20 focus:ring-white/20'
                  }`}
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
            className={`w-full py-4 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors ${
              isSubmitting ? 'bg-white/50 cursor-not-allowed' : 'bg-white text-black hover:bg-gray-100'
            }`}
          >
            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
          </motion.button>

          {submitStatus === 'success' && <p className="text-center text-green-400">Message sent successfully</p>}
          {submitStatus === 'error' && <p className="text-center text-red-400">Error sending message. Try again later.</p>}
        </motion.form>
      </div>
    </div>
  );
};

export default Contact;
