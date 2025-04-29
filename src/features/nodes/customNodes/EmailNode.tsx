import React, { useState, useEffect } from 'react';
import { Handle, Position, useReactFlow } from '@xyflow/react';

interface EmailNodeProps {
    id: string;
    data: {
        title?: string;
        content?: string;
        label?: string;
    };
    isConnectable?: boolean;
}

const EmailNode = ({ id, data, isConnectable = true }: EmailNodeProps) => {
    const { setNodes } = useReactFlow();
    const [title, setTitle] = useState(data.title || '');
    const [content, setContent] = useState(data.content || '');

    useEffect(() => {
        setTitle(data.title || '');
        setContent(data.content || '');
    }, [data.title, data.content]);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        setTitle(newTitle);
        setNodes((nds) => 
            nds.map((node) => {
                if (node.id === id) {
                    return {
                        ...node,
                        data: {
                            ...node.data,
                            title: newTitle
                        }
                    };
                }
                return node;
            })
        );
    };

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newContent = e.target.value;
        setContent(newContent);
        setNodes((nds) => 
            nds.map((node) => {
                if (node.id === id) {
                    return {
                        ...node,
                        data: {
                            ...node.data,
                            content: newContent
                        }
                    };
                }
                return node;
            })
        );
    };

    return (
        <div className="bg-blue-200 p-4 rounded-lg text-center shadow-lg border border-solid border-blue-700 w-40">
            <div className="font-bold text-sm mb-1">Email</div>
            <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                placeholder="title"
                className="border p-1 text-xs my-1 rounded-lg w-full border-blue-700"
            />
            <textarea
                value={content}
                onChange={handleContentChange}
                placeholder="content"
                className="border border-solid border-blue-700 p-1 text-xs my-1 rounded-lg w-full h-16"
            />
            <Handle
                type="source"
                position={Position.Bottom}
                id="a"
                style={{ left: '50%', transform: 'translateX(-50%)' }}
                isConnectable={isConnectable}
            />
            <Handle
                type="target"
                position={Position.Top}
                id="b"
                style={{ left: '50%', transform: 'translateX(-50%)' }}
                isConnectable={isConnectable}
            />
        </div>
    );
};

export default EmailNode;