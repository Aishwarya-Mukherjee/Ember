"use client";

import React, { useState, useEffect } from "react";
import { X, Sparkles, CheckSquare, Pill, Activity, MessageSquare } from "lucide-react";

interface DoctorCanvasProps {
  onListeningChange?: (listening: boolean) => void;
  onSelectAction?: (action: string) => void;
}

export default function DoctorCanvas({ onListeningChange, onSelectAction }: DoctorCanvasProps) {
  const [listening, setListening] = useState(false);
  const [tapping, setTapping] = useState(false);

  // Bubble states
  const [bubbleState, setBubbleState] = useState<'hidden' | 'entering' | 'typing' | 'done'>('hidden');
  const [displayedText, setDisplayedText] = useState("");
  const fullText = "Hi Meera,\n\nI'm Ember, your AI Health Companion.\n\nI've analyzed today's health summary.\n\nEverything looks stable.\nWould you like to do a quick check-in?";

  const handleChipClick = (actionText: string) => {
    setDisplayedText(`Got it! Opening ${actionText} mode...`);
    setBubbleState('done');
    onSelectAction?.(actionText);
  };

  useEffect(() => {
    // Wait for the doctor entrance animation, then show the bubble
    const timer = setTimeout(() => {
      setBubbleState('entering');
      setTimeout(() => setBubbleState('typing'), 600);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (bubbleState === 'typing') {
      let index = 0;
      const interval = setInterval(() => {
        setDisplayedText(fullText.slice(0, index + 1));
        index++;
        if (index >= fullText.length) {
          clearInterval(interval);
          setBubbleState('done');
        }
      }, 25);
      return () => clearInterval(interval);
    }
  }, [bubbleState]);

  const toggle = () => {
    setTapping(false);
    requestAnimationFrame(() => {
      setTapping(true);
      setTimeout(() => setTapping(false), 340);
    });
    setListening((prev) => {
      const next = !prev;
      if (next) {
        setBubbleState('hidden');
      }
      onListeningChange?.(next);
      return next;
    });
  };

  const CSS = `
    .dc-stage { position:relative; width:100%; max-width:600px; height:460px; display:flex; align-items:flex-end; justify-content:center; margin-bottom:100px; }
    .dc-ambient { position:absolute; top:20px; width:260px; height:260px; border-radius:50%; background:radial-gradient(circle, rgba(6,182,212,0.35), transparent 70%); filter:blur(10px); opacity:.7; transition:opacity .4s ease, transform .6s ease; pointer-events:none; }
    .dc-stage.dc-active .dc-ambient { opacity:1; transform:scale(1.15); }
    
    .dc-wrap { position:relative; width:100%; height:400px; }
    
    .dc-shadow { position:absolute; bottom:6px; left:50%; transform:translateX(-50%); width:150px; height:22px; background:radial-gradient(ellipse, rgba(22,78,99,0.28), transparent 70%); border-radius:50%; filter:blur(2px); pointer-events:none; }
    
    .dc-pose { position:absolute; inset:0; display:flex; align-items:flex-end; justify-content:center; opacity:0; transform:translateY(6px); transition:opacity .5s ease, transform .5s ease; pointer-events:none; }
    .dc-pose.dc-visible { opacity:1; transform:translateY(0); }
    .dc-pose svg { width:100%; height:auto; display:block; }
    
    .dc-mic-zone { position:absolute; bottom:-34px; left:50%; transform:translateX(-50%); display:flex; flex-direction:column; align-items:center; gap:8px; z-index:5; }
    .dc-mic-inner { position:relative; display:flex; align-items:center; justify-content:center; }
    .dc-mic-btn { position:relative; width:64px; height:64px; border-radius:50%; border:none; cursor:pointer; background:linear-gradient(135deg, #06b6d4, #0891b2); box-shadow:0 8px 24px rgba(6,182,212,0.35); display:flex; align-items:center; justify-content:center; color:white; outline:none; transition:transform .15s ease; animation:dcIdlePulse 2.6s ease-in-out infinite; z-index:1; padding:0; }
    .dc-mic-btn:active { transform:scale(.92); }
    .dc-tap { animation:dcTapBounce .32s ease forwards !important; }
    .dc-active .dc-mic-btn { animation:none; box-shadow:0 8px 34px rgba(6,182,212,0.35), 0 0 0 6px rgba(6,182,212,0.12); }
    
    .dc-ripple { position:absolute; inset:0; border-radius:50%; border:2px solid #06b6d4; opacity:0; pointer-events:none; }
    .dc-active .dc-ripple:nth-child(1){ animation:dcRippleOut 1.8s ease-out 0.0s infinite; }
    .dc-active .dc-ripple:nth-child(2){ animation:dcRippleOut 1.8s ease-out 0.5s infinite; }
    .dc-active .dc-ripple:nth-child(3){ animation:dcRippleOut 1.8s ease-out 1.0s infinite; }
    
    .dc-icon-mic, .dc-icon-wave { position:absolute; display:flex; align-items:center; justify-content:center; transition:opacity .2s ease, transform .2s ease; }
    .dc-icon-mic { opacity:1; transform:scale(1); }
    .dc-icon-wave { opacity:0; transform:scale(.7); gap:3px; }
    .dc-active .dc-icon-mic { opacity:0; transform:scale(.7); }
    .dc-active .dc-icon-wave { opacity:1; transform:scale(1); }
    
    .dc-bar { width:3px; background:#fff; border-radius:2px; height:6px; }
    .dc-active .dc-bar:nth-child(1){ animation:dcBar 1s ease-in-out 0.00s infinite; }
    .dc-active .dc-bar:nth-child(2){ animation:dcBar 1s ease-in-out 0.15s infinite; }
    .dc-active .dc-bar:nth-child(3){ animation:dcBar 1s ease-in-out 0.30s infinite; }
    .dc-active .dc-bar:nth-child(4){ animation:dcBar 1s ease-in-out 0.45s infinite; }
    .dc-active .dc-bar:nth-child(5){ animation:dcBar 1s ease-in-out 0.60s infinite; }
    
    .dc-caption { font-size:13px; font-weight:600; color:#0891b2; background:#fff; padding:6px 14px; border-radius:20px; box-shadow:0 4px 14px rgba(8,145,178,0.12); white-space:nowrap; user-select:none; }
    
    /* SPEECH BUBBLE */
    .dc-bubble-wrap {
      position: absolute;
      bottom: 250px;
      left: 50%;
      width: min(360px, 90vw);
      margin-left: calc(-0.5 * min(360px, 90vw));
      opacity: 0;
      transform: translateY(15px) scale(0.95);
      transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
      pointer-events: none;
      z-index: 10;
    }
    .dc-bubble-wrap.dc-show {
      opacity: 1;
      transform: translateY(0) scale(1);
      pointer-events: auto;
    }
    .dc-bubble {
      position: relative;
      background: rgba(255, 255, 255, 0.65);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      border-radius: 24px;
      border: 1px solid rgba(255, 255, 255, 0.9);
      box-shadow: 0 20px 40px rgba(8, 145, 178, 0.15), inset 0 0 0 1px rgba(6, 182, 212, 0.1);
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      animation: dcFloat 5s ease-in-out infinite;
    }
    .dc-bubble::before {
       content: '';
       position: absolute;
       inset: 0;
       border-radius: 24px;
       background: radial-gradient(circle at top left, rgba(6, 182, 212, 0.08), transparent 70%);
       pointer-events: none;
    }
    .dc-bubble::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 50%;
      margin-left: -8px;
      width: 16px;
      height: 16px;
      background: rgba(255, 255, 255, 0.75);
      border-bottom: 1px solid rgba(255, 255, 255, 0.9);
      border-right: 1px solid rgba(255, 255, 255, 0.9);
      transform: rotate(45deg);
      border-radius: 3px;
      backdrop-filter: blur(24px);
      box-shadow: 2px 2px 4px rgba(8, 145, 178, 0.05);
    }
    @keyframes dcFloat {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-6px); }
    }
    .dc-bubble-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      z-index: 2;
    }
    .dc-bubble-title {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      font-weight: 700;
      color: #0891b2;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .dc-bubble-close {
      background: none;
      border: none;
      color: #736f8a;
      cursor: pointer;
      padding: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      transition: background 0.2s, color 0.2s;
    }
    .dc-bubble-close:hover {
      background: rgba(0,0,0,0.05);
      color: #1f1b2e;
    }
    .dc-bubble-text {
      font-size: 14.5px;
      line-height: 1.5;
      color: #2d2842;
      white-space: pre-wrap;
      min-height: 115px;
      position: relative;
      z-index: 2;
      font-weight: 500;
    }
    .dc-typing-indicator {
      display: inline-flex;
      gap: 3px;
      align-items: center;
      margin-left: 6px;
    }
    .dc-typing-dot {
      width: 4px;
      height: 4px;
      background: #06b6d4;
      border-radius: 50%;
      animation: dcTyping 1.4s infinite ease-in-out both;
    }
    .dc-typing-dot:nth-child(1) { animation-delay: -0.32s; }
    .dc-typing-dot:nth-child(2) { animation-delay: -0.16s; }
    @keyframes dcTyping {
      0%, 80%, 100% { transform: scale(0); opacity: 0.5; }
      40% { transform: scale(1); opacity: 1; }
    }
    .dc-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 4px;
      opacity: 0;
      transform: translateY(8px);
      transition: opacity 0.5s ease 0.2s, transform 0.5s ease 0.2s;
      pointer-events: none;
      position: relative;
      z-index: 2;
    }
    .dc-chips.dc-show {
      opacity: 1;
      transform: translateY(0);
      pointer-events: auto;
    }
    .dc-chip {
      background: rgba(255, 255, 255, 0.8);
      border: 1px solid rgba(6, 182, 212, 0.2);
      color: #0891b2;
      font-size: 12.5px;
      font-weight: 600;
      padding: 6px 12px;
      border-radius: 16px;
      cursor: pointer;
      transition: all 0.2s;
      box-shadow: 0 2px 8px rgba(90, 60, 200, 0.05);
    }
    .dc-chip:hover {
      background: #fff;
      border-color: rgba(6, 182, 212, 0.4);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(8, 145, 178, 0.1);
    }

    @keyframes dcIdlePulse { 0%,100%{box-shadow:0 8px 24px rgba(6,182,212,0.35);} 50%{box-shadow:0 8px 34px rgba(6,182,212,0.35), 0 0 0 6px rgba(6,182,212,0.12);} }
    @keyframes dcTapBounce { 0%{transform:scale(1);} 40%{transform:scale(.86);} 100%{transform:scale(1);} }
    @keyframes dcRippleOut { 0%{transform:scale(1);opacity:.55;} 100%{transform:scale(2.1);opacity:0;} }
    @keyframes dcBar { 0%,100%{height:6px;} 50%{height:22px;} }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <div className={`dc-stage${listening ? " dc-active" : ""}`}>
        <div className="dc-ambient"></div>

        <div className="dc-wrap">
          <div className="dc-shadow"></div>

          {/* SPEECH BUBBLE */}
          {bubbleState !== 'hidden' && (
            <div className={`dc-bubble-wrap ${bubbleState !== 'entering' ? 'dc-show' : ''}`}>
              <div className="dc-bubble">
                <div className="dc-bubble-header">
                  <div className="dc-bubble-title">
                    <Sparkles className="w-4 h-4" />
                    Ember AI
                  </div>
                  <button className="dc-bubble-close" onClick={() => setBubbleState('hidden')} aria-label="Close">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="dc-bubble-text">
                  {displayedText}
                  {bubbleState === 'typing' && (
                    <span className="dc-typing-indicator">
                      <span className="dc-typing-dot" />
                      <span className="dc-typing-dot" />
                      <span className="dc-typing-dot" />
                    </span>
                  )}
                </div>

                <div className={`dc-chips ${bubbleState === 'done' ? 'dc-show' : ''}`}>
                  <button className="dc-chip" onClick={() => handleChipClick("Check-in")}><CheckSquare className="w-3.5 h-3.5 inline mr-1 mb-0.5" /> Start Check-in</button>
                  <button className="dc-chip" onClick={() => handleChipClick("Medications")}><Pill className="w-3.5 h-3.5 inline mr-1 mb-0.5" /> Medications</button>
                  <button className="dc-chip" onClick={() => handleChipClick("My Health")}><Activity className="w-3.5 h-3.5 inline mr-1 mb-0.5" /> My Health</button>
                  <button className="dc-chip" onClick={() => handleChipClick("Ask Anything")}><MessageSquare className="w-3.5 h-3.5 inline mr-1 mb-0.5" /> Ask Anything</button>
                </div>
              </div>
            </div>
          )}

          {/* IDLE POSE */}
          <div className={`dc-pose${!listening ? " dc-visible" : ""}`}>
            <img src="/Bot.png" alt="AI Companion" className="w-full max-w-[640px] aspect-square object-contain drop-shadow-2xl translate-y-[30%]" />
          </div>

          {/* LISTENING POSE */}
          <div className={`dc-pose${listening ? " dc-visible" : ""}`}>
            <img src="/Bot.png" alt="AI Companion Listening" className="w-full max-w-[640px] aspect-square object-contain drop-shadow-2xl translate-y-[30%] scale-105 transition-transform duration-500 brightness-110" />
          </div>

          <div className="dc-mic-zone">
            <div className="dc-mic-inner">
              <span className="dc-ripple" />
              <span className="dc-ripple" />
              <span className="dc-ripple" />

              <button
                className={`dc-mic-btn${tapping ? " dc-tap" : ""}`}
                onClick={toggle}
                aria-label={listening ? "Stop listening" : "Tap to talk"}
                aria-pressed={listening}
                type="button"
              >
                <span className="dc-icon-mic">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect x="9" y="2" width="6" height="12" rx="3" fill="#fff" />
                    <path d="M5 11a7 7 0 0 0 14 0" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                    <line x1="12" y1="18" x2="12" y2="22" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </span>
                <span className="dc-icon-wave">
                  <span className="dc-bar" />
                  <span className="dc-bar" />
                  <span className="dc-bar" />
                  <span className="dc-bar" />
                  <span className="dc-bar" />
                </span>
              </button>
            </div>

            <div className="dc-caption">
              {listening ? "Listening\u2026" : "Tap to talk"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
