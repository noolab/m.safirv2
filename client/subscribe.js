
Meteor.subscribe("categories");
Deps.autorun(function() {
	TAPi18n.subscribe("products",20);
});

Meteor.subscribe("images");
Meteor.subscribe("shops");
Meteor.subscribe("parent_tags");
Meteor.subscribe("tags");
Meteor.subscribe("stats");
Meteor.subscribe("attribute");
Meteor.subscribe("parentattr");
Meteor.subscribe("users");
Meteor.subscribe("cart");
Meteor.subscribe("parentattr");
Meteor.subscribe("contents");
Meteor.subscribe("contents_type");
Meteor.subscribe("address");
Meteor.subscribe("favorite");
Meteor.subscribe("role");
Meteor.subscribe("question");
Meteor.subscribe("journey");
Meteor.subscribe("linkselling");
Meteor.subscribe("membershipcard");
TAPi18n.subscribe("list_product");
Meteor.subscribe("attribute_value");
Meteor.subscribe("order");
Meteor.subscribe("translation");
Meteor.subscribe("payments");
Meteor.subscribe("banner");
