
//products = new Meteor.Collection('products');// collection products
products = new TAPi18n.Collection("products");
//pageproduct = new Meteor.Collection('products');
categories = new Meteor.Collection('categories');// collection categories
shops = new Meteor.Collection('shops');
parent_tags = new Meteor.Collection('parent_tags');
tags = new Meteor.Collection('tags');
stats = new Mongo.Collection('stats');
allproducts = products;
fullpath="upload";

if (Meteor.isServer) {
	fullpath=process.env.PWD;
	console.log('linux path:'+fullpath);
	if( typeof fullpath == 'undefined' ){
		base_path = Meteor.npmRequire('fs').realpathSync( process.cwd() + '../../' );
		console.log('window path:'+base_path);
		//base_path = base_path.split('\\').join('/');
		//base_path = base_path.replace(/\/\.meteor.*$/, '');
	}else{
		base_path=fullpath;
	}
}
else{
	base_path="/";
}
console.log( 'BASE PATH: '+base_path );
images = new FS.Collection("images", {
	//stores: [new FS.Store.FileSystem("images", {path:"/opt/safir/app/uploads"})]
    stores: [new FS.Store.FileSystem("images", {path:base_path+"/upload"})]
});

attribute = new Mongo.Collection('attribute');

parentattr = new Mongo.Collection('parentattr');
users = Meteor.users;
cart=new Mongo.Collection('cart');
contents = new Meteor.Collection('contents');
contents_type = new Meteor.Collection('contents_type');
address = new Mongo.Collection('address');
favorite = new Mongo.Collection('favorite');
question = new Mongo.Collection('question');
journey=new Mongo.Collection('journey');//added by djisse
linkselling=new Mongo.Collection('linkselling');//added by djisse
membershipcard = new Mongo.Collection('membershipcard');
list_product = new TAPi18n.Collection('list_product');
attribute_value=new Mongo.Collection('attribute_value');
order=new Mongo.Collection('order');
translation=new Mongo.Collection('translation');
payments = new Meteor.Collection('payments');
banner = new Meteor.Collection('banner');
