import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';


if (Meteor.isServer) {
  // This code only runs on the server
	Meteor.publish("userList", function () {
  		return Meteor.users.find({});
	});
}

Meteor.methods({
	'users.setRole'(id,role, profile){
		if (! Meteor.userId()) {
	      throw new Meteor.Error('not-authorized');
	    }
	    profile.role = role
	    Meteor.users.update({ _id: id}, {
        $set:{
          profile:  profile,
        }
      });
	},

	'users.setGroup'(id,group, profile){
		if (! Meteor.userId()) {
	      throw new Meteor.Error('not-authorized');
	    }
	    profile.group = group
	    Meteor.users.update({ _id: id}, {
        $set:{
          profile:  profile,
        }
      });
	},

});