import './App.css';
import DraggableSelect from './DraggableSelect';
import DraggableTab from './DraggableTab';
import DraggableTagList from './DraggableTag'
function App() {
  return (
    <>
      <h1>Draggable Select Item</h1>
      <div className="card">
        <DraggableSelect></DraggableSelect>
      </div>
      <div className="card">
        <DraggableTagList/>
      </div>
      <div className="card">
        <DraggableTab/>
      </div>
    </>
  );
}

export default App;
