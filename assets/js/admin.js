// function to check if the text contains an element from the array
$.fn.form.settings.rules.containsInArray = function (value, csv) {
    let array = String(csv).split(','); // you're separating the string by commas
    let isContains = false; // return value
    // for each element check it usign contains function
    $.each(array, function (index, elem) {
        if ($.fn.form.settings.rules.contains(value, $.trim(elem))) {
            // if condition are meet set the result as true
            // and breaks the loop
            isContains = true;
            return false;
        }
    });
    return isContains;
};

/*===============Make the Admin Responsive===============*/
(function ($) {
    let $window = $(window),
        $sidebar = $('#sidebar'),
        $content = $('#content'),
        $logo = $('#logo');
    $window.resize(function () {
        if ($window.width() < 768) {
            return $sidebar.addClass('icon');
        }
        $sidebar.removeClass('icon');
    }).trigger('resize');
    $window.resize(function () {
        if ($window.width() < 768) {
            return $logo.removeClass('small');
        }
        $logo.addClass('small');
    }).trigger('resize');
    $window.resize(function () {
        if ($window.width() < 768) {
            return $sidebar.removeClass('left');
        }
        $sidebar.addClass('left');
    }).trigger('resize');
    $window.resize(function () {
        if ($window.width() < 768) {
            return $content.css('margin', '0 0 0 125px');
        }
        $content.css('margin', '0 10px 0 275px');
    }).trigger('resize');
})(jQuery);

// show dropdown on hover
$('.dropdown').dropdown({
    on: 'hover'
});


/*===============Handle Buttons on the User Logs Table===============*/
let handleUsersLogButtons = function () {
    if ($("#users-log").length) {
        $("#users-log").DataTable({
            dom: '<"ui container"<"ui stackable grid"<"seven wide column"B><"four wide column"l><"right aligned ' +
            'five ' +
            'wide column"f>>t<"ui stackable two column grid"<"column"i><"right aligned column"p>>>',
            buttons: [{
                extend: "copy",
                className: "btn-sm"
            },
                {
                    extend: "csv",
                    className: "btn-sm"
                },
                {
                    extend: "pdfHtml5",
                    className: "btn-sm"
                },
                {
                    extend: "print",
                    className: "btn-sm",
                    customize: function (win) {
                        $(win.document.body).find('')
                            .css('display', 'none');
                    }
                }
            ],
            "order": [[4, "desc"]]
        });
    }
};
UsersLog = function () {
    "use strict";
    return {
        init: function () {
            handleUsersLogButtons();
        }
    };
}();
UsersLog.init();


/*===============Handle Buttons on the User Payments Table===============*/
let handlePaymentsButtons = function () {
    if ($("#payments").length) {
        $("#payments").DataTable({
            dom: '<"ui container"<"ui stackable grid"<"seven wide column"B><"four wide column"l><"right aligned ' +
            'five ' +
            'wide column"f>>t<"ui stackable two column grid"<"column"i><"right aligned column"p>>>',
            buttons: [{
                extend: "copy",
                className: "btn-sm"
            },
                {
                    extend: "csv",
                    className: "btn-sm"
                },
                {
                    extend: "pdfHtml5",
                    className: "btn-sm"
                },
                {
                    extend: "print",
                    className: "btn-sm",
                    customize: function (win) {
                        $(win.document.body).find('')
                            .css('display', 'none');
                    }
                }
            ]
        });
    }
};
Payments = function () {
    "use strict";
    return {
        init: function () {
            handlePaymentsButtons();
        }
    };
}();
Payments.init();

/*===============Handle Buttons on the Users Table===============*/
let handleUsersButton = function () {
    if ($("#users").length) {
        $("#users").DataTable({
            dom: '<"ui container"<"ui stackable grid"<"seven wide column"B><"four wide column"l><"right aligned ' +
            'five ' +
            'wide column"f>>t<"ui stackable two column grid"<"column"i><"right aligned column"p>>>',
            buttons: [{
                extend: "copy",
                className: "btn-sm",
                exportOptions: {
                    columns: [0, 1, 2, 3, 4, 5]
                }
            },
                {
                    extend: "csv",
                    className: "btn-sm",
                    exportOptions: {
                        columns: [0, 1, 2, 3, 4, 5]
                    }
                },
                {
                    extend: "pdfHtml5",
                    className: "btn-sm",
                    exportOptions: {
                        columns: [0, 1, 2, 3, 4, 5]
                    }
                },
                {
                    extend: "print",
                    className: "btn-sm",
                    exportOptions: {
                        columns: [0, 1, 2, 3, 4, 5]
                    },
                    customize: function (win) {
                        $(win.document.body).find('')
                            .css('display', 'none');
                    }
                }
            ],
        });
    }
};
UsersButton = function () {
    "use strict";
    return {
        init: function () {
            handleUsersButton();
        }
    };
}();
UsersButton.init();

/*===============Set Column Definitions on the Events Table===============*/
$('#events').DataTable({
    dom: '<"ui container"<"ui stackable grid"<"seven wide column"B><"four wide column"l><"right aligned ' +
    'five ' +
    'wide column"f>>t<"ui stackable two column grid"<"column"i><"right aligned column"p>>>',
    columnDefs: [
        {
            "targets": [4, 5],
            "orderable": false,
        },
        {
            "width": "30%",
            "targets": 1
        }
    ],
    "order": [[2, "desc"]],
    buttons: [
        {
            text: 'Add Announcement/event',
            attr: { id: 'add-event'}
        }
    ]
});


/*===============Add Event===============*/
$('#add-event-modal')
    .modal('attach events', '#add-event', 'show')
;
//Set Range Dates Format
$('#rangestart').calendar({
    type: 'date',
    endCalendar: $('#rangeend'),
    formatter: {
        date: function (date) {
            if (!date) return '';
            let day = date.getDate() + '';
            if (day.length < 2) {
                day = '0' + day;
            }
            let month = (date.getMonth() + 1) + '';
            if (month.length < 2) {
                month = '0' + month;
            }
            let year = date.getFullYear();
            return year + '-' + month + '-' + day;
        }
    }
});
$('#rangeend').calendar({
    type: 'date',
    startCalendar: $('#rangestart'),
    formatter: {
        date: function (date) {
            if (!date) return '';
            let day = date.getDate() + '';
            if (day.length < 2) {
                day = '0' + day;
            }
            let month = (date.getMonth() + 1) + '';
            if (month.length < 2) {
                month = '0' + month;
            }
            let year = date.getFullYear();
            return year + '-' + month + '-' + day;
        }
    }
});

/*===============File Upload===============*/
$("input:text").click(function () {
    $(this).parent().find("input:file").click();
});

$('input:file', '.ui.action.input')
    .on('change', function (e) {
        let name = e.target.files[0].name;
        $('input:text', $(e.target).parent()).val(name);
    });

/*===============Add Event===============*/
$('#addEvent')
    .form({
        fields: {
            title: 'empty',
            content: 'empty',
            start_date: 'empty',
            end_date: 'empty',
            cover_image_name: 'containsInArray[.png, .jpg, .jpeg, .gif, .tiff, .tif]'
        }
    }).ajaxForm(function () {
    $('#add-event-modal').modal('hide');
    swal({
        title: "Success!",
        text: "Event added!",
        icon: "success",
        timer: 2500,
        button: false
    });
    setTimeout(location.reload.bind(location), 1000);
});
/*===============Edit Event===============*/
$('#editEvent')
    .form({
        fields: {
            title: 'empty',
            content: 'empty',
            start_date: 'empty',
            end_date: 'empty',
            cover_image_name: 'containsInArray[.png, .jpg, .jpeg, .gif, .tiff, .tif]'
        }
}).ajaxForm(function () {
    $('#edit-event-modal').modal('hide');
    swal({
        title: "Success!",
        text: "Changes saved!",
        icon: "success",
        timer: 2500,
        button: false
    });
    setTimeout(location.reload.bind(location), 1000);
});
function editEvent(id) {
    $.get("php/functions.php?getAnnouncement=" + id, function (data) {
        $('#eventStart').calendar({
            type: 'date',
            endCalendar: $('#eventEnd'),
            formatter: {
                date: function (date) {
                    if (!date) return '';
                    let day = date.getDate() + '';
                    if (day.length < 2) {
                        day = '0' + day;
                    }
                    let month = (date.getMonth() + 1) + '';
                    if (month.length < 2) {
                        month = '0' + month;
                    }
                    let year = date.getFullYear();
                    return year + '-' + month + '-' + day;
                }
            },
        });
        $('#eventStart').calendar("set date", new Date(data['start_date']));
        $('#eventEnd').calendar({
            type: 'date',
            startCalendar: $('#eventStart'),
            formatter: {
                date: function (date) {
                    if (!date) return '';
                    let day = date.getDate() + '';
                    if (day.length < 2) {
                        day = '0' + day;
                    }
                    let month = (date.getMonth() + 1) + '';
                    if (month.length < 2) {
                        month = '0' + month;
                    }
                    let year = date.getFullYear();
                    return year + '-' + month + '-' + day;
                }
            }
        });
        $('#eventEnd').calendar("set date", new Date(data['end_date']));
        $('#title').val(data['title']);
        $('#cover_image_name').val(data['cover_image_name']);
        $('#text_content').val(data['content']);
        $('#eventId').val(id);
        $('#edit-event-modal')
            .modal('show')
        ;
    });
}

function deleteEvent(id) {
    $.get("php/functions.php", {getAnnouncement: id}, function (data) {
        swal({
            title: "Are you sure?",
            text: "Delete " + data['title'],
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    swal("Poof! " + data['title'] + " has been deleted!", {
                        icon: "success", buttons: false
                    });
                    $.ajax({
                        url: 'php/del-event.php',
                        data:{
                            eventId: id
                        }
                    });
                    setTimeout(location.reload.bind(location), 1000);
                } else {
                    swal(data['title'] + " is safe!");
                }
            });
    });
}

function editUser(id) {
    $.get("php/functions.php?getUser=" + id, function (data) {
        $('#first_name').val(data['first_name']);
        $('#last_name').val(data['last_name']);
        $('#email').val(data['userEmail']);
        $('#mobile').val(String(data['userMobile']).substring(3));
        $('#company').val(data['userCompany']);
        $('#userId').val(id);
        $('#edit-user-modal')
            .modal('show')
        ;
    });

}

function deleteUser(id) {
    $.get("php/functions.php?getUser=" + id, function (data) {
        swal({
            title: "Are you sure?",
            text: "Delete " + data['first_name'] + ' ' + data['last_name'],
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                swal("Poof! " + data['first_name'] + ' ' + data['last_name'] + " has been deleted!", {
                    icon: "success", buttons: false
                });
                $.ajax({
                    url: 'php/del-user.php',
                    data:{
                        userId: id
                    }
                });
                setTimeout(location.reload.bind(location), 1000);
            } else {
                swal(data['first_name'] +' ' + data['last_name'] + " is safe!");
            }
        });
    });
}
function logout(){
    $.get('/admin/php/functions.php?logout=true');
    window.location = '/admin/login.php ';
}