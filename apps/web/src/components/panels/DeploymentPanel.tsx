import { useArchStore } from '../../store/useArchStore';
import { useState } from 'react';
import { CheckCircle2, ChevronRight, Server, Cloud, Terminal } from 'lucide-react';

export function DeploymentPanel() {
  const graph = useArchStore((s) => s.graph);
  const [provider, setProvider] = useState<'aws' | 'gcp' | 'azure'>('aws');

  if (!graph || (graph.nodes?.length || 0) === 0) {
    return (
      <div className="p-8 text-center text-[#64748B]">
        <Terminal className="w-12 h-12 mx-auto mb-4 opacity-20" />
        <p>Add nodes to your architecture to see deployment guides.</p>
      </div>
    );
  }

  const nodes = graph.nodes || [];
  const hasDb = nodes.some(n => n.layer === 'database');
  const hasCompute = nodes.some(n => n.layer === 'compute');
  const hasCache = nodes.some(n => n.layer === 'cache');

  const guides = {
    aws: [
      { step: '1. VPC Setup', desc: 'Create a VPC with public and private subnets across 2 AZs. Set up NAT Gateways for private subnet internet access.' },
      ...(hasDb ? [{ step: '2. Database (RDS/DynamoDB)', desc: 'Deploy managed databases in private subnets. Enable Multi-AZ for high availability.' }] : []),
      ...(hasCache ? [{ step: '3. ElastiCache', desc: 'Provision ElastiCache Redis clusters in private subnets, ensuring security groups only allow access from compute.' }] : []),
      ...(hasCompute ? [{ step: '4. Compute (ECS/EKS/Lambda)', desc: 'Deploy compute workloads. Use ALB (Application Load Balancer) for containerized apps.' }] : []),
      { step: '5. Security Groups', desc: 'Configure security groups to strictly limit ingress. Only LB should be open to 0.0.0.0/0 on 443.' },
    ],
    gcp: [
      { step: '1. VPC Network', desc: 'Create a custom VPC network with regional subnets. Configure Cloud NAT for private instances.' },
      ...(hasDb ? [{ step: '2. Cloud SQL/Spanner', desc: 'Provision Cloud SQL instances with private IP. Enable regional HA.' }] : []),
      ...(hasCache ? [{ step: '3. Memorystore', desc: 'Deploy Memorystore for Redis with VPC peering enabled.' }] : []),
      ...(hasCompute ? [{ step: '4. Compute (Cloud Run/GKE)', desc: 'Deploy serverless containers via Cloud Run, or provision a regional GKE cluster.' }] : []),
      { step: '5. Cloud Armor & IAM', desc: 'Setup Cloud Armor for WAF/DDoS protection. Apply least-privilege IAM roles.' },
    ],
    azure: [
      { step: '1. Virtual Network', desc: 'Create a VNet with multiple subnets. Deploy Azure NAT Gateway.' },
      ...(hasDb ? [{ step: '2. Azure SQL/CosmosDB', desc: 'Deploy managed databases utilizing VNet Integration and Private Endpoints.' }] : []),
      ...(hasCache ? [{ step: '3. Azure Cache for Redis', desc: 'Provision Redis Enterprise using Private Link.' }] : []),
      ...(hasCompute ? [{ step: '4. Compute (ACA/AKS)', desc: 'Deploy Azure Container Apps or AKS. Route traffic through Azure Front Door or App Gateway.' }] : []),
      { step: '5. Network Security Groups', desc: 'Apply NSGs to subnets limiting traffic. Configure Azure Key Vault for secrets.' },
    ]
  };

  const steps = guides[provider];

  return (
    <div className="p-4 space-y-4">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-[#F1F5F9] mb-1">Deployment Guide</h3>
        <p className="text-xs text-[#94A3B8]">Auto-generated step-by-step infrastructure setup.</p>
      </div>

      <div className="flex rounded-lg overflow-hidden border border-[#1E293B] mb-4">
        {['aws', 'gcp', 'azure'].map(p => (
          <button
            key={p}
            onClick={() => setProvider(p as any)}
            className={`flex-1 py-2 text-[10px] uppercase tracking-wider font-bold transition-colors ${provider === p ? 'bg-[#3B82F6] text-white' : 'bg-[#0F172A] text-[#64748B] hover:bg-[#1E293B]'}`}
          >
            {p}
          </button>
        ))}
      </div>

      <div className="space-y-3 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-800 before:to-transparent">
        {steps.map((s, i) => (
          <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-8 h-8 rounded-full border border-slate-700 bg-slate-900 text-slate-400 group-[.is-active]:text-emerald-400 group-[.is-active]:border-emerald-500/30 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] p-3 rounded-xl border border-slate-800 bg-slate-900/50 shadow-sm ml-4 md:ml-0 md:group-odd:mr-0 md:group-even:ml-0">
              <h4 className="font-bold text-slate-200 text-[11px] mb-1">{s.step}</h4>
              <p className="text-[9px] text-slate-400 leading-relaxed">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
