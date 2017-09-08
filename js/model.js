/**
 * Created by Dell on 2017/9/2.
 */
var myapp=angular.module("myapp",["ngRoute"]);
myapp.factory("loadnav",function () {
    //请求数据
    return {
        navinfo:function (http) {
            //当前angualr版本1.3.2
            // 取消了success 和 error方法
            //用then和catch代替上面的两个方法
            return http.get("./data/nav.txt").then(function (data) {
                return data;
            })
        }
    }
}).factory("loadstuinfo",function () {
    //请求学生信息数据
    return {
        stuinfo:function (http) {
            return http.get("./data/stu.txt").then(function (data) {
                return data;
            })
        }
    }
}).factory("loadselect",function () {
    return {
        select:function (http) {
            return http.get("./data/select.txt").then(function (data) {
                return data;
            })
        }
    }
}).factory("selectdetails",function () {
    //按照条件查询
    //data为所有的学生信息
    //res为具体的查询条件
    //wav选择的查询方式
    return {
        details:function (data,res,wav) {
            var arr=[];
            switch(wav)
            {
                case "0":
                    //按照性别查询
                    for(var i=0;i<data.length;i++)
                    {
                        if(data[i].sex==res)
                        {
                            arr.push(data[i]);
                        }
                    }
                    return arr;
                    break;
                case "1":
                    //按照年龄查询
                    var min=res.split('-')[0];
                    var max=res.split('-')[1];
                    for(var j=0;j<data.length;j++)
                    {
                        if(data[j].age<max && data[j].age>=min)
                        {
                            arr.push(data[j]);
                        }
                    }
                    return arr;
                    break;
                case "2":
                    //按照班级查询
                    for(var k=0;k<data.length;k++)
                    {
                        if(data[k].class==res)
                        {
                            arr.push(data[k]);
                        }
                    }
                    return arr;
                    break;
            }
        }
    }
}).factory("insertstu",function () {
    var stu=[];
    return {
        //确定查询结果
        insertinfo:function (a) {
            stu.push(a);
        },
        //返回查询结果
        selectstu:function () {
            return stu;
        }
    }
}).factory("searchstuinfo",function () {
    //按照学号查询学生详细信息
    return {
        searchinfo:function (match,data) {
            var stu=[];
            for(var i=0;i<data.length;i++)
            {
                if(match==data[i].id)
                {
                    stu=data[i];
                }
            }
            if(stu.length==0)
            {
                alert("该学号没有对应的学生");
            }
            return stu;
        }
    }
}).factory("updateinfo",function () {
    return {
        update:function(data,changgeinfo){
            for(var i=0;i<data.length;i++)
            {
                if(changgeinfo.id==data[i].id)
                {
                    data[i]=changgeinfo;
                }
            }
            return data;
        }
    }
}).factory("deletestuinfo",function () {
    return {
        delete:function (num,a,allnum) {
            //删除整个班级
            if(a==undefined)
            {
                for(var i=0;i<allnum.length;i++)
                {
                    if(allnum[i].num==num)
                    {
                        allnum.splice(i,1);
                    }
                }
            }
            //删除某个班级里的某个学生
            else{
                for(var j=0;j<allnum.length;j++)
                {
                    if(allnum[j].num==num)
                    {
                        for(var k=0;k<allnum[j].pc.length;k++)
                        {
                            if(allnum[j].pc[k].id==a)
                            {
                                allnum[j].pc.splice(k,1);
                                allnum[j].count-=1;
                                if(allnum[j].pc.length==0)
                                {
                                    allnum.splice(j,1);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
})
    .factory("addclass",function () {
    //添加班级
    return {
        classinfo:function (data) {
            var num=[];
            num.push({"num":data[0].class,"count":0,"pc":[]});
            for(var i=0;i<data.length;i++)
            {
                var istrue=false;
                for(var k=0;k<num.length;k++)
                {
                    if(data[i].class==num[k].num)
                    {
                        num[k].count+=1;
                        num[k].pc.push(data[i]);
                        istrue=true;
                    }
                }
                if(!istrue)
                {
                    num.push({"num":data[i].class,"count":0,"pc":[]});
                }
            }
            return num;
        }
    }
}).factory("deletescore",function () {
    return {
        delete: function (data,scorename,alldata) {
            for (key in data) {
                if (key==scorename) {
                    data[key] = '';
                }
            }
            //刷新当前数据数据
            for(var i=0;i<alldata.length;i++) {
                if (alldata[i].id == data.id)
                {
                    alldata[i]=data;
                }
            }
            console.log(alldata);
            return alldata;
        }
    }
}).factory("zhenglishuju",function () {
    return {
        zhengli:function (num) {
            var info=[];
            for(key in num)
            {
                var value=num[key].pc;
                //整合信息存在问题
                for(var key2 in value)
                {
                    info.push(value[key2]);
                }
            }
            return info;
        }
    }
});

