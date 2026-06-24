import { useCallback } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const initialNodes = [
  { id: '1', position: { x: 250, y: 50 }, data: { label: 'Frontend App' }, style: { background: '#1e293b', color: 'white', border: '1px solid #334155', borderRadius: '8px', padding: '15px' } },
  { id: '2', position: { x: 100, y: 200 }, data: { label: 'Auth Service' }, style: { background: '#1e293b', color: 'white', border: '1px solid #334155', borderRadius: '8px', padding: '15px' } },
  { id: '3', position: { x: 400, y: 200 }, data: { label: 'Payment Gateway' }, style: { background: '#1e293b', color: 'white', border: '1px solid #334155', borderRadius: '8px', padding: '15px' } },
  { id: '4', position: { x: 250, y: 350 }, data: { label: 'Database API' }, style: { background: '#1e293b', color: 'white', border: '1px solid #334155', borderRadius: '8px', padding: '15px' } },
  { id: '5', position: { x: 550, y: 350 }, data: { label: 'External Payment API' }, style: { background: '#1e293b', color: 'white', border: '1px solid #334155', borderRadius: '8px', padding: '15px' } },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e1-3', source: '1', target: '3', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e2-4', source: '2', target: '4', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e3-4', source: '3', target: '4', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e3-5', source: '3', target: '5', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
];

export default function ArchitectureMap() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col pb-6 animate-in fade-in duration-500">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Architecture Dependency Map</h1>
        <p className="text-white/50">Interactive graph showing service dependencies. Click nodes for details.</p>
      </div>
      
      <div className="flex-1 bg-slate-900/50 border border-white/10 rounded-xl overflow-hidden relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          colorMode="dark"
        >
          <Controls />
          <MiniMap 
            nodeColor={(n) => {
              if (n.style?.background) return n.style.background;
              return '#1e293b';
            }}
          />
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      </div>
    </div>
  );
}
