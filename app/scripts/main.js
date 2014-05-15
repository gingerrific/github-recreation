"use strict";


// var numStarred = 0;
// // does a loop through the repo data in search of any 
// // starred repos and adds them to an existing variable
// repoInfo.forEach(function(repo) {
//   numStarred = numStarred + repo.stargazers_count;
// });
// // adds the value to your user data object, if it's not there it creates it
// githubUser[0]["starred"] = numStarred;

///// Templates/////////////////////////////////////
////////////////////////////////////////////////////
var sideBarTemplate = _.template($('.side-bar-content-template').text());

var repoTemplate = _.template($('.repo-template').text());

///// Functions ////////////////////////////////////
////////////////////////////////////////////////////

function userRendering (user){
      var gingerNinja = sideBarTemplate(user);
      $('.side-bar').prepend(gingerNinja);
}

function repoRendering (data) {
  data.forEach(function (repo){
    var repository = repoTemplate(repo);
    $('.repo-list').append(repository);
  });
}


// repoInfo.forEach(function (repo){
//  var repository = repoTemplate(repo);
//  $('.repo-list').append(repository);
// });

///// Repos ////////////////////////////////////////
////////////////////////////////////////////////////

$.getJSON('https://api.github.com/users/gingerrific' + apiKEY).done(function (user){
  userRendering(user);
});

$.getJSON('https://api.github.com/users/gingerrific/repos' + apiKEY).done(function (repos){
  repoRendering(repos);
});




