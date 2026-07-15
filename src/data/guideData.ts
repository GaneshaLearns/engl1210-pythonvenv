import { PageContent } from '../types';

export const PAGES: PageContent[] = [
  {
    id: 'home',
    title: 'Setting Up a Python Virtual Environment for Project Development',
    subtitle: 'Home Page',
    route: '/',
    sections: [
      {
        type: 'hero',
        title: 'Setting Up a Python Virtual Environment for Project Development',
        content: [
          'Comprehensive Setup Guide',
          'Covers Windows, macOS, and Linux Platforms',
        ]
      },
      {
        type: 'paragraph',
        title: 'Welcome',
        content: 'A Python virtual environment is an isolated workspace that allows developers to install packages and dependencies without affecting the global Python installation on a computer. Virtual environments help prevent version conflicts between projects and make software development more organized and reliable.'
      },
      {
        type: 'paragraph',
        content: 'This guide teaches students how to create, activate, use, and manage a Python virtual environment on Windows, macOS, and Linux systems.'
      }
    ]
  },
  {
    id: 'intro',
    title: 'Page 1: Introduction',
    subtitle: 'Overview and Purpose',
    route: '/intro',
    sections: [
      {
        type: 'paragraph',
        title: 'Purpose',
        content: 'This manual explains how to create and use a Python virtual environment.'
      },
      {
        type: 'list',
        title: 'Why This Process Is Important',
        items: [
          'Prevent package conflicts',
          'Protect system-wide Python installations',
          'Improve project organization',
          'Simplify software deployment',
          'Ensure consistent project dependencies'
        ]
      },
      {
        type: 'list',
        title: 'Intended Audience',
        items: [
          'CNM students',
          'Beginning programmers',
          'Software development students',
          'IT and Cybersecurity students'
        ]
      },
      {
        type: 'list',
        title: 'Prerequisite Skills',
        items: [
          'Open a terminal or command prompt',
          'Navigate folders',
          'Install Python software'
        ]
      },
      {
        type: 'callout',
        title: 'General Warning',
        content: 'Installing packages outside a virtual environment may affect other Python projects on your computer.',
        calloutType: 'warning'
      },
      {
        type: 'callout',
        title: 'General Warning',
        content: 'Always verify that the virtual environment is activated before installing packages.',
        calloutType: 'warning'
      }
    ]
  },
  {
    id: 'tools',
    title: 'Page 2: Tools and Requirements',
    subtitle: 'System Preparation',
    route: '/tools',
    sections: [
      {
        type: 'table',
        title: 'Required Software',
        headers: ['Tool', 'Purpose'],
        rows: [
          ['Python 3.10+', 'Required for creating environments'],
          ['Command Prompt, PowerShell, or Terminal', 'Running commands'],
          ['Internet Connection', 'Downloading packages']
        ]
      },
      {
        type: 'paragraph',
        title: 'Verify Python Installation',
        content: 'Before we begin, you must verify that Python is installed and accessible from your terminal command line. Open a terminal or command prompt and enter the following command:'
      },
      {
        type: 'code',
        content: 'python --version\n# or on some macOS/Linux installations:\npython3 --version'
      },
      {
        type: 'paragraph',
        content: 'Expected result (showing your installed Python 3 version):'
      },
      {
        type: 'code',
        content: 'Python 3.x.x'
      },
      {
        type: 'figures',
        figureId: 1,
        caption: 'Figure 1. Confirming Python Installation'
      }
    ]
  },
  {
    id: 'phase1',
    title: 'Page 3: Phase 1 – Create the Virtual Environment',
    subtitle: 'Establishing the Workspace',
    route: '/phase1',
    sections: [
      {
        type: 'paragraph',
        title: 'Step 1: Navigate to Your Project Folder',
        content: 'First, navigate to the directory where you want to keep your project. If you don\'t have a folder yet, create one first. Use the directory navigation command (cd) to enter your project folder:'
      },
      {
        type: 'code',
        content: 'cd Documents/MyProject'
      },
      {
        type: 'figures',
        figureId: 2,
        caption: 'Figure 2. Project Directory'
      },
      {
        type: 'paragraph',
        title: 'Step 2: Create the Virtual Environment',
        content: 'Once inside your project directory, run the Python virtual environment builder command. This builds a local, isolated environment setup. Run the command:'
      },
      {
        type: 'code',
        content: 'python -m venv venv\n# or on macOS/Linux:\npython3 -m venv venv'
      },
      {
        type: 'paragraph',
        title: 'Explanation',
        content: 'The command creates a new folder named "venv" in your project folder. This folder contains:'
      },
      {
        type: 'list',
        items: [
          'Python interpreter: A copy of Python specifically for this project.',
          'Scripts: Activation and management files for starting the workspace.',
          'Package management tools: Clean versions of pip and setuptools.'
        ]
      },
      {
        type: 'figures',
        figureId: 3,
        caption: 'Figure 3. Virtual Environment Created'
      }
    ]
  },
  {
    id: 'phase2',
    title: 'Page 4: Phase 2 – Activate the Environment',
    subtitle: 'Entering the Isolated Container',
    route: '/phase2',
    sections: [
      {
        type: 'paragraph',
        title: 'Activation Commands',
        content: 'Activating the virtual environment shifts your terminal sessions to use the Python interpreter and pip packages localized inside the "venv" folder rather than the computer\'s global Python.'
      },
      {
        type: 'paragraph',
        content: 'Choose the command that corresponds to your operating system and shell:'
      },
      {
        type: 'code',
        title: 'Windows (Command Prompt)',
        content: 'venv\\Scripts\\activate'
      },
      {
        type: 'code',
        title: 'Windows (PowerShell)',
        content: '& .\\venv\\Scripts\\Activate.ps1'
      },
      {
        type: 'code',
        title: 'macOS / Linux (Bash/Zsh Terminal)',
        content: 'source venv/bin/activate'
      },
      {
        type: 'paragraph',
        title: 'Successful Activation',
        content: 'Once activated, your terminal prompt will display a prefix indicating the name of the active environment in parentheses, usually "(venv)":'
      },
      {
        type: 'code',
        content: '(venv) C:\\Users\\John\\MyProject>\n# or on macOS/Linux:\n(venv) john@macbook:~/Documents/MyProject$'
      },
      {
        type: 'figures',
        figureId: 4,
        caption: 'Figure 4. Activated Environment'
      },
      {
        type: 'callout',
        title: 'Critical Warning',
        content: 'If "(venv)" does not appear, the environment is not active! Installing packages now may affect your system-wide Python installation.',
        calloutType: 'warning'
      }
    ]
  },
  {
    id: 'phase3',
    title: 'Page 5: Phase 3 – Install Packages',
    subtitle: 'Managing Project Dependencies',
    route: '/phase3',
    sections: [
      {
        type: 'paragraph',
        title: 'Install a Package',
        content: 'With the environment active, you can install packages safely using the Python package manager (pip). For example, let\'s install the popular "requests" library for making web requests:'
      },
      {
        type: 'code',
        content: 'pip install requests'
      },
      {
        type: 'paragraph',
        title: 'Verify the Installation',
        content: 'To verify that the library was successfully downloaded and is contained ONLY in your virtual environment (and not globally), list the installed libraries:'
      },
      {
        type: 'code',
        content: 'pip list'
      },
      {
        type: 'paragraph',
        title: 'Explanation',
        content: 'The "requests" package (and its core dependencies, such as urllib3, idna, and certifi) should now appear in the list. This list is isolated to your "venv" directory and will not be visible outside of it.'
      },
      {
        type: 'figures',
        figureId: 5,
        caption: 'Figure 5. Installing Requests Package'
      }
    ]
  },
  {
    id: 'phase4',
    title: 'Page 6: Phase 4 – Verify Operation',
    subtitle: 'Ensuring Complete Isolation',
    route: '/phase4',
    sections: [
      {
        type: 'paragraph',
        title: 'Verify Active Environment Path',
        content: 'To verify that your system is actively using the Python interpreter housed inside your virtual environment rather than your global computer-wide one, query the system for the active path of Python.'
      },
      {
        type: 'code',
        title: 'Windows (Command Prompt / PowerShell)',
        content: 'where python'
      },
      {
        type: 'code',
        title: 'macOS / Linux (Terminal)',
        content: 'which python'
      },
      {
        type: 'paragraph',
        title: 'Expected Outcome',
        content: 'The command outputs the path to the Python program. The active path MUST refer to the "venv" sub-folder in your project directory:'
      },
      {
        type: 'code',
        content: '# Windows Example:\nC:\\Users\\John\\Documents\\MyProject\\venv\\Scripts\\python.exe\n\n# macOS/Linux Example:\n/Users/john/Documents/MyProject/venv/bin/python'
      },
      {
        type: 'figures',
        figureId: 6,
        caption: 'Figure 6. Verifying the Active Environment'
      }
    ]
  },
  {
    id: 'deactivate',
    title: 'Page 7: Deactivating the Environment',
    subtitle: 'Leaving the Workspace',
    route: '/deactivate',
    sections: [
      {
        type: 'paragraph',
        title: 'When Finished',
        content: 'When you are finished working on your project and want to exit the virtual environment to return your command shell to normal global operation, type:'
      },
      {
        type: 'code',
        content: 'deactivate'
      },
      {
        type: 'paragraph',
        title: 'Expected Result',
        content: 'The "(venv)" indicator disappears from your command prompt line, indicating you have returned to standard global Python space.'
      },
      {
        type: 'figures',
        figureId: 7,
        caption: 'Figure 7. Environment Deactivated'
      }
    ]
  },
  {
    id: 'troubleshoot',
    title: 'Page 8: Troubleshooting',
    subtitle: 'Resolving Common Issues',
    route: '/troubleshoot',
    sections: [
      {
        type: 'paragraph',
        title: 'Problem: Python Command Not Found',
        content: 'When entering "python" or "python3", the shell returns an error like "command not found" or "python is not recognized as an internal or external command".'
      },
      {
        type: 'callout',
        title: 'Solution',
        content: 'Reinstall Python from python.org. Crucially, make sure that you check the box labeled "Add Python to PATH" or "Add python.exe to PATH" at the bottom of the installation wizard before clicking Install.',
        calloutType: 'info'
      },
      {
        type: 'paragraph',
        title: 'Problem: Activation Is Denied in PowerShell (Windows)',
        content: 'When attempting to run "& .\\venv\\Scripts\\Activate.ps1" in PowerShell, you receive an error: "File cannot be loaded because running scripts is disabled on this system."'
      },
      {
        type: 'code',
        title: 'PowerShell Solution',
        content: 'Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser'
      },
      {
        type: 'paragraph',
        content: 'Enter the command above, confirm with "Y" when prompted, and then try reactivating the environment.'
      },
      {
        type: 'paragraph',
        title: 'Problem: Package Will Not Install / Connection Fails',
        content: 'Running "pip install requests" times out, returns SSL certificate issues, or throws deprecation warnings.'
      },
      {
        type: 'callout',
        title: 'Solution',
        content: 'Upgrade the package manager tool "pip" within your active virtual environment. Run:',
        calloutType: 'info'
      },
      {
        type: 'code',
        content: 'python -m pip install --upgrade pip'
      },
      {
        type: 'paragraph',
        title: 'Problem: Environment Will Not Activate',
        content: 'The shell reports that the activation path cannot be found, or "source" is not recognized.'
      },
      {
        type: 'callout',
        title: 'Solution',
        content: 'Verify that the "venv" folder was actually created in your current directory by listing the contents of your directory:',
        calloutType: 'info'
      },
      {
        type: 'code',
        content: '# Windows CMD:\ndir\n\n# macOS / Linux / PowerShell:\nls'
      },
      {
        type: 'paragraph',
        content: 'If the folder "venv" is missing, re-run Phase 1 (python -m venv venv) to build the folder.'
      }
    ]
  },
  {
    id: 'conclusion',
    title: 'Page 9: Conclusion',
    subtitle: 'Wrapping Up',
    route: '/conclusion',
    sections: [
      {
        type: 'list',
        title: 'Congratulations!',
        items: [
          'Verified Python installation and system PATH setup',
          'Created a local virtual environment isolated folder',
          'Activated the environment inside your command shell',
          'Installed external packages safely using pip',
          'Verified the active environment directory',
          'Deactivated the environment back to system default'
        ]
      },
      {
        type: 'paragraph',
        content: 'Using virtual environments is considered a best practice in software development because it prevents dependency conflicts and makes projects easier to maintain. Always build virtual environments for your software development courses and individual projects!'
      },
      {
        type: 'paragraph',
        title: 'Additional Resources',
        content: 'Learn more about the Python virtual environment module at the official documentation:'
      },
      {
        type: 'list',
        items: [
          'Python official "venv" Library Documentation: https://docs.python.org/3/library/venv.html',
          'Python Packaging User Guide: https://packaging.python.org/'
        ]
      },
      {
        type: 'list',
        title: 'Contact Information',
        items: [
          'CNM Computer Information Systems Department office support',
          'Python Community Support and Forums',
          'Python Documentation Online Hub'
        ]
      }
    ]
  }
];

export const RUBRIC_CHECKLIST = [
  { id: 'cover', category: 'Rubric Criteria', requirement: 'Cover page/title including student name, course, and date', status: 'pending', pageRef: 'home' },
  { id: 'intro', category: 'Rubric Criteria', requirement: 'Clear introduction specifying purpose and Why this process is important', status: 'pending', pageRef: 'intro' },
  { id: 'audience', category: 'Rubric Criteria', requirement: 'Intended audience and prerequisite skills identified', status: 'pending', pageRef: 'intro' },
  { id: 'tools', category: 'Rubric Criteria', requirement: 'Required tools, hardware, or software clearly listed', status: 'pending', pageRef: 'tools' },
  { id: 'phases', category: 'Rubric Criteria', requirement: 'Multiple phases or tasks structured logically in order', status: 'pending', pageRef: 'phase1' },
  { id: 'warnings', category: 'Rubric Criteria', requirement: 'Appropriate, visible warnings or cautions included', status: 'pending', pageRef: 'phase2' },
  { id: 'troubleshoot', category: 'Rubric Criteria', requirement: 'Troubleshooting section detailing common errors and solutions', status: 'pending', pageRef: 'troubleshoot' },
  { id: 'conclusion', category: 'Rubric Criteria', requirement: 'A concluding summary statement with helpful additional resources', status: 'pending', pageRef: 'conclusion' },
  { id: 'multimodal', category: 'Rubric Criteria', requirement: 'Multimodal design incorporating clear screenshot figures and step captions', status: 'pending', pageRef: 'tools' },
  { id: 'navigation', category: 'Rubric Criteria', requirement: 'Consistent site navigation with styled headers and clear structure', status: 'pending', pageRef: 'home' }
];

export const TERMINAL_COMMANDS_STEPS = {
  windows: {
    1: {
      command: 'python --version',
      output: 'Python 3.11.4',
      explanation: 'Verifies Python is installed and configured in the Windows environment PATH variables.'
    },
    2: {
      command: 'cd Documents\\MyProject',
      output: '',
      explanation: 'Changes directory into your local project workspace folder.'
    },
    3: {
      command: 'python -m venv venv',
      output: 'Creating virtual environment in directory venv...\nDone.',
      showFolderListAfter: ['venv/', 'main.py'],
      explanation: 'Instructs Python to launch the "venv" module and create an isolated folder called "venv" inside the current project.'
    },
    4: {
      command: 'venv\\Scripts\\activate',
      output: '',
      explanation: 'Triggers the CMD command activation script. Your shell header will append "(venv)" to show that it is active.'
    },
    5: {
      command: 'pip install requests',
      output: 'Collecting requests\n  Downloading requests-2.31.0-py3-none-any.whl (62 kB)\nCollecting charset-normalizer<4,>=2 (from requests)\n  Downloading charset_normalizer-3.3.2-cp311-cp311-win_amd64.whl (99 kB)\nCollecting idna<4,>=2.5 (from requests)\n  Downloading idna-3.6-py3-none-any.whl (61 kB)\nCollecting urllib3<3,>=1.21.1 (from requests)\n  Downloading urllib3-2.1.0-py3-none-any.whl (104 kB)\nCollecting certifi>=2017.4.17 (from requests)\n  Downloading certifi-2023.11.17-py3-none-any.whl (162 kB)\nInstalling collected packages: certifi, urllib3, idna, charset-normalizer, requests\nSuccessfully installed certifi-2023.11.17 charset-normalizer-3.3.2 idna-3.6 requests-2.31.0 urllib3-2.1.0',
      explanation: 'Uses the localized "pip" installer within the active virtual environment to download "requests" and its support libraries.'
    },
    6: {
      command: 'where python',
      output: 'C:\\Users\\John\\Documents\\MyProject\\venv\\Scripts\\python.exe\nC:\\Users\\John\\AppData\\Local\\Programs\\Python\\Python311\\python.exe',
      explanation: 'Queries Windows for the executable paths matching "python". The active one is listed first: inside the project\'s "venv" directory.'
    },
    7: {
      command: 'deactivate',
      output: '',
      explanation: 'Turns off the local environment shell redirect, returning the command prompt back to global default.'
    }
  },
  macos: {
    1: {
      command: 'python3 --version',
      output: 'Python 3.11.2',
      explanation: 'Verifies that Python 3 is installed and in the user PATH on macOS.'
    },
    2: {
      command: 'cd Documents/MyProject',
      output: '',
      explanation: 'Changes directory into your project workspace folder.'
    },
    3: {
      command: 'python3 -m venv venv',
      output: '',
      showFolderListAfter: ['venv/', 'main.py'],
      explanation: 'Spawns a local folder called "venv" containing a copy of the Python system binary, pip, and local scripts.'
    },
    4: {
      command: 'source venv/bin/activate',
      output: '',
      explanation: 'Loads the bash/zsh activation configuration into the current terminal shell, appending "(venv)" to the terminal prompt.'
    },
    5: {
      command: 'pip install requests',
      output: 'Collecting requests\n  Downloading requests-2.31.0-py3-none-any.whl (62 kB)\nCollecting charset-normalizer<4,>=2 (from requests)\n  Downloading charset_normalizer-3.3.2-cp311-cp311-macosx_11_0_arm64.whl (99 kB)\nCollecting idna<4,>=2.5 (from requests)\n  Downloading idna-3.6-py3-none-any.whl (61 kB)\nCollecting urllib3<3,>=1.21.1 (from requests)\n  Downloading urllib3-2.1.0-py3-none-any.whl (104 kB)\nCollecting certifi>=2017.4.17 (from requests)\n  Downloading certifi-2023.11.17-py3-none-any.whl (162 kB)\nInstalling collected packages: certifi, urllib3, idna, charset-normalizer, requests\nSuccessfully installed certifi-2023.11.17 charset-normalizer-3.3.2 idna-3.6 requests-2.31.0 urllib3-2.1.0',
      explanation: 'Contacts PyPI (Python Package Index) to retrieve and compile the "requests" module directly inside venv\'s site-packages.'
    },
    6: {
      command: 'which python',
      output: '/Users/john/Documents/MyProject/venv/bin/python',
      explanation: 'Queries macOS for the active terminal path associated with "python". Points directly inside venv/bin.'
    },
    7: {
      command: 'deactivate',
      output: '',
      explanation: 'Restores the terminal shell state to normal by removing venv bin folder from command priority list.'
    }
  },
  linux: {
    1: {
      command: 'python3 --version',
      output: 'Python 3.10.12',
      explanation: 'Verifies the standard Python3 system installation inside Linux distributions.'
    },
    2: {
      command: 'cd Documents/MyProject',
      output: '',
      explanation: 'Enters the user\'s workspace folder.'
    },
    3: {
      command: 'python3 -m venv venv',
      output: '',
      showFolderListAfter: ['venv/', 'main.py'],
      explanation: 'Builds a standalone python environment within the directory.'
    },
    4: {
      command: 'source venv/bin/activate',
      output: '',
      explanation: 'Executes activation in Linux bash, establishing paths and modifying the PS1 environment prefix.'
    },
    5: {
      command: 'pip install requests',
      output: 'Collecting requests\n  Downloading requests-2.31.0-py3-none-any.whl (62 kB)\nCollecting charset-normalizer<4,>=2 (from requests)\n  Downloading charset_normalizer-3.3.2-cp310-cp310-manylinux_2_17_x86_64.whl (99 kB)\nCollecting idna<4,>=2.5 (from requests)\n  Downloading idna-3.6-py3-none-any.whl (61 kB)\nCollecting urllib3<3,>=1.21.1 (from requests)\n  Downloading urllib3-2.1.0-py3-none-any.whl (104 kB)\nCollecting certifi>=2017.4.17 (from requests)\n  Downloading certifi-2023.11.17-py3-none-any.whl (162 kB)\nInstalling collected packages: certifi, urllib3, idna, charset-normalizer, requests\nSuccessfully installed certifi-2023.11.17 charset-normalizer-3.3.2 idna-3.6 requests-2.31.0 urllib3-2.1.0',
      explanation: 'Safely fetches packages into the virtual environment packages tree without interfering with system apt dependencies.'
    },
    6: {
      command: 'which python',
      output: '/home/john/Documents/MyProject/venv/bin/python',
      explanation: 'Queries the shell. Reports the active Python is running inside the project virtual directory.'
    },
    7: {
      command: 'deactivate',
      output: '',
      explanation: 'Clears environment PATH configurations to exit isolation.'
    }
  }
};
