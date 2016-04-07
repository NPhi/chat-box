var React = require('react');

var FriendListItem = React.createClass({

  render: function() {
   var friend = this.props.friend;
   var onlineImg = 'images/' + (friend.online ? 'online_icon.png' : 'offline_icon.png');
    return (
      <li className="friend-list-item">
          <img className="online-icon" src={onlineImg} /> {friend.name}
      </li>
    );
  },

});

module.exports = FriendListItem;
