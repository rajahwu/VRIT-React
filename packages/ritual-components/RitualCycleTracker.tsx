import React, { useState, useEffect, useRef } from 'react';

// --- INLINED BRAND TOKENS (For Preview Compatibility) ---
const PHASES = [
  {
    id: 'plan',
    name: 'Plan',
    gesture: 'Name the boundary.',
    prompt: 'What is this session about?',
    duration: 120,
    color: 'bg-amber-500',
    textColor: 'text-amber-500',
    borderColor: 'border-amber-500'
  },
  {
    id: 'sprint',
    name: 'Sprint',
    gesture: 'Work inside the boundary.',
    prompt: 'What happened?',
    duration: 5400,
    color: 'bg-emerald-500',
    textColor: 'text-emerald-500',
    borderColor: 'border-emerald-500'
  },
  {
    id: 'rest',
    name: 'Rest',
    gesture: 'Stop. Mark completion even if incomplete.',
    prompt: 'What state is it in?',
    duration: 300,
    color: 'bg-sky-500',
    textColor: 'text-sky-500',
    borderColor: 'border-sky-500'
  },
  {
    id: 'reflect',
    name: 'Reflect',
    gesture: 'Read what you did.',
    prompt: 'What worked or needs refusing?',
    duration: 300,
    color: 'bg-violet-500',
    textColor: 'text-violet-500',
    borderColor: 'border-violet-500'
  },
  {
    id: 'recover',
    name: 'Recover',
    gesture: 'Clear the space. Reset the loom.',
    prompt: 'Anything to carry forward? (Optional)',
    duration: 120,
    color: 'bg-rose-500',
    textColor: 'text-rose-500',
    borderColor: 'border-rose-500'
  }
];

const THEME = {
  base: {
    background: 'zinc-950',
    text: 'zinc-100',
    border: 'zinc-800',
    muted: 'zinc-600',
    inputBg: 'zinc-900'
  }
};
// --- END INLINED TOKENS ---

// --- TYPES ---
interface CaptureItem {
  id: string;
  text: string;
  timestamp: string;
  phaseContext: string;
}

// Helper functions
function formatTime(seconds: number) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function formatDuration(seconds: number) {
  if (seconds >= 3600) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return mins > 0 ? `${hrs}h ${mins}m` : `${hrs}h`;
  }
  return `${Math.floor(seconds / 60)}m`;
}

export default function RitualCycleTracker() {
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(PHASES[0].duration);
  
  // Session State
  const [sessionData, setSessionData] = useState({
    date: new Date().toLocaleDateString(),
    plan: '',
    sprint: '',
    rest: '',
    reflect: '',
    recover: ''
  });
  
  const [completedSessions, setCompletedSessions] = useState<any[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  
  // Capture Stream State
  const [captures, setCaptures] = useState<CaptureItem[]>([]);
  const [captureInput, setCaptureInput] = useState('');
  const [showCaptures, setShowCaptures] = useState(false); // Toggle visibility of the "Net"

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const currentPhase = PHASES[currentPhaseIndex];

  // Timer Logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(t => t - 1);
      }, 1000);
    } else if (timeRemaining === 0 && isRunning) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeRemaining]);

  // Auto-focus main input on phase change
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [currentPhaseIndex]);

  const handleInputChange = (value: string) => {
    setSessionData(prev => ({
      ...prev,
      [currentPhase.id]: value
    }));
  };

  // --- CAPTURE LOGIC ---
  const handleCaptureSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!captureInput.trim()) return;

    const newCapture: CaptureItem = {
      id: crypto.randomUUID(),
      text: captureInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      phaseContext: currentPhase.name
    };

    setCaptures(prev => [newCapture, ...prev]);
    setCaptureInput('');
  };

  // --- PHASE NAVIGATION ---
  const nextPhase = () => {
    if (currentPhaseIndex < PHASES.length - 1) {
      const nextIndex = currentPhaseIndex + 1;
      setCurrentPhaseIndex(nextIndex);
      setTimeRemaining(PHASES[nextIndex].duration);
      setIsRunning(false);
    } else {
      // Cycle complete
      setCompletedSessions(prev => [...prev, { ...sessionData, completedAt: new Date().toISOString() }]);
      setSessionData({
        date: new Date().toLocaleDateString(),
        plan: '',
        sprint: '',
        rest: '',
        reflect: '',
        recover: ''
      });
      setCurrentPhaseIndex(0);
      setTimeRemaining(PHASES[0].duration);
      setIsRunning(false);
    }
  };

  const prevPhase = () => {
    if (currentPhaseIndex > 0) {
      const prevIndex = currentPhaseIndex - 1;
      setCurrentPhaseIndex(prevIndex);
      setTimeRemaining(PHASES[prevIndex].duration);
      setIsRunning(false);
    }
  };

  const toggleTimer = () => setIsRunning(!isRunning);
  const resetTimer = () => { setTimeRemaining(currentPhase.duration); setIsRunning(false); };
  const skipTimer = () => { setTimeRemaining(0); setIsRunning(false); };

  const progress = ((currentPhase.duration - timeRemaining) / currentPhase.duration) * 100;

  return (
    <div className={`min-h-screen bg-${THEME.base.background} text-${THEME.base.text} p-4 md:p-8 font-sans flex flex-col md:flex-row gap-8`}>
      
      {/* LEFT COLUMN: THE ENGINE (Ritual Cycle) */}
      <div className="flex-1 max-w-2xl mx-auto w-full">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-light tracking-tight">Ritual Cycle</h1>
            <p className={`text-${THEME.base.muted} text-sm mt-1`}>In, through, out, done.</p>
          </div>
          <div className="flex gap-2">
             <button
              onClick={() => setShowCaptures(!showCaptures)}
              className={`md:hidden text-${THEME.base.muted} hover:text-zinc-300 text-sm px-3 py-1 border border-${THEME.base.border} rounded-lg transition-colors`}
            >
              {showCaptures ? 'Hide Net' : `Net (${captures.length})`}
            </button>
            <button
              onClick={() => setShowHistory(!showHistory)}
              className={`text-${THEME.base.muted} hover:text-zinc-300 text-sm px-3 py-1 border border-${THEME.base.border} rounded-lg transition-colors`}
            >
              {showHistory ? 'Current' : `History (${completedSessions.length})`}
            </button>
          </div>
        </div>

        {showHistory ? (
          /* History View */
          <div className="space-y-4 animate-in fade-in duration-300">
             {/* ... existing history code ... */}
            {completedSessions.length === 0 ? (
              <div className={`text-center py-16 text-${THEME.base.muted}`}>
                <p>No completed sessions yet.</p>
                <p className="text-sm mt-2">Complete a cycle to see it here.</p>
              </div>
            ) : (
              completedSessions.map((session, idx) => (
                <div key={idx} className={`bg-zinc-900 border border-${THEME.base.border} rounded-xl p-4 space-y-2`}>
                  <div className={`text-${THEME.base.muted} text-xs`}>{session.date}</div>
                  <div className="space-y-1 text-sm">
                    {PHASES.map(p => (
                      <div key={p.id}>
                        <span className={`${p.textColor} font-medium uppercase text-xs`}>{p.name}:</span>{' '}
                        <span className="text-zinc-300">{session[p.id] || '—'}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          /* Active Session View */
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Phase Indicator */}
            <div className="flex gap-1 mb-8">
              {PHASES.map((phase, idx) => (
                <div
                  key={phase.id}
                  className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                    idx < currentPhaseIndex
                      ? phase.color
                      : idx === currentPhaseIndex
                        ? `${phase.color} opacity-100`
                        : 'bg-zinc-800'
                  }`}
                />
              ))}
            </div>

            {/* Current Phase Card */}
            <div className={`bg-zinc-900 border ${currentPhase.borderColor} border-opacity-30 rounded-2xl p-6 mb-6 transition-colors duration-500 shadow-2xl shadow-zinc-950/50`}>

              {/* Phase Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className={`text-xs font-medium ${currentPhase.textColor} uppercase tracking-wider mb-1`}>
                    Phase {currentPhaseIndex + 1} of {PHASES.length}
                  </div>
                  <h2 className="text-3xl font-light">{currentPhase.name}</h2>
                </div>
                <div className={`text-xs ${currentPhase.textColor} bg-zinc-800 px-2 py-1 rounded font-mono`}>
                  {formatDuration(currentPhase.duration)}
                </div>
              </div>

              {/* Gesture */}
              <p className="text-zinc-400 mb-6 text-sm leading-relaxed">
                {currentPhase.gesture}
              </p>

              {/* Timer */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-4xl font-mono font-light tabular-nums">
                    {formatTime(timeRemaining)}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={toggleTimer}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isRunning
                          ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                          : `${currentPhase.color} text-white hover:opacity-90`
                      }`}
                    >
                      {isRunning ? 'Pause' : 'Start'}
                    </button>
                    <button
                      onClick={resetTimer}
                      className="px-3 py-2 rounded-lg text-sm text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-colors"
                    >
                      Reset
                    </button>
                    <button
                      onClick={skipTimer}
                      className="px-3 py-2 rounded-lg text-sm text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-colors"
                    >
                      Skip
                    </button>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${currentPhase.color} transition-all duration-1000 ease-linear`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Input */}
              <div>
                <label className={`block ${THEME.base.muted} text-sm mb-2`}>
                  {currentPhase.prompt}
                </label>
                <textarea
                  ref={textareaRef}
                  value={(sessionData as any)[currentPhase.id]}
                  onChange={(e) => handleInputChange(e.target.value)}
                  placeholder="One line. Keep it atomic."
                  className={`w-full bg-${THEME.base.inputBg} border ${THEME.base.border} rounded-xl p-4 text-${THEME.base.text} placeholder-zinc-700 focus:outline-none focus:border-zinc-600 resize-none transition-colors font-sans`}
                  rows={3}
                />
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <button
                onClick={prevPhase}
                disabled={currentPhaseIndex === 0}
                className={`px-4 py-2 text-sm text-${THEME.base.muted} hover:text-zinc-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors`}
              >
                ← Previous
              </button>

              <button
                onClick={nextPhase}
                className={`px-6 py-3 rounded-xl text-sm font-medium ${currentPhase.color} text-white hover:opacity-90 transition-opacity`}
              >
                {currentPhaseIndex === PHASES.length - 1 ? 'Complete Cycle' : 'Next Phase →'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* RIGHT COLUMN: THE NET (Parallel Capture Stream) */}
      {/* Hidden on mobile unless toggled, always visible on desktop */}
      <div className={`
        fixed inset-0 z-50 bg-zinc-950 p-6 md:static md:bg-transparent md:p-0 md:z-auto md:w-80 md:block
        ${showCaptures ? 'block' : 'hidden'}
      `}>
        <div className="h-full flex flex-col border-l border-zinc-900 md:pl-8">
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <div>
              <h2 className="text-lg font-light tracking-tight text-zinc-400">The Net</h2>
              <p className="text-zinc-600 text-xs mt-0.5">Catch drift without stopping.</p>
            </div>
            <button 
              onClick={() => setShowCaptures(false)}
              className="md:hidden text-zinc-500 hover:text-white"
            >
              ✕
            </button>
          </div>

          {/* Quick Capture Input */}
          <form onSubmit={handleCaptureSubmit} className="mb-6">
            <input
              type="text"
              value={captureInput}
              onChange={(e) => setCaptureInput(e.target.value)}
              placeholder="Quick capture..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-zinc-700 transition-colors"
            />
          </form>

          {/* Capture List (The Vault) */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-2">
            {captures.length === 0 ? (
              <div className="text-center py-8 text-zinc-700 text-sm italic">
                Net is empty.
              </div>
            ) : (
              captures.map((cap) => (
                <div key={cap.id} className="group bg-zinc-900/50 border border-zinc-800/50 hover:border-zinc-700 rounded-lg p-3 transition-all">
                  <div className="text-zinc-300 text-sm mb-1.5 break-words">{cap.text}</div>
                  <div className="flex items-center justify-between text-[10px] text-zinc-600 font-mono">
                    <span>{cap.timestamp}</span>
                    <span className="uppercase tracking-wider opacity-60 group-hover:opacity-100 transition-opacity">{cap.phaseContext}</span>
                  </div>
                </div>
              ))
            )}
          </div>
          
           {/* Vault Footer */}
           {captures.length > 0 && (
             <div className="mt-4 pt-4 border-t border-zinc-900 text-center">
               <button 
                onClick={() => setCaptures([])}
                className="text-xs text-zinc-700 hover:text-rose-900 transition-colors"
               >
                 Clear Net
               </button>
             </div>
           )}
        </div>
      </div>

    </div>
  );
}
