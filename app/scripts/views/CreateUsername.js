export default Backbone.View.extend({

  template: JST.createUsername,

  tagName: 'form',

  events: {
    'submit': 'createUsername'
  },

  render: function(){
    this.$el.html(this.template());
    return this;
  },

  createUsername: function(e){
    e.preventDefault();
    window.username = $('.js-username').val();
  }

});
