var ChatAppDispatcher = require('../dispatcher/ChatAppDispatcher');
var ChatConstants = require('../constants/ChatConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = ChatConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _friends = {};

var FriendStore = assign({}, EventEmitter.prototype, {

  init: function(rawFriends){
    rawFriends.forEach( function(friend){
        _friends[friend.id] = {
          id: friend.id,
          name: friend.username,
          online: friend.online,
        };
    });
  },

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

  getAll: function(){
   var friends = [];
   for(var f in _friends){
    friends.push(_friends[f]);
   }
   return friends;
  },

});

FriendStore.dispatchToken = ChatAppDispatcher.register(function(action) {

  switch (action.type) {
    case ActionTypes.RECEIVE_RAW_FRIENDS:
      FriendStore.init(action.rawFriends);
      FriendStore.emitChange();
      break;
    case ActionTypes.RECEIVE_FILTERED_FRIEND:

     FriendStore.emitChange();
      break;
    default:
      // do nothing
  }
});

module.exports = FriendStore;
