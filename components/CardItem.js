import React from 'react';
import styles from './CardItem.scss';


class CardItem extends React.Component {
  constructor () {
    super();
      this.statusUp = this.statusUp.bind(this);
  }

statusUp(newStatus) {
  const move = 'up';
  console.log('This is the props on Card clicked', this.props);
  cardItemData: this.props.updateCardHandler(move,this.props)
}


  render (){

    return (
      <div className={styles.CardItem}>
        <h4>{this.props.title}</h4>
        <h4>{this.props.priority}</h4>
        <h4>{this.props.status}</h4>
        <h4>{this.props.createdby}</h4>
        <h4>{this.props.assignedto}</h4>
        <button onClick={this.statusUp}>statusUp</button>
      </div>
    )
  }
}

export default CardItem;