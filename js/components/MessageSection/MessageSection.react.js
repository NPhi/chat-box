var MessageComposer = require('./MessageComposer.react');
var MessageListItem = require('./MessageListItem.react');
var MessageStore = require('../../stores/MessageStore');
var React = require('react');
var ThreadStore = require('../../stores/ThreadStore');
var FileButton = require('./FileButton.react');

function getStateFromStores() {
  return {
    messages: MessageStore.getAllForCurrentThread(),
    thread: ThreadStore.getCurrent()
  };
}

function getMessageListItem(message) {
  return (
    <MessageListItem
      key={message.id}
      message={message}
    />
  );
}

var MessageSection = React.createClass({

  getInitialState: function() {
    var state = getStateFromStores();
    state.typing = false;
    return state;
  },

  componentDidMount: function() {
    this._scrollToBottom();
    MessageStore.addChangeListener(this._onChange);
    ThreadStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    MessageStore.removeChangeListener(this._onChange);
    ThreadStore.removeChangeListener(this._onChange);
  },

  _onTyping: function(text){
    var typing = text.length > 0
    this.setState({
      typing : typing
    })
  },

  render: function() {
    console.log(this.props.style);
    var messageListItems = this.state.messages.map(getMessageListItem);
    var typingIndicator = this.state.typing ? <li className='message-list-item'><img src='images/typing_indicator.gif' /></li> : undefined;
    return (
      <div className="message-section" style={this.props.style}>
         <a id="details_toggle" onClick={this.props.handleFriendListAppear}><img src='images/toogle_defail.png' /></a>
        <h3 className="message-thread-heading">{this.state.thread.name}</h3>
        <ul className="message-list" ref="messageList">
          {messageListItems}
        {typingIndicator}

        </ul>
        <FileButton />
        <MessageComposer onTyping={this._onTyping} threadID={this.state.thread.id}/>
      </div>
    );
  },

  componentDidUpdate: function() {
    this._scrollToBottom();
  },

  _scrollToBottom: function() {
    var ul = this.refs.messageList.getDOMNode();
    ul.scrollTop = ul.scrollHeight;
  },

  /**
   * Event handler for 'change' events coming from the MessageStore
   */
  _onChange: function() {
    this.setState(getStateFromStores());
  }

});

module.exports = MessageSection;
