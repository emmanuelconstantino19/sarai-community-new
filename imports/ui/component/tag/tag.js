import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
 
import './tag.html';

Template.tag.helpers({
  isOwner() {
    return this.owner === Meteor.userId();
  },
});
 
Template.tag.events({
});
