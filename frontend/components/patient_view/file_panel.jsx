import React from 'react';

class FilePanel extends React.Component {
  render() {
    let { data } = this.props;

    return (
      <div className="file-panel">
        <div>Name: {`${data.name}`}</div>
        <div>Uploaded: {`${data.date}`}</div>
        <iframe src={data.src} frameborder="0"></iframe>
      </div>
    );
  }
}

export default FilePanel;
