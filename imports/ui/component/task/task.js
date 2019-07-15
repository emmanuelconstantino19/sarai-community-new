import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
 
import './task.html';

Template.task.helpers({
  status() {
    return this.status.toUpperCase()
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
});
 
Template.taskEditor.events({
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
  'click .approve'() {
    Meteor.call('tasks.setApprove', this._id);
  },
  'click .edit'() {
    
    //Meteor.call('tasks.setPrivate', this._id, !this.private);
  },
});


Template.taskEditor.helpers({
  status() {
    return this.status.toUpperCase()
  },
  isOwner() {
    return this.owner === Meteor.userId();
  },
  isReviewer(){
    return Meteor.user().profile.role == 'reviewer'
  },
});