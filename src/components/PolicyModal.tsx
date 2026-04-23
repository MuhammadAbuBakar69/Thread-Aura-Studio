import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'privacy' | 'terms' | null;
}

const EASE = [0.16, 1, 0.3, 1];

export function PolicyModal({ isOpen, onClose, type }: PolicyModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-md"
        ></motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="relative w-full max-w-4xl bg-white text-black p-8 sm:p-12 md:p-16 rounded-sm shadow-2xl max-h-[90vh] overflow-y-auto"
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 text-gray-500 hover:text-black hover:bg-gray-100 transition-colors rounded-full"
          >
            <X className="w-6 h-6" />
          </button>

          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-8">
            {type === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
            <span className="text-gold">.</span>
          </h2>
          
          <div className="space-y-6 text-gray-600 font-light leading-relaxed">
            <p className="text-lg">
              Effective Date: {new Date().toLocaleDateString()}
            </p>
            <p>
              Welcome to TAS Elegant Stitch Creations. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this policy, or our practices with regards to your personal information, please contact us at info@taselegant.com.
            </p>
            
            <h3 className="text-xl font-bold text-black mt-8 mb-4">1. Information We Collect</h3>
            <p>
              We collect personal information that you voluntarily provide to us when you register on exploring our services, express an interest in obtaining information about us or our products, when you participate in activities on the services or otherwise when you contact us.
            </p>
            
            <h3 className="text-xl font-bold text-black mt-8 mb-4">2. How We Use Your Information</h3>
            <p>
              We use personal information collected via our website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
            </p>

            <h3 className="text-xl font-bold text-black mt-8 mb-4">3. Custom Orders and Designs</h3>
            <p>
              When uploading custom designs, you retain full ownership of your intellectual property. Our team will only use the uploaded assets strictly for the purpose of fulfilling your embroidery or print orders. We do not distribute or resell client artwork without explicit written permission.
            </p>

            <div className="mt-12 pt-8 border-t border-gray-100">
              <button 
                onClick={onClose}
                className="bg-black text-white px-8 py-3 font-semibold text-sm tracking-widest uppercase hover:bg-gold hover:text-black transition-colors duration-300"
              >
                I Understand
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
