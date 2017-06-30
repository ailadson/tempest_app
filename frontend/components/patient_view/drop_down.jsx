import React from 'react';

import '../../style/drop_down.scss';

class DropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = { expanded : false }

    this.expandPanel = this.expandPanel.bind(this);
  }

  renderData() {
    let { component: Component, data, onDelete, onUpdate, doctors, currentUser } = this.props;

    return data.sort((a, b) => {
      if ((!a.declineReason || !b.declineReason) && a.declineReason !== b.declineReason) {
        return (a.declineReason ? 1 : -1);
      }
      return (
        new Date(a.date + ' ' + a.time) < new Date(b.date + ' ' + b.time) ? -1 : 1
      );
    }).map((d, i) => {
      return(
        <li key={i}>
          <Component data={d} doctors={doctors} currentUser={currentUser} onDelete={onDelete} onUpdate={onUpdate}/>
        </li>
      )
    });
  }

  expandPanel () {
    let { panel } = this.refs;

    panel.classList.toggle('expanded');
    this.setState({ expanded : !this.state.expanded });
  }

  render() {
    let { title } = this.props;
    let { expanded } = this.state;

    return (
      <div className="drop-down-container">
        <header>{title}</header>
        <footer onClick={this.expandPanel}>
          {expanded ? 'Minimize' : ''}
        </footer>
        <section ref="panel">
          <ul>{this.renderData()}</ul>
        </section>
        <footer onClick={this.expandPanel}>
          {expanded ? 'Minimize' : 'Expand'}
        </footer>
      </div>
    );
  }
}

export default DropDown;
