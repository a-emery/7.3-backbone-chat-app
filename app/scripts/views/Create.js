export default Backbone.View.extend({

  template: JST.create,

  tagName: 'form',

  className: 'createView',

  events: {
    'submit': 'submitMessage',
    'click .logout': 'logout'
  },

  render: function(){
    this.$el.html(this.template());
    return this;
  },

  submitMessage: function(e){
    e.preventDefault();
    if (!window.localStorage.username) {
      window.localStorage.username = prompt("Please enter a username");
    }
    this.collection.create({
      username: window.localStorage.username,
      message: $('.js-message').val()
    });
    $('.js-username').val('');
    $('.js-message').val('');
  },

  logout: function(){
    console.log(window.localStorage.username);
    window.localStorage.clear();
  }

});
