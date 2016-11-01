import React from 'react';
import KanbanPage from './components/KanbanPage';
import {Link} from 'react-router';

class App extends React.Component {
  render () {
    return (
      <div>
        <ul role='nav'>
          <li><Link to='/'>Kanban Board</Link></li>
        </ul>
        <div>
          { this.props.children }
        </div>
      </div>
    )
  }
}

export default App;
