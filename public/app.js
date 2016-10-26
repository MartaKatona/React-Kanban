'use strict'

class KanbanPage extends React.Component {
  constructor(){
    super();

      this.state = {
        data: [],
      }
      this.onRedditData = this.onRedditData.bind(this)
  };


  onRedditData(data) {
    const parsedData = JSON.parse(data.currentTarget.response);
    console.log('parsedData.card data:', parsedData.card);
    this.setState({data: parsedData.card})
  }
  onRedditError(error) {
    console.log('error:', error);
  }

  loadDataFromReddit(){
    const oReq =  new XMLHttpRequest ();
    oReq.addEventListener("load", this.onRedditData);
    oReq.addEventListener("error", this.onRedditError);
    oReq.open('GET', this.props.serverURL);
    oReq.send()
  }

  componentWillMount() {
    this.loadDataFromReddit();
  }

  render() {
    return (
      <div>
        <h1>Kanban Cards Page</h1>
        <CardList data = {this.state.data}/>
      </div>
    )
  }
}

KanbanPage.defaultProps = {
  data: React.PropTypes.array,
}

KanbanPage.defaultProps = {
  data: [],
}

class CardList extends React.Component {

  render (){
    console.log('this.props.data', this.props.data);
    const CardListNode = this.props.data.map((dataItem) =>{
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
        {CardListNode}
      </div>
    )
  }
}

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


ReactDOM.render(
    <KanbanPage serverURL='http://localhost:8080/cards' />,
    document.getElementById('root')
)