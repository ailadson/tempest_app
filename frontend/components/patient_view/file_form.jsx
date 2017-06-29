import React from 'react';
import { withRouter } from 'react-router-dom';

import Modal from 'react-modal';
import merge from 'lodash/merge';

class FileForm extends React.Component {
  constructor(props){
    super(props);
    let { currentUser, match } = this.props;
    let type = match.url.split("/")[1];
    this.state = {
      name : '',
      filedata : ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onFileUpload = this.onFileUpload.bind(this);
    this.validate = this.validate.bind(this);
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  validate(data) {
    let { name, filedata } = this.state;

    if(!name || !filedata) {
      alert("Must fill in all fields");
      return false;
    }

    return true;
  }

  onFileUpload (e) {
    let reader  = new FileReader();
    reader.addEventListener('load', (e)=>{
      this.setState({ filedata : reader.result });
    });
    reader.readAsDataURL(e.currentTarget.files[0]);
  }

  handleSubmit (e) {
    let { currentUser, onSubmit, match } = this.props;
    let type = match.url.split("/")[1];
    let studentID = match.url.split("/")[3];
    let data = {
      type,
      id : currentUser.id,
      studentID,
      file : this.state
    };

    if (this.validate(data)){
      onSubmit(data, ()=>{console.log('created file!');});
    }
  }

  render() {
    let { isOpen } = this.props;

    return (
      <Modal isOpen={isOpen} contentLabel="Appointment Form">
        <div>
          <label>Title: <input type='text' onChange={this.update('name')} /></label>
          <label>File: <input type='file' onChange={this.onFileUpload} /></label>
          <button onClick={this.handleSubmit}>Submit</button>
        </div>
      </Modal>
    );
  }
}

export default withRouter(FileForm);
