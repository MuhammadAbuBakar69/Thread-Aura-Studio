import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Menu, X, Scissors, Shirt, UploadCloud, 
  CreditCard, Truck, Star, Facebook, Instagram, Twitter, ArrowRight,
  ChevronDown, Zap, Award, Clock, ShieldCheck, MessageCircle, Plus
} from 'lucide-react';
import { ServiceModal } from './components/ServiceModal';
import { OrderModal } from './components/OrderModal';
import { PolicyModal } from './components/PolicyModal';
import { ChatBot } from './components/ChatBot';
import { Testimonial } from './components/ui/design-testimonial';

const faqs = [
  { question: "What file formats do you need for embroidery digitizing?", answer: "We accept all major formats including JPG, PNG, PDF, AI, and EPS. Our team will convert your artwork into the required machine formats like DST, PES, exp, or EMB." },
  { question: "How long does the digitizing process take?", answer: "Standard turnaround time is 24 hours. However, we also offer rush services if you need your files within a few hours." },
  { question: "Do you charge for minor edits?", answer: "No, we believe in exceptional service. We offer free minor edits to ensure you are 100% satisfied with the digitized file before it goes to production." },
  { question: "Can you turn a photograph into an embroidery pattern?", answer: "Yes, our expert digitizers specialize in photo-realistic embroidery and complex vector tracing to bring intricate designs to life." }
];

const servicesList = [
  {
    id: 'embroidery',
    title: 'Embroidery Digitizing',
    description: 'Premium digitizing for standard apparel. State-of-the-art software ensures every detail is sharp, durable, and luxurious. Perfect for corporate apparel and hats.',
    image: 'https://images.unsplash.com/photo-1620601007873-19eb7ed52bf3?q=80&w=800&auto=format&fit=crop',
    icon: Scissors,
    details: ['High color count support', 'Smooth machine run guarantee', 'Left chest & jacket back experts', 'Minimal thread breaks'],
    bgClass: 'bg-black text-white hover:bg-gray-900',
    iconBgClass: 'bg-white/10',
    iconClass: 'text-gold',
  },
  {
    id: 'puff',
    title: '3D Puff Digitizing',
    description: 'Elevate your hats and structured garments with specialized 3D puff digitizing. We engineered the exact underlay and density needed for foam embroidery.',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop',
    icon: Star,
    details: ['Capped ends prevention', 'Perfect foam coverage', 'Hat specific calculations', 'Dimension and depth'],
    bgClass: 'bg-white text-black border-2 border-gray-100 hover:border-gold/30',
    iconBgClass: 'bg-gray-100',
    iconClass: 'text-black',
  },
  {
    id: 'applique',
    title: 'Applique & Diamond Stitch',
    description: 'Precision vector and embroidery combinations for large format applique designs, including custom diamond stitch patterns for luxury outerwear.',
    image: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?q=80&w=800&auto=format&fit=crop',
    icon: Shirt,
    details: ['Placement line precision', 'Tack-down accuracy', 'Custom stitch patterns', 'Varsity jacket specialists'],
    bgClass: 'bg-[#fafafa] text-black border-2 border-transparent hover:border-black/5',
    iconBgClass: 'bg-white',
    iconClass: 'text-black',
  },
  {
    id: 'dtf',
    title: 'Vector Tracing & DTF',
    description: 'High-definition raster to vector conversions. Ideal for vibrant prints, DTF PNG generation, screen printing color separations, and vinyl cutting.',
    image: 'https://images.unsplash.com/photo-1626786016335-e1069502b4d9?q=80&w=800&auto=format&fit=crop',
    icon: Zap,
    details: ['Hand drawn SVGs (No auto-trace)', 'DTF specific high-res PNGs', 'Color separated layers', 'Vinyl ready cut lines'],
    bgClass: 'bg-gold text-black hover:bg-gold-dark',
    iconBgClass: 'bg-black/10',
    iconClass: 'text-black',
  }
];

const portfolioItems = [
  { id: 1, title: 'Corporate Identity', category: 'Apparel', image: 'https://images.unsplash.com/photo-1584285408990-8e104db809f6?w=800&q=80' },
  { id: 2, title: 'Varsity Collection', category: 'DTF Patches', image: 'https://images.unsplash.com/photo-1616422285623-13ff0162193c?w=800&q=80' },
  { id: 3, title: 'Streetwear Line', category: 'DTF Patches', image: 'https://images.unsplash.com/photo-1520975954732-57dd22299614?w=800&q=80' },
  { id: 4, title: 'Snapback Series', category: 'Hats', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80' },
  { id: 5, title: 'Premium Branding', category: '3D Puff', image: 'https://images.unsplash.com/photo-1582236528766-9b626ec3e36e?w=800&q=80' },
  { id: 6, title: 'Tactical Gear', category: 'Patches', image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80' },
  { id: 7, title: 'Boutique Polos', category: 'Apparel', image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80' },
  { id: 8, title: 'Summer Festival', category: 'DTF Patches', image: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=800&q=80' },
  { id: 9, title: 'Limited Edition Cap', category: '3D Puff', image: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8?w=800&q=80' },
  { id: 10, title: 'Security Uniforms', category: 'Patches', image: 'https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?w=800&q=80' },
  { id: 11, title: 'Tech Startup Team', category: 'Apparel', image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80' },
  { id: 12, title: 'Trucker Hat Run', category: 'Hats', image: 'https://images.unsplash.com/photo-1475403614135-5f1aa0eb5015?w=800&q=80' },
];

const EASE = [0.16, 1, 0.3, 1];

export default function App() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [workFilter, setWorkFilter] = useState('All');
  const [policyType, setPolicyType] = useState<'privacy' | 'terms' | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [footerMenuOpen, setFooterMenuOpen] = useState({ company: false, shop: false });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-black selection:bg-gold/30 selection:text-black">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className={`font-display text-2xl font-bold tracking-tight ${isScrolled ? 'text-black' : 'text-white'}`}>
            TAS<span className="text-gold">.</span>
          </div>
          
          <div className="hidden md:flex space-x-8">
            {['Services', 'About', 'Work', 'Pricing', 'Process', 'Team'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className={`text-sm tracking-wider uppercase font-medium transition-colors hover:text-gold ${isScrolled ? 'text-black' : 'text-white/90'}`}>
                {item}
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <button 
              onClick={() => setIsOrderModalOpen(true)}
              className="relative overflow-hidden bg-gold text-black px-8 py-3 rounded-none font-medium text-sm tracking-widest uppercase group transition-all"
            >
              <span className="relative z-10 group-hover:text-white transition-colors duration-500">Order Now</span>
              <div className="absolute inset-0 bg-black translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-0"></div>
            </button>
          </div>

          <button 
            className="md:hidden relative group w-10 h-10 flex items-center justify-center overflow-hidden rounded-full transition-colors z-50 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {/* Shutter hover effect background for hamburger */}
            <div className={`absolute inset-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isScrolled ? 'bg-black/10' : 'bg-white/10'} translate-y-[-100%] group-hover:translate-y-0`}></div>
            <div className={`absolute inset-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isScrolled ? 'bg-black/10' : 'bg-white/10'} translate-y-[100%] group-hover:translate-y-0`}></div>
            
            {/* Custom animated lines */}
            <div className="relative w-5 h-4 flex flex-col justify-between items-center overflow-hidden">
              <span className={`block h-[2px] w-full transform transition-all duration-300 origin-left ${mobileMenuOpen ? 'rotate-45 translate-x-[2px] -translate-y-[1px]' : ''} ${isScrolled || mobileMenuOpen ? 'bg-black' : 'bg-white'}`}></span>
              <span className={`block h-[2px] w-full transform transition-all duration-300 ${mobileMenuOpen ? 'opacity-0 translate-x-4' : 'opacity-100'} ${isScrolled || mobileMenuOpen ? 'bg-black' : 'bg-white'}`}></span>
              <span className={`block h-[2px] w-full transform transition-all duration-300 origin-left ${mobileMenuOpen ? '-rotate-45 translate-x-[2px] translate-y-[1px]' : ''} ${isScrolled || mobileMenuOpen ? 'bg-black' : 'bg-white'}`}></span>
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ height: 0 }}
            animate={{ height: "100vh" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center space-y-8 md:hidden overflow-hidden origin-top"
          >
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex flex-col items-center space-y-8"
            >
              {['Services', 'About', 'Work', 'Pricing', 'Process', 'Team'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`} 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-3xl font-display text-black hover:text-gold transition-colors"
                >
                  {item}
                </a>
              ))}
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsOrderModalOpen(true);
                }}
                className="relative overflow-hidden bg-gold text-black px-8 py-4 font-bold tracking-widest uppercase mt-4 group rounded-full"
              >
                <span className="relative z-10 group-hover:text-white transition-colors duration-500">Order Now</span>
                <div className="absolute inset-0 bg-black translate-y-[100%] group-hover:translate-y-[0] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-0"></div>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative min-h-[100svh] flex items-center pt-20 pb-16 overflow-hidden bg-black">
        <motion.div 
          style={{ y: heroY }}
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: EASE }}
          className="absolute inset-0 z-0 origin-center"
        >
          <img 
            src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1920&auto=format&fit=crop" 
            alt="High-end dress and embroidery" 
            className="w-full h-full object-cover opacity-80"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-black/90"></div>
        </motion.div>
        
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.3 }
            }
          }}
          className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full md:mb-20 text-center mt-12 md:mt-20"
        >
          <div className="overflow-hidden flex justify-center mb-6">
            <motion.h1 
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } }
              }}
              className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[6.5rem] text-white font-bold leading-[1.1] tracking-tight"
            >
              Thread Aura Studio<span className="text-gold">.</span><br />
              <span className="text-3xl sm:text-4xl md:text-6xl text-white/80 font-medium">Digitizing Experts</span>
            </motion.h1>
          </div>
          
          <motion.p 
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } }
            }}
            className="text-base sm:text-lg md:text-2xl text-white/80 max-w-2xl mx-auto mb-8 md:mb-10 font-light"
          >
            Custom embroidery designs crafted with precision and creativity. Bringing your brand's vision to life through premium threads.
          </motion.p>
          
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.95 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: EASE } }
            }}
          >
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(255,215,0,0.6)" }}
              onClick={() => setIsOrderModalOpen(true)}
              className="relative overflow-hidden bg-gold text-black px-8 py-4 md:px-12 md:py-5 font-bold tracking-widest uppercase flex items-center mx-auto transition-all rounded-full group"
            >
              <span className="relative z-10 flex items-center text-xs md:text-sm">
                Start Your Project
                <ArrowRight className="ml-3 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-2 transition-transform duration-500" />
              </span>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Marquee Banner */}
        <div className="absolute bottom-0 left-0 w-full bg-gold py-3 overflow-hidden z-20 flex">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
            className="flex whitespace-nowrap"
          >
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex whitespace-nowrap text-black font-medium tracking-widest uppercase text-sm">
                <span className="mx-8 flex items-center">Embroidery Digitizing <Star className="w-3 h-3 ml-8 fill-black" /></span>
                <span className="mx-8 flex items-center">3D Puff Digitizing <Star className="w-3 h-3 ml-8 fill-black" /></span>
                <span className="mx-8 flex items-center">Applique <Star className="w-3 h-3 ml-8 fill-black" /></span>
                <span className="mx-8 flex items-center">Vector Tracing <Star className="w-3 h-3 ml-8 fill-black" /></span>
                <span className="mx-8 flex items-center">DTF PNGs <Star className="w-3 h-3 ml-8 fill-black" /></span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center md:text-left">
            {[
              { value: "50", suffix: "K+", label: "Garments Stitched" },
              { value: "99", suffix: "%", label: "Client Satisfaction" },
              { value: "500", suffix: "+", label: "Thread Colors" },
              { value: "24", suffix: "Hr", label: "Digitizing Time" }
            ].map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.8, delay: idx * 0.1, ease: EASE }}
                className="space-y-4 relative group cursor-default"
              >
                <div className="absolute -left-4 top-0 w-1 h-0 bg-gold group-hover:h-full transition-all duration-700 ease-out hidden md:block"></div>
                <div className="font-display text-5xl md:text-6xl font-bold flex items-baseline justify-center md:justify-start">
                  <span>{stat.value}</span>
                  <span className="text-gold text-4xl">{stat.suffix}</span>
                </div>
                <div className="text-sm font-bold tracking-widest uppercase text-gray-400 group-hover:text-black transition-colors duration-500">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Specializations - Vector & Digitizing */}
      <section className="py-24 bg-[#0a0a0a] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-gold/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <span className="text-gold font-bold tracking-widest uppercase text-sm mb-4 block">Our Expertise</span>
              <h2 className="font-display text-4xl md:text-6xl font-bold mb-6">Digitizing &<br />Vector Art<span className="text-gold">.</span></h2>
              <p className="text-white/60 text-lg md:text-xl font-light">Transforming your logos, artwork, and sketches into high-quality machine-ready embroidery files and crisp vectors.</p>
            </div>
            <motion.button 
              whileHover={{ scale: 1.08, boxShadow: "0px 0px 20px rgba(255,215,0,0.6)" }}
              onClick={() => setIsOrderModalOpen(true)}
              className="border border-white/20 hover:border-gold hover:text-gold px-8 py-3 text-sm font-bold tracking-widest uppercase transition-all duration-300 rounded-xl"
            >
              Get a Quote
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="bg-white/5 p-10 md:p-16 border border-white/10 hover:border-white/20 transition-all group rounded-2xl"
            >
              <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                <Scissors className="w-8 h-8 text-gold" />
              </div>
              <h3 className="font-display text-3xl font-bold mb-4">Embroidery Digitizing</h3>
              <p className="text-white/60 leading-relaxed mb-8">Professional conversion of your designs into flawless embroidery machine formats. We account for push-and-pull compensation, underlay stitching, and thread density to ensure perfect results on any fabric.</p>
              <ul className="space-y-3">
                {['Left Chest Logos', 'Jacket Backs', '3D Puff Digitizing', 'Applique Digitizing'].map(item => (
                  <li key={item} className="flex items-center text-sm font-medium tracking-wide">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold mr-3"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="bg-white/5 p-10 md:p-16 border border-white/10 hover:border-white/20 transition-all group rounded-2xl"
            >
              <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                <Zap className="w-8 h-8 text-gold" />
              </div>
              <h3 className="font-display text-3xl font-bold mb-4">Vector Art Conversion</h3>
              <p className="text-white/60 leading-relaxed mb-8">Raster to vector tracing services. Send us your blurry, pixelated logos and we will redraw them by hand into crisp, scalable SVG, AI, and EPS files suitable for large format printing.</p>
              <ul className="space-y-3">
                {['Hand-Drawn Vectoring', 'Color Separations', 'Line Art Conversion', 'Print-Ready Files'].map(item => (
                  <li key={item} className="flex items-center text-sm font-medium tracking-wide">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold mr-3"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-20">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">Why Choose Us<span className="text-gold">.</span></h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">We don't just stitch. We meticulously engineer your brand's presence with rapid turnaround times and unbreakable quality.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: Clock, title: "Super Fast Turnaround", desc: "Get your standard digitized files in as little as 12 to 24 hours. Rush options available for urgent drops." },
              { icon: ShieldCheck, title: "Zero Error Guarantee", desc: "Our two-step QA system guarantees your files will run smooth without thread breaks or puckering." },
              { icon: Award, title: "Unlimited Edit Support", desc: "We provide free edits and adjustments until you are 100% satisfied with your final sew-out." }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.8, delay: idx * 0.15, ease: EASE }}
                className="text-center group bg-gray-50/50 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow"
              >
                <div className="w-20 h-20 mx-auto rounded-full bg-gray-50 flex items-center justify-center mb-6 border border-gray-100 group-hover:bg-gold transition-colors duration-500 group-hover:scale-110">
                  <feature.icon className="w-8 h-8 text-black" />
                </div>
                <h4 className="font-display text-2xl font-bold mb-4">{feature.title}</h4>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Client Reviews Section */}
      <Testimonial />

      {/* Services Section */}
      <section id="services" className="py-24 md:py-32 bg-[#0a0a0a] text-white overflow-hidden relative border-y border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/10 via-[#0a0a0a] to-[#0a0a0a] z-0 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="text-left mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <span className="text-gold tracking-widest text-sm font-bold uppercase mb-4 block">Our Capabilities</span>
              <h2 className="font-display text-4xl md:text-6xl font-bold leading-[1.1] tracking-tight">
                Precision Engineering<br/>For Your Apparel<span className="text-gold">.</span>
              </h2>
            </div>
            <p className="text-gray-400 max-w-sm text-lg leading-relaxed">
              We leverage advanced software and meticulous craftsmanship to ensure every vector line and stitch path translates flawlessly to physical reality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {servicesList.map((service, idx) => (
              <motion.div 
                key={service.id}
                className="group relative flex flex-col justify-end bg-black/50 rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/10 hover:border-gold/50 transition-colors duration-700 cursor-pointer h-[450px] md:h-[550px]"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: idx * 0.15, ease: EASE }}
                onClick={() => setSelectedService(service)}
              >
                {/* Background Image Setup */}
                <div className="absolute inset-0 z-0">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110 opacity-50 group-hover:opacity-70" 
                    referrerPolicy="no-referrer" 
                  />
                  {/* Dynamic Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-90 transition-opacity duration-700 group-hover:opacity-100" />
                </div>

                <div className="relative z-10 p-8 md:p-12 transform transition-transform duration-700 ease-out md:translate-y-12 group-hover:translate-y-0">
                  <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 group-hover:bg-gold transition-colors duration-500 shadow-xl border border-white/10">
                    <service.icon className="w-6 h-6 text-white group-hover:text-black transition-colors" />
                  </div>
                  
                  <h3 className="font-display text-3xl md:text-4xl font-bold mb-4">{service.title}</h3>
                  
                  {/* Sliding Description */}
                  <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-700 ease-out hidden md:grid">
                    <div className="overflow-hidden">
                      <p className="text-gray-300 md:mb-6 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100 pb-2">
                        {service.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Mobile Description (Always visible on mobile) */}
                  <p className="text-gray-300 mb-6 leading-relaxed block md:hidden">
                    {service.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                      {service.details.slice(0, 3).map((detail, i) => (
                        <span key={i} className="text-[11px] font-mono tracking-wider uppercase text-white/80 bg-white/10 rounded-full px-4 py-2 border border-white/10 backdrop-blur-sm">
                          {detail}
                        </span>
                      ))}
                  </div>

                  <div className="flex items-center text-gold font-bold text-sm tracking-widest uppercase opacity-100 md:opacity-0 group-hover:opacity-100 transition-all duration-700 md:translate-x-[-20px] group-hover:translate-x-0">
                      Explore Service <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-2 transition-transform duration-500" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 md:py-32 bg-white text-black overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Top Part */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 mb-16 md:mb-20">
            <div className="md:col-span-3">
              <span className="text-sm font-bold tracking-widest uppercase">/ About</span>
            </div>
            <div className="md:col-span-9">
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: EASE }}
                className="font-display text-4xl md:text-5xl lg:text-5xl font-bold leading-tight mb-8 tracking-tight"
              >
                Our technology and artisans analyze subtle design cues, fabric layers, and visual signatures from your artwork to generate a personalized embroidery masterpiece just for you.
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, delay: 0.2, ease: EASE }}
                className="text-gray-500 text-lg max-w-3xl leading-relaxed font-medium"
              >
                Think of it as a mirror for your brand's inner identity—revealing the colors, textures, and energy you project into the world. Whether you're here for corporate identity, spiritual curiosity, or bespoke character designs, our mission is simple: to help you see your apparel in a whole new light.
              </motion.p>
            </div>
          </div>

          {/* Bottom Part - 3 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-auto md:h-[600px]">
            {/* Card 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: EASE }}
              className="relative h-[400px] md:h-full overflow-hidden bg-gray-100 group"
            >
              <img 
                src="https://images.unsplash.com/photo-1584285408990-8e104db809f6?q=80&w=800&auto=format&fit=crop" 
                alt="Embroidery Craft"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"></div>
              <div className="absolute top-8 left-8 text-white text-2xl font-bold">Bespoke Design</div>
              <div className="absolute bottom-8 left-8 right-8 text-white/90 font-medium leading-relaxed">Bespoke embroidery indicates attention to detail, especially for intricate character art and high-end dresses.</div>
            </motion.div>

            {/* Card 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.1, ease: EASE }}
              className="relative h-[400px] md:h-full overflow-hidden bg-gray-100 group"
            >
              <img 
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop" 
                alt="Fabric Selection"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"></div>
              <div className="absolute top-8 left-8 text-white text-2xl font-bold">Premium Fabric</div>
              <div className="absolute bottom-8 left-8 right-8 text-white/90 font-medium leading-relaxed">Apparel made with premium materials are often highly perceptive, able to pick up on unseen durability, comfort, or future possibilities.</div>
            </motion.div>

            {/* Card 3 - Solid Black CTA */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.2, ease: EASE }}
              className="bg-black text-white p-12 flex flex-col justify-end h-[400px] md:h-full group"
            >
              <h3 className="text-3xl md:text-4xl font-bold mb-8 leading-tight tracking-tight">What style are you creating today?</h3>
              <motion.button 
                whileHover={{ scale: 1.08, boxShadow: "0px 0px 20px rgba(255,215,0,0.6)" }}
                onClick={() => setIsOrderModalOpen(true)}
                className="bg-white text-black px-8 py-3 font-semibold text-sm tracking-widest hover:bg-gold transition-colors duration-300 self-start rounded-full"
              >
                Upload design
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="work" className="py-20 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
            <div className="mb-8 md:mb-0">
              <h2 className="font-display text-4xl md:text-5xl font-bold">Selected Work<span className="text-gold">.</span></h2>
              <p className="text-gray-500 mt-4 max-w-lg">Explore our recent projects highlighting our dedication to detail and luxury.</p>
            </div>
            
            <div className="flex flex-wrap gap-4 mt-6 md:mt-0">
              {['All', 'Apparel', 'Hats', 'Patches', 'DTF Patches', '3D Puff'].map(filter => (
                <button 
                  key={filter}
                  onClick={() => setWorkFilter(filter)}
                  className={`text-sm tracking-wider uppercase font-medium pb-1 border-b-2 transition-colors ${
                    workFilter === filter ? 'border-gold text-black' : 'border-transparent text-gray-400 hover:text-black'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
          
          <motion.div layout className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[300px]">
            <AnimatePresence>
              {portfolioItems.filter(item => workFilter === 'All' || item.category === workFilter).map((item, idx) => (
                <motion.div 
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className={`group cursor-pointer relative overflow-hidden rounded-xl shadow-sm hover:shadow-xl ${
                    idx === 0 || idx === 5 || idx === 8 ? 'md:col-span-1 sm:col-span-2 md:row-span-2' : 'md:col-span-1 sm:col-span-1 md:row-span-1'
                  }`}
                >
                  <img 
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                    <h4 className="font-display text-2xl md:text-3xl text-white mb-2 drop-shadow-md">{item.title}</h4>
                    <p className="text-gold text-xs font-bold uppercase tracking-widest">{item.category}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-gray-50 rounded-full blur-[100px] pointer-events-none translate-x-1/2 -translate-y-1/4"></div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center mb-16">
            <span className="text-gold tracking-widest text-sm font-bold uppercase mb-4 block">Transparent Pricing</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Straightforward Rates<span className="text-gold">.</span></h2>
            <p className="text-gray-500 max-w-xl mx-auto">Industry-leading digitizing and vector tracing at competitive prices. No hidden fees. Flat rate estimation available.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            
            {/* Pricing Card 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: EASE }}
              className="bg-white border rounded-[2rem] p-8 md:p-10 shadow-sm hover:shadow-xl hover:border-gold transition-all duration-500 group"
            >
              <div className="mb-6">
                <h3 className="font-display text-2xl font-bold text-black mb-2">Hat / Left Chest</h3>
                <p className="text-gray-500 text-sm">Perfect for polos, caps, and small logos.</p>
              </div>
              <div className="flex items-baseline gap-2 mb-8 border-b border-gray-100 pb-8">
                <span className="text-5xl font-display font-bold">$10</span>
                <span className="text-gray-400 font-medium">/ design</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start text-sm text-gray-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 mr-3 flex-shrink-0"></div>
                  Normal to average detailed designs
                </li>
                <li className="flex items-start text-sm text-gray-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-1.5 mr-3 flex-shrink-0 group-hover:bg-gold transition-colors"></div>
                  Complex/High-detail: <strong className="ml-1">$15</strong>
                </li>
                <li className="flex items-start text-sm text-gray-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-1.5 mr-3 flex-shrink-0 group-hover:bg-gold transition-colors"></div>
                  Any machine format (DST, PES, etc.)
                </li>
                <li className="flex items-start text-sm text-gray-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-1.5 mr-3 flex-shrink-0 group-hover:bg-gold transition-colors"></div>
                  Includes 3D Puff calculation
                </li>
              </ul>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                onClick={() => setIsOrderModalOpen(true)}
                className="w-full bg-gray-50 text-black py-4 font-bold tracking-widest uppercase rounded-xl group-hover:bg-black group-hover:text-white transition-colors duration-300"
              >
                Order Now
              </motion.button>
            </motion.div>

            {/* Pricing Card 2 - Highlighted */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
              className="bg-black text-white rounded-[2rem] p-8 md:p-10 shadow-2xl shadow-black/20 hover:shadow-gold/10 transition-all duration-500 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 bg-gold text-black text-[10px] font-bold tracking-widest uppercase px-4 py-1 rounded-bl-xl z-10">Popular</div>
              
              <div className="mb-6 relative z-10">
                <h3 className="font-display text-2xl font-bold mb-2">Front Chest / Vector</h3>
                <p className="text-gray-400 text-sm">Standard apparel, hoodies, vector art.</p>
              </div>
              <div className="flex items-baseline gap-2 mb-8 border-b border-white/10 pb-8 relative z-10">
                <span className="text-5xl font-display font-bold">$15<span className="text-2xl text-gray-500">+</span></span>
                <span className="text-gray-500 font-medium whitespace-nowrap">/ est.</span>
              </div>
              <ul className="space-y-4 mb-8 relative z-10">
                <li className="flex items-start text-sm text-white/80">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 mr-3 flex-shrink-0"></div>
                  Vector Tracing starts at <strong>$15</strong>
                </li>
                <li className="flex items-start text-sm text-white/80">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/30 mt-1.5 mr-3 flex-shrink-0 group-hover:bg-gold transition-colors"></div>
                  Full Chest Digitizing: <strong>$15 - $25</strong>
                </li>
                <li className="flex items-start text-sm text-white/80">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/30 mt-1.5 mr-3 flex-shrink-0 group-hover:bg-gold transition-colors"></div>
                  Includes custom sizing
                </li>
                <li className="flex items-start text-sm text-white/80">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/30 mt-1.5 mr-3 flex-shrink-0 group-hover:bg-gold transition-colors"></div>
                  Vector outputs: SVG, EPS, PDF, AI, DTF PNG
                </li>
              </ul>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                onClick={() => setIsOrderModalOpen(true)}
                className="w-full bg-gold text-black py-4 font-bold tracking-widest uppercase rounded-xl relative z-10"
              >
                Order Now
              </motion.button>

              <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            </motion.div>

            {/* Pricing Card 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
              className="bg-white border rounded-[2rem] p-8 md:p-10 shadow-sm hover:shadow-xl hover:border-gold transition-all duration-500 group"
            >
              <div className="mb-6">
                <h3 className="font-display text-2xl font-bold text-black mb-2">Jacket Back / Patch</h3>
                <p className="text-gray-500 text-sm">Large format, highly dense stitch files.</p>
              </div>
              <div className="flex items-baseline gap-2 mb-8 border-b border-gray-100 pb-8">
                <span className="text-5xl font-display font-bold">$25<span className="text-2xl text-gray-300">-</span><span className="text-4xl text-gray-400">50</span></span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start text-sm text-gray-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 mr-3 flex-shrink-0"></div>
                  Complete full-back mapping
                </li>
                <li className="flex items-start text-sm text-gray-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-1.5 mr-3 flex-shrink-0 group-hover:bg-gold transition-colors"></div>
                  Custom Applique / Diamond Stitch
                </li>
                <li className="flex items-start text-sm text-gray-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-1.5 mr-3 flex-shrink-0 group-hover:bg-gold transition-colors"></div>
                  High stitch-count optimization
                </li>
                <li className="flex items-start text-sm text-gray-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-1.5 mr-3 flex-shrink-0 group-hover:bg-gold transition-colors"></div>
                  Push/pull compensation checks
                </li>
              </ul>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                onClick={() => setIsOrderModalOpen(true)}
                className="w-full bg-gray-50 text-black py-4 font-bold tracking-widest uppercase rounded-xl group-hover:bg-black group-hover:text-white transition-colors duration-300"
              >
                Order Now
              </motion.button>
            </motion.div>
          </div>

          {/* Note */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-3 bg-gray-50 px-6 py-3 rounded-full border border-gray-200">
              <ShieldCheck className="w-4 h-4 text-gold" />
              <p className="text-xs font-medium text-gray-500 uppercase tracking-widest drop-shadow-sm">Note: Final pricing may vary based on design complexity.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-32 bg-black text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-24">
            <h2 className="font-display text-5xl md:text-6xl font-bold mb-6">Our Process<span className="text-gold">.</span></h2>
            <p className="text-white/60 text-xl font-light">From concept to delivery, our workflow is seamless.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
            {/* Animated Line */}
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, ease: EASE }}
              className="hidden md:block absolute top-[40px] left-0 right-0 h-[1px] bg-gradient-to-r from-black via-gold to-black origin-left z-0"
            ></motion.div>
            
            {[
              { num: "01", title: "Submit & Consult", desc: "Upload artwork, define scale—big or small—and consult with our artisans." },
              { num: "02", title: "Design & Digitize", desc: "We convert your vision into flawless thread maps or print vectors." },
              { num: "03", title: "Craft & Produce", desc: "Our top-tier industry machinery brings your exact design to life." },
              { num: "04", title: "Inspect & Dispatch", desc: "Rigorous quality checks before it safely and elegantly arrives to you." }
            ].map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: idx * 0.2, ease: EASE }}
                className="relative z-10 flex flex-col group p-8 border border-white/5 bg-black/80 backdrop-blur-md hover:border-gold/50 transition-colors duration-500"
              >
                <div className="font-display text-6xl text-white/5 group-hover:text-gold transition-colors duration-500 mb-6 font-bold">{step.num}</div>
                <h4 className="font-display text-2xl mb-4">{step.title}</h4>
                <p className="text-white/50 leading-relaxed font-light">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-24 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <span className="text-gold tracking-widest text-sm font-bold uppercase mb-4 block">Our Experts</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold">The Crafters<span className="text-gold">.</span></h2>
            </div>
            <p className="text-gray-500 max-w-sm">
              The master artisans and digital engineers behind our flawless embroidery translations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { name: "Eleanor Wright", role: "Master Tailor", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop" },
              { name: "James Holden", role: "Lead Digitizer", img: "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=600&auto=format&fit=crop" },
              { name: "Sophia Chen", role: "Vector Specialist", img: "https://images.unsplash.com/photo-1593104547469-64ef24147775?q=80&w=600&auto=format&fit=crop" },
              { name: "Marcus Reid", role: "Quality Assurance", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop" }
            ].map((member, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: idx * 0.15, ease: EASE }}
                className="group relative overflow-hidden rounded-[2rem] bg-gray-100 aspect-[3/4] cursor-pointer"
              >
                <img 
                  src={member.img} 
                  alt={member.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 opacity-70 group-hover:opacity-90"></div>
                
                <div className="absolute bottom-0 left-0 right-0 p-8 transform transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
                  <div className="w-10 h-1 bg-gold mb-4 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 delay-100"></div>
                  <h4 className="font-display text-2xl font-bold text-white mb-1 group-hover:text-gold transition-colors">{member.name}</h4>
                  <p className="text-white/70 font-mono text-[10px] uppercase tracking-widest">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Impact / Stats Section (Replacing Old Testimonials) */}
      <section className="py-24 bg-[#0a0a0a] text-white border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: EASE }}
            >
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Architecting The Standard For<br/><span className="text-gold">Apparel Production.</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                Numbers speak louder than words. We've optimized millions of stitch paths across the globe, ensuring brands push their creative limits without sacrificing production integrity.
              </p>
              <div className="flex gap-4">
                 {/* Decorative graphic */}
                 <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center relative overflow-hidden group">
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="w-full h-full border-r-2 border-gold absolute rounded-full"></motion.div>
                    <Award className="w-6 h-6 text-gold relative z-10" />
                 </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-2 gap-4 md:gap-8">
              {[
                { metric: "15K+", label: "Designs Digitized" },
                { metric: "3.2M", label: "Stitches Rendered" },
                { metric: "99%", label: "First-Run Success" },
                { metric: "12hr", label: "Average Turnaround" }
              ].map((stat, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1, ease: EASE }}
                  className="bg-white/5 border border-white/10 rounded-[2rem] p-8 md:p-10 flex flex-col justify-center items-start group hover:bg-gold hover:text-black transition-colors duration-500"
                >
                  <div className="font-display text-4xl md:text-5xl font-bold text-white group-hover:text-black mb-2 transition-colors">{stat.metric}</div>
                  <div className="text-gray-500 font-mono text-[11px] uppercase tracking-widest group-hover:text-black/70 transition-colors">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modern Contact / CTA Section */}
      <section className="py-32 md:py-48 bg-black text-center relative overflow-hidden border-t border-white/5">
        <motion.div 
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          {/* Working Unsplash dark metallic/fabric background */}
          <img 
            src="https://images.unsplash.com/photo-1605289982774-9a6fef564df8?q=80&w=2000&auto=format&fit=crop" 
            alt="Atmospheric Background" 
            className="w-full h-full object-cover opacity-30"
            referrerPolicy="no-referrer"
          />
          {/* Radial mask to focus center */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#000000_100%)]"></div>
        </motion.div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE }}
            className="w-20 h-20 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center mb-10 text-gold shadow-[0px_0px_50px_rgba(255,215,0,0.2)]"
          >
            <Zap className="w-8 h-8" />
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1, ease: EASE }}
            className="font-display text-5xl md:text-7xl lg:text-8xl text-white font-bold mb-8 leading-[0.95]"
          >
            Thread Your<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-yellow-600">Masterpiece.</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: EASE }}
            className="text-gray-400 mb-12 text-lg md:text-xl max-w-2xl mx-auto font-light"
          >
            Upload your artwork today. Our algorithms and artisans will prepare your files for flawless, continuous-run production.
          </motion.p>
          
          <motion.button 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3, ease: EASE }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOrderModalOpen(true)}
            className="relative overflow-hidden bg-gold text-black px-12 py-5 rounded-full font-bold tracking-widest uppercase inline-flex items-center group shadow-[0px_0px_30px_rgba(255,215,0,0.3)] hover:shadow-[0px_0px_50px_rgba(255,215,0,0.5)] transition-shadow duration-500"
          >
            <span className="relative z-10 font-mono text-sm">Start The Process</span>
            <ArrowRight className="w-4 h-4 ml-3 relative z-10 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </section>

      {/* NEW FOOTER */}
      <footer className="bg-white relative z-20 overflow-hidden">
        
        {/* Animated Background Steps */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`step-${i}`}
              className="absolute bg-gold/10 bottom-0"
              style={{ 
                left: `${i * 16.666}%`, 
                width: '16.666%'
              }}
              animate={{ 
                height: ["10%", "60%", "10%"],
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity, 
                delay: i * 0.5, 
                ease: "easeInOut" 
              }}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-white/0 via-white/50 to-white z-10" />
        </div>

        {/* Top Main Section */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-32 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
            
            {/* Logo & Info */}
            <div className="md:col-span-4 lg:col-span-4 space-y-8 pr-0 md:pr-12">
              <h2 className="font-display text-6xl md:text-7xl font-bold tracking-tight leading-[0.9] text-black">
                Thread Aura<br/>Studio<span className="text-gold">.</span>
              </h2>
              <div className="space-y-4">
                <div className="bg-black text-white text-xs font-bold tracking-widest uppercase inline-block px-3 py-1">CONTACT US</div>
                <p className="text-black text-lg">123 Stitch Avenue, NY<br/>Creative District, 10001</p>
                <div className="flex gap-4 pt-2">
                  <a href="#" className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gold hover:border-gold transition-colors"><Facebook className="w-5 h-5 text-black"/></a>
                  <a href="#" className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gold hover:border-gold transition-colors"><Instagram className="w-5 h-5 text-black"/></a>
                </div>
                <p className="font-medium text-black mt-2">hello@threadaurastudio.com</p>
              </div>
            </div>

            {/* Company Links */}
            <div className="md:col-span-2 lg:col-span-2">
               {/* Desktop Title */}
               <h3 className="hidden md:block font-bold tracking-widest uppercase text-sm mb-6 text-black">Company</h3>
               {/* Mobile Accordion Toggle */}
               <div 
                 className="md:hidden flex justify-between items-center py-4 border-b border-gray-100 cursor-pointer"
                 onClick={() => setFooterMenuOpen(p => ({...p, company: !p.company}))}
               >
                 <h3 className="font-bold tracking-widest uppercase text-sm text-black">Company</h3>
                 <ChevronDown className={`w-5 h-5 transition-transform text-black ${footerMenuOpen.company ? 'rotate-180' : ''}`}/>
               </div>
               {/* Links */}
               <ul className={`space-y-4 pt-4 md:pt-0 overflow-hidden text-gray-500 font-medium ${footerMenuOpen.company ? 'block' : 'hidden md:block'}`}>
                 <li><a href="#about" className="hover:text-gold transition-colors block hover:translate-x-1 duration-300">About</a></li>
                 <li><a href="#work" className="hover:text-gold transition-colors block hover:translate-x-1 duration-300">Portfolio</a></li>
                 <li><a href="#process" className="hover:text-gold transition-colors block hover:translate-x-1 duration-300">Process</a></li>
                 <li><a href="#team" className="hover:text-gold transition-colors block hover:translate-x-1 duration-300">Team</a></li>
                 <li><button onClick={() => setPolicyType('privacy')} className="hover:text-gold transition-colors block hover:translate-x-1 duration-300">Privacy Policy</button></li>
               </ul>
            </div>

            {/* Shop/Services Links */}
            <div className="md:col-span-2 lg:col-span-2">
               <h3 className="hidden md:block font-bold tracking-widest uppercase text-sm mb-6 text-black">Services</h3>
               <div 
                 className="md:hidden flex justify-between items-center py-4 border-b border-gray-100 cursor-pointer"
                 onClick={() => setFooterMenuOpen(p => ({...p, shop: !p.shop}))}
               >
                 <h3 className="font-bold tracking-widest uppercase text-sm text-black">Services</h3>
                 <ChevronDown className={`w-5 h-5 transition-transform text-black ${footerMenuOpen.shop ? 'rotate-180' : ''}`}/>
               </div>
               <ul className={`space-y-4 pt-4 md:pt-0 overflow-hidden text-gray-500 font-medium ${footerMenuOpen.shop ? 'block' : 'hidden md:block'}`}>
                 <li><a href="#services" className="hover:text-gold transition-colors block hover:translate-x-1 duration-300" onClick={() => setSelectedService(servicesList[0])}>Embroidery Digitizing</a></li>
                 <li><a href="#services" className="hover:text-gold transition-colors block hover:translate-x-1 duration-300" onClick={() => setSelectedService(servicesList[1])}>3D Puff Experts</a></li>
                 <li><a href="#services" className="hover:text-gold transition-colors block hover:translate-x-1 duration-300" onClick={() => setSelectedService(servicesList[2])}>Applique Paths</a></li>
                 <li><a href="#services" className="hover:text-gold transition-colors block hover:translate-x-1 duration-300" onClick={() => setSelectedService(servicesList[3])}>Vector Tracing</a></li>
                 <li><a href="#services" className="hover:text-gold transition-colors block hover:translate-x-1 duration-300" onClick={() => setSelectedService(servicesList[3])}>DTF PNGs</a></li>
               </ul>
            </div>

            {/* Spotify Card Replacement (Trending Widget) */}
            <div className="md:col-span-4 lg:col-span-4 mt-8 md:mt-0">
               <div className="bg-black text-white p-6 md:p-8 rounded-2xl w-full max-w-sm ml-auto shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gold/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-gold/40 transition-colors duration-700"></div>
                  
                  <div className="flex items-start gap-4 mb-8 relative z-10">
                     <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                       <img src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=200&auto=format&fit=crop" className="w-full h-full object-cover" alt="Collection" />
                     </div>
                     <div className="flex-1">
                       <div className="flex justify-between items-start">
                         <div>
                           <h4 className="font-display font-bold text-xl leading-none mb-1">FW 2026 Collection</h4>
                           <p className="text-gray-400 text-sm">Thread Aura Studio</p>
                         </div>
                         <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm"><Star className="w-4 h-4 text-gold fill-gold"/></div>
                       </div>
                       <div className="flex items-center gap-2 mt-3 cursor-pointer group/save pb-1">
                         <div className="w-5 h-5 rounded-full border border-gray-600 flex items-center justify-center text-[10px] group-hover/save:border-gold transition-colors"><Star className="w-3 h-3 text-white group-hover/save:text-gold transition-colors"/></div>
                         <span className="text-xs text-gray-300 font-medium group-hover/save:text-white transition-colors">Save to Inspiration</span>
                       </div>
                     </div>
                  </div>

                  <div className="space-y-4 relative z-10 border-t border-white/10 pt-6">
                    <div className="flex justify-between items-center group/track hover:bg-white/5 p-2 rounded -mx-2 transition-colors cursor-pointer" onClick={() => setIsOrderModalOpen(true)}>
                      <div className="flex items-center gap-3">
                         <span className="text-gray-500 text-sm w-4 text-right">1</span>
                         <div>
                           <p className="text-sm font-medium text-white group-hover/track:text-gold transition-colors">Varsity Letterman Left Chest</p>
                           <p className="text-xs text-gray-500">Digitizing // 45k Stitches</p>
                         </div>
                      </div>
                      <span className="text-xs text-gray-400 font-mono">04:12</span>
                    </div>
                    <div className="flex justify-between items-center group/track hover:bg-white/5 p-2 rounded -mx-2 transition-colors cursor-pointer" onClick={() => setIsOrderModalOpen(true)}>
                      <div className="flex items-center gap-3">
                         <span className="text-gray-500 text-sm w-4 text-right">2</span>
                         <div>
                           <p className="text-sm font-medium text-white group-hover/track:text-gold transition-colors">Corporate Logo Recreation</p>
                           <p className="text-xs text-gray-500">Vector Tracing // EPS</p>
                         </div>
                      </div>
                      <span className="text-xs text-gray-400 font-mono">02:39</span>
                    </div>
                    <button onClick={() => setIsOrderModalOpen(true)} className="w-full mt-6 bg-white text-black py-4 rounded-full font-bold text-sm tracking-widest uppercase hover:bg-gold hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                       <Zap className="w-4 h-4 text-black"/> Start Order
                    </button>
                  </div>
               </div>
            </div>

          </div>
        </div>

        {/* Instagram Marquee Strip */}
        <div className="bg-gold py-6 md:py-8 overflow-hidden relative border-y border-black">
          <div className="max-w-[100vw] flex items-center w-full">
             
             {/* Static Left Graphic Block */}
             <div className="flex items-center gap-4 pl-6 md:pl-12 pr-4 md:pr-8 flex-shrink-0 relative z-10 bg-gold">
                <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center relative bg-black rounded-xl border-4 border-white transform -rotate-6">
                   <Shirt className="w-8 h-8 md:w-10 md:h-10 text-white" />
                </div>
                
                {/* Speech Bubble */}
                <div className="bg-white rounded-[2rem] px-6 py-4 md:px-8 md:py-5 relative shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-black hidden sm:block">
                    <span className="font-bold tracking-widest uppercase text-[10px] md:text-xs text-black text-center block leading-[1.6]">Follow us<br/>on the 'gram</span>
                    {/* Speech Bubble Tail */}
                    <svg className="absolute -left-[14px] top-1/2 -translate-y-1/2 w-6 h-6 rotate-90" viewBox="0 0 24 24" fill="white" stroke="black" strokeWidth="2" strokeLinejoin="round"><path d="M12 24 L0 0 L24 0 Z"/></svg>
                    <div className="absolute -left-[3px] top-1/2 -translate-y-1/2 w-[6px] h-[16px] bg-white"></div>
                </div>
             </div>

             {/* Scrolling Images */}
             <div className="flex overflow-x-auto no-scrollbar gap-2 md:gap-4 flex-1 pr-6 md:pr-12 snap-x snap-mandatory">
                {[...portfolioItems, ...portfolioItems].map((item, i) => (
                   <a key={i} href="#" className="flex-shrink-0 snap-start group relative block overflow-hidden rounded-md border-2 border-transparent hover:border-black transition-colors w-32 h-32 md:w-48 md:h-48">
                      <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Instagram Post" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                         <Instagram className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 duration-300"/>
                      </div>
                   </a>
                ))}
             </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="bg-[#302B27] md:bg-black text-[#A09990] md:text-gray-400 py-6 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center text-[10px] md:text-[11px] tracking-widest uppercase font-mono border-t border-black/10 md:border-transparent">
           <p>© {new Date().getFullYear()} Thread Aura Studio</p>
           <p className="mt-4 md:mt-0 hover:text-white transition-colors cursor-pointer">Site Credits</p>
        </div>
      </footer>

      {/* Modals & Chatbot */}
      <OrderModal isOpen={isOrderModalOpen} onClose={() => setIsOrderModalOpen(false)} />
      <ServiceModal isOpen={!!selectedService} onClose={() => setSelectedService(null)} service={selectedService} />
      <PolicyModal isOpen={!!policyType} onClose={() => setPolicyType(null)} type={policyType} />
      <ChatBot />

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/15551234567" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 md:bottom-10 md:left-10 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center group"
      >
        <MessageCircle className="w-8 h-8" />
        <span className="absolute left-full ml-4 bg-black text-white text-sm font-bold py-2 px-4 rounded-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          Chat on WhatsApp
        </span>
      </a>
    </div>
  );
}
