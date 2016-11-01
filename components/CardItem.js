import React from 'react';
import { connect } from 'react-redux';
import { deleteCard, moveCard } from '../actions/kanbanCardActions';
import styles from './CardItem.scss';


class CardItem extends React.Component {
  constructor () {
    super();
      this.showForm = this.showForm.bind(this);
      this.moveUp = this.moveUp.bind(this);
      this.moveDown = this.moveDown.bind(this);
      this.deleteACard = this.deleteACard.bind(this);

      this.state = {
      showEditCardForm: false,
      users: []
    };
  }

  showForm () {
    this.setState({showEditCardForm: !this.state.showEditCardForm})
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
    console.log('inside deleteACard - index', this.props.index);
    console.log('inside deleteACard - card', this.props);
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


  render (){
    if (this.state.showEditCardForm) {
      return (
        <div>
          <p> Make a Form </p>
          <button onClick={this.showForm}>Save</button>
          //button Save , cancel
          //hide
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