import React from 'react';
import CardItem from './CardItem';

class KanbanCardList extends React.Component {

  render (){
    console.log('this.props.data', this.props.data);
    const KanbanCardListNode = this.props.data.map((dataItem) =>{
      console.log('dataItem', dataItem);
      return (
        <CardItem
          key = {dataItem.id}
          title = {dataItem.title}
          priority = {dataItem.priority}
          status = {dataItem.status}
          createdby = {dataItem.createdby}
          assignedto = {dataItem.assignedto}
        />
      )
    })

    //console.log('this.props', this.props)
    return (
      <div>
        <h2>Card List</h2>
        {KanbanCardListNode}
      </div>
    )
  }
}

export default KanbanCardList;