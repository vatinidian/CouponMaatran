import React from "react";

class AddCouponModal extends React.Component {
  render() {
    if (!this.props.show) {
      return null;
    }

    return (
      <div className="modalContainer">
        <div className="modal show">
          <div className="half-circle">
            <div className="verticalTitle">{this.props.sideTitle}</div>
          </div>

          {/** Body Content*/}
          <div className="addCouponBody">{this.props.children}</div>

          {/** Modal  Footer*/}
          <div className="modalFooter">
            <button className="endButton" onClick={this.props.onClose}>
              {" "}
              Close{" "}
            </button>
            <button className="endButton" onClick={this.props.onConfirm}>
              {" "}
              Add{" "}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default AddCouponModal;
