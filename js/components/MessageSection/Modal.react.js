var ReactTransitionGroup = require('react-addons-transition-group');
var React = require('react');
var ReactDOM = require('react-dom');
var JQuery = require('jquery');

var Modal = React.createClass({
	 render: function() {
        if(this.props.isOpen){
            return (
              <ReactTransitionGroup>
                <Backdrop /> 
                <ModalDialog>{this.props.children}</ModalDialog>            
              </ReactTransitionGroup>
            );
        } else {
            return <ReactTransitionGroup />;
        }
    }
});


var ModalDialog = React.createClass({

  componentWillEnter(callback){
    JQuery(".file-upload-modal").animate({
      top: "30%",
      opacity: 1,
    }, 250, callback);
  },

  componentWillLeave(callback){
    JQuery(".file-upload-modal").animate({
      top: "-20%",
      opacity: 0.01,
    }, 250, callback);
  },

  render: function(){
      return (
        <div className="file-upload-modal">
          {this.props.children}
        </div>
      );
  },
})

var Backdrop = React.createClass({

  componentWillEnter (callback) {
    JQuery(".file-upload-backdrop").animate({
      opacity: 0.5,
    }, 100, callback);
  },
  componentWillLeave (callback) {
    JQuery(".file-upload-backdrop").animate({
      opacity:0,
    }, 100, callback);
  },

  render: function(){
    return <div className="file-upload-backdrop" />
  }

})

module.exports = Modal;