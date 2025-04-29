import NodeList from './features/nodes/NodeList'
import FlowEditor from './features/editor/flowEditor'
const App = () => {
  return (
    <div className='flex bg-white'>
      <NodeList/>
      <FlowEditor/>
    </div>
  )
}

export default App
