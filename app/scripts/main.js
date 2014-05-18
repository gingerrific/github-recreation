"use strict";

///// Templates/////////////////////////////////////
////////////////////////////////////////////////////
var sideBarTemplate = _.template($('.side-bar-content-template').text());

var repoTemplate = _.template($('.repo-template').text());

var headerTeamplate = _.template($('.header-profile-template').text());

var popularTemplate = _.template($('.popular-contributions-template').text());
///// Functions ////////////////////////////////////
////////////////////////////////////////////////////

function userRendering (user){
      user.created_at = moment(user.created_at).format("MMM Do, YYYY");
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

function headerBio (bio) {
  var bioInfo = headerTeamplate(bio);
  $('.header-pic').prepend(bioInfo);
}

function popularRendering (data) {
    data.forEach(function (repo){
      if (repo.description && repo.description.length > 40) {
        repo.description=(repo.description.substring(0, 40)+'...');
      }  
      var popRepos = popularTemplate(repo);
      $('.popular-repos').prepend(popRepos);
    });
}

// fix me by stargazers count
// function popularRendering (data) {
//     _.sortBy(data, function (sortedData){
//       return sortedData.
//     })
//     data.forEach(function (repo){
//       var popRepos = popularTemplate(repo);
//       $('.popular-repos').prepend(popRepos);
//     });
// };



///// Page jQuery //////////////////////////////////
////////////////////////////////////////////////////
$('.header-search').focus( function () {
  $(this).css({'width':'390px','background': '#fff'});
  $('.header-links').css('opacity', '0');
}).focusout (function() {
  $(this).css({'width':'210', 'background': '#fff'});
  $('.header-links').delay(150).queue( function (next) {$(this).css('opacity', '1'); next();});
});

///// API Calls ////////////////////////////////////
////////////////////////////////////////////////////

$.getJSON('https://api.github.com/users/gingerrific' + apiKEY).done(function (user){
  userRendering(user);
  headerBio(user);
});

$.getJSON('https://api.github.com/users/gingerrific/repos' + apiKEY).done(function (repos){
  repoRendering(repos);
  popularRendering(repos);
});

$.getJSON('https://api.github.com/users/gingerrific/starred' + apiKEY).done(function (stars){
  starReporting(stars);
});






