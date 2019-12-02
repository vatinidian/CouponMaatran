import React from "react";

class Toast extends React.Component {
  show() {
    let x = document.getElementById("toast");
    x.className = "show";
    setTimeout(this.close.bind(this), 3000);
  }

  close() {
    let y = document.getElementById("toast");
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
    return <div id="toast">{this.props.message}</div>;
  }
}

export default Toast;
