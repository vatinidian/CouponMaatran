import React from "react";
import AddCouponModalContainer from "../containers/AddCouponModalContainer";
import SubFilterItemContainer from "../containers/SubFilterItemContainer";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addCouponModalShow: false
    };

    this.baseState = this.state;

    this.handleAddCouponModalToggle = this.handleAddCouponModalToggle.bind(
      this
    );
    this.handleAddCouponFinished = this.handleAddCouponFinished.bind(this);
    this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
  }

  componentDidMount() {
    const searchInput = document.getElementById("searchInput");
    searchInput.addEventListener("keyup", event => {
      if (event.key === "Enter") {
        this.props.onSearch(null, true);
      }
    });
  }

  handleAddCouponModalToggle() {
    this.setState({
      addCouponModalShow: !this.state.addCouponModalShow
    });
  }

  handleSearchInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.props.onFilterChange(name, value);
  }

  handleAddCouponFinished() {
    this.setState({
      addCouponModalShow: !this.state.addCouponModalShow
    });
    this.props.onAddCouponFinish();
  }

  render() {
    return (
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
              onClick={this.props.onSearch.bind(this.state.selectedSubFilters)}
            >
              <i className="material-icons">search</i>
            </button>
          </div>

          {/** Add Coupon Action */}
          <div className="actionContainer">
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
    );
  }
}

export default Header;
