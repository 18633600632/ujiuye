// 广告弹窗
//1.获取元素
var tanchuang = document.getElementsByClassName("tanchuang")[0];
var tanBtn = document.getElementsByClassName("tanBtn")[0];

//2.等待3秒，广告出现 
setTimeout(function () {
    tanchuang.style.display = "block";
}, 3000);


//3.点击关闭按钮，广告隐藏，等待3秒，广告出现 
tanBtn.onclick = function () {
    tanchuang.style.display = "none";
    setTimeout(function () {
        tanchuang.style.display = "block";
    }, 3000);
}


// ============banner轮播图开始
var banner = document.getElementById('banner');
var bannerUl = banner.getElementsByTagName('ul')[0];
var bannerP = banner.getElementsByTagName('p')[0];
var bannerLi = bannerUl.getElementsByTagName('li');
var bannerSpan = bannerP.getElementsByTagName('span');
var leftBtn = document.getElementsByClassName('leftBtn')[0];
var rightBtn = document.getElementsByClassName('rightBtn')[0];
console.log(leftBtn);
var index = 0;

console.log(banner, bannerUl, bannerP);


// 引入图片
ujiuye.ajax({
    "url": "./static/banner.json",
    "type": "get",
    "success": function (res) {
        console.log(res);
        var ulStr = "";
        var pStr = "";
        for (var i = 0; i < res.length; i++) {
            ulStr += '<li><img src="' + res[i].image + '" alt="' + res[i].href + '"></li>';
            pStr += "<span></span>";
        }
        bannerUl.innerHTML = ulStr;
        bannerP.innerHTML = pStr;
        // 初始化样式
        bannerLi[0].style.opacity = 1;
        bannerSpan[0].className = 'active';
        // 划过远点改变图片样式。
        for (var i = 0; i < bannerSpan.length; i++) {
            bannerSpan[i].index = i;
            bannerSpan[i].onmouseover = function () {
                for (var j = 0; j < bannerSpan.length; j++) {
                    //  清除小圆点样式.
                    bannerSpan[j].className = '';
                    //   清楚透明度样式，
                    ujiuye.bufferMove(bannerLi[j], { 'opacity': 0 }, 10)
                }
                bannerSpan[this.index].className = 'active';
                //   引入透明封装函数，使图片透明度切换。
                ujiuye.bufferMove(bannerLi[this.index], { 'opacity': 1 }, 10)
            }
        }
        // 自动切换
        var timer = setInterval(lunbo, 2000);
        function lunbo() {
            index++;
            //判断 当下标等于长度时，返回0.
            if (index == bannerLi.length) {
                index = 0;
            }
            for (var j = 0; j < bannerSpan.length; j++) {
                //  清除小圆点样式.
                bannerSpan[j].className = '';
                //   清楚透明度样式，
                ujiuye.bufferMove(bannerLi[j], { 'opacity': 0 }, 10)
            }
            bannerSpan[index == bannerSpan.length ? 0 : index].className = 'active';
            //   引入透明封装函数，使图片透明度切换。
            ujiuye.bufferMove(bannerLi[index], { 'opacity': 1 }, 10)
            index = this.index;
        }
        // 鼠标移入清楚定时器
        banner.onmouseover = function () {
            clearInterval(timer)
            leftBtn.style.display = 'block'
            rightBtn.style.display = 'block'


        }
        // 鼠标移出定时器开启
        banner.onmouseout = function () {
            timer = setInterval(lunbo, 3000);
            leftBtn.style.display = 'none'
            rightBtn.style.display = 'none'

        }
        rightBtn.onclick = function () {
            lunbo();
        }
        leftBtn.onclick = function () {
            if (index == 0) {
                index = bannerLi.length - 1;
            } else {
                index--;
            }

            for (var j = 0; j < bannerSpan.length; j++) {
                //  清除小圆点样式.
                bannerSpan[j].className = '';
                //   清楚透明度样式，
                ujiuye.bufferMove(bannerLi[j], { 'opacity': 0 }, 10)
            }
            bannerSpan[index].className = 'active';

            //   引入透明封装函数，使图片透明度切换。
            ujiuye.bufferMove(bannerLi[index], { 'opacity': 1 }, 10)
        }
    }

})
// ============banner轮播图结束
// 热门直播开始===================

var hotBox1 = document.getElementsByClassName('hotBox1')[0];
var hotBoxR = document.getElementsByClassName('hotBoxR')[0];
var hotUl = hotBoxR.getElementsByTagName('ul')[0];
var hotLi = hotUl.getElementsByTagName('li');
var hotBoxL = document.getElementsByClassName('hotBoxL');
var leftImg = hotBox1.getElementsByTagName('img');
console.log(hotBoxL, hotBoxR, hotUl, hotLi);
var index = 0;
ujiuye.ajax({
    "url": "./static/hotmove.json",
    "type": "get",
    "success": function (res) {
        console.log(res);
        var hotr = '';
        var hotl = '';
        for (var i = 0; i < res.length; i++) {
            // 右侧标题栏
            hotr += ' <li class="tab_title"><div><span>' + res[i].time + '</span><i>' + res[i].time2 + '</i></div><h6><a href="' + res[i].href + '">' + res[i].class + '</a></h6></li>';

            hotl += ' <div class="hotBoxL pr tab_body"><img src="' + res[i].img + '" alt="' + res[i].href + '" id="leftImg"><span>' + res[i].time + '</span><p>' + res[i].class + '</p></div>'

        }
        hotUl.innerHTML = hotr;
        hotBox1.innerHTML = hotl;
        //  初始化样式
        hotBoxL[0].style.display = 'block';
        hotLi[0].className = "on";

        // 点击标题，改变自己的样式，切换到对应的模块，
        for (var i = 0; i < hotLi.length; i++) {
            hotLi[i].index = i;

            hotLi[i].onmouseover = function () {
                for (var j = 0; j < hotLi.length; j++) {
                    hotLi[j].className = ""
                    hotBoxL[j].style.display = "none"
                }
                this.className = "on";
                hotBoxL[this.index].style.display = "block"
            }
        }
    }
})

// 热门直播结束===================
// 精品网课开始==================
var list_title = document.getElementsByClassName('list_title')[0];
var lis = list_title.getElementsByTagName('li');
// console.log(list_title,lis);
var list_body = document.getElementsByClassName('list_body')[0];
var Olis = list_body.getElementsByTagName('li');
// console.log(list_body,Olis);

ujiuye.ajax({
    "url": "./static/relatedClass.json",
    "type": "get",
    "success": function (res) {
        console.log(res);
        // 初始化页面 设置自定义属性tag数据名，数据和标签一一对应，显示第一列表的内容。保证传入数据是对应的。
        console.log(lis[0].getAttribute('tag'));
        // 显示第一张数据
        var tag = lis[0].getAttribute('tag');
        var tag1 = res[lis[0].getAttribute('tag')]
        var good = '';
        for (var i = 0; i < tag1.length; i++) {
            console.log(tag1[i]);//将数据渲染出来
            good += ' <li class="fl"><div><a href="' + tag1[i].href + '"><img src="' + tag1[i].img + '" alt=""></a><h6><a href="">' + tag1[i].title + '</a></h6><p class="clearfix"> <span class="fr">￥' + tag1[i].price + '</span><i class="fl">' + tag1[i].time + '</i> </p></div></li> '
        }
        // 将后台数据渲染到页面中。
        list_body.innerHTML = good;
        lis[0].className = 'on';
        // 点击标题，改变自己的样式，切换到对应的模块，
        for (var i = 0; i < lis.length; i++) {
            lis[i].onmouseenter = function () {
                //    自动义属性连接图片切换 
                tag1 = res[this.getAttribute('tag')]
                //console.log(this.getAttribute('tag'));
                console.log(tag1);//点击每一个标题出现的对应数据
                var good = '';
                for (var i = 0; i < tag1.length; i++) {
                    console.log(tag1[i]);//将数据渲染出来
                    good += ' <li class="fl"><div><a href="' + tag1[i].href + '"><img src="' + tag1[i].img + '" alt=""></a><h6><a href="">' + tag1[i].title + '</a></h6><p class="clearfix"> <span class="fr">￥' + tag1[i].price + '</span><i class="fl">' + tag1[i].time + '</i> </p></div></li> '
                }
                list_body.innerHTML = good;
                // 点击标题，改变自己的样式，
                for (var i = 0; i < lis.length; i++) {
                    lis[i].index = i;
                    lis[i].onmouseover = function () {
                        for (var j = 0; j < lis.length; j++) {
                            lis[j].className = ""

                        }
                        this.className = "on";

                    }
                }


            }

        }

    }
})
// 精品网课结束==================


// 免费课程开始==================
var freeL = document.getElementById('freeL');
var freeUl = freeL.getElementsByTagName('ul');
var freeLi = freeUl[0].getElementsByTagName('Li');
console.log(freeL, freeLi, freeUl);
var freeLis = freeUl[1].getElementsByTagName('Li');
console.log(freeL, freeLis, freeUl);
ujiuye.ajax({
    "url": "./static/relatedClass.json",
    "type": "get",
    "success": function (res) {
        console.log(res);
        // 初始化页面 设置自定义属性tag数据名，数据和标签一一对应，显示第一列表的内容。保证传入数据是对应的。
        console.log(freeLi[0].getAttribute('tag'));
        // 显示第一张数据
        var tag = freeLi[0].getAttribute('tag');
        var tag1 = res[freeLi[0].getAttribute('tag')]
        var good = '';
        for (var i = 0; i < tag1.length; i++) {
            console.log(tag1[i]);//将数据渲染出来
            good += ' <li class="fl"><div><a href="' + tag1[i].href + '"><img src="' + tag1[i].img + '" alt=""></a><h6><a href="">' + tag1[i].title + '</a></h6><p class="clearfix"> <span class="fr">￥' + tag1[i].price + '</span><i class="fl">' + tag1[i].time + '</i> </p></div></li> '
        }
        // 将后台数据渲染到页面中。
        freeUl[1].innerHTML = good;
        freeLi[0].className = 'on';
        // 点击标题，改变自己的样式，切换到对应的模块，
        for (var i = 0; i < freeLi.length; i++) {
            freeLi[i].onmouseenter = function () {
                //    自动义属性连接图片切换 
                tag1 = res[this.getAttribute('tag')]
                //console.log(this.getAttribute('tag'));
                console.log(tag1);//点击每一个标题出现的对应数据
                var good = '';
                for (var i = 0; i < tag1.length; i++) {
                    console.log(tag1[i]);//将数据渲染出来
                    good += ' <li class="fl"><div><a href="' + tag1[i].href + '"><img src="' + tag1[i].img + '" alt=""></a><h6><a href="">' + tag1[i].title + '</a></h6><p class="clearfix"> <span class="fr">￥' + tag1[i].price + '</span><i class="fl">' + tag1[i].time + '</i> </p></div></li> '
                }
                freeUl[1].innerHTML = good;
                // 点击标题，改变自己的样式，
                for (var i = 0; i < freeLi.length; i++) {
                    freeLi[i].index = i;

                    freeLi[i].onmouseover = function () {
                        for (var j = 0; j < freeLi.length; j++) {
                            freeLi[j].className = ""

                        }
                        this.className = "on";

                    }
                }
            }
        }
    }
})

// 免费课程结束==================
// 就业面授班开始================

var workL = document.getElementById('workL');
var workUl = workL.getElementsByTagName('ul');
var workLi = workUl[0].getElementsByTagName('Li');
console.log(workL, workLi, workUl);
var workLis = workUl[1].getElementsByTagName('Li');
console.log(workL, workLis, workUl);
ujiuye.ajax({
    "url": "./static/relatedClass.json",
    "type": "get",
    "success": function (res) {
        console.log(res);
        // 初始化页面 设置自定义属性tag数据名，数据和标签一一对应，显示第一列表的内容。保证传入数据是对应的。
        console.log(workLi[0].getAttribute('tag'));
        // 显示第一张数据
        var tag = workLi[0].getAttribute('tag');
        var tag1 = res[workLi[0].getAttribute('tag')]
        var good = '';
        for (var i = 0; i < tag1.length; i++) {
            console.log(tag1[i]);//将数据渲染出来
            good += ' <li class="fl"><div><a href="' + tag1[i].href + '"><img src="' + tag1[i].img + '" alt=""></a><h6><a href="">' + tag1[i].title + '</a></h6><p class="clearfix"> <span class="fr">￥' + tag1[i].price + '</span><i class="fl">' + tag1[i].time + '</i> </p></div></li> '
        }
        // 将后台数据渲染到页面中。
        workUl[1].innerHTML = good;
        workLi[0].className = 'on';
        // 点击标题，改变自己的样式，切换到对应的模块，
        for (var i = 0; i < workLi.length; i++) {
            workLi[i].onmouseenter = function () {
                //    自动义属性连接图片切换 
                tag1 = res[this.getAttribute('tag')]
                //console.log(this.getAttribute('tag'));
                console.log(tag1);//点击每一个标题出现的对应数据
                var good = '';
                for (var i = 0; i < tag1.length; i++) {
                    console.log(tag1[i]);//将数据渲染出来
                    good += ' <li class="fl"><div><a href="' + tag1[i].href + '"><img src="' + tag1[i].img + '" alt=""></a><h6><a href="">' + tag1[i].title + '</a></h6><p class="clearfix"> <span class="fr">￥' + tag1[i].price + '</span><i class="fl">' + tag1[i].time + '</i> </p></div></li> '
                }
                workUl[1].innerHTML = good;
                // 点击标题，改变自己的样式，
                for (var i = 0; i < workLi.length; i++) {
                    workLi[i].index = i;

                    workLi[i].onmouseover = function () {
                        for (var j = 0; j < workLi.length; j++) {
                            workLi[j].className = ""

                        }
                        this.className = "on";

                    }
                }
            }
        }
    }
})

// 就业面授班结束================
// 列表部分开始================
var listChange = document.getElementById('listChange');
var oDt = listChange.getElementsByTagName('dt')[0];
var oSpan = oDt.getElementsByTagName('span');
var oDd = listChange.getElementsByTagName('dd');
console.log(oDt, oSpan, listChange, oDd);
for (var i = 0; i < oSpan.length; i++) {
    oSpan[i].index = i;
    oSpan[i].onmouseenter = function () {
        for (var j = 0; j < oSpan.length; j++) {
            oSpan[j].className = ""
            oDd[j].style.display = "none"
        }
        this.className = "on";
        oDd[this.index].style.display = "block"
    }
}
// 列表部分结束================