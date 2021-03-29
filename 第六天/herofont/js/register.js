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
            url: 'http://127.0.0.1:3001/user/register',
            data: {
                username: name,
                password: md5(pwd)
            },
            success: (res) => {
                // console.log(res);
                if (res.code === 200) {
                    window.location.href = './login.html';
                } else if (res.code === 201) {
                    alert('该用户名已注册');
                } else {
                    alert('请求失败');
                }
            }
        })
    })
})