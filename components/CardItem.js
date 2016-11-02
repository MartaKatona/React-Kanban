import React from 'react';
import { connect } from 'react-redux';
import { deleteCard, moveCard, onEditFieldChange } from '../actions/kanbanCardActions';
import styles from './CardItem.scss';


class CardItem extends React.Component {
  constructor () {
    super();
      this.showForm = this.showForm.bind(this);
      this.moveUp = this.moveUp.bind(this);
      this.moveDown = this.moveDown.bind(this);
      this.deleteACard = this.deleteACard.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.cancelChanges = this.cancelChanges.bind(this);

      this.state = {
      showEditCardForm: false,
      users: []
    };
  }

  showForm () {
    this.setState({showEditCardForm: !this.state.showEditCardForm});
  }

  moveUp(newStatus) {
    const move = 'up';
    cardItemData: this.props.updateCardHandler(move, this.props);
  }
  moveDown(newStatus) {
    const move = 'down';
    console.log('This is the props on Card clicked', this.props);
    cardItemData: this.props.updateCardHandler(move, this.props);
  }
  deleteACard (){
      // console.log('inside deleteACard - index', this.props.index);
      // console.log('inside deleteACard - card', this.props);
      const { dispatch, index } = this.props;
      dispatch(deleteCard(index));

      let card = `id=${this.props.id}`;
      //console.log('card to send:  ', card, this.props);
      let Url = `http://localhost:8080/api/${this.props.id}/delete`;
      const oReq =  new XMLHttpRequest ();
      oReq.addEventListener("load", this.props.loadDataFromCards);
      oReq.addEventListener("error", this.onCardsError);
      oReq.open('DELETE', Url);
      oReq.setRequestHeader("content-type", "application/x-www-form-urlencoded");
      oReq.setRequestHeader("cache-control", "no-cache");
      oReq.send(card);

      return;
  }

  bodyMaker(card){
    let encodeBody = `title=${encodeURIComponent(card.title)}&priority=${card.priority}&status=${card.status}&createdby=${encodeURIComponent(card.createdby)}&assignedto=${encodeURIComponent(card.assignedto)}&creatorID=${card.creatorID}&assignedID=${card.assignedID}`;
    //console.log('encodeBody:  ', encodeBody);
    return encodeBody;
  }

  handleChange(event) {
    //console.log('event.target.value', event.target);
    event.preventDefault();
    const { dispatch, index } = this.props;
    dispatch(onEditFieldChange(index, this.props.id, event.target.name, event.target.value));
  }

  handleSubmit(event) {
    console.log('onSubmit this.props', this.props);
    let card = this.bodyMaker(this.props);
    let Url = `http://localhost:8080/api/${this.props.id}/edit`;
    const oReq =  new XMLHttpRequest ();
    //oReq.addEventListener("load", this.props.loadDataFromCards);
    oReq.addEventListener("error", this.onCardsError);
    oReq.open('PUT', Url);
    oReq.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    oReq.setRequestHeader("cache-control", "no-cache");
    oReq.send(card);

    this.showForm();
  }

  cancelChanges () {
    this.showForm();
    this.props.loadDataFromCards();
  }

  render (){
    if (this.state.showEditCardForm) {
      return (
        <div>
          <form id='editCardForm'>
            <label>Card Title:</label>
              <input
                type="text"
                ref="title"
                name="title"
                placeholder="title"
                value={this.props.title}
                onChange={this.handleChange}
              />

            <label>Priority:</label>
              <select ref="priority" name="priority" value={this.props.priority} onChange={this.handleChange}>
                <option name="priority" value="Low">Low</option>
                <option name="priority" value="Medium">Medium</option>
                <option name="priority" value="High">High</option>
                <option name="priority" value="Blocker">Blocker</option>
              </select>

            <label>Created By(First Name):</label>
              <input
                type="text"
                ref="createdby"
                name="createdby"
                placeholder="username"
                value={this.props.createdby}
                onChange={this.handleChange}
              />

            <label>Assigned To(First Name):</label>
              <input
                type="text"
                ref="assignedto"
                name="assignedto"
                placeholder="username"
                value={this.props.assignedto}
                onChange={this.handleChange}
              />
            <button type='submit' onClick={this.handleSubmit}>Save</button>
          </form>
          <button onClick={this.cancelChanges}>Cancel</button>
        </div>
      )
    }
    return (
      <div className={styles.CardItem}>
        <h4>{this.props.title}</h4>
        <h4>{this.props.priority}</h4>
        <h4>{this.props.status}</h4>
        <h4>{this.props.createdby}</h4>
        <h4>{this.props.assignedto}</h4>
        <button onClick={this.moveUp}>moveUp</button>
        <button onClick={this.moveDown}>moveDown</button>
        <button onClick={this.deleteACard}>Delete</button>
        <button onClick={this.showForm}>Edit</button>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) =>{
  const { kanbanCardReducer } = state;
  return {
    cardsQueue: kanbanCardReducer.toJS()
  }
}

export default connect(
  mapStateToProps
)(CardItem)