import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './register.html';

Template.register.onCreated(() => {
  // We need to set a timeout here so that we don't redirect from inside a redirection
  //   which is a no-no in FR.
  /*Meteor.defer(() => {
    FlowRouter.go('Lists.show', Lists.findOne());
  });*/
});

Template.register.onRendered(() => {
  // We need to set a timeout here so that we don't redirect from inside a redirection
  //   which is a no-no in FR.
  /*Meteor.defer(() => {
    FlowRouter.go('Lists.show', Lists.findOne());
  });*/
  $( "#groupform" ).hide()
});

Template.register.events({
    'submit form': function(event){
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        var fname = $('[name=fname]').val();
        var lname = $('[name=lname]').val();
        //var role = $('#role').val();
        //var group = (role == "reviewer") ? $('[name=group]').val() : null; 
          Accounts.createUser({
  		    email: email,
  		    password: password,
          profile: {
              firstname: fname,
              lastname: lname,
              role: 'subscriber',
              //group: group
            },
      		}, function(error){
      		    if(error){
      		        console.log(error.reason); // Output error if registration fails
      		    } else {
      		        FlowRouter.go('/profile')
      		    }
      		});

    },
    'change #role'(event){
      if($( "#role" ).val()=="author"){
        $( "#groupform" ).hide()
      }else if($( "#role" ).val()=="reviewer"){
        $( "#groupform" ).show()
      }
    },
});