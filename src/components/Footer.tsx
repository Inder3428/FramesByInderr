import { motion } from 'framer-motion';
import { Instagram, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { Icon: Instagram, href: 'https://www.instagram.com/frames_by_inder?igsh=M3R3enhkeGpwc2Yx', label: 'Instagram' },
    { Icon: Twitter, href: '#', label: 'Twitter' },
    { Icon: Mail, href: 'mailto:singhinderpreet286@gmail.com', label: 'Email' }
  ];

  return (
    <footer className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center space-y-8">
          <div className="flex space-x-8">
            {socialLinks.map(({ Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label={label}
              >
                <Icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
          <div className="text-center text-sm tracking-widest text-gray-400">
            © {new Date().getFullYear()} INDERPREET SINGH
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;