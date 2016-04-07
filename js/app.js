// This file bootstraps the entire application.

var ChatApp = require('./components/ChatApp.react');
var ChatExampleData = require('./ChatExampleData');
var ChatWebAPIUtils = require('./utils/ChatWebAPIUtils');
var ReactDOM = require('react-dom');
var React = require('react');

ChatExampleData.init(); // load example data into localstorage

ChatWebAPIUtils.getAllMessages();
ChatWebAPIUtils.getAllFriends();

ReactDOM.render(
    <ChatApp />,
    document.getElementById('react')
);
