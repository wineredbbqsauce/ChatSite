import React, { useState } from 'react';
import { Send, Hash, Users, Settings, Plus, Search, Menu, Phone, Video, MoreVertical, Smile, Image, Mic, GitBranch, TrendingUp } from 'lucide-react';
import '../styles/main.css'; // Import MAIN CSS file

export default function FusionChat() {
    const [messages, setMessages] = useState([
        // { id: 1, text: "Hey team! Just pushed the new feature to production 🚀", user: 'sarah.dev', avatarClass: 'avatar-purple', time: '10:30 AM', isOwn: false },
        // { id: 2, text: "Awesome work! The performance improvements are incredible", user: 'You', avatarClass: 'avatar-cyan', time: '10:32 AM', isOwn: true },
        // { id: 3, text: "Should we schedule a demo for the stakeholders?", user: 'mike.chen', avatarClass: 'avatar-orange', time: '10:33 AM', isOwn: false },
        // { id: 4, text: "Great idea! How about tomorrow at 2pm?", user: 'emma.wilson', avatarClass: 'avatar-green', time: '10:34 AM', isOwn: false },
        // { id: 5, text: "Perfect timing! I'll send out the calendar invite", user: 'You', avatarClass: 'avatar-cyan', time: '10:35 AM', isOwn: true },
    ]);
    const [input, setInput] = useState('');
    const [activeServer, setActiveServer] = useState('dev');
    const [activeChannel, setActiveChannel] = useState('general');

    const servers = [
        { id: 'dev', name: 'Dev', icon: 'DT', colorClass: 'dev' },
        { id: 'design', name: 'Design', icon: 'DS', colorClass: 'design' },
        { id: 'marketing', name: 'Marketing', icon: 'MK', colorClass: 'marketing' },
    ];

    const channels = [
        { name: 'general', type: 'text', unread: 0 },
        { name: 'announcements', type: 'text', unread: 2 },
        { name: 'dev-talk', type: 'text', unread: 0 },
        { name: 'code-review', type: 'text', unread: 5 },
    ];

    const members = [
        { name: 'You', username: 'you', status: 'online', avatarClass: 'avatar-cyan' },
        { name: 'Sarah Dev', username: 'sarah.dev', status: 'online', avatarClass: 'avatar-purple' },
        { name: 'Mike Chen', username: 'mike.chen', status: 'idle', avatarClass: 'avatar-orange' },
        { name: 'Emma Wilson', username: 'emma.wilson', status: 'online', avatarClass: 'avatar-green' },
    ];

    const handleSend = () => {
        if (input.trim()) {
            setMessages([...messages, {
                id: messages.length + 1,
                text: input,
                user: 'You',
                avatarClass: 'avatar-cyan',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                isOwn: true
            }]);
            setInput('');
        }
    };

    return (
        <div className="container">
            {/* Server Bar */}
            <div className="server-bar">
                <div className="server-home">
                    <Menu size={24} />
                </div>
                <div className="server-divider" />
                {servers.map((server) => (
                    <div
                        key={server.id}
                        onClick={() => setActiveServer(server.id)}
                        className={`server-icon ${server.colorClass} ${activeServer === server.id ? 'active' : ''}`}
                    >
                        {server.icon}
                    </div>
                ))}
                <div className="server-add">
                    <Plus size={24} />
                </div>
            </div>

            {/* Channels Sidebar */}
            <div className="channels-sidebar">
                <div className="server-header">
                    <div className="server-header-content">
                        <div className="server-avatar" />
                        <h2 className="server-name">Dev Team</h2>
                    </div>
                    <TrendingUp size={16} />
                </div>

                <div className="search-container">
                    <Search className="search-icon" size={16} />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="search-input"
                    />
                </div>

                <div className="channel-list">
                    <div className="channel-section">
                        <div className="channel-header">
                            <span>Channels</span>
                            <Plus size={14} />
                        </div>
                        {channels.map((channel) => (
                            <div
                                key={channel.name}
                                onClick={() => setActiveChannel(channel.name)}
                                className={`channel-item ${activeChannel === channel.name ? 'active' : ''}`}
                            >
                                <div className="channel-content">
                                    <Hash size={16} />
                                    <span>{channel.name}</span>
                                </div>
                                {channel.unread > 0 && (
                                    <span className="unread-badge">{channel.unread}</span>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="channel-section">
                        <div className="channel-header">Direct Messages</div>
                        {members.slice(1).map((member) => (
                            <div key={member.username} className="channel-item">
                                <div className="channel-content">
                                    <div className={`member-avatar ${member.avatarClass}`}>
                                        <div className="status-indicator" />
                                    </div>
                                    <span>{member.name}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="user-profile">
                    <div className="user-info">
                        <div className="user-avatar">
                            <div className="status-indicator" />
                        </div>
                        <div className="user-details">
                            <div className="username">You</div>
                            <div className="user-status">● Online</div>
                        </div>
                    </div>
                    <Settings size={18} />
                </div>
            </div>

            {/* Chat Area */}
            <div className="chat-container">
                <div className="chat-header">
                    <div className="chat-title">
                        <Hash size={22} />
                        <div>
                            <h2 className="chat-name">{activeChannel}</h2>
                            <div className="chat-info">
                                <GitBranch size={12} />
                                <span>4 members active</span>
                            </div>
                        </div>
                    </div>
                    <div className="chat-actions">
                        <button className="action-btn">
                            <Phone size={18} />
                        </button>
                        <button className="action-btn">
                            <Video size={20} />
                        </button>
                        <button className="action-btn">
                            <MoreVertical size={18} />
                        </button>
                    </div>
                </div>

                <div className="messages">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`message ${msg.isOwn ? 'own' : ''}`}>
                            <div className={`message-avatar ${msg.avatarClass}`}>
                                {msg.user[0].toUpperCase()}
                            </div>
                            <div className="message-content">
                                <div className="message-header">
                                    <span className="message-author">{msg.user}</span>
                                    <span className="message-time">{msg.time}</span>
                                </div>
                                <div className="message-bubble">
                                    <p>{msg.text}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="input-area">
                    <div className="input-container">
                        <div className="input-toolbar">
                            <button className="input-btn">
                                <Plus size={20} />
                            </button>
                            <button className="input-btn">
                                <Image size={20} />
                            </button>
                            <button className="input-btn">
                                <Smile size={20} />
                            </button>
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder={`Message #${activeChannel}`}
                                className="message-input"
                            />
                            <button className="input-btn">
                                <Mic size={20} />
                            </button>
                            <button onClick={handleSend} className="send-btn">
                                <Send size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Members Sidebar */}
            <div className="members-sidebar">
                <div className="members-header">
                    <span>Members — {members.length}</span>
                    <Users size={14} />
                </div>
                <div className="member-list">
                    {members.map((member, i) => (
                        <div key={i} className="member-item">
                            <div className={`member-avatar ${member.avatarClass}`}>
                                <div className="status-indicator" />
                            </div>
                            <div className="member-info">
                                <div className="member-name">{member.name}</div>
                                <div className="member-username">{member.username}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}