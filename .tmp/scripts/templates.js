this["JST"] = this["JST"] || {};
this["JST"]["application"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<h1>Hello</h1>\n";
},"useData":true});
this["JST"]["create"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "NEW MESSAGE!!11!1!\n\n<div class=\"createBar\">\n<input type=\"text\" name=\"message\" placeholder=\"Blog Message\" value=\"\" class=\"createPostInput js-message\">\n<input type=\"submit\" value=\"submit\">\n<a href=\"/\"><input type=\"button\" value=\"logout\" class=\"logout\"></a>\n</div>\n";
},"useData":true});
this["JST"]["createUsername"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<input type=\"text\" name=\"username\" placeholder=\"Username\" value=\"\" class=\"createPostInput js-username\">\n<input type=\"submit\" value=\"submit\" onclick=\"location.href='#index';\">\n";
},"useData":true});
this["JST"]["postsListItem"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "\n<h1>"
    + alias3(((helper = (helper = helpers.message || (depth0 != null ? depth0.message : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"message","hash":{},"data":data}) : helper)))
    + "</h1>\n<h5>"
    + alias3(((helper = (helper = helpers.username || (depth0 != null ? depth0.username : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"username","hash":{},"data":data}) : helper)))
    + "</h5>\n";
},"useData":true});