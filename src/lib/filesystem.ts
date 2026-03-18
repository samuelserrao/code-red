export interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  content?: string; // For text files
  children?: FileNode[]; // For folders
  icon?: string;
}

const mockFileSystem: FileNode = {
  id: 'root',
  name: 'Macintosh HD',
  type: 'folder',
  children: [
    {
      id: 'applications',
      name: 'Applications',
      type: 'folder',
      children: [
        { id: 'safari', name: 'Safari.app', type: 'file' },
        { id: 'whatsapp', name: 'WhatsApp.app', type: 'file' },
        { id: 'terminal', name: 'Terminal.app', type: 'file' },
        { id: 'calculator', name: 'Calculator.app', type: 'file' },
        { id: 'notes', name: 'Notes.app', type: 'file' },
        { id: 'calendar', name: 'Calendar.app', type: 'file' },
        { id: 'photos', name: 'Photos.app', type: 'file' },
        { id: 'music', name: 'Music.app', type: 'file' },
        { id: 'podcasts', name: 'Podcasts.app', type: 'file' },
        { id: 'tv', name: 'TV.app', type: 'file' },
        { id: 'appstore', name: 'App Store.app', type: 'file' },
        { id: 'mail', name: 'Mail.app', type: 'file' },
        { id: 'messages', name: 'Messages.app', type: 'file' },
        { id: 'maps', name: 'Maps.app', type: 'file' },
        { id: 'reminders', name: 'Reminders.app', type: 'file' },
        { id: 'activity', name: 'Activity Monitor.app', type: 'file' },
        { id: 'contacts', name: 'Contacts.app', type: 'file' },
        { id: 'pages', name: 'Pages.app', type: 'file' },
        { id: 'settings', name: 'Settings.app', type: 'file' },
      ],
    },
    {
      id: 'users',
      name: 'Users',
      type: 'folder',
      children: [
        {
          id: 'samuel',
          name: 'samuel',
          type: 'folder',
          children: [
            {
              id: 'desktop',
              name: 'Desktop',
              type: 'folder',
              children: [
                { id: 'todo', name: 'todo.txt', type: 'file', content: '1. Build macOS Clone\n2. Add Supabase\n3. Profit' },
                { id: 'ideas', name: 'ideas.txt', type: 'file', content: 'App factory architecture scaling up to 20 apps.' },
              ],
            },
            {
              id: 'documents',
              name: 'Documents',
              type: 'folder',
              children: [
                { id: 'resume', name: 'Resume.pdf', type: 'file' },
              ],
            },
            { id: 'downloads', name: 'Downloads', type: 'folder', children: [] },
          ],
        },
      ],
    },
  ],
};

// Utilities to interact with the mock file system
export function getFolderContents(pathId: string): FileNode[] {
  let found: FileNode | null = null;

  function traverse(node: FileNode) {
    if (node.id === pathId) {
      found = node;
      return;
    }
    if (node.children) {
      for (const child of node.children) traverse(child);
    }
  }

  traverse(mockFileSystem);
  return found && (found as FileNode).type === 'folder' ? (found as FileNode).children || [] : [];
}

export function getFileContent(fileId: string): string | undefined {
  let content: string | undefined;

  function traverse(node: FileNode) {
    if (node.id === fileId && node.type === 'file') {
      content = node.content;
      return;
    }
    if (node.children) {
      for (const child of node.children) traverse(child);
    }
  }

  traverse(mockFileSystem);
  return content;
}
