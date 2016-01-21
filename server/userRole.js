

Meteor.methods({
  deleteuser: function(id) {
    return Meteor.users.remove(id);
  },
  updateUserRole:function(id,attrRole){
    return Meteor.users.update(id,{$set:{roles:attrRole}});
  },
  updateEmail:function(id,attrEmail){
    return Meteor.users.update(id,{$set:attrEmail});
  },
  registerUser:function(username,email,password,role){
    targetUserId=Accounts.createUser({
        username:username,
        email: email,
        password: password
       });
    console.log(targetUserId);
    // Roles.setUserRoles(id,'member')
    Roles.setUserRoles(targetUserId, [role], 'mygroup')
  }


});
