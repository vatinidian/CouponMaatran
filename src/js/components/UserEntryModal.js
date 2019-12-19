import React from "react";
import axios from "axios";
import { setUserLoginInfo } from "../actions";
import { connect } from "react-redux";

class UserEntryModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginFormVisible: true,
      userEntryMessage: "",
      username: "",
      password: "",
      userSignUpInfo: {
        username: "",
        password: "",
        emailID: "",
        privacy: "",
        firstname: "",
        lastname: ""
      }
    };

    this.baseState = this.state;
    this.handleUserEntry = this.handleUserEntry.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleNextPageLoad = this.handleNextPageLoad.bind(this);
    this.handleEnterKey = this.handleEnterKey.bind(this);
  }

  componentDidMount() {
    const oLoginUsername = document.getElementById("loginUsername");
    const oLoginPassword = document.getElementById("loginPassword");
    oLoginUsername.addEventListener("keyup", this.handleEnterKey);
    oLoginPassword.addEventListener("keyup", this.handleEnterKey);
  }

  handleEnterKey(oEvent) {
    if (oEvent.key === "Enter") {
      this.handleUserEntry();
    }
  }

  handleNextPageLoad() {
    let oForm = document.getElementById("userEntryLoginForm");
    let oForm1 = document.getElementById("userEntrySignUpForm");
    if (oForm) {
      oForm.className = "";
    } else if (oForm1) {
      oForm1.className = "";
    }

    this.setState(this.baseState);

    this.setState({
      loginFormVisible: !this.state.loginFormVisible
    });
  }

  handleUserEntry() {
    if (this.state.loginFormVisible) {
      this.doLogin();
    } else {
      this.doSignUp();
    }
  }

  doSignUp() {
    this.setState({
      userEntryMessage: ""
    });
    let oForm = document.getElementById("userEntrySignUpForm");
    oForm.className = "checkInvalid";
    if (!oForm.reportValidity()) {
      return;
    }

    axios
      .post("http://localhost:5000/user/register", {
        username: this.state.userSignUpInfo.username,
        password: this.state.userSignUpInfo.password,
        emailID: this.state.userSignUpInfo.emailID,
        privacy: this.state.userSignUpInfo.privacy,
        lastname: this.state.userSignUpInfo.lastname,
        firstname: this.state.userSignUpInfo.firstname
      })
      .then((req, res) => {
        if (req.data && req.data.status === "NEW_USER") {
          this.props.setUserLoginInfo(req.data.userInfo);
          this.props.onLoggedIn();
        } else if (req.data.status) {
          // Handle Other cases here
          this.setState({
            userEntryMessage: "SignUp Failed : " + req.data.statusText
          });
        } else {
          this.setState({
            userEntryMessage: "SignUp Failed"
          });
        }
      })
      .catch(oError => console.log(oError));
  }

  doLogin() {
    this.setState({
      userEntryMessage: ""
    });
    let oForm = document.getElementById("userEntryLoginForm");
    oForm.className = "checkInvalid";
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
          this.props.onLoggedIn();
        } else if (req.data.status) {
          // Handle Other cases here
          this.setState({
            userEntryMessage: "Logon Failed : " + req.data.statusText
          });
        } else {
          this.setState({
            userEntryMessage: "Logon Failed"
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

    if (this.state.loginFormVisible) {
      this.setState({ [name]: value });
    } else {
      this.setState({
        userSignUpInfo: { ...this.state.userSignUpInfo, [name]: value }
      });
    }
  }

  getUserEntryContent() {
    let oUserEntryBodyContent;
    if (this.state.loginFormVisible) {
      oUserEntryBodyContent = (
        <div className="logInContent">
          <form
            autoComplete="off"
            id="userEntryLoginForm"
            onSubmit={this.handleUserEntry}
          >
            <div className="entryFormGroup">
              <input
                id="loginUsername"
                type="text"
                name="username"
                required
                autoFocus
                placeholder="Username*"
                className="formModalInput"
                value={this.state.username}
                onChange={this.handleInputChange}
              />
            </div>

            <div className="entryFormGroup">
              <input
                id="loginPassword"
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
        </div>
      );
    } else {
      oUserEntryBodyContent = (
        <div className="signUpContent">
          <form autoComplete="off" id="userEntrySignUpForm">
            <div className="sectionHeader">
              <div className="entryFormGroup">
                <input
                  type="text"
                  name="firstname"
                  autoFocus
                  placeholder="First Name"
                  className="formModalInput"
                  value={this.state.userSignUpInfo.firstname}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="entryFormGroup">
                <input
                  type="text"
                  name="lastname"
                  placeholder="Last Name"
                  className="formModalInput"
                  value={this.state.userSignUpInfo.lastname}
                  onChange={this.handleInputChange}
                />
              </div>
            </div>

            <div className="sectionHeader">
              <div className="entryFormGroup">
                <input
                  type="text"
                  name="username"
                  required
                  placeholder="Username*"
                  className="formModalInput"
                  value={this.state.userSignUpInfo.username}
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
                  value={this.state.userSignUpInfo.password}
                  onChange={this.handleInputChange}
                />
              </div>
            </div>
            <div className="entryFormGroup">
              <input
                type="email"
                name="emailID"
                required
                placeholder="Email*"
                className="formModalInput"
                value={this.state.userSignUpInfo.emailID}
                onChange={this.handleInputChange}
              />
            </div>

            <div className="entryFormGroup">
              <input
                type="text"
                name="privacy"
                required
                placeholder="Privacy*"
                className="formModalInput"
                value={this.state.userSignUpInfo.privacy}
                onChange={this.handleInputChange}
              />
            </div>
          </form>
        </div>
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
              {this.state.loginFormVisible ? "Login" : "Create Your Account"}
            </div>
            <div className="userEntryHeaderActions">
              <button className="actionIconButton" onClick={this.props.onClose}>
                <i className="large material-icons">close</i>
              </button>
            </div>
          </div>

          {/** Body Content*/}
          <div className="userEntryBody">
            {(this.state.userEntryMessage || this.props.message) && (
              <div className="messageArea">
                {this.state.userEntryMessage || this.props.message}{" "}
              </div>
            )}
            {this.getUserEntryContent()}
          </div>

          {/** Modal  Footer*/}
          <div className="modalFooter">
            <button className="beginButton" onClick={this.handleNextPageLoad}>
              {this.state.loginFormVisible ? "Create Account" : "Back To Login"}
            </button>
            <button className="endButton" onClick={this.handleUserEntry}>
              {this.state.loginFormVisible ? "Login" : "Create Account"}
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
