"use strict";

///// Templates/////////////////////////////////////
////////////////////////////////////////////////////
var sideBarTemplate = _.template($('.side-bar-content-template').text());

var repoTemplate = _.template($('.repo-template').text());

///// Functions ////////////////////////////////////
////////////////////////////////////////////////////

function userRendering (user){
      user.created_at = moment(user.created_at).format("MMMM Do, YYYY");
      var gingerNinja = sideBarTemplate(user);
      $('.side-bar').prepend(gingerNinja);
}

function repoRendering (data) {
    _.sortBy(data, function (sortedData) {
      return sortedData.updated_at; //sorts the repos by their updated at value. default is ascending order
    }).reverse().forEach(function (repo){ // this reverses it and then calls the for each to further parse the data
      repo.updated_at = (moment(repo.updated_at).fromNow()); //this formats the updated_at filed into a period of time from the current moment.
      var repository = repoTemplate(repo);
      $('.repo-list').append(repository);
  });
}

function starReporting (starCount) {
  $('.star-counter').append(starCount.length);
}


///// API Calls ////////////////////////////////////
////////////////////////////////////////////////////

$.getJSON('https://api.github.com/users/gingerrific' + apiKEY).done(function (user){
  userRendering(user);
});

$.getJSON('https://api.github.com/users/gingerrific/repos' + apiKEY).done(function (repos){
  repoRendering(repos);
});

$.getJSON('https://api.github.com/users/gingerrific/starred' + apiKEY).done(function (stars){
  starReporting(stars);
});





