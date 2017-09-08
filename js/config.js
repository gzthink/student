/**
 * Created by Dell on 2017/9/4.
 */
myapp.config(["$routeProvider",function ($routeProvider){
    $routeProvider.when("/first",{templateUrl:"./view/first.html",controller:""})
                  .when("/welcome",{templateUrl:"./view/welcome.html",controller:""})
                  .when("/browse",{templateUrl:"./view/browse.html",controller:"browsecontroller"})
                  .when("/search",{templateUrl:"./view/search.html",controller:"searchcontroller"})
                  .when("/stuinfo",{templateUrl:"./view/stuinfo.html",controller:"stuinfocontroller"})
                  .when("/delete",{templateUrl:"./view/delete.html",controller:"deletecontroller"})
                  .when("/allscore",{templateUrl:"./view/allscore.html",controller:"allscorecontroller"})
                  .when("/searchscore",{templateUrl:"./view/searchscore.html",controller:"searchscorecontroller"})
                  .when("/unpassscore",{templateUrl:"./view/unpassscore.html",controller:"unpassscorecontroller"})
                  .when("/deletescore",{templateUrl:"./view/deletescore.html",controller:"deletescorecontroller"})
                  .when("/teachinfo",{templateUrl:"./view/teachinfo.html",controller:"teachinfocontroller"})
                  .when("/plan",{templateUrl:"./view/plan.html",controller:"plancontroller"});
}]);