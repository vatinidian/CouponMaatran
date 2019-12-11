import React from "react";
//<button><i className="fa fa-heart"></i></button>
class CouponCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expired: false,
      outOfStock: false,
      coponTypeImageUrl: ""
    };

    this.handleMoreInfoClick = this.handleMoreInfoClick.bind(this);
  }

  checkExpired() {
    let oToday = new Date();
    if (new Date(this.props.data.validityEnd) < oToday) {
      this.setState({
        expired: true
      });
    }
  }

  checkOutOfStock() {
    if (!this.props.data.quantity) {
      this.setState({
        outOfStock: true
      });
    }
  }

  handleMoreInfoClick() {
    this.props.onSelectMoreInfo(this.props.data);
  }

  loadCouponTypeImage() {
    let sCouponType = this.props.data.couponType.toLowerCase();

    switch (sCouponType) {
      // E-Voucher Case
      case "e-voucher":
      case "evoucher":
        this.setState({ coponTypeImageUrl: "/evoucher.png" });
        break;

      // Coupon Codes or Offer Codes
      case "couponcode":
      case "code":
      case "offercode":
        this.setState({ coponTypeImageUrl: "/couponcode.png" });
        break;

      // Discount
      case "discount":
        this.setState({ coponTypeImageUrl: "/discount.png" });
        break;

      default:
        this.setState({ coponTypeImageUrl: "/default_coupon.svg" });
        break;
    }
  }

  paymentType() {
    let sExchangeType = this.props.data.exchangeType
      ? this.props.data.exchangeType.toLowerCase()
      : "";
    let sExchangeTypeElement;
    switch (sExchangeType) {
      case "free":
        sExchangeTypeElement = (
          <>
            <div className="exchangeTypeInfo">
              <span className="subCardHeader">Exchange By:</span>
              <br />
              <span className="freeCouponText"> FREE </span>
            </div>
          </>
        );
        break;
      case "cash":
        sExchangeTypeElement = (
          <>
            <div className="exchangeTypeInfo">
              <span className="subCardHeader">Exchange By:</span>
              <div className="exchangeTypeTitle">
                <span>Cash</span>
              </div>
            </div>

            <h3 className="cardPrice priceText">
              {this.props.data.exchangePrice}
              <span className="subText">(INR)</span>
            </h3>
            <span className="subText">
              {this.props.data.negotiable ? "(Negotiable)" : "(Non-Negotiable)"}
            </span>
          </>
        );
        break;

      case "exchange":
        sExchangeTypeElement = (
          <>
            <div className="exchangeTypeInfo">
              <span className="subCardHeader">Exchange By:</span>
              <br />
            </div>

            <div>
              <span className="mediumText">Options</span>
            </div>

            <span className="subText">
              {this.props.data.negotiable ? "(Negotiable)" : "(Non-Negotiable)"}
            </span>
          </>
        );
        break;

      default:
        // Exchange TYPE - Any
        sExchangeTypeElement = (
          <>
            <div className="exchangeTypeInfo">
              <span className="subCardHeader">Exchange By:</span>
              <br />
            </div>

            <div>
              <span className="mediumText">Cash: </span>
              <span className="priceText">
                <span className="mediumText">
                  {this.props.data.exchangePrice}
                </span>
                <span className="subText"> (INR)</span>
              </span>
            </div>

            <span className="subText"> (or) </span>
            <div>
              <span className="mediumText">Options</span>
            </div>
          </>
        );
        break;
    }

    return (
      <div className="paymentInfo">
        {sExchangeTypeElement}
        <div className="couponWorth">
          <span className="subCardHeader">Coupon Worth:</span>
          <br />
          <span className="mediumText">
            {this.props.data.couponPrice} (INR)
          </span>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.loadCouponTypeImage();
    this.checkExpired();
    this.checkOutOfStock();
  }

  render() {
    return (
      <div
        className={
          this.state.expired ? "couponCard expiredCoupon" : "couponCard"
        }
      >
        <div>
          <div className="cardHeader">
            <div className="cardImageHolder">
              <img
                className="cardTypeImage"
                src={process.env.PUBLIC_URL + this.state.coponTypeImageUrl}
                alt="Type"
              ></img>
            </div>

            <div className="cardHeaderText">
              <div className="cardTitle">{this.props.data.title}</div>
              <div className="cardSubTitle">
                {this.props.data.category +
                  " (" +
                  this.props.data.couponType +
                  ")"}
              </div>
            </div>

            <div className="cardInfo">
              {(this.state.expired || this.state.outOfStock) && (
                <button className="iconButton errorIcon">
                  <i className="large material-icons">error_outline</i>
                </button>
              )}
            </div>
          </div>

          <div className="cardBody">
            <div className="cardLeftContent">{this.paymentType()}</div>

            {/* Right Body Content */}
            <div className="cardRightContent">
              <div className="cardContentAttributes">
                Validity:{" "}
                {this.state.expired && (
                  <span className="invalidState">(Expired)</span>
                )}{" "}
                <br />
                {new Date(this.props.data.validityStart).toLocaleDateString() +
                  "-" +
                  new Date(this.props.data.validityEnd).toLocaleDateString()}
              </div>

              <div className="cardContentAttributes">
                Quantity:
                <span
                  className={
                    this.state.outOfStock
                      ? "quantityText invalidState"
                      : "quantityText"
                  }
                >
                  {this.props.data.quantity || "0"}{" "}
                </span>
              </div>

              <div className="cardContentAttributes">
                Product Info: <br />
                <a href="test" target="_parent">
                  {this.props.data.sourceProductID}{" "}
                </a>
              </div>
            </div>
          </div>

          <div className="cardFooter">
            {!this.state.expired && !this.state.outOfStock && (
              <button className="endButton iconButton">
                <i className="large material-icons">add_shopping_cart</i>
              </button>
            )}
            <button className="endButton" onClick={this.handleMoreInfoClick}>
              {" "}
              More Info{" "}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default CouponCard;
