
// 随机数公式
function getYanzhengma(num) {
    var str = '0123456789abcdefghijklmnopqrstuvwxyz';
    var s = '';
    for (var i = 0; i < num; i++) {
        s += str[ujiuye.random(0, str.length - 1)]//随机出下标
    }
    return s;
}
// var yan = getYanzhengma(5);
// console.log(yan);

var offcnloginleft = document.getElementsByClassName('offcnloginleft')[0];
var inputs = offcnloginleft.getElementsByTagName('input');
var oB = document.getElementsByTagName('b');
var form = document.getElementsByTagName('form')[1];
var oStrong = document.getElementsByTagName('strong');
var oEm = offcnloginleft.getElementsByTagName('em');
var span1 = document.getElementsByClassName('span1')[0];
console.log(span1);
console.log(oB, oStrong, oEm, inputs, form);
// 为注册框添加判断
var arr = [];//设置空数组，装判断条件
for (var i = 0; i < inputs.length - 1; i++) {
    //-1是因为最后一个为按钮，所以不要遍历
    arr.push(false)//将false放进arr数组中
}
console.log(arr);
var reg = {
    num: /^1[3-9]\d{9}$/,
    pass: /(?=.*\d.*)(?=.*[a-zA-Z].*)^[0-9a-zA-Z]{6,20}$/,
}

// 验证手机号
inputs[0].onblur = function () {
    var tel = inputs[0].value;
    // console.log(tel);
    // reg.num.test(val)
    if (reg.num.test(tel)) {
        oB[0].style.display = 'inline-block'
        oEm[0].innerHTML = ''
        oStrong[0].innerHTML = '';
        arr[0] = true;
    } else if (tel == '') {
        oB[0].style.display = 'none';
        oStrong[0].innerHTML = '请输入手机号';
        oEm[0].innerHTML = ''
        arr[0] = false
    }
    else {
        oB[0].style.display = 'none';
        oStrong[0].innerHTML = '';
        oEm[0].innerHTML = '账号格式不正确！'
        arr[0] = false
    }
}
// 验证密码

inputs[1].onblur = function () {
    // var reg1 = /(?=.*\d.*)(?=.*[a-zA-Z].*)^[0-9a-zA-Z]{6,20}$/
    var pass = inputs[1].value;
    //  console.log(pass);
    if (reg.pass.test(pass)) {
        oB[1].style.display = 'inline-block'
        oEm[1].innerHTML = '';
        oStrong[1].innerHTML = '';
        arr[1] = true;
    } else if (pass == '') {
        oB[1].style.display = 'none';
        oStrong[1].innerHTML = '请输入密码';
        oEm[1].innerHTML = '';
        arr[1] = false;
    } else {
        oB[1].style.display = 'none';
        oStrong[1].innerHTML = '';
        oEm[1].innerHTML = '密码应该为6-20位之间！'
        arr[1] = false
    }
}
// 确认密码两次校验
inputs[2].onblur = function () {
    var pass2 = inputs[2].value;
    if (pass2 === inputs[1].value) {
        oB[2].style.display = 'inline-block'
        oEm[2].innerHTML = ''
        arr[2] = true;
    } else if (pass2 == '') {
        oB[2].style.display = 'none';
        oStrong[2].innerHTML = '请再次输入密码';
        oEm[2].innerHTML = '';
        arr[2] = false;
    } else {
        oB[2].style.display = 'none';
        oStrong[2].innerHTML = '';
        oEm[2].innerHTML = '两次输入不一样！'
        arr[2] = false
    }
}
// 生成随机验证码
span1.innerHTML = getYanzhengma(5);
// 点击切换验证码
span1.onclick = function () {
    span1.innerHTML = getYanzhengma(5);

}
// 验证码验证
inputs[3].onblur = function () {
    var pass3 = inputs[3].value;
    if (pass3 == span1.innerHTML) {
        oB[3].style.display = 'inline-block'
        oEm[3].innerHTML = ''
        arr[3] = true
    } else if (pass3 == '') {
        oB[3].style.display = 'none';
        oStrong[3].innerHTML = '请输入验证码';
        oEm[3].innerHTML = '';
        arr[3] = false;
    } else {
        oB[3].style.display = 'none';
        oStrong[3].innerHTML = '';
        oEm[3].innerHTML = '验证码输入不正确！'
        arr[3] = false
    }



}
// 短信验证


// 注册.挑转，若有个为空则挑转不成功。onsunmit含有true和flase事件

form.onsubmit = function () {
    var flag = false;//初始状态为禁止注册 
//  按钮点击会检测这些代码
    inputs[3].onblur()
    inputs[1].onblur()
    inputs[2].onblur()
    inputs[0].onblur()
    // 检验数组，全为真则真，一个为假都为假
    var n = arr.every(function (item) {
        return item
    });

    if (n) {
        //如果注册通过，将账号密码存储到本地
        if (localStorage.registers == undefined) {//若为undefined，则加数组
            localStorage.registers = JSON.stringify([]);//先转成字符串。取出的是字符串  自动会转成totring方法，转成obj方法 先下手转成字符串 还保持格式不变
        }

        //获取存储账号密码的数组，往里添加内容
        var arr1 = JSON.parse(localStorage.registers);//获取的是字符串。转成数组
        arr1.push({ "user": inputs[0].value, "pass": inputs[1].value });
         //往数组里添加内容
        //但后台没有加入，重新加进去
        localStorage.registers = JSON.stringify(arr1);
       //成功，跳转到登录页面
        alert("注册成功");
        location.href = "./login.html";
    }

//    console.log(n);
    flag = false;
    return flag;//阻止事件默认行为。
}












