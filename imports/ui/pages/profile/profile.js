import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router'; 
import { Tasks } from '../../../api/tasks.js';
import { Tags } from '../../../api/tags.js';
import { Session } from 'meteor/session'
import { Images } from '../../../api/images.js';
import { Users } from '../../../api/userlist.js';
 
import '../../component/task/task.js';
import '../../component/tag/tag.js';
import '../../component/upload/upload.js';
import '../../component/user/user.js';
import {editor} from '../../component/froala/froala.js';

import './profile.html';

Template.profile.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});

Template.profile.onRendered(() => {
  console.log("Profile")
  $('#pdf').hide();
});

Template.profile.helpers({
  authorsList(){
    Meteor.subscribe("userList");
    return Meteor.users.find({ "profile.role":"author" });
  },
  reviewersList(){
    Meteor.subscribe("userList");
    return Meteor.users.find({ "profile.role":"reviewer" });
  },
  subscribersList(){
    Meteor.subscribe("userList");
    return Meteor.users.find({ "profile.role":"subscriber" });
  },
  firstName(){
    return Meteor.user().profile.firstname;
  },
  lastName(){
    return Meteor.user().profile.lastname;
  },
  picture(){
    return Images.findOne({_id:Meteor.user().profile.picture})
  },
  pendingTasks(){
    Meteor.subscribe('tasks');
    return Tasks.find({status:'pending', group: Meteor.user().profile.group}, { sort: { createdAt: -1 } });
  },
  pendingTasksAdmin(){
    Meteor.subscribe('tasks');
    return Tasks.find({status:'pending'}, { sort: { createdAt: -1 } });
  },
  approvedTasks(){
    Meteor.subscribe('tasks');
    return Tasks.find({status:'approved', group: Meteor.user().profile.group}, { sort: { createdAt: -1 } });
  },
  approvedTasksAdmin(){
    Meteor.subscribe('tasks');
    return Tasks.find({status:'approved'}, { sort: { createdAt: -1 } });
  },
  fullname(){
  	return Meteor.user().profile.lastname.toUpperCase() + ', ' + Meteor.user().profile.firstname
  },
  role(){
  	return Meteor.user().profile.role;
  },
  group(){
    return Meteor.user().profile.group;
  },
  pendingTasksOwned() {
    Meteor.subscribe('tasks');
    return Tasks.find({owner: Meteor.user()._id,status:'pending'}, { sort: { createdAt: -1 } });
  },
  approvedTasksOwned() {
    Meteor.subscribe('tasks');
    return Tasks.find({owner: Meteor.user()._id,status:'approved'}, { sort: { createdAt: -1 } });
  },
  tags() {
    Meteor.subscribe('tags');
    // Otherwise, return all of the tags
    return Tags.find({},{ sort: { tagTitle: 1 } });
  },
  canManagePosts(){
  	return Meteor.user().profile.role == 'site admin' || Meteor.user().profile.role == 'reviewer'
  },
  canManageUsers(){
    return Meteor.user().profile.role === 'site admin'
  },
  canPost(){
    return Meteor.user().profile.role != 'subscriber'
  },
  isReviewer(){
    return Meteor.user().profile.role == 'reviewer'
  },
});


Template.profile.events({
  'click #edit_submit'(event){
    event.preventDefault();
    console.log('edit picture')
    var user = Meteor.user().profile
    user['picture']=Session.get('thumbnail')
    //const profile_picture = Session.get('thumbnail');
    //Meteor.user().profile.picture = Session.get('thumbnail')
    console.log(user)
    if(Session.get('thumbnail')!=null){
      Meteor.users.update({ _id: Meteor.user()._id }, {
        $set:{
          profile:  user,
        }
      });
    } 
    $('.thumbnail').attr('src', '');
    Session.set('thumbnail',null)
  }, 
  'click #task_submit'(event) {
    // Prevent default browser form submit
    event.preventDefault();
 
    // Get value from form element
    const title = $('#title').val();
    const group = $( "#group" ).val().toLowerCase();
    const author = Meteor.user().profile.lastname.toUpperCase() + ', ' + Meteor.user().profile.firstname;
    const thumbnail = Session.get('thumbnail');
    const media = $('#media').val();

    const body = (media=="article") ? editor.html.get() : Session.get('pdf');

    /*var filtered = desc.filter(function (el) {
  	  return el != "";
  	});*/

    var sList = [];
    $('#tags_list input[type=checkbox]').each(function () {
        if(this.checked){
          sList.push($(this).val());
          $(this).prop("checked", false);
        }
        //sList += "(" + $(this).val() + "-" + (this.checked ? "checked" : "not checked") + ")";
    });
 
    // Insert a task into the collection
    Meteor.call('tasks.insert', group, title, body, sList, author, thumbnail, media);
 
    // Clear form
    $('#title').val('')
    $('#desc').val('')
    $( "#group" ).val('Rice');
    $('.thumbnail').attr('src', '');
    editor.html.set()
    Session.set('thumbnail',null)
  },
  'click #tag_submit'(event){
    event.preventDefault();
    const tagTitle = $('#new_tag').val().toLowerCase();
    Meteor.call('tags.insert', tagTitle);
    $('#new_tag').val('');
  },
  'change .hide-completed input'(event, instance) {
    instance.state.set('hideCompleted', event.target.checked);
  },
  'change #media'(){
    console.log($('#media').val())
    if($('#media').val()=="article"){
      $('#article').show();
      $('#pdf').hide();
    }else if($('#media').val()=="pdf"){
      $('#article').hide();
      $('#pdf').show();
    }
  }
});