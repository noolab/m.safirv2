Router.configure({
    layoutTemplate: 'mainLayout',
    loadingTemplate: 'loading',
    onAfterAction: function(){
        if (Meteor.isClient)
            window.scrollTo(0, 0);
    }
    
});

Router.route('/dailyPopup', {
    name: 'dailyPopup',


});



Router.route('/',{
    //layoutTemplate: 'homeLayout',
    name:'home',
    waitOn : function () {
        return [TAPi18n.subscribe("products",-1)];
    },
});
Router.route('/login', {
    name: 'login'
});
/*
Router.route('/payment', {
    name: 'payment',
    data: function(){
        console.log('dataa:'+JSON.stringify(this.params));
        console.log('request:'+JSON.stringify(this.request));

        //console.log('dataa2:'+this);
        if (typeof this.request.body.State === 'undefined' || this.request.body.State === null) {
                console.log('No paramater from this payment!');
        }else{
            console.log('...');
            var reponse={
                    state:this.request.body.State,
                    resNum:this.request.body.ResNum,
                    mid:this.request.body.MID,
                    refnum:this.request.body.RefNum,
                    trace:this.request.body.TRACENO
            };
            
            console.log('Payment has result:'+JSON.stringify(reponse));
            


        }
    }
});
*/

Router.map(function () {
  this.route('payment', {
    path: '/payment/',
    //template: 'payment',
    where: 'server',
    action: function () {
        //console.log('dataa:'+JSON.stringify(this.params));
        console.log('request:'+JSON.stringify(this.request.body));
      if (typeof this.request.body.State === 'undefined' || this.request.body.State === null) {
                console.log('No paramater from this payment!');
        }else{
            console.log('...');
            var reponse={
                    state:this.request.body.State,
                    resNum:this.request.body.ResNum,
                    mid:this.request.body.MID,
                    refnum:this.request.body.RefNum,
                    trace:this.request.body.TRACENO
            };

            
            console.log('Payment has result:'+JSON.stringify(reponse));
            
      this.response.writeHead(200, {'Content-Type': 
                                    'text/html; charset=utf-8'});
      var html='<a href="/checkout">Back to safir</a>';
      this.response.end(JSON.stringify(html));
    }
    //this.render('login');
  }
})
});




Router.route('/member', {
    name: 'member',

});

Router.route('/register-success', {
    name: 'register-success'
});
//admin
Router.route('/addproduct',{
    name:'addproduct',
    waitOn : function () {
        return [Meteor.subscribe("parent_tags"),Meteor.subscribe("tags"),Meteor.subscribe("categories")];
    },
});

// admin Products
Router.route('/manageproduct',{
    name:'manageproduct',
    waitOn : function () {
        return [Meteor.subscribe("categories"),TAPi18n.subscribe("products",-1)];
    },

});


Router.route('/updateproduct/:_id',{
    name: 'updateproduct',
    template: 'addproduct',
    waitOn : function () {
        return [TAPi18n.subscribe("products",-1),Meteor.subscribe('attribute')];
    },
    data: function(){
        var id = this.params._id;
        var da = products.findOne({_id: id });
        return da;

    },

});


Router.route('/linkselling', {
    name: 'linkselling',
    waitOn : function () {
        return [Meteor.subscribe("question"),Meteor.subscribe("linkselling")];
    },
});

Router.route('/category/:id',{
    name: 'listing',
    template:'listproducts',
    waitOn : function () {
        return [TAPi18n.subscribe("products",-1)];
    },

    data: function() {

        var parent=this.params.id;
        var arr=[parent];
        Session.set('subcategories',arr);
        var fils=Meteor.call('getChildrenList',parent,function(err,result){
                //console.log('fils:'+result);
                //console.log('err:'+err);
                var finalList=result;
                finalList.push(parent);
                //Session.set('subcategories',finalList);
                //console.log('subcategories:'+Session.get('subcategories'));
                
            }); 

            var limit=Session.get('querylimit');/////////////////
            //console.log('PNC limit:'+limit);
            Session.set('currentCategory',parent);
            Session.get('curCategory',parent);
            var toSort =  Session.get("GETName");
            var listtags=Session.get('list_tag').split(';');

            console.log('Categories'+Session.get('subcategories'));
            console.log('tags:'+Session.get('list_tag'));
            console.log('listtags.length: '+listtags.length);
            if(toSort == "name"){
                if(Session.get('list_tag')=='')
                    var result=products.find({"category":{$in:Session.get('subcategories')}},{limit:limit,sort:{title:1}});///////////////return products.find({},{sort:{title:1}});
                else
                    var result=products.find({"category":{$in:Session.get('subcategories')},"tags.value":{$in:listtags}},{limit:limit,sort:{title:1}});
            }else if(toSort == "price"){
                if(Session.get('list_tag')=="")
                    var result=products.find({"category":{$in:Session.get('subcategories')}},{limit:limit,sort:{price:-1}});//return products.find({},{sort:{price:-1}});
                else
                    var result=products.find({"category":{$in:Session.get('subcategories')},"tags.value":{$in:listtags}},{limit:limit,sort:{price:-1}});
            }else if(toSort == "sell"){
                if(Session.get('list_tag')=="")
                    var result=products.find({"category":{$in:Session.get('subcategories')}},{limit:limit,sort:{ratio:-1}});//return products.find({},{sort:{price:-1}});
                else
                    var result=products.find({"category":{$in:Session.get('subcategories')},"tags.value":{$in:listtags}},{limit:limit,sort:{ratio:-1}});
            }
            else{
                if(Session.get('list_tag')=="")
                    var result=products.find({"category":{$in:Session.get('subcategories')}},{limit:limit});
                else
                    var result=products.find({"category":{$in:Session.get('subcategories')},"tags.value":{$in:listtags}},{limit:limit});
            }
            //var result=products.find({"category":{$in:Session.get('subcategories')}},{limit:limit});///////////////
            Session.set('nbproducts',result.fetch().length);
            console.log("nbproducts: "+result.fetch().length)
            
            console.log('finishQuizz: '+Session.get('finishQuizz'));
            if(Session.get('finishQuizz')==''){
                var j=journey.find({"category":parent}).fetch();
                console.log("Result of quizz:"+j.length);
                if(j.length>0){
                    console.log('Display popup');
                    //$('#myJourney').modal('show');
                }
                    
            }
            return {products:result};
        //return categories.findOne({_id: this.params.id},{limit:Session.get('querylimit')});
    },
    onStop: function () {
        console.log('leaving category!');
        Session.set('currentAnswer','');
        Session.set('parentAnswer','');
        Session.set('finishQuizz','');
        Session.set('list_tag','');
    }
});

Router.route('/details/:id', {
    name: 'details',
    waitOn : function () {
        return [TAPi18n.subscribe("products",-1)];
    },
    data: function() {
        
        var prod=products.findOne({"_id": this.params.id});
        if(prod!=null){
            console.log('ID='+this.params.id+' /'+JSON.stringify(prod));
            Session.set('currentCategory',prod.category);
            return prod;
        }
        
    }
    
    
});


 Router.route('/translateproduct/:id', {
     name: 'translateproduct',
     template:'translateproduct',
     data: function() {
        
        var prod=products.findOne({"_id": this.params.id});
        if(prod!=null){
            console.log('ID='+this.params.id+' /'+JSON.stringify(prod));
            Session.set('currentCategory',prod.category);
            return prod;
        }
        
    }
 });
Router.route('/producttranslate/:id', {
    name: 'producttranslate',
    template:'producttranslate',
    data: function() {
        
        var prod=products.findOne({"_id": this.params.id});
        if(prod!=null){
            console.log('ID='+this.params.id+' /'+JSON.stringify(prod));
            Session.set('currentCategory',prod.category);
            return prod;
        }
        
    }
});
Router.route('/translate_category/:id',{
    name: 'translate_category',
    template:'translate_category',
    data: function() {
        
        var prod=categories.findOne({"_id": this.params.id});
        if(prod!=null){
            //console.log('ID='+this.params.id+' /'+JSON.stringify(prod));
            Session.set('currentCategory',prod.category);
            return prod;
        }
        
    }
});
Router.route('/translateparentTag/:id',{
    name: 'translateparentTag',
    template:'translateparentTag',
    data: function() {
        
        var prod=parent_tags.findOne({"_id": this.params.id});
        if(prod!=null){
            //console.log('ID='+this.params.id+' /'+JSON.stringify(prod));
            Session.set('currentCategory',prod.category);
            return prod;
        }
        
    }
});
Router.route('/translatTags/:id',{
    name: 'translatTags',
    template:'translatTags',
    data: function() {
        
        var prod=tags.findOne({"_id": this.params.id});
        if(prod!=null){
            //console.log('ID='+this.params.id+' /'+JSON.stringify(prod));
            Session.set('currentCategory',prod.category);
            return prod;
        }
        
    }
});
Router.route('/translatParent_attr/:id',{
    name: 'translatParent_attr',
    template:'translatParent_attr',
    data: function() {
        
        var prod=parentattr.findOne({"_id": this.params.id});
        if(prod!=null){
            //console.log('ID='+this.params.id+' /'+JSON.stringify(prod));
            Session.set('currentCategory',prod.category);
            return prod;
        }
        
    }
});
Router.route('/transleattribute_value/:id',{
    name: 'transleattribute_value',
    template:'transleattribute_value',
    data: function() {
        
        var prod=attribute_value.findOne({"_id": this.params.id});
        if(prod!=null){
            //console.log('ID='+this.params.id+' /'+JSON.stringify(prod));
            Session.set('currentCategory',prod.category);
            return prod;
        }
        
    }
});
Router.route('/transleshops/:id',{
    name: 'transleshops',
    template:'transleshops',
    data: function() {
        
        var prod=shops.findOne({"_id": this.params.id});
        if(prod!=null){
            //console.log('ID='+this.params.id+' /'+JSON.stringify(prod));
            Session.set('currentCategory',prod.category);
            return prod;
        }
        
    }
});

Router.route('/profile', {
    name: 'profile'

});

Router.route('/editprofile', {
    name: 'editprofile'  

});

Router.route('/reward', {
    name: 'reward',
     waitOn : function () {
        return [Meteor.subscribe('users'),TAPi18n.subscribe("products",-1)];
     },

});

// admin categories
Router.route('/managecategory',{
    name: 'managecategory',
    data: function(){
        Session.set('multiUploadCategory','');
    },


});
Router.route('/addcategory',{
    name: 'addcategory'
    
});

Router.route('/updatecategory/:_id',{
    name: 'updatecategory',
    data: function(){
        var id = this.params._id;
        var da = categories.findOne({_id: id });
        Session.set('multiUploadCategory','');
        return da;
    },

});


// shop
Router.route('/manageshop',{
    name:'manageshop',

});

Router.route('/shopdetail/:id',{
    name:'shopdetail',
    data: function(){
        var id = this.params.id;
        var da = shops.findOne({_id: id });
        return da;
    }
});

Router.route('/updateshop/:_id',{
    name: 'updateshop',
    data: function(){
        var id = this.params._id;
        var da = shops.findOne({_id: id });
        return da;
    }
});


Router.route('/manageparenttag',{
    name:'manageparenttag'
    

});

Router.route('/updateparenttag/:_id',{
    name:'updateparenttag',
    data: function(){
        var id = this.params._id;
        var result = parent_tags.findOne({_id: id});
        return result;
    }

});


Router.route('/managetag',{

    name:'managetag',

});
Router.route('/edittag/:_id',{
    name:'edittag',
    data: function(){
        return tags.findOne({_id: this.params._id});
    },

});

Router.route('/listproducts/:brand',{
    name:'listproducts',
    waitOn : function () {
        return [Meteor.subscribe('products',-1)];
    },
    data: function(){
        
        Session.set('limit',-1);
        Session.set('querylimit',16);
        var brand = this.params.brand;
        var result = products.find({"Brand":brand},{limit:Session.get('querylimit')});
        Session.set('nbproducts',result.fetch().length);
        return result;

    }
});

Router.route('/advanced',{
    name:'advanced',
    template: 'listproducts',
    waitOn : function () {
        return [TAPi18n.subscribe('products',-1),Meteor.subscribe('categories')];
    },
    data: function(){
        var list_categories=[];
        if(Session.get('currentCategory')=='' || Session.get('currentCategory')=='undefined'){
            console.log('pas encore de categories');
            var allCat=categories.find({}).fetch();
            console.log('pas de cat in session:'+allCat.length);
            for(var i=0;i<allCat.length;i++){
                
                list_categories.push(allCat[i]._id);
            }
        }else{
            console.log('already:'+Session.get('currentCategory'));
            list_categories.push(Session.get('currentCategory'));
        }

        console.log('CURRENTCATEGORY='+list_categories);

        Session.set('limit',-1);
        Session.set('querylimit',16);
        var list_brand=[];
        var list_tags=[];
        var review_part={};

        console.log('brands:'+Session.get('advanced_brand'));
        if(Session.get('advanced_brand')!='')
            list_brand = Session.get('advanced_brand').split(';');

        var priceMin=0;
        if(Session.get('advanced_price_min')!= "")
            priceMin=Number(Session.get('advanced_price_min'));

        var priceMax=Number.MAX_VALUE;
        if(Session.get('advanced_price_max')!="")
            priceMax=Session.get('advanced_price_max');
        priceMax=Number(priceMax);

        list_tags=Session.get('advanced_tags').split(';');


        var has_comment=Session.get('advanced_has_comment');
        var is_favorite=Session.get('advanced_is_favorite');

        if(list_brand.length==0){
            
            var allProducts=products.find().fetch();
            console.log('Remplissage des Brand: '+allProducts.length);
            for(var i=0;i<allProducts.length;i++){
                if(list_brand.indexOf(allProducts[i].Brand)<0)
                    list_brand.push(allProducts[i].Brand);
            }

        }
        //console.log('list_brand='+list_brand[0]);
        console.log('list_brand='+list_brand);

                /*
                if(list_tags.length==0){
                    var allProducts=products.find();
                    for(var i=0;i<allProducts.length;i++){
                        if(list_tags.indexOf(allProducts[i].Brand)==-1)
                            list_brand.push(allProducts[i].Brand);
                    }
                }{review : {$exists:true}, {$where:'this.review.length>0'}}
                */

                //alert('PriceMin= '+priceMin);
                //alert('PriceMax= '+priceMax);
                console.log('list_categories='+list_categories);
                console.log('list_brand='+list_brand);
                console.log('queryLimit:'+Session.get('querylimit'));
                var arrayobj=[];
                /*if(has_comment==0){DfwSwoSezQetwuGYy
                    var result = products.find({$and:[{category:{$in:list_categories}},{Brand:{$in:list_brand}}]});
                    result.forEach(function(value){
                        if(value.price>=priceMin && value.price<priceMax){
                            //alert('hello');
                            arrayobj.push(value);
                        }
                    });
                }
                else{*/
                    var result = products.find({category:{$in:list_categories},Brand:{$in:list_brand}});
                    console.log('resultat du refine:'+result.count());
                    result.forEach(function(value){
                        if(typeof value.price === "undefined"){
                            arrayobj.push(value);
                        }else{
                            if(value.price>=priceMin && value.price<priceMax){
                            //alert('hello');
                                arrayobj.push(value);
                            }
                        }
                        
                    });
                //}
                
                Session.set('nbproducts',arrayobj.length);
                return {products:arrayobj};

            }
        });

Router.route('/favorite', {
    template:'listproducts',
    waitOn : function () {
        return [TAPi18n.subscribe("products",-1)];
    },
    data: function(){
        
        Session.set('limit',-1);
        var object=[];
        if(Session.get('userId')){
          var ses=Session.get('userId');
          var data=  favorite.find({userId:ses},{limit:Session.get('querylimit')});
          
          var obj={};
          data.forEach(function(entry) {
            var proid=entry.proId;
            obj=products.findOne({_id:proid});
            object.push(obj);
            
        });
          console.log(object);
          Session.set('nbproducts',object.length);
          return {products:object};
      } 
      else{
            Session.set('nbproducts',0);
            return {products:object};
      }
        
  }
  
});

Router.route('/searchproduct',{
        template:'searchproduct',
        waitOn : function () {
            return [TAPi18n.subscribe("products",-1)];
        },
        data: function(){
            /*var keyword = Session.get('keyword');
            console.log('parameter:'+keyword);
            if(keyword==""){
                Session.set('nbproducts',0);
                return null;
            }
                
            var result = "";
            result = products.find({title: {$regex: new RegExp(keyword, "i")}},{limit:Session.get('querylimit')});
            Session.set('nbproducts',result.fetch().length);
            console.log("pro:"+result.count());
            return result;
            */

            var keyword = Session.get('keyword');
            //alert('router:'+keyword);
        var groupid = parseInt(Session.get('groupsearch'));
        //alert('groupid:'+groupid);
        if( keyword != ""){
            console.log("group:"+groupid);
            var result = [];
            var result1=[];
            if( groupid == 1){
                console.log('search products');
                result = products.find({$or:[{title: {$regex: new RegExp(keyword, "i")}},{description: {$regex: new RegExp(keyword, "i")}}]}).fetch();
                Session.set("searchall","");
            }
            /*else if( groupid == 2 ){
                var forum = contents_type.findOne({type:"Forum"});
                result1 = contents.find({$or:[{title: {$regex: new RegExp(keyword, "i")}},{content: {$regex: new RegExp(keyword, "i")}}], typeid:forum._id}).fetch();
                Session.set("searchall","");
            }
            else if( groupid == 3 ){
                var look = contents_type.findOne({type:"Looks"});
                result1 = contents.find({$or:[{title: {$regex: new RegExp(keyword, "i")}},{content: {$regex: new RegExp(keyword, "i")}}], typeid:look._id}).fetch();
                Session.set("searchall","");
            }*/
            else if( groupid == 4 ){
                console.log('search webzine');
                var webzine = contents_type.findOne({type:"Webzine"});
                result1 = contents.find({$or:[{title: {$regex: new RegExp(keyword, "i")}},{content: {$regex: new RegExp(keyword, "i")}}], typeid:webzine._id}).fetch();
                Session.set("searchall","");
            }
            else if( groupid == 5 ){
                console.log('search tuto');
                var tuto = contents_type.findOne({type:"Tuto"});
                result1 = contents.find({$or:[{title: {$regex: new RegExp(keyword, "i")}},{content: {$regex: new RegExp(keyword, "i")}}], typeid:tuto._id}).fetch();
                Session.set("searchall","");
            }
            else{
                //alert('hollo');
                console.log('search all on all');
                result = products.find({$or:[{title: {$regex: new RegExp(keyword, "i")}},{description: {$regex: new RegExp(keyword, "i")}}]}).fetch();
                result1 = contents.find({$or:[{title: {$regex: new RegExp(keyword, "i")}},{content: {$regex: new RegExp(keyword, "i")}}]}).fetch();
                Session.set("searchall",1);
                             
            }

            Session.set('nbproducts',result.length);
            Session.set('nbcontents',result1.length);
            //alert('FINISH ROUTING');
            return {product:result,content:result1};
            
        }else{
            Session.set('nbproducts',0);
            Session.set('nbcontents',0);
            return;
        }
        }
});

Router.route('/checkout',{
    name:'checkout',
    waitOn : function () {
        return [TAPi18n.subscribe("products",-1)];
    }
});

Router.route('/webzinelisting',{
    name: 'webzinelisting',
    waitOn : function () {
        return [Meteor.subscribe('contents')];
    } 
});
Router.route('/webzinedetails/:_id', {
    name: 'webzinedetails' ,
    data: function(){
       return contents.findOne({_id: this.params._id});
   } 
});

Router.route('/addContent', {
    name: 'addContent',

    template:'addContent',


});

Router.route('/updateContent/:_id', {
    name: 'updateContent',
    data: function(){
        return contents.findOne({_id: this.params._id});
    },
    waitOn : function () {
        return [Meteor.subscribe("images")];
    },

});

Router.route('/managecontent', {

    name: 'managecontent',

});
//end kis

//Parent Attribute
Router.route('/parentattr', {
    name: 'parentattr',
    
});

Router.route('/editparentattr/:_id', {
    name: 'editparentattr',
    data: function() {
        return parentattr.findOne({_id: this.params._id});
    },


});
//Attribute
Router.route('/attribute', {

    name: 'attribute',    

});

Router.route('/editattr/:_id', {
    name: 'editattr',
    data: function() {
        var attr= attribute.findOne({_id: this.params._id});
        Session.setPersistent('id',attr.productImage);//store field productImage to use in helper to get file dispay
        Session.setPersistent('attrId',this.params._id);//store id attribute to use delete file
        var id =attr.parentId;
        var parent=parentattr.findOne({_id:id})
        Session.setPersistent('parentID',parent._id);//store id parent attribute to find where not equal parentId
        var dataAll={
            attr:attr,
            parent:parent
        }
        return dataAll;
    }

    
});
Router.route('/tutolisting/:_id',{
    name:'tutolisting',
    data:function(){
        return categories.findOne({_id: this.params._id});
    }
});
Router.route('/tutodetails/:_id',{
    name:'tutodetails',
    data:function(){
        return contents.findOne({_id: this.params._id});
    }
});
Router.route('/tuto',{
    name:'tutonew',
    waitOn : function () {
        return [Meteor.subscribe("categories")];
    },
    data: function(){
        var cat=categories.find({"parent":" "});
        console.log("count: "+cat.count());
        return {getTutoCategory:cat};
    }
});

Router.route('/journey', {
    name: 'journey'  
});


Router.route('/test', {
    name: 'test',
    waitOn : function () {
        return [TAPi18n.subscribe("products",-1)];
    }  
});

Router.route('/addlistproduct', {
    name: 'addlistproduct',
    waitOn : function () {
        return [TAPi18n.subscribe("products",-1)];
    },

});

Router.route('/updatelistproduct/:_id',{
    name: 'updatelistproduct',
    waitOn : function () {
        return [TAPi18n.subscribe("products",-1)];

    },
    data: function(){
        var id = this.params._id;
        var da = list_product.findOne({_id: id });
        return da;
    }
});


Router.route('/addList', {
    name: 'addList',
    waitOn : function () {
            return [TAPi18n.subscribe("products",-1)];
    } ,
    data: function(){
        var arr=[];
        for(var i=0;i<10;i++){
            arr[i]=i;
        }
        //[0,1,2,3,4,5,6,7,8,9]
       return {p: arr};
    }
});

Router.route('/confirmorder',{
    name: 'confirmorder',

});
Router.route('/confirmorder1',{
    name: 'confirmorder1',
});
Router.route('/confirmorder2',{
    name: 'confirmorder2',
});

Router.route('/listTranslate',{
    name: 'listTranslate'
});

Router.route('/new',{
    name:'new'
});
Router.route('/email',{
    name: 'email'
});
Router.route('/veryfy',{
    name:'veryfy'
});
Router.route('/ForgotPassword',{
    name:'ForgotPassword'
});
Router.route('/ResetPassword',{
    name:'ResetPassword'
});
Router.route('/slider',{
    name:'slider'
});
Router.route('/banner',{
    name:'banner'
   /* data:function(){
        return banner.findOne({_id: this.params._id);
    }*/
});
Router.route('/updatebanner/:_id',{
    name:'updatebanner',
    template:'banner',
    data:function(){
        //Session.set('bannerId',this.params._id);
        return banner.findOne({_id: this.params._id});
    }
});

Router.route('/menulink',{
    name:'menulink'
});


