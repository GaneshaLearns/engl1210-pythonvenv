import React, { useState, useEffect } from 'react';
import {
  Terminal,
  ChevronLeft,
  ChevronRight,
  Monitor,
  BookOpen,
  Menu,
  X,
  Sparkles,
  Clipboard,
  CheckCircle,
  HelpCircle,
  Info,
  ChevronDown
} from 'lucide-react';
import { OperatingSystem } from './types';
import { PAGES } from './data/guideData';
import GoogleSiteViewer from './components/GoogleSiteViewer';

export default function App() {
  const [activePageId, setActivePageId] = useState<string>('home');
  const [os, setOs] = useState<OperatingSystem>('windows');
  const [headerStyle, setHeaderStyle] = useState<string>('slate');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true); // Left Nav
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  // Find active page
  const activePage = PAGES.find(p => p.id === activePageId) || PAGES[0];
  const activePageIndex = PAGES.findIndex(p => p.id === activePageId);

  // Sync title and header on page load
  useEffect(() => {
    document.title = `${activePage.title} | Python venv Site Guide`;
  }, [activePage]);

  // Next and Previous page helpers
  const handleNextPage = () => {
    if (activePageIndex < PAGES.length - 1) {
      setActivePageId(PAGES[activePageIndex + 1].id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevPage = () => {
    if (activePageIndex > 0) {
      setActivePageId(PAGES[activePageIndex - 1].id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleStepComplete = (figureId: number) => {
    if (!completedSteps.includes(figureId)) {
      setCompletedSteps(prev => [...prev, figureId]);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col font-sans text-slate-400 selection:bg-blue-600 selection:text-white">
      {/* GLOBAL TOP NAV BAR */}
      <header className="h-16 bg-slate-950/80 backdrop-blur-md text-white border-b border-slate-800 sticky top-0 z-40 shadow-xl">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* Hamburger for mobile navigation */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 md:hidden hover:bg-slate-900 rounded transition-colors mr-1 cursor-pointer"
              title="Menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            {/* Application Logo & Title */}
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActivePageId('home')}>
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20">
                P
              </div>
              <div>
                <span className="text-slate-100 font-semibold tracking-tight uppercase text-sm">Python Venv Guide</span>
                <span className="text-[10px] text-slate-500 block -mt-1 font-semibold uppercase tracking-wider">Step-by-Step CLI Sandbox Guide</span>
              </div>
            </div>
          </div>

          {/* Controls: OS Toggle */}
          <div className="hidden md:flex items-center space-x-6">
            {/* OS Selector */}
            <div className="flex items-center space-x-2 bg-slate-900/50 p-1 rounded-lg border border-slate-800">
              <span className="text-[10px] uppercase tracking-wider text-slate-500 px-2 font-bold">Terminal OS:</span>
              <button
                onClick={() => setOs('windows')}
                className={`px-3 py-1 text-xs rounded font-bold cursor-pointer transition-all uppercase tracking-wide ${
                  os === 'windows'
                    ? 'bg-blue-600 text-white shadow shadow-blue-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                Windows (CMD/PS)
              </button>
              <button
                onClick={() => setOs('macos')}
                className={`px-3 py-1 text-xs rounded font-bold cursor-pointer transition-all uppercase tracking-wide ${
                  os === 'macos'
                    ? 'bg-blue-600 text-white shadow shadow-blue-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                macOS
              </button>
              <button
                onClick={() => setOs('linux')}
                className={`px-3 py-1 text-xs rounded font-bold cursor-pointer transition-all uppercase tracking-wide ${
                  os === 'linux'
                    ? 'bg-blue-600 text-white shadow shadow-blue-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                Linux
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE OS SELECTOR EXPANDED BANNER */}
      <div className="md:hidden bg-slate-950 px-4 py-2 flex flex-col space-y-2 border-b border-slate-800 text-white">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Target OS:</span>
          <div className="flex space-x-1">
            {['windows', 'macos', 'linux'].map((sys) => (
              <button
                key={sys}
                onClick={() => setOs(sys as OperatingSystem)}
                className={`px-2 py-0.5 text-[10px] rounded font-bold uppercase ${
                  os === sys ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {sys}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* WORKSPACE AREA CONTAINER */}
      <div className="flex-1 max-w-7xl w-full mx-auto flex relative overflow-hidden">
        
        {/* LEFT NAV BAR: Google Sites Layout list */}
        <aside
          className={`shrink-0 bg-[#090d16] border-r border-slate-800 w-64 flex flex-col p-4 space-y-6 md:block ${
            mobileMenuOpen ? 'fixed inset-y-0 left-0 z-30 pt-16 bg-[#090d16] w-72 shadow-2xl block' : 'hidden'
          }`}
        >
          <div className="space-y-1">
            <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block px-3 mb-4">
              Course Structure
            </span>
            {PAGES.map((p) => {
              const isActive = activePageId === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => {
                    setActivePageId(p.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2.5 rounded-l-md text-xs font-semibold transition-all flex items-center justify-between cursor-pointer ${
                    isActive
                      ? 'bg-blue-500/10 text-white border-r-3 border-blue-500 pl-2'
                      : 'text-slate-400 hover:bg-slate-900/55 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center space-x-2 truncate">
                    <BookOpen className={`h-3.5 w-3.5 shrink-0 ${isActive ? 'text-blue-400' : 'text-slate-500'}`} />
                    <span className="truncate">{p.id === 'home' ? 'Home Page' : p.title.split(': ')[1]}</span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-auto p-4 bg-slate-950/60 border border-slate-800 rounded-lg text-[11px] leading-relaxed text-slate-500">
            <div className="flex items-center space-x-2 mb-1.5 text-slate-300 font-bold uppercase tracking-wider">
              <Sparkles className="h-3 w-3 text-blue-400" />
              <span>Interactive Guide</span>
            </div>
            Each page contains real interactive terminal simulations to confirm and visual-check outputs!
          </div>
        </aside>

        {/* Backdrop for mobile sidebar */}
        {mobileMenuOpen && (
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/60 z-20 md:hidden"
          />
        )}

        {/* CENTER MAIN WRAPPER */}
        <main className="flex-1 flex flex-col overflow-x-hidden bg-[#020617]">
          <div className="flex-1 flex flex-col">
            <GoogleSiteViewer
              page={activePage}
              os={os}
              headerStyle={headerStyle}
              onStepComplete={handleStepComplete}
            />

            {/* NEXT/PREV BOTTOM ROUTING BAR */}
            <div className="bg-slate-950 border-t border-slate-850 px-6 py-4 flex items-center justify-between">
              <button
                onClick={handlePrevPage}
                disabled={activePageIndex === 0}
                className={`flex items-center space-x-1.5 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activePageIndex === 0
                    ? 'text-slate-600 bg-slate-900/30 cursor-not-allowed border border-slate-900'
                    : 'text-slate-300 bg-slate-900 border border-slate-800 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                <span>Previous</span>
              </button>

              <div className="text-xs text-slate-500 font-mono hidden sm:block">
                SECTION {activePageIndex + 1} OF {PAGES.length}
              </div>

              <button
                onClick={handleNextPage}
                disabled={activePageIndex === PAGES.length - 1}
                className={`flex items-center space-x-1.5 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activePageIndex === PAGES.length - 1
                    ? 'text-slate-600 bg-slate-900/30 cursor-not-allowed border border-slate-900'
                    : 'text-white bg-blue-600 hover:bg-blue-500 shadow shadow-blue-500/15'
                }`}
              >
                <span>Next Section</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* COMPACT FOOTER */}
      <footer className="bg-slate-950 text-slate-400 py-6 border-t border-slate-900 text-center text-xs">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Python Virtual Environment Guide.</p>
          <p className="text-[11px] text-slate-500">
            A comprehensive, interactive developer sandbox resource. Python is a registered trademark of the Python Software Foundation.
          </p>
        </div>
      </footer>
    </div>
  );
}
