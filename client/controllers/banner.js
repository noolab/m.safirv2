Template.banner.events({
	'click #btnAdd': function(e){
		e.preventDefault();
		alert("Hello");
		var url = $('#url').val();
		var imageId = Session.get('banner');
		var obj={
			imageId:imageId,
			url:url
		}
		if(this._id){
			Meteor.call('updateBanner',this._id,obj);
		}else{
			Meteor.call("insertbanner",obj);
		}
		
		Router.go("/banner");
	},
	'change #file': function(event, template) {
		event.preventDefault();
		var files = event.target.files;
		for (var i = 0, ln = files.length; i < ln; i++) {
			images.insert(files[i], function (err, fileObj) {
				Session.set('banner', fileObj._id);
				alert(fileObj_id);
			});
		}
	},
	'click #delete':function(e){
		e.preventDefault();
		banner.remove(this._id);
	}
	
});
Template.banner.helpers({
	getImgBrous:function(){
		return Session.get('banner');
	},
	getbanner:function(){
		return banner.find();
	},
	getbannerId:function(){
		return Session.get('bannerId');
	},

	
});
Template.home.helpers({
	getbanner:function(){
		return banner.find();
	}
});
