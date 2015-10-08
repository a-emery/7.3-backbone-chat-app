import AppRouter from 'router';

$(document).ready(function(){
  window.appRouter = new AppRouter();
  Backbone.history.start();
});
