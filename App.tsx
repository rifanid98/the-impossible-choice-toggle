
import React, { useState, useEffect, useCallback } from 'react';
import { Sparkles, DollarSign, Wallet, User, UserCheck, Bomb, RotateCcw, AlertCircle } from 'lucide-react';

// --- Constants ---
const MAX_ATTEMPTS = 3;
// Idol Kpop
const IDOL_IMAGE = "https://pict.sindonews.net/dyn/732/pena/news/2024/03/18/700/1342613/50-idol-kpop-pria-terpopuler-maret-2024-cha-eunwoo-kembali-kuat-qmm.jpg";
// Monkey for "Jelek"
const MONKEY_IMAGE = "https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?auto=format&fit=crop&q=80&w=400&h=600";
// Meme Explosion (Bibble screaming in fire style)
const EXPLOSION_MEME = "https://i1.sndcdn.com/avatars-Hirpnzvi2A9Ety0v-vB8k5A-t1080x1080.jpg";

// --- Components ---

interface ToggleProps {
  label: string;
  enabled: boolean;
  onToggle: () => void;
  icon: React.ReactNode;
}

const CustomToggle: React.FC<ToggleProps> = ({ label, enabled, onToggle, icon }) => (
  <button
    onClick={onToggle}
    className={`relative inline-flex h-12 w-24 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${enabled ? 'bg-indigo-600' : 'bg-slate-700'
      }`}
  >
    <span className="sr-only">{label}</span>
    <span
      className={`inline-block h-10 w-10 transform rounded-full bg-white transition duration-200 ease-in-out flex items-center justify-center ${enabled ? 'translate-x-13 ml-12' : 'translate-x-1 ml-1'
        }`}
    >
      <span className="text-slate-900">{icon}</span>
    </span>
  </button>
);

const App: React.FC = () => {
  const [isRich, setIsRich] = useState(false);
  const [isHandsome, setIsHandsome] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isExploded, setIsExploded] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleToggleRich = useCallback(() => {
    if (isExploded) return;

    const nextRich = !isRich;
    if (nextRich && isHandsome) {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      setShowError(true);

      if (newAttempts >= MAX_ATTEMPTS) {
        setIsExploded(true);
      } else {
        setIsRich(true);
        setIsHandsome(false);
      }
    } else {
      setIsRich(nextRich);
      setShowError(false);
    }
  }, [isRich, isHandsome, attempts, isExploded]);

  const handleToggleHandsome = useCallback(() => {
    if (isExploded) return;

    const nextHandsome = !isHandsome;
    if (nextHandsome && isRich) {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      setShowError(true);

      if (newAttempts >= MAX_ATTEMPTS) {
        setIsExploded(true);
      } else {
        setIsHandsome(true);
        setIsRich(false);
      }
    } else {
      setIsHandsome(nextHandsome);
      setShowError(false);
    }
  }, [isRich, isHandsome, attempts, isExploded]);

  const reset = () => {
    setIsRich(false);
    setIsHandsome(false);
    setAttempts(0);
    setIsExploded(false);
    setShowError(false);
  };

  useEffect(() => {
    if (showError) {
      const timer = setTimeout(() => setShowError(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showError]);

  if (isExploded) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black p-6 text-center overflow-hidden">
        <div className="explode-overlay absolute inset-0 bg-orange-600 flex items-center justify-center z-40" />
        <div className="relative z-50 flex flex-col items-center gap-6">
          <div className="w-full max-w-lg rounded-2xl border-8 border-yellow-500 overflow-hidden shadow-[0_0_50px_rgba(234,179,8,0.5)] animate-shake">
            <img src={EXPLOSION_MEME} alt="Sadarlah Kawan..." className="w-full h-auto" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-yellow-400 uppercase tracking-tighter drop-shadow-lg">Sadarlah Kawan...</h1>
          <p className="text-2xl font-bold text-white max-w-md bg-black/50 p-4 rounded-xl backdrop-blur-sm">
            Satu orang tidak bisa punya semuanya!<br />
            Alam semesta hancur karena keserakahanmu.
          </p>
          <button
            onClick={reset}
            className="flex items-center gap-2 px-10 py-5 bg-yellow-500 text-black rounded-full font-black text-xl hover:bg-yellow-400 transform hover:scale-110 transition-all shadow-xl"
          >
            <RotateCcw size={24} />
            COBA NASIB LAGI
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 transition-all duration-700 ${showError ? 'bg-orange-950' : 'bg-slate-950'}`}>

      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-2 bg-gradient-to-r from-yellow-400 via-white to-pink-400 bg-clip-text text-transparent">
          The Impossible Choice
        </h1>
        <p className="text-slate-400 text-sm md:text-base tracking-widest uppercase">Kaya? Ganteng? Pilih Satu.</p>
      </div>

      {/* Main Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">

        {/* Wealth Card */}
        <div className={`relative group overflow-hidden rounded-3xl bg-slate-900 border-2 transition-all duration-300 ${isRich ? 'border-yellow-500 shadow-2xl shadow-yellow-500/20 scale-105' : 'border-slate-800'}`}>
          <div className="p-8 flex flex-col items-center text-center">
            <div className={`mb-6 p-6 rounded-full transition-all duration-500 ${isRich ? 'bg-yellow-500 text-black scale-110 rotate-12 shadow-lg' : 'bg-slate-800 text-slate-500'}`}>
              {isRich ? <DollarSign size={48} /> : <Wallet size={48} />}
            </div>
            <h2 className={`text-3xl font-black mb-4 ${isRich ? 'text-yellow-400' : 'text-slate-400'}`}>
              {isRich ? 'Kaya' : 'Miskin'}
            </h2>
            <p className="text-slate-500 text-sm mb-8 h-12">
              {isRich ? 'Banyak uang, tumpukan dollar, tapi wajah...' : 'Dompet kosong melompong, tapi hati (dan wajah) mungkin tenang.'}
            </p>
            <CustomToggle
              label="Wealth Toggle"
              enabled={isRich}
              onToggle={handleToggleRich}
              icon={isRich ? <DollarSign size={20} /> : <Wallet size={20} />}
            />
          </div>
        </div>

        {/* Appearance Card */}
        <div className={`relative group overflow-hidden rounded-3xl bg-slate-900 border-2 transition-all duration-300 ${isHandsome ? 'border-pink-500 shadow-2xl shadow-pink-500/20 scale-105' : 'border-slate-800'}`}>
          <div className="p-8 flex flex-col items-center text-center">
            <div className={`mb-6 relative w-36 h-36 rounded-full overflow-hidden border-4 transition-all duration-500 ${isHandsome ? 'border-pink-500 scale-110 shadow-lg shadow-pink-500/50' : 'border-slate-800'}`}>
              <img
                src={isHandsome ? IDOL_IMAGE : MONKEY_IMAGE}
                alt="Status"
                className="w-full h-full object-cover"
              />
              {isHandsome && <Sparkles className="absolute top-2 right-2 text-yellow-300 animate-pulse" size={24} />}
            </div>
            <h2 className={`text-3xl font-black mb-4 ${isHandsome ? 'text-pink-400' : 'text-slate-400'}`}>
              {isHandsome ? 'Ganteng' : 'Jelek'}
            </h2>
            <p className="text-slate-500 text-sm mb-8 h-12">
              {isHandsome ? 'Wajah sekelas Idol K-pop, idaman semua orang.' : 'Mungkin mirip monyet, tapi yang penting kepribadian.'}
            </p>
            <CustomToggle
              label="Appearance Toggle"
              enabled={isHandsome}
              onToggle={handleToggleHandsome}
              icon={isHandsome ? <UserCheck size={20} /> : <User size={20} />}
            />
          </div>
        </div>

      </div>

      {/* Secret Error Toast (Hidden Surprise) */}
      {showError && (
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 px-8 py-4 bg-orange-600 text-white rounded-2xl font-black shadow-2xl animate-shake z-50 flex items-center gap-3">
          <AlertCircle size={24} />
          <span>Gagal! Tidak bisa pilih keduanya.</span>
        </div>
      )}

      {/* Footer Info */}
      <div className="mt-12 text-slate-700 text-[10px] font-mono uppercase tracking-[0.3em]">
        System Constraint Error: Multiple-Positive-Identity Overflow Detected
      </div>
    </div>
  );
};

export default App;
