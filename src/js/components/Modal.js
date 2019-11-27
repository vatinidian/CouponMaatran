import React from "react";

class Modal extends React.Component {
  render() {
    if (!this.props.show) {
      return null;
    }

    return (
      <div className="modalContainer">
        <div className="modal show">
          {/** Modal  Header*/}
          <div className="modalHeader">
            {this.props.title}
          </div>

          {/** Modal  Body Content*/}
          <div className="modalBody">{this.props.children}</div>

          {/** Modal  Footer*/}
          <div className="modalFooter">
            <button className="endButton" onClick={this.props.onClose}> Close </button>
            <button className="endButton" onClick={this.props.onConfirm}> Confirm </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
