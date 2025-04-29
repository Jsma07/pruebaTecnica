import { ReactFlowProvider } from '@xyflow/react'
import '@xyflow/react/dist/style.css';
import FlowContent from './flowContent';

function FlowEditor() {
    return (
        <div className='w-full h-screen'>
            
            <ReactFlowProvider>
                <FlowContent />
            </ReactFlowProvider>
        </div>
    )
}

export default FlowEditor;
