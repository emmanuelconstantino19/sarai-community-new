import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Images } from '../../../api/images.js';
import { Pdf } from '../../../api/images.js';
 
import './card.html';

Template.card.helpers({
  bodyText(){
    return this.body.replace(/<[^>]*>/g, '').substring(0,120);
  },
  pdf() {
    return Pdf.findOne({_id:this.body})
  },
  image() {
    return Images.findOne({_id:this.thumbnail})
  },
  isOwner() {
    return this.owner === Meteor.userId();
  },
  isReviewer(){
    return Meteor.user().profile.role == 'reviewer'
  },
  isApproved() {
    if(this.status=='pending') return false
    return true
  },
  isPdf(){
    if(this.media=="pdf"){
      return true
    }
    return false
  }
});
 
Template.card.events({
  'click .card'(){
    console.log(this.hitCount)
    Meteor.call('tasks.updateCount', this._id, this.hitCount);
  },
  /*'click .toggle-checked'() {
    // Set the checked property to the opposite of its current value
    Meteor.call('tasks.setChecked', this._id, !this.checked);
  },
  'click .delete'() {
    Meteor.call('tasks.remove', this._id);
  },
  'click .toggle-private'() {
    Meteor.call('tasks.setPrivate', this._id, !this.private);
  },*/
});