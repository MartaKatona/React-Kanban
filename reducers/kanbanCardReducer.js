import { List, Map } from 'immutable';
import { RECEIVE_USERS, RECEIVE_CARDS, DELETE_CARD } from '../actions/kanbanCardActions';
import { MOVE_CARD, ADD_CARD, EDIT_CARD, SHOW_EDIT_FORM } from '../actions/kanbanCardActions';

const initialState = Map({
  cards: List(),
  newcard: Map({
    id: '',
    title: '',
    priority: '',
    status: '',
    createdby: '',
    assignedto: '',
    creatorID: '',
    assignedID: ''
  }),
  showEditCardForm: Map({
    cardId: '',
    onEdit: false
  }),
  users: List()
});

const kanbanCardReducer = (state = initialState, action) =>{
  switch (action.type) {
    case RECEIVE_USERS:
      state = state.update('users', users => List(action.users));
      return state;
    case RECEIVE_CARDS:
      state = state.update('cards', cards => List(action.card));
      return state;
    case DELETE_CARD:
      state = state.set('cards', state.get('cards').delete(action.index));
      return state;
    case MOVE_CARD:
      return state.delete(action.index);
    case ADD_CARD:
      state = state.set('cards', state.get('cards').push(action.card));
      // console.log('newcard.card state in reducer', state.toJS());
      return state;
    case EDIT_CARD:
      //console.log('action: ', action);
      //console.log('typeOf id', typeof(action.id));
      return state.updateIn(['cards'], (cards) => {
        const indexOfCard = cards.findIndex(function (item) {
          return item.id === action.id;
        });
        return cards.update(indexOfCard, (cardItem) => {
          let newCardItem = Object.assign({}, cardItem);
          newCardItem[action.fieldName] = action.body;
          return newCardItem;
        });
      });
    case SHOW_EDIT_FORM:
      const cardToEdit = {
        cardId: action.id,
        onEdit: action.bool
      };
      return state.set('showEditCardForm', cardToEdit);
  default:
    return state;
  }
}

export default kanbanCardReducer;

