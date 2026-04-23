"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "motion/react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const testimonials = [
  {
    quote: "Thread Aura Studio transformed our apparel line. The 3D Puff digitizing is flawless.",
    author: "Sarah Chen",
    role: "Production Manager",
    company: "Urban Threads",
  },
  {
    quote: "The most elegant digitizing solution we've ever implemented. Zero thread breaks.",
    author: "Marcus Webb",
    role: "Creative Lead",
    company: "Vercel Apparel",
  },
  {
    quote: "Pure craftsmanship in every single detail of their vector tracing.",
    author: "Elena Frost",
    role: "Head of Product",
    company: "Stripe Gear",
  },
]

export function Testimonial() {
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Mouse position for magnetic effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 200 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  // Transform for parallax on the large number
  const numberX = useTransform(x, [-200, 200], [-20, 20])
  const numberY = useTransform(y, [-200, 200], [-10, 10])

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (rect) {
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      mouseX.set(e.clientX - centerX)
      mouseY.set(e.clientY - centerY)
    }
  }

  const goNext = () => setActiveIndex((prev) => (prev + 1) % testimonials.length)
  const goPrev = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  useEffect(() => {
    const timer = setInterval(goNext, 6000)
    return () => clearInterval(timer)
  }, [])

  const current = testimonials[activeIndex]

  return (
    <section className="flex items-center justify-center py-20 md:py-32 bg-[#fafafa] overflow-hidden relative border-t border-gray-100">
      <div ref={containerRef} className="relative w-full max-w-6xl px-6 md:px-12" onMouseMove={handleMouseMove}>
        {/* Oversized index number - positioned to bleed off left edge */}
        <motion.div
          className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 text-[12rem] md:text-[28rem] font-display font-bold text-black/[0.03] select-none pointer-events-none leading-none tracking-tighter"
          style={{ x: numberX, y: numberY }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="block"
            >
              {String(activeIndex + 1).padStart(2, "0")}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        {/* Main content - asymmetric layout */}
        <div className="relative flex flex-col md:flex-row">
          {/* Left column - vertical text */}
          <div className="hidden md:flex flex-col items-center justify-center pr-12 lg:pr-16 border-r border-gray-200">
            <motion.span
              className="text-xs font-mono text-gray-500 tracking-widest uppercase"
              style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Client Reviews
            </motion.span>

            {/* Vertical progress line */}
            <div className="relative h-32 w-px bg-gray-200 mt-8">
              <motion.div
                className="absolute top-0 left-0 w-full bg-gold origin-top"
                animate={{
                  height: `${((activeIndex + 1) / testimonials.length) * 100}%`,
                }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>

          <div className="flex md:hidden items-center justify-between mb-8 pb-4 border-b border-gray-200">
             <span className="text-xs font-mono text-gray-500 tracking-widest uppercase">Client Reviews</span>
             <div className="h-1 w-24 bg-gray-200 relative overflow-hidden rounded-full">
                <motion.div
                  className="absolute left-0 top-0 h-full bg-gold"
                  animate={{ width: `${((activeIndex + 1) / testimonials.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
             </div>
          </div>

          {/* Center - main content */}
          <div className="flex-1 md:pl-12 lg:pl-16 md:py-12 relative z-10">
            {/* Company badge */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
                className="mb-8"
              >
                <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-gray-600 border border-gray-200 bg-white rounded-full px-4 py-2 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-gold" />
                  {current.company}
                </span>
              </motion.div>
            </AnimatePresence>

            {/* Quote with character reveal */}
            <div className="relative mb-12 min-h-[180px] md:min-h-[140px]">
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={activeIndex}
                  className="font-display text-3xl md:text-5xl font-bold text-black leading-[1.2] tracking-tight"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {current.quote.split(" ").map((word, i) => (
                    <motion.span
                      key={i}
                      className="inline-block mr-[0.3em]"
                      variants={{
                        hidden: { opacity: 0, y: 20, rotateX: 90 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          rotateX: 0,
                          transition: {
                            duration: 0.5,
                            delay: i * 0.05,
                            ease: [0.22, 1, 0.36, 1],
                          },
                        },
                        exit: {
                          opacity: 0,
                          y: -10,
                          transition: { duration: 0.2, delay: i * 0.02 },
                        },
                      }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.blockquote>
              </AnimatePresence>
            </div>

            {/* Author row */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mt-12 md:mt-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="flex items-center gap-4"
                >
                  {/* Animated line before name */}
                  <motion.div
                    className="w-8 h-px bg-gold"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    style={{ originX: 0 }}
                  />
                  <div>
                    <p className="text-lg font-bold text-black">{current.author}</p>
                    <p className="text-xs font-mono tracking-widest text-gray-500 uppercase">{current.role}</p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex items-center gap-4">
                <motion.button
                  onClick={goPrev}
                  className="group relative w-12 h-12 rounded-full border border-gray-200 bg-white flex items-center justify-center overflow-hidden hover:border-gold transition-colors"
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gold"
                    initial={{ x: "-100%" }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <ChevronLeft className="w-5 h-5 relative z-10 text-black" />
                </motion.button>

                <motion.button
                  onClick={goNext}
                  className="group relative w-12 h-12 rounded-full border border-gray-200 bg-white flex items-center justify-center overflow-hidden hover:border-gold transition-colors"
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gold"
                    initial={{ x: "100%" }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <ChevronRight className="w-5 h-5 relative z-10 text-black" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom ticker - subtle repeating company names */}
        <div className="absolute -bottom-8 md:-bottom-20 left-0 right-0 overflow-hidden opacity-[0.03] pointer-events-none">
          <motion.div
            className="flex whitespace-nowrap text-6xl md:text-8xl font-display font-bold tracking-tight text-black"
            animate={{ x: [0, -1000] }}
            transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            {[...Array(10)].map((_, i) => (
              <span key={i} className="mx-8">
                {testimonials.map((t) => t.company).join(" • ")} •
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
