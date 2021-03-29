$(function() {
    $('.btn').on('click', function() {
        // 获取值
        const name = $('#userName').val().trim();
        const pwd = $('#userPwd').val().trim();
        if (name === '' || pwd === '') {
            alert('值不能为空');
            return;
        }
        $.ajax({
            type: 'post',
            url: 'http://127.0.0.1:3001/user/login',
            data: {
                username: name,
                password: md5(pwd)
            },
            success: (res) => {
                // console.log(res);
                if (res.code === 200) {
                    // 保存从后端传回的token
                    localStorage.setItem('token', res.token);
                    window.location.href = './index.html';
                } else if (res.code === 201) {
                    alert('账号密码错误');
                } else {
                    alert('请求失败');
                }
            }
        })
    })
})