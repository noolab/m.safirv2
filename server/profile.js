Meteor.methods({
   editprofile: function(id,attr) {
      Meteor.users.update({_id:id},{$set: attr});
    },
    editarray: function(id,arr) {
      Meteor.users.update({_id:id},{$addToSet: arr});
    },
    addanswer: function(id,array) {
      Meteor.users.update({_id:id},{$set: array});
    }

});
