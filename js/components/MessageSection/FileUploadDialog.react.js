var React = require('react');

var FileUploadDialog = React.createClass({

	handleUpload: function(){
		this.props.closeModal();
	},

	render: function(){
		return (
			<div className="upload-dialog">
	              <div className="modal-header">
	              <button className="close" onClick={this.props.closeModal}>×</button>
	              <h3>Upload a file?</h3>
	              </div>
	              <div className="modal-body">
	                <p><label>Title: </label>{this.props.filename}</p>
	              </div>
	              <div className="modal-footer">
	              	<a className="upload-btn" onClick={this.handleUpload}>Upload</a>
	              </div>
	              
             </div>
		)
	}

});

module.exports = FileUploadDialog;