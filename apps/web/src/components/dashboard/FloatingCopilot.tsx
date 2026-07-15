import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Send, Loader2 } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { chatWithAarkus } from '../../lib/api';
import { useArchStore } from '../../store/useArchStore';
import { useWorkspaceStore } from '../../store/useWorkspaceStore';
import ReactMarkdown from 'react-markdown';

type Message = { role: 'user' | 'assistant'; content: string; id: string };

const THINKING_MESSAGES = [
  "Analyzing architecture...",
  "Reviewing dependencies...",
  "Evaluating design patterns...",
  "Structuring recommendations...",
  "Synthesizing context..."
];

export function FloatingCopilot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init',
      role: 'assistant',
      content: "Hello! I'm Aarkus, your AI architectural assistant. I can help you navigate, create workspaces, or review your designs. What would you like to do?"
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [thinkingIndex, setThinkingIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isLoading) {
      interval = setInterval(() => {
        setThinkingIndex((prev) => (prev + 1) % THINKING_MESSAGES.length);
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput('');
    
    const newMsg: Message = { id: Date.now().toString(), role: 'user', content: userText };
    setMessages(prev => [...prev, newMsg]);
    setIsLoading(true);
    setThinkingIndex(0);

    try {
      let contextData = '';
      if (id) {
        const graph = useArchStore.getState().graph;
        contextData = `Active Workspace ID: ${id}\nGraph Blueprint:\n${JSON.stringify(graph, null, 2)}`;
      } else {
        const workspaces = useWorkspaceStore.getState().workspaces.map(w => ({
          name: w.name,
          id: w.id,
          provider: w.cloudProvider,
          health: w.healthScore
        }));
        contextData = `User is on the Dashboard. Existing Workspaces:\n${JSON.stringify(workspaces, null, 2)}`;
      }

      // Convert to API format, exclude IDs
      const apiMessages = messages.concat(newMsg).map(m => ({ role: m.role, content: m.content }));
      
      const { reply } = await chatWithAarkus(apiMessages, contextData);
      
      setMessages(prev => [...prev, { id: Date.now().toString() + 'a', role: 'assistant', content: reply }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { id: Date.now().toString() + 'e', role: 'assistant', content: "Sorry, I encountered an error communicating with the server." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center">
        <AnimatePresence mode="wait">
          {!isOpen && (
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(true)}
              className="px-5 py-2.5 bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] rounded-full shadow-[0_0_20px_rgba(59,130,246,0.3)] flex items-center gap-3 text-white relative overflow-hidden group border border-[#60A5FA]/30"
            >
              <div className="absolute inset-0 bg-white/20 blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <Sparkles className="w-4 h-4 relative z-10 animate-pulse" />
              <span className="relative z-10 text-sm font-medium tracking-wide">Ask Aarkus</span>
            </motion.button>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="absolute bottom-0 w-[420px] h-[520px] bg-[#F9FAFB]/90 backdrop-blur-xl border border-[#E5E7EB] rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="h-14 border-b border-[#E5E7EB] flex items-center justify-between px-4 bg-[#FFFFFF]/50 shrink-0">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#3B82F6]" />
                  <span className="font-semibold text-[#111827] text-sm tracking-wide">Aarkus</span>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-[#6B7280] hover:text-[#111827] hover:bg-[#E5E7EB] rounded-md transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Chat Area */}
              <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex flex-col gap-1 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className={`rounded-2xl p-3 max-w-[85%] text-sm ${
                      msg.role === 'user' 
                        ? 'bg-[#3B82F6] text-white rounded-br-sm' 
                        : 'bg-[#E5E7EB] text-[#111827] rounded-tl-sm markdown-body'
                    }`}>
                      {msg.role === 'user' ? (
                        msg.content
                      ) : (
                        <ReactMarkdown
                          components={{
                            p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                            ul: ({node, ...props}) => <ul className="list-disc pl-4 mb-2 space-y-1" {...props} />,
                            ol: ({node, ...props}) => <ol className="list-decimal pl-4 mb-2 space-y-1" {...props} />,
                            li: ({node, ...props}) => <li className="leading-relaxed" {...props} />,
                            strong: ({node, ...props}) => <strong className="font-semibold text-[#030712]" {...props} />,
                            code: ({node, inline, ...props}: any) => 
                              inline 
                                ? <code className="bg-[#FFFFFF] px-1.5 py-0.5 rounded text-[13px] font-mono text-[#60A5FA]" {...props} />
                                : <pre className="bg-[#FFFFFF] p-3 rounded-lg overflow-x-auto text-[13px] font-mono mb-2 border border-[#D1D5DB]"><code {...props} /></pre>,
                          }}
                        >
                          {msg.content}
                        </ReactMarkdown>
                      )}
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex flex-col gap-1 items-start">
                    <div className="bg-[#E5E7EB] rounded-2xl rounded-tl-sm p-3 text-sm text-[#111827] flex items-center gap-3">
                      <Loader2 className="w-4 h-4 animate-spin text-[#3B82F6]" />
                      <AnimatePresence mode="wait">
                        <motion.span 
                          key={thinkingIndex}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          transition={{ duration: 0.2 }}
                          className="text-[#4B5563] text-[13px]"
                        >
                          {THINKING_MESSAGES[thinkingIndex]}
                        </motion.span>
                      </AnimatePresence>
                    </div>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="p-3 border-t border-[#E5E7EB] bg-[#FFFFFF]/80 shrink-0">
                <div className="relative">
                  <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ask Aarkus anything..."
                    className="w-full bg-[#E5E7EB] border border-[#D1D5DB] rounded-xl pl-4 pr-10 py-2.5 text-sm text-[#111827] placeholder-[#6B7280] focus:outline-none focus:border-[#3B82F6] transition-colors"
                  />
                  <button 
                    onClick={handleSend}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-[#3B82F6] hover:text-[#60A5FA] transition-colors disabled:opacity-50" 
                    disabled={!input.trim() || isLoading}
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
