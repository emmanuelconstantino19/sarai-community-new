import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
 
import './user.html';

Template.user.helpers({
  isOwner() {
    return this.owner === Meteor.userId();
  },
  isSelected(role, option) {
  	if(option.hash.role_select==role)
    	return "selected";
  },
  isGroupSelected(group, option) {
  	console.log(group)
  	if(group==null && option.hash.group_select=="select"){
  		return "selected"
  	}
  	else if(option.hash.group_select==group){
    	return "selected";
  	}
  },
  isReviewer(role) {
    return role == "reviewer";
  },
  isSubscriber(role) {
    return role == "subscriber";
  },
});
 
Template.user.events({
	'click .role-select'(e, t){
		Meteor.call('users.setRole', this._id, $(e.target).val(), this.profile);
	},
	'click .group-select'(e, t){
		Meteor.call('users.setGroup', this._id, $(e.target).val(), this.profile);
	}
});
