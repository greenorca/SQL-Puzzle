import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

interface MermaidDiagramProps {
  mermaidCode: string;
  isOpen: boolean;
  onClose: () => void;
}

// Initialize mermaid configuration
mermaid.initialize({
  startOnLoad: false,
  theme: 'default',
  securityLevel: 'loose',
  fontFamily: 'monospace',
  fontSize: 16,
  flowchart: {
    useMaxWidth: true,
    htmlLabels: true,
    curve: 'basis'
  }
});

const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ mermaidCode, isOpen, onClose }) => {
  const diagramRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && mermaidCode && diagramRef.current) {
      const renderDiagram = async () => {
        try {
          // Clear previous content
          if (diagramRef.current) {
            diagramRef.current.innerHTML = '';
          }
          
          // Generate unique ID for this diagram
          const id = `mermaid-${Date.now()}`;
          
          // Render the diagram
          const { svg } = await mermaid.render(id, mermaidCode);
          if (diagramRef.current) {
            diagramRef.current.innerHTML = svg;
          }
        } catch (error) {
          console.error('Error rendering mermaid diagram:', error);
          if (diagramRef.current) {
            diagramRef.current.innerHTML = `
              <div class="text-red-500 p-4 border border-red-300 rounded">
                <p>Error rendering diagram. Showing raw code:</p>
                <pre class="text-sm mt-2">${mermaidCode}</pre>
              </div>
            `;
          }
        }
      };

      renderDiagram();

      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && isOpen) {
          onClose();
        }
      });

      return () => {
        document.removeEventListener('keydown', (event) => {
          if (event.key === 'Escape' && isOpen) {
            onClose();
          }
        });
      };
    }
  }, [isOpen, mermaidCode]);

  if (!isOpen || !mermaidCode) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-6xl max-h-[90vh] overflow-auto shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">Database Schema</h3>
          <button
            onClick={onClose}
            style={{ borderRadius: '25%', borderWidth: '2px' }}
            className="text-gray-400 hover:text-gray-700 text-2xl font-bold border border-gray-500 border-solid rounded-full w-12 h-12 flex items-center justify-center"
          >
            ×
          </button>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg overflow-auto">
          <div 
            ref={diagramRef}
            className="flex justify-center"
            style={{ minHeight: '200px' }}
          />
        </div>
      </div>
    </div>
  );
};

export default MermaidDiagram;
