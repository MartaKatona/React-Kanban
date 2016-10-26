import React from 'react';
import KanbanCardList from './KanbanCardList';
import styles from './KanbanPage.scss';

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
      <div id={styles.KPage} className={styles.KanbanPage}>
        <h1>Kanban Cards Page</h1>
        <KanbanCardList data = {this.state.data}/>
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

export default KanbanPage;