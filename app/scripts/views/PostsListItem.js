var PostsListItem = Backbone.View.extend({

  tagName: 'li',

  className: 'postListItem',

  template: JST.postsListItem,

  render: function(){
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }

});

export default PostsListItem;
