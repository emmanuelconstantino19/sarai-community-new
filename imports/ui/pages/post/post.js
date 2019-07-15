import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Tasks } from '../../../api/tasks.js';


import './post.html';

Template.post.onCreated(() => {
  // We need to set a timeout here so that we don't redirect from inside a redirection
  //   which is a no-no in FR.
  /*Meteor.defer(() => {
    FlowRouter.go('Lists.show', Lists.findOne());
  });*/
});
Template.post.onRendered(() => {
  // We need to set a timeout here so that we don't redirect from inside a redirection
  //   which is a no-no in FR.
  /*Meteor.defer(() => {
    FlowRouter.go('Lists.show', Lists.findOne());
  });*/
  console.log(FlowRouter.getQueryParam("id"))

});

Template.post.helpers({
  task_post(){
    Meteor.subscribe('tasks');
    console.log(Tasks.find({_id:FlowRouter.getQueryParam("id")}))
    return Tasks.findOne({_id:FlowRouter.getQueryParam("id")});
  },
  processed_body(body){
    return body
  },
})

Template.post.events({

});