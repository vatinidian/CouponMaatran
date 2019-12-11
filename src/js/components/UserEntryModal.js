import React from "react";
import axios from "axios";
import { setUserLoginInfo } from "../actions";
import { connect } from "react-redux";

class UserEntryModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginFormVisible: true,
      logonMessage: "",
      username: "",
      password: ""
    };

    this.baseState = this.state;
    this.handleUserEntry = this.handleUserEntry.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleUserEntry() {
    if (this.state.loginFormVisible) {
      this.doLogin();
    }
  }

  doLogin() {
    this.setState({
      logonMessage: ""
    });
    let oForm = document.getElementById("userEntryLoginForm");
    if (!oForm.reportValidity()) {
      return;
    }

    axios
      .get("http://localhost:5000/user/login", {
        auth: {
          username: this.state.username,
          password: this.state.password
        }
      })
      .then((req, res) => {
        if (req.data && req.data.status === "LOGGED_IN") {
          this.props.setUserLoginInfo(req.data.userInfo);
          this.setState(this.baseState);
          this.props.onLoggedIn();
        } else if (req.data.status) {
          // Handle Other cases here
          this.setState({
            logonMessage: "Logon Failed : " + req.data.statusText
          });
        } else {
          this.setState({
            logonMessage: "Logon Failed"
          });
        }
      })
      .catch(oError => console.log(oError));
  }

  handleInputChange(event) {
    const target = event.target;
    let value;

    if (target.type === "select-one" && target.selectedOptions[0]) {
      value = target.selectedOptions[0].value;
    } else {
      value = target.value;
    }

    const name = target.name;

    this.setState({ [name]: value });
  }

  getUserEntryContent() {
    let oUserEntryBodyContent;
    if (this.state.loginFormVisible) {
      oUserEntryBodyContent = (
        <form
          onSubmit={this.handleAddCoupon}
          autoComplete="off"
          id="userEntryLoginForm"
        >
          <div className="entryFormGroup">
            <input
              type="text"
              name="username"
              required
              placeholder="Username*"
              className="formModalInput"
              value={this.state.username}
              onChange={this.handleInputChange}
            />
          </div>

          <div className="entryFormGroup">
            <input
              type="password"
              name="password"
              required
              placeholder="Password*"
              className="formModalInput"
              value={this.state.password}
              onChange={this.handleInputChange}
            />
          </div>
        </form>
      );
    }
    return <div className="userEntryContent">{oUserEntryBodyContent}</div>;
  }

  render() {
    if (!this.props.show) {
      return null;
    }

    return (
      <div className="modalContainer">
        <div className="userEntry show">
          <div className="userEntryHeader">
            <div className="userEntryTitle">
              {this.state.loginFormVisible ? "Login" : "SignUp"}
            </div>
            <div className="userEntryHeaderActions">
              <button className="actionIconButton" onClick={this.props.onClose}>
                <i className="large material-icons">close</i>
              </button>
            </div>
          </div>

          {/** Body Content*/}
          <div className="userEntryBody">
            {(this.state.logonMessage || this.props.message) && (
              <div className="messageArea">
                {this.state.logonMessage || this.props.message}{" "}
              </div>
            )}
            {this.getUserEntryContent()}
          </div>

          {/** Modal  Footer*/}
          <div className="modalFooter">
            <button className="endButton" onClick={this.handleUserEntry}>
              {" "}
              Login{" "}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setUserLoginInfo: data => dispatch(setUserLoginInfo(data))
  };
};

export default connect(null, mapDispatchToProps)(UserEntryModal);
