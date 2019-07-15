import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Tags = new Mongo.Collection('tags');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('tags', function tasksPublication() {
    return Tags.find({});
  });
}

Meteor.methods({
  'tags.insert'(tagTitle) {
    check(tagTitle, String);
 
    // Make sure the user is logged in before inserting a task
    /*if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }*/
 
    Tags.insert({
      tagTitle,
    });
  },
});