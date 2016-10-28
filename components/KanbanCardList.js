import React from 'react';
import CardItem from './CardItem';
import styles from './KanbanCardList.scss';

class KanbanCardList extends React.Component {

  render (){
    const KanbanCardListNode = this.props.cardsQueue.map((dataItem, index) =>{
      return (
        <CardItem
          key = {dataItem.id}
          id = {dataItem.id}
          title = {dataItem.title}
          priority = {dataItem.priority}
          status = {dataItem.status}
          createdby = {dataItem.createdby}
          assignedto = {dataItem.assignedto}
          creatorID = {dataItem.creatorID}
          assignedID = {dataItem.assignedID}
          updateCardHandler = {this.props.updateCardHandler}
          index = {index}
        />
      )
    })

    //console.log('this.props', this.props)
    return (
      <div className={styles.KCardList}>
        <h2>Card List</h2>
        {KanbanCardListNode}
      </div>
    )
  }
}

export default KanbanCardList;