console.log(location.hash);//哈希值，


var offcnloginleft = document.getElementsByClassName('offcnloginleft')[0];
var form = offcnloginleft.getElementsByTagName('form')[0];
var inputs = form.getElementsByTagName('input');
var oEm = form.getElementsByTagName('em');
var oB = form.getElementsByTagName('b');
console.log(form, inputs, oEm, oB);

// 为注册框添加判断
var arr = [];//设置空数组，装判断条件
for (var i = 0; i < inputs.length - 1; i++) {
    //-1是因为最后一个为按钮，所以不要遍历
    arr.push(false)//将false放进arr数组中
}
// console.log(arr);



// 验证手机号
inputs[0].onblur = function () {
    var reg0 = /^1[3-9]\d{9}$/;
    var tel = inputs[0].value;
    // console.log(tel);
    if (reg0.test(tel)) {
        oB[0].style.display = 'inline-block'
        oEm[0].innerHTML = ''

        arr[0] = true;
    } else {
        oB[0].style.display = 'none';

        oEm[0].innerHTML = '账号输入不正确！'
        arr[0] = false
    }
}
// 验证密码

inputs[1].onblur = function () {
    var reg1 = /(?=.*\d.*)(?=.*[a-zA-Z].*)^[0-9a-zA-Z]{6,20}$/
    var pass = inputs[1].value;
    //  console.log(pass);
    if (reg1.test(pass)) {
        oB[1].style.display = 'inline-block'
        oEm[1].innerHTML = '';
        arr[1] = true;
    } else {
        oB[1].style.display = 'none';
        oEm[1].innerHTML = '密码输入不正确'
        arr[1] = false
    }
}
// 登录.挑转，若有个为空则登录。onsunmit含有true和flase事件

//1.点击登录验证
form.onsubmit = function () {
    // 让两个input都失焦，触发验证
    inputs[1].onblur();
    inputs[0].onblur();

    // console.log(arr);
    // 检验数组，如果都是真，则发送ajax
    var n = arr.every(function (item) {
        return item;
    });
    // console.log(n);
    if (n) {
        // 本地比对 第一个输入不通过则报错
        if (!/^1[3-9]\d{9}$/.test(inputs[0].value)) {
            oEm[0].innerHTML = "账号格式错误！";
            return;
        }

        //账号密码是否正常
        var registers = JSON.parse(localStorage.registers);
        if (!registers) {
            alert('登录失败，你还没有注册，请注册');
            open('register.html', '_self');
            return false;
        }

        for (var i = 0; i < registers.length; i++) {
            if (registers[i].user == inputs[0].value && registers[i].pass == inputs[1].value) {
                localStorage.isLogin = true;
                alert('登录成功');
                if(location.hash===''){
                    location.href = "./index.html"
                }else if(location.hash==='#3'){
                    history.back();
                }
               
                return false;
            }
        }
        oEm[0].innerHTML = "账号或密码错误！";
        return false;
       
    }
}
