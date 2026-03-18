import { Inbox, Send, Archive, Trash2, Mail as MailIcon, Edit, Reply, MoreHorizontal } from 'lucide-react';

export default function Mail() {
  const emails = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    sender: `Sender ${i + 1}`,
    subject: `Important Update ${i + 1}`,
    preview: 'This is a preview of the email content that runs long and gets truncated eventually.',
    date: '10:42 AM',
    unread: i < 2
  }));

  return (
    <div className="w-full h-full flex bg-white text-gray-800 text-sm">
      {/* Sidebar */}
      <div className="w-56 bg-[#f5f5f5] border-r border-gray-200 flex flex-col pt-10 drag-handle shrink-0">
         <div className="flex-1 overflow-y-auto px-2 space-y-0.5">
            <div className="text-xs font-semibold text-gray-400 px-2 mb-1 mt-2">Favorites</div>
            <div className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-blue-500 text-white cursor-pointer shadow-sm"><Inbox size={16} /> All Inboxes</div>
            <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-gray-200 text-gray-700 cursor-pointer"><MailIcon size={16} className="text-gray-500" /> iCloud</div>
            <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-gray-200 text-gray-700 cursor-pointer"><Send size={16} className="text-gray-500" /> Sent</div>
            
            <div className="text-xs font-semibold text-gray-400 px-2 mb-1 mt-4">Smart Mailboxes</div>
            <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-gray-200 text-gray-700 cursor-pointer"><Archive size={16} className="text-gray-500"/> Archive</div>
            <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-gray-200 text-gray-700 cursor-pointer"><Trash2 size={16} className="text-gray-500"/> Trash</div>
         </div>
      </div>

      {/* Message List */}
      <div className="w-72 bg-white border-r border-gray-200 flex flex-col shrink-0">
         <div className="h-12 border-b border-gray-200 bg-[#f6f6f6] flex items-center px-4 justify-between drag-handle shrink-0">
           <div className="font-semibold text-gray-700">Inbox</div>
           <Edit size={16} className="text-gray-500 hover:text-blue-500 cursor-pointer" />
         </div>
         <div className="flex-1 overflow-y-auto">
            {emails.map(email => (
              <div key={email.id} className={`p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 relative ${email.unread ? 'bg-blue-50/30' : ''}`}>
                 {email.unread && <div className="absolute left-2 top-4 w-2 h-2 rounded-[24px] bg-blue-500" />}
                 <div className="pl-4">
                   <div className="flex justify-between items-baseline mb-0.5">
                     <div className={`font-semibold truncate ${email.unread ? 'text-black' : 'text-gray-800'}`}>{email.sender}</div>
                     <div className={`text-xs ${email.unread ? 'text-blue-500 font-medium' : 'text-gray-400'}`}>{email.date}</div>
                   </div>
                   <div className="font-medium text-gray-700 truncate mb-0.5">{email.subject}</div>
                   <div className="text-gray-500 line-clamp-2 text-xs leading-relaxed">{email.preview}</div>
                 </div>
              </div>
            ))}
         </div>
      </div>

      {/* Message Viewer */}
      <div className="flex-1 bg-white flex flex-col min-w-0">
         <div className="h-12 border-b border-gray-200 bg-[#f6f6f6] flex items-center px-4 justify-end gap-4 drag-handle shrink-0">
           <Reply size={16} className="text-gray-500 hover:text-gray-800 cursor-pointer" />
           <Trash2 size={16} className="text-gray-500 hover:text-gray-800 cursor-pointer" />
           <MoreHorizontal size={16} className="text-gray-500 hover:text-gray-800 cursor-pointer" />
         </div>
         <div className="flex-1 p-8 overflow-y-auto">
           <h1 className="text-2xl font-bold text-gray-800 mb-4">{emails[0].subject}</h1>
           <div className="flex items-center gap-3 mb-8">
             <div className="w-10 h-10 rounded-[24px] bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold text-lg">
               S
             </div>
             <div>
                <div className="font-medium text-gray-800">{emails[0].sender}</div>
                <div className="text-xs text-gray-500">To: Samuel Serrao</div>
             </div>
             <div className="ml-auto text-sm text-gray-400">{emails[0].date}</div>
           </div>
           
           <div className="prose text-gray-700 text-sm max-w-none">
             <p>Hi Samuel,</p>
             <p>This is a simulated email body confirming that the Mail application shell is rendering perfectly within the macOS Sequoia replica framework. The three-pane layout accurately mimics the native Mail application.</p>
             <p>Best regards,<br/>The Development Team</p>
           </div>
         </div>
      </div>
    </div>
  );
}
