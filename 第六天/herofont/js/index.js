$(function() {
    // 前端统一处理401错误
    $(document).ajaxError(function(event, request, settings) {
        if (request.status === 401) {
            // alert(request.responseJSON.msg)
            location.href = './login.html';
            localStorage.removeItem('token');
            return;
        }
    });

    // 前端统一携带token
    $.ajaxSetup({
        headers: {
            Authorization: localStorage.getItem('token'),
        }
    });

    //获取英雄信息，渲染页面
    getHerosList();

    function getHerosList() {
        let hname = $('#hname').val().trim();
        $.ajax({
            type: 'get',
            url: 'http://127.0.0.1:3001/hero/getHeroList',
            data: { heroName: hname },
            success: (res) => {
                // console.log(res);
                if (res.code === 200) {
                    let htmlStr = template('tpl', { detail: res.data });
                    $('#tbody').html(htmlStr);
                }
            }
        })
    };

    //搜索功能
    $('#btn_search').on('click', function() {
        // alert(1);
        getHerosList();
    });

    //添加功能
    $('#addHeroBtn').click(function() {
        let heroName = $('#heroName').val().trim();
        let gender = $('[name=gender]:checked').val();
        // console.log(heroName, gender);
        $.ajax({
            type: 'post',
            url: 'http://127.0.0.1:3001/hero/addHero',
            data: { name: heroName, gender: gender },
            success: (res) => {
                // console.log(res);
                if (res.code === 200) {
                    $('#exampleModal').modal('hide');
                    getHerosList();
                }
            }
        })
    });

    //删除功能
    $('#tbody').on('click', '.btn-danger', function() {
        // alert($(this).attr('data-id'));
        $.ajax({
            type: 'get',
            url: 'http://127.0.0.1:3001/hero/delHeroById',
            data: { id: $(this).attr('data-id') },
            success: (res) => {
                console.log(res);
                if (res.code === 200) {
                    getHerosList();
                }
            }
        })
    });

    //点击上传头像按钮，触发上传文件的文本域
    $('#tbody').on('click', '.btn-warning', function() {
        $('#uploadFile').click();
        // 获取列表按钮中的自定义 id 属性
        let id = $(this).attr('data-id');
        // console.log(id);
        // 把自定义 id 属性添加到 真正的上传按钮中
        $('#uploadFile').attr('data-id', id);
    });

    //上传头像功能
    $('#uploadFile').on('change', function() {
        // console.log('1');
        let id = $(this).attr('data-id');
        // 获取文件对象
        // console.log($('#uploadFile'));
        let file = document.querySelector('#uploadFile').files[0];
        // console.log(file);
        // 准备 FormData 对象，以后作为 ajax 的请求参数
        const fd = new FormData();
        // console.log(fd);
        fd.append('file_data', file);
        // console.log(...fd);//可以用扩展运算符查看对象里所有的东西
        $.ajax({
            type: 'post',
            url: 'http://127.0.0.1:3001/hero/uploadFile',
            data: fd,
            processData: false, // 无需 jq 处理数据
            contentType: false, // 无需 jq 处理内容类型
            success: (res) => {
                // console.log(res);
                if (res.code === 200) {
                    let img = res.img;
                    $.ajax({
                        type: 'post',
                        url: 'http://127.0.0.1:3001/hero/updateHero',
                        data: { id: id, img: img },
                        success: (res) => {
                            // console.log(res);
                            if (res.code === 200) {
                                getHerosList();
                            }
                        }
                    })
                }
            }
        })
    });
})