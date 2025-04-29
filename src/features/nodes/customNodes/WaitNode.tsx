import React, { useState, useEffect } from "react";
import { Handle, Position, useReactFlow } from "@xyflow/react";

const WaitNode = ({ data, id,  isConnectable = true }: any) => {
  const { setNodes } = useReactFlow();
  const [duration, setDuration] = useState(data.duration || "");

  useEffect(() => {
    setDuration(data.time || "");
  }, [data.time]);

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = e.target.value;
    setDuration(newTime);
    setNodes((nds) => 
        nds.map((node) => {
            if (node.id === id) {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        time: newTime
                    }
                };
            }
            return node;
        })
    );
  };

  return (
    <div className="bg-gray-100 p-4 w-40 rounded-lg text-center shadow-lg border border-dashed border-blue-700">
      <div className="font-bold">Wait</div>
      <input
        type="number"
        value={duration}
        onChange={handleDurationChange}
        placeholder="time"
        className="border border-solid border-blue-700 p-2 my-2 rounded w-full"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        style={{ left: "50%", transform: "translateX(-50%)" }}
        isConnectable = {isConnectable}
      />
      <Handle
        type="target"
        position={Position.Top}
        id="b"
        style={{ left: "50%", transform: "translateX(-50%)" }}
        isConnectable = {isConnectable}
      />
    </div>
  );
};

export default WaitNode;
