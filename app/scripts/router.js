import PostsIndex from 'views/PostsIndex';
import BlogPosts from 'models/BlogPosts';
import CreateUsername from 'views/CreateUsername';

export default Backbone.Router.extend({

  routes: {
    '': 'createUsername',
    'index': 'index'
  },

  initialize: function(){
    $('#container').html(JST.application);
    this.posts = new BlogPosts();
    this.posts.fetch();
  },

  createUsername: function(){
    var view = new CreateUsername();
    this.showView(view);
  },

  index: function(){
    var view = new PostsIndex({collection: this.posts});
    this.posts.fetch();
    this.showView(view);
  },


  /*
  * Helper functions
  */

  showView: function(view) {
    if(this.currentView) this.currentView.remove();
    this.currentView = view;
    $('#container').html(view.render().el);
    return view;
  }

});
