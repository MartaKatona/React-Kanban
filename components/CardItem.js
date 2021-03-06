import React from 'react';
import { connect } from 'react-redux';
import { deleteCard, moveCard, onEditFieldChange, onShowEditForm } from '../actions/kanbanCardActions';
import styles from './CardItem.scss';


class CardItem extends React.Component {
  constructor () {
    super();
      this.showEditForm = this.showEditForm.bind(this);
      this.moveUp = this.moveUp.bind(this);
      this.moveDown = this.moveDown.bind(this);
      this.deleteACard = this.deleteACard.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.cancelChanges = this.cancelChanges.bind(this);

  }

  showEditForm () {
    console.log('this.props.showToggle', this.props.showToggle.onEdit);
    console.log('this.props.id', this.props.id);
    const { dispatch } = this.props;
    dispatch(onShowEditForm(this.props.id, !this.props.showToggle.onEdit));
  }

  moveUp(newStatus) {
    const move = 'up';
    cardItemData: this.props.updateCardHandler(move, this.props);
  }
  moveDown(newStatus) {
    const move = 'down';
    cardItemData: this.props.updateCardHandler(move, this.props);
  }
  deleteACard (){
      const { dispatch, index } = this.props;
      dispatch(deleteCard(index));
      let card = `id=${this.props.id}`;
      let url = `/api/${this.props.id}/delete`;
      const oReq =  new XMLHttpRequest ();
      oReq.addEventListener("load", this.props.loadDataFromCards);
      oReq.addEventListener("error", this.onCardsError);
      oReq.open('DELETE', url);
      oReq.setRequestHeader("content-type", "application/x-www-form-urlencoded");
      oReq.setRequestHeader("cache-control", "no-cache");
      oReq.send(card);
      return;
  }

  bodyMaker(card){
    let encodeBody = `title=${encodeURIComponent(card.title)}&priority=${card.priority}&status=${card.status}&createdby=${encodeURIComponent(card.createdby)}&assignedto=${encodeURIComponent(card.assignedto)}&creatorID=${card.creatorID}&assignedID=${card.assignedID}`;
    return encodeBody;
  }

  handleChange(event) {
    //console.log('event.target.value', event.target);
    event.preventDefault();
    const { dispatch, index } = this.props;
    dispatch(onEditFieldChange(index, this.props.id, event.target.name, event.target.value));
  }

  handleSubmit(event) {
    //console.log('onSubmit this.props', this.props);
    let card = this.bodyMaker(this.props);
    let url = `/api/${this.props.id}/edit`;
    const oReq =  new XMLHttpRequest ();
    oReq.open('PUT', url);
    oReq.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    oReq.setRequestHeader("cache-control", "no-cache");
    oReq.send(card);

    this.showEditForm();
  }

  cancelChanges () {
    this.showEditForm();
    this.props.loadDataFromCards();
  }

  render (){
    if (this.props.showToggle.onEdit === true && this.props.id === this.props.showToggle.cardId) {
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
        <button onClick={this.showEditForm}>Edit</button>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) =>{
  const { kanbanCardReducer } = state;
  return {
    showToggle: kanbanCardReducer.get('showEditCardForm')
  }
}

export default connect(
  mapStateToProps
)(CardItem)