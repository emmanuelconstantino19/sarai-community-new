import { Meteor } from 'meteor/meteor';
import { FilesCollection } from 'meteor/ostrio:files';

const Images = new FilesCollection({
  collectionName: 'Images',
  storagePath: '/data/Meteor/uploads',
  allowClientCode: false, // Disallow remove files from Client
  onBeforeUpload(file) {
    // Allow upload files under 10MB, and only in png/jpg/jpeg formats
    if (file.size <= 10485760 && /png|jpg|jpeg/i.test(file.extension)) {
      return true;
    }
    return 'Please upload image, with size equal or less than 10MB';
  }
});

const Pdf = new FilesCollection({
  collectionName: 'Pdf',
  allowClientCode: false, // Disallow remove files from Client
  onBeforeUpload(file) {
    // Allow upload files under 10MB, and only in png/jpg/jpeg formats
    if (/pdf/i.test(file.extension)) {
      return true;
    }
    return 'Please upload pdf file';
  }
});

if (Meteor.isClient) {
  Meteor.subscribe('files.images.all');
  Meteor.subscribe('files.pdf.all');
}

if (Meteor.isServer) {
  Meteor.publish('files.images.all', function () {
    return Images.find().cursor;
  });
  Meteor.publish('files.pdf.all', function () {
    return Pdf.find().cursor;
  });

  Meteor.methods({
  'Images.upload'(source) {
    console.log(source)
    /*Images.load(source, {
      //fileName: 'logo.png',
      //fileId: 'abc123myId', //optional
      //meta: {}
    });*/
  },
});

}



export { Images };
export { Pdf };

/*
import { FilesCollection } from 'meteor/ostrio:files';
const Images = new FilesCollection({
          storagePath: '/data/Meteor/uploads',
          collectionName: 'Images'
});
export default Images; // To be imported in other files
*/