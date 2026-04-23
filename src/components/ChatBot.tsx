import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([
    { role: 'model', text: 'Hi there! I can help you with questions about TAS Services, pricing, or order status. How can I assist you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      // Build conversation history for context
      const chat = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: 'You are a helpful customer support assistant for TAS - Elegant Stitch Creations. Provide information on custom embroidery, 3D puff embroidery, heat transfers, and digitizing services. Keep answers concise, friendly and professional.',
        }
      });
      
      // Load previous messages into the chat session (if needed) but we can just use generateContent directly with history if we don't need real session persistence across reloads.
      // For simplicity, we just send all history in `contents`.
      const apiMessages = messages.map(msg => ({ role: msg.role, parts: [{ text: msg.text }] }));
      apiMessages.push({ role: 'user', parts: [{ text: userMessage }] });

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: apiMessages,
        config: {
          systemInstruction: 'You are a helpful customer support assistant for TAS - Elegant Stitch Creations. Provide information on custom embroidery, 3D puff embroidery, heat transfers, and digitizing services. Keep answers concise, friendly and professional. If you don\'t know, ask them to use the Order Now form or contact email info@taselegant.com.',
        }
      });

      const text = response.text || "I'm sorry, I couldn't process your request.";
      setMessages(prev => [...prev, { role: 'model', text }]);

    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'model', text: 'Sorry, I am having trouble connecting right now. Please try again later.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-black text-white rounded-full flex items-center justify-center shadow-lg hover:bg-gold hover:text-black transition-all duration-300 z-50 group hover:scale-105"
      >
        <MessageSquare className="w-6 h-6 group-hover:scale-110 transition-transform" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-[350px] sm:w-[400px] h-[500px] bg-white shadow-2xl rounded-lg overflow-hidden flex flex-col z-50 border border-gray-100"
          >
            {/* Header */}
            <div className="bg-black text-white p-4 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center text-black">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-medium text-lg">TAS Assistant</h3>
                  <p className="text-xs text-white/70">Usually replies instantly</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/70 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl p-3 text-sm ${
                    msg.role === 'user' 
                      ? 'bg-black text-white rounded-tr-sm' 
                      : 'bg-white text-black border border-gray-100 shadow-sm rounded-tl-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white text-black border border-gray-100 shadow-sm rounded-2xl rounded-tl-sm p-4 flex space-x-1">
                    <motion.div className="w-1.5 h-1.5 bg-gray-400 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity }} />
                    <motion.div className="w-1.5 h-1.5 bg-gray-400 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, delay: 0.2, repeat: Infinity }} />
                    <motion.div className="w-1.5 h-1.5 bg-gray-400 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, delay: 0.4, repeat: Infinity }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} className="p-4 bg-white border-t border-gray-100 flex items-center space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-gray-100 border-transparent focus:bg-white focus:border-gold focus:ring-0 rounded-full px-4 py-2 text-sm transition-all outline-none border"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="w-10 h-10 bg-gold text-black rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gold-dark transition-colors"
              >
                <Send className="w-4 h-4 ml-0.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
