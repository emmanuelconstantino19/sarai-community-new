import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Tasks = new Mongo.Collection('tasks');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('tasks', function tasksPublication() {
    return Tasks.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    });
  });
}

Meteor.methods({
  'tasks.insert'(group, title, body, tags, author, thumbnail, media) {
    check(title, String);
    check(group, String);
 
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    var today = new Date();
    var months = ['January','February','March','April','May','June','July','August','September','October','November','December']
    var date = months[today.getMonth()]+' '+today.getDate()+','+today.getFullYear();
 
    Tasks.insert({
      group,
      title,
      body,
      tags,
      createdAt: date,
      owner: Meteor.userId(),
      username: Meteor.user().username,
      status:'pending',
      author,
      thumbnail, 
      media,
      hitCount: 0,
    });
  },
  'tasks.remove'(taskId) {
    check(taskId, String);

    const task = Tasks.findOne(taskId);
    if (task.owner !== Meteor.userId()) {
      // If the task is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }
 
    Tasks.remove(taskId);
  },
  'tasks.setChecked'(taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);
 	
    const task = Tasks.findOne(taskId);
    if (task.owner !== Meteor.userId()) {
      // If the task is private, make sure only the owner can check it off
      throw new Meteor.Error('not-authorized');
    }

    Tasks.update(taskId, { $set: { checked: setChecked } });
  },
  'tasks.setPrivate'(taskId, setToPrivate) {
    check(taskId, String);
    check(setToPrivate, Boolean);
 
    const task = Tasks.findOne(taskId);
 
    // Make sure only the task owner can make a task private
    if (task.owner !== Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
 
    Tasks.update(taskId, { $set: { private: setToPrivate } });
  },
  'tasks.setApprove'(taskId){
    check(taskId, String);

    const task = Tasks.findOne(taskId);
    var name = Meteor.user().profile.lastname.toUpperCase() + ', ' + Meteor.user().profile.firstname;
    //const approvedBy = Meteor.user().profile.lastname.toUpperCase() + ', ' + Meteor.user().profile.firstname;

    if (!(Meteor.user().profile.role=='reviewer' || Meteor.user().profile.role=='site admin')) {
      throw new Meteor.Error('not-authorized');
    }

    Tasks.update(taskId, { $set: { status: "approved", approvedBy: name} });
  },
  'tasks.updateCount'(id,count){
    /*if (! Meteor.userId()) {
        throw new Meteor.Error('not-authorized');
      }*/
      Tasks.update({ _id: id}, {
        $set:{
          hitCount:  count+1,
        }
      });
  },
});