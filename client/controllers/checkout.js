Session.set("total", 0);

Template.checkout.helpers({
	resNum: function(){
		return Random.id();
	},
	getCart: function(){
		var mycart = '';
		if(Meteor.userId()){
			userid = Meteor.userId();
			if( userid ){
				mycart = cart.find({$and:[{order_status:0},{userId:userid}]});
			}
		}else{
			userid = Session.get('userId');
			if( userid ){
				mycart = cart.find({$and:[{order_status:0},{userId:userid}]});
			}
		}
		var total = 0;
		console.log("MyCart"+JSON.stringify(mycart.fetch()[0]));
		//Session.set("allcart", mycart);
		mycart.forEach( function(value,index){
			total = total + value.subtotal;
		});
		Session.set("total", total);

		 
		return mycart;
	},	
	getProductInfo: function(productid){
 		return products.findOne({_id:productid});	
	},
	getImage: function(id){
		var image=products.findOne({_id:id}).image;
		
		var res = image.replace("uploads", "upload"); 
		return res;
	},
	getShopName: function(id){
		return shops.findOne({"_id":id}).name;
	},
	getProname:function(id){
		return products.findOne({_id:id}).title;
 	},
 	getPrice:function(id){
		return products.findOne({_id:id}).price;
 	},
	getTotal: function(){
		return Session.get("total");
	},
	getImageid:function(id){

		return products.findOne({_id:id}).image;
	}
});
Template.checkout.events({
	"click #bank":function(e,tpl){
		var resNum=$("#ResNum").val();
		var amount=$("#Amount").val();
		var t=Date.now();
		var user=Session.get('userId');
		var obj={
			resNum:resNum,
			amount:amount,
			time:t,
			user:user
		};
		console.log('inserting payment:'+JSON.stringify(obj));
		Meteor.call('addPayment',obj);

	},
	"change #quantity":function(e,tmp){
		//alert("Changing qty");
		var qty = $(e.currentTarget).val();
		var id =this._id; //$(e.currentTarget).attr("data-id");
		var productid =this.id_product; $(e.currentTarget).attr("pro-id");
		var pro = products.findOne({_id:productid});
		var subtotal = 0;
		if( pro ){
			subtotal = parseInt(pro.price) * parseInt(qty);
		}
		Meteor.call('updateCart',id,qty,subtotal);
		
		
		var mycart = '';
		if(Meteor.userId()){
			userid = Meteor.userId();
			if( userid ){
				mycart = cart.find({$and:[{order_status:0},{userId:userid}]});
			}
		}else{
			userid = Session.get('userId');
			if( userid ){
				mycart = cart.find({$and:[{order_status:0},{userId:userid}]});
			}
		}
		var total = 0;
		
		mycart.forEach( function(value,index){
			total = total + value.subtotal;
		});
		Session.set("total", total);
		//Meteor._reload.reload();
	},
	"click .glyphicon-trash":function(e,tmp){
		var id = this._id;
		return cart.remove({_id:id});
	},
		// var itemid = $(e.currentTarget).attr("data-remove");
		// if(Meteor.userId()){
		// 	userid = Meteor.userId();

/*	"click #removecheckout":function(e,tmp){
		var itemid = $(e.currentTarget).attr("data-remove");
		if(Meteor.userId()){
			userid = Meteor.userId();
>>>>>>> 6eef4d9b1b419dbeff15b3ae0058437361ac7528
			
		// }else{
		// 	userid = Session.get('userId');
			
<<<<<<< HEAD
		// }
		// Meteor.call('removecart',itemid,userId);
	},
	"click #remove":function(e,tmp){
		var id = this._id;
		return cart.remove({_id:id});
=======
		}
		Meteor.call('removemycheckout',itemid,userId);
		alert('romoved!');
	},*/
	'click #removecheckout': function(e){
		e.preventDefault();
		var id =this._id;
		var itemid = $(e.currentTarget).attr("data-remove");
		if(Meteor.userId()){
			userid = Meteor.userId();
			
		}else{
			userid = Session.get('userId');
			
		}
		Meteor.call('removemycheckout', itemid, userId,id);	
		alert('had been remove!');
	},
	'click #btnAdd':function(e){
		e.preventDefault();
		var mycart = '';
		var arrCartId=[];
		if(Meteor.userId()){
			userid = Meteor.userId();
			if( userid ){
				mycart = cart.find({$and:[{order_status:0},{userId:userid}]});
			}
		}else{
			userid = Session.get('userId');
			if( userid ){
				mycart = cart.find({$and:[{order_status:0},{userId:userid}]});
			}
		}
		var total = 0;
		//alert("My"+JSON.stringify(mycart.fetch()[0]));
		//Session.set("allcart", mycart);
		if(mycart.count()>0){
			mycart.forEach( function(value){
			total = total + value.subtotal;
			
			//alert("My"+JSON.stringify(obj));
			arrCartId.push(value._id);
			var objStatus={
				order_status:1
			}
			Meteor.call('updateStatus',value._id,objStatus);
			
			});
			Session.setPersistent('orderId',Random.id());
			var obj={
				userid:Meteor.userId(),
				cartId:arrCartId,
				orderId:Session.get('orderId'),
				total:total
			}
			
			Meteor.call('insertOrder',obj);
			

			Router.go("/confirmorder");
		}else{
			alert('Please make order product to check out!');
		}
		
	}
});
Template.checkout.helpers({
	getprofile:function(){
		var id = Meteor.userId();
		return Meteor.users.findOne({_id:id});
	}
});
Template.confirmorder.helpers({
	getprofile:function(){
		var id = Meteor.userId();
		return Meteor.users.findOne({_id:id});
	},
	getAddress1:function(){
		var id = Meteor.userId();
		return Meteor.users.findOne({_id:id}).profile.address;
	}
});
Template.confirmorder.events({
	'submit form':function(e){
		e.preventDefault();
		var id = Session.get('orderId');
		var address = $('#address').val();
		var address1=$('input[name=address1]:checked').val();
		if(address){
			var addresses=address;
		}else{
			var addresses=address1
		}
		//alert(addresses);
		
		var obj = {
			address:addresses
		}
		
	
		Meteor.call('updateOrder',id,obj);
		Router.go('/confirmorder2');
	
	},
	'click #btnAdd':function(e){
		e.preventDefault();
		Router.go("/confirmorder");
	},
	// 'change #address1':function(e){
	// 	e.preventDefault();
	// 	if('[name="address1"]:checked'){
	// 		$('#address').hide();
	// 	}
	// 	else if($("input:checkbox:not(:checked)")){
	// 		$('#address').show();
	// 	}
		
	// }
});
Template.confirmorder2.events({
	'submit form':function(e){
		e.preventDefault();
		var idorder = Session.get('orderId');
		var delivery = $('#sel1').val();
		var obj = {
			deliverytype:delivery
		}
		Meteor.call('updateOrder',idorder,obj);
	}
});