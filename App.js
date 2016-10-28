import React from 'react';
import KanbanPage from './components/KanbanPage';

class App extends React.Component {
  render () {
    return (
      <div>
        <h2>Hello from App</h2>
        <KanbanPage serverURL='http://localhost:8080/api'
        />
      </div>
    )
  }

}

export default App;
