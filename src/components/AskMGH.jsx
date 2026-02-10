import React, { useState, useRef, useEffect } from 'react';
import {
  Ship, Clock, AlertTriangle, AlertCircle, BarChart3, TrendingUp, Send,
  Plus, MessageSquare, ArrowLeft, Trash2
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { chatResponses, suggestedQuestions } from '../data/dummyData';

const iconMap = { Ship, Clock, AlertTriangle, AlertCircle, BarChart3, TrendingUp };

const TypingIndicator = () => (
  <div className="flex items-center gap-1 px-4 py-3">
    <div className="w-6 h-6 rounded-full bg-mgh-blue/10 flex items-center justify-center mr-2">
      <span className="text-[8px] font-bold text-mgh-blue">M</span>
    </div>
    <div className="bg-white rounded-lg rounded-bl-none px-4 py-3 shadow-sm flex items-center gap-1.5">
      <span className="w-2 h-2 rounded-full bg-mgh-blue typing-dot" />
      <span className="w-2 h-2 rounded-full bg-mgh-blue typing-dot" />
      <span className="w-2 h-2 rounded-full bg-mgh-blue typing-dot" />
    </div>
  </div>
);

const ChatCard = ({ card }) => (
  <div className="bg-white border border-mgh-grey/20 rounded-lg p-4 mt-2">
    <h4 className="font-barlow font-bold text-sm text-mgh-blue mb-3">{card.title}</h4>
    <div className="space-y-2">
      {card.fields.map((f, i) => (
        <div key={i} className="flex justify-between items-center">
          <span className="font-barlow font-bold text-[10px] uppercase text-mgh-grey tracking-wider">{f.label}</span>
          <span className={`font-barlow text-sm ${f.highlight ? 'text-amber-600 font-bold' : 'text-mgh-charcoal'}`}>
            {f.badge && (
              <span className={`mr-2 px-1.5 py-0.5 rounded text-[10px] font-bold ${f.badge === 'warning' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                }`}>{f.badge === 'warning' ? 'WARNING' : 'ALERT'}</span>
            )}
            {f.value}
          </span>
        </div>
      ))}
    </div>
    {card.alert && (
      <div className="mt-3 border-l-3 border-amber-500 bg-amber-50 rounded-r p-2.5" style={{ borderLeftWidth: '3px' }}>
        <p className="font-barlow text-xs text-amber-800">{card.alert}</p>
      </div>
    )}
  </div>
);

const ChatTable = ({ table }) => (
  <div className="mt-2 overflow-x-auto rounded-lg border border-mgh-grey/20">
    <table className="w-full text-xs">
      <thead>
        <tr className="bg-mgh-blue text-white">
          {table.headers.map((h, i) => (
            <th key={i} className="px-3 py-2 text-left font-barlow font-bold uppercase tracking-wider">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {table.rows.map((row, i) => (
          <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-mgh-light'}>
            {row.map((cell, j) => (
              <td key={j} className={`px-3 py-2 font-barlow ${cell.includes('HIGH') ? 'text-red-500 font-bold' :
                cell.includes('MEDIUM') ? 'text-amber-500 font-bold' :
                  'text-mgh-charcoal'
                }`}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const ChatChart = ({ chart }) => {
  if (chart.type === 'bar') {
    return (
      <div className="mt-3 bg-mgh-light/50 rounded-lg p-3">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chart.data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey={chart.xKey} tick={{ fontSize: 10, fontFamily: 'Barlow Condensed', fill: '#2A2A38' }} />
            <YAxis tick={{ fontSize: 10, fontFamily: 'Space Mono', fill: '#B2B8BF' }} label={{ value: chart.yLabel, angle: -90, position: 'insideLeft', style: { fontSize: 10, fontFamily: 'Barlow Condensed', fill: '#B2B8BF' } }} />
            <Tooltip contentStyle={{ fontFamily: 'Barlow Condensed', fontSize: 12, borderRadius: 8 }} />
            <Bar dataKey={chart.yKey} fill={chart.color} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  if (chart.type === 'grouped_bar') {
    return (
      <div className="mt-3 bg-mgh-light/50 rounded-lg p-3">
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={chart.data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey={chart.xKey} tick={{ fontSize: 10, fontFamily: 'Barlow Condensed', fill: '#2A2A38' }} />
            <YAxis tick={{ fontSize: 10, fontFamily: 'Space Mono', fill: '#B2B8BF' }} label={{ value: chart.yLabel, angle: -90, position: 'insideLeft', style: { fontSize: 10, fontFamily: 'Barlow Condensed', fill: '#B2B8BF' } }} />
            <Tooltip contentStyle={{ fontFamily: 'Barlow Condensed', fontSize: 12, borderRadius: 8 }} />
            <Legend wrapperStyle={{ fontFamily: 'Barlow Condensed', fontSize: 11 }} />
            {chart.bars.map((bar) => (
              <Bar key={bar.key} dataKey={bar.key} name={bar.label} fill={bar.color} radius={[3, 3, 0, 0]} />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return null;
};

const formatText = (text) => {
  if (!text) return null;
  return text.split('\n').map((line, i) => {
    const formatted = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    return (
      <p key={i} className="font-barlow text-sm text-mgh-charcoal leading-relaxed" dangerouslySetInnerHTML={{ __html: formatted }} />
    );
  });
};

// Generate a short title from the first user message
const getChatTitle = (msgs) => {
  const firstUser = msgs.find(m => m.role === 'user');
  if (!firstUser) return 'New Chat';
  const text = firstUser.content;
  return text.length > 40 ? text.slice(0, 40) + '...' : text;
};

const AskMGH = () => {
  // Chat sessions: array of { id, messages, createdAt }
  const [chatSessions, setChatSessions] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const activeChat = chatSessions.find(c => c.id === activeChatId);
  const messages = activeChat ? activeChat.messages : [];
  const isEmpty = messages.length === 0 && !activeChatId;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const findResponse = (query) => {
    const lower = query.toLowerCase();
    for (const cr of chatResponses) {
      if (cr.keywords.some(k => lower.includes(k.toLowerCase()))) {
        return cr.response;
      }
    }
    return {
      type: 'text',
      text: "I can help you with questions about:\n\n**Shipment & PO status** — \"What's the status of SHP-2026-00891?\"\n\n**Transit times & TAT** — \"Average TAT for Shanghai-Rotterdam?\"\n\n**Delay analysis** — \"Any anticipated delays on PO-2026-44918?\"\n\n**Exceptions & risk** — \"Which shipments from Chittagong are at risk?\"\n\n**KPI comparisons** — \"Compare container utilization across trade lanes\"\n\n**Performance metrics** — \"Show OTD comparison: this month vs last\"\n\nTry one of these, or ask me anything about your supply chain!"
    };
  };

  const startNewChat = () => {
    const newChat = { id: Date.now().toString(), messages: [], createdAt: new Date() };
    setChatSessions(prev => [newChat, ...prev]);
    setActiveChatId(newChat.id);
  };

  const goBackToWelcome = () => {
    // If active chat has no messages, remove it
    if (activeChat && activeChat.messages.length === 0) {
      setChatSessions(prev => prev.filter(c => c.id !== activeChatId));
    }
    setActiveChatId(null);
  };

  const deleteChat = (chatId, e) => {
    e.stopPropagation();
    setChatSessions(prev => prev.filter(c => c.id !== chatId));
    if (activeChatId === chatId) {
      setActiveChatId(null);
    }
  };

  const sendMessage = (text) => {
    if (!text.trim()) return;

    let chatId = activeChatId;
    // If no active chat, create one
    if (!chatId) {
      const newChat = { id: Date.now().toString(), messages: [], createdAt: new Date() };
      setChatSessions(prev => [newChat, ...prev]);
      chatId = newChat.id;
      setActiveChatId(chatId);
    }

    const userMsg = { role: 'user', content: text, time: new Date() };

    setChatSessions(prev => prev.map(c =>
      c.id === chatId ? { ...c, messages: [...c.messages, userMsg] } : c
    ));
    setInput('');
    setIsTyping(true);

    const delay = 800 + Math.random() * 700;
    setTimeout(() => {
      const response = findResponse(text);
      const aiMsg = { role: 'ai', response, time: new Date() };
      setIsTyping(false);
      setChatSessions(prev => prev.map(c =>
        c.id === chatId ? { ...c, messages: [...c.messages, aiMsg] } : c
      ));
    }, delay);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleSuggestion = (query) => {
    sendMessage(query);
  };

  const handleFollowUp = (text) => {
    sendMessage(text);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const showWelcome = !activeChatId;

  return (
    <div className="flex h-[calc(100vh-3.5rem)] animate-fade-in">
      {/* Chat History Sidebar */}
      <div className="w-56 bg-white border-r border-mgh-grey/15 flex flex-col flex-shrink-0">
        <div className="p-3 border-b border-mgh-grey/15">
          <button
            onClick={startNewChat}
            className="w-full flex items-center gap-2 bg-mgh-blue text-white px-3 py-2 rounded-lg font-barlow font-bold text-xs uppercase tracking-wider hover:bg-mgh-navy transition-colors"
          >
            <Plus size={14} strokeWidth={2} />
            New Chat
          </button>
        </div>
        <div className="flex-1 overflow-y-auto py-2">
          {chatSessions.length === 0 ? (
            <p className="text-center text-mgh-grey text-xs font-barlow py-6 px-3">
              No previous chats yet. Start a conversation!
            </p>
          ) : (
            chatSessions.map(session => (
              <button
                key={session.id}
                onClick={() => setActiveChatId(session.id)}
                className={`w-full text-left px-3 py-2.5 flex items-start gap-2 group transition-colors ${activeChatId === session.id
                  ? 'bg-mgh-blue/5 border-r-2 border-mgh-blue'
                  : 'hover:bg-mgh-light'
                  }`}
              >
                <MessageSquare size={14} strokeWidth={2} className="text-mgh-blue flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="font-barlow text-xs text-mgh-charcoal truncate font-bold">
                    {getChatTitle(session.messages)}
                  </p>
                  <p className="font-barlow text-[10px] text-mgh-grey mt-0.5">
                    {session.messages.length > 0
                      ? `${Math.floor(session.messages.length / 2)} exchanges`
                      : 'Empty'
                    }
                  </p>
                </div>
                <button
                  onClick={(e) => deleteChat(session.id, e)}
                  className="opacity-0 group-hover:opacity-100 text-mgh-grey hover:text-red-500 transition-all flex-shrink-0"
                >
                  <Trash2 size={12} strokeWidth={2} />
                </button>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Back button when in a chat */}
        {/* Header Bar */}
        <div className="px-4 py-2 border-b border-mgh-grey/15 bg-white flex items-center justify-between shadow-sm z-10">
          <div className="flex items-center gap-3">
            {/* Mobile Sidebar Toggle */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden text-mgh-blue hover:text-mgh-navy"
            >
              <MessageSquare size={20} />
            </button>

            {activeChatId && (
              <button
                onClick={goBackToWelcome}
                className="flex items-center gap-1.5 text-mgh-blue hover:text-mgh-navy font-barlow font-bold text-xs uppercase tracking-wider transition-colors"
              >
                <ArrowLeft size={16} strokeWidth={2} />
                Back
              </button>
            )}
          </div>

          {activeChat && activeChat.messages.length > 0 && (
            <span className="font-barlow text-xs text-mgh-grey truncate max-w-[150px] md:max-w-xs text-right">
              {getChatTitle(activeChat.messages)}
            </span>
          )}
        </div>

        {/* Chat Messages / Welcome */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <div className="max-w-3xl mx-auto">
            {/* Welcome / Empty State */}
            {showWelcome && (
              <div className="flex flex-col items-center justify-center pt-12">
                <h1 className="font-oswald font-semibold text-[28px] uppercase text-mgh-blue tracking-wide">
                  MGH ASK™
                </h1>
                <p className="font-barlow text-base text-mgh-grey mt-1">
                  Your AI-Powered Supply Chain Assistant
                </p>
                <p className="font-barlow text-sm text-mgh-grey mt-3 text-center max-w-md">
                  Ask me anything about your shipments, purchase orders, delays, exceptions, and performance metrics.
                </p>

                {/* Suggested Questions */}
                <div className="grid grid-cols-2 gap-3 mt-8 w-full max-w-lg">
                  {suggestedQuestions.map((sq, i) => {
                    const Icon = iconMap[sq.icon];
                    return (
                      <button
                        key={i}
                        onClick={() => handleSuggestion(sq.query)}
                        className="bg-white border border-mgh-grey/30 rounded-lg px-4 py-3 text-left hover:border-mgh-blue hover:shadow-sm transition-all group"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          {Icon && <Icon size={14} strokeWidth={2} className="text-mgh-blue" />}
                          <span className="font-barlow font-bold text-xs uppercase text-mgh-blue">{sq.label}</span>
                        </div>
                        <p className="font-barlow text-xs text-mgh-grey group-hover:text-mgh-charcoal transition-colors line-clamp-2">
                          {sq.query}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Active Chat — Empty state */}
            {activeChatId && messages.length === 0 && !isTyping && (
              <div className="flex flex-col items-center justify-center pt-16">
                <h2 className="font-oswald font-semibold text-xl uppercase text-mgh-blue tracking-wide">
                  New Conversation
                </h2>
                <p className="font-barlow text-sm text-mgh-grey mt-1">
                  Type a question below to get started
                </p>
                <div className="grid grid-cols-2 gap-3 mt-6 w-full max-w-lg">
                  {suggestedQuestions.map((sq, i) => {
                    const Icon = iconMap[sq.icon];
                    return (
                      <button
                        key={i}
                        onClick={() => handleSuggestion(sq.query)}
                        className="bg-white border border-mgh-grey/30 rounded-lg px-4 py-3 text-left hover:border-mgh-blue hover:shadow-sm transition-all group"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          {Icon && <Icon size={14} strokeWidth={2} className="text-mgh-blue" />}
                          <span className="font-barlow font-bold text-xs uppercase text-mgh-blue">{sq.label}</span>
                        </div>
                        <p className="font-barlow text-xs text-mgh-grey group-hover:text-mgh-charcoal transition-colors line-clamp-2">
                          {sq.query}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Messages */}
            {messages.map((msg, i) => (
              <div key={i} className={`mb-4 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`}>
                {msg.role === 'ai' && (
                  <div className="w-6 h-6 rounded-full bg-mgh-blue/10 flex items-center justify-center mr-2 flex-shrink-0 mt-1">
                    <span className="text-[8px] font-bold text-mgh-blue">M</span>
                  </div>
                )}
                <div className="max-w-[85%]">
                  {msg.role === 'user' ? (
                    <div className="bg-mgh-blue text-white px-4 py-2.5 rounded-lg rounded-br-none shadow-sm">
                      <p className="font-barlow text-sm">{msg.content}</p>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <div className="bg-white px-4 py-3 rounded-lg rounded-bl-none shadow-sm border border-mgh-grey/10">
                        {formatText(msg.response.text)}
                        {msg.response.summary && (
                          <div className="mt-2">{formatText(msg.response.summary)}</div>
                        )}
                        {msg.response.card && <ChatCard card={msg.response.card} />}
                        {msg.response.table && <ChatTable table={msg.response.table} />}
                        {msg.response.chart && <ChatChart chart={msg.response.chart} />}
                        {msg.response.breakdown && (
                          <p className="mt-2 font-barlow text-xs text-mgh-grey italic">{msg.response.breakdown}</p>
                        )}
                      </div>
                      {msg.response.followUp && (
                        <button
                          onClick={() => handleFollowUp(msg.response.followUp)}
                          className="text-mgh-cyan text-xs font-barlow hover:underline mt-1 ml-1"
                        >
                          {msg.response.followUp}
                        </button>
                      )}
                    </div>
                  )}
                  <p className="text-[10px] text-mgh-grey font-barlow mt-1 px-1">
                    {formatTime(msg.time)}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Bar — only shown when in a chat or on welcome */}
        <div className="border-t border-mgh-grey/20 bg-white px-4 py-3">
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex gap-3">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask about shipments, POs, delays, KPIs..."
              className="flex-1 border border-mgh-grey/40 rounded-lg px-4 py-2.5 text-sm font-barlow focus:outline-none focus:ring-2 focus:ring-mgh-blue/30 focus:border-mgh-blue placeholder:text-mgh-grey"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="bg-mgh-blue text-white p-2.5 rounded-lg hover:bg-mgh-navy transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Send size={18} strokeWidth={2} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AskMGH;
