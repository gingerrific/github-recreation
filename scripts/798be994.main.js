function userRendering(a){a.created_at=moment(a.created_at).format("MMM Do, YYYY");var b=sideBarTemplate(a);$(".side-bar").prepend(b)}function repoRendering(a){_.sortBy(a,function(a){return a.updated_at}).reverse().forEach(function(a){a.updated_at=moment(a.updated_at).fromNow();var b=repoTemplate(a);$(".repo-list").append(b)})}function starReporting(a){$(".star-counter").append(a.length)}function headerBio(a){var b=headerTeamplate(a);$(".header-pic").prepend(b)}function popularRendering(a){_.sortBy(a,function(a){return a.stargazers_count}).reverse().slice(0,5).forEach(function(a){a.description&&a.description.length>40&&(a.description=a.description.substring(0,40)+"...");var b=popularTemplate(a);$(".popular-repos").append(b)})}var apiKEY="?client_id=82fbf483687a55b5b7ae&client_secret=e1466fc6f0f3ed1e80a79c7e75177ba3d2997a1c",sideBarTemplate=_.template($(".side-bar-content-template").text()),repoTemplate=_.template($(".repo-template").text()),headerTeamplate=_.template($(".header-profile-template").text()),popularTemplate=_.template($(".popular-contributions-template").text());$(".header-search").focus(function(){$(this).css({width:"390px",background:"#fff"}),$(".header-links").css("opacity","0")}).focusout(function(){$(this).css({width:"210",background:"#fff"}),$(".header-links").delay(150).queue(function(a){$(this).css("opacity","1"),a()})}),$(".content-nav li").click(function(){var a=$(this).attr("data-tab");$(".content-nav li").removeClass("active-tab"),$(".tabbed-content").removeClass("active"),$(this).addClass("active-tab"),$("."+a).addClass("active")}),$.getJSON("https://api.github.com/users/gingerrific"+apiKEY).done(function(a){userRendering(a),headerBio(a)}),$.getJSON("https://api.github.com/users/gingerrific/repos"+apiKEY).done(function(a){repoRendering(a),popularRendering(a)}),$.getJSON("https://api.github.com/users/gingerrific/starred"+apiKEY).done(function(a){starReporting(a)});