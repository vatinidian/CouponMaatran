import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

class AddCouponModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      couponType: "",
      category: "",
      couponPrice: "",
      exchangePrice: "",
      quantity: "",
      title: "",
      validityStart: "",
      validityEnd: "",
      description: "",
      ownerID: "Dummy", // Need to change after User Model creation
      sourceProductID: "",
      exchangeInfo: "",
      negotiable: "",
      currency: "",
      exchangeType: ""
    };

    this.baseState = this.state;
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handlevalidityStartDate = this.handlevalidityStartDate.bind(this);
    this.handlevalidityEndDate = this.handlevalidityEndDate.bind(this);
    this.handleAddCoupon = this.handleAddCoupon.bind(this);
  }

  componentDidMount() {
    let aValueHelps = [
      "categories",
      "couponTypes",
      "exchangeTypes",
      "currencies"
    ];
    aValueHelps.forEach(sFieldName => {
      this.readValueHelpsData(sFieldName);
    });
  }

  readValueHelpsData(sFieldName) {
    // Check Data exists and load it from store directly .
    if (this.props[sFieldName] && this.props[sFieldName].length > 0) {
      return;
    }

    let sDispatchPath =
      "set" + sFieldName.charAt(0).toUpperCase() + sFieldName.slice(1);
    axios
      .get("http://localhost:5000/" + sFieldName)
      .then(response => {
        this.props[sDispatchPath](response.data || []);
      })
      .catch(error => {
        console.log(error);
      });
  }

  formValueHelpSelect(oListInfo) {
    if (
      !oListInfo ||
      !oListInfo.sFieldName ||
      !oListInfo.list ||
      !oListInfo.oListProp
    ) {
      return;
    }

    let aListArray = [];
    if (oListInfo.bUseProps) {
      aListArray = this.props[oListInfo.list];
    } else {
      aListArray = oListInfo.list;
    }

    return (
      <select
        name={oListInfo.sFieldName}
        required
        className={
          this.state[oListInfo.sFieldName]
            ? "couponSelectInput"
            : "couponSelectInput defaultSelectValue"
        }
        value={this.state[oListInfo.sFieldName]}
        onChange={this.handleInputChange}
      >
        <option key="dummy" value="" data-default>
          {oListInfo.sPlaceholder}
        </option>
        {aListArray &&
          aListArray.map(oItem => {
            return (
              <option
                key={oItem[oListInfo.oListProp.key]}
                value={oItem[oListInfo.oListProp.key]}
              >
                {oItem[oListInfo.oListProp.value]}
              </option>
            );
          })}
                 
      </select>
    );
  }

  checkDateValidation() {
    let oStartDate = document.getElementsByName("validityStart")[0];
    let oEndDate = document.getElementsByName("validityEnd")[0];
    if (!this.state.validityStart) {
      oStartDate.setCustomValidity("Enter Start Date");
    } else if (
      this.state.validityEnd &&
      this.state.validityStart > this.state.validityEnd
    ) {
      oEndDate.setCustomValidity(
        "End Date should be greater than Start Date !"
      );
    } else {
      oStartDate.setCustomValidity("");
      oEndDate.setCustomValidity("");
    }
  }

  checkPriceValidation() {
    if (this.state.exchangeType === "Free") {
      return;
    }
    let oCouponPrice = document.getElementsByName("couponPrice")[0];
    let oExchangePrice = document.getElementsByName("exchangePrice")[0];
    if (!this.state.couponPrice) {
      oCouponPrice.setCustomValidity("Coupon Price is required");
    } else if (!this.state.exchangePrice) {
      oExchangePrice.setCustomValidity("Expected Exchange Price is required");
    } else if (+this.state.couponPrice < +this.state.exchangePrice) {
      oExchangePrice.setCustomValidity(
        "Dont be Greedy ! Exchange Price should not be higher than coupon price"
      );
    } else {
      oExchangePrice.setCustomValidity("");
      oCouponPrice.setCustomValidity("");
    }
  }

  handlevalidityStartDate(date) {
    this.setState(
      {
        validityStart: date
      },
      this.checkDateValidation
    );
  }

  handlevalidityEndDate(date, event) {
    this.setState(
      {
        validityEnd: date
      },
      this.checkDateValidation
    );
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
    if (name === "couponPrice" || name === "exchangePrice") {
      this.setState({ [name]: value }, this.checkPriceValidation);
    } else {
      this.setState({ [name]: value });
    }
  }

  handleAddCoupon() {
    let oForm = document.getElementById("addCouponFormTag");
    oForm.className = "checkInvalid";
    if (!oForm.reportValidity()) {
      return;
    }
    let oCouponPayLoad = Object.assign({}, this.state);
    if (this.props.loggedIn) {
      oCouponPayLoad.ownerID = this.props.userInfo.username;
    }
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
        <form
          onSubmit={this.handleAddCoupon}
          autoComplete="off"
          id="addCouponFormTag"
        >
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
                {this.formValueHelpSelect({
                  sFieldName: "couponType",
                  list: "couponTypes",
                  oListProp: {
                    key: "couponType",
                    value: "couponType"
                  },
                  sPlaceholder: "Enter Coupon Type",
                  bUseProps: true
                })}
              </div>

              <div className="form-group">
                {this.formValueHelpSelect({
                  sFieldName: "category",
                  list: "categories",
                  oListProp: {
                    key: "category",
                    value: "category"
                  },
                  sPlaceholder: "Enter Coupon Category",
                  bUseProps: true
                })}
              </div>

              <div className="form-group">
                <div>
                  <DatePicker
                    required
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
                    required
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
                {this.formValueHelpSelect({
                  sFieldName: "exchangeType",
                  list: "exchangeTypes",
                  oListProp: {
                    key: "exchangeType",
                    value: "exchangeType"
                  },
                  sPlaceholder: "Enter Exchange Type",
                  bUseProps: true
                })}
              </div>
              <div className="form-group">
                <input
                  type="number"
                  name="couponPrice"
                  min="0"
                  required
                  placeholder="Coupon Price"
                  className="couponInput"
                  value={this.state.couponPrice}
                  onChange={this.handleInputChange}
                />
              </div>

              <div className="form-group">
                <input
                  disabled={
                    this.state.exchangeType === "Free" ? "disabled" : ""
                  }
                  type="number"
                  min="0"
                  name="exchangePrice"
                  required
                  placeholder="Exchange Price"
                  className="couponInput"
                  value={this.state.exchangePrice}
                  onChange={this.handleInputChange}
                />
              </div>

              <div className="form-group">
                {this.formValueHelpSelect({
                  sFieldName: "currency",
                  list: "currencies",
                  oListProp: {
                    key: "currency",
                    value: "currencyDesc"
                  },
                  sPlaceholder: "Enter Currency",
                  bUseProps: true
                })}
              </div>
            </div>

            <div className="section">
              <div className="form-group">
                <select
                  disabled={
                    this.state.exchangeType === "Free" ? "disabled" : ""
                  }
                  name="negotiable"
                  required
                  className={
                    this.state.negotiable
                      ? "couponSelectInput"
                      : "couponSelectInput defaultSelectValue"
                  }
                  value={this.state.negotiable}
                  onChange={this.handleInputChange}
                >
                  <option key="dummy" value="" data-default>
                    Enter Negotiation Type
                  </option>
                  <option key="true" value="true">
                    Negotiable
                  </option>
                  <option key="false" value="false">
                    Non-Negotiable
                  </option>
                </select>
              </div>
              <div className="form-group">
                <input
                  type="number"
                  name="quantity"
                  min="1"
                  step="1"
                  required="required"
                  placeholder="Quantity"
                  className="couponInput"
                  value={this.state.quantity}
                  onChange={this.handleInputChange}
                />
              </div>

              <div className="form-group">
                {/* TODO : use ENUM for exchange type check*/}
                <input
                  disabled={
                    this.state.exchangeType === "Cash" ||
                    this.state.exchangeType === "Free"
                      ? "disabled"
                      : ""
                  }
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
          <div className="addCouponBody">{this.getAddCouponModalContent()}</div>

          {/** Modal  Footer*/}
          <div className="modalFooter">
            <button className="endButton" onClick={this.props.onClose}>
              {" "}
              Close{" "}
            </button>
            <button className="endButton" onClick={this.handleAddCoupon}>
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
