import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Tasks } from '../../../api/tasks.js';

import '../../component/task/task.js';
import '../../component/card/card.js';

import './public-landing.html';

Template.publicLanding.onCreated(() => {
  // We need to set a timeout here so that we don't redirect from inside a redirection
  //   which is a no-no in FR.
  /*Meteor.defer(() => {
    FlowRouter.go('Lists.show', Lists.findOne());
  });*/
});

Template.publicLanding.helpers({
  tasks(){
    Meteor.subscribe('tasks');
    return Tasks.find({status:'approved'}, { sort: { createdAt: -1 } });
  },
  ricetasks(){
    Meteor.subscribe('tasks');
    return Tasks.find({status:'approved',group:'rice'}, { sort: { createdAt: -1 } });
  },
  corntasks(){
    Meteor.subscribe('tasks');
    return Tasks.find({status:'approved',group:'corn'}, { sort: { createdAt: -1 } });
  },
  coffeetasks(){
    Meteor.subscribe('tasks');
    return Tasks.find({status:'approved',group:'coffee'}, { sort: { createdAt: -1 } });
  },
  cacaotasks(){
    Meteor.subscribe('tasks');
    return Tasks.find({status:'approved',group:'cacao'}, { sort: { createdAt: -1 } });
  },
  coconuttasks(){
    Meteor.subscribe('tasks');
    return Tasks.find({status:'approved',group:'coconut'}, { sort: { createdAt: -1 } });
  },
  bananatasks(){
    Meteor.subscribe('tasks');
    return Tasks.find({status:'approved',group:'banana'}, { sort: { createdAt: -1 } });
  },
  sugarcanetasks(){
    Meteor.subscribe('tasks');
    return Tasks.find({status:'approved',group:'sugarcane'}, { sort: { createdAt: -1 } });
  },
  soybeantasks(){
    Meteor.subscribe('tasks');
    return Tasks.find({status:'approved',group:'soybean'}, { sort: { createdAt: -1 } });
  },
  tomatotasks(){
    Meteor.subscribe('tasks');
    return Tasks.find({status:'approved',group:'tomato'}, { sort: { createdAt: -1 } });
  },
})
