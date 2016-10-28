import React from 'react';
import { connect } from 'react-redux';
import { receiveCards } from '../actions/kanbanCardActions';
import KanbanCardList from './KanbanCardList';
import styles from './KanbanPage.scss';

class KanbanPage extends React.Component {
  constructor(){
    super();

      this.onCardsData = this.onCardsData.bind(this)
      this.loadDataFromCards = this.loadDataFromCards.bind(this);
      this.updateCardHandler = this.updateCardHandler.bind(this);
  };


  onCardsData(cardsQueue) {
    const { dispatch } = this.props;
    const parsedData = JSON.parse(cardsQueue.currentTarget.response);
    console.log('parsedData.card:', parsedData.card);
    dispatch(receiveCards(parsedData.card));
  }
  onCardsError(error) {
    console.log('error:', error);
  }

  loadDataFromCards(){
    console.log(' inside loadDataFromCards this.props.serverURL:  ', this.props.serverURL);
    const oReq =  new XMLHttpRequest ();
    oReq.addEventListener("load", this.onCardsData);
    oReq.addEventListener("error", this.onCardsError);
    oReq.open('GET', this.props.serverURL);
    oReq.send()
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
    };
    console.log('newStatus: ', newStatus);
    let encodeBody = `title=${encodeURIComponent(card.title)}&priority=${encodeURIComponent(card.priority)}&status=${newStatus}&createdby=${encodeURIComponent(card.createdby)}&assignedto=${encodeURIComponent(card.assignedto)}&creatorID=${card.creatorID}&assignedID=${card.assignedID}`;
    console.log('encodeBody:  ', encodeBody);
    return encodeBody;
  }

  updateCardHandler(move,cardItemData) {
    console.log('cardItemData: ', cardItemData);
    console.log('move: ', move);
    let card = this.bodyMaker(move, cardItemData);
    console.log('card to send:  ', card);
    let Url = `${this.props.serverURL}/${cardItemData.id}/edit`;
    console.log('Url to send: ', Url);
    const oReq =  new XMLHttpRequest ();
    oReq.addEventListener("load", this.loadDataFromCards);
    oReq.addEventListener("error", this.onCardsError);
    oReq.open('PUT', Url);
    oReq.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    oReq.setRequestHeader("cache-control", "no-cache");
    oReq.send(card)
  }

  componentWillMount() {
    this.loadDataFromCards();
  }

  render() {
    return (
      <div id={styles.KPage} className={styles.KanbanPage}>
        <KanbanCardList cardsQueue = {this.props.cardsQueue.filter((card)=>{
          return card.status === 'Queue';
        })} updateCardHandler = {this.updateCardHandler} />
        <KanbanCardList cardsQueue = {this.props.cardsQueue.filter((card)=>{
          return card.status === 'InProgress';
        })} updateCardHandler = {this.updateCardHandler} />
        <KanbanCardList cardsQueue = {this.props.cardsQueue.filter((card)=>{
          return card.status === 'Done';
        })} updateCardHandler = {this.updateCardHandler}/>
      </div>
    )
  }
}

KanbanPage.defaultProps = {
  cardsQueue: React.PropTypes.array,
}

const mapStateToPrps = (state, ownProps) =>{
  const { kanbanCardReducer } = state;
  return {
    cardsQueue: kanbanCardReducer.toJS()
  }
}

export default connect(
  mapStateToPrps
)(KanbanPage)