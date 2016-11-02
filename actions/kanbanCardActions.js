export const RECEIVE_CARDS = 'RECEIVE_CARDS';
export const RECEIVE_USERS = 'RECEIVE_USERS';
export const DELETE_CARD = 'DELETE_CARD';
export const MOVE_CARD = 'MOVE_CARD';
export const ADD_CARD = 'ADD_CARD';
export const EDIT_CARD = 'EDIT_CARD';
export const SHOW_EDIT_FORM = 'SHOW_EDIT_FORM';


export const receiveUsers = (users) =>{
  return {
    type: RECEIVE_USERS,
    users
  }
}

export const receiveCards = (card) =>{
  return {
    type: RECEIVE_CARDS,
    card
  }
}

export const deleteCard = (index) =>{
  return {
    type: DELETE_CARD,
    index
  }
}

export const moveCard = (card) =>{
  return {
    type: MOVE_CARD,
    index
  }
}

export const addCard = (newcard) =>{
  let card = newcard;
  return {
    type: ADD_CARD,
    card
  }
}

export const onEditFieldChange = (index, id, fieldName, body) =>{
  return {
    type: EDIT_CARD,
    index,
    id,
    fieldName,
    body
  }
}

export const onShowEditForm = (id, bool) =>{
  console.log('bool: ', bool);
  return {
    type: SHOW_EDIT_FORM,
    id,
    bool
  }
}

