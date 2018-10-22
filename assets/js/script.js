$.fn.api.settings.debug = true;
/*===============Login Validations===============*/
//Check if Email is Existing
$.fn.form.settings.rules.checkEmail = function (value) {
    let result = false;
    $.ajax({
        async: false,
        url: 'php/checkEmail.php',
        type: "POST",
        data: {
            email: value
        },
        dataType: "html",
        success: function (data) {
            result = Boolean(data);
        }
    });
    return result;
};

//Check if user already logged in
$.fn.form.settings.rules.loggedIn = function (value) {
    let result = true;
    $.ajax({
        async: false,
        url: 'php/functions.php',
        data: {
            userEmail: value,
        },
        dataType: "html",
        success: function (data) {
            result = Boolean(data);
        }
    });
    return result;
};
//Login Form Validation Rules
$('#login-form').form({
    fields: {
        email: {
            identifier: 'email',
            rules: [
                {
                    type: 'empty',
                    prompt: 'Please enter your email'
                },
                {
                    type: 'email',
                    prompt: 'Please enter a valid email'
                },
                {
                    type: 'checkEmail',
                    prompt: 'Email Address not found. Please Register if you have not registered yet'
                },
                {
                    type: 'loggedIn',
                    prompt: 'User Already Logged In'
                }
            ]
        },
        purpose: {
            identifier: 'purpose',
            rules: [
                {
                    type: 'empty',
                    prompt: 'Please enter your purpose'
                },
            ]
        },
    }
}).ajaxForm(
    {
        url: 'php/login.php',
        method: 'post',
        serializeForm: true,
        dataType: 'json',
        success: function (data) {
            let message = encodeURIComponent(data['message']);
            $.get('php/sms_config.php', function (value) {
                let number = value['number'];
                let ip = value['ip address'];
                let port = value['port'];
                let token = value['token'];
                let url = 'http://' + ip + ':' + port + '/?number=' + number + '&message=' + message;
                if (token !== '') {
                    url = 'http://' + ip + ':' + port + '/?number=' + number + '&message=' + message + '&token=' + token;
                }
                $.get(url);
            });
            let userEmail = data.email;
            let sessionId = '';
            $.get('php/functions.php?user_email=' + userEmail, function (data) {
                sessionId = data['sessionId'];
                console.log(sessionId);
                //countDownTimer(sessionId);
                if (data['Drop-in Coworking']) {
                    (async function getName() {
                        const {value: payment} = await swal({
                            allowOutsideClick: false,
                            allowEscapeKey: false,
                            title: 'Total amount to be paid: \nPhp500.00 (Regular) \nPhp350.00 (Off-Members) \nPhp250.00 (Student)',
                            input: 'number',
                            showCancelButton: false,
                            inputValidator: (value) => {
                                return (value <= 0 || value == null) && 'Please enter a valid value!'
                            }
                        });

                        if (payment) {
                            swal({
                                type: 'success',
                                title: "Successfully Paid",
                                text: "You are now Logged in! \nDon't forget to logout!",
                                showConfirmButton: false,
                                timer: 2500
                            });
                            $.get('php/functions.php?sessionId=' + sessionId + '&payment=' + payment);
                        }
                    })();
                } else {
                    swal({
                        type: 'success',
                        title: 'Success!',
                        text: "You are now logged in! \nDon't forget to logout!",
                        showConfirmButton: false,
                        timer: 2500
                    });
                }
            });
            swal({
                type: 'success',
                title: 'Success!',
                text: 'You are now Logged in. \n Don\'t forget to logout!',
                showConfirmButton: false,
                timer: 2500
            });
            $('#login_email').val("");
            $('#login_purpose').dropdown('clear');
        }

    }
);
let intervals = new Array();
setInterval(function () {
    $.get('php/functions.php?logs=true', function (data) {
        for (let x = 0; x < data.length; x ++){
            let sessionId = data[x];
            intervals[sessionId] = setInterval(function(){
                $.get('php/functions.php?sessionId=' + sessionId, function (data) {
                    console.log(data.sessionOut);
                    if(new Date() >= new Date(data.sessionOut)){
                        $.get('php/logout.php?sessionId=' + sessionId);
                    }
                });
            }, 60000);
        }
    });
    window.reload();
}, 3600000);

/*===============Logout Validations===============*/
//Check if users is logged out
$.fn.form.settings.rules.loggedOut = function (value) {
    let result = true;
    $.ajax({
        async: false,
        url: 'php/functions.php',
        data: {
            userEmail: value,
        },
        dataType: "html",
        success: function (data) {
            result = !Boolean(data);
        }
    });
    return result;
};

$('#logout-form').form({
    fields: {
        email: {
            identifier: 'email',
            allowEmpty: true,
            rules: [
                {
                    type: 'empty'
                },
                {
                    type: 'checkEmail',
                    prompt: "Email doesn't exist. Please Register First"
                },
                {
                    type: 'email',
                    prompt: 'Please enter a valid email address'
                },
                {
                    type: 'loggedOut',
                    prompt: 'User Already Logged Out'
                }
            ]
        }
    }
}).ajaxForm({
    async: false,
    url: 'php/logout.php',
    method: 'post',
    dataType: 'json',
    success: function (data) {
        let message = encodeURIComponent(data['message']);
        $.get('php/sms_config.php', function (value) {
            let number = value['number'];
            let ip = value['ip address'];
            let port = value['port'];
            let token = value['token'];
            let url = 'http://' + ip + ':' + port + '/?number=' + number + '&message=' + message;
            if (token !== '') {
                url = 'http://' + ip + ':' + port + '/?number=' + number + '&message=' + message + '&token=' + token;
            }
            $.get(url);
        });
        swal({
            type: 'success',
            title: 'Success!',
            text: "You are now logged out! \nDon't forget to come back!",
            showConfirmButton: false,
            timer: 2500
        });
        $('#logout_email').val("");
    }
});

/*===============Registration Validations===============*/
//Check if Email already Taken
$.fn.form.settings.rules.existingEmail = function (value) {
    let result = true;
    $.ajax({
        async: false,
        url: 'php/checkEmail.php',
        type: "POST",
        data: {
            email: value,
        },
        dataType: "html",
        success: function (data) {
            result = !Boolean(data);
        }
    });
    return result;
};

//Registration Form Validation Rules
$('#registration-form').form({
    fields: {
        first_name: {
            identifier: 'first_name',
            rules: [
                {
                    type: 'empty',
                    prompt: 'Please enter your first name'
                }
            ]
        },
        last_name: {
            identifier: 'last_name',
            rules: [
                {
                    type: 'empty',
                    prompt: 'Please enter your last name'
                }
            ]
        },
        email: {
            identifier: 'email',
            rules: [
                {
                    type: 'email',
                    prompt: 'Please enter a valid email address'
                },
                {
                    type: 'existingEmail',
                    prompt: 'Email is already taken'
                },
            ]
        },
        mobile: {
            identifier: 'mobile',
            rules: [
                {
                    type: 'maxLength[10]',
                    prompt: 'Please enter a valid mobile number'
                },
                {
                    type: 'minLength[7]',
                    prompt: 'Please enter a valid mobile number'
                },
            ]
        },
        company: {
            identifier: 'company',
            rules: [
                {
                    type: 'empty',
                    prompt: 'Please enter your company/organization/school'
                },
            ]
        },
    },
    keyboardShortcuts: false
}).ajaxForm({
    url: 'php/register.php',
    method: 'post',
    success: function () {
        swal({
            type: 'success',
            title: 'Success!',
            text: "You are now Registered. You may now Log in!",
            showConfirmButton: false,
            timer: 2500
        });
        $('#first_name').val("");
        $('#last_name').val("");
        $('#email').val("");
        $('#company').val("");
        $('#mobile').val("");
    }
});
/*===============Registration Validations===============*/
$('#inquiry-form').form({
    fields: {
        name: {
            identifier: 'name',
            rules: [
                {
                    type: 'empty',
                    prompt: 'Please enter your full name'
                }
            ]
        },

        email: {
            identifier: 'email',
            rules: [
                {
                    type: 'email',
                    prompt: 'Please enter a valid email address'
                }
            ]
        },
        mobile: {
            identifier: 'mobile',
            rules: [
                {
                    type: 'maxLength[10]',
                    prompt: 'Please enter a valid mobile number'
                },
                {
                    type: 'minLength[7]',
                    prompt: 'Please enter a valid mobile number'
                },
            ]
        },
        subject: {
            identifier: 'subject',
            rules: [
                {
                    type: 'empty',
                }
            ]
        },
        message: {
            identifier: 'message',
            rules: [
                {
                    type: 'empty',
                    prompt: 'Please enter your message'
                }
            ]
        },
    }
}).api(
    {
        url: 'php/inquire.php',
        method: 'post',
        serializeForm: true,
        beforeXHR: function () {
            swal({
                allowOutsideClick: false,
                allowEscapeKey: false,
                type: 'info',
                title: 'Sending...',
                text: "Please wait, your inquiry is being sent!",
                showConfirmButton: false,
            });
        },
        onResponse: function () {
            swal({
                title: "Success!",
                text: "Your Inquiry has been sent!",
                type: "success",
                timer: 2500,
            });
            $('#name').val("");
            $('#subject').val("");
            $('#message').val("");
            $('#email_address').val("");
            $('#mobile_number').val("");
        }
    }
);

//Activate all dropdowns
$('.dropdown')
    .dropdown()
;

//Slider
$('#mixedSlider').multislider({
    duration: 1000,
    interval: 7500
});

//Tabs
$('.menu .item')
    .tab()
;

let viewEvent = function (eventId) {
    $.get('php/functions.php?eventId=' + eventId, function (data) {
        document.getElementById('view_header').innerHTML = data['title'];
        document.getElementById('view_content').innerHTML = data['content'];
        document.getElementById('view_cover_image').src = data['cover_image'];
        $('#viewEvent').modal('show');
    });
};