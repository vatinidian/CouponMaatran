import React from "react";
import AddCouponModalContainer from "../containers/AddCouponModalContainer";
import SubFilterItemContainer from "../containers/SubFilterItemContainer";
import UserEntryModal from "./UserEntryModal";
import Toast from "./Toast";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addCouponModalShow: false,
      userEntryModalShow: false,
      pendingActionAfterLogin: [],
      userEntryMessage: "",
      showToastMessage: false,
      toastMessage: "",
      toastMessageCount: 0
    };

    this.baseState = this.state;

    this.handleLoginComplete = this.handleLoginComplete.bind(this);

    this.handleAddCouponModalToggle = this.handleAddCouponModalToggle.bind(
      this
    );
    this.handleUserEntryToggle = this.handleUserEntryToggle.bind(this);
    this.handleAddCouponFinished = this.handleAddCouponFinished.bind(this);
    this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
    this.handleSearchButton = this.handleSearchButton.bind(this);
  }

  componentDidMount() {
    const searchInput = document.getElementById("searchInput");
    searchInput.addEventListener("keyup", event => {
      if (event.key === "Enter") {
        this.props.setFireSearch(true);
      }
    });
  }

  showToast() {
    if (!this.state.showToastMessage) {
      return null;
    }
    return (
      <Toast
        messageCount={this.state.toastMessageCount}
        message={this.state.toastMessage}
      />
    );
  }

  handleAddCouponModalToggle() {
    if (!this.props.loggedIn) {
      this.setState(
        {
          userEntryMessage: "Login before adding your coupons!"
        },
        () => {
          this.setState({
            userEntryModalShow: !this.state.userEntryModalShow,
            pendingActionAfterLogin: ["addCouponModalShow"]
          });
        }
      );
    } else {
      this.setState({
        addCouponModalShow: !this.state.addCouponModalShow,
        pendingActionAfterLogin: []
      });
    }
  }
  handleAddCouponFinished() {
    let iMessageCount = this.state.messageCount;
    this.setState({
      showMessage: true,
      message: "Coupon added successfully!",
      messageCount: ++iMessageCount,
      addCouponModalShow: !this.state.addCouponModalShow
    });

    this.props.setFireSearch(true);
  }

  handleUserEntryToggle() {
    this.setState(
      {
        userEntryMessage: ""
      },
      () => {
        this.setState({
          userEntryModalShow: !this.state.userEntryModalShow,
          pendingActionAfterLogin: []
        });
      }
    );
  }

  handleLoginComplete() {
    // TODO : Loop and do it 'addCouponModalShow'
    if (
      this.props.loggedIn &&
      this.state.pendingActionAfterLogin[0] === "addCouponModalShow"
    ) {
      this.setState({
        addCouponModalShow: !this.state.addCouponModalShow
      });
    }

    this.handleUserEntryToggle();
  }

  handleSearchInputChange(event) {
    const target = event.target;
    const value = target.value;
    this.props.setSearchInput(value);
  }

  handleSearchButton() {
    this.props.setFireSearch(true);
  }

  render() {
    return (
      <>
        <div className="headerContainer">
          <div className="mainContainer">
            <div className="appLogo">
              <span className="appLogoText">Coupon</span>
              <span className="appLogoText">Maatran</span>
            </div>

            {/* Search Area */}
            <div className="searchArea">
              <input
                type="text"
                placeholder="Search Coupons"
                name="searchInput"
                className="searchInput"
                id="searchInput"
                value={this.props.searchInput}
                onChange={this.handleSearchInputChange}
              />
              <button
                className="searchButton"
                onClick={this.handleSearchButton}
              >
                <i className="material-icons">search</i>
              </button>
            </div>

            {/** Add Coupon Action */}
            <div className="actionContainer">
              {!this.props.loggedIn && (
                <button
                  className="headerButton"
                  onClick={this.handleUserEntryToggle}
                >
                  <i className="material-icons">person_outline</i>
                </button>
              )}

              {this.state.userEntryModalShow && (
                <UserEntryModal
                  message={this.state.userEntryMessage}
                  show={this.state.userEntryModalShow}
                  onClose={this.handleUserEntryToggle}
                  onLoggedIn={this.handleLoginComplete}
                />
              )}

              {this.props.loggedIn && (
                <div className="userInfo">
                  <span> Hello, </span>
                  <span className="usernameSpan">
                    {" "}
                    {this.props.userInfo.firstname ||
                      this.props.userInfo.username}
                  </span>
                </div>
              )}

              <button
                className="headerButton"
                onClick={this.handleAddCouponModalToggle}
              >
                <i className="material-icons">add</i>
              </button>

              {this.state.addCouponModalShow && (
                <AddCouponModalContainer
                  sideTitle="Coupon"
                  show={this.state.addCouponModalShow}
                  onClose={this.handleAddCouponModalToggle}
                  onAddCouponFinish={this.handleAddCouponFinished}
                />
              )}
            </div>
          </div>

          <div className="subHeaderContainer">
            <SubFilterItemContainer />
          </div>
        </div>
        {this.showToast()}
      </>
    );
  }
}

export default Header;
