import React from "react";
import Modal from "./Modal";
import axios from "axios";
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
        this.props.onSearch();
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

        this.baseState.addCouponModalShow = false;

        this.props.onAddCouponFinish();
      })
      .catch(oError => console.log(oError));
  }

  render() {
    return (
      <div className="headerContainer">
        {/** App Logo 
        Commented the logo image:
         <img
            className="appLogoImage"
            src={process.env.PUBLIC_URL + "/Icon_CM_small.png"}
            alt="CouponMaatran"
          ></img>
        */}
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
          <button className="searchButton" onClick={this.props.onSearch}>
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

          <Modal
            title="Add Coupon"
            show={this.state.addCouponModalShow}
            onClose={this.handleAddCouponModalToggle}
            onConfirm={this.handleAddCoupon}
          >
            <div className="addCouponForm">
              <form onSubmit={this.handleAddCoupon} autocomplete="off" q>
                <div className="form-group">
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
                <div className="form-group">
                  <textarea
                    required
                    placeholder="Description"
                    className="couponInput"
                    name="description"
                    value={this.state.description}
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
                  <input
                    type="text"
                    name="price"
                    required
                    placeholder="Price"
                    className="couponInput"
                    value={this.state.price}
                    onChange={this.handleInputChange}
                  />
                </div>

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
                    name="sourceProductID"
                    required
                    placeholder="Enter Product Information"
                    className="couponInput"
                    value={this.state.sourceProductID}
                    onChange={this.handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    name="ownerID"
                    required
                    placeholder="Enter your Username"
                    className="couponInput"
                    value={this.state.ownerID}
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

                <div className="form-group">
                  <label>Exchange Only: </label>
                  <select
                    name="exchangeOnly"
                    required
                    className="couponSelectInput"
                    value={this.state.exchangeOnly}
                    onChange={this.handleInputChange}
                  >
                    <option key="dummy" value=""></option>
                    <option key="Yes" value="true">
                      Yes
                    </option>
                             
                    <option key="No" value="false">
                      No
                    </option>
                                     
                  </select>
                </div>

                <div className="form-group">
                  <label>Negotiable: </label>
                  <select
                    name="negotiable"
                    required
                    className="couponSelectInput"
                    value={this.state.negotiable}
                    onChange={this.handleInputChange}
                  >
                    <option key="dummy" value=""></option>
                    <option key="Yes" value="true">
                      Yes
                    </option>
                             
                    <option key="No" value="false">
                      No
                    </option>
                             
                  </select>
                </div>
              </form>
            </div>
          </Modal>
        </div>
      </div>
    );
  }
}

export default Header;
