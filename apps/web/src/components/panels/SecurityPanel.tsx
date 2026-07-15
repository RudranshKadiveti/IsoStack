import { useArchStore } from '../../store/useArchStore';
import { ShieldCheck, ShieldAlert, Lock, Key, Network, Database } from 'lucide-react';

export function SecurityPanel() {
  const graph = useArchStore((s) => s.graph);

  if (!graph || (graph.nodes?.length || 0) === 0) {
    return (
      <div className="p-8 text-center text-[#6B7280]">
        <ShieldCheck className="w-12 h-12 mx-auto mb-4 opacity-20" />
        <p>Add nodes to your architecture to see security analysis.</p>
      </div>
    );
  }

  const nodes = graph.nodes || [];
  
  // Rules evaluation
  const hasGateway = nodes.some(n => ['api_gateway', 'kong', 'traefik', 'cloudflare', 'nginx'].includes(n.serviceType));
  const hasAuth = nodes.some(n => n.layer === 'auth' || ['auth0', 'keycloak'].includes(n.serviceType));
  const hasSecrets = nodes.some(n => ['vault', 'aws_kms'].includes(n.serviceType));
  const hasPrivateDB = nodes.some(n => n.layer === 'database'); // We just assume DB needs private net
  const hasWaf = nodes.some(n => ['cloudflare', 'aws_waf'].includes(n.serviceType) || (n.layer as string) === 'security');

  const checklist = [
    {
      id: 'network',
      title: 'Network Segmentation',
      description: hasGateway ? 'API Gateway / Edge Proxy is present to handle ingress routing and protect internal services.' : 'Missing API Gateway or Edge Proxy. Compute nodes might be directly exposed to the internet.',
      passed: hasGateway,
      icon: <Network className="w-4 h-4" />
    },
    {
      id: 'auth',
      title: 'Authentication & Identity',
      description: hasAuth ? 'Dedicated Authentication layer detected.' : 'No centralized identity provider detected. Ensure custom auth is robust or add an IDP like Auth0/Keycloak.',
      passed: hasAuth,
      icon: <Lock className="w-4 h-4" />
    },
    {
      id: 'secrets',
      title: 'Secrets Management',
      description: hasSecrets ? 'Secret management service detected (e.g. Vault).' : 'No secrets manager detected. Avoid hardcoding DB credentials in environment variables if possible.',
      passed: hasSecrets,
      icon: <Key className="w-4 h-4" />
    },
    {
      id: 'encryption',
      title: 'Data Encryption',
      description: hasPrivateDB ? 'Database present. Ensure data-at-rest encryption is enabled on the storage volume.' : 'No persistent storage detected requiring data-at-rest encryption.',
      passed: !hasPrivateDB || true, // Treat as info/passed since we can't fully detect config
      icon: <Database className="w-4 h-4" />
    },
    {
      id: 'waf',
      title: 'WAF & DDoS Protection',
      description: hasWaf ? 'Web Application Firewall or DDoS protection detected.' : 'Consider adding Cloudflare or AWS WAF to protect against malicious payloads and volumetric attacks.',
      passed: hasWaf,
      icon: <ShieldCheck className="w-4 h-4" />
    }
  ];

  const passedCount = checklist.filter(c => c.passed).length;
  const score = Math.round((passedCount / checklist.length) * 100);

  return (
    <div className="p-4 space-y-4">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-[#111827] mb-1">Security Posture</h3>
        <p className="text-xs text-[#4B5563]">Automated security analysis of your architecture.</p>
      </div>

      <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-4 flex items-center justify-between mb-4">
        <div>
          <p className="text-[10px] text-[#6B7280] uppercase tracking-wider font-bold mb-1">Security Score</p>
          <p className={`text-2xl font-bold font-mono ${score > 70 ? 'text-emerald-400' : score > 40 ? 'text-yellow-400' : 'text-red-400'}`}>
            {score}/100
          </p>
        </div>
        {score === 100 ? <ShieldCheck className="w-10 h-10 text-emerald-400 opacity-50" /> : <ShieldAlert className="w-10 h-10 text-amber-500 opacity-50" />}
      </div>

      <div className="space-y-3">
        {checklist.map((item) => (
          <div key={item.id} className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <div className={`p-1.5 rounded-md ${item.passed ? 'bg-emerald-400/10 text-emerald-400' : 'bg-amber-400/10 text-amber-500'}`}>
                {item.icon}
              </div>
              <h4 className="text-xs font-bold text-[#111827]">{item.title}</h4>
              {item.passed ? 
                <span className="ml-auto text-[9px] bg-emerald-400/20 text-emerald-400 px-2 py-0.5 rounded uppercase font-bold">Pass</span> :
                <span className="ml-auto text-[9px] bg-amber-400/20 text-amber-400 px-2 py-0.5 rounded uppercase font-bold">Review</span>
              }
            </div>
            <p className="text-[10px] text-[#4B5563] leading-relaxed ml-9">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
