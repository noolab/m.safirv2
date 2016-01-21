Session.set("loginError","");
Session.set("registerError","");
Template.login.helpers({
	loginError:function(){
		var msg = Session.get("loginError");
		if( msg ) return true;
		else return false;
	},
	loginErrormsg: function(){
		return Session.get("loginError");
	},
	registerError:function(){
		var msg = Session.get("registerError");
		if( msg ) return true;
		else return false;
	},
	registerErrormsg: function(){
		return Session.get("registerError");
	}
})
Template.login.events({
    'click .btn_login': function(event,tpl){
        event.preventDefault();
		//alert("login");
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
		/*$('.close').click();*/
		Meteor.loginWithPassword(email, password, function(error){
			if(error){
				console.log(error.reason);
				Session.set("loginError",error.reason);
				$("#loginError").text("Error in your login!");
			} else {
				 Session.set("loginError","");
				 var loggedInUser = Meteor.user();
				 var group = 'mygroup';
				 if (Roles.userIsInRole(loggedInUser, ['admin'], group)) {
					Router.go('/admin');
					$('.close').click();
				 }
				 else if (Roles.userIsInRole(loggedInUser, ['member'], group)) {	

						Router.go('/profile');
						$('.close').click();
				 }
				 else{

					 Router.go('/profile');
					 $('.close').click();
				 }
			}
		});
    },
     'click #poplogin': function(event){
    	//alert("jjss");
    	$("#squarespaceModal").modal({                    
			"backdrop"  : "static",
			"keyboard"  : true,
			"show"      : true   // show the modal immediately                  
		  });
    },
    'click #register': function(event){
    	event.preventDefault();
    	console.log('Register in progress...');
    	var username=$(".reg-username").val();
    	var firstname =$('.reg-firstname').val();
		var lastname =$('.reg-lastname').val();
		var email = $('.reg-email').val();
		var password =$('.reg-password').val();
		var country=$('.reg-country').val();
		var city=$('.reg-city').val();
		var shipcard = '';
		var point = 0;
		var rerole = 'member';
		var msg = "";
		//console.log('register in progress 2...')
		if(firstname == "" || firstname <= 3|| lastname == "" ||email == "" ||password == ""){
					if( firstname == "")
						msg += "<p> Firstname is required.</p>";
					if( lastname == "")
						msg += "<p>lastname is required.</p>";
					if(email == "")
						msg += "<p>mail is required</p>";
					if(password == "")
						msg += "<p>password is required</p>";

					$(".register_msg").html(msg);
					Session.set("registerError", msg );
					
			}else{
			//alert(firstname+lastname+email+password);
			Meteor.call('regUser',firstname, lastname, email, password, shipcard, point, rerole,country,city,username,function(err){
				if(err){
					console.log(err.reason);
					Session.set("registerError",err.reason);
				}else{
					Session.set("registerError","");
					Router.go('register-success'); 
				}
			});
		}
    	
    }
});


Template.login.onRendered(function(){
	$("#squarespaceModal").modal({                    
			"backdrop"  : "static",
			"keyboard"  : true,
			"show"      : true   // show the modal immediately                  
		  });
	$('#squarespaceModal').on('hidden.bs.modal', function () {
		Router.go('/profile');
	})
});
Template.registerSuccess.onRendered(function(){
	$("#squarespaceModal").modal({                    
			"backdrop"  : "static",
			"keyboard"  : true,
			"show"      : true   // show the modal immediately                  
		  });
	$('#squarespaceModal').on('hidden.bs.modal', function () {
		$('.modal-backdrop').remove();
		//Router.go('/dailyPopup');
		Router.go('/');
	})
});
Template.registerSuccess.events({
	"click #goto-login": function(){
		$('.modal-backdrop').remove();
		Router.go('/login');
	}
});
