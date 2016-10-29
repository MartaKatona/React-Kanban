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
    };
  };

  handleChange(event) {
    console.log('inside handleChange event.target.value', event.target.name);
    console.log('inside handleChange this.props', this.props);
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
          placeholder="first name"
          value={this.state.createdby}
          onChange={this.handleChange} />

        <label>Assigned To(First Name):</label>
          <input type="text"
          name="assignedto"
          placeholder="first name"
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
  console.log('cardsQueue', kanbanCardReducer.get('cards').toJS());
  return {
    addedCard: kanbanCardReducer.get('cards').toJS()
  }
}

export default connect(
  mapStateToProps
)(NewCard)

//, { addCard }