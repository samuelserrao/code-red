import { 
  FolderOpen, Compass, MessageCircle, Settings, Calculator, 
  FileText, Calendar, Image as ImageIcon, Music, Store, Terminal, 
  Activity, Trash2, CheckSquare, Mail, Map, User, Mic, BookOpen, Bot
} from 'lucide-react';

export const allAppsMap = [
  { id: 'finder', name: 'Finder', icon: '/assets/macos/finder.png', color: 'text-blue-600', bg: 'transparent', core: true },
  { id: 'safari', name: 'Safari', icon: '/assets/macos/safari.png', color: 'text-blue-500', bg: 'transparent', core: true },
  { id: 'agentic-ai', name: 'Agentic AI', icon: '/assets/macos/agentic-ai.svg', color: 'text-transparent', bg: 'transparent', core: true },
  { id: 'settings', name: 'Settings', icon: '/assets/macos/settings.png', color: 'text-gray-400', bg: 'transparent', core: true },
  { id: 'calculator', name: 'Calculator', icon: '/assets/macos/calculator.png', color: 'text-orange-500', bg: 'transparent', core: false },
  { id: 'notes', name: 'Notes', icon: '/assets/macos/notes.svg', color: 'text-transparent', bg: 'transparent', core: false },
  { id: 'calendar', name: 'Calendar', icon: '/assets/macos/calendar.png', color: 'text-red-500', bg: 'transparent', core: false },
  { id: 'photos', name: 'Photos', icon: '/assets/macos/photos.png', color: 'text-blue-400', bg: 'transparent', core: false },
  { id: 'music', name: 'Music', icon: '/assets/macos/music.png', color: 'text-rose-500', bg: 'transparent', core: true },
  { id: 'podcasts', name: 'Podcasts', icon: '/assets/macos/podcasts.png', color: 'text-purple-500', bg: 'transparent', core: false },
  { id: 'tv', name: 'TV', icon: '/assets/macos/tv.png', color: 'text-indigo-500', bg: 'transparent', core: false }, 
  { id: 'appstore', name: 'App Store', icon: '/assets/macos/app_store.png', color: 'text-blue-500', bg: 'transparent', core: false },
  { id: 'mail', name: 'Mail', icon: '/assets/macos/mail.png', color: 'text-blue-400', bg: 'transparent', core: false },
  { id: 'messages', name: 'Messages', icon: '/assets/macos/messages.png', color: 'text-green-400', bg: 'transparent', core: true }, 
  { id: 'maps', name: 'Maps', icon: '/assets/macos/maps.png', color: 'text-green-600', bg: 'transparent', core: false },
  { id: 'reminders', name: 'Reminders', icon: '/assets/macos/reminders.png', color: 'text-blue-500', bg: 'transparent', core: false },
  { id: 'terminal', name: 'Terminal', icon: '/assets/macos/terminal.png', color: 'text-zinc-200', bg: 'transparent', core: false },
  { id: 'activity', name: 'Activity Monitor', icon: '/assets/macos/activity_monitor.png', color: 'text-green-500', bg: 'transparent', core: false },
  { id: 'contacts', name: 'Contacts', icon: '/assets/macos/contacts.png', color: 'text-gray-500', bg: 'transparent', core: false },
  { id: 'pages', name: 'Pages', icon: '/assets/macos/pages.png', color: 'text-orange-600', bg: 'transparent', core: false },
];
