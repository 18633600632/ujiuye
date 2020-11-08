// 上 播放页开始====================
var zg_shipin = document.getElementsByClassName('zg_shipin')[0];
var video = document.getElementsByTagName('video');
var tablecont = document.getElementsByClassName('tablecont')[0];
var oUl = tablecont.getElementsByTagName('ul')[0];
var oLi = oUl.getElementsByTagName('li'); console.log(video, oUl, oLi);
ujiuye.ajax({
    "url": "./static/movedel.json",
    "type": "get",
    "success": function (res) {
        // console.log(res);
        var videoL = '';
        var titleL = '';
        for (var i = 0; i < res.length; i++) {
            //左侧视频列表
            videoL += '<video src="' + res[i].src + '" controls width="100%" height="100%"></video>'
            //右侧标题列表
            titleL += '<li class="clearfix"><p class="fl"><a href="">' + res[i].title + '</a><span>[' + res[i].time + ']</span> </p></li>'

        }
        zg_shipin.innerHTML = videoL;
        video[0].style.display = 'block';
        oUl.innerHTML = titleL;

        // 点击标题，切换到对应的模块，
        for (var i = 0; i < oLi.length; i++) {
            oLi[i].index = i;
            oLi[i].onclick = function () {
                for (var j = 0; j < oLi.length; j++) {
                    video[j].style.display = 'none';
                }
                video[this.index].style.display = 'block';
            }
        }


    }

})
// 上 播放页结束====================
// 下 列表页开始==================
var zg_xgkc_cont = document.getElementsByClassName('zg_xgkc_cont')[0];
var classLi = zg_xgkc_cont.getElementsByTagName('li');
ujiuye.ajax({
    "url": "./static/movelist.json",
    "type": "get",
    "success": function (res) {
        //  console.log(res);
        var classL = '';
        for (var i = 0; i < res.length; i++) {
            classL +='<li class="fl"><a href=""><img src="'+ res[i].img+'" alt="'+res[i].href+'"></a><a href="" class="name">'+ res[i].title+'</a><em>￥'+ res[i].price+'</em><span>￥'+ res[i].price+'</span><a href="'+res[i].href+'" target="_blank">'+ res[i].type+'</a><p><b>'+res[i].count+'课时</b><i>'+ res[i].data+'</i></p></li>'
        }
        zg_xgkc_cont.innerHTML=classL;
    }
})


// 下 列表页结束==================
// 添加评论开始====================
var inp1=document.getElementsByClassName('inp1')[0];
var inp2=document.getElementsByClassName('inp2')[0];
var plSpan=document.getElementById('plSpan');
var pl1=document.getElementById('pl1');
// console.log(inp1,inp2,plSpan,pl1);
inp2.onclick=function(){
var cLi = document.createElement("li");
cLi.innerHTML = "第"+(pl1.children.length)+"楼："+inp1.value;
 //加在第一个孩子的前面
 pl1.insertBefore(cLi,pl1.children[0]);
}










// 添加评论结束====================
