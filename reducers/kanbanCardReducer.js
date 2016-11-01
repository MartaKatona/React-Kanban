import { List, Map } from 'immutable';
import { RECEIVE_USERS, RECEIVE_CARDS, DELETE_CARD, MOVE_CARD, ADD_CARD } from '../actions/kanbanCardActions';

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
  users: List()
});

const kanbanCardReducer = (state = initialState, action) =>{
  console.log('action in reducer', action);
  switch (action.type) {
    case RECEIVE_USERS:
      state = state.update('users', users => List(action.users));
      return state;
    case RECEIVE_CARDS:
      state = state.update('cards', cards => List(action.card));
      return state;
    case DELETE_CARD:
      state = state.set('cards', state.get('cards').delete(action.index));
      console.log('delete card state in reducer', state.toJS());
      return state;
    case MOVE_CARD:
      return state.delete(action.index);
    case ADD_CARD:
      //state = state.set('cards', action.card);
      state = state.set('cards', state.get('cards').push(action.card));
      console.log('newcard.card state in reducer', state.toJS());
      return state; // update the field all the time
  default:
    return state;
  }
}

export default kanbanCardReducer;

