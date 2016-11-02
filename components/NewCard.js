import React from 'react';
import { connect } from 'react-redux';
import { addCard } from '../actions/kanbanCardActions'
import { receiveUsers } from '../actions/kanbanCardActions';


class NewCard extends React.Component {
  constructor(){
    super();
    this.onUsersData = this.onUsersData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
        id: '',
        title: '',
        priority: '',
        status: "Queue",
        createdby: '',
        assignedto: '',
        creatorID: 1,
        assignedID: 2
    };
  }

  onUsersData(users) {
    console.log('onUsersData  this.props', this.props);
    const { dispatch } = this.props;
    const parsedData = JSON.parse(users.currentTarget.response);
    console.log('parsedData.users:', parsedData.users);
    dispatch(receiveUsers(parsedData.users));
  }
  onUsersError(error) {
    console.log('users error:', error);
  }

  loadDataFromUsers(){
    const oReq =  new XMLHttpRequest ();
    oReq.addEventListener("load", this.onUsersData);
    oReq.addEventListener("error", this.onUsersError);
    oReq.open('GET', '/api/users');
    oReq.send();
  }

  componentWillMount() {
      this.loadDataFromUsers();
  }

  bodyMaker(move, card){
    let newStatus = '';
    switch (card.status) {
      case 'Queue':
        if (move === 'up') {
          newStatus = 'InProgress';
        } else { newStatus = 'Queue'}
      break;
      case 'InProgress':
        if (move === 'up') {
          newStatus = 'Done';
        } else { newStatus = 'Queue'}
      break;
      case 'Done':
        if (move === 'up') {
          newStatus = 'Done';
        } else { newStatus = 'InProgress'}
      break;
      default:
       newStatus = 'Queue';
    };
    let encodeBody = `title=${encodeURIComponent(card.title)}&priority=${encodeURIComponent(card.priority)}&status=${newStatus}&createdby=${encodeURIComponent(card.createdby)}&assignedto=${encodeURIComponent(card.assignedto)}&creatorID=${card.creatorID}&assignedID=${card.assignedID}`;
    return encodeBody;
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name] : value
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    const { dispatch } = this.props;
    //console.log('inside handleSUBMIT - this.props', this.props);
    console.log('inside handleSUBMIT - click on button', this.state);
    dispatch(addCard(this.state));

    let card = this.bodyMaker('no',this.state);
    let Url = `http://localhost:8080/api/new`;
    const oReq =  new XMLHttpRequest ();
    oReq.addEventListener("error", this.onCardsError);
    oReq.open('POST', Url);
    oReq.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    oReq.setRequestHeader("cache-control", "no-cache");
    oReq.send(card);

    this.props.showForm();
  }

  render() {
    if (this.props.users.length) {
      let usersArr = this.props.users[0].username;
    }

    return (
      <form id='newCardForm' onSubmit={this.handleSubmit}>
        <label>Card Title:</label>
          <input type="text"
            name="title"
            placeholder="title"
            value={this.state.title}
            onChange={this.handleChange}
          />

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
  users: React.PropTypes.array,
  newcard: React.PropTypes.array

}

const mapStateToProps = (state, ownProps) =>{
  const { kanbanCardReducer } = state;
  // console.log('newcard', kanbanCardReducer.get('newcard').toJS());
  return {
    users: kanbanCardReducer.get('users').toJS(),
    //newcard: kanbanCardReducer.get('newcard').toJS()
  }
}

export default connect(
  mapStateToProps
)(NewCard)

