'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Menu, X, ChevronRight, Star, MapPin, Calendar, ArrowRight, Sparkles, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { getGeminiClient } from '@/lib/gemini';

// --- Mock Data ---
const LUXURY_CARS = [
  {
    id: 1,
    name: 'Rolls-Royce Phantom',
    category: 'Ultra Luxury',
    price: 2500,
    image: 'https://picsum.photos/seed/phantom/800/600',
    specs: { engine: '6.75L V12', power: '563 hp', topSpeed: '155 mph' }
  },
  {
    id: 2,
    name: 'Lamborghini Aventador',
    category: 'Supercar',
    price: 1800,
    image: 'https://picsum.photos/seed/aventador/800/600',
    specs: { engine: '6.5L V12', power: '730 hp', topSpeed: '217 mph' }
  },
  {
    id: 3,
    name: 'Bentley Continental GT',
    category: 'Grand Tourer',
    price: 1200,
    image: 'https://picsum.photos/seed/bentley/800/600',
    specs: { engine: '6.0L W12', power: '626 hp', topSpeed: '207 mph' }
  },
  {
    id: 4,
    name: 'Ferrari F8 Tributo',
    category: 'Supercar',
    price: 1600,
    image: 'https://picsum.photos/seed/ferrari/800/600',
    specs: { engine: '3.9L V8', power: '710 hp', topSpeed: '211 mph' }
  }
];

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#f5f2ed]/80 backdrop-blur-md border-b border-[#1a1a1a]/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="text-2xl font-serif tracking-widest uppercase font-bold">LuxeDrive</div>
        
        <div className="hidden md:flex items-center space-x-12">
          {['Collection', 'Services', 'Experience', 'About'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-xs uppercase tracking-[0.2em] hover:text-[#c5a059] transition-colors">
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center space-x-6">
          <button className="p-2 hover:bg-[#1a1a1a]/5 rounded-full transition-colors">
            <Search size={20} />
          </button>
          <button className="hidden md:block px-6 py-2 border border-[#1a1a1a] text-xs uppercase tracking-widest hover:bg-[#1a1a1a] hover:text-white transition-all">
            Book Now
          </button>
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-0 w-full bg-[#f5f2ed] border-b border-[#1a1a1a]/10 md:hidden"
          >
            <div className="flex flex-col p-8 space-y-6">
              {['Collection', 'Services', 'Experience', 'About'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="text-lg font-serif italic" onClick={() => setIsOpen(false)}>
                  {item}
                </a>
              ))}
              <button className="w-full py-4 bg-[#1a1a1a] text-white text-xs uppercase tracking-widest">
                Book Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center overflow-hidden pt-20">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://picsum.photos/seed/luxurycar/1920/1080"
          alt="Luxury Car Hero"
          fill
          className="object-cover brightness-75"
          priority
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#f5f2ed] via-transparent to-transparent opacity-40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs uppercase tracking-[0.4em] text-[#c5a059] font-semibold mb-4 block">
              Redefining Mobility
            </span>
            <h1 className="text-7xl md:text-9xl font-serif leading-[0.9] mb-8">
              The Art of <br />
              <span className="italic">Prestige</span>
            </h1>
            <p className="text-lg text-[#1a1a1a]/70 mb-10 max-w-md font-light leading-relaxed">
              Experience the pinnacle of automotive excellence. Curated for those who demand nothing but the absolute best.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-10 py-5 bg-[#1a1a1a] text-white text-xs uppercase tracking-[0.2em] hover:bg-[#c5a059] transition-all flex items-center justify-center group">
                Explore Collection
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
              </button>
              <button className="px-10 py-5 border border-[#1a1a1a] text-[#1a1a1a] text-xs uppercase tracking-[0.2em] hover:bg-[#1a1a1a] hover:text-white transition-all">
                Our Services
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-10 right-10 hidden lg:block">
        <div className="flex items-center space-x-4">
          <div className="h-[1px] w-20 bg-[#1a1a1a]/30" />
          <span className="text-[10px] uppercase tracking-[0.5em] font-medium opacity-50">Scroll to explore</span>
        </div>
      </div>
    </section>
  );
};

const CarCard = ({ car }: { car: typeof LUXURY_CARS[0] }) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="group bg-white border border-[#1a1a1a]/5 overflow-hidden"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={car.image}
          alt={car.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 text-[10px] uppercase tracking-widest font-bold">
          {car.category}
        </div>
      </div>
      <div className="p-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-2xl font-serif mb-1">{car.name}</h3>
            <div className="flex items-center text-[#c5a059]">
              {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
              <span className="text-[10px] text-[#1a1a1a]/50 ml-2 uppercase tracking-widest">Premium Choice</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xl font-serif">${car.price}</span>
            <span className="text-[10px] block uppercase tracking-widest opacity-50">/ Day</span>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 py-6 border-y border-[#1a1a1a]/5 mb-6">
          {Object.entries(car.specs).map(([key, value]) => (
            <div key={key}>
              <span className="text-[8px] uppercase tracking-widest opacity-40 block mb-1">{key}</span>
              <span className="text-[10px] font-bold uppercase tracking-tight">{value}</span>
            </div>
          ))}
        </div>

        <button className="w-full py-4 border border-[#1a1a1a] text-xs uppercase tracking-widest group-hover:bg-[#1a1a1a] group-hover:text-white transition-all">
          Reserve Now
        </button>
      </div>
    </motion.div>
  );
};

const Collection = () => {
  return (
    <section id="collection" className="py-32 bg-[#f5f2ed]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20">
          <div className="max-w-xl">
            <span className="text-xs uppercase tracking-[0.4em] text-[#c5a059] font-semibold mb-4 block">
              Our Fleet
            </span>
            <h2 className="text-5xl md:text-7xl font-serif leading-tight">
              Curated for <br />
              <span className="italic">Excellence</span>
            </h2>
          </div>
          <div className="mt-8 md:mt-0">
            <div className="flex space-x-4">
              {['All', 'Supercars', 'Luxury', 'SUV'].map((filter) => (
                <button key={filter} className="text-[10px] uppercase tracking-[0.2em] px-4 py-2 border border-[#1a1a1a]/10 hover:border-[#1a1a1a] transition-all">
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {LUXURY_CARS.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </section>
  );
};

const AIVisualizer = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateDreamCar = async () => {
    if (!prompt) return;
    setIsGenerating(true);
    setError(null);
    try {
      const ai = getGeminiClient();
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-image-preview',
        contents: {
          parts: [{ text: `A high-end luxury car, professional automotive photography, studio lighting, 8k resolution, elegant background, ${prompt}` }],
        },
        config: {
          imageConfig: {
            aspectRatio: "16:9",
            imageSize: "1K"
          }
        }
      });

      const imagePart = response.candidates?.[0]?.content?.parts?.find(p => p.inlineData);
      if (imagePart?.inlineData) {
        setGeneratedImage(`data:image/png;base64,${imagePart.inlineData.data}`);
      } else {
        throw new Error("No image generated");
      }
    } catch (err: any) {
      console.error(err);
      setError("Failed to generate image. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section id="experience" className="py-32 bg-[#1a1a1a] text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <span className="text-xs uppercase tracking-[0.4em] text-[#c5a059] font-semibold mb-4 block">
              AI Experience
            </span>
            <h2 className="text-5xl md:text-7xl font-serif leading-tight mb-8">
              Visualize Your <br />
              <span className="italic">Dream Drive</span>
            </h2>
            <p className="text-[#f5f2ed]/60 mb-12 max-w-md font-light leading-relaxed">
              Use our advanced AI engine to visualize your perfect luxury vehicle. Describe your dream car, and we'll bring it to life instantly.
            </p>

            <div className="space-y-6">
              <div className="relative">
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g. A matte black supercar in the streets of Monaco at night"
                  className="w-full bg-white/5 border border-white/10 p-6 text-sm focus:outline-none focus:border-[#c5a059] transition-all placeholder:opacity-30"
                />
                <button
                  onClick={generateDreamCar}
                  disabled={isGenerating || !prompt}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-[#c5a059] text-white hover:bg-[#b08d4a] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGenerating ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} />}
                </button>
              </div>
              {error && <p className="text-red-400 text-xs uppercase tracking-widest">{error}</p>}
            </div>
          </div>

          <div className="relative aspect-video bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden group">
            {generatedImage ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative w-full h-full"
              >
                <Image
                  src={generatedImage}
                  alt="Generated Dream Car"
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            ) : (
              <div className="text-center p-12">
                <div className="w-20 h-20 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="text-[#c5a059]" size={32} />
                </div>
                <p className="text-xs uppercase tracking-[0.3em] opacity-40">Your visualization will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-[#f5f2ed] border-t border-[#1a1a1a]/10 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-2">
            <div className="text-3xl font-serif tracking-widest uppercase font-bold mb-8">LuxeDrive</div>
            <p className="text-[#1a1a1a]/60 max-w-sm font-light leading-relaxed">
              The world's most exclusive car rental service. Experience luxury without compromise, anywhere in the world.
            </p>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-xs uppercase tracking-widest opacity-60">
              <li><a href="#" className="hover:text-[#c5a059]">Collection</a></li>
              <li><a href="#" className="hover:text-[#c5a059]">Membership</a></li>
              <li><a href="#" className="hover:text-[#c5a059]">Locations</a></li>
              <li><a href="#" className="hover:text-[#c5a059]">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold mb-6">Newsletter</h4>
            <p className="text-[10px] uppercase tracking-widest opacity-60 mb-4">Join our inner circle for exclusive updates.</p>
            <div className="flex border-b border-[#1a1a1a]/20 pb-2">
              <input type="email" placeholder="EMAIL ADDRESS" className="bg-transparent text-xs w-full focus:outline-none placeholder:opacity-30" />
              <button className="text-[10px] uppercase tracking-widest font-bold">Join</button>
            </div>
          </div>
        </div>
        <div className="pt-10 border-t border-[#1a1a1a]/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] uppercase tracking-widest opacity-40">© 2026 LuxeDrive Prestige. All Rights Reserved.</p>
          <div className="flex space-x-8 text-[10px] uppercase tracking-widest opacity-40">
            <a href="#" className="hover:opacity-100">Privacy Policy</a>
            <a href="#" className="hover:opacity-100">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function LuxuryRentalPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Collection />
      <AIVisualizer />
      
      {/* Services Section - Brief */}
      <section id="services" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: 'Chauffeur Service', desc: 'Professional drivers at your disposal for ultimate comfort.' },
              { title: 'Airport Transfers', desc: 'Seamless luxury from the moment you land.' },
              { title: 'Global Delivery', desc: 'We bring your chosen vehicle to your doorstep, anywhere.' }
            ].map((service, i) => (
              <div key={i} className="p-10 border border-[#1a1a1a]/5 hover:border-[#c5a059] transition-all group">
                <span className="text-xs font-serif italic text-[#c5a059] mb-4 block">0{i + 1}</span>
                <h3 className="text-2xl font-serif mb-4">{service.title}</h3>
                <p className="text-sm text-[#1a1a1a]/60 font-light leading-relaxed mb-6">{service.desc}</p>
                <button className="text-[10px] uppercase tracking-widest font-bold flex items-center group-hover:text-[#c5a059]">
                  Learn More <ChevronRight size={14} className="ml-1" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
