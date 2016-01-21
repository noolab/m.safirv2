// Meteor.methods({
// 	insertTrad: function(obj,idproduct,lang){
// 		console.log('MY CALL'+JSON.stringify(obj));
// 		console.log('IDPRODUCT: '+idproduct);
// 		if(lang=="en")
// 			products.update({"_id":idproduct},{"$set":{"i18n.en":obj}});
// 		else
// 			products.update({"_id":idproduct},{"$set":{"i18n.fa":obj}});
// 	}
// });

Meteor.methods({
	insertTran: function(obj,idproduct,lang){
		console.log('MY CALL'+JSON.stringify(obj));
		console.log('IDPRODUCT: '+idproduct);
		if(lang=="en")
			translation.insert(obj);
		else
			translation.insert(obj);
	}
});