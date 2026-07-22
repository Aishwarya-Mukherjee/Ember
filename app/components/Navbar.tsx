import React from 'react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Brand Identity */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white font-bold text-lg leading-none">
            E
          </div>
          <span className="font-bold text-xl text-slate-900 tracking-tight">Ember</span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <Link href="#overview" className="hover:text-teal-600 transition-colors">Overview</Link>
          <Link href="#features" className="hover:text-teal-600 transition-colors">Features</Link>
          <Link href="#documentation" className="hover:text-teal-600 transition-colors">Documentation</Link>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <Link href="/signin" className="text-sm font-medium text-slate-600 hover:text-teal-600 transition-colors hidden sm:block">
            Sign In
          </Link>
          <Link href="/get-started" className="px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium shadow-sm transition-all">
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
