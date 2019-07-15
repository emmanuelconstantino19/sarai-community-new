import { Template }    from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session'
import { Images } from '../../../api/images.js';
import { Pdf } from '../../../api/images.js';

import './upload.html';

Template.uploadForm.onCreated(function () {
  this.currentUpload = new ReactiveVar(false);
  this.uploadedImage = new ReactiveVar(0);
});

Template.uploadForm.helpers({
  currentUpload() {
    return Template.instance().currentUpload.get();
  },
  imageFile: function () {
    return Images.findOne();
  },
  uploadedImage: function () {
    return Images.findOne({_id:Template.instance().uploadedImage.get()});
  }
});

Template.uploadForm.events({
  'change #fileInput'(e, template) {
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      // We upload only one file, in case
      // multiple files were selected
      const upload = Images.insert({
        file: e.currentTarget.files[0],
        streams: 'dynamic',
        chunkSize: 'dynamic'
      }, false);

      upload.on('start', function () {
        template.currentUpload.set(this);
      });

      upload.on('end', function (error, fileObj) {
        if (error) {
          //alert('Error during upload: ' + error);
        } else {
          //alert('File "' + fileObj.name + '" successfully uploaded');
          Session.set('thumbnail', fileObj._id);
          template.uploadedImage.set(fileObj._id)
        }
        template.currentUpload.set(false);
      });

      upload.start();
    }
  }
});





//START OF UPLOAD PDF


Template.uploadFormPdf.onCreated(function () {
  this.currentUpload = new ReactiveVar(false);
  this.uploadedPdf = new ReactiveVar(0);
});

Template.uploadFormPdf.helpers({
  currentUpload() {
    return Template.instance().currentUpload.get();
  },
  uploadedPdf: function(){
    return Pdf.findOne({_id:Template.instance().uploadedPdf.get()});
  },
  /*imageFile: function () {
    return Images.findOne();
  },
  /*uploadedImage: function () {
    return Images.findOne({_id:Template.instance().uploadedImage.get()});
  }*/
});

Template.uploadFormPdf.events({
  'change #fileInput'(e, template) {
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      // We upload only one file, in case
      // multiple files were selected
      const upload = Pdf.insert({
        file: e.currentTarget.files[0],
        streams: 'dynamic',
        chunkSize: 'dynamic'
      }, false);

      upload.on('start', function () {
        template.currentUpload.set(this);
      });

      upload.on('end', function (error, fileObj) {
        if (error) {
          //alert('Error during upload: ' + error);
        } else {
          //alert('File "' + fileObj.name + '" successfully uploaded');
          Session.set('pdf', fileObj._id);
          template.uploadedPdf.set(fileObj._id)
        }
        template.currentUpload.set(false);
      });

      upload.start();
    }
  }
});
