// 点击按钮，返回顶部
var myBtn = document.getElementById('myBtn');
window.onscroll = function(){
    //获取滚动距离
    var scrollT = document.documentElement.scrollTop || document.body.scrollTop;
    if(scrollT >= 1500){
        myBtn.style.display = "block";
    }else{
        myBtn.style.display = "none";
    }
}
myBtn.onclick=function(){
    var scrollT = document.documentElement.scrollTop || document.body.scrollTop;
    var timer = setInterval(function(){
        scrollT -= 50;
        document.documentElement.scrollTop=document.body.scrollTop = scrollT;
        if(scrollT <= 0){
            clearInterval(timer);
        }
    },10);
   
}

// 右侧咨询框
var abab=document.getElementById('abab');
var a = document.getElementById('a');
var flag=true;
a.onclick=function(){
    if(flag){
        ujiuye.move(abab, 'right', 10, 0);
        ujiuye.move(a, 'top', 10, 170);

        flag=false;
    }else{
    ujiuye.move(abab, 'right', 10, -161); 
    ujiuye.move(a, 'top', 10, 100);
    flag=true;
    }
    
}

