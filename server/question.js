// Meteor.startup(function(){
//   if (question.find().fetch().length === 0) {
//       question.insert({
//         name:'Can my teacher move me to another college with out my permission. Is it illegal?' 
//       }),
//       question.insert({
//         name: 'What if dogs could see more colors?(other than the colors they can see already)?'
//       }),
//       question.insert({
//         name: 'Why do people bully me?'
//       }),
//        question.insert({
//         name: 'Why do people still bother with science when religion is obviously right ?'
//       }),
//        question.insert({
//         name: 'Why do people feel shy?'
//       }),
//        question.insert({
//         name: 'Do you like Hannah Montana?'
//       })
//     }

//     if (Meteor.users.find().fetch().length === 0) {
//     var users = [
//         {name:"Normal User",email:"member@noolab.com",roles:['member']},
//         {name:"Admin User",email:"admin@noolab.com",roles:['admin']}
//       ];

//     _.each(users, function (user) {
//       var id;

//       id = Accounts.createUser({
//         email: user.email,
//         password: "apple1",
//         profile: { name: user.name }
//       });

//       if (user.roles.length > 0) {
//         // Need _id of existing user record so this call must come 
//         // after `Accounts.createUser` or `Accounts.onCreate`
//         Roles.addUsersToRoles(id, user.roles, 'mygroup');
//       }

//     });
//   }
// });