Template.profile.helpers({
	getquestion:function(){
		return question.find({});
	},
	getAnswer: function(question_id){
		var userId=Meteor.userId();
		//console.log("userId: "+userId);
		var answer=users.find({"_id":userId,"answerdata.qcmId":question_id},{fields:{"answerdata":1}});
		//console.log("res:"+answer.fetch()[0].answerdata.length);
		//console.log(answer.fetch()[0]);
		if(answer.fetch().length==0)
			return "";
		else{
			var ret="";
			for(var i=0;i<answer.fetch()[0].answerdata.length;i++){
				//console.log("current answer="+answer.fetch()[0].answerdata[i].answer+" / "+answer.fetch()[0].answerdata[i].qcmId);
				if(answer.fetch()[0].answerdata[i].qcmId==question_id)
					ret=answer.fetch()[0].answerdata[i].answer;
			}
				
			//console.log("ret="+ret);
			return ret;
		}
	}
})