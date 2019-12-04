import React from "react";
import Header from "./Header";
import SearchContent from "./SearchContent";
import Toast from "./Toast";
import { connect } from "react-redux";

class SearchPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showMessage: false,
      message: "",
      messageCount: 0,
      searchInput: "",
      fireSearch: false,
      filter: {
        searchText: ""
      }
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleCouponAdded = this.handleCouponAdded.bind(this);
    this.handleSubFilterChange = this.handleSubFilterChange.bind(this);
  }

  componentWillReceiveProps(props) {
    if (props.selectedSubFilter) {
      this.handleSearch(props.selectedSubFilter)
    }
  }

  handleSubFilterChange() {
    // this.handleSearch();
  }

  handleFilterChange(sFielName, sValue) {
    this.setState({ fireSearch: false });
    this.setState({ [sFielName]: sValue });
  }

  handleSearch(aAdditionalFilters) {
    this.setState({
      fireSearch: true
    });

    let oFilter = {};
    if(aAdditionalFilters && aAdditionalFilters.length > 0){
      aAdditionalFilters.forEach((oAdditional)=>{
        if(!oFilter[oAdditional.propertyInCouponModel]) {
          oFilter[oAdditional.propertyInCouponModel] = [oAdditional.filterName];
        } else {
          oFilter[oAdditional.propertyInCouponModel].push(oAdditional.filterName);
        }
      });
    }
    
    this.setState(state => {
      if (state.searchInput) {
        return {
          filter: {
            searchText: state.searchInput,
            subFilters : oFilter
          }
        };
      }

      return { filter: {subFilters : oFilter} };
    });
  }

  handleCouponAdded() {
    let iMessageCount = this.state.messageCount;
    this.setState({
      showMessage: true,
      message: "Coupon added successfully!",  
      messageCount: ++iMessageCount
    });

    this.handleSearch();
  }

  showToast() {
    if (!this.state.showMessage) {
      return null;
    }
    return (
      <Toast
        messageCount={this.state.messageCount}
        message={this.state.message}
      />
    );
  }

  render() {
    return (
      <div>
        <Header
          searchInput={this.state.searchInput}
          onSearch={this.handleSearch}
          onFilterChange={this.handleFilterChange}
          onSubFiltersChange={this.handleSubFilterChange}
          onAddCouponFinish={this.handleCouponAdded}
        />
        <SearchContent
          fireSearch={this.state.fireSearch}
          filters={this.state.filter}
        />

        {this.showToast()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedSubFilter: state.userPreference.selectedSubFilter
  };
};


export default connect(mapStateToProps)(SearchPage);
