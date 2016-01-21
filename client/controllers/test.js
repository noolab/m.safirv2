Session.set('COUNTER',0);
a=0;
Template.test.helpers({
	counter: function(){
		return Session.get('COUNTER');
	},
	getA: function(){
		return a;
	}
});

Template.test.events({
	'click #add': function(e,tpl){
		var oldValue=Session.get('COUNTER');
		oldValue++;
		
		Session.set('COUNTER',oldValue);
		a++;
		console.log('a='+a);
		tpl.$("#A").text("new value="+a);
	}
});

/*
var c=counter();
console.log('Here is counter'+c);


onCreated
onRendered
Rendered--------------
onDestroyed

REACTIV= When you

*/