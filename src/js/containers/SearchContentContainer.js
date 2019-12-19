import { connect } from "react-redux";
import SearchContentContainer from "../components/SearchContent";

const mapStateToProps = state => {
    return {
      searchInput: state.userPreference.searchInput,
      fireSearch: state.userPreference.fireSearch,
      selectedSubFilter: state.userPreference.selectedSubFilter
    };
  };
  

export default connect(mapStateToProps)(SearchContentContainer);
