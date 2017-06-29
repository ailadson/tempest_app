import React from 'react';
import { withRouter } from 'react-router-dom';

class FilePanel extends React.Component {
  constructor(props) {
    super(props);
    this.onDelete = this.onDelete.bind(this);
  }
  onDelete () {
    let studentID = this.props.match.url.split('/')[3];
    let data = { file : this.props.data, studentID };
    this.props.onDelete(data, ()=>{
      console.log("File Deleted!");
    });
  }
  render() {
    let { data } = this.props;

    return (
      <div className="file-panel">
        <div>Name: {`${data.name}`}</div>
        <div>Uploaded: {`${data.date}`}</div>
        <iframe src={data.url}></iframe>
        <button onClick={this.onDelete}>Delete File</button>
      </div>
    );
  }
}

export default withRouter(FilePanel);
