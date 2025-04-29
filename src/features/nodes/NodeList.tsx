import React from 'react';
import { nodeTypes } from '../constants/appConstants';

const NodeList = () => {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('node-type', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="fixed bottom-4 rounded-xl left-1/2 transform -translate-x-1/2 z-10 bg-white shadow-2xl">
      <div className="flex space-x-4 overflow-x-auto p-4">
        {nodeTypes.map((type) => (
          <div
            key={type}
            onDragStart={(e) => onDragStart(e, type)}
            draggable
            className="p-2 mb-2 flex items-center justify-center bg-white rounded-xl hover:scale-105 transition-transform duration-200 ease-in-out shadow-xl border border-gray-300 border-solid cursor-move hover:bg-gray-200"
            style={{ width: '80px', height: '80px', textAlign: 'center' }}
          >
            <div
              className={`w-full h-full flex items-center justify-center ${
                type === 'email'
                  ? 'bg-blue-500 rounded-lg text-white'
                  : type === 'condition'
                  ? 'bg-yellow-300 rounded-lg'
                  : type === 'wait'
                  ? 'bg-gray-100 p-4 w-40 rounded-lg text-center shadow-lg border border-dashed border-blue-700 text-black'
                  : 'bg-gray-500 rounded-sm'
              }`}
            >
              <span className="text-xs">{type}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NodeList;
