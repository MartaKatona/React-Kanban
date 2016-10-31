export const RECEIVE_CARDS = 'RECEIVE_CARDS';
export const DELETE_CARD = 'DELETE_CARD';
export const MOVE_CARD = 'MOVE_CARD';
export const ADD_CARD = 'ADD_CARD';


export const receiveCards = (card) =>{
  return {
    type: RECEIVE_CARDS,
    card
  }
}

export const deleteCard = (index) =>{
  console.log('delete card index: ', index);
  return {
    type: DELETE_CARD,
    index
  }
}

export const moveCard = (card) =>{
  console.log('move card: ', index);
  return {
    type: MOVE_CARD,
    index
  }
}

export const addCard = (newcard) =>{
  console.log('add new card in Actions: ', newcard);
  let card = newcard;
  return {
    type: ADD_CARD,
    card
  }
}

