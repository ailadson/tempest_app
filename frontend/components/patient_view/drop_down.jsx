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

    return data.map((d, i) => (
      <li key={i}>
        <Component data={d} doctors={doctors} currentUser={currentUser} onDelete={onDelete} onUpdate={onUpdate}/>
      </li>
    ));
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
