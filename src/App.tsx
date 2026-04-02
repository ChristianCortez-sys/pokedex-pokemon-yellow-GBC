import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Info, Zap, Flame, Droplets, Leaf, Ghost, Brain, Circle, ChevronRight } from 'lucide-react';
import { Pokemon } from './types';

const TypeIcon = ({ type }: { type: string }) => {
  switch (type.toLowerCase()) {
    case 'electric': return <Zap className="w-4 h-4 text-gbc-yellow" />;
    case 'fire': return <Flame className="w-4 h-4 text-gbc-red" />;
    case 'water': return <Droplets className="w-4 h-4 text-gbc-blue" />;
    case 'grass': return <Leaf className="w-4 h-4 text-green-600" />;
    case 'ghost': return <Ghost className="w-4 h-4 text-purple-600" />;
    case 'psychic': return <Brain className="w-4 h-4 text-pink-500" />;
    default: return <Circle className="w-4 h-4 text-gbc-dark-grey" />;
  }
};

export default function App() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    // Add Google Font for pixel aesthetic
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    fetch('/api/pokemon')
      .then(res => res.json())
      .then(data => {
        setPokemonList(data);
        if (data.length > 0) setSelectedPokemon(data[0]);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch pokemon:', err);
        setLoading(false);
      });
  }, []);

  const filteredPokemon = pokemonList.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.id.toString().includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-gbc-bg font-pixel flex flex-col h-screen overflow-hidden">
      <main className="flex-1 flex flex-col md:grid md:grid-cols-[1fr_450px] overflow-hidden">
        {/* Header (Search) - Moved inside main to allow reordering on mobile */}
        <header className="bg-gbc-yellow border-b-4 border-gbc-black p-4 md:p-6 flex flex-col md:flex-row justify-between items-center gap-4 shrink-0 order-2 md:order-1 md:col-span-2">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 md:w-4 md:h-4 bg-gbc-red rounded-full animate-pulse shadow-[0_0_8px_rgba(255,0,0,0.8)]" />
            <h1 className="text-sm md:text-2xl font-bold tracking-tight text-gbc-black">YELLOW-DEX</h1>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gbc-black opacity-50" />
            <input 
              type="text" 
              placeholder="SEARCH..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className="w-full bg-white border-2 md:border-4 border-gbc-black py-2 md:py-3 pl-10 md:pl-12 pr-4 text-[10px] md:text-[12px] focus:outline-none focus:bg-gbc-yellow transition-colors uppercase placeholder:opacity-30"
            />
          </div>
        </header>

        {/* Detail Section - Top on mobile */}
        <aside className="flex-1 bg-gbc-bg p-2 md:p-8 flex flex-col relative overflow-hidden md:overflow-hidden order-1 md:order-3 border-b-4 md:border-b-0 border-gbc-black">
          <AnimatePresence mode="wait">
            {selectedPokemon ? (
              <motion.div
                key={selectedPokemon.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="flex-1 flex flex-col h-full"
              >
                <div className="flex justify-between items-start mb-1 md:mb-8">
                  <span className="text-lg md:text-4xl font-black opacity-20">#{String(selectedPokemon.id).padStart(3, '0')}</span>
                  <div className="flex gap-1 md:gap-2">
                    {selectedPokemon.types.map(t => (
                      <div key={t} className="p-0.5 md:p-2 border-2 md:border-4 border-gbc-black bg-white shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <TypeIcon type={t} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sprite Area */}
                <div className="w-24 h-24 md:w-80 md:h-80 mx-auto md:mx-0 bg-white border-2 md:border-4 border-gbc-black mb-1 md:mb-8 flex items-center justify-center relative overflow-hidden shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] shrink-0">
                  <img 
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/yellow/${selectedPokemon.id}.png`}
                    alt={selectedPokemon.name}
                    className="w-20 h-20 md:w-64 md:h-64 image-pixelated"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gbc-yellow/5 pointer-events-none" />
                </div>

                <h2 className="text-sm md:text-2xl font-black uppercase mb-1 md:mb-6 text-center border-b-2 md:border-b-4 border-gbc-black pb-0.5 md:pb-4 shrink-0">
                  {selectedPokemon.name}
                </h2>

                <div className="bg-white border-2 md:border-4 border-gbc-black p-1.5 md:p-4 shadow-inner mb-1 overflow-hidden shrink min-h-0">
                  <p className="text-[9px] md:text-[12px] leading-tight uppercase line-clamp-3 md:line-clamp-none">
                    {selectedPokemon.description}
                  </p>
                </div>

                <div className="mt-auto grid grid-cols-1 gap-1 md:gap-4 shrink-0">
                  <div className="border-2 md:border-4 border-gbc-black p-1.5 md:p-4 bg-gbc-yellow flex justify-between items-center shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <span className="text-[7px] md:text-[10px] uppercase font-bold">TYPE DATA</span>
                    <span className="text-[9px] md:text-[12px] font-bold uppercase">{selectedPokemon.types.join(" / ")}</span>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-[10px] md:text-[12px] opacity-20 text-center uppercase">
                SELECT A POKéMON TO VIEW DATA
              </div>
            )}
          </AnimatePresence>
        </aside>
        {/* List Section - Bottom on mobile */}
        <section className={`h-[30vh] md:h-full md:border-r-4 border-gbc-black overflow-y-auto custom-scrollbar bg-white shrink-0 md:shrink order-3 md:order-2 ${isSearchFocused ? 'hidden md:block' : 'block'}`}>
          {loading ? (
            <div className="p-6 md:p-10 text-[10px] md:text-[12px] animate-pulse">LOADING DATABASE...</div>
          ) : (
            <div className="divide-y-2 md:divide-y-4 divide-gbc-black">
              {filteredPokemon.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPokemon(p)}
                  className={`w-full flex items-center p-4 md:p-6 text-left transition-all group ${
                    selectedPokemon?.id === p.id ? 'bg-gbc-black text-white' : 'hover:bg-gbc-yellow/20'
                  }`}
                >
                  <span className="text-[10px] md:text-[12px] font-bold opacity-50 w-12 md:w-16">#{String(p.id).padStart(3, '0')}</span>
                  <h2 className="text-[12px] md:text-[14px] font-bold uppercase flex-1">{p.name}</h2>
                  <ChevronRight className={`w-4 h-4 md:w-6 md:h-6 transition-transform ${selectedPokemon?.id === p.id ? 'translate-x-0' : '-translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'}`} />
                </button>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Footer / Status Bar */}
      <footer className={`bg-gbc-black text-white p-3 md:p-4 text-[8px] md:text-[10px] flex justify-between items-center border-t-4 border-gbc-black shrink-0 ${isSearchFocused ? 'hidden md:flex' : 'flex'}`}>
        <div className="flex gap-2 md:gap-4">
          <span>BATT: OK</span>
          <span className="text-gbc-yellow hidden md:inline">LINK: READY</span>
        </div>
        <span className="animate-pulse tracking-widest">PRESS START</span>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #fff;
          border-left: 2px solid #000;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #f8d030;
          border: 2px solid #000;
        }
        .image-pixelated {
          image-rendering: pixelated;
          image-rendering: crisp-edges;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}} />
    </div>
  );
}
