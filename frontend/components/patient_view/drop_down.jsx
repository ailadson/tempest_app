import React from 'react';

import '../../style/drop_down.scss';

class DropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = { expanded : false }

    this.expandPanel = this.expandPanel.bind(this);
  }

  sortPanels(a, b){
    let currentDate = new Date();
    let isFile = !!a.url;
    let aDate =  new Date(a.date + ' ' + a.time);
    let bDate =  new Date(b.date + ' ' + b.time);
    let aDatePassed = aDate < currentDate;
    let bDatePassed = bDate < currentDate;
    let aPending = !!(!a.accepted && !a.declineReason);
    let bPending = !!(!b.accepted && !b.declineReason);

    if((isFile) ||
       (aDatePassed || bDatePassed) ||
       (aPending && bPending) ||
       (a.accepted && b.accepted) ||
       (!!a.declineReason && !!b.declineReason)){
      return (aDate < bDate ? -1 : 1);
    }

    if(aPending || bPending){
      return (aPending ? -1 : 1);
    }

    if(a.accepted || b.accepted){
      return (a.accepted ? -1 : 1);
    }

    return (aDate > bDate ? -1 : 1);
  }

  renderData() {
    let {
      component: Component,
      data,
      onDelete,
      onUpdate,
      doctors,
      currentUser,
      title
     } = this.props;

    if (!data.length) {
      return (
        <div style={{ textAlign : 'center', fontSize : '.8em' }}>
          No {title}
        </div>
      );
    }

    return data.sort(this.sortPanels).map((d, i) => {
      return(
        <li key={i} className="drop-down-panel-container">
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
      <div className="drop-down-container" id={title + "-drop-down"}>
        <header>{title}</header>
        <footer onClick={this.expandPanel}>
          {expanded ? 'Minimize' : 'Expand'}
        </footer>
        <section ref="panel">
          <ul>{this.renderData()}</ul>
        </section>
        <footer onClick={this.expandPanel}>
          {expanded ? 'Minimize' : ''}
        </footer>
      </div>
    );
  }
}

export default DropDown;
