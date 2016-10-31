import React from 'react';
import { connect } from 'react-redux';
import { addCard } from '../actions/kanbanCardActions'

class NewCard extends React.Component {
  constructor(){
    super();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
        id: '',
        title: '',
        priority: '',
        createdby: '',
        assignedto: '',
        creatorID: '',
        assignedID: ''
    }; // state
  }

  handleChange(event) {
    console.log('inside handleChange event.target.value', event.target);
    // this.setState({card: event.target.value});
    // console.log('inside handleChange this.props', this.props);
    const { name, value } = event.target;
    this.setState({
      [name] : value
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    const { dispatch } = this.props;
    console.log('inside handleSUBMIT - this.props', this.props);
    console.log('inside handleSUBMIT - click on button', this.state);
    dispatch(addCard(this.state));


  }

//   onUsersData(users) {
//     const parsedData = JSON.parse(users.currentTarget.response);
//     console.log('parsedData.users:', parsedData.users);
//     let usersArr = parsedData.users;
//     console.log('usersArr: ', usersArr);
//   }
//   onUsersError(error) {
//     console.log('users error:', error);
//   }

//   loadDataFromUser(){
//     console.log('inside load User ')
//     const oReq =  new XMLHttpRequest ();
//     oReq.addEventListener("load", this.onUsersData);
//     oReq.addEventListener("error", this.onUsersError);
//     oReq.open('GET', 'http://localhost:8080/api/users');
//     oReq.send()
//   }

// const usersData = loadDataFromUser();
//     console.log('usersData: ', usersData);

  render() {
    return (
      <form id='cardForm' onSubmit={this.handleSubmit}>
        <label>Card Title:</label>
          <input type="text"
          name="title"
          placeholder="title"
          value={this.state.title}
          onChange={this.handleChange} />

        <label>Priority:</label>
          <select name="priority" value={this.state.priority} onChange={this.handleChange}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Blocker">Blocker</option>
          </select>

        <label>Created By(First Name):</label>
          <input type="text"
          name="createdby"
          placeholder="username"
          value={this.state.createdby}
          onChange={this.handleChange} />

        <label>Assigned To(First Name):</label>
          <input type="text"
          name="assignedto"
          placeholder="username"
          value={this.state.assignedto}
          onChange={this.handleChange} />

        <button type='submit'>
          Pin Card
        </button>
      </form>
    );
  }
}

NewCard.defaultProps = {
  addedCard: React.PropTypes.array,
}

const mapStateToProps = (state, ownProps) =>{
  const { kanbanCardReducer } = state;
  console.log('cardsQueue', kanbanCardReducer.get('newcard').toJS());
  return {
    addedCard: kanbanCardReducer.get('newcard').toJS()
  }
}

export default connect(
  mapStateToProps
)(NewCard)

//, { addCard }