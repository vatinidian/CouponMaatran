import React from "react";
import Modal from "./Modal";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.aCarouselItems = [
      {
        itemName: "ExchangeOnly",
        key: "ExchangeOnly",
        selected: false
      },
      {
        itemName: "CashOnly",
        key: "CashOnly",
        selected: false
      },
      {
        itemName: "Fashion",
        key: "Fashion",
        selected: false
      },
      {
        itemName: "Test",
        key: "Test",
        selected: false
      },
      {
        itemName: "Food",
        key: "Food",
        selected: false
      },
      {
        itemName: "Digital",
        key: "Digital",
        selected: false
      },
      {
        itemName: "HelloWorld",
        key: "HelloWorld",
        selected: false
      },
      {
        itemName: "This is the longest ITEM KEY, i think",
        key: "This is the longest ITEM KEY",
        selected: false
      },
      {
        itemName: "LONGGGGGGeeeerrrrrrrTest3",
        key: "LONGGGGGGTest3",
        selected: false
      },
      {
        itemName: "BigggggTest4",
        key: "BigggggTest4",
        selected: false
      },
      {
        itemName: "BigggggTest5",
        key: "BigggggTest5",
        selected: false
      },
      {
        itemName: "BigggggTest10",
        key: "BigggggTest10",
        selected: false
      },
      {
        itemName: "BigggggTest11",
        key: "BigggggTest11",
        selected: false
      },
      {
        itemName: "BigggggTest12",
        key: "BigggggTest12",
        selected: false
      },
      {
        itemName: "BigggggTest13",
        key: "BigggggTest13",
        selected: false
      },
      {
        itemName: "BigggggTest14",
        key: "BigggggTest14",
        selected: false
      },
      {
        itemName: "BigggggTest15",
        key: "BigggggTest15",
        selected: false
      },
      {
        itemName: "BigggggTest16",
        key: "BigggggTest16",
        selected: false
      },
      {
        itemName: "BigggggTest17",
        key: "BigggggTest17",
        selected: false
      },
      {
        itemName: "BigggggTest18",
        key: "BigggggTest18",
        selected: false
      },
      {
        itemName: "BigggggTest19",
        key: "BigggggTest19",
        selected: false
      }
    ];

    this.state = {
      addCouponModalShow: false,
      carouselItems: this.aCarouselItems,
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
    this.handleNavigation = this.handleNavigation.bind(this);
  }

  componentDidMount() {
    const searchInput = document.getElementById("searchInput");
    searchInput.addEventListener("keyup", event => {
      if (event.key === "Enter") {
        this.props.onSearch();
      }
    });

    this._showNavButtons();
  }

  _showNavButtons(sMovedWidth = "0px", sAction) {
    let oCarouselItem = document.getElementById("searchCarouselItem");
    let sItemWidth = oCarouselItem.offsetWidth;
    let oRightNav = document.getElementsByClassName("rightNavigation")[0];
    let oLeftNav = document.getElementsByClassName("leftNavigation")[0];
    let oCarouselContent = document.getElementById("searchCarouselContent");
    let sContentWidth = oCarouselContent.offsetWidth;

    if (sAction === "rightNavigation") {
      oLeftNav.className = "navigation leftNavigation show";
      oCarouselContent.className = "carouselContent moveRight";
    } else {
      oLeftNav.className = "navigation leftNavigation";
      oCarouselContent.className = "carouselContent";
    }

    let sNewMovedWidth = Math.abs(sMovedWidth.replace("px", ""));  
    let sRemainingWidth = sItemWidth - sNewMovedWidth;
    if(sNewMovedWidth > sItemWidth){
      // Something gone wrong , if this case is successful
      // so reset the carousel
      sNewMovedWidth = 0;
      sRemainingWidth = sItemWidth;
      oCarouselItem.style.left = "0px";
      oCarouselContent.className = "carouselContent";
    }
    if (sNewMovedWidth > 0) {
      oLeftNav.className = "navigation leftNavigation show";
    } else {
      oLeftNav.className = "navigation leftNavigation";
    }

    if (sRemainingWidth > sContentWidth) {
      oRightNav.className = "navigation rightNavigation show";
    } else {
      oRightNav.className = "navigation rightNavigation";
    }
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
    delete oCouponPayLoad.carouselItems;
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
    );
  }

  handleCarouselItemSelect(event) {
    let oCarouselItem = document.getElementById(event.target.id);
    let sExistingClassName = oCarouselItem.className;
    if (sExistingClassName === "carouselButton carouselButtonSelected") {
      oCarouselItem.className = "carouselButton";
    } else {
      oCarouselItem.className = "carouselButton carouselButtonSelected";
    }
  }

  handleNavigation(oEvent) {
    let oCarouselItem = document.getElementById("searchCarouselItem");
    let oCarouselContent = document.getElementById("searchCarouselContent");
    let sWidth = oCarouselContent.offsetWidth;
    let sMoveWidth;
    if (oEvent.target.id === "leftNav") {
      sMoveWidth =
        (+oCarouselItem.style.left.replace("px", "") || 0) + sWidth + "px";
      oCarouselItem.style.left = sMoveWidth;

      window.setTimeout(() => {
        this._showNavButtons(sMoveWidth, "leftNavigation");
      }, 0);
    } else {
      sMoveWidth =
        (+oCarouselItem.style.left.replace("px", "") || 0) - sWidth + "px";
      oCarouselItem.style.left = sMoveWidth;

      window.setTimeout(() => {
        this._showNavButtons(sMoveWidth, "rightNavigation");
      }, 0);
    }
  }

  loadCarousel() {
    const aCarouselItems = this.state.carouselItems.map(oItem => (
      <button
        id={oItem.key}
        key={oItem.key}
        className="carouselButton"
        onClick={this.handleCarouselItemSelect}
      >
        {oItem.itemName}
      </button>
    ));
    return (
      <div className="searchCarousel">
        <div className="navigation leftNavigation">
          <button className="iconButton" onClick={this.handleNavigation}>
            <i id="leftNav" className="large material-icons">
              chevron_left
            </i>
          </button>
        </div>

        <div id="searchCarouselContent" className="carouselContent">
          <div id="searchCarouselItem" className="carouselItems">
            {aCarouselItems}
          </div>
        </div>

        <div className="navigation rightNavigation">
          <button className="iconButton" onClick={this.handleNavigation}>
            <i id="rightNav" className="large material-icons">
              chevron_right
            </i>
          </button>
        </div>
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
              {this.getAddCouponModalContent()}
            </Modal>
          </div>
        </div>
        <div className="subHeaderContainer">{this.loadCarousel()}</div>
      </div>
    );
  }
}

export default Header;
