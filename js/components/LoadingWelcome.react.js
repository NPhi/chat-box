var React = require('react');

var LoadingWelcome = React.createClass({

  render: function() {
    return (
      <div className="loading_welcome">
        <img src="images/loading_img.gif" />
      </div>
    );
  }

});

module.exports = LoadingWelcome;
