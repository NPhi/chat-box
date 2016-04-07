var React = require('react');

var SearchBar = React.createClass({

  handleSearchInput(e){
    e.preventDefault();
    this.props.onSearchInput(e.target.value);
  },

  render: function() {
    return (
        <label className="search-bar-container">
        <input
           type="text" 
           className="search-bar" 
           placeholder="Search" 
           value={this.props.filterText}
           onChange={this.handleSearchInput}
            />
        </label>
    );
  }
});

module.exports = SearchBar;