const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf-8');

// Update imports
code = code.replace(
  'import { CircleUserRound, Menu, X, Heart, Activity, BrainCircuit, Pill, Sparkles, ArrowRight, AlertTriangle } from "lucide-react";',
  'import { CircleUserRound, Menu, X, Heart, Activity, BrainCircuit, Pill, Sparkles, ArrowRight, AlertTriangle, Check, Hourglass, Droplet, Moon, Footprints, Smile, Clock } from "lucide-react";'
);

const startIndex = code.indexOf('{/* Right Column: Clean Medical Dashboard Composition */}');
const endIndex = code.indexOf('{/* Bottom Stats Footer */}');

if (startIndex !== -1 && endIndex !== -1) {
  const before = code.substring(0, startIndex);
  const after = code.substring(endIndex);
  
  const replacement = `{/* Right Column: Premium Smartphone Mockup */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative flex items-center justify-center h-[550px] sm:h-[650px] w-full lg:translate-x-8 mt-12 lg:mt-0"
          >
            {/* Premium Background Elements */}
            <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
              <div className="absolute w-[400px] h-[400px] bg-teal-100/40 rounded-full blur-[100px]" />
              <div className="absolute w-[300px] h-[300px] bg-cyan-200/30 rounded-full blur-[80px] translate-x-20 translate-y-20" />
              <div className="absolute w-[250px] h-[250px] bg-emerald-100/40 rounded-full blur-[70px] -translate-x-20 -translate-y-20" />
            </div>

            {/* Floating Notification 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: [0, -8, 0] }}
              transition={{ opacity: { delay: 0.5, duration: 0.8 }, y: { repeat: Infinity, duration: 6, ease: "easeInOut" } }}
              className="absolute top-[10%] left-[-15%] sm:left-[-5%] z-30 bg-white/90 backdrop-blur-xl border border-white/60 rounded-2xl p-4 shadow-xl shadow-slate-200/50 w-[220px]"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Medication Completed</h4>
                  <p className="text-[10px] text-slate-500">Morning Dose Taken On Time</p>
                </div>
              </div>
            </motion.div>

            {/* Floating Notification 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: [0, 8, 0] }}
              transition={{ opacity: { delay: 0.7, duration: 0.8 }, y: { repeat: Infinity, duration: 5, ease: "easeInOut" } }}
              className="absolute top-[45%] right-[-15%] sm:right-[-5%] z-30 bg-white/90 backdrop-blur-xl border border-white/60 rounded-2xl p-4 shadow-xl shadow-slate-200/50 w-[180px]"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center shrink-0">
                  <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Heart Rate Stable</h4>
                  <p className="text-[10px] text-slate-500">72 BPM • Normal Range</p>
                </div>
              </div>
            </motion.div>

            {/* Floating Notification 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: [0, -5, 0] }}
              transition={{ opacity: { delay: 0.9, duration: 0.8 }, y: { repeat: Infinity, duration: 7, ease: "easeInOut" } }}
              className="absolute bottom-[10%] left-[-10%] sm:left-[5%] z-30 bg-white/90 backdrop-blur-xl border border-white/60 rounded-2xl p-4 shadow-xl shadow-slate-200/50 w-[210px]"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center shrink-0">
                  <Activity className="w-4 h-4 text-cyan-600" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Weekly Progress</h4>
                  <p className="text-[10px] text-slate-500">Health Score +6% This Week</p>
                </div>
              </div>
            </motion.div>

            {/* The Smartphone Mockup */}
            <motion.div 
              animate={{ y: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
              className="relative z-20 w-[300px] h-[600px] bg-white rounded-[40px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] border-[8px] border-slate-100 overflow-hidden flex flex-col ring-1 ring-slate-200/50"
            >
              {/* iPhone Notch */}
              <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-50">
                <div className="w-28 h-6 bg-slate-100 rounded-b-2xl"></div>
              </div>

              {/* Phone Content Scrollable Area */}
              <div className="flex-1 w-full bg-slate-50 overflow-y-auto overflow-x-hidden scrollbar-hide pt-10 pb-6 px-4 flex flex-col gap-3 relative">
                
                {/* Greeting Section */}
                <div className="flex items-center justify-between mb-1">
                  <div>
                    <h2 className="text-base font-extrabold text-slate-900 tracking-tight">Good Morning, Meera 👋</h2>
                    <p className="text-[10px] text-slate-500 font-medium mt-0.5">Your health journey is on track today.</p>
                  </div>
                  <div className="w-9 h-9 rounded-full border-2 border-white shadow-sm overflow-hidden shrink-0">
                    <Image src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100" alt="Meera" width={36} height={36} unoptimized className="w-full h-full object-cover" />
                  </div>
                </div>

                {/* Daily Insight Section */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                  className="bg-gradient-to-br from-cyan-500 to-teal-600 rounded-2xl p-3 text-white shadow-md relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-xl transform translate-x-8 -translate-y-8" />
                  <div className="flex items-center gap-1.5 mb-1.5 relative z-10">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-100" />
                    <span className="text-[10px] font-bold text-cyan-50 uppercase tracking-wider">Today's Insight</span>
                  </div>
                  <p className="text-[11px] font-medium leading-relaxed relative z-10">
                    You're maintaining a healthy routine. Stay hydrated and don't forget your evening medication.
                  </p>
                </motion.div>

                {/* Health Score & Heart Rate Row */}
                <div className="grid grid-cols-2 gap-2">
                  {/* Health Score Card */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                    className="bg-white rounded-2xl p-3 shadow-sm border border-slate-100 flex flex-col items-center text-center relative"
                  >
                    <span className="text-[9px] font-bold text-slate-500 uppercase mb-2">Health Score</span>
                    <div className="relative w-16 h-16 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="42" fill="none" stroke="#f1f5f9" strokeWidth="8" />
                        <motion.circle 
                          cx="50" cy="50" r="42" fill="none" stroke="#0d9488" strokeWidth="8" 
                          strokeLinecap="round"
                          initial={{ strokeDasharray: "264", strokeDashoffset: "264" }}
                          animate={{ strokeDashoffset: 264 - (264 * 0.92) }}
                          transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <span className="text-xl font-black text-slate-800">92</span>
                      </div>
                    </div>
                    <span className="text-[8px] font-bold text-teal-600 mt-2 leading-tight">Excellent Progress<br/><span className="text-[7px] text-teal-500 opacity-80">+6% improvement this week</span></span>
                  </motion.div>

                  {/* Heart Rate Card */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                    className="bg-white rounded-2xl p-3 shadow-sm border border-slate-100 flex flex-col relative overflow-hidden"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-[9px] font-bold text-slate-500 uppercase">Heart Rate</span>
                      <Heart className="w-3 h-3 text-rose-500 fill-rose-500 animate-pulse" />
                    </div>
                    <div className="flex items-baseline gap-1 mb-1">
                      <span className="text-xl font-black text-slate-800">72</span>
                      <span className="text-[9px] text-slate-500">BPM</span>
                    </div>
                    <span className="text-[8px] font-bold text-emerald-600 mb-2">Normal</span>
                    
                    {/* Animated ECG Waveform */}
                    <div className="absolute bottom-2 left-0 right-0 h-6 opacity-50 flex items-end px-2">
                       <svg className="w-full h-full text-rose-400" viewBox="0 0 100 30" preserveAspectRatio="none">
                         <motion.path 
                           d="M0,15 L20,15 L25,5 L30,25 L35,15 L100,15" 
                           fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                           initial={{ pathLength: 0 }}
                           animate={{ pathLength: 1 }}
                           transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                         />
                       </svg>
                    </div>
                  </motion.div>
                </div>

                {/* Today's Medication Card */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                  className="bg-white rounded-2xl p-3 shadow-sm border border-slate-100"
                >
                  <div className="flex items-center gap-1.5 mb-2">
                    <Pill className="w-3.5 h-3.5 text-indigo-500" />
                    <h3 className="text-[10px] font-bold text-slate-800 uppercase">Today's Medication</h3>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 text-emerald-600" />
                      </div>
                      <span className="text-[10px] font-medium text-slate-500 line-through">Morning Medicine</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                        <Hourglass className="w-2.5 h-2.5 text-amber-600" />
                      </div>
                      <span className="text-[10px] font-bold text-slate-800">Afternoon Medicine</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                        <Clock className="w-2.5 h-2.5 text-slate-400" />
                      </div>
                      <span className="text-[10px] font-medium text-slate-500">Evening Medicine at 8:00 PM</span>
                    </div>
                  </div>
                </motion.div>

                {/* Wellness Progress Section */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
                  className="bg-white rounded-2xl p-3 shadow-sm border border-slate-100 mb-2"
                >
                  <h3 className="text-[10px] font-bold text-slate-800 uppercase mb-3">Wellness Progress</h3>
                  
                  <div className="flex flex-col gap-3">
                    {/* Water */}
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between items-center text-[9px] font-bold">
                        <div className="flex items-center gap-1 text-slate-600"><Droplet className="w-2.5 h-2.5 text-blue-500"/> Water Intake</div>
                        <span className="text-blue-600">85%</span>
                      </div>
                      <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: '85%' }} transition={{ duration: 1, delay: 0.8 }} className="h-full bg-blue-500 rounded-full" />
                      </div>
                    </div>

                    {/* Sleep */}
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between items-center text-[9px] font-bold">
                        <div className="flex items-center gap-1 text-slate-600"><Moon className="w-2.5 h-2.5 text-indigo-500"/> Sleep Quality</div>
                        <span className="text-indigo-600">92%</span>
                      </div>
                      <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: '92%' }} transition={{ duration: 1, delay: 0.9 }} className="h-full bg-indigo-500 rounded-full" />
                      </div>
                    </div>

                    {/* Walk */}
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between items-center text-[9px] font-bold">
                        <div className="flex items-center gap-1 text-slate-600"><Footprints className="w-2.5 h-2.5 text-teal-500"/> Daily Walk Goal</div>
                        <span className="text-teal-600">76%</span>
                      </div>
                      <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: '76%' }} transition={{ duration: 1, delay: 1.0 }} className="h-full bg-teal-500 rounded-full" />
                      </div>
                    </div>

                    {/* Medication */}
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between items-center text-[9px] font-bold">
                        <div className="flex items-center gap-1 text-slate-600"><Pill className="w-2.5 h-2.5 text-emerald-500"/> Medication Adherence</div>
                        <span className="text-emerald-600">100%</span>
                      </div>
                      <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 1, delay: 1.1 }} className="h-full bg-emerald-500 rounded-full" />
                      </div>
                    </div>

                    {/* Mood */}
                    <div className="flex justify-between items-center p-2 bg-slate-50 rounded-lg mt-1 border border-slate-100">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-700">
                        <Smile className="w-3.5 h-3.5 text-orange-500" />
                        Mood Check-in
                      </div>
                      <span className="text-[9px] font-bold bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">Positive</span>
                    </div>

                  </div>
                </motion.div>

              </div>
              
              {/* Fake Home Indicator */}
              <div className="absolute bottom-1.5 inset-x-0 flex justify-center z-50">
                <div className="w-20 h-1 bg-slate-300 rounded-full"></div>
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
