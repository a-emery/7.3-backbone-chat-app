import CreatePost from 'views/Create';
import CollectionView from 'views/CollectionView';
import PostsListItem from 'views/PostsListItem';


var PostsCollectionView = CollectionView.extend({
  tagName: 'ul',
  className: 'postsList',
  ItemViewConstructor: PostsListItem
});

var PostsIndexView = Backbone.View.extend({

  initialize: function(){
    this.createPost = new CreatePost({
      collection: this.collection
    });

    this.postsCollectionView = new PostsCollectionView({
      collection: this.collection
    });

    // var time = setInterval(() => {
    //   console.log(this.posts);
    //   this.posts.fetch();
    // }, 10000);

  },

  render: function(){
    this.$el.html(this.createPost.render().el);
    this.$el.append(this.postsCollectionView.render().el);
    return this;
  },

  remove: function() {
    this.postsCollectionView.remove();
    this.createPost.remove();
    Backbone.View.prototype.remove.apply(this, arguments);
  }

});

export default PostsIndexView;
