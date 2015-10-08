import Post from 'models/Post';

export default Backbone.Collection.extend({
  model: Post,
  url: 'http://tiny-lasagna-server.herokuapp.com/collections/messagess',
  comparator: 'createdAt'
});
