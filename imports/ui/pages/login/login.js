import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './login.html';

Template.login.onCreated(() => {
  // We need to set a timeout here so that we don't redirect from inside a redirection
  //   which is a no-no in FR.
  /*Meteor.defer(() => {
    FlowRouter.go('Lists.show', Lists.findOne());
  });*/
});

Template.login.events({
    'submit form': function(event){
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        Meteor.loginWithPassword(email, password, function(error){
		    if(error){
		        console.log(error.reason);
		    } else {
		        FlowRouter.go("/profile");
		    }
		});
    }
});