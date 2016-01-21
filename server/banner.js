 Meteor.methods({
  insertbanner:function(obj){
  	
    banner.insert(obj);
  },
  updateBanner:function(id,obj){
    banner.update({_id:id},{$set:obj});
  }
  /*editAttr:function(id,attr){
    attribute_value.update({_id:id},{$set:attr});
  },
  deleteAttr:function(id,attr){
    attribute_value.delete({_id:id});
  }*/
});
