Template.listTranslate.helpers({
	getListTranslate: function(){
		return translation.find({});

	}
});

Template.listTranslate.events({
	"click #btnAdd":function(e){
		e.preventDefault();
		var id=this._id;
		Meteor.call("addToCollection", id, function(err){
			if(err){
				console.log(err+reason);
			}else{
				alert("successful");
				Router.go("/listTranslate");
			}
		});

	}
});