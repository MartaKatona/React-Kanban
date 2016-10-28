import React from 'react';
import KanbanCardList from './KanbanCardList';
import styles from './KanbanPage.scss';

class KanbanPage extends React.Component {
  constructor(){
    super();

      this.state = {
        cardsQueue: [], // create the 3 diff state
      }
      this.onCardsData = this.onCardsData.bind(this)
      this.updateCardHandler = this.updateCardHandler.bind(this);
  };


  onCardsData(cardsQueue) {
    const parsedData = JSON.parse(cardsQueue.currentTarget.response);
    console.log('parsedData.card:', parsedData.card);
    this.setState({cardsQueue: parsedData.card})
  }
  onCardsError(error) {
    console.log('error:', error);
  }

  loadDataFromCards(){
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
    let cardBody = "title=NEW%20PUT%20test%20new%20title&priority=High&status=Queue&createdby=Marge&assignedto=Lisa&creatorID=4&assignedID=3";
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
        <KanbanCardList cardsQueue = {this.state.cardsQueue.filter((card)=>{
          return card.status === 'Queue';
        })} updateCardHandler = {this.updateCardHandler} />
        <KanbanCardList cardsQueue = {this.state.cardsQueue.filter((card)=>{
          return card.status === 'InProgress';
        })} />
        <KanbanCardList cardsQueue = {this.state.cardsQueue.filter((card)=>{
          return card.status === 'Done';
        })} />
      </div>
    )
  }
}

KanbanPage.defaultProps = {
  cardsQueue: React.PropTypes.array,
}

KanbanPage.defaultProps = {
  cardsQueue: [],
}

export default KanbanPage;