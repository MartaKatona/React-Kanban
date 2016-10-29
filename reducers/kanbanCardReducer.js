import { List, Map } from 'immutable';
import { RECEIVE_CARDS, DELETE_CARDS, MOVE_CARDS, ADD_CARDS } from '../actions/kanbanCardActions';

const initialState = Map({
  cards: List(),
  newcard: Map({
    id: '',
    title: '',
    priority: '',
    createdby: '',
    assignedto: '',
    creatorID: '',
    assignedID: ''
  })
});

const kanbanCardReducer = (state = initialState, action) =>{
  switch (action.type) {
    case RECEIVE_CARDS:
      state = state.update('cards', cards => List(action.card));
      return state;
    case DELETE_CARDS:
      return state.delete(action.index);
    case MOVE_CARDS:
      return state.delete(action.index);
    case ADD_CARDS:
      state = state.set('newcard', action.card);
      console.log('newcard state', state.toJS());
      return state; // update the field all the time
  default:
    return state;
  }
}

export default kanbanCardReducer;

