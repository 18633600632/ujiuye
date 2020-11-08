
// 登录成功后，登录注册按钮隐藏，显示头像
// 判断是否登录成功
var eLogin=document.getElementById('eLogin');
var oAa=eLogin.getElementsByTagName('a');
console.log(eLogin,oAa);
if(localStorage.isLogin == 'true'){
    oAa[2].style.display='block'
    console.log(localStorage.isLogin);
    oAa[1].style.display='none'; 
    oAa[0].style.display='none'; 
}
// 是够要退出登录。
oAa[2].onclick=function(){
    if(confirm('是否确定要退出登录')){
            localStorage.isLogin=false;
            console.log(localStorage.isLogin);
            // localStorage.clear();
            oAa[0].style.display='inline-block'
            oAa[1].style.display='inline-block'; 
            oAa[2].style.display='none'
        }
       
    }
   









// ===============导航栏左侧点击出框开始
var e_nd=document.getElementsByClassName('e_nd');

console.log(e_nd);
for(var i =0;i<e_nd.length;i++){
    e_nd[i].onmouseenter=function(){
    this.em = document.createElement('em');//作为e_nd自定义属性
    this.appendChild(this.em);

    } 
    e_nd[i].onmouseout=function(){
        this.appendChild(this.em);
        this.removeChild(this.em);
      } 
}

// ===============导航栏左侧点击出框结束
//============== 导航搜索栏开始
var formSecher =document.getElementsByClassName('formSecher')[0];
var eSecher=document.getElementsByClassName('eSecher')[0];
var eText=document.getElementsByClassName('eText')[0];
// console.log(formSecher,eSecher,eText);
// 鼠标划上搜索框出现
formSecher.onmouseenter=function(){
    formSecher.style.width='148px';
    eSecher.style.width='146px';
    eText.style.width='115px';
    eSecher.style.borderColor='#ccc'
    eText.focus()
}

// 鼠标离开搜索框消失 失去焦点
eText.onblur=function(){
    formSecher.style.width='28px';
    eSecher.style.width='26px';
    eText.style.width='0px';
    eSecher.style.borderColor='transparent' 
}
//============== 导航搜索栏结束