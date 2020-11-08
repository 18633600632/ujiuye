(function () {
    var classPlan = document.getElementById("classPlan");
    var planList = classPlan.getElementsByClassName("planList")[0];
    var oA = planList.getElementsByTagName("a");
    var planUl = classPlan.getElementsByClassName("planDel")[0];
    var planLi = planUl.getElementsByTagName("li");
    var classDel = document.getElementById("classDel");
    var classLi = classDel.getElementsByTagName("li");
    var classFour = document.getElementById("classFour");
    var classDiv = classFour.getElementsByTagName("div");
    var bodyWhite = document.getElementsByClassName("bodyWhite")[0];
    var poskuai = bodyWhite.getElementsByClassName("poskuai")[0];
    var down = poskuai.getElementsByClassName("down")[0];
    var height = poskuai.offsetTop;
    console.log(location.hash);
    function change(){
        for(var i = 0;i<oA.length;i++){
            oA[i].onclick  = function(){
                if(localStorage.isLogin != "true"){//本地存储  登录状态
                    alert("请登录");
                    //跳转到登录页面
                    location.href = "./login.html";
                    return false;
                }
            } 
        }
    }

    



    function showList(res) {
        var str = "";
        for (i = 0; i < res.length; i++) {
            str += '<li class="clearfix"><i class="' + res[i].icon + '"></i><p>' + res[i].title + '</p><span class="listTime">' + res[i].time + '</span><a class="listStudy" href="./play.html#3">报名学习</a></li>'
        }
        return str;
    }


    window.onscroll = function () {
        var scrollTop = document.documentElement.scrollTop;

        if (scrollTop >= height) {
            poskuai.className = "poskuai clearfix posAct";
            down.style.display = "block"
        } else {
            poskuai.className = "poskuai clearfix";
            down.style.display = "none"
        }

        for (var i = 0; i < classLi.length; i++) {
            classLi[i].index = i;
            classLi[i].onclick = function () {
                for (var j = 0; j < classLi.length; j++) {
                    classLi[j].className = ""
                    classDiv[j].style.display = "none";
                }
                classLi[this.index].className = "classAct";
                classDiv[this.index].style.display = "block";
                if (scrollTop >= height) {
                    document.documentElement.scrollTop = height-10;
                }
            }
        }
    }



    for (var i = 0; i < classLi.length; i++) {
        classLi[i].index = i;
        classLi[i].onclick = function () {
            for (var j = 0; j < classLi.length; j++) {
                classLi[j].className = ""
                classDiv[j].style.display = "none";
            }
            classLi[this.index].className = "classAct";
            classDiv[this.index].style.display = "block";
        }
    }



    ujiuye.ajax({
        "url": "static/movedel.json",
        "type": "get",
        "success": function (res) {
            //页面初始化
            planList.innerHTML = showList(res);
            change();

            //点击全部
            planLi[0].onclick = function () {
                for (var j = 0; j < planLi.length; j++) {
                    planLi[j].className = "";
                }
                planList.innerHTML = showList(res);
                planLi[0].className = "planAct";
                

            }
            //点击直播
            planLi[1].onclick = function () {
                for (var j = 0; j < planLi.length; j++) {
                    planLi[j].className = "";
                }
                var str1 = "";
                for (i = 0; i < res.length; i++) {
                    if (res[i].icon === "iconfont icon-zhibo-") {
                        str1 += '<li class="clearfix"><i class="' + res[i].icon + '"></i><p>' + res[i].title + '</p><span class="listTime">' + res[i].time + '</span><a class="listStudy" herf="#">报名学习</a></li>'
                    }
                }
                planList.innerHTML = str1;
                planLi[1].className = "planAct";


            }
            //点击视频
            planLi[2].onclick = function () {
                for (var j = 0; j < planLi.length; j++) {
                    planLi[j].className = "";
                }
                var str2 = "";
                for (i = 0; i < res.length; i++) {
                    if (res[i].icon === "iconfont icon-ziyuan") {
                        str2 += '<li class="clearfix"><i class="' + res[i].icon + '"></i><p>' + res[i].title + '</p><span class="listTime">' + res[i].time + '</span><a class="listStudy" herf="#">报名学习</a></li>'
                    }
                }
                planList.innerHTML = str2;
                planLi[2].className = "planAct";

            }


            var olistStudy = document.getElementsByClassName("listStudy")[0];
            olistStudy.onclick = function(){
                if(localStorage.isLogin != "true"){
                    alert("请登录");
                    setTimeout(function(){
                        location.href = "login.html#3";
                    },1000);
                    return false;
                }
            }
        }
    });

    
})()

