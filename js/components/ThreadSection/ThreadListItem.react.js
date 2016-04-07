var ChatThreadActionCreators = require('../../actions/ChatThreadActionCreators');
var React = require('react');
var classNames = require('classnames');
var UnreadMessageStore = require('../../stores/UnreadMessageStore');

function getStatesFromStores(threadID){
  return {
    unreadCount : UnreadMessageStore.getCount(threadID)
  }
}


var ReactPropTypes = React.PropTypes;

var ThreadListItem = React.createClass({

  getInitialState: function(){
    return getStatesFromStores(this.props.thread.id);
  },

  componentDidMount: function() {
    UnreadMessageStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    UnreadMessageStore.removeChangeListener(this._onChange);
  },

  propTypes: {
    thread: ReactPropTypes.object,
    currentThreadID: ReactPropTypes.string
  },

  render: function() {
    var thread = this.props.thread;
    var lastMessage = thread.lastMessage;
    let unreadCount = this.state.unreadCount ? <div className="unread-count-box">{this.state.unreadCount}</div> : undefined;
    return (
      <li
        className={classNames({
          'thread-list-item': true,
          'active': thread.id === this.props.currentThreadID
        })}
        onClick={this._onClick}>
        {unreadCount}
        <h5 className="thread-name">{thread.name}</h5>
        <div className="thread-time">
          {lastMessage.date.toLocaleTimeString()}
        </div>
        <div className="thread-last-message">
          {lastMessage.text}
        </div>
      </li>
    );
  },

  _onClick: function() {
    ChatThreadActionCreators.clickThread(this.props.thread.id);
  },
  /**
   * Event handler for 'change' events coming from the MessageStore
   */
  _onChange: function() {
    this.setState(getStatesFromStores(this.props.thread.id));
  }

});


module.exports = ThreadListItem;
