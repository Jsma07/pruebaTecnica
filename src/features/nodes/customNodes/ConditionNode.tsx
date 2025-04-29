import React, { useState } from 'react';
import { Handle, Position } from '@xyflow/react';

const ConditionNode = ({ data, id, onChange }: any) => {
    const [condition, setCondition] = useState(data.condition || '');

    const handleConditionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCondition(e.target.value);
        onChange(id, 'condition', e.target.value);
    };

    return (
        <div className="bg-yellow-200 p-6 rounded-lg text-center shadow-lg border border-solid border-yellow-700">
            <div className="font-bold">Condition</div>
            <input
                type="text"
                value={condition}
                onChange={handleConditionChange}
                placeholder="Condition"
                className="border p-2 my-2 rounded w-full"
            />
            <Handle
                type="source"
                position={Position.Right}
                id="true"
            />
            <Handle
                type="source"
                position={Position.Bottom}
                id="false"
            />
            <Handle
                type="target"
                position={Position.Top}
                id="b"
                style={{ left: '50%', transform: 'translateX(-50%)' }}
            />
        </div>
    );
};

export default ConditionNode;
