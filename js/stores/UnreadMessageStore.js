var ChatAppDispatcher = require('../dispatcher/ChatAppDispatcher');
var ChatConstants = require('../constants/ChatConstants');
var EventEmitter = require('events').EventEmitter;
var MessageStore = require('../stores/MessageStore');
var ThreadStore = require('../stores/ThreadStore');
var assign = require('object-assign');

var ActionTypes = ChatConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var UnreadMessageStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getCount: function(threadID) {
    var threadMessages = MessageStore.getAllForThread(threadID);
    var unreadCount = 0;
    threadMessages.forEach(function(message){
      if(!message.isRead && message.authorName !== 'Bill') {
        unreadCount++
      }
    });
    return unreadCount;
  },

});

UnreadMessageStore.dispatchToken = ChatAppDispatcher.register(function(action) {
  ChatAppDispatcher.waitFor([
    ThreadStore.dispatchToken,
    MessageStore.dispatchToken
  ]);

  switch (action.type) {
    case ActionTypes.CLICK_THREAD:
      UnreadMessageStore.emitChange();
      break;

    case ActionTypes.RECEIVE_RAW_MESSAGES:
      UnreadMessageStore.emitChange();
      break;

    default:
      // do nothing
  }
});

module.exports = UnreadMessageStore;
