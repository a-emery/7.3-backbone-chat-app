export default Backbone.View.extend({

  template: JST.create,

  tagName: 'form',

  className: 'createView',

  events: {
    'submit': 'submitMessage'
  },

  render: function(){
    this.$el.html(this.template());
    return this;
  },

  submitMessage: function(e){
    e.preventDefault();
    if (!window.username) {
      window.username = prompt("Please enter a username");
    }
    this.collection.create({
      username: window.username,
      message: $('.js-message').val()
    });
    $('.js-username').val('');
    $('.js-message').val('');
  },

});
