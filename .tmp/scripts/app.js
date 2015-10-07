require.register('main', function (exports, require, module) {
    'use strict';
    $(document).ready(function () {
        // prepend the contents of `app/templates/application.hbs` into `body`
        $('#container').append(JST.application());
    });
});
//# sourceMappingURL=app.js.map
