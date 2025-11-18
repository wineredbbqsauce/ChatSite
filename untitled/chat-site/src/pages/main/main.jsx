import React, { useState } from 'react';
import { Send, Hash, Users, Settings, Plus, Search, Menu, Camera, Phone, Video, MoreVertical, Smile, Image, Mic, Code, GitBranch, Paperclip, TrendingUp } from 'lucide-react';

export default function FusionChat() {
    const [messages, setMessages] = useState([
        { id: 1, text: "Hey team! Just pushed the new feature to production 🚀", user: 'sarah.dev', avatar: 'from-purple-500 to-pink-500', time: '10:30 AM', isOwn: false },
        { id: 2, text: "Awesome work! The performance improvements are incredible", user: 'You', avatar: 'from-cyan-500 to-blue-600', time: '10:32 AM', isOwn: true },
        { id: 3, text: "Should we schedule a demo for the stakeholders?", user: 'mike.chen', avatar: 'from-orange-500 to-red-500', time: '10:33 AM', isOwn: false },
        { id: 4, text: "Great idea! How about tomorrow at 2pm?", user: 'emma.wilson', avatar: 'from-green-500 to-teal-500', time: '10:34 AM', isOwn: false },
        { id: 5, text: "Perfect timing! I'll send out the calendar invite", user: 'You', avatar: 'from-cyan-500 to-blue-600', time: '10:35 AM', isOwn: true },
    ]);
    const [input, setInput] = useState('');
    const [activeServer, setActiveServer] = useState('dev');
    const [activeChannel, setActiveChannel] = useState('general');

    const servers = [
        { id: 'dev', name: 'Dev', icon: 'DT', color: 'from-indigo-500 to-purple-600' },
        { id: 'design', name: 'Design', icon: 'DS', color: 'from-pink-500 to-rose-600' },
        { id: 'marketing', name: 'Marketing', icon: 'MK', color: 'from-green-500 to-emerald-600' },
    ];

    const channels = [
        { name: 'general', type: 'text', unread: 0 },
        { name: 'announcements', type: 'text', unread: 2 },
        { name: 'dev-talk', type: 'text', unread: 0 },
        { name: 'code-review', type: 'text', unread: 5 },
    ];

    const members = [
        { name: 'You', username: 'you', status: 'online', avatar: 'from-cyan-500 to-blue-600' },
        { name: 'Sarah Dev', username: 'sarah.dev', status: 'online', avatar: 'from-purple-500 to-pink-500' },
        { name: 'Mike Chen', username: 'mike.chen', status: 'idle', avatar: 'from-orange-500 to-red-500' },
        { name: 'Emma Wilson', username: 'emma.wilson', status: 'online', avatar: 'from-green-500 to-teal-500' },
    ];

    const handleSend = () => {
        if (input.trim()) {
            setMessages([...messages, {
                id: messages.length + 1,
                text: input,
                user: 'You',
                avatar: 'from-cyan-500 to-blue-600',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                isOwn: true
            }]);
            setInput('');
        }
    };

    return (
        <div className="flex h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            {/* Server Bar */}
            <div className="w-20 bg-slate-950/80 backdrop-blur-xl border-r border-slate-800/50 flex flex-col items-center py-4 space-y-3">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl hover:rounded-xl transition-all duration-300 cursor-pointer flex items-center justify-center font-bold text-lg shadow-lg shadow-cyan-500/20">
                    <Menu size={24} />
                </div>
                <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent my-2" />
                {servers.map((server) => (
                    <div
                        key={server.id}
                        onClick={() => setActiveServer(server.id)}
                        className={`w-12 h-12 bg-gradient-to-br ${server.color} rounded-2xl hover:rounded-xl transition-all duration-300 cursor-pointer flex items-center justify-center font-bold text-sm shadow-lg relative group ${
                            activeServer === server.id ? 'ring-2 ring-white/30 rounded-xl' : ''
                        }`}
                    >
                        {server.icon}
                        {activeServer !== server.id && (
                            <div className="absolute left-0 w-1 h-0 bg-white rounded-r group-hover:h-8 transition-all duration-300" />
                        )}
                        {activeServer === server.id && (
                            <div className="absolute left-0 w-1 h-8 bg-white rounded-r" />
                        )}
                    </div>
                ))}
                <div className="w-12 h-12 bg-slate-800/50 hover:bg-slate-700/50 rounded-2xl hover:rounded-xl transition-all duration-300 cursor-pointer flex items-center justify-center border border-slate-700/50">
                    <Plus size={24} className="text-slate-400" />
                </div>
            </div>

            {/* Channels Sidebar */}
            <div className="w-64 bg-slate-900/50 backdrop-blur-xl border-r border-slate-800/50 flex flex-col">
                {/* Server Header */}
                <div className="h-14 px-4 flex items-center justify-between border-b border-slate-800/50 hover:bg-slate-800/30 cursor-pointer transition">
                    <div className="flex items-center space-x-2">
                        <div className={`w-8 h-8 bg-gradient-to-br ${servers.find(s => s.id === activeServer)?.color} rounded-lg`} />
                        <h2 className="font-semibold text-slate-100">Dev Team</h2>
                    </div>
                    <TrendingUp size={16} className="text-slate-400" />
                </div>

                {/* Search */}
                <div className="p-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500" size={16} />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full pl-9 pr-3 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:bg-slate-800/70 transition"
                        />
                    </div>
                </div>

                {/* Channels */}
                <div className="flex-1 overflow-y-auto px-2 space-y-1">
                    <div className="mb-3">
                        <div className="px-2 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                            <span>Channels</span>
                            <Plus size={14} className="cursor-pointer hover:text-slate-200 transition" />
                        </div>
                        {channels.map((channel) => (
                            <div
                                key={channel.name}
                                onClick={() => setActiveChannel(channel.name)}
                                className={`px-3 py-2 rounded-lg flex items-center justify-between cursor-pointer transition-all ${
                                    activeChannel === channel.name
                                        ? 'bg-gradient-to-r from-cyan-600/30 to-blue-600/30 text-white border border-cyan-500/30'
                                        : 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-200'
                                }`}
                            >
                                <div className="flex items-center space-x-2">
                                    <Hash size={16} />
                                    <span className="text-sm font-medium">{channel.name}</span>
                                </div>
                                {channel.unread > 0 && (
                                    <span className="px-1.5 py-0.5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full text-xs font-bold">
                    {channel.unread}
                  </span>
                                )}
                            </div>
                        ))}
                    </div>

                    <div>
                        <div className="px-2 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">Direct Messages</div>
                        {members.slice(1).map((member) => (
                            <div
                                key={member.username}
                                className="px-3 py-2 rounded-lg flex items-center space-x-2 cursor-pointer text-slate-400 hover:bg-slate-800/40 hover:text-slate-200 transition"
                            >
                                <div className="relative">
                                    <div className={`w-7 h-7 bg-gradient-to-br ${member.avatar} rounded-full`} />
                                    <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-slate-900 ${
                                        member.status === 'online' ? 'bg-green-500' : 'bg-yellow-500'
                                    }`} />
                                </div>
                                <span className="text-sm font-medium">{member.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* User Profile */}
                <div className="h-16 bg-slate-950/60 border-t border-slate-800/50 px-3 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <div className="relative">
                            <div className="w-9 h-9 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full" />
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-950" />
                        </div>
                        <div className="text-sm">
                            <div className="font-semibold text-slate-100">You</div>
                            <div className="text-xs text-green-400">● Online</div>
                        </div>
                    </div>
                    <Settings size={18} className="text-slate-400 hover:text-slate-200 cursor-pointer transition" />
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
                {/* Chat Header */}
                <div className="h-14 px-6 flex items-center justify-between border-b border-slate-800/50 bg-slate-900/30 backdrop-blur-xl">
                    <div className="flex items-center space-x-3">
                        <Hash size={22} className="text-slate-400" />
                        <div>
                            <h2 className="font-semibold text-slate-100 text-lg">{activeChannel}</h2>
                            <div className="flex items-center space-x-2 text-xs text-slate-400">
                                <GitBranch size={12} />
                                <span>4 members active</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <button className="p-2 hover:bg-slate-800/50 rounded-lg transition">
                            <Phone size={18} className="text-slate-400 hover:text-slate-200" />
                        </button>
                        <button className="p-2 hover:bg-slate-800/50 rounded-lg transition">
                            <Video size={20} className="text-slate-400 hover:text-slate-200" />
                        </button>
                        <button className="p-2 hover:bg-slate-800/50 rounded-lg transition">
                            <MoreVertical size={18} className="text-slate-400 hover:text-slate-200" />
                        </button>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex items-start space-x-3 ${msg.isOwn ? 'flex-row-reverse space-x-reverse' : ''} group`}
                        >
                            <div className={`w-10 h-10 bg-gradient-to-br ${msg.avatar} rounded-full flex-shrink-0 flex items-center justify-center font-bold text-sm shadow-lg`}>
                                {msg.user[0].toUpperCase()}
                            </div>
                            <div className={`flex-1 max-w-2xl ${msg.isOwn ? 'items-end' : 'items-start'} flex flex-col`}>
                                <div className={`flex items-baseline space-x-2 mb-1 ${msg.isOwn ? 'flex-row-reverse space-x-reverse' : ''}`}>
                                    <span className="font-semibold text-slate-200 text-sm">{msg.user}</span>
                                    <span className="text-xs text-slate-500">{msg.time}</span>
                                </div>
                                <div
                                    className={`px-4 py-2.5 rounded-2xl shadow-lg ${
                                        msg.isOwn
                                            ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-tr-sm'
                                            : 'bg-slate-800/60 backdrop-blur-sm text-slate-100 border border-slate-700/50 rounded-tl-sm'
                                    }`}
                                >
                                    <p className="text-[15px] leading-relaxed">{msg.text}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-slate-800/50 bg-slate-900/30 backdrop-blur-xl">
                    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl focus-within:border-cyan-500/50 transition-all shadow-lg">
                        <div className="flex items-center px-4 py-3 space-x-2">
                            <button className="p-1.5 hover:bg-slate-700/50 rounded-lg transition">
                                <Plus size={20} className="text-slate-400 hover:text-slate-200" />
                            </button>
                            <button className="p-1.5 hover:bg-slate-700/50 rounded-lg transition">
                                <Image size={20} className="text-slate-400 hover:text-slate-200" />
                            </button>
                            <button className="p-1.5 hover:bg-slate-700/50 rounded-lg transition">
                                <Smile size={20} className="text-slate-400 hover:text-slate-200" />
                            </button>
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder={`Message #${activeChannel}`}
                                className="flex-1 bg-transparent text-slate-100 placeholder-slate-500 focus:outline-none px-2"
                            />
                            <button className="p-1.5 hover:bg-slate-700/50 rounded-lg transition">
                                <Mic size={20} className="text-slate-400 hover:text-slate-200" />
                            </button>
                            <button
                                onClick={handleSend}
                                className="p-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded-lg transition-all shadow-lg shadow-cyan-500/20"
                            >
                                <Send size={18} className="text-white" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Members Sidebar */}
            <div className="w-60 bg-slate-900/30 backdrop-blur-xl border-l border-slate-800/50 p-4">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center justify-between">
                    <span>Members — {members.length}</span>
                    <Users size={14} />
                </div>
                <div className="space-y-1">
                    {members.map((member, i) => (
                        <div key={i} className="flex items-center space-x-3 px-2 py-2 rounded-lg hover:bg-slate-800/40 cursor-pointer transition group">
                            <div className="relative">
                                <div className={`w-9 h-9 bg-gradient-to-br ${member.avatar} rounded-full shadow-lg`} />
                                <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-slate-900 ${
                                    member.status === 'online' ? 'bg-green-500' : 'bg-yellow-500'
                                }`} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-sm font-medium text-slate-200 truncate">{member.name}</div>
                                <div className="text-xs text-slate-500 truncate">{member.username}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}