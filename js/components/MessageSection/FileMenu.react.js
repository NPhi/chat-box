var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var React = require('react');


var FileMenu = React.createClass({

	handleOnClick: function(){
		this.props.uploadFile();
	},

	render: function(){
		return(
		 <ReactCSSTransitionGroup transitionName="react-transition" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={500} transitionLeaveTimeout={300}>
			<div className="menu file_menu">
				<div className="popover_mask"></div>
				<ul className="menu_content">
					<li className='file_menu_item' onClick={this.handleOnClick} >Upload File</li>
				</ul>
			</div>
		</ReactCSSTransitionGroup>
		);
	}
});

module.exports = FileMenu;