import { useState } from 'react';
import { useArchStore } from '../../store/useArchStore';
import { SERVICE_CATALOG, CATEGORY_CONFIG, type Service } from '../../lib/services.catalog';
import { ChevronDown, Search, Plus, X, Box, Filter, LogOut } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { useAuthStore } from '../../store/useAuthStore';

export function AppSidebar() {
  const [search, setSearch] = useState('');
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [customNode, setCustomNode] = useState({ label: '', description: '', category: 'custom' });
  const [filterCategory, setFilterCategory] = useState('all');
  
  const graph = useArchStore(s => s.graph);
  
  const nodeCount = (graph?.nodes || []).length;
  const maxNodes = useArchStore(s => s.maxNodes);

  const addNode = useArchStore(s => s.addNode);
  const addCustomService = useArchStore(s => s.addCustomService);
  const customServices = useArchStore(s => s.customServices) || [];

  const { user, signOut } = useAuthStore();

  const handleAdd = (serviceType: string, variantId: string, customLabel?: string) => {
    if (nodeCount >= maxNodes || !graph) return;
    
    // Generate an ID
    const id = `${serviceType.toLowerCase()}_${Date.now().toString().slice(-4)}`;
    const newCol = Math.floor(Math.random() * 4) + 1;
    const newRow = Math.floor(Math.random() * 4) + 1;

    addNode({
      id,
      label: customLabel || `New ${serviceType}`,
      serviceType,
      variantId,
      layer: 'compute', // Can be inferred from category later
      tags: [], // Will be filled by specific variant during render or ideally here
      description: 'Manually added service node',
      responsibilities: [],
      metrics: { expected_rps: null, data_size: null, sla: null },
      grid_hint: { col: newCol, row: newRow },
      position: { x: newCol * 250, y: newRow * 150 } as any,
    });
  };

  const handleCreateCustomNode = () => {
    if (!customNode.label.trim()) return;
    const typeId = customNode.label.toLowerCase().replace(/[^a-z0-9]/g, '_');
    
    const newService: Service = {
      type: `custom_${typeId}_${Date.now().toString().slice(-4)}`,
      category: customNode.category,
      label: customNode.label,
      description: customNode.description || 'Custom service node',
      defaultVariant: 'standard',
      icon: Box,
      accentColor: 'oklch(0.7 0.1 100)',
      variants: [
        {
          id: 'standard',
          label: 'Standard',
          description: 'Custom node deployment',
          tags: ['custom']
        }
      ]
    };
    
    addCustomService(newService);
    setShowCustomModal(false);
    setCustomNode({ label: '', description: '', category: 'custom' });
  };

  const allServices = [...SERVICE_CATALOG, ...customServices];

  // Group services by category based on CATEGORY_CONFIG ordering
  const categories = Object.entries(CATEGORY_CONFIG).map(([key, config]) => {
    const services = allServices.filter(
      s => s.category === key && 
           (s.label.toLowerCase().includes(search.toLowerCase()) || 
            s.description.toLowerCase().includes(search.toLowerCase()))
    );
    return { id: key, config, services };
  }).filter(c => c.services.length > 0 && (filterCategory === 'all' || c.id === filterCategory));

  return (
    <>
      <div className="w-[300px] h-full bg-[#FFFFFF] border-r border-[#E5E7EB] flex flex-col flex-shrink-0 z-20 shadow-[4px_0_24px_rgba(0,0,0,0.5)]">
      
      {/* Logo Area */}
      <div className="h-16 px-5 flex items-center border-b border-[#E5E7EB]">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 flex items-center justify-center rounded-full overflow-hidden border-2 border-[#D1D5DB]/60 shadow-md bg-[#FFFFFF] flex-shrink-0">
            <img src="/logo.png" alt="IsoStack Logo" className="w-full h-full object-cover object-center scale-110" />
          </div>
          <span className="text-[#111827] text-xl font-medium tracking-wide" style={{ fontFamily: "'Newsreader', serif" }}>IsoStack</span>
        </div>
      </div>

      {/* Search */}
      <div className="p-4 border-b border-[#E5E7EB]">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search services..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-md pl-9 pr-3 py-2 text-sm text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:border-[#3B82F6] transition-colors"
            />
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#9CA3AF]" />
          </div>
          <button 
            onClick={() => setShowCustomModal(true)}
            className="w-9 h-9 flex items-center justify-center bg-[#E5E7EB] hover:bg-[#D1D5DB] border border-[#D1D5DB] rounded-md text-[#4B5563] hover:text-[#111827] transition-colors"
            title="Create Custom Node"
          >
            <Plus className="w-4 h-4" />
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button 
                className={`w-9 h-9 flex items-center justify-center border rounded-md transition-colors ${filterCategory !== 'all' ? 'bg-[#3B82F6]/20 border-[#3B82F6] text-[#3B82F6]' : 'bg-[#E5E7EB] hover:bg-[#D1D5DB] border-[#D1D5DB] text-[#4B5563] hover:text-[#111827]'}`}
                title="Filter by category"
              >
                <Filter className="w-4 h-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-[#F9FAFB] border-[#E5E7EB]">
              <DropdownMenuItem onClick={() => setFilterCategory('all')} className={filterCategory === 'all' ? 'text-[#3B82F6] bg-[#3B82F6]/10' : 'text-[#111827]'}>
                All Categories
              </DropdownMenuItem>
              {Object.entries(CATEGORY_CONFIG).map(([key, config]) => (
                <DropdownMenuItem key={key} onClick={() => setFilterCategory(key)} className={filterCategory === key ? 'text-[#3B82F6] bg-[#3B82F6]/10' : 'text-[#111827]'}>
                  <div className="flex items-center gap-2">
                    <config.icon className="w-3.5 h-3.5" />
                    {config.label}
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Service Catalog */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {categories.map((cat) => (
          <div key={cat.id}>
            <div className="flex items-center gap-2 mb-3">
              <cat.config.icon className="w-4 h-4 text-[#6B7280]" />
              <h3 className="text-[#6B7280] text-xs font-semibold uppercase tracking-wider flex-1">
                {cat.config.label}
              </h3>
              <span className="text-[#D1D5DB] text-[10px] font-mono">{cat.services.length}</span>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {cat.services.map(service => (
                <ServiceCard 
                  key={service.type} 
                  service={service} 
                  onAdd={(variant) => handleAdd(service.type, variant, service.label)}
                  disabled={nodeCount >= maxNodes} 
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer limits */}
      <div className="p-4 border-t border-[#E5E7EB] bg-[#F9FAFB]">
        <div className="flex justify-between items-center text-xs">
          <span className="text-[#6B7280]">Nodes used</span>
          <span className="font-mono">
            <span className={nodeCount >= maxNodes ? "text-[#EF4444]" : "text-[#4ADE80]"}>{nodeCount}</span>
            <span className="text-[#9CA3AF]"> / {maxNodes}</span>
          </span>
        </div>
        <div className="w-full bg-[#E5E7EB] h-1.5 rounded-full mt-2 overflow-hidden">
          <div 
            className="h-full rounded-full transition-all duration-300"
            style={{ 
              width: `${Math.min(100, (nodeCount / maxNodes) * 100)}%`,
              backgroundColor: nodeCount >= maxNodes ? '#EF4444' : '#3B82F6'
            }}
          />
        </div>
        {user && (
          <div className="mt-4 pt-4 border-t border-[#E5E7EB] flex items-center justify-between">
            <div className="flex items-center gap-2 truncate pr-2">
              <div className="w-6 h-6 rounded-full bg-[#D1D5DB] flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0">
                {user.email?.charAt(0).toUpperCase() || 'U'}
              </div>
              <span className="text-xs text-[#4B5563] truncate">{user.email}</span>
            </div>
            <button 
              onClick={() => signOut()}
              className="text-[#6B7280] hover:text-[#EF4444] transition-colors p-1"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        )}
        </div>
      </div>

      {/* Custom Node Modal */}
      {showCustomModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-[#E5E7EB]">
              <h3 className="text-[#111827] font-bold">Create Custom Node</h3>
              <button 
                onClick={() => setShowCustomModal(false)}
                className="text-[#6B7280] hover:text-[#111827] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#4B5563] uppercase tracking-wider mb-1">Category</label>
                <select 
                  className="w-full bg-[#E5E7EB] border border-[#D1D5DB] rounded-md px-3 py-2 text-[#111827] text-sm focus:outline-none focus:border-[#3B82F6]"
                  value={customNode.category}
                  onChange={(e) => setCustomNode(prev => ({ ...prev, category: e.target.value }))}
                >
                  {Object.entries(CATEGORY_CONFIG).map(([key, config]) => (
                    <option key={key} value={key}>{config.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#4B5563] uppercase tracking-wider mb-1">Name / Label</label>
                <input 
                  type="text"
                  placeholder="e.g. My Legacy System"
                  className="w-full bg-[#E5E7EB] border border-[#D1D5DB] rounded-md px-3 py-2 text-[#111827] text-sm focus:outline-none focus:border-[#3B82F6]"
                  value={customNode.label}
                  onChange={(e) => setCustomNode(prev => ({ ...prev, label: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#4B5563] uppercase tracking-wider mb-1">Description</label>
                <textarea 
                  placeholder="What does this service do?"
                  className="w-full bg-[#E5E7EB] border border-[#D1D5DB] rounded-md px-3 py-2 text-[#111827] text-sm focus:outline-none focus:border-[#3B82F6] resize-none h-20"
                  value={customNode.description}
                  onChange={(e) => setCustomNode(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>
            </div>
            <div className="p-4 border-t border-[#E5E7EB] flex justify-end gap-2 bg-[#FFFFFF]">
              <button 
                onClick={() => setShowCustomModal(false)}
                className="px-4 py-2 text-sm text-[#4B5563] hover:text-[#111827] transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleCreateCustomNode}
                disabled={!customNode.label.trim()}
                className="px-4 py-2 bg-[#3B82F6] hover:bg-[#2563EB] disabled:opacity-50 text-white text-sm font-medium rounded-md transition-colors"
              >
                Create Node
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function ServiceCard({ service, onAdd, disabled }: { service: Service, onAdd: (variant: string) => void, disabled: boolean }) {
  const Icon = service.icon;
  const hasVariants = service.variants.length > 1;

  const handleMainClick = () => {
    if (disabled) return;
    if (!hasVariants) {
      onAdd(service.defaultVariant);
    }
  };

  const CardContent = (
    <div
      onClick={!hasVariants ? handleMainClick : undefined}
      className={`
        relative flex flex-col items-center justify-center p-3 rounded-xl aspect-square border overflow-hidden
        transition-all duration-200 group select-none
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:shadow-lg'}
      `}
      style={{
        backgroundColor: `color-mix(in oklch, ${service.accentColor} 15%, transparent)`,
        borderColor: `color-mix(in oklch, ${service.accentColor} 30%, transparent)`,
      }}
      onMouseEnter={(e) => {
        if (disabled) return;
        (e.currentTarget as HTMLElement).style.borderColor = `color-mix(in oklch, ${service.accentColor} 60%, transparent)`;
        (e.currentTarget as HTMLElement).style.backgroundColor = `color-mix(in oklch, ${service.accentColor} 25%, transparent)`;
      }}
      onMouseLeave={(e) => {
        if (disabled) return;
        (e.currentTarget as HTMLElement).style.borderColor = `color-mix(in oklch, ${service.accentColor} 30%, transparent)`;
        (e.currentTarget as HTMLElement).style.backgroundColor = `color-mix(in oklch, ${service.accentColor} 15%, transparent)`;
      }}
    >
      <Icon 
        className="w-7 h-7 mb-2 transition-transform group-hover:scale-110" 
        style={{ color: service.accentColor }} 
      />
      <span className="text-xs font-semibold text-[#111827] text-center leading-tight">
        {service.label}
      </span>
      
      {hasVariants && (
        <DropdownMenu>
          <DropdownMenuTrigger onClick={(e) => e.stopPropagation()} disabled={disabled} asChild>
            <button className="absolute bottom-1 right-1 p-1 hover:bg-black/20 rounded-md transition-colors" title="Select Variant">
              <ChevronDown className="w-3 h-3 text-[#4B5563]" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent onClick={(e) => e.stopPropagation()} align="end">
            {service.variants.map((v) => (
              <DropdownMenuItem key={v.id} onClick={() => onAdd(v.id)}>
                <div className="flex flex-col">
                  <span>{v.label}</span>
                  <span className="text-[9px] text-[#6B7280] tracking-wider uppercase mt-0.5">{v.tags.slice(0,2).join(', ')}</span>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {CardContent}
      </TooltipTrigger>
      <TooltipContent side="right" className="w-48 p-3 bg-[#F9FAFB] border-[#E5E7EB]">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Icon className="w-4 h-4" style={{ color: service.accentColor }} />
            <p className="font-semibold text-[#111827]">{service.label}</p>
          </div>
          <p className="text-xs text-[#4B5563] leading-relaxed">
            {service.description}
          </p>
          {hasVariants && (
            <div className="mt-2 pt-2 border-t border-[#E5E7EB]">
              <p className="text-[10px] uppercase font-semibold text-[#6B7280] mb-1">Variants</p>
              <ul className="text-xs space-y-1 text-[#374151]">
                {service.variants.map((v) => (
                  <li key={v.id} className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-[#9CA3AF]"></span>
                    {v.label}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </TooltipContent>
    </Tooltip>
  );
}
