var xk_list = document.getElementsByClassName('xk_list')[0];
var lis = xk_list.getElementsByTagName('li');
console.log(xk_list, lis);
var arr = [];//空数组  存储原始数据。
ujiuye.ajax({
    "url": "./static/movelist1.json",
    "type": "get",
    "success": function (res) {
        // 循环，将里面的值，一个一个拿出来。
        for (var i = 0; i < res.length; i++) {
            arr[i] = res[i]
        }
        console.log(res);
        showClass(res)
        sort(res)
        filterClass(res)
    }
});
// 2.渲染数据
function showClass(res) {
    var cou = '';
    for (var i = 0; i < res.length; i++) {
        cou += `<li><dl><dt><a href="${res[i].href}" target="_blank"><img src="${res[i].img}" alt="${res[i].href}" title="${res[i].title}"></a></dt><dd><a href="${res[i].href}" title="${res[i].title}" target="_blank">${res[i].title}</a><p> <em>|</em> <b>${res[i].count == 0 ? '' : '共有' + res[i].count + '人在学'}</b> | <span class=${res[i].type == '免费' ? "green" : "orange"}>${res[i].type == '免费' ? "免费" : '￥' + res[i].price}</span></p></dd></dl></li>`
    }
    xk_list.innerHTML = cou;
}

var xk_nav = document.getElementsByClassName('xk_nav')[0];
var oSpan = xk_nav.getElementsByTagName('span');
console.log(xk_nav, oSpan);
//   排序
function sort(res) {
    //    添加点击事件
    for (var i = 0; i < oSpan.length; i++) {
        oSpan[i].index = i;

        oSpan[i].onclick = function () {
            var _this = this;
            for (var j = 0; j < oSpan.length; j++) {
                // 只能把active去掉。
                oSpan[j].className = oSpan[j].className.replace('active', '').trim();
            }
            this.className += ' active';
            // 若是综合，不需要排序，返回原始位置就可以。在外面存储了一个原始数组arr
            if (_this.getAttribute('data_url') == 'list1') {
                showClass(arr);//原来数组
                return;
            }
            // 排序
            res.sort(function (a, b) {
                //自定义属性
                switch (_this.getAttribute("data_url")) {
                    case "list1": break;
                    case "count": return b.count - a.count; break;
                    case "data": return a.count - b.count; break;
                    case "price1": _this.className = "xk_jg xk_jg1 active"; return b.price - a.price; break;
                    case "price2": _this.className = "xk_jg xk_jg2 active"; return a.price - b.price; break;
                }
            });
            showClass(res);
            // 价格升序降序，改变class类名图片。
            //如果点到其他按钮，则设置为默认，降序排列。
            if (this.getAttribute('data_url').indexOf('price') == -1) {
                oSpan[3].setAttribute('data_url', 'price1')
            } else if (this.getAttribute('data_url') == 'price1') {
                //如果点击的就是降序按钮，而且是price1，改为价格2
                this.setAttribute('data_url', 'price2')
            } else {
                // //如果点击的就是升序按钮，而且是price2，改为价格1
                oSpan[3].setAttribute('data_url', 'price1')
            }
        }
    };



}

//只看免费或付费
var mfkc = document.getElementsByClassName('mfkc');
console.log(mfkc);
function filterClass(res) {
    mfkc[0].onclick = function () {
        var s = res.filter(function (value) { //挑选 返回新数组
            return value.type == '免费';

        })
        //重新渲染 
        showClass(s)
        this.className += ' on'
        mfkc[1].className='mfkc'// 点击另一节点时，样式恢复原来初始。
    }
    mfkc[1].onclick = function () {
        var s = res.filter(function (value) { //挑选 返回新数组
            return value.type == '付费';

        })
        //重新渲染 
        showClass(s)
        this.className += ' on'
        mfkc[0].className='mfkc'
    }
}


