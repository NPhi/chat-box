var React = require('react');
var spring = require('react-motion').spring;
var Motion = require('react-motion').Motion;

var TestMotion = React.createClass({

		getInitialState() {
    return {open: false};
	  },

	  handleMouseDown() {
	    this.setState({open: !this.state.open});
	  },

	  handleTouchStart(e) {
	    e.preventDefault();
	    this.handleMouseDown();
	  },

	  render() {

	    return (
	      <div>
	        <button
	          onMouseDown={this.handleMouseDown}
	          onTouchStart={this.handleTouchStart}>
	          Toggle
	        </button>
	        <Motion defaultStyle={{x: 0}} style={{x: spring(this.state.open ? 400 : 0)}}>
			  {function(value) {
			  			var style = {
	        				transform: `translate3d(${value.x}px, 0, 0)`
	        			}
	        			return (
	        				<Nested style={style} />
	        			)}}
			</Motion>
	      </div>
	    );
	  },

});

var Nested = React.createClass({
	render : function(){
		return (
			<div className="demo0-block" style={this.props.style}>
	        					1
	        				</div>
	       )
	}
})

module.exports = TestMotion;