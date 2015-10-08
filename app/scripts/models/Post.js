export default Backbone.Model.extend({
  defaults: function(){
    return {
      message: "[no message]",
      username: "[no username]",
      createdAt: Date.now(),
    };
  }
});
