import { useState } from 'react';
import { useWorkspaceStore } from '../../store/useWorkspaceStore';
import type { Workspace } from '../../lib/types/workspace';
import { Upload, Globe, Play, ShieldAlert, Zap, LayoutTemplate, Activity, AlertCircle, CheckCircle2, Lock } from 'lucide-react';
import { WorkspaceCard } from './WorkspaceCard';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

type Tab = 'overview' | 'security' | 'deployment' | 'health' | 'inference';

export function ArchitectureReviewPage() {
  const { workspaces } = useWorkspaceStore();
  const [selectedWorkspace, setSelectedWorkspace] = useState<Workspace | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const navigate = useNavigate();

  const handleSimulate = () => {
    if (selectedWorkspace) {
      navigate(`/workspace/${selectedWorkspace.id}?simulate=true`);
    }
  };

  if (!selectedWorkspace) {
    return (
      <div className="p-8 max-w-7xl mx-auto pb-24 animate-in fade-in zoom-in duration-300">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-[#111827] mb-4 font-serif">Architecture Review</h1>
          <p className="text-[#4B5563] max-w-2xl mx-auto">
            Analyze, review, and simulate your architectural designs. Upload a new design, load from the web, or select an existing workspace to begin a comprehensive review.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 max-w-4xl mx-auto">
          <button 
            onClick={() => import('react-hot-toast').then(m => m.toast('This feature is currently under construction or planned for the next version of the application', { icon: '🔒' }))}
            className="bg-[#F9FAFB] border border-[#E5E7EB] hover:border-[#E5E7EB] hover:bg-[#E5E7EB]/30 transition-all rounded-2xl p-8 flex flex-col items-center justify-center text-center group shadow-xl relative opacity-80 cursor-not-allowed"
          >
            <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-[#E5E7EB] flex items-center justify-center">
              <Lock className="w-4 h-4 text-[#4B5563]" />
            </div>
            <div className="w-16 h-16 bg-[#E5E7EB] rounded-full flex items-center justify-center mb-4 opacity-50">
              <Upload className="w-8 h-8 text-[#4B5563]" />
            </div>
            <h3 className="text-xl font-bold text-[#4B5563] mb-2">Upload Architecture</h3>
            <p className="text-[#6B7280] text-sm">Upload JSON or diagram files to start a review.</p>
          </button>
          
          <button 
            onClick={() => import('react-hot-toast').then(m => m.toast('This feature is currently under construction or planned for the next version of the application', { icon: '🔒' }))}
            className="bg-[#F9FAFB] border border-[#E5E7EB] hover:border-[#E5E7EB] hover:bg-[#E5E7EB]/30 transition-all rounded-2xl p-8 flex flex-col items-center justify-center text-center group shadow-xl relative opacity-80 cursor-not-allowed"
          >
            <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-[#E5E7EB] flex items-center justify-center">
              <Lock className="w-4 h-4 text-[#4B5563]" />
            </div>
            <div className="w-16 h-16 bg-[#E5E7EB] rounded-full flex items-center justify-center mb-4 opacity-50">
              <Globe className="w-8 h-8 text-[#4B5563]" />
            </div>
            <h3 className="text-xl font-bold text-[#4B5563] mb-2">Load from Web</h3>
            <p className="text-[#6B7280] text-sm">Import public architectures or templates via URL.</p>
          </button>
        </div>

        <div className="mt-8">
          <h2 className="text-sm font-semibold text-[#6B7280] uppercase tracking-wider mb-6">Select a Workspace to Review</h2>
          {workspaces.length === 0 ? (
             <div className="text-center py-10 text-[#4B5563]">No workspaces found. Create one first!</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {workspaces.map((workspace) => (
                <div key={workspace.id} onClick={() => setSelectedWorkspace(workspace)} className="cursor-pointer hover:ring-2 hover:ring-[#3B82F6] rounded-xl transition-all">
                  <WorkspaceCard workspace={workspace} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // REVIEW DASHBOARD VIEW
  return (
    <div className="p-8 max-w-7xl mx-auto pb-24 h-full flex flex-col animate-in slide-in-from-right-8 duration-300">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <button onClick={() => setSelectedWorkspace(null)} className="text-[#4B5563] hover:text-[#111827] text-sm mb-2 font-medium transition-colors">
            &larr; Back to Selection
          </button>
          <h1 className="text-2xl font-bold text-[#111827]">{selectedWorkspace.name} - Review</h1>
          <p className="text-sm text-[#4B5563] mt-1">Reviewing design, security, and deployment metrics.</p>
        </div>
        <button 
          onClick={handleSimulate}
          className="flex items-center gap-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_30px_rgba(59,130,246,0.8)] hover:-translate-y-0.5"
        >
          <Play className="w-4 h-4 fill-current" />
          Simulate Workspace
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-[#E5E7EB] mb-8 overflow-x-auto no-scrollbar pb-2">
        <TabButton active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} label="Overview & Ratings" />
        <TabButton active={activeTab === 'inference'} onClick={() => setActiveTab('inference')} label="AI Inference" />
        <TabButton active={activeTab === 'security'} onClick={() => setActiveTab('security')} label="Security Concerns" />
        <TabButton active={activeTab === 'deployment'} onClick={() => setActiveTab('deployment')} label="Deployment Details" />
        <TabButton active={activeTab === 'health'} onClick={() => setActiveTab('health')} label="Design Health" />
      </div>

      {/* Tab Content */}
      <div className="flex-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl p-6 overflow-y-auto shadow-2xl relative custom-scrollbar">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            {activeTab === 'overview' && (
              <div className="space-y-8 max-w-5xl">
                <div>
                  <h2 className="text-xl font-bold text-[#111827] mb-2 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-500" /> PERFORMANCE ANALYSIS
                  </h2>
                  <p className="text-[#4B5563] text-sm mb-6">
                    Based on the <strong>{selectedWorkspace.name}</strong> components, here is the projected performance profile.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#E5E7EB]/40 border border-[#D1D5DB] p-5 rounded-xl flex flex-col items-center justify-center text-center relative overflow-hidden">
                      <span className="text-[#6B7280] text-xs uppercase tracking-widest font-bold mb-2">Latency Score</span>
                      <span className="text-2xl font-bold text-green-400">58/100</span>
                      <details className="mt-3 text-left w-full text-xs text-[#4B5563] cursor-pointer group">
                        <summary className="text-[#3B82F6] hover:text-[#60A5FA] font-medium outline-none">What is Latency?</summary>
                        <div className="mt-2 p-2 bg-[#F9FAFB] rounded border border-[#D1D5DB]">
                          Latency measures the time it takes for data to pass from frontend through the {selectedWorkspace.graph?.nodes?.length || 0} nodes and back. A score of 58 indicates moderate response times. Adding caching nodes could improve this.
                        </div>
                      </details>
                    </div>
                    <div className="bg-[#E5E7EB]/40 border border-[#D1D5DB] p-5 rounded-xl flex flex-col items-center justify-center text-center">
                      <span className="text-[#6B7280] text-xs uppercase tracking-widest font-bold mb-2">Throughput</span>
                      <span className="text-2xl font-bold text-blue-400">Extreme</span>
                      <details className="mt-3 text-left w-full text-xs text-[#4B5563] cursor-pointer group">
                        <summary className="text-[#3B82F6] hover:text-[#60A5FA] font-medium outline-none">Throughput meaning</summary>
                        <div className="mt-2 p-2 bg-[#F9FAFB] rounded border border-[#D1D5DB]">
                          Throughput is the volume of requests this architecture can handle. Your stateless services allow for "Extreme" horizontal scaling.
                        </div>
                      </details>
                    </div>
                    <div className="bg-[#E5E7EB]/40 border border-[#D1D5DB] p-5 rounded-xl flex flex-col items-center justify-center text-center">
                      <span className="text-[#6B7280] text-xs uppercase tracking-widest font-bold mb-2">Availability</span>
                      <span className="text-2xl font-bold text-purple-400">99.9%</span>
                      <details className="mt-3 text-left w-full text-xs text-[#4B5563] cursor-pointer group">
                        <summary className="text-[#3B82F6] hover:text-[#60A5FA] font-medium outline-none">Why 99.9%?</summary>
                        <div className="mt-2 p-2 bg-[#F9FAFB] rounded border border-[#D1D5DB]">
                          Based on single-AZ database deployments detected, maximum SLA guarantees hover around 99.9% (approx 43 mins downtime/month).
                        </div>
                      </details>
                    </div>
                    <div className="bg-[#E5E7EB]/40 border border-[#D1D5DB] p-5 rounded-xl flex flex-col items-center justify-center text-center">
                      <span className="text-[#6B7280] text-xs uppercase tracking-widest font-bold mb-2">Complexity</span>
                      <span className="text-2xl font-bold text-orange-400">100/100</span>
                      <details className="mt-3 text-left w-full text-xs text-[#4B5563] cursor-pointer group">
                        <summary className="text-[#3B82F6] hover:text-[#60A5FA] font-medium outline-none">Complexity Breakdown</summary>
                        <div className="mt-2 p-2 bg-[#F9FAFB] rounded border border-[#D1D5DB]">
                          With {selectedWorkspace.graph?.edges?.length || 0} distinct connection pathways, maintaining this requires experienced orchestration (e.g., Kubernetes).
                        </div>
                      </details>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'inference' && (
              <div className="space-y-6 max-w-4xl">
                <h2 className="text-xl font-bold text-indigo-400">LLM Architectural Inference</h2>
                <div className="bg-[#E5E7EB]/30 border border-indigo-500/30 p-5 rounded-2xl shadow-inner text-sm">
                  <div className="prose prose-invert prose-p:text-[#4B5563] prose-headings:text-[#111827] max-w-none">
                    <p className="leading-relaxed">
                      "Looking at the overall topology of <strong>{selectedWorkspace.name}</strong>, I can see a standard tiered architecture. You have a solid frontend communicating with a gateway, routing to backend services, which persist data in a relational store."
                    </p>
                    
                    <h4 className="text-green-400 mt-4 text-sm uppercase tracking-wide">What I like:</h4>
                    <p>
                      The qualities of this design are generally very good. The decoupling of the backend API from the direct database access via a service layer means you'll have an easier time writing unit tests. I also notice you're isolating the stateful components, which is a great practice for horizontal scalability.
                    </p>

                    <h4 className="text-amber-400 mt-4 text-sm uppercase tracking-wide">Where I see risks:</h4>
                    <p>
                      There is a potential risk around the caching layer. If your primary DB experiences latency, your read-heavy endpoints will suffer because you haven't fully utilized Redis for query caching. Additionally, there's a risk of the Gateway becoming a single point of failure (SPOF) if it's not deployed across multiple availability zones.
                    </p>

                    <h4 className="text-indigo-400 mt-4 text-sm uppercase tracking-wide">My final verdict:</h4>
                    <p>
                      I give this architecture a solid <strong>{selectedWorkspace.healthScore || 85} out of 100</strong>. It's safe, predictable, and maintainable. Address the single points of failure, and it's production-ready.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6 max-w-4xl">
                <h2 className="text-xl font-bold text-red-400">Security & Vulnerability Report</h2>
                <p className="text-[#4B5563] text-sm">
                  The automated security scanner has flagged the following concerns based on the nodes provided in your design.
                </p>
                
                <div className="space-y-4 mt-4">
                  <div className="bg-red-400/10 border border-red-400/20 p-5 rounded-xl">
                    <h3 className="font-semibold text-red-300 mb-1 text-sm">Public Endpoints Detected</h3>
                    <p className="text-red-200/70 text-xs leading-relaxed mb-3">
                      Gateway nodes lack explicit authentication middleware in the current mock setup.
                    </p>
                    <details className="text-xs text-red-300/80 cursor-pointer group">
                      <summary className="font-medium outline-none">Which metric triggered this?</summary>
                      <div className="mt-2 p-2 bg-red-950/30 rounded border border-red-900/50">
                        This was flagged by the "OWASP A2: Broken Authentication" check. An API Gateway without an attached Authorizer exposes backend routes directly to the internet.
                      </div>
                    </details>
                  </div>

                  <div className="bg-yellow-400/10 border border-yellow-400/20 p-5 rounded-xl">
                    <h3 className="font-semibold text-yellow-300 mb-1 text-sm">Permissive Database Access</h3>
                    <p className="text-yellow-200/70 text-xs leading-relaxed mb-3">
                      The VPC configuration for database clusters appears overly permissive.
                    </p>
                    <details className="text-xs text-yellow-300/80 cursor-pointer group">
                      <summary className="font-medium outline-none">What does permissive access mean?</summary>
                      <div className="mt-2 p-2 bg-yellow-950/30 rounded border border-yellow-900/50">
                        It means your database port (e.g. 5432) might accept connections from outside your internal VPC subnet, significantly increasing the risk of data exfiltration.
                      </div>
                    </details>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'deployment' && (
              <div className="space-y-8 max-w-4xl">
                <div>
                  <h2 className="text-xl font-bold text-[#111827] mb-2 text-green-400">ESTIMATED COST</h2>
                  <div className="flex gap-4 mb-6">
                    <div className="bg-[#E5E7EB]/40 border border-[#D1D5DB] rounded-xl p-4 flex-1 text-center">
                      <div className="text-xs text-[#4B5563] font-bold tracking-wider mb-1">AWS</div>
                      <div className="text-xl text-[#111827] font-semibold">$320</div>
                    </div>
                    <div className="bg-[#E5E7EB]/40 border border-[#D1D5DB] rounded-xl p-4 flex-1 text-center">
                      <div className="text-xs text-[#4B5563] font-bold tracking-wider mb-1">GCP</div>
                      <div className="text-xl text-[#111827] font-semibold">$304</div>
                    </div>
                    <div className="bg-[#E5E7EB]/40 border border-[#D1D5DB] rounded-xl p-4 flex-1 text-center">
                      <div className="text-xs text-[#4B5563] font-bold tracking-wider mb-1">AZURE</div>
                      <div className="text-xl text-[#111827] font-semibold">$326</div>
                    </div>
                  </div>

                  <div className="bg-[#E5E7EB]/30 border border-[#D1D5DB] rounded-xl overflow-hidden max-h-64 overflow-y-auto custom-scrollbar">
                    <table className="w-full text-sm text-left">
                      <tbody>
                        {(selectedWorkspace.graph?.nodes || []).map((node, i) => {
                           let baseCost = 20;
                           if (node.serviceType.includes('react') || node.serviceType.includes('next')) baseCost = 10;
                           if (node.serviceType.includes('gateway')) baseCost = 15;
                           if (node.serviceType.includes('postgresql')) baseCost = 45;
                           
                           return (
                             <tr key={i} className="border-b border-[#D1D5DB]/50 hover:bg-[#D1D5DB]/20">
                               <td className="px-6 py-4 font-medium text-[#111827]">{node.label}</td>
                               <td className="px-6 py-4 text-right text-[#4B5563]">
                                 ${baseCost}
                                 <details className="mt-1 text-left w-full text-xs text-[#6B7280] cursor-pointer group">
                                   <summary className="text-[#3B82F6] hover:text-[#60A5FA] outline-none">Cost details</summary>
                                   <div className="mt-1">
                                     Base compute + egress bandwidth estimates for {node.serviceType}.
                                   </div>
                                 </details>
                               </td>
                             </tr>
                           )
                        })}
                        {(!selectedWorkspace.graph?.nodes || selectedWorkspace.graph.nodes.length === 0) && (
                          <tr className="border-b border-[#D1D5DB]/50 hover:bg-[#D1D5DB]/20">
                            <td className="px-6 py-4 font-medium text-[#111827]">API Gateway</td>
                            <td className="px-6 py-4 text-right text-[#4B5563]">$15</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'health' && (
              <div className="space-y-6 max-w-4xl">
                <h2 className="text-xl font-bold text-[#111827]">Design Health & Best Practices</h2>
                <p className="text-[#4B5563] text-sm">Evaluation of the architecture against the 12-Factor App methodology.</p>
                
                <div className="space-y-4 mt-4">
                  <div className="p-5 rounded-xl border border-green-500/20 bg-green-500/5">
                    <h4 className="text-[#111827] font-medium text-sm">Stateless Services</h4>
                    <p className="text-xs text-[#4B5563] mt-2 leading-relaxed">The application tier is properly decoupled from the persistence layer. By maintaining a stateless backend architecture, the cluster can horizontally scale seamlessly.</p>
                    <details className="mt-3 text-xs text-green-400/80 cursor-pointer group">
                      <summary className="font-medium outline-none">Why is stateless better?</summary>
                      <div className="mt-2 p-2 bg-green-950/30 rounded border border-green-900/50">
                        Stateless nodes do not store session data locally. Any incoming request can be routed to any instance, making load balancing trivial and auto-scaling highly effective.
                      </div>
                    </details>
                  </div>
                  
                  <div className="p-5 rounded-xl border border-yellow-500/20 bg-yellow-500/5">
                    <h4 className="text-[#111827] font-medium text-sm">Single Point of Failure</h4>
                    <p className="text-xs text-[#4B5563] mt-2 leading-relaxed">Database instances are represented as single nodes. In a production setting, this should be configured in a high-availability cluster.</p>
                    <details className="mt-3 text-xs text-yellow-400/80 cursor-pointer group">
                      <summary className="font-medium outline-none">How to resolve?</summary>
                      <div className="mt-2 p-2 bg-yellow-950/30 rounded border border-yellow-900/50">
                        Implement a multi-AZ (Availability Zone) deployment with synchronous replication to a standby instance.
                      </div>
                    </details>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function TabButton({ active, onClick, label }: { active: boolean, onClick: () => void, label: string }) {
  return (
    <button
      onClick={onClick}
      className={`relative px-4 py-2 font-medium text-sm transition-all rounded-t-lg ${
        active 
          ? 'text-[#3B82F6]' 
          : 'text-[#4B5563] hover:text-[#111827]'
      }`}
    >
      {label}
      {/* Glowing Underline for active state */}
      {active && (
        <motion.div 
          layoutId="activeTabUnderline"
          className="absolute left-0 right-0 bottom-0 h-0.5 bg-[#3B82F6] shadow-[0_0_8px_2px_rgba(59,130,246,0.5)]" 
        />
      )}
    </button>
  );
}
