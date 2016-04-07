var React = require('react');
var FriendStore = require('../../stores/FriendStore');
var FriendListItem = require('./FriendListItem.react');
var SearchBar = require('./SearchBar.react');
var FriendActionCreators = require('../../actions/FriendActionCreators'); 

function getInitialState() {
  return {
    friends: FriendStore.getAll(),
    loading: false
  };
}
/* return the list of FriendListItem with filter text.
  @param:
    - filterTexT: String  
    - friends : Array
*/
function getFilteredList(filterText,friends){
  var filteredList = friends.filter(function(friend){
      var name = friend.name.toLowerCase();
      return name.indexOf(filterText) !== -1;
    }).map(function(friend){
      return ( <FriendListItem
          key={friend.id}
          friend={friend}
        />)
    });
  return filteredList;
}

var FriendSection = React.createClass({

  getInitialState: function() {
    var state = getInitialState();
    state.filterText = '';
    return state;
  },

  componentDidMount: function() {
    FriendStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    FriendStore.removeChangeListener(this._onChange);
  },

  onSearchInput: function(filterText){
    this.setState({
      filterText : filterText,
      loading: true
    })
    FriendActionCreators.search(filterText);
  },

  render: function() {
    var content = '';
    if(!this.state.loading){
      var friendListItems = getFilteredList(this.state.filterText,this.state.friends);
      content = friendListItems.length > 0 ? friendListItems : <NoResultFound />;
    }else
       content = <div className="searching-indicator"><img src="images/loading_img.gif" className="loading-icon" />Searching...</div>
    return (
      <div style={this.props.style} className="friend-section">
        <SearchBar filterText={this.state.filterText} onSearchInput={this.onSearchInput} />
        <ul className="friend-list">
         {content}
        </ul>
      </div>
    );
  },

  /**
   * Event handler for 'change' events coming from the stores
   */
  _onChange: function() {
    this.setState(getInitialState());
  }

});

var NoResultFound = React.createClass({
  render: function(){
    return (
      <div className="no-result-found">
        No results found
      </div>
      );
  }
});

module.exports = FriendSection;
