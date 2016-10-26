import React from 'react';

class CardItem extends React.Component {

  render (){
    return (
      <div className="CardItem">
        <h4>{this.props.title}</h4>
        <h4>{this.props.priority}</h4>
        <h4>{this.props.status}</h4>
        <h4>{this.props.createdby}</h4>
        <h4>{this.props.assignedto}</h4>
      </div>
    )
  }
}

export default CardItem;