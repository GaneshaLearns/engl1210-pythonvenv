import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Copy, Check, Terminal, ExternalLink } from 'lucide-react';
import { OperatingSystem } from '../types';

interface TerminalMockProps {
  os: OperatingSystem;
  stepId: number; // 1 to 7 corresponding to figures
  command: string;
  output: string;
  explanation?: string;
  onRunComplete?: () => void;
  onShellChange?: (shell: 'cmd' | 'powershell' | 'macos') => void;
}

export default function TerminalMock({
  os,
  stepId,
  command,
  output,
  explanation,
  onRunComplete,
  onShellChange
}: TerminalMockProps) {
  const [selectedStyle, setSelectedStyle] = useState<'cmd' | 'powershell' | 'macos'>(
    os === 'windows' ? 'cmd' : 'macos'
  );

  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [commandRunCount, setCommandRunCount] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Sync style with OS prop change
  useEffect(() => {
    if (os === 'windows') {
      setSelectedStyle(prev => (prev === 'macos' ? 'cmd' : prev));
    } else {
      setSelectedStyle('macos');
    }
  }, [os]);

  // Notify parent component of shell style changes to make figure captions dynamic
  useEffect(() => {
    if (onShellChange) {
      onShellChange(selectedStyle);
    }
  }, [selectedStyle, onShellChange]);

  // Reset output when step or style changes
  useEffect(() => {
    setTerminalOutput([]);
    setIsTyping(false);
  }, [stepId, selectedStyle]);

  // Auto scroll terminal on output changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [terminalOutput]);

  // Helper to dynamically translate commands and outputs based on selectedStyle
  const getTranslatedCommandAndOutput = () => {
    let displayCommand = command;
    let displayOutput = output;
    let displayExplanation = explanation || '';

    if (selectedStyle === 'powershell') {
      if (stepId === 4) {
        displayCommand = '& .\\venv\\Scripts\\Activate.ps1';
        displayExplanation = 'Activates the PowerShell script. The preceding ampersand (&) is the PowerShell call operator used to safely execute the script path.';
      } else if (stepId === 6) {
        displayCommand = 'where.exe python';
        displayExplanation = 'Queries Windows for python executables. Using where.exe specifies the direct program to prevent alias conflicts in PowerShell.';
      } else if (stepId === 1) {
        displayCommand = 'python --version';
      } else if (stepId === 2) {
        displayCommand = 'cd Documents\\MyProject';
      } else if (stepId === 3) {
        displayCommand = 'python -m venv venv';
      }
    } else if (selectedStyle === 'cmd') {
      if (stepId === 4) {
        displayCommand = 'venv\\Scripts\\activate';
        displayExplanation = 'Executes the activate.bat batch file inside Windows Command Prompt to isolate the shell session.';
      } else if (stepId === 6) {
        displayCommand = 'where python';
      } else if (stepId === 1) {
        displayCommand = 'python --version';
      } else if (stepId === 2) {
        displayCommand = 'cd Documents\\MyProject';
      } else if (stepId === 3) {
        displayCommand = 'python -m venv venv';
      }
    } else if (selectedStyle === 'macos') {
      // macOS/Linux style
      if (stepId === 1) {
        displayCommand = 'python3 --version';
        displayOutput = 'Python 3.11.2';
      } else if (stepId === 2) {
        displayCommand = 'cd Documents/MyProject';
      } else if (stepId === 3) {
        displayCommand = 'python3 -m venv venv';
      } else if (stepId === 4) {
        displayCommand = 'source venv/bin/activate';
        displayExplanation = 'Loads the virtual environment activation script into the current bash/zsh active terminal shell.';
      } else if (stepId === 6) {
        displayCommand = 'which python';
        displayOutput = '/Users/john/Documents/MyProject/venv/bin/python';
      } else {
        displayCommand = command.replace(/\\/g, '/');
      }
    }

    return { displayCommand, displayOutput, displayExplanation };
  };

  const handleCopy = async () => {
    const { displayCommand } = getTranslatedCommandAndOutput();
    try {
      await navigator.clipboard.writeText(displayCommand);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const runCommandSim = () => {
    if (isTyping) return;
    setIsTyping(true);
    setTerminalOutput([]);

    const { displayCommand, displayOutput } = getTranslatedCommandAndOutput();

    let typedCommand = '';
    let charIdx = 0;
    
    // Typing speed
    const typeInterval = setInterval(() => {
      if (charIdx < displayCommand.length) {
        typedCommand += displayCommand.charAt(charIdx);
        setTerminalOutput([typedCommand]);
        charIdx++;
      } else {
        clearInterval(typeInterval);
        
        // Brief pause, then show output
        setTimeout(() => {
          if (displayOutput) {
            const outputLines = displayOutput.split('\n');
            setTerminalOutput(prev => [...prev, ...outputLines]);
          }
          setIsTyping(false);
          setCommandRunCount(c => c + 1);
          if (onRunComplete) {
            onRunComplete();
          }
        }, 300);
      }
    }, 40);
  };

  // Helper to determine path based on step and OS style
  const getPromptPrefix = (isActive: boolean) => {
    const venvPrefix = isActive ? '(venv) ' : '';
    if (selectedStyle === 'powershell') {
      return `${venvPrefix}PS C:\\Users\\John\\MyProject> `;
    } else if (selectedStyle === 'cmd') {
      return `${venvPrefix}C:\\Users\\John\\MyProject> `;
    } else {
      return `${venvPrefix}john@macbook:~/Documents/MyProject$ `;
    }
  };

  // Step active environment indicators:
  // Step 1: No env active, checking global python.
  // Step 2: No env active, cd.
  // Step 3: No env active, running python -m venv venv.
  // Step 4: Activating (input has no env, but output/subsequent input does).
  // Step 5: Active env.
  // Step 6: Active env.
  // Step 7: Input has active env, command "deactivate" is run, output removes active env.
  const isEnvActiveBeforeInput = stepId >= 5 || stepId === 7;
  const isEnvActiveAfterOutput = stepId >= 4 && stepId < 7;

  const { displayExplanation } = getTranslatedCommandAndOutput();

  return (
    <div className="w-full rounded-xl overflow-hidden border border-slate-900 shadow-2xl bg-slate-950 flex flex-col transition-all duration-300">
      {/* Top Controls Bar */}
      <div className="bg-slate-950 px-4 py-2.5 flex flex-wrap items-center justify-between border-b border-slate-900 gap-2">
        <div className="flex items-center space-x-2">
          {/* Style Selector */}
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mr-2">Shell:</span>
          <button
            onClick={() => setSelectedStyle('cmd')}
            className={`px-2.5 py-1 text-[11px] rounded transition-all cursor-pointer font-bold ${
              selectedStyle === 'cmd'
                ? 'bg-blue-600 text-white shadow shadow-blue-500/20'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            CMD
          </button>
          <button
            onClick={() => setSelectedStyle('powershell')}
            className={`px-2.5 py-1 text-[11px] rounded transition-all cursor-pointer font-bold ${
              selectedStyle === 'powershell'
                ? 'bg-blue-600 text-white shadow shadow-blue-500/20'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            PowerShell
          </button>
          <button
            onClick={() => setSelectedStyle('macos')}
            className={`px-2.5 py-1 text-[11px] rounded transition-all cursor-pointer font-bold ${
              selectedStyle === 'macos'
                ? 'bg-blue-600 text-white shadow shadow-blue-500/20'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Terminal
          </button>
        </div>

        {/* Copy command action */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handleCopy}
            title="Copy command code snippet"
            className="flex items-center space-x-1 px-2.5 py-1 bg-slate-900 hover:bg-slate-850 text-slate-300 rounded-lg text-xs border border-slate-800 transition-all cursor-pointer font-medium"
          >
            {isCopied ? (
              <>
                <Check className="h-3 w-3 text-blue-400" />
                <span className="text-blue-400 font-bold">Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" />
                <span>Copy Code</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Actual Terminal Window */}
      <div
        className={`p-4 h-64 font-mono text-[12.5px] leading-relaxed overflow-y-auto transition-all duration-300 ${
          selectedStyle === 'powershell'
            ? 'bg-[#011a3e] text-white'
            : selectedStyle === 'cmd'
            ? 'bg-[#030712] text-slate-200'
            : 'bg-[#090d16] text-slate-200'
        }`}
        ref={scrollRef}
      >
        {/* Terminal Header simulated */}
        {selectedStyle === 'powershell' && terminalOutput.length === 0 && (
          <div className="text-slate-400 text-[11px] mb-2 leading-tight">
            Windows PowerShell<br />
            Copyright (C) Microsoft Corporation. All rights reserved.<br />
            Install the latest PowerShell for new features! https://aka.ms/pscore6
          </div>
        )}
        {selectedStyle === 'cmd' && terminalOutput.length === 0 && (
          <div className="text-slate-500 text-[11px] mb-2 leading-tight">
            Microsoft Windows [Version 10.0.19045.4412]<br />
            (c) Microsoft Corporation. All rights reserved.
          </div>
        )}
        {selectedStyle === 'macos' && terminalOutput.length === 0 && (
          <div className="text-slate-500 text-[11px] mb-2 leading-tight">
            Last login: {new Date().toLocaleDateString()} on ttys001<br />
            Type `help` or `man` for standard reference manuals.
          </div>
        )}

        {/* Previous terminal logs when simulated is already completed */}
        {terminalOutput.length === 0 ? (
          <div>
            <span className="opacity-60">{getPromptPrefix(isEnvActiveBeforeInput)}</span>
            <span className="animate-pulse">_</span>
          </div>
        ) : (
          <div>
            {/* The active input prompt */}
            <div>
              <span className="opacity-60">{getPromptPrefix(isEnvActiveBeforeInput)}</span>
              <span className="text-blue-400 font-semibold">{terminalOutput[0]}</span>
            </div>

            {/* Simulated run logs outputs */}
            {terminalOutput.slice(1).map((line, idx) => (
              <div
                key={idx}
                className={`whitespace-pre-wrap ${
                  line.includes('Error') || line.includes('Failed')
                    ? 'text-red-400 font-semibold'
                    : line.includes('Successfully installed')
                    ? 'text-blue-400 font-semibold'
                    : 'opacity-90 text-slate-300'
                }`}
              >
                {line}
              </div>
            ))}

            {/* Subsequent input prompt ready */}
            {!isTyping && (
              <div className="mt-2 transition-all">
                <span className="opacity-60">{getPromptPrefix(isEnvActiveAfterOutput)}</span>
                <span className="animate-pulse">_</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Terminal Actions and Information Footer */}
      <div className="bg-slate-950 px-4 py-3 flex items-center justify-between border-t border-slate-900 rounded-b-xl gap-2">
        <div className="flex-1 mr-4">
          <p className="text-[11px] text-slate-500 italic">
            {displayExplanation || 'Run this command inside your terminal/command line tool to execute this step.'}
          </p>
        </div>
        <div className="flex items-center space-x-2 shrink-0">
          {terminalOutput.length > 0 && (
            <button
              onClick={() => setTerminalOutput([])}
              className="p-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-400 hover:text-white transition-all cursor-pointer"
              title="Reset Simulator"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          )}
          <button
            onClick={runCommandSim}
            disabled={isTyping}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
              isTyping
                ? 'bg-slate-900 text-slate-600 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-500 text-white shadow shadow-blue-500/25'
            }`}
          >
            <Play className="h-3 w-3" />
            <span>{terminalOutput.length > 0 ? 'Rerun' : 'Run Simulator'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
