import { List } from 'immutable';
import { RECEIVE_CARDS, DELETE_CARDS, MOVE_CARDS } from '../actions/kanbanCardActions';

const initialState = List();

const kanbanCardReducer = (state = initialState, action) =>{
  switch (action.type) {
    case RECEIVE_CARDS:
      return List(action.card);
    case DELETE_CARDS:
      return state.delete(action.index);
    case MOVE_CARDS:
      return state.delete(action.index);
  default:
    return state;
  }
}

export default kanbanCardReducer;

