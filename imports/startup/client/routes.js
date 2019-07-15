import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
//import {Tasks} from '../../api/tasks.js';

// Import to load these templates
//import '../../ui/layouts/app-body.js';
import '../../ui/pages/public-landing/public-landing.js';
import '../../ui/pages/profile/profile.js';
import '../../ui/pages/register/register.js';
import '../../ui/pages/post/post.js';
import '../../ui/pages/login/login.js';
import '../../ui/layout/app-body.js';



//import '../../ui/pages/lists-show-page.js';
//import '../../ui/pages/app-not-found.js';

// Import to override accounts templates
//import '../../ui/accounts/accounts-templates.js';

/*FlowRouter.route('/lists/:_id', {
  name: 'Lists.show',
  action() {
    BlazeLayout.render('App_body', { main: 'Lists_show_page' });
  },
});*/

FlowRouter.route('/', {
  name: 'landing',
  action() {
    BlazeLayout.render('App_body', { main: 'publicLanding' });
    //BlazeLayout.setRoot('body');
  },
});

FlowRouter.route('/profile', {
  name: 'profile',
  action() {
    BlazeLayout.render('App_body', {main: 'profile'});
  },
});

FlowRouter.route('/post', {
  name: 'post',
  action(params, queryParams) {
    //console.log("Params:", params);
    //Meteor.subscribe('tasks');
    //console.log(queryParams.id);
    //var post = Tasks.find({_id: queryParams.id});
    //console.log(post)
    BlazeLayout.render('App_body', {main: 'post'});
  },
});

FlowRouter.route('/register', {
  name: 'register',
  action() {
    BlazeLayout.render('register');
  },
});

FlowRouter.route('/login', {
  name: 'login',
  action() {
    BlazeLayout.render('login');
  },
});

// the App_notFound template is used for unknown routes and missing lists
/*FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_body', { main: 'App_notFound' });
  },
};*/
