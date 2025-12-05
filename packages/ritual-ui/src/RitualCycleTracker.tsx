import React, { useState, useEffect, useRef } from 'react';
import { PHASES } from '@gttm/ritual-brand';

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

interface CompletedSession {
  date: string;
  plan: string;
  sprint: string;
  rest: string;
  reflect: string;
  recover: string;
  completedAt: string;
}

export default function RitualCycleTracker() {
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(PHASES[0].duration);
  const [sessionData, setSessionData] = useState({
    date: new Date().toLocaleDateString(),
    plan: '',
    sprint: '',
    rest: '',
    reflect: '',
    recover: ''
  });
  const [completedSessions, setCompletedSessions] = useState<CompletedSession[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const currentPhase = PHASES[currentPhaseIndex];

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(t => t - 1);
      }, 1000);
    } else if (timeRemaining === 0 && isRunning) {
      // Auto-advance or notify
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeRemaining]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [currentPhaseIndex]);

  const handleInputChange = (value: string) => {
    setSessionData(prev => ({
      ...prev,
      [currentPhase.id as keyof typeof sessionData]: value
    }));
  };

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

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setTimeRemaining(currentPhase.duration);
    setIsRunning(false);
  };

  const skipTimer = () => {
    setTimeRemaining(0);
    setIsRunning(false);
  };

  const progress = ((currentPhase.duration - timeRemaining) / currentPhase.duration) * 100;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-light tracking-tight">Ritual Cycle</h1>
            <p className="text-zinc-500 text-sm mt-1">In, through, out, done.</p>
          </div>
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="text-zinc-500 hover:text-zinc-300 text-sm px-3 py-1 border border-zinc-800 rounded-lg transition-colors"
          >
            {showHistory ? 'Current' : `History (${completedSessions.length})`}
          </button>
        </div>

        {showHistory ? (
          /* History View */
          <div className="space-y-4">
            {completedSessions.length === 0 ? (
              <div className="text-center py-16 text-zinc-600">
                <p>No completed sessions yet.</p>
                <p className="text-sm mt-2">Complete a cycle to see it here.</p>
              </div>
            ) : (
              completedSessions.map((session, idx) => (
                <div key={idx} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 space-y-2">
                  <div className="text-zinc-500 text-xs">{session.date}</div>
                  <div className="space-y-1 text-sm">
                    <div><span className="text-amber-500 font-medium">PLAN:</span> {session.plan || '—'}</div>
                    <div><span className="text-emerald-500 font-medium">SPRINT:</span> {session.sprint || '—'}</div>
                    <div><span className="text-sky-500 font-medium">REST:</span> {session.rest || '—'}</div>
                    <div><span className="text-violet-500 font-medium">REFLECT:</span> {session.reflect || '—'}</div>
                    {session.recover && <div><span className="text-rose-500 font-medium">RECOVER:</span> {session.recover}</div>}
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          /* Active Session View */
          <>
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
            <div className={`bg-zinc-900 border ${currentPhase.borderColor} border-opacity-30 rounded-2xl p-6 mb-6`}>
              
              {/* Phase Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className={`text-xs font-medium ${currentPhase.textColor} uppercase tracking-wider mb-1`}>
                    Phase {currentPhaseIndex + 1} of {PHASES.length}
                  </div>
                  <h2 className="text-3xl font-light">{currentPhase.name}</h2>
                </div>
                <div className={`text-xs ${currentPhase.textColor} bg-zinc-800 px-2 py-1 rounded`}>
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
                <label className="block text-zinc-500 text-sm mb-2">
                  {currentPhase.prompt}
                </label>
                <textarea
                  ref={textareaRef}
                  value={sessionData[currentPhase.id as keyof typeof sessionData]}
                  onChange={(e) => handleInputChange(e.target.value)}
                  placeholder="One line. Keep it atomic."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-zinc-100 placeholder-zinc-700 focus:outline-none focus:border-zinc-600 resize-none transition-colors"
                  rows={3}
                />
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <button
                onClick={prevPhase}
                disabled={currentPhaseIndex === 0}
                className="px-4 py-2 text-sm text-zinc-500 hover:text-zinc-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
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

            {/* Session Preview */}
            <div className="mt-8 pt-8 border-t border-zinc-800">
              <h3 className="text-zinc-500 text-xs uppercase tracking-wider mb-4">Session Record</h3>
              <div className="bg-zinc-900 rounded-xl p-4 font-mono text-sm space-y-1">
                <div className="text-zinc-600">SESSION: {sessionData.date}</div>
                <div><span className="text-amber-500">PLAN:</span> <span className="text-zinc-400">{sessionData.plan || '—'}</span></div>
                <div><span className="text-emerald-500">SPRINT:</span> <span className="text-zinc-400">{sessionData.sprint || '—'}</span></div>
                <div><span className="text-sky-500">REST:</span> <span className="text-zinc-400">{sessionData.rest || '—'}</span></div>
                <div><span className="text-violet-500">REFLECT:</span> <span className="text-zinc-400">{sessionData.reflect || '—'}</span></div>
                <div><span className="text-rose-500">RECOVER:</span> <span className="text-zinc-400">{sessionData.recover || '(optional)'}</span></div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
