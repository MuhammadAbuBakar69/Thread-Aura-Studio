import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, UploadCloud, Info } from 'lucide-react';

const EASE = [0.16, 1, 0.3, 1];

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function OrderModal({ isOpen, onClose }: OrderModalProps) {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Form State
  const [service, setService] = useState<'digitizing' | 'vector' | ''>('');
  const [placement, setPlacement] = useState('');
  const [vectorType, setVectorType] = useState('');
  const [sizeW, setSizeW] = useState('');
  const [sizeH, setSizeH] = useState('');
  const [turnaround, setTurnaround] = useState('normal');
  const [complexity, setComplexity] = useState('normal'); // normal, complex (for digitizing cost)

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const calculateEstimate = () => {
    let total = 0;
    if (service === 'digitizing') {
      if (placement === 'hat' || placement === 'left_chest') {
        total = complexity === 'complex' ? 15 : 10;
      } else if (placement === 'front_chest') {
        total = 20; // Avg $15 - $25
      } else if (placement === 'jacket_back') {
        total = 35; // Avg $25 - $50
      }
    } else if (service === 'vector') {
       total = 15; // Base vector price
    }
    
    // Rush fee logic
    if (turnaround === 'rush') total += 10;

    return total;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // In later iterations, this will process payment via Stripe and generate an invoice.
    setTimeout(() => {
      setIsSubmitted(false);
      setStep(1);
      setService('');
      setPlacement('');
      onClose();
    }, 4000);
  };

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
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="relative w-full max-w-2xl bg-white shadow-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[90vh] rounded-xl"
          >
            <div className="flex-shrink-0 flex items-center justify-between p-6 md:p-8 border-b border-gray-100">
               <div>
                  <h2 className="font-display text-2xl font-bold">Start Your Order<span className="text-gold">.</span></h2>
                  <p className="text-gray-500 text-sm mt-1">Get an instant estimate and upload files.</p>
               </div>
               <button
                 onClick={onClose}
                 className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
               >
                 <X className="w-5 h-5 text-black" />
               </button>
            </div>

            <div className="p-6 md:p-8 overflow-y-auto">
              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  className="py-16 text-center"
                >
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-display font-bold mb-2">Order Confirmed!</h3>
                  <p className="text-gray-500 max-w-md mx-auto">Your order has been recorded into our tracking system. An auto-invoice will be generated shortly.</p>
                </motion.div>
              ) : (
                <div className="space-y-6">
                  
                  {/* Progress Indicator */}
                  <div className="flex items-center gap-2 mb-8">
                     {[1,2,3,4].map(s => (
                        <div key={s} className={`h-1 flex-1 rounded-full ${s <= step ? 'bg-gold' : 'bg-gray-100'}`}></div>
                     ))}
                  </div>

                  <form onSubmit={step === 4 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}>
                     
                     {/* Step 1: Service Type */}
                     {step === 1 && (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                           <h3 className="text-xl font-bold font-display">1. What service do you need?</h3>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <motion.label 
                                 animate={{ backgroundColor: service === 'digitizing' ? '#fff9e6' : '#ffffff', borderColor: service === 'digitizing' ? '#FFD700' : '#f3f4f6' }}
                                 className="border-2 p-6 cursor-pointer transition-colors rounded-xl"
                              >
                                 <input type="radio" name="service" className="hidden" checked={service === 'digitizing'} onChange={() => setService('digitizing')} />
                                 <h4 className="font-bold text-lg mb-2">Embroidery Digitizing</h4>
                                 <p className="text-sm text-gray-500">Convert your logo into embroidery machine files (DST, PES, etc).</p>
                              </motion.label>
                              <motion.label 
                                 animate={{ backgroundColor: service === 'vector' ? '#fff9e6' : '#ffffff', borderColor: service === 'vector' ? '#FFD700' : '#f3f4f6' }}
                                 className="border-2 p-6 cursor-pointer transition-colors rounded-xl"
                              >
                                 <input type="radio" name="service" className="hidden" checked={service === 'vector'} onChange={() => setService('vector')} />
                                 <h4 className="font-bold text-lg mb-2">Vector Art Tracing</h4>
                                 <p className="text-sm text-gray-500">Redraw raster images into high-quality scalable vectors (AI, EPS, SVG).</p>
                              </motion.label>
                           </div>
                           <motion.button 
                              disabled={!service} type="button" onClick={handleNext} 
                              whileHover={{ scale: service ? 1.05 : 1, boxShadow: service ? "0px 0px 20px rgba(255,215,0,0.6)" : "none" }}
                              className="w-full bg-black text-white py-4 font-bold tracking-widest uppercase disabled:bg-gray-200 mt-6 transition-all rounded-xl"
                           >
                              Continue
                           </motion.button>
                        </motion.div>
                     )}

                     {/* Step 2: Details */}
                     {step === 2 && (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                           <h3 className="text-xl font-bold font-display">2. Service Details</h3>
                           
                           {service === 'digitizing' && (
                              <>
                                 <div className="space-y-2">
                                    <label className="text-xs font-bold tracking-widest uppercase text-gray-700">Placement</label>
                                    <select value={placement} onChange={(e) => setPlacement(e.target.value)} required className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/30 rounded-md px-2 text-black font-medium transition-all duration-300">
                                       <option value="">Select placement</option>
                                       <option value="hat">Hat / Cap</option>
                                       <option value="left_chest">Left Chest</option>
                                       <option value="front_chest">Front Chest</option>
                                       <option value="jacket_back">Jacket Back</option>
                                    </select>
                                 </div>

                                 <div className="space-y-2 pt-4">
                                    <label className="text-xs font-bold tracking-widest uppercase text-gray-700">Design Complexity</label>
                                    <div className="flex gap-4">
                                       <label className="flex items-center gap-2 cursor-pointer">
                                          <input type="radio" checked={complexity === 'normal'} onChange={() => setComplexity('normal')} /> <span className="text-sm">Normal (Text / Basic Shapes)</span>
                                       </label>
                                       <label className="flex items-center gap-2 cursor-pointer">
                                          <input type="radio" checked={complexity === 'complex'} onChange={() => setComplexity('complex')} /> <span className="text-sm">Complex (High Detail)</span>
                                       </label>
                                    </div>
                                 </div>
                              </>
                           )}

                           {service === 'vector' && (
                              <div className="space-y-2">
                                 <label className="text-xs font-bold tracking-widest uppercase text-gray-700">Print Type Intended</label>
                                 <select value={vectorType} onChange={(e) => setVectorType(e.target.value)} required className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/30 rounded-md px-2 text-black font-medium transition-all duration-300">
                                    <option value="">Select type</option>
                                    <option value="screen">Screen Printing (Color Separated)</option>
                                    <option value="dtf">DTF (Direct to Film)</option>
                                    <option value="vinyl">Vinyl Cutting</option>
                                 </select>
                              </div>
                           )}

                           <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                              <div className="space-y-2">
                                 <label className="text-xs font-bold tracking-widest uppercase text-gray-700">Width (Inches)</label>
                                 <input value={sizeW} onChange={e => setSizeW(e.target.value)} required type="number" step="0.1" className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/30 rounded-md px-2 transition-all duration-300" placeholder="e.g. 3.5" />
                              </div>
                              <div className="space-y-2">
                                 <label className="text-xs font-bold tracking-widest uppercase text-gray-700">Height (Inches)</label>
                                 <input value={sizeH} onChange={e => setSizeH(e.target.value)} required type="number" step="0.1" className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/30 rounded-md px-2 transition-all duration-300" placeholder="e.g. 2.0" />
                              </div>
                           </div>
                           
                           <div className="flex gap-4 mt-6">
                              <motion.button whileHover={{ scale: 1.05 }} type="button" onClick={handleBack} className="w-1/3 border border-gray-200 py-4 font-bold tracking-widest uppercase transition-colors rounded-xl">
                                 Back
                              </motion.button>
                              <motion.button 
                                 whileHover={{ scale: ((service === 'digitizing' && !placement) || (service === 'vector' && !vectorType) || !sizeH || !sizeW) ? 1 : 1.05, boxShadow: ((service === 'digitizing' && !placement) || (service === 'vector' && !vectorType) || !sizeH || !sizeW) ? "none" : "0px 0px 20px rgba(255,215,0,0.6)" }}
                                 type="button" onClick={handleNext} disabled={(service === 'digitizing' && !placement) || (service === 'vector' && !vectorType) || !sizeH || !sizeW} 
                                 className="w-2/3 bg-black text-white py-4 font-bold tracking-widest uppercase disabled:bg-gray-200 transition-all rounded-xl"
                              >
                                 Continue
                              </motion.button>
                           </div>
                        </motion.div>
                     )}

                     {/* Step 3: Turnaround & Upload */}
                     {step === 3 && (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                           <h3 className="text-xl font-bold font-display">3. Turnaround & Artwork</h3>
                           
                           <div className="space-y-2">
                              <label className="text-xs font-bold tracking-widest uppercase text-gray-700">Speed</label>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                 <label className={`border border-gray-200 p-4 cursor-pointer hover:border-gold transition-colors flex justify-between items-center ${turnaround === 'normal' ? 'border-gold bg-gold/5' : ''}`}>
                                    <div>
                                       <span className="font-bold block text-sm">Normal</span>
                                       <span className="text-xs text-gray-500">24-48 Hours</span>
                                    </div>
                                    <input type="radio" checked={turnaround === 'normal'} onChange={() => setTurnaround('normal')} />
                                 </label>
                                 <label className={`border border-gray-200 p-4 cursor-pointer hover:border-gold transition-colors flex justify-between items-center ${turnaround === 'rush' ? 'border-gold bg-gold/5' : ''}`}>
                                    <div>
                                       <span className="font-bold block text-sm">Rush Order</span>
                                       <span className="text-xs text-gray-500">3-4 Hours (+$10)</span>
                                    </div>
                                    <input type="radio" checked={turnaround === 'rush'} onChange={() => setTurnaround('rush')} />
                                 </label>
                              </div>
                           </div>

                           <div className="space-y-2">
                              <label className="text-xs font-bold tracking-widest uppercase text-gray-700 block mb-2">Upload Artwork</label>
                              <motion.div 
                                 whileHover={{ scale: 1.02, boxShadow: "0px 0px 15px rgba(255,215,0,0.3)", borderColor: "#FFD700" }}
                                 className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center text-center transition-colors cursor-pointer group"
                              >
                                 <UploadCloud className="w-8 h-8 text-gray-400 group-hover:text-gold mb-2 transition-colors" />
                                 <p className="text-sm text-gray-500">Drag & drop your design here, or <span className="text-black font-medium group-hover:text-gold">browse</span></p>
                                 <p className="text-xs text-gray-400 mt-1">Supports PNG, JPG, PDF, AI (Max 25MB)</p>
                              </motion.div>
                           </div>

                           <div className="flex gap-4 mt-6">
                              <motion.button whileHover={{ scale: 1.05 }} type="button" onClick={handleBack} className="w-1/3 border border-gray-200 py-4 font-bold tracking-widest uppercase transition-colors rounded-xl">
                                 Back
                              </motion.button>
                              <motion.button 
                                 whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(255,215,0,0.6)" }}
                                 type="button" onClick={handleNext} className="w-2/3 bg-black text-white py-4 font-bold tracking-widest uppercase transition-colors rounded-xl"
                              >
                                 Review & Checkout
                              </motion.button>
                           </div>
                        </motion.div>
                     )}

                     {/* Step 4: Estimate & Checkout */}
                     {step === 4 && (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                           <div className="bg-gray-50 p-6 border border-gray-100">
                              <h3 className="text-lg font-bold font-display mb-4">Order Summary</h3>
                              <div className="space-y-3 text-sm">
                                 <div className="flex justify-between border-b border-gray-200 pb-2">
                                    <span className="text-gray-500">Service</span>
                                    <span className="font-bold capitalize">{service}</span>
                                 </div>
                                 <div className="flex justify-between border-b border-gray-200 pb-2">
                                    <span className="text-gray-500">{service === 'digitizing' ? 'Placement' : 'Print Type'}</span>
                                    <span className="font-bold capitalize">{service === 'digitizing' ? placement.replace('_', ' ') : vectorType}</span>
                                 </div>
                                 <div className="flex justify-between border-b border-gray-200 pb-2">
                                    <span className="text-gray-500">Dimensions</span>
                                    <span className="font-bold">{sizeW}" W x {sizeH}" H</span>
                                 </div>
                                 <div className="flex justify-between border-b border-gray-200 pb-2">
                                    <span className="text-gray-500">Delivery Speed</span>
                                    <span className="font-bold capitalize">{turnaround}</span>
                                 </div>
                              </div>
                              
                              <div className="mt-6 flex justify-between items-center text-xl">
                                 <span className="font-bold">Estimated Cost:</span>
                                 <span className="font-display font-bold text-gold text-3xl">${calculateEstimate().toFixed(2)}*</span>
                              </div>
                              <div className="flex items-center gap-2 mt-4 text-xs text-gray-400">
                                 <Info className="w-4 h-4" />
                                 <p>Final pricing may vary slightly based on final design complexity review by our digitizers.</p>
                              </div>
                           </div>

                           <div className="flex gap-4">
                              <motion.button whileHover={{ scale: 1.05 }} type="button" onClick={handleBack} className="w-1/3 border border-gray-200 py-4 font-bold tracking-widest uppercase transition-colors rounded-xl">
                                 Back
                              </motion.button>
                              <motion.button 
                                 whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(255,215,0,0.6)" }}
                                 type="submit" className="w-2/3 bg-black text-white py-4 font-bold tracking-widest uppercase transition-colors rounded-xl"
                              >
                                 {isSubmitted ? (
                                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mx-auto"></motion.div>
                                 ) : 'Proceed to Payment'}
                              </motion.button>
                           </div>
                        </motion.div>
                     )}

                  </form>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
