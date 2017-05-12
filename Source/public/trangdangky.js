(function( $ ){

	var url="http://localhost:3000";
	
    $("#login_form").validate({
    	errorElement: 'div',
        errorClass: 'help-block',
        focusInvalid: false,
        ignore: "",
        rules: {
            'username':{
                required: true,
                minlength: 2,
                maxlength: 20
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
                email: true
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
                minlength: "Tên đăng nhập phải nhiều hơn 2 ký tự",
                maxlength: "Tên đăng nhập phải ít hơn 20 ký tự"
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
                email: "Đây không phải là định dạng email"
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
				email: 	  $("#email1").val()
			};
			console.log(data);
        	$.ajax({
				type: 'POST',
				dataType: 'json',
		        contentType: 'application/json',
                url: '/dangky',
				data: data,						
                success: function(data) {
                    console.log('success');
                    console.log(data);
                }
            });
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