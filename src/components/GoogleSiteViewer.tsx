import React from 'react';
import { Terminal, ShieldAlert, FileText, Settings, Sparkles, Check, CheckCircle } from 'lucide-react';
import { PageContent, Section, OperatingSystem } from '../types';
import TerminalMock from './TerminalMock';
import { TERMINAL_COMMANDS_STEPS } from '../data/guideData';

interface GoogleSiteViewerProps {
  page: PageContent;
  os: OperatingSystem;
  headerStyle: string; // 'slate' | 'royal' | 'teal' | 'sunset'
  onStepComplete?: (figureId: number) => void;
}

export default function GoogleSiteViewer({
  page,
  os,
  headerStyle,
  onStepComplete
}: GoogleSiteViewerProps) {
  // Helper to resolve header styles
  const getHeaderBg = () => {
    switch (headerStyle) {
      case 'royal':
        return 'from-blue-900 to-indigo-950 border border-blue-900/30';
      case 'teal':
        return 'from-teal-900 to-cyan-950 border border-teal-900/30';
      case 'sunset':
        return 'from-amber-800 via-rose-950 to-violet-950 border border-rose-900/30';
      case 'slate':
      default:
        return 'from-slate-900 to-slate-950 border border-slate-850';
    }
  };

  // Helper to dynamically translate code blocks or paths depending on selected OS
  const getOSSpecificCode = (rawCode: string, title?: string): string => {
    // If the title explicitly targets another operating system or shell, DO NOT translate it!
    if (title) {
      const lowerTitle = title.toLowerCase();
      const isWindowsTarget = lowerTitle.includes('windows') || lowerTitle.includes('powershell') || lowerTitle.includes('command prompt') || lowerTitle.includes('cmd');
      const isUnixTarget = lowerTitle.includes('macos') || lowerTitle.includes('linux') || lowerTitle.includes('bash') || lowerTitle.includes('zsh') || lowerTitle.includes('terminal');
      
      if (os === 'windows' && isUnixTarget) {
        return rawCode; // Keep as-is (e.g., source venv/bin/activate)
      }
      if (os !== 'windows' && isWindowsTarget) {
        return rawCode; // Keep as-is (e.g., venv\Scripts\activate)
      }
    }

    if (os === 'windows') {
      if (rawCode.includes('# or on') || rawCode.includes('Example:')) {
        return rawCode;
      }
      return rawCode
        .replace(/python3/g, 'python')
        .replace(/source venv\/bin\/activate/g, 'venv\\Scripts\\activate')
        .replace(/which python/g, 'where python');
    } else {
      if (rawCode.includes('# or on') || rawCode.includes('Example:')) {
        return rawCode;
      }
      return rawCode
        .replace(/venv\\Scripts\\activate/g, 'source venv/bin/activate')
        .replace(/\\venv\\Scripts\\Activate\.ps1/g, 'source venv/bin/activate')
        .replace(/where python/g, 'which python');
    }
  };

  const renderSection = (sec: Section, index: number) => {
    switch (sec.type) {
      case 'hero':
        return (
          <div
            key={index}
            className={`w-full py-16 px-8 md:px-12 text-white bg-gradient-to-r ${getHeaderBg()} flex flex-col justify-center rounded-xl shadow-2xl relative overflow-hidden my-4`}
          >
            {/* Visual background details to look professional */}
            <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-black/40 rounded-full blur-3xl" />

            <div className="relative z-10 max-w-4xl">
              <span className="text-[10px] font-bold tracking-widest text-blue-400 uppercase bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                Course Project Portal
              </span>
              <h1 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                {sec.title}
              </h1>
              {sec.content && Array.isArray(sec.content) && (
                <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-400 font-mono">
                  {sec.content.map((line, i) => (
                    <span key={i} className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 shadow shadow-blue-500/50" />
                      {line}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      case 'paragraph':
        return (
          <div key={index} className="my-6">
            {sec.title && (
              <h2 className="text-base font-bold text-slate-200 mt-8 mb-3 border-l-2 border-blue-500 pl-3 uppercase tracking-wider">
                {sec.title}
              </h2>
            )}
            <p className="text-slate-400 leading-relaxed text-[13.5px] font-sans">
              {sec.content}
            </p>
          </div>
        );

      case 'list':
        return (
          <div key={index} className="my-6 bg-slate-950/40 p-5 rounded-xl border border-slate-900/60 shadow-inner">
            {sec.title && (
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
                {sec.title}
              </h3>
            )}
            <ul className="space-y-2.5">
              {sec.items?.map((item, i) => {
                const isChecklist = sec.title?.includes('Congratulations') || sec.title?.includes('Verified') || page.id === 'conclusion';
                return (
                  <li key={i} className="flex items-start text-[13px] text-slate-400 font-sans">
                    {isChecklist ? (
                      <CheckCircle className="h-4 w-4 text-blue-400 mt-0.5 mr-2.5 shrink-0" />
                    ) : (
                      <span className="h-1.5 w-1.5 bg-slate-600 rounded-full mt-2 mr-3 shrink-0" />
                    )}
                    <span>{item}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        );

      case 'table':
        return (
          <div key={index} className="my-6 overflow-hidden rounded-xl border border-slate-900 shadow-2xl bg-slate-950/20">
            {sec.title && (
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 p-4 border-b border-slate-900 bg-slate-950/50">
                {sec.title}
              </h3>
            )}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-900 text-slate-300 font-mono text-[10px] uppercase tracking-wider border-b border-slate-850">
                    {sec.headers?.map((header, i) => (
                      <th key={i} className="px-5 py-3.5 font-bold">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-900">
                  {sec.rows?.map((row, i) => (
                    <tr key={i} className="hover:bg-slate-900/30 transition-colors">
                      {row.map((cell, cellIdx) => (
                        <td key={cellIdx} className="px-5 py-3.5 text-slate-400 font-medium">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'code':
        return (
          <div key={index} className="my-5 font-mono text-xs">
            {sec.title && <span className="block text-[10px] font-bold text-slate-500 mb-1.5 uppercase tracking-wider">{sec.title}</span>}
            <div className="relative group bg-[#090d16] rounded-xl p-4 border border-slate-900 overflow-x-auto shadow-2xl">
              <pre className="text-blue-400 leading-relaxed font-mono">
                <code>{getOSSpecificCode(sec.content as string, sec.title)}</code>
              </pre>
              <button
                onClick={() => navigator.clipboard.writeText(getOSSpecificCode(sec.content as string, sec.title))}
                className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 bg-slate-900 hover:bg-slate-800 text-slate-400 p-1.5 rounded-lg border border-slate-800 transition-all cursor-pointer text-[10px] uppercase font-bold tracking-wide flex items-center space-x-1"
                title="Copy code snippet"
              >
                <FileText className="h-3 w-3" />
                <span>Copy</span>
              </button>
            </div>
          </div>
        );

      case 'callout':
        const isWarn = sec.calloutType === 'warning';
        return (
          <div
            key={index}
            className={`my-6 p-4 rounded-r-xl border-l-3 flex items-start space-x-3 shadow-xl ${
              isWarn
                ? 'bg-amber-500/5 border-amber-500 text-amber-200'
                : 'bg-blue-500/5 border-blue-500 text-blue-200'
            }`}
          >
            <ShieldAlert className={`h-4.5 w-4.5 shrink-0 mt-0.5 ${isWarn ? 'text-amber-500' : 'text-blue-400'}`} />
            <div>
              {sec.title && <h4 className="font-bold text-[11px] uppercase tracking-wider mb-1 font-mono">{sec.title}</h4>}
              <p className="text-xs font-sans leading-relaxed">{sec.content}</p>
            </div>
          </div>
        );

      case 'figures':
        if (!sec.figureId) return null;
        
        // Grab simulated terminal instructions
        const activeOSCommands = TERMINAL_COMMANDS_STEPS[os];
        const stepData = activeOSCommands[sec.figureId as keyof typeof activeOSCommands] || {
          command: 'python --version',
          output: 'Python 3.11.4',
          explanation: 'Check python installation'
        };

        return (
          <div key={index} className="my-6">
            <TerminalMock
              os={os}
              stepId={sec.figureId}
              command={stepData.command}
              output={stepData.output}
              explanation={stepData.explanation}
              onRunComplete={() => onStepComplete && onStepComplete(sec.figureId!)}
            />
            <div className="mt-2 text-center text-[11px] font-medium text-slate-500 italic bg-slate-950/40 p-2.5 rounded-lg border border-slate-900/60 font-sans">
              {sec.caption}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex-1 overflow-y-auto px-6 py-8 md:p-10 bg-[#020617] min-h-screen">
      {/* Google Sites Styled Subpage Header (if not home page) */}
      {page.id !== 'home' && (
        <div className="mb-8 pb-4 border-b border-slate-900">
          <div className="flex items-center space-x-2 text-slate-500 text-[10px] font-bold tracking-widest uppercase mb-1">
            <Terminal className="h-3.5 w-3.5 text-blue-500" />
            <span>{page.subtitle || 'Step Guide'}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-100 tracking-tight font-sans">
            {page.title}
          </h1>
        </div>
      )}

      {/* Renders each structured content row */}
      <div className="max-w-4xl mx-auto space-y-4">
        {page.sections.map((section, idx) => renderSection(section, idx))}
      </div>
    </div>
  );
}
