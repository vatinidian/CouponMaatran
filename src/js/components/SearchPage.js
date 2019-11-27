import React from "react";
import axios from "axios";
import Header from "./Header";
import SearchContent from "./SearchContent";
import Toast from "./Toast";

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
  }

  handleFilterChange(sFielName, sValue) {
    this.setState({ fireSearch: false });
    this.setState({ [sFielName]: sValue });
  }

  handleSearch() {
    this.setState({
      fireSearch: true
    });
    
    this.setState(state => {
      if (state.searchInput) {
        return {
          filter: {
            searchText: state.searchInput
          }
        };
      }

      return { filter: {} };
    });
  }

  handleCouponAdded() {
    this.setState({
      showMessage: true,
      message: "Coupon added successfully!",  
      messageCount: ++this.state.messageCount
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

export default SearchPage;
