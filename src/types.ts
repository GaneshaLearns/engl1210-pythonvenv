export type OperatingSystem = 'windows' | 'macos' | 'linux';

export interface CommandStep {
  command: string;
  output: string;
  explanation?: string;
  showFolderListAfter?: string[];
}

export interface PageContent {
  id: string;
  title: string;
  subtitle?: string;
  route: string;
  sections: Section[];
}

export interface Section {
  type: 'paragraph' | 'list' | 'table' | 'code' | 'callout' | 'figures' | 'hero';
  title?: string;
  content?: string | string[]; // Can be text, list items, or code
  items?: string[]; // For list type
  headers?: string[]; // For table headers
  rows?: string[][]; // For table rows
  calloutType?: 'warning' | 'info' | 'success';
  figureId?: number;
  caption?: string;
}

export interface RubricItem {
  id: string;
  category: string;
  requirement: string;
  status: 'pending' | 'completed';
  pageRef: string;
}
