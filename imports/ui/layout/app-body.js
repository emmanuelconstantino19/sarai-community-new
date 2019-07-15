import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import './app-body.html';

Template.App_body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});
 
Template.App_body.helpers({
	firstName(){
		return Meteor.user().profile.firstname;
	},
});

Template.App_body.events({
  'click .logout': function(event){
      event.preventDefault();
      Meteor.logout();
      FlowRouter.go('/');
  },
});