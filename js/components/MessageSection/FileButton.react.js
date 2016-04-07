var ChatMessageActionCreators = require('../../actions/ChatMessageActionCreators');
var React = require('react');
var classNames = require('classnames');
var FileMenu = require('./FileMenu.react');
var Modal = require('./Modal.react');
var FileUploadDialog = require('./FileUploadDialog.react');

var FileButton = React.createClass({

	getInitialState: function(){
		return {
			clicked : false,
			isModalOpen : false,
			filename : '',
		}
	},

	handleClick: function(){
		this.setState({
			clicked : !this.state.clicked
		})
	},
	//execute the file input click event
	uploadFile: function(){
		this.refs.fileElement.click();
		//close the menu after loading the file input
		this.handleClick();
	},

	handleOnFilesUploaded: function(e){
		var filename = this.refs.fileElement.files[0].name;
		this.setState({filename: filename});
		this.openModal();
	},

	openModal: function(){
		this.setState({isModalOpen : true});
	},

	closeModal: function(){
		this.setState({isModalOpen : false});
		this.refs.fileElement.value = '';
	},

  	render: function(){

  	return (
  		<div>
  		   	 <OverlayTrigger className="file_button" isOpened={this.state.clicked} overlay={<FileMenu  uploadFile={this.uploadFile} />}>
  				<span   onClick={this.handleClick} className={classNames({
						'glyphicon glyphicon-plus primary_file_button': true,
						'active': this.state.clicked })} />

    		 </OverlayTrigger>
	  		<input className="offscreen" ref="fileElement" type="file" multiple={true} onChange={this.handleOnFilesUploaded} />
			<Modal isOpen={this.state.isModalOpen} >
              	 <FileUploadDialog filename={this.state.filename} closeModal={this.closeModal} />
            </Modal>
  		</div>
  	)
  }

});

var OverlayTrigger = React.createClass({
	render: function(){
		var _overlay = this.props.isOpened ? this.props.overlay : undefined;
		return(
			<div className={this.props.className}>
				{_overlay}
				{this.props.children}
			</div>
		)
	}
});


module.exports = FileButton;
