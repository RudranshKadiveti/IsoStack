import { ARCHITECTURE_TEMPLATES } from '../../lib/architecture.templates';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Layers, ArrowRight, SearchX } from 'lucide-react';
import { useWorkspaceStore } from '../../store/useWorkspaceStore';
import { useState } from 'react';

export function TemplatesPage() {
  const navigate = useNavigate();
  const { searchQuery, customTemplates } = useWorkspaceStore();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Merge built-in and custom templates
  const allTemplates = [
    ...Object.values(ARCHITECTURE_TEMPLATES),
    ...(customTemplates || [])
  ];

  // Filter based on search query
  const searchFiltered = allTemplates.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    t.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter based on category
  const filteredTemplates = selectedCategory 
    ? searchFiltered.filter(t => (t.category || 'Other') === selectedCategory)
    : searchFiltered;

  // Group by category (only for the ones matching search)
  const categories = Array.from(new Set(searchFiltered.map(t => t.category || 'Other')));
  const allCategories = Array.from(new Set(allTemplates.map(t => t.category || 'Other')));

  return (
    <div className="p-8 max-w-7xl mx-auto pb-24">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#F1F5F9] mb-2 tracking-tight">Architecture Templates</h1>
        <p className="text-[#94A3B8] text-sm">Jumpstart your project with best-practice architectures.</p>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-10 border-b border-[#1E293B] pb-4">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-1 py-1 text-sm font-semibold transition-colors relative ${
            selectedCategory === null 
              ? 'text-[#3B82F6]' 
              : 'text-[#64748B] hover:text-[#F1F5F9]'
          }`}
        >
          All Templates
          {selectedCategory === null && (
            <motion.div layoutId="activeTab" className="absolute -bottom-[17px] left-0 right-0 h-0.5 bg-[#3B82F6]" />
          )}
        </button>
        {allCategories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-1 py-1 text-sm font-semibold transition-colors relative ${
              selectedCategory === cat 
                ? 'text-[#3B82F6]' 
                : 'text-[#64748B] hover:text-[#F1F5F9]'
            }`}
          >
            {cat}
            {selectedCategory === cat && (
              <motion.div layoutId="activeTab" className="absolute -bottom-[17px] left-0 right-0 h-0.5 bg-[#3B82F6]" />
            )}
          </button>
        ))}
      </div>

      {categories.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-[#64748B]">
          <SearchX className="w-12 h-12 mb-4 opacity-50" />
          <p className="text-lg font-medium text-[#F1F5F9]">No templates found</p>
          <p className="text-sm">Try adjusting your search or filters.</p>
        </div>
      ) : (
        <div className="space-y-12">
          {(selectedCategory ? [selectedCategory] : categories).map((category) => {
            const categoryTemplates = filteredTemplates.filter(t => (t.category || 'Other') === category);
            if (categoryTemplates.length === 0) return null;
            
            return (
              <div key={category} className="space-y-4">
                <h2 className="text-lg font-semibold text-[#F1F5F9] border-b border-[#1E293B] pb-2">{category}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {categoryTemplates.map((template, i) => (
                    <motion.div
                      key={template.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ y: -4 }}
                      className="bg-[#0F172A] border border-[#1E293B] hover:border-[#334155] rounded-xl p-5 shadow-lg flex flex-col group cursor-pointer"
                      onClick={() => navigate(template.id.startsWith('custom_') ? `/workspace/${template.id}` : `/workspace/template_${template.id}`)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="text-[#F1F5F9] font-bold text-base mb-1 group-hover:text-[#3B82F6] transition-colors">{template.name}</h3>
                          <p className="text-xs text-[#94A3B8] line-clamp-2">{template.description}</p>
                        </div>
                        <div className="w-10 h-10 bg-[#1E293B] rounded-lg flex items-center justify-center flex-shrink-0 ml-4 group-hover:bg-[#3B82F6]/20 group-hover:text-[#3B82F6] text-[#64748B] transition-colors">
                          <Layers className="w-5 h-5" />
                        </div>
                      </div>
                      
                      <div className="mt-auto pt-4 border-t border-[#1E293B]/50 flex items-center justify-between">
                        <span className="text-[10px] text-[#64748B] uppercase tracking-wider font-semibold">
                          {template.nodes.length} Nodes
                        </span>
                        <span className="text-xs text-[#3B82F6] font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 duration-300">
                          Preview <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
