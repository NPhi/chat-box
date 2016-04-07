var ChatAppDispatcher = require('../dispatcher/ChatAppDispatcher');
var ChatConstants = require('../constants/ChatConstants');

var ActionTypes = ChatConstants.ActionTypes;

module.exports = {

  search: function(filterText) {

  	//simulate searching on the server
  	setTimeout(function(){
		ChatAppDispatcher.dispatch({
	      type: ActionTypes.RECEIVE_FILTERED_FRIEND,
	      filterText: filterText
   		 });
	}, 1000);
   
  }

};
