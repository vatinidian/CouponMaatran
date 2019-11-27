import React from "react";
import axios from "axios";
import CouponCard from "./CouponCard";

class SearchContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coupons: [],
      showCouponDetails: false,
      currentCouponInDetail: {}
    };
    this.getCoupons = this.getCoupons.bind(this);
    this.handleMoreInfoSelected = this.handleMoreInfoSelected.bind(this);
    this.handleDetailClose = this.handleDetailClose.bind(this);
  }

  /* shouldComponentUpdate(nextProps) {
    if(!this.props.filters.searchText) {
      return true;
    }
    return this.props.filters.searchText !== nextProps.filters.searchText;
  }
*/
  componentWillReceiveProps(props) {
    const { searchText } = this.props.filters;
    if (props.filters.searchText !== searchText || props.fireSearch) {
      this.handleDetailClose();
      this.getCoupons(
        props.filters.searchText ? props.filters.searchText.trim() : ""
      );
    }
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/coupons/")
      .then(response => {
        this.setState({ coupons: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  getCoupons(searchText) {
    axios
      .get("http://localhost:5000/coupons/", {
        params: {
          searchFilter: searchText
        }
      })
      .then(response => {
        this.setState({ coupons: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  createCouponCards() {
    return this.state.coupons.map(coupon => {
      return (
        <CouponCard
          data={coupon}
          key={coupon._id}
          onSelectMoreInfo={this.handleMoreInfoSelected}
        />
      );
    });
  }

  handleMoreInfoSelected(oCoupon) {
    this.setState({
      showCouponDetails: true,
      currentCouponInDetail: oCoupon
    });
  }

  handleDetailClose() {
    this.setState({
      showCouponDetails: false
    });
  }
  render() {
    return (
      <div className="searchContentWrap">
        <div
          className={
            this.state.showCouponDetails
              ? "searchListLeftContent detailInShow"
              : "searchListLeftContent"
          }
        >
          <h3 className="searchTitle">
            Coupons ({this.state.coupons.length}){" "}
          </h3>
          <div className="searchContent">{this.createCouponCards()}</div>
        </div>
        {this.state.showCouponDetails && (
          <div className="searchContentDetails">
            <div className="detailsHeader">
              <div className="detailTitle">
                Detail of Coupon : {this.state.currentCouponInDetail.title}
              </div>
              <div className="detailHeaderAction">
                <button
                  className="actionIconButton"
                  onClick={this.handleDetailClose}
                >
                  <i className="large material-icons">close</i>
                </button>
              </div>
            </div>
          </div>
        )}

        {this.props.fireSearch && this.state.coupons.length === 0 && (
          <div className="searchNoData">
            Sorry! No coupons found in search. Please change your search
            criteria.
          </div>
        )}
      </div>
    );
  }
}

export default SearchContent;
