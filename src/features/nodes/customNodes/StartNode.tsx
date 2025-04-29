import { Position } from '@xyflow/react';
import CustomHandle from '../customHandle';
const StartNode = ({ data }: any) => {
    return (
        <div className="bg-pink-300 p-6 rounded-full text-center shadow-lg border border-solid border-pink-500">
            <div className="font-bold">{data.label}</div>
            <CustomHandle
                type="source"
                position={Position.Bottom}
                id="a"
                connectionCount={1} // Solo permite 1 conexión
            />

        </div>
    );
};

export default StartNode;
