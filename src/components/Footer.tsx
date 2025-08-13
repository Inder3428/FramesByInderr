import { motion } from 'framer-motion';
import { Instagram, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { Icon: Instagram, href: 'https://www.instagram.com/frames_by_inder?igsh=M3R3enhkeGpwc2Yx', label: 'Instagram' },
    { Icon: Twitter, href: '#', label: 'Twitter' },
    { Icon: Mail, href: 'mailto:singhinderpreet286@gmail.com', label: 'Email' }
  ];

  return (
    <footer className="border-t border-gray-800 py-8 px-4 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center gap-6">
          
          {/* Social Icons */}
          <div className="flex gap-6">
            {socialLinks.map(({ Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                className="text-gray-400 hover:text-white transition-all duration-300"
                aria-label={label}
              >
                <Icon className="w-6 h-6 hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]" />
              </motion.a>
            ))}
          </div>

          {/* Footer Text */}
          <p className="text-xs md:text-sm text-gray-500 tracking-widest text-center">
            © {new Date().getFullYear()} INDERPREET SINGH — All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
