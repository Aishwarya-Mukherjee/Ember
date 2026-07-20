const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf-8');

const startIndex = code.indexOf('{/* Right Column: Premium Smartphone Mockup */}');
const endIndex = code.indexOf('{/* Bottom Stats Footer */}');

if (startIndex !== -1 && endIndex !== -1) {
  const before = code.substring(0, startIndex);
  const after = code.substring(endIndex);

  const replacement = `{/* Right Column: Digital Health Twin (Meera) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative flex items-center justify-center h-[600px] sm:h-[700px] w-full lg:translate-x-4 mt-8 lg:mt-0"
          >
            {/* Premium Healthcare Environment Background */}
            <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
              <div className="absolute w-[450px] h-[450px] bg-teal-50/60 rounded-full blur-[100px]" />
              <div className="absolute w-[350px] h-[350px] bg-cyan-100/40 rounded-full blur-[90px] translate-x-12 translate-y-24" />
              <div className="absolute w-[250px] h-[250px] bg-emerald-50/50 rounded-full blur-[80px] -translate-x-12 -translate-y-24" />
              
              {/* Very light neural network lines / Minimal glowing dots */}
              <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 500 600" preserveAspectRatio="none">
                <circle cx="100" cy="150" r="1.5" fill="#14B8A6" className="animate-pulse" />
                <circle cx="400" cy="200" r="1.5" fill="#14B8A6" className="animate-pulse" />
                <circle cx="150" cy="450" r="1.5" fill="#14B8A6" className="animate-pulse" />
                <circle cx="350" cy="500" r="1.5" fill="#14B8A6" className="animate-pulse" />
                <path d="M100 150 L400 200 L350 500 L150 450 Z" fill="none" stroke="#2dd4bf" strokeWidth="0.5" strokeDasharray="3 6" className="opacity-50" />
                <path d="M100 150 L150 450" fill="none" stroke="#2dd4bf" strokeWidth="0.5" strokeDasharray="3 6" className="opacity-50" />
              </svg>
            </div>

            {/* Central AI Core & Connections (SVG) */}
            <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
              <svg className="w-full h-full" style={{ filter: 'drop-shadow(0 0 6px rgba(20,184,166,0.4))' }}>
                <defs>
                  <linearGradient id="glowLine" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#99f6e4" stopOpacity="0.1" />
                  </linearGradient>
                  <linearGradient id="glowLineRev" x1="100%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#99f6e4" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
                {/* Lines radiating from center (core) to the nodes */}
                <path d="M 50% 45% L 15% 25%" stroke="url(#glowLineRev)" strokeWidth="1" strokeDasharray="4 4" className="opacity-60" />
                <path d="M 50% 45% L 85% 20%" stroke="url(#glowLine)" strokeWidth="1" strokeDasharray="4 4" className="opacity-60" />
                <path d="M 50% 45% L 10% 45%" stroke="url(#glowLineRev)" strokeWidth="1" strokeDasharray="4 4" className="opacity-60" />
                <path d="M 50% 45% L 90% 40%" stroke="url(#glowLine)" strokeWidth="1" strokeDasharray="4 4" className="opacity-60" />
                <path d="M 50% 45% L 20% 65%" stroke="url(#glowLineRev)" strokeWidth="1" strokeDasharray="4 4" className="opacity-60" />
                <path d="M 50% 45% L 80% 65%" stroke="url(#glowLine)" strokeWidth="1" strokeDasharray="4 4" className="opacity-60" />
                <path d="M 50% 45% L 50% 85%" stroke="url(#glowLine)" strokeWidth="1" strokeDasharray="4 4" className="opacity-60" />
              </svg>
            </div>

            {/* Human Silhouette (Meera Hologram) */}
            <motion.div 
              animate={{ y: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="relative z-15 w-[240px] sm:w-[280px] h-[480px] sm:h-[560px] flex items-center justify-center"
            >
              {/* Silhouette SVG */}
              <svg className="w-full h-full opacity-90 filter drop-shadow-[0_0_25px_rgba(45,212,191,0.4)]" viewBox="0 0 200 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Head */}
                <motion.path 
                  animate={{ opacity: [0.6, 0.9, 0.6] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  d="M100 20 C82 20 68 36 68 56 C68 76 82 92 100 92 C118 92 132 76 132 56 C132 36 118 20 100 20 Z" fill="url(#holoGrad)" />
                
                {/* Body/Torso */}
                <motion.path 
                  animate={{ opacity: [0.5, 0.8, 0.5] }}
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.5 }}
                  d="M100 105 C65 105 45 125 35 170 L35 290 C35 315 50 325 65 305 L75 240 L75 480 C75 500 90 500 90 480 L90 310 L110 310 L110 480 C110 500 125 500 125 480 L125 240 L135 305 C150 325 165 315 165 290 L165 170 C155 125 135 105 100 105 Z" fill="url(#holoGrad)" />
                
                <defs>
                  <linearGradient id="holoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#e6fffa" stopOpacity="0.9" />
                    <stop offset="50%" stopColor="#99f6e4" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#5eead4" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
              </svg>
              
              {/* Central AI Core */}
              <div className="absolute top-[35%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-30">
                {/* Pulsing glow */}
                <motion.div 
                  animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0.2, 0.6] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                  className="w-16 h-16 bg-teal-400 rounded-full flex items-center justify-center blur-md absolute"
                />
                {/* Rotating rings */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                  className="w-14 h-14 border-2 border-teal-200 border-dashed rounded-full absolute"
                />
                <motion.div 
                  animate={{ rotate: -360 }}
                  transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
                  className="w-20 h-20 border border-teal-300 border-dotted rounded-full absolute opacity-50"
                />
                {/* Core Center */}
                <div className="w-11 h-11 bg-white/95 backdrop-blur-xl rounded-full shadow-[0_0_20px_rgba(20,184,166,0.6)] flex flex-col items-center justify-center relative z-10 border border-white">
                  <span className="text-[12px] text-teal-600 font-extrabold leading-none mt-0.5">92</span>
                  <span className="text-[4px] text-teal-500 font-bold uppercase tracking-wider mt-0.5">Excellent</span>
                </div>
              </div>
            </motion.div>

            {/* Health Nodes (Interactive Glowing Points) */}
            
            {/* 1. Heart Health */}
            <motion.div 
              animate={{ y: [-4, 4, -4] }}
              transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut", delay: 0.2 }}
              className="absolute top-[22%] left-[2%] sm:left-[8%] z-40 flex items-center gap-2 group"
            >
              <div className="bg-white/90 backdrop-blur-md rounded-xl p-2.5 border border-white/60 shadow-lg shadow-teal-900/5 w-[130px] transition-transform group-hover:scale-105">
                <div className="flex items-center gap-1.5 mb-1">
                  <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-slate-800">Heart Health</span>
                </div>
                <div className="text-[9px] text-slate-500 flex justify-between">
                  <span>Stable</span>
                  <span className="font-semibold text-slate-700">72 BPM</span>
                </div>
              </div>
              <div className="w-2 h-2 rounded-full bg-teal-400 shadow-[0_0_10px_#2dd4bf] animate-pulse hidden sm:block" />
            </motion.div>

            {/* 2. Mental Wellness */}
            <motion.div 
              animate={{ y: [4, -4, 4] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.8 }}
              className="absolute top-[18%] right-[2%] sm:right-[6%] z-40 flex items-center gap-2 flex-row-reverse group"
            >
              <div className="bg-white/90 backdrop-blur-md rounded-xl p-2.5 border border-white/60 shadow-lg shadow-teal-900/5 w-[130px] transition-transform group-hover:scale-105">
                <div className="flex items-center gap-1.5 mb-1">
                  <BrainCircuit className="w-3.5 h-3.5 text-indigo-500" />
                  <span className="text-[10px] font-bold text-slate-800">Mental Wellness</span>
                </div>
                <div className="text-[9px] text-slate-500 flex justify-between">
                  <span>Calm</span>
                  <span className="font-semibold text-indigo-600">Low Stress</span>
                </div>
              </div>
              <div className="w-2 h-2 rounded-full bg-teal-400 shadow-[0_0_10px_#2dd4bf] animate-pulse hidden sm:block" />
            </motion.div>

            {/* 3. Medication */}
            <motion.div 
              animate={{ y: [-3, 3, -3] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1.2 }}
              className="absolute top-[42%] left-[0%] sm:left-[2%] z-40 flex items-center gap-2 group"
            >
              <div className="bg-white/90 backdrop-blur-md rounded-xl p-2.5 border border-white/60 shadow-lg shadow-teal-900/5 w-[140px] transition-transform group-hover:scale-105">
                <div className="flex items-center gap-1.5 mb-1">
                  <Pill className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-[10px] font-bold text-slate-800">Medication</span>
                </div>
                <div className="text-[9px] text-slate-500 flex flex-col gap-0.5">
                  <span className="flex items-center gap-1 text-emerald-600"><Check className="w-2.5 h-2.5" /> Morning Done</span>
                  <span>Next: 8:00 PM</span>
                </div>
              </div>
              <div className="w-2 h-2 rounded-full bg-teal-400 shadow-[0_0_10px_#2dd4bf] animate-pulse hidden sm:block" />
            </motion.div>

            {/* 4. Blood Pressure */}
            <motion.div 
              animate={{ y: [3, -3, 3] }}
              transition={{ repeat: Infinity, duration: 5.2, ease: "easeInOut", delay: 0.4 }}
              className="absolute top-[38%] right-[0%] sm:right-[3%] z-40 flex items-center gap-2 flex-row-reverse group"
            >
              <div className="bg-white/90 backdrop-blur-md rounded-xl p-2.5 border border-white/60 shadow-lg shadow-teal-900/5 w-[130px] transition-transform group-hover:scale-105">
                <div className="flex items-center gap-1.5 mb-1">
                  <Activity className="w-3.5 h-3.5 text-cyan-500" />
                  <span className="text-[10px] font-bold text-slate-800">Blood Pressure</span>
                </div>
                <div className="text-[9px] text-slate-500 flex justify-between">
                  <span className="font-semibold text-slate-700">118/76</span>
                  <span className="text-emerald-600">Normal</span>
                </div>
              </div>
              <div className="w-2 h-2 rounded-full bg-teal-400 shadow-[0_0_10px_#2dd4bf] animate-pulse hidden sm:block" />
            </motion.div>

            {/* 5. Sleep Quality */}
            <motion.div 
              animate={{ y: [-5, 5, -5] }}
              transition={{ repeat: Infinity, duration: 6.5, ease: "easeInOut", delay: 1.5 }}
              className="absolute bottom-[30%] left-[2%] sm:left-[8%] z-40 flex items-center gap-2 group"
            >
              <div className="bg-white/90 backdrop-blur-md rounded-xl p-2.5 border border-white/60 shadow-lg shadow-teal-900/5 w-[140px] transition-transform group-hover:scale-105">
                <div className="flex items-center gap-1.5 mb-1">
                  <Moon className="w-3.5 h-3.5 text-blue-500" />
                  <span className="text-[10px] font-bold text-slate-800">Sleep Quality</span>
                </div>
                <div className="text-[9px] text-slate-500 flex flex-col gap-0.5">
                  <span className="font-semibold text-slate-700">7h 45m</span>
                  <span className="text-teal-600">Excellent Recovery</span>
                </div>
              </div>
              <div className="w-2 h-2 rounded-full bg-teal-400 shadow-[0_0_10px_#2dd4bf] animate-pulse hidden sm:block" />
            </motion.div>

            {/* 6. Hydration */}
            <motion.div 
              animate={{ y: [5, -5, 5] }}
              transition={{ repeat: Infinity, duration: 5.8, ease: "easeInOut", delay: 0.9 }}
              className="absolute bottom-[32%] right-[2%] sm:right-[10%] z-40 flex items-center gap-2 flex-row-reverse group"
            >
              <div className="bg-white/90 backdrop-blur-md rounded-xl p-2.5 border border-white/60 shadow-lg shadow-teal-900/5 w-[120px] transition-transform group-hover:scale-105">
                <div className="flex items-center gap-1.5 mb-1">
                  <Droplet className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-[10px] font-bold text-slate-800">Hydration</span>
                </div>
                <div className="text-[9px] text-slate-500 flex justify-between">
                  <span className="font-semibold text-slate-700">85%</span>
                  <span className="text-teal-600">Optimal</span>
                </div>
              </div>
              <div className="w-2 h-2 rounded-full bg-teal-400 shadow-[0_0_10px_#2dd4bf] animate-pulse hidden sm:block" />
            </motion.div>

            {/* 7. Daily Activity */}
            <motion.div 
              animate={{ y: [-4, 4, -4] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.1 }}
              className="absolute bottom-[10%] left-1/2 transform -translate-x-1/2 z-40 flex flex-col items-center gap-2 group"
            >
              <div className="w-2 h-2 rounded-full bg-teal-400 shadow-[0_0_10px_#2dd4bf] animate-pulse hidden sm:block" />
              <div className="bg-white/90 backdrop-blur-md rounded-xl p-2.5 border border-white/60 shadow-lg shadow-teal-900/5 w-[140px] text-center transition-transform group-hover:scale-105">
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <Footprints className="w-3.5 h-3.5 text-teal-500" />
                  <span className="text-[10px] font-bold text-slate-800">Daily Activity</span>
                </div>
                <div className="text-[9px] text-slate-500">
                  <span className="font-semibold text-slate-700">7,800 Steps</span> • Goal: 78%
                </div>
              </div>
            </motion.div>


            {/* Floating AI Insights (Glassmorphism Cards) */}
            
            {/* Insight Card 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: [0, -6, 0] }}
              transition={{ opacity: { delay: 1.5, duration: 1 }, y: { repeat: Infinity, duration: 8, ease: "easeInOut" } }}
              className="absolute top-[-5%] left-[10%] sm:left-[25%] z-50 bg-gradient-to-br from-white/95 to-white/80 backdrop-blur-2xl border border-white/60 rounded-2xl p-4 shadow-2xl shadow-teal-900/10 w-[240px]"
            >
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center shrink-0 border border-teal-100">
                  <Sparkles className="w-4 h-4 text-teal-500" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 mb-1">Today's Insight</h4>
                  <p className="text-[10px] text-slate-600 leading-relaxed font-medium">Your health is improving consistently. Continue your current routine.</p>
                </div>
              </div>
            </motion.div>

            {/* Insight Card 2 */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: [0, 6, 0] }}
              transition={{ opacity: { delay: 1.8, duration: 1 }, x: { repeat: Infinity, duration: 7, ease: "easeInOut" } }}
              className="absolute top-[30%] left-[-15%] sm:left-[-10%] z-50 bg-gradient-to-br from-white/95 to-white/80 backdrop-blur-2xl border border-white/60 rounded-2xl p-3 shadow-2xl shadow-teal-900/10 w-[180px]"
            >
              <div className="flex gap-3 items-center">
                <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center shrink-0 border border-emerald-100">
                  <Clock className="w-4 h-4 text-emerald-500" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-slate-800">Medication Reminder</h4>
                  <p className="text-[9px] text-slate-600 font-medium mt-0.5">Evening Medicine • <span className="font-bold text-slate-800">8:00 PM</span></p>
                </div>
              </div>
            </motion.div>

            {/* Insight Card 3 */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: [0, -6, 0] }}
              transition={{ opacity: { delay: 2.1, duration: 1 }, x: { repeat: Infinity, duration: 7.5, ease: "easeInOut" } }}
              className="absolute top-[60%] right-[-15%] sm:right-[-10%] z-50 bg-gradient-to-br from-white/95 to-white/80 backdrop-blur-2xl border border-white/60 rounded-2xl p-3 shadow-2xl shadow-teal-900/10 w-[180px]"
            >
              <div className="flex gap-3 items-center">
                <div className="w-8 h-8 rounded-full bg-cyan-50 flex items-center justify-center shrink-0 border border-cyan-100">
                  <Activity className="w-4 h-4 text-cyan-500" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-slate-800">Weekly Progress</h4>
                  <p className="text-[9px] text-slate-600 font-medium mt-0.5">Health Score <span className="font-bold text-teal-600">+6%</span></p>
                </div>
              </div>
            </motion.div>

          </motion.div>

        </div>

        `;

  fs.writeFileSync('app/page.tsx', before + replacement + after, 'utf-8');
  console.log('Replaced successfully');
} else {
  console.log('Could not find markers');
}
