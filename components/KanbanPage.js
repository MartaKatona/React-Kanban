import React from 'react';
import { connect } from 'react-redux';
import { receiveCards } from '../actions/kanbanCardActions';
import KanbanCardList from './KanbanCardList';
import NewCard from './NewCard';
import styles from './KanbanPage.scss';

class KanbanPage extends React.Component {
  constructor(){
    super();

    this.showForm = this.showForm.bind(this);
    this.onCardsData = this.onCardsData.bind(this);
    this.loadDataFromCards = this.loadDataFromCards.bind(this);
    this.updateCardHandler = this.updateCardHandler.bind(this);
    this.state = {
      showNewCardForm: false,
      users: []
    };
  };

  showForm () {
    this.setState({showNewCardForm: !this.state.showNewCardForm})
  }

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
    oReq.open('GET', 'http://localhost:8080/api');
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
    let Url = `http://localhost:8080/api/${cardItemData.id}/edit`;
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
    let columnName = '';
    return (

      <div>
        <button type='button' onClick={this.showForm}>Add newCard</button>
        {this.state.showNewCardForm && <NewCard showForm={this.showForm} />}
        <div id={styles.KPage} className={styles.KanbanPage}>
          <KanbanCardList cardsQueue = {this.props.cardsQueue.filter((card)=>{
            return card.status === 'Queue';
          })} updateCardHandler={this.updateCardHandler} loadDataFromCards={this.loadDataFromCards}
            columnName='TO DO' showForm={this.showForm}
          />
          <KanbanCardList cardsQueue = {this.props.cardsQueue.filter((card)=>{
            return card.status === 'InProgress';
          })} updateCardHandler = {this.updateCardHandler} loadDataFromCards={this.loadDataFromCards}
            columnName='DOING' showForm={this.showForm}
          />
          <KanbanCardList cardsQueue = {this.props.cardsQueue.filter((card)=>{
            return card.status === 'Done';
          })} updateCardHandler = {this.updateCardHandler} loadDataFromCards={this.loadDataFromCards}
            columnName='DONE' showForm={this.showForm}
          />
        </div>
      </div>
    )
  } //eof render
} // eof component

KanbanPage.defaultProps = {
  cardsQueue: React.PropTypes.array,
}

const mapStateToProps = (state, ownProps) =>{
  const { kanbanCardReducer } = state;
  console.log('cardsQueue', kanbanCardReducer.get('cards').toJS());
  return {
    cardsQueue: kanbanCardReducer.get('cards').toJS()
  }
}

export default connect(
  mapStateToProps
)(KanbanPage)