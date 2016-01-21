Template.registerHelper('getImg', function (id) {
        //console.log("IMAGE="+id);
        if(id=='' || typeof id == "undefined")
            // return '/uploads/unknown.png';
            return '/img/unknown.png';

        else if(id.indexOf("uploads")>-1){
                //console.log('oldSafir');
                //id=id.replace("/uploads/","/upload/");
                //console.log('oldSafir2'+id);
               // console.log("first"+id);
                return id;
        }
        else if(id.indexOf("http://")>-1){
                    //id=id.replace("/upload/","");
                  //  console.log("SECOND="+id);
                   return id;
        }else{
                    var img = images.findOne({_id:id});
            //console.log("current img="+img);
                    //console.log("LAST="+id);
                    if(img){
                        //console.log(img.copies.images.key);
                        return '/uploads/'+img.copies.images.key;
                    }else{
                        return;
                    } 
        }
                    
});

Template.registerHelper('trimString', function(passedString) {
    var theString = passedString.substring(0,110);
    return new Handlebars.SafeString(theString)
});

Template.registerHelper('getDate', function (curdate) {
	var d = new Date(curdate);
	var str=d.getDate()+"/"+d.getMonth()+"/"+d.getFullYear();
    return str;
}); 

Template.registerHelper('recap', function (text) {
    return text.split(" ").splice(0,3).join(" ");
}); 

Template.registerHelper('getTotal', function (text) {
    return Session.get("total");
}); 

Template.registerHelper('getProductInfo', function (item_id) {
    var cartItem=cart.findOne({"_id":item_id});
    //console.log('TESTING CART SIZE' +cart.count());
    var pro=products.findOne({"_id":cartItem.id_product});
    var shop = shops.findOne({"_id":cartItem.shop});
    console.log('TESTING CART' +pro.title);  
    return {_id:item_id,product:pro, qty:cartItem.quantity, subtotal:cartItem.subtotal, item_id:item_id,shop:shop.name};
}); 

Template.registerHelper('getCart', function (curdate) {
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
        console.log('cart id='+userid);
        var total = 0;
        
        mycart.forEach( function(value,index){
            total = total + value.subtotal;
        })
        Session.set("total", total);
        console.log('TOTAL'+total);
        return mycart;
}); 

var clock = 100;

var timeLeft = function() {
  if (clock > 0) {
    clock--;
    Session.set("time", clock);
    return console.log(clock);
  } else {
    console.log("That's All Folks");
    return Meteor.clearInterval(interval);
  }
};

var interval = Meteor.setInterval(timeLeft, 1000);

Template.registerHelper("time", function() {
    return Session.get("time");
  });


Template.registerHelper("getFirstImgContent",function(id){
    var p=contents.findOne({_id:id});
        if(p.image instanceof Array)
            return p.image[0];
        else
            return p.image;
    });

Template.registerHelper("validProduct",function(img,price){
    if(typeof price === "undefined" || price=="" || typeof img === "undefined" || img=="")
        return false;
    else
        return true;
    });