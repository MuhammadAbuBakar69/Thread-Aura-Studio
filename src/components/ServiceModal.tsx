import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

const EASE = [0.16, 1, 0.3, 1];

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: {
    title: string;
    description: string;
    image: string;
    details: string[];
  } | null;
}

export function ServiceModal({ isOpen, onClose, service }: ServiceModalProps) {
  if (!service) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 80 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="relative w-full max-w-4xl bg-white shadow-2xl flex flex-col md:flex-row border border-gray-100 max-h-[90vh] overflow-y-auto no-scrollbar rounded-2xl md:rounded-none z-10"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-[60] w-10 h-10 bg-white shadow-lg border border-gray-100 rounded-full flex items-center justify-center hover:bg-gold transition-colors"
            >
              <X className="w-5 h-5 text-black" />
            </button>
            <div className="w-full md:w-2/5 h-64 md:h-auto relative flex-shrink-0">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="w-full md:w-3/5 p-8 md:p-12 bg-white flex-shrink-0">
              <h3 className="font-display text-3xl font-bold mb-4">{service.title}<span className="text-gold">.</span></h3>
              <p className="text-gray-600 mb-8 leading-relaxed">{service.description}</p>
              <h4 className="font-bold tracking-widest uppercase text-sm mb-4">What's Included</h4>
              <ul className="space-y-3">
                {service.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start text-gray-700">
                    <span className="w-1.5 h-1.5 bg-gold rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span className="text-sm">{detail}</span>
                  </li>
                ))}
              </ul>
              <button onClick={onClose} className="mt-10 bg-black text-white px-8 py-3 font-medium tracking-widest uppercase w-full hover:bg-gold hover:text-black transition-colors duration-300">
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
