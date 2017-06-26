(function( $ ){

	var url="http://localhost:3000";
	
    jQuery.validator.addMethod("noSpace", function(value, element) { 
        return value.indexOf(" ") < 0 && value != ""; 
    }, "No space please and don't leave it empty");

    $("#login_form").validate({
    	errorElement: 'div',
        errorClass: 'help-block',
        focusInvalid: false,
        ignore: "",
        rules: {
            'username':{
                required: true,
                noSpace: true,
                minlength: 2,
                maxlength: 20,
                remote: {
                    url: "checkLoginUsername",
                    type: "post",
                    data: {
                        id: function() {
                            return 0;
                        },
                        username: function() {
                            return $("#username").val();
                        }
                    }
                }        
            },
            'fullname': {
                required: true,
                minlength: 2,
                maxlength: 50
            },
            'birthday': {
            	required: true
            },
            'email': {
                required: true,
                email: true,
                remote: {
                    url: "checkLoginEmail",
                    type: "post",
                    data: {
                        id: function() {
                            return 0;
                        },
                        email: function() {
                            return $("#email").val();
                        }
                    }
                }
            },
            'truong': {
                required: true
            },
            'lop': {
                required: true,
                max: 9,
                min: 6
            },
            'password1': {
                required: true,
                minlength: 8
            },
            'password2': {
                required: true,
                equalTo: "#password1"
            }

        },
        messages: {
            'username':{
                required: "Xin điền tên đăng nhập",
                noSpace: "Tên đăng nhập không thể có ký tự khoảng cách",
                minlength: "Tên đăng nhập phải nhiều hơn 2 ký tự",
                maxlength: "Tên đăng nhập phải ít hơn 20 ký tự",
                remote: "Tên đăng nhập đã được sử dụng. Xin thử tên khác!"
            },
            'fullname': {
                required: "Xin điền họ tên đầy đủ của bạn",
                minlength: "Họ tên phải nhiều hơn 2 ký tự",
                maxlength: "Họ tên phải ít hơn 50 ký tự"
            },
            'birthday':{
            	required: "Xin nhập ngày sinh của bạn"
            },
            'email': {
                required: "Xin nhập địa chỉ email",
                email: "Đây không phải là định dạng email",
                remote: "Email này đã được sử dụng. Xin thử email khác!"
            },
            'truong': {
                required: "Xin nhập tên trường học của bạn. Nếu không hay điền 'Không'"
            },
            'lop': {
                required: "Xin nhập lớp học của bạn",
                max: "Lớp học phải thuộc các lớp 6, 7, 8, 9",
                min: "Lớp học phải thuộc các lớp 6, 7, 8, 9"
            },
            'password1': {
                required: "Xin nhập mật khẩu",
                minlength: "Mật khẩu ít nhất 8 ký tự"
            },
            'password2': {
                required: "Xác nhận lại mật khẩu",
                equalTo: "Mật khẩu chưa trùng khớp"
            }

        },
        highlight: function (e) {
            $(e).closest('.form-group').removeClass('has-info').addClass('has-error');
        },

        success: function (e) {
            $(e).closest('.form-group').removeClass('has-error');//.addClass('has-info');
            $(e).remove();
        },
        submitHandler: function (form) {
			var data={
				username: $("#username").val(),
				fullname: $("#fullname").val(),
				password: $("#password1").val(),
				email: 	  $("#email").val(),
                lop:      $("#lop").val(),
                truong:   $("#truong").val(),
                birthday: $("#birthday").val(),
                type: "hocsinh"
			};
			console.log(data);
            $.post( "dangky", data, function(){
                window.location = "/";
            });
            // $.post( "dangky", data)
            //   .done(function( data ) {
            //     alert( "Data Loaded: " + data );
            //   });

        }
    });
	// $("#submit").click(function(){
	// 	var data={
	// 		username: $("#username").val(),
	// 		fullname: $("#lastname").val()+" "+$("#firstname").val(),
	// 		password: $("#password1").val(),
	// 		email: $("#email1").val()
	// 	}
	// 	console.log(data);
	// });

})( jQuery );