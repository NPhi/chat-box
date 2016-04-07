var MessageSection = require('./MessageSection/MessageSection.react');
var React = require('react');
var ThreadSection = require('./ThreadSection/ThreadSection.react');
var LoadingWelcome = require('./LoadingWelcome.react');
var FriendSection = require('./FriendSection/FriendSection.react');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');


var ChatApp = React.createClass({

	getInitialState: function(){
		return {
			loading : true,
			hideFriendList : false
		}
	},

	componentDidMount: function(){
		var that = this;
		//stimulate the permisstic welcome
		setTimeout(function(){
			that.setState({loading:false});
		}, 2000);
	},

	handleFriendListAppear(){
		this.setState({hideFriendList : !this.state.hideFriendList})
	},

  	render: function() {
  	if(this.state.loading){
  		return (
       			<LoadingWelcome />
  		)
  	}else{
  		var messageSectionStyle = {width: (!this.state.hideFriendList ? '47.5%' : '67.5%')};
  		var friendSectionStyle = this.state.hideFriendList ? {width : 0} : {};
  		 return (
	      <div className="chatapp">
	      	<ReactCSSTransitionGroup transitionName="react-transition" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={500} transitionLeaveTimeout={300}>
	       		 <ThreadSection />
	       		 <MessageSection style={messageSectionStyle} handleFriendListAppear={this.handleFriendListAppear} />
	       		<FriendSection style={friendSectionStyle} />
	        </ReactCSSTransitionGroup>
	      </div>
	    );
  	}

   
  }

});

module.exports = ChatApp;
