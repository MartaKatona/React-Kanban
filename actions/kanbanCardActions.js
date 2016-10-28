export const RECEIVE_CARDS = 'RECEIVE_CARDS';
export const DELETE_CARDS = 'DELETE_CARDS';
export const MOVE_CARDS = 'MOVE_CARDS';


export const receiveCards = (card) =>{
  return {
    type: RECEIVE_CARDS,
    card
  }
}

export const deleteCard = (index) =>{
  console.log('delete card index: ', index);
  return {
    type: DELETE_CARDS,
    index
  }
}

export const moveCard = (card) =>{
  console.log('move card: ', card);
  return {
    type: MOVE_CARDS,
    card
  }
}
