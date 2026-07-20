const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf-8');

const startIndex = code.indexOf('{/* Right Column: Interactive Animated Hero Visual */}');
const endIndex = code.indexOf('{/* Bottom Stats Footer */}');

if (startIndex !== -1 && endIndex !== -1) {
  const before = code.substring(0, startIndex);
  const after = code.substring(endIndex);
  
  const replacement = `{/* Right Column: Clean Medical Dashboard Composition */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative flex items-center justify-center h-[400px] sm:h-[500px] w-full lg:translate-x-8"
          >
            {/* Subtle background glow */}
            <div className="absolute w-[280px] h-[280px] bg-cyan-100/50 rounded-full blur-[80px] pointer-events-none" />

            {/* Main Center Card: Health Score */}
            <motion.div 
              animate={{ y: [-4, 4, -4] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="relative z-10 bg-white border border-slate-200 rounded-[32px] p-6 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] w-[260px] flex flex-col items-center"
            >
              <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-4 w-full justify-start text-sm">
                <Activity className="w-4 h-4 text-emerald-500" /> Health Score
              </h3>
              <div className="relative w-32 h-32 mb-2 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#f1f5f9" strokeWidth="8" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#0d9488" strokeWidth="8" strokeDasharray="251.2" strokeDashoffset="45.216" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-extrabold text-slate-800">82</span>
                </div>
              </div>
              <div className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-bold mt-2">
                ↑ 8 pts from last week
              </div>
            </motion.div>

            {/* Top Right Floating Card: AI Insight */}
            <motion.div 
              animate={{ y: [4, -4, 4] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
              className="absolute top-[5%] right-[-5%] sm:right-[5%] z-20 bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-2xl p-4 shadow-xl shadow-slate-200/50 w-[200px]"
            >
              <div className="flex items-center gap-2 mb-2">
                <BrainCircuit className="w-4 h-4 text-cyan-600" />
                <span className="text-xs font-bold text-slate-800">AI Insight</span>
              </div>
              <p className="text-[10px] text-slate-600 leading-relaxed font-medium">
                Blood pressure is stable. Great job maintaining your daily routine!
              </p>
            </motion.div>

            {/* Bottom Left Floating Card: Vitals */}
            <motion.div 
              animate={{ y: [-3, 3, -3] }}
              transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut", delay: 0.5 }}
              className="absolute bottom-[10%] left-[-5%] sm:left-[0%] z-20 bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-2xl p-4 shadow-xl shadow-slate-200/50 w-[180px]"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Heart Rate</span>
                <Heart className="w-3 h-3 text-red-500" />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-slate-800">72</span>
                <span className="text-[10px] text-slate-500 font-medium">bpm</span>
              </div>
              <div className="mt-2 h-6 w-full flex items-end gap-1">
                {[40, 70, 50, 90, 60, 80].map((h, i) => (
                  <div key={i} className="w-full bg-red-100 rounded-t-sm" style={{ height: \`\${h}%\` }}>
                    <div className="w-full bg-red-400 rounded-t-sm" style={{ height: '30%' }} />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Bottom Right Floating Card: Medication */}
            <motion.div 
              animate={{ y: [3, -3, 3] }}
              transition={{ repeat: Infinity, duration: 4.8, ease: "easeInOut", delay: 1.5 }}
              className="absolute bottom-[25%] right-[-10%] sm:right-[-5%] z-0 bg-white/80 backdrop-blur-md border border-slate-200/60 rounded-2xl p-3 shadow-lg w-[140px] flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                <Pill className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-800">Medication</span>
                <span className="text-[9px] text-slate-500">Taken</span>
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
