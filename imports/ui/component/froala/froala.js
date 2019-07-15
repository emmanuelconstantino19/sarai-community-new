import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Images } from '../../../api/images.js';
 
import './froala.html';

var editor;
Template.froala.rendered = function () { 
	
	editor = new FroalaEditor('.editor',{
    	height: 400,
    	//imageUploadURL: '/upload_image',
    	events: {
	      'image.beforeUpload': function (images) {
	        // Return false if you want to stop the image upload.
	      },
	      'image.uploaded': function (response) {
	      	console.log(response)
	        // Image was uploaded to the server.
	      },
	      'image.inserted': function ($img, response) {
	      	console.log($img)
	      	//$img[0].src = 'hehehe'
	      	//console.log(Images.findOne({}).link())
	      	
	      	//TRY CREATING AN API SERVER SIDE METHOD THAT WILL DO THE FOLLOWING CODE BELLOW
	      	Meteor.call('Images.upload', $img[0].src);
	      	

	      	//console.log($img[0].src)
	      	//console.log($img)
	        // Image was inserted in the editor.
	      },
	      'image.replaced': function ($img, response) {
	        // Image was replaced in the editor.
	      },
	  	}
  	});

};
export {editor};
/*Template.froala.events({
  'click #submit_froala'(event){
  	event.preventDefault();
  	 console.log(editor.html.get())
  },
})*/