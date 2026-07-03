import { useEffect, useRef, useState } from 'react';
import { useSimulationStore } from '../../store/useSimulationStore';
import { useArchStore } from '../../store/useArchStore';
import { motion, AnimatePresence } from 'framer-motion';
import { XCircle, Play, Square, AlertTriangle, Info, ArrowRight, Pause } from 'lucide-react';
import { useSearchParams, useNavigate } from 'react-router-dom';

export function SimulationOverlay() {
  const { isSimulating, isPaused, togglePause, startSimulation, stopSimulation, setActiveElement, activeNodeId, message, failureMode } = useSimulationStore();
  const graph = useArchStore(s => s.graph);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Track simulation state locally so we can pause/resume
  const stepRef = useRef(0);
  const isFinishedRef = useRef(false);

  useEffect(() => {
    if (searchParams.get('simulate') === 'true' && !isSimulating) {
      startSimulation();
      searchParams.delete('simulate');
      setSearchParams(searchParams);
    }
  }, [searchParams, isSimulating, startSimulation, setSearchParams]);

  useEffect(() => {
    if (isSimulating && graph) {
      stepRef.current = 0;
      isFinishedRef.current = false;
      runSimulationStep();
    } else {
      if (timerRef.current) clearTimeout(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isSimulating, graph]);

  // Handle Pause/Resume
  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearTimeout(timerRef.current);
    } else if (isSimulating && !isFinishedRef.current) {
      runSimulationStep();
    }
  }, [isPaused]);

  const runSimulationStep = () => {
    if (!graph || !graph.nodes || graph.nodes.length === 0) {
      setActiveElement(null, null, "No architecture nodes to simulate.", null);
      timerRef.current = setTimeout(() => stopSimulation(), 3000);
      return;
    }

    const nodes = [...graph.nodes];
    const edges = [...(graph.edges || [])];
    
    // Sort nodes to simulate a flow
    nodes.sort((a, b) => {
      const getPriority = (type: string) => {
        if (type.includes('react') || type.includes('next') || type.includes('vue') || type.includes('client')) return 1;
        if (type.includes('gateway') || type.includes('nginx')) return 2;
        if (type.includes('node') || type.includes('python') || type.includes('java') || type.includes('go')) return 3;
        if (type.includes('sql') || type.includes('mongo') || type.includes('redis') || type.includes('cache')) return 4;
        return 5;
      };
      return getPriority(a.serviceType) - getPriority(b.serviceType);
    });

    const step = stepRef.current;

    if (step >= nodes.length) {
      isFinishedRef.current = true;
      setActiveElement(null, null, `Simulation complete for ${graph.project_name || 'workspace'}. Workflow verified successfully.`, null);
      timerRef.current = setTimeout(() => stopSimulation(), 4000);
      return;
    }

    const node = nodes[step];
    let incomingEdge = null;
    if (step > 0) {
      const prevNode = nodes[step - 1];
      incomingEdge = edges.find(e => e.source === prevNode.id && e.target === node.id) || null;
    }

    const projectNameContext = graph.project_name ? ` for ${graph.project_name}` : '';
    
    const labelLower = node.label.toLowerCase();
    let msg = `Processing data at ${node.label}${projectNameContext}.`;
    let failMsg = null;

    // AI & Agents
    if (labelLower.includes('agent') || labelLower.includes('parser') || labelLower.includes('llama') || labelLower.includes('analyzer')) {
      const task = labelLower.includes('resume') ? 'parsing resumes and extracting candidate entities' :
                   labelLower.includes('syllabus') ? 'analyzing syllabus content and identifying course objectives' :
                   labelLower.includes('doc') ? 'extracting text from the provided documents' :
                   'processing complex AI inference tasks';
                   
      msg = `${node.label} activates. It leverages its configured tools and LLM frameworks to execute ${task}. The resulting structured data is prepared to be passed to the next node in the workflow.`;
      if (Math.random() > 0.8) failMsg = `API Rate Limit Exceeded: The agent is making too many rapid requests to the external LLM provider.`;
    }
    // Orchestrator
    else if (labelLower.includes('orchestrator') || labelLower.includes('manager') || labelLower.includes('coordinator')) {
      msg = `The ${node.label} takes over control. It evaluates the current state of the workflow and intelligently routes the payload to the appropriate specialized agents downstream based on the data type.`;
    }
    // Auth
    else if (labelLower.includes('auth') || labelLower.includes('login') || labelLower.includes('security')) {
      msg = `${node.label} intercepts the request. It verifies user credentials, issues secure JWT tokens, and ensures the client has the correct RBAC permissions before allowing the workflow to proceed.`;
      if (Math.random() > 0.85) failMsg = `Authentication Failed: Invalid or expired token provided by the client.`;
    }
    // Frontend
    else if (node.serviceType.includes('react') || node.serviceType.includes('next') || node.serviceType.includes('vue') || labelLower.includes('frontend') || labelLower.includes('ui')) {
      msg = `The user interface at ${node.label} renders the initial view. User interactions trigger state updates, and an API payload containing the user's files and prompts is sent over HTTPS.`;
      if (Math.random() > 0.85) failMsg = `CORS Error: Cross-Origin Request Blocked. Ensure the backend gateway explicitly allows this origin.`;
    } 
    // Gateway
    else if (node.serviceType.includes('gateway') || node.serviceType.includes('nginx') || labelLower.includes('gateway')) {
      msg = `${node.label} acts as the primary entry point. It handles rate limiting, terminates SSL connections, and proxies the incoming client request to the internal microservices network.`;
      if (Math.random() > 0.8) failMsg = `Gateway Timeout (504): An upstream agent or service took too long to respond.`;
    } 
    // Database
    else if (node.serviceType.includes('postgresql') || node.serviceType.includes('mongo') || labelLower.includes('db') || labelLower.includes('database')) {
      msg = `${node.label} executes a transactional query. It securely persists the processed output from the upstream agents to the underlying storage volume for later retrieval.`;
      if (Math.random() > 0.85) failMsg = `Connection Refused: Max connection pool limit reached. Consider adding PgBouncer or a connection pooler.`;
    } 
    // Cache
    else if (node.serviceType.includes('redis') || node.serviceType.includes('memcached') || labelLower.includes('cache')) {
      msg = `Checking ${node.label} cache for an existing response to reduce database load. A cache hit returns immediately; a miss triggers a fallback query to the primary DB.`;
    } 
    // Serverless
    else if (node.serviceType.includes('lambda') || node.serviceType.includes('functions')) {
      msg = `${node.label} serverless function spins up (Cold Start). Executing ephemeral task processing on the isolated payload before shutting down.`;
      if (Math.random() > 0.75) failMsg = `Cold Start Delay: Function initialization took >2s, causing a minor latency spike.`;
    } 
    // Fallback
    else {
      msg = `${node.label} executes its core business logic. It transforms the incoming payload into the required schema and passes it along the defined edge.`;
    }

    setActiveElement(node.id, incomingEdge?.id || null, msg, failMsg);

    stepRef.current++;
    timerRef.current = setTimeout(() => {
      if (!isPaused) runSimulationStep();
    }, 4000); 
  };

  return (
    <AnimatePresence>
      {isSimulating && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[100] w-full max-w-xl pointer-events-auto"
        >
          <div className="bg-[#0F172A]/95 backdrop-blur-2xl border border-[#3B82F6]/40 p-6 rounded-3xl shadow-[0_20px_60px_-15px_rgba(59,130,246,0.4)] relative overflow-hidden">
            {/* Animated glowing border effect */}
            <div className={`absolute inset-0 border-2 border-transparent bg-[linear-gradient(90deg,#3B82F6,transparent,#10B981)] opacity-20 mix-blend-screen rounded-3xl pointer-events-none ${isPaused ? '' : 'animate-pulse'}`} />
            
            <div className="flex items-start justify-between relative z-10">
              <div className="flex items-center gap-3 mb-4 text-[#3B82F6]">
                {isPaused ? (
                   <Pause className="w-5 h-5 fill-current" />
                ) : (
                   <Play className="w-5 h-5 fill-current animate-pulse" />
                )}
                <h3 className="font-bold tracking-wide uppercase text-sm">
                  {isPaused ? 'Simulation Paused' : 'Simulation Running'}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={togglePause}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-[#1E293B] hover:bg-[#334155] text-[#94A3B8] hover:text-[#F1F5F9] transition-colors border border-[#334155]"
                  title={isPaused ? "Resume" : "Pause"}
                >
                  {isPaused ? <Play className="w-4 h-4 fill-current" /> : <Pause className="w-4 h-4 fill-current" />}
                </button>
                <button 
                  onClick={stopSimulation}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-[#1E293B] hover:bg-red-500/20 text-[#94A3B8] hover:text-red-400 transition-colors border border-[#334155] hover:border-red-500/30"
                  title="Stop Simulation"
                >
                  <Square className="w-4 h-4 fill-current" />
                </button>
              </div>
            </div>

            <div className="relative z-10 space-y-4">
              {message && (
                <div className="flex items-start gap-3 bg-gradient-to-r from-[#1E293B]/80 to-[#1E293B]/40 p-4 rounded-xl border border-[#334155]/80 shadow-inner">
                  <Info className="w-5 h-5 text-[#3B82F6] shrink-0 mt-0.5" />
                  <p className="text-[#F1F5F9] text-sm leading-relaxed tracking-wide font-medium">{message}</p>
                </div>
              )}

              {failureMode && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="flex items-start gap-3 bg-gradient-to-r from-red-500/20 to-red-500/5 p-4 rounded-xl border border-red-500/30 shadow-inner"
                >
                  <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5 animate-bounce" />
                  <div>
                    <span className="text-red-400 text-[11px] font-bold uppercase tracking-wider mb-1 block">Potential Failure Mode</span>
                    <p className="text-red-200/90 text-sm leading-relaxed">{failureMode}</p>
                  </div>
                </motion.div>
              )}
            </div>
            
            <div className="mt-6 h-1.5 w-full bg-[#1E293B] rounded-full overflow-hidden shadow-inner">
              <div 
                className={`h-full bg-gradient-to-r from-[#3B82F6] via-[#60A5FA] to-[#10B981] ${isPaused ? '' : 'animate-[progress_4s_linear_infinite]'}`} 
                style={{ width: '100%', opacity: isPaused ? 0.5 : 1 }} 
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
