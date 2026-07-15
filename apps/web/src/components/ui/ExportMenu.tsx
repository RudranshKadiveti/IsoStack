import { useState, useRef } from 'react';
import { Download, Upload, Image as ImageIcon, Code, FileJson } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './dropdown-menu';
import { useArchStore } from '../../store/useArchStore';
import { toPng, toSvg } from 'html-to-image';
import toast from 'react-hot-toast';

export function ExportMenu() {
  const graph = useArchStore(s => s.graph);
  const setGraph = useArchStore(s => s.setGraph);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExportPNG = async () => {
    try {
      const flowEl = document.querySelector('.react-flow') as HTMLElement;
      if (!flowEl) return;
      const dataUrl = await toPng(flowEl, { backgroundColor: '#FFFFFF' });
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `${graph?.project_name || 'architecture'}.png`;
      a.click();
      toast.success('Exported as PNG');
    } catch (err) {
      toast.error('Failed to export PNG');
    }
  };

  const handleExportSVG = async () => {
    try {
      const flowEl = document.querySelector('.react-flow') as HTMLElement;
      if (!flowEl) return;
      const dataUrl = await toSvg(flowEl, { backgroundColor: '#FFFFFF' });
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `${graph?.project_name || 'architecture'}.svg`;
      a.click();
      toast.success('Exported as SVG');
    } catch (err) {
      toast.error('Failed to export SVG');
    }
  };

  const handleExportJSON = () => {
    if (!graph) return;
    try {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(graph, null, 2));
      const a = document.createElement('a');
      a.href = dataStr;
      a.download = `${graph?.project_name || 'architecture'}.json`;
      a.click();
      toast.success('Exported as JSON');
    } catch (err) {
      toast.error('Failed to export JSON');
    }
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (json && json.nodes) {
          setGraph(json);
          toast.success('Architecture imported successfully');
        } else {
          toast.error('Invalid architecture file format');
        }
      } catch (err) {
        toast.error('Failed to parse JSON file');
      }
    };
    reader.readAsText(file);
    // Reset input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <>
      <input 
        type="file" 
        accept=".json" 
        style={{ display: 'none' }} 
        ref={fileInputRef}
        onChange={handleImportJSON}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50 focus:outline-none">
            <Download className="w-4 h-4" />
            Export / Import
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48 bg-white border-gray-200 shadow-xl rounded-xl">
          <DropdownMenuItem onClick={handleExportPNG} className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-50">
            <ImageIcon className="w-4 h-4 text-blue-500" />
            <span>Export as PNG</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleExportSVG} className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-50">
            <Code className="w-4 h-4 text-orange-500" />
            <span>Export as SVG</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleExportJSON} className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-50">
            <FileJson className="w-4 h-4 text-green-500" />
            <span>Export as JSON</span>
          </DropdownMenuItem>
          <div className="h-px bg-gray-200 my-1 mx-2"></div>
          <DropdownMenuItem onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-50">
            <Upload className="w-4 h-4 text-purple-500" />
            <span>Import JSON</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
