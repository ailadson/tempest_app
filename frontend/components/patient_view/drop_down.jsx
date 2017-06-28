import React from 'react';

class DropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = { expanded : false }

    this.expandPanel = this.expandPanel.bind(this);
  }

  renderData() {
    let { component: Component, data } = this.props;
    return data.map((d, i) => (<li key={i}><Component data={d}/></li>));
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
      <div className="drop_down-container">
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
