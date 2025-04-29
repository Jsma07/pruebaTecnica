import React, { useCallback, useState } from 'react'
import { 
  ReactFlow, 
  useReactFlow, 
  addEdge, 
  Background, 
  Connection, 
  Controls, 
  Node, 
  Edge, 
  applyNodeChanges, 
  applyEdgeChanges, 
  NodeChange, 
  EdgeChange, 
} from '@xyflow/react'
import '@xyflow/react/dist/style.css';
import EmailNode from '../nodes/customNodes/EmailNode';
import StartNode from '../nodes/customNodes/StartNode';
import WaitNode from '../nodes/customNodes/WaitNode';
import ConditionNode from '../nodes/customNodes/ConditionNode';

function FlowContent() {
    const [nodes, setNodes] = useState<Node[]>([
        {
            id: 'node-1',
            type: 'start',
            position: { x: 100, y: 100 }, 
            data: { label: 'start' },
        }
    ])
    const [edges, setEdges] = useState<Edge[]>([]);
    const { screenToFlowPosition } = useReactFlow();

    const exportFlowToJson = () => {
        if(nodes.length === 0){
            console.info('No data')
            return;
        }

        const startNode = nodes.find((node) => node.type === 'start');
        if(!startNode){
            console.info('Start node not found');
            return;
        }

        const exportedNodes = nodes.filter((node) => node.type !== 'start')
        .map((node) => {
            const outgoingEdge = edges.find((e) => e.source === node.id);
            return {
                id: node.id,
                type: node.type,
                data: {...node.data},
                next: outgoingEdge ? outgoingEdge.target : null,
            }
        });

        const exportedData = {
            start: startNode.id,
            nodes: exportedNodes
        }

        console.info(JSON.stringify(exportedData, null, 2))
    }

    const onDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    }

    const onDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        const type = e.dataTransfer.getData('node-type');
        const id = `node-${nodes.length + 1}`;
        const position = screenToFlowPosition({
            x: e.clientX,
            y: e.clientY,
        });

        const newNode = {
            id,
            type,
            position,
            data: { 
                label: `${type}`,
            },
        };
        setNodes((nodes) => nodes.concat(newNode));
    }, [screenToFlowPosition, nodes]);

    const onConnect = useCallback((connection: Connection) => {
        setEdges((edges) => addEdge(connection, edges))
    }, [])

    const onNodesChange = useCallback(
        (changes: NodeChange[]) => {
          changes.forEach((change) => {
            if (change.type === 'remove') {
              console.log(`deleted node: ${change.id}`);
            }
          });
          setNodes((nds) => applyNodeChanges(changes, nds));
        },
        [],
    );
      
    const onEdgesChange = useCallback(
        (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [],
    );

    return (
        <div className="relative w-full h-screen">
            <div className="absolute top-4 right-4 z-10">
                <button
                    onClick={exportFlowToJson}
                    className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded shadow"
                >
                    Exportar Flujo
                </button>
            </div>
            
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                nodeTypes={{
                    start: StartNode,
                    email: EmailNode,
                    wait: WaitNode,
                    condition: ConditionNode
                }}
                fitView
            >
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    )
}

export default FlowContent