require.register('main', function (exports, require, module) {
    'use strict';
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { 'default': obj };
    }
    var _router = require('router');
    var _router2 = _interopRequireDefault(_router);
    $(document).ready(function () {
        window.appRouter = new _router2['default']();
        Backbone.history.start();
    });
});
require.register('router', function (exports, require, module) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { 'default': obj };
    }
    var _viewsPostsIndex = require('views/PostsIndex');
    var _viewsPostsIndex2 = _interopRequireDefault(_viewsPostsIndex);
    var _modelsBlogPosts = require('models/BlogPosts');
    var _modelsBlogPosts2 = _interopRequireDefault(_modelsBlogPosts);
    var _viewsCreateUsername = require('views/CreateUsername');
    var _viewsCreateUsername2 = _interopRequireDefault(_viewsCreateUsername);
    exports['default'] = Backbone.Router.extend({
        routes: {
            '': 'createUsername',
            'index': 'index'
        },
        initialize: function initialize() {
            $('#container').html(JST.application);
            this.posts = new _modelsBlogPosts2['default']();
            this.posts.fetch();
        },
        createUsername: function createUsername() {
            var view = new _viewsCreateUsername2['default']();
            this.showView(view);
        },
        index: function index() {
            var view = new _viewsPostsIndex2['default']({ collection: this.posts });
            this.posts.fetch();
            this.showView(view);
        },
        /*
  * Helper functions
  */
        showView: function showView(view) {
            if (this.currentView)
                this.currentView.remove();
            this.currentView = view;
            $('#container').html(view.render().el);
            return view;
        }
    });
    module.exports = exports['default'];
});
require.register('models/BlogPosts', function (exports, require, module) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { 'default': obj };
    }
    var _modelsPost = require('models/Post');
    var _modelsPost2 = _interopRequireDefault(_modelsPost);
    exports['default'] = Backbone.Collection.extend({
        model: _modelsPost2['default'],
        url: 'http://tiny-lasagna-server.herokuapp.com/collections/messagess',
        comparator: function comparator(model) {
            return -model.get('createdAt');
        }
    });
    module.exports = exports['default'];
});
require.register('models/Post', function (exports, require, module) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    exports['default'] = Backbone.Model.extend({
        defaults: function defaults() {
            return {
                message: '[no message]',
                username: '[no username]',
                createdAt: Date.now()
            };
        }
    });
    module.exports = exports['default'];
});
require.register('views/CollectionView', function (exports, require, module) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var CollectionView = Backbone.View.extend({
        initialize: function initialize() {
            this.listenTo(this.collection, 'add', this.addChild);
            this.listenTo(this.collection, 'remove', this.removeChild);
            this.listenTo(this.collection, 'sort', this.sortChildren);
            this.children = [];
        },
        addChild: function addChild(model, collection) {
            var index = collection.indexOf(model);
            var ItemViewConstructor = this.ItemViewConstructor || Backbone.View;
            var view = new ItemViewConstructor({ model: model });
            this.children.splice(index, 0, view);
            this.$el.append(view.render().el);
        },
        removeChild: function removeChild(model, collection) {
            var view = _.findWhere(this.children, { model: model });
            var index = this.children.indexOf(view);
            this.children.splice(index, 1);
            if (view) {
                view.remove();
            }
        },
        sortChildren: function sortChildren() {
            var _this = this;
            var els = this.collection.map(function (model) {
                var view = _.findWhere(_this.children, { model: model });
                return view.el;
            });
            this.$el.append(els);
        },
        remove: function remove() {
            _.invoke(this.children, 'remove');
            Backbone.View.prototype.remove.apply(this, arguments);
        }
    });
    exports['default'] = CollectionView;
    module.exports = exports['default'];
});
require.register('views/Create', function (exports, require, module) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    exports['default'] = Backbone.View.extend({
        template: JST.create,
        tagName: 'form',
        className: 'createView',
        events: {
            'submit': 'submitMessage',
            'click .logout': 'logout'
        },
        render: function render() {
            this.$el.html(this.template());
            return this;
        },
        submitMessage: function submitMessage(e) {
            e.preventDefault();
            if (!window.localStorage.username) {
                window.localStorage.username = prompt('Please enter a username');
            }
            this.collection.create({
                username: window.localStorage.username,
                message: $('.js-message').val()
            });
            $('.js-username').val('');
            $('.js-message').val('');
        },
        logout: function logout() {
            console.log(window.localStorage.username);
            window.localStorage.clear();
        }
    });
    module.exports = exports['default'];
});
require.register('views/CreateUsername', function (exports, require, module) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    exports['default'] = Backbone.View.extend({
        template: JST.createUsername,
        tagName: 'form',
        events: { 'submit': 'createUsername' },
        render: function render() {
            this.$el.html(this.template());
            return this;
        },
        createUsername: function createUsername(e) {
            e.preventDefault();
            window.localStorage.username = $('.js-username').val();
        }
    });
    module.exports = exports['default'];
});
require.register('views/PostsIndex', function (exports, require, module) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { 'default': obj };
    }
    var _viewsCreate = require('views/Create');
    var _viewsCreate2 = _interopRequireDefault(_viewsCreate);
    var _viewsCollectionView = require('views/CollectionView');
    var _viewsCollectionView2 = _interopRequireDefault(_viewsCollectionView);
    var _viewsPostsListItem = require('views/PostsListItem');
    var _viewsPostsListItem2 = _interopRequireDefault(_viewsPostsListItem);
    var PostsCollectionView = _viewsCollectionView2['default'].extend({
        tagName: 'ul',
        className: 'postsList',
        ItemViewConstructor: _viewsPostsListItem2['default']
    });
    var PostsIndexView = Backbone.View.extend({
        initialize: function initialize() {
            this.createPost = new _viewsCreate2['default']({ collection: this.collection });
            this.postsCollectionView = new PostsCollectionView({ collection: this.collection });
        },
        render: function render() {
            this.$el.html(this.createPost.render().el);
            this.$el.append(this.postsCollectionView.render().el);
            return this;
        },
        remove: function remove() {
            this.postsCollectionView.remove();
            this.createPost.remove();
            Backbone.View.prototype.remove.apply(this, arguments);
        }
    });
    exports['default'] = PostsIndexView;
    module.exports = exports['default'];
});
require.register('views/PostsListItem', function (exports, require, module) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var PostsListItem = Backbone.View.extend({
        tagName: 'li',
        className: 'postListItem',
        template: JST.postsListItem,
        render: function render() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });
    exports['default'] = PostsListItem;
    module.exports = exports['default'];
});
//# sourceMappingURL=app.js.map
