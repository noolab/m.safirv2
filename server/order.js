Meteor.methods({
	insertOrder:function(obj){
		order.insert(obj)
	},
	updateOrder:function(id,obj){
		order.update({orderId:id},{$set:obj});
	}
	/*insertAddress1:function(id,obj){
		order.update({orderId:id},{$set:obj});
	}*/
});