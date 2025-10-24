import { motion } from "framer-motion";

export default function Preloader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 1.6, duration: 0.6 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black text-white"
    >
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="text-3xl md:text-5xl tracking-[0.4em] font-light"
      >
        FRAMES BY INDER
      </motion.h1>
    </motion.div>
  );
}
