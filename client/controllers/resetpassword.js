
Template.ForgotPassword.events({
  'submit form': function(e) {
    var arr=[];
    e.preventDefault();
   var trimInput = function(val) {
    return val.replace(/^\s*|\s*$/g, "");
   }
   var code=e.target.code.value;
   alert(code+'='+Session.get('veryfy'));
   if(code==Session.get('veryfy')){
      var email=trimInput(e.target.emailRecovery.value);
    
      Accounts.forgotPassword({email: email}, function(err) {
          if (err) {
            if (err.message === 'User not found [403]') {
              console.log('This email does not exist.');
            } else {
              console.log('We are sorry but something went wrong.');
            }
          } else {
            console.log('Email Sent. Check your mailbox.');
          }
        });
      
      Session.set('email',email); 
      Router.go('ResetPassword');
   }
   
      

  },
});

Template.ResetPassword.events({
  'submit form': function(e) {
    e.preventDefault();
    var arr=[];
        var passwords = e.target.password.value;
        var result=Meteor.users.find();
        result.forEach(function(value){
          if(value.emails[0].address==Session.get('email')){
         
            //alert('makara:'+value.services.password.reset.token);
            arr.push(value.services.password.reset.token);
                  
          }
        });
        alert(arr[0]);
        
      Accounts.resetPassword(arr[0], passwords, function(err) {
        if (err) {
          console.log('We are sorry but something went wrong.');
        } else {
          console.log('Your password has been changed. Welcome back!');
          Session.set('resetPassword',null);
        }
      });
    
  }
});