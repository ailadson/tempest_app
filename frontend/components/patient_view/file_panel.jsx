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

  renderDeleteButton() {
    let type = this.props.match.url.split('/')[1];

    if (type === 'doctor') {
      return(<button onClick={this.onDelete}>Delete File</button>)
    }
  }

  render() {
    let { data } = this.props;

    return (
      <div className="file-panel">
        <div>
          <span className="panel-label">
            Filename:
          </span> {`${data.name}`}</div>
        <div>
          <span className="panel-label">
            Uploaded:
          </span> {`${new Date(data.date).toDateString()}`}</div>
        <iframe src={data.url}></iframe>
        {this.renderDeleteButton()}
      </div>
    );
  }
}

export default withRouter(FilePanel);
