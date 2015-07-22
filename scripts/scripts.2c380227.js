"use strict";angular.module("evplaylistsApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","facebook","youtube-embed"]).config(["$routeProvider",function(a){a.when("/",{title:"Home",templateUrl:"views/main.html",controller:"MainCtrl"}).when("/playlist/:id",{title:"Playlist",templateUrl:"views/player.html",controller:"PlayerCtrl"}).otherwise({redirectTo:"/"})}]).config(["FacebookProvider",function(a){a.init("703746293090635")}]).constant("configs",{appName:"EvPlaylist",appVersion:"0.1 Beta",keywords:"facebook, playlist, music, events"}),angular.module("evplaylistsApp").controller("MainCtrl",["$scope","$http","$q","Facebook","Youtube","Page","$location",function(a,b,c,d,e,f,g){a.ytMusicId="sMKoNBRZM1M",a.ytMusicPlayerVars={controls:!0,autoplay:!0},a.ytMusicPlaylistIndex=0,a.ytMusicPlaylistTotal=0,f.setTitle("Home"),a.login=function(){d.login(function(b){"connected"===b.status?a.logged=!0:a.logged=!1})},a.getLoginStatus=function(){d.getLoginStatus(function(b){"connected"===b.status?a.logged=!0:a.logged=!1})},a.eventLink="https://www.facebook.com/events/596649333810675",a.fbEvent=[],a.ytMusicList=[],a.formSubmit=function(){var b=a.getUrlPathInfo(this.eventLink,"events/");g.path("/playlist/"+b)},a.getUrlPathInfo=function(a){var b=document.createElement("a");if(b.href=a,"facebook.com"!=b.host&&"www.facebook.com"!=b.host)return!1;var c=/(\d+)/g,d=a.match(c);if(void 0==d[0])return!1;var e=d[0];return e},d.getLoginStatus(function(b){"connected"===b.status?a.logged=!0:a.logged=!1})}]),angular.module("evplaylistsApp").controller("AboutCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("evplaylistsApp").controller("AuthctrlCtrl",["$scope","Facebook",function(a,b){a.login=function(){b.login(function(a){})},a.getLoginStatus=function(){b.getLoginStatus(function(b){"connected"===b.status?a.loggedIn=!0:a.loggedIn=!1})},a.me=function(){b.api("/me",function(b){a.user=b})}}]),angular.module("evplaylistsApp").service("Youtube",["$http","$q",function(a,b){this.getId=function(a){var b=/^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;return void 0==a?!1:a.match(b)?RegExp.$1:!1},this.getData=function(c){var d="AIzaSyCJf9YsNK-d7MvMPg-B_Ov-awo10z816Qw",e="https://www.googleapis.com/youtube/v3/videos?id="+c+"&key="+d+"&part=snippet,contentDetails",f=b.defer();return a.get(e).success(function(a){var b=a.items[0];f.resolve(b)}).error(function(a){f.reject()}),f.promise}}]),angular.module("evplaylistsApp").controller("PlayerCtrl",["$scope","$routeParams","$location","$http","$q","Facebook","Youtube","Page","$interval",function(a,b,c,d,e,f,g,h,i){a.ytMusicId="pT68FS3YbQ4",a.ytMusicPlayerVars={controls:!0},a.ytMusicPlaylistIndex=0,a.ytMusicPlaylistTotal=0,a.ytMusicPlaying=!0,a.eventLink="https://www.facebook.com/events/596649333810675",a.fbEvent=[],a.ytMusicList=[],a.eventId=b.id,a.eventLink="https://www.facebook.com/events/"+a.eventId,a.init=function(){var b=a.eventId;f.api("/"+b+"?fields=id,name",function(b){a.fbEvent.id=b.id,a.fbEvent.title=b.name,h.setTitle("Playlist: "+a.fbEvent.title)}),a.ytMusicList=[],f.api("/"+b+"/feed?fields=link,likes.limit(0).summary(true)&limit=200",function(b){if(void 0!=b.error)return a.loading=!1,a.error.status=!0,a.error.noevent=!0,!1;var c=b.data;angular.forEach(c,function(a,c){b.data[c].rank=a.likes.summary.total_count}),c.sort(function(a,b){return b.rank>a.rank?1:b.rank<a.rank?-1:0}),angular.forEach(b.data,function(b,c){var d=g.getId(b.link);0!=d&&g.getData(d).then(function(b){var c=[];c.ytData=b,c.title=b.snippet.title,c.duration=b.contentDetails.duration,c.ytId=d,a.ytMusicList.push(c),a.ytMusicPlaylistTotal=a.ytMusicList.length,a.ytMusicId=a.ytMusicList[0].ytId,a.loading=!1;var e=document.getElementsByClassName("col-player")[0].offsetHeight+"px";document.getElementsByClassName("music-list")[0].style.height=e})}),a.ytMusicPlayerVars={controls:!0,autoplay:!0}})},a.formSubmit=function(){var b=a.getUrlPathInfo(this.eventLink);c.path("/playlist/"+b)},a.getUrlPathInfo=function(a){var b=document.createElement("a");if(b.href=a,"facebook.com"!=b.host&&"www.facebook.com"!=b.host)return!1;var c=/(\d+)/g,d=a.match(c);if(void 0==d[0])return!1;var e=d[0];return e},a.playerNext=function(){a.ytMusicPlaylistIndex++,a.ytMusicPlaylistIndex==a.ytMusicPlaylistTotal&&(a.ytMusicPlaylistIndex=0),a.ytMusicId=a.ytMusicList[a.ytMusicPlaylistIndex].ytId,a.ytMusicPlaying=!0,a.ytMusicPlayer.playVideo()},a.playerPrevious=function(){a.ytMusicPlaylistIndex--,a.ytMusicPlaylistIndex<0&&(a.ytMusicPlaylistIndex=0),a.ytMusicId=a.ytMusicList[a.ytMusicPlaylistIndex].ytId,a.ytMusicPlaying=!0,a.ytMusicPlayer.playVideo()},a.listItemClick=function(b,c){a.ytMusicPlaylistIndex=c,a.ytMusicId=b.ytId,a.setNewListItemPos(),a.ytMusicPlayer.playVideo()},a.$on("youtube.player.ended",function(b,c){a.playerNext()}),a.$on("youtube.player.ready",function(b,c){a.setNewListItemPos()}),a.$on("youtube.player.playing",function(b,c){a.ytMusicPlaying=!0}),a.$on("youtube.player.paused",function(b,c){a.ytMusicPlaying=!1}),a.setNewListItemPos=function(){var a=document.getElementsByClassName("list-group-item active")[0].offsetTop;document.getElementsByClassName("music-list")[0].scrollTop=a},a.getLoginStatus=function(){f.getLoginStatus(function(b){"connected"===b.status?a.logged=!0:a.logged=!1})},a.$watch(function(){return f.isReady()},function(b){a.logged=!0}),a.logged=!1,a.loading=!0,a.error=[],a.error.status=!1,f.getLoginStatus(function(b){"connected"===b.status?(a.logged=!0,a.init()):(a.logged=!1,c.path("/"))}),i(function(){var a=document.getElementsByClassName("col-player")[0].offsetHeight+"px";document.getElementsByClassName("music-list")[0].style.height=a},1e3)}]),angular.module("evplaylistsApp").factory("Page",["configs",function(a){var b=a.appName;return{getTitle:function(){return b},setTitle:function(b){document.title=a.appName+" - "+b}}}]);