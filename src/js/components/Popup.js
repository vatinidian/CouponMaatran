import React from "react";

class Popup extends React.Component {
  show() {
    let x = document.getElementById("popup");
    x.className = "show";
  }

  close() {
    let y = document.getElementById("popup");
    y.className = y.className.replace("show", "");
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.messageCount !== prevProps.messageCount) {
      this.show();
    }
  }

  componentDidMount() {
    this.show();
  }
  render() {
    return <div id="popup" className="popup">{this.props.children}</div>;
  }
}

export default Popup;
