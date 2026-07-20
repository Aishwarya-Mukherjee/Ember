const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf-8');

// Container & Background
content = content.replace('bg-black font-sans text-white', 'bg-slate-50 font-sans text-slate-900');
content = content.replace('opacity-45', 'opacity-15');
content = content.replace('from-black via-black/75 to-transparent', 'from-slate-50/95 via-slate-50/80 to-slate-50/30');

// Transition
content = content.replace('bg-black flex flex-col', 'bg-slate-50 flex flex-col');
content = content.replace('border-cyan-500/30', 'border-cyan-600/30');
content = content.replace('text-cyan-400 z-10', 'text-cyan-600 z-10');
content = content.replace('text-cyan-400 uppercase', 'text-cyan-600 uppercase');

// Nav
content = content.replace('fill-white', 'fill-cyan-600');
content = content.replace('text-white transition-opacity', 'text-slate-800 transition-opacity hover:text-cyan-600');
content = content.replace(/text-white\/70 hover:text-white/g, 'text-slate-600 hover:text-cyan-600');
content = content.replace(/text-white\/80/g, 'text-slate-600');
content = content.replace('hover:bg-white/20', 'hover:bg-cyan-50');
content = content.replace('text-white transition-all', 'text-slate-800 transition-all'); // Menu icons
content = content.replace('bg-black/90', 'bg-white/95');
content = content.replace('text-2xl font-medium text-white', 'text-2xl font-medium text-slate-900');

// Hero Title & Text
content = content.replace('text-white tracking-[-0.05em]', 'text-slate-900 tracking-[-0.05em]');
content = content.replace('from-cyan-400 via-teal-300 to-emerald-400', 'from-cyan-600 via-teal-500 to-emerald-600');
content = content.replace('text-white/70 max-w-lg', 'text-slate-600 max-w-lg');
content = content.replace('text-cyan-400 animate-pulse', 'text-cyan-500 animate-pulse');

// Button
content = content.replace('group liquid-glass rounded-full px-7 py-3.5 text-sm font-medium text-white flex items-center gap-2 hover:bg-white/15 transition-all duration-300 hover:scale-[1.03] active:scale-95 shadow-[0_0_30px_rgba(6,182,212,0.15)] hover:shadow-[0_0_40px_rgba(6,182,212,0.3)] cursor-pointer bg-transparent border-none outline-none', 'group rounded-full bg-cyan-600 hover:bg-cyan-700 px-7 py-3.5 text-sm font-medium text-white flex items-center gap-2 transition-all duration-300 hover:scale-[1.03] active:scale-95 shadow-[0_8px_20px_rgba(6,182,212,0.25)] cursor-pointer outline-none border-none');

// Widgets
content = content.replace(/text-white\/50/g, 'text-slate-500');
content = content.replace(/font-bold text-white tracking-wide/g, 'font-bold text-slate-800 tracking-wide');
content = content.replace('text-emerald-400 tracking-wide', 'text-emerald-600 tracking-wide');

// Stats Footer
content = content.replace('border-white/10', 'border-slate-200');
content = content.replace(/text-white tracking-tight/g, 'text-slate-800 tracking-tight');
content = content.replace(/text-white\/60/g, 'text-slate-500');
content = content.replace(/bg-white\/60/g, 'bg-cyan-600/40');

// Problem Section
content = content.replace('hover:border-cyan-500/30 hover:bg-white/10', 'hover:border-cyan-200 hover:bg-white/60');
content = content.replace(/tracking-tight text-white/g, 'tracking-tight text-slate-900');
content = content.replace(/text-white\/60/g, 'text-slate-600');
content = content.replace('border-white/5', 'border-slate-200');
content = content.replace('text-cyan-400 transition-colors', 'text-cyan-600 transition-colors');
content = content.replace('text-pink-400', 'text-pink-600');
content = content.replace('text-blue-400', 'text-blue-600');
content = content.replace('text-emerald-400', 'text-emerald-600');

// CSS Styles
content = content.replace(/rgba\(255, 255, 255, 0.08\)/, 'rgba(255, 255, 255, 0.7)');
content = content.replace(/rgba\(255, 255, 255, 0.12\)/, 'rgba(255, 255, 255, 0.4)');
content = content.replace(/rgba\(0, 0, 0, 0.3\)/, 'rgba(0, 0, 0, 0.05)');

fs.writeFileSync('app/page.tsx', content, 'utf-8');
console.log('Update complete');
