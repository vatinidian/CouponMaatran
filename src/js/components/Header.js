import React from "react";
import AddCouponModal from "./AddCouponModal";
import axios from "axios";
import SubFilterItemContainer from "../containers/SubFilterItemContainer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addCouponModalShow: false,
      couponType: "",
      category: "",
      price: "",
      title: "",
      validityStart: "",
      validityEnd: "",
      description: "",
      ownerID: "",
      sourceProductID: "",
      exchangeOnly: "",
      negotiable: ""
    };

    this.baseState = this.state;

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAddCouponModalToggle = this.handleAddCouponModalToggle.bind(
      this
    );
    this.handleAddCoupon = this.handleAddCoupon.bind(this);
    this.handlevalidityEndDate = this.handlevalidityEndDate.bind(this);
    this.handlevalidityStartDate = this.handlevalidityStartDate.bind(this);
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

  handleInputChange(event) {
    const target = event.target;
    let value;

    if (target.type === "select-one" && target.selectedOptions[0]) {
      value = target.selectedOptions[0].value === "true" ? true : false;
    } else {
      value = target.value;
    }
    const name = target.name;
    this.setState({ [name]: value });
  }

  handleSearchInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.props.onFilterChange(name, value);
  }
  handlevalidityStartDate(date) {
    this.setState({
      validityStart: date
    });
  }

  handlevalidityEndDate(date) {
    this.setState({
      validityEnd: date
    });
  }

  handleAddCoupon() {
    let oCouponPayLoad = Object.assign({}, this.state);
    delete oCouponPayLoad.addCouponModalShow;
    axios
      .post("http://localhost:5000/coupons/add", oCouponPayLoad)
      .then((req, res) => {
        this.setState(this.baseState);
        this.props.onAddCouponFinish();
      })
      .catch(oError => console.log(oError));
  }

  getAddCouponModalContent() {
    return (
      <div className="addCouponForm">
        <div className="barCodeText">
          ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
        </div>
        <form onSubmit={this.handleAddCoupon} autoComplete="off">
          <div className="form-group couponTitle">
            <input
              type="text"
              name="title"
              required
              placeholder="Title"
              className="couponInput"
              value={this.state.title}
              onChange={this.handleInputChange}
            />
          </div>

          <div className="form-group couponDescription">
            <textarea
              required
              placeholder="Description"
              className="couponInput couponDescTextArea"
              name="description"
              value={this.state.description}
              onChange={this.handleInputChange}
            />
          </div>
          
          <div className="sectionContainers">
            <div className="section">
              <div className="form-group">
                <input
                  type="text"
                  name="couponType"
                  required
                  placeholder="CouponType"
                  className="couponInput"
                  value={this.state.couponType}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="category"
                  placeholder="Category"
                  required
                  className="couponInput"
                  value={this.state.category}
                  onChange={this.handleInputChange}
                />
              </div>

              <div className="form-group">
                <div>
                  <DatePicker
                    className="couponInput"
                    placeholderText="Validity Start Date"
                    name="validityStart"
                    selected={this.state.validityStart}
                    onChange={this.handlevalidityStartDate}
                  />
                </div>
              </div>

              <div className="form-group">
                <div>
                  <DatePicker
                    className="couponInput"
                    name="validityEnd"
                    placeholderText="Validity End Date"
                    selected={this.state.validityEnd}
                    onChange={this.handlevalidityEndDate}
                  />
                </div>
              </div>
            </div>

            <div className="section">
              <div className="form-group">
                <input
                  type="text"
                  name="exchangeType"
                  required
                  placeholder="Exchange Type"
                  className="couponInput"
                  value={this.state.exchangeType}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="couponPrice"
                  required
                  placeholder="Coupon Price"
                  className="couponInput"
                  value={this.state.couponPrice}
                  onChange={this.handleInputChange}
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="exchangePrice"
                  required
                  placeholder="Exchange Price"
                  className="couponInput"
                  value={this.state.exchangePrice}
                  onChange={this.handleInputChange}
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="currency"
                  required
                  placeholder="currency"
                  className="couponInput"
                  value={this.state.currency}
                  onChange={this.handleInputChange}
                />
              </div>
            </div>

            <div className="section">
              <div className="form-group">
                <input
                  type="text"
                  name="negotiable"
                  required
                  placeholder="Negotiable"
                  className="couponInput"
                  value={this.state.negotiable}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="quantity"
                  required
                  placeholder="Quantity"
                  className="couponInput"
                  value={this.state.quantity}
                  onChange={this.handleInputChange}
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="exchangeInfo"
                  required
                  placeholder="Exchange Info"
                  className="couponInput"
                  value={this.state.exchangeInfo}
                  onChange={this.handleInputChange}
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="sourceProductID"
                  required
                  placeholder="Product Info"
                  className="couponInput"
                  value={this.state.sourceProductID}
                  onChange={this.handleInputChange}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    );
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

            <AddCouponModal
              sideTitle="Coupon"
              show={this.state.addCouponModalShow}
              onClose={this.handleAddCouponModalToggle}
              onConfirm={this.handleAddCoupon}
            >
              {this.getAddCouponModalContent()}
            </AddCouponModal>
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
