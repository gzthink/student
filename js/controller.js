/**
 * Created by Dell on 2017/9/2.
 */
myapp.controller("mycontroller",function ($scope,$http,loadnav,loadstuinfo,insertstu) {
    //加载导航栏基本信息
    loadnav.navinfo($http).then(function (res) {
        $scope.navcontent=res.data;
    });
    //导航栏点击变化
    $scope.nav_click = function (index) {
        var len=$scope.navcontent.length;
        for(var i=0;i<len;i++)
        {
            $scope.navcontent[i].isclick=false;
        }
        $scope.navcontent[index].isclick=!$scope.navcontent[index].isclick;
    };
    //恢复默认导航栏状态
    $scope.navinit=function () {
        var len=$scope.navcontent.length;
        for(var i=0;i<len;i++)
        {
            $scope.navcontent[i].isclick=false;
        }
    }
    //请求学生的基本数据
   loadstuinfo.stuinfo($http).then(function (res) {
       insertstu.insertinfo(res.data);
   });
}).controller("browsecontroller",function ($scope,$http,insertstu) {
       //浏览所有学生信息
       $scope.isshow=false;
       $scope.stuinformation=insertstu.selectstu()[0];
       //点击某个学生单独显示该学生的信息
       $scope.clicktr=function (obj,index) {
          $scope.isshow=true;
          $scope.infomation=obj;
          obj.iscolor=true;
       }
       //关闭单独显示模块
       $scope.closeinfo=function () {
           $scope.isshow=false;
           for(key in $scope.stuinformation)
           {
               if($scope.stuinformation[key].iscolor)
               {
                   $scope.stuinformation[key].iscolor=false;
               }
           }
       }
    }).controller("searchcontroller",function ($scope,$http,loadselect,insertstu,selectdetails) {
        //分类浏览学生信息
       //查询类型
       $scope.selecttext='';
       $scope.changeinfo=function () {
           loadselect.select($http).then(function (res) {
               $scope.text=res.data[$scope.selecttext];
           })
       }
       //具体查询条件
       $scope.selectinfo='';
       //点击查询按钮，按所选条件查询学生信息
       $scope.startsearch=function (data) {
          $scope.selectstu=selectdetails.details(insertstu.selectstu()[0],$scope.selectinfo,$scope.selecttext);
       }
}).controller("stuinfocontroller",function ($scope,$http,searchstuinfo,insertstu) {
    //按照学号查询学生详细信息，可修改
    $scope.id='';
    $scope.isshow=false;
    //点击查询按钮按照学号查询学生详细信息
    $scope.btn_search=function () {
        if(searchstuinfo.searchinfo($scope.id,insertstu.selectstu()[0]).length!=0)
        {
            $scope.isshow=true;
            $scope.infomation=searchstuinfo.searchinfo($scope.id,insertstu.selectstu()[0]);
        }
        else{
            alert("该学号没有对应的学生！")
        }
    }
    $scope.isdisabled=true;
    $scope.chage_btn=function () {
        $scope.isdisabled=false;
        //信息更新有小问题
    }
    $scope.save_btn=function () {
        $scope.isdisabled=true;
    }
}).controller("deletecontroller",function ($scope,insertstu,addclass,deletestuinfo,zhenglishuju) {
   $scope.num=addclass.classinfo(insertstu.selectstu()[0]);
   //点击删除学生
   $scope.deleteinfo=function (num,a) {
        deletestuinfo.delete(num,a,$scope.num);
        //删除后整合当前学生信息
       //信息更新
       insertstu.selectstu()[0]=zhenglishuju.zhengli($scope.num);
   }
}).controller("allscorecontroller",function ($scope,insertstu) {
    $scope.allstu=insertstu.selectstu()[0];
}).controller("searchscorecontroller",function ($scope,insertstu,searchstuinfo,updateinfo) {
    $scope.id="";
    $scope.isedit=true;
    $scope.searchscore=function () {
       $scope.stugrade=searchstuinfo.searchinfo($scope.id,insertstu.selectstu()[0]);
    }
    //点击可编辑学生个人成绩，但颜色变化有点问题
    $scope.grageclick=function () {
        $scope.isedit=false;
    }
    //编辑单个学生成绩后更新数据
    $scope.confirm_change=function () {
        insertstu.selectstu()[0]=updateinfo.update(insertstu.selectstu()[0],$scope.stugrade);
    }
}).controller("unpassscorecontroller",function ($scope,insertstu) {
    $scope.score=insertstu.selectstu()[0];
}).controller("teachinfocontroller",function ($scope) {

}).controller("plancontroller",function ($scope) {

}).controller("deletescorecontroller",function ($scope,insertstu,deletescore) {
    $scope.allstu=insertstu.selectstu()[0];
    $scope.deletescores=function (a,b) {
        //全局数据更新
        insertstu.selectstu()[0]=deletescore.delete(a,b,$scope.allstu);
    }
});
