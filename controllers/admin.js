/**
 * Created by jiinwoo on 2016. 1. 10..
 */
function validateEmail(email) {

    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
function validatePassword(password) {

    var re = /^((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})/;
    return re.test(password);
}

//(			# Start of group
//(?=.*\d)		#   must contains one digit from 0-9
//(?=.*[a-z])		#   must contains one lowercase characters
//(?=.*[A-Z])		#   must contains one uppercase characters
//(?=.*[@#$%])		#   must contains one special symbols in the list "@#$%"
//    .		#     match anything with previous condition checking
//{6,20}	#        length at least 6 characters and maximum of 20
//)			# End of group

function validate(){

    $("#result").text("");
    var email = $("#email").val();
    var password = $("#password").val();
    if (validateEmail(email)) {
        if(validatePassword(password)){
            $("#result").text("all is valid :)");
            $("#result").css("color", "green");
        }
        else{
            $("#result").text(password + " is not valid :)");
            $("#result").css("color", "red");
        }
    }
    else {
        $("#result").text(email + "is not valid :(");
        $("#result").css("color", "red");
    }
    return false;
}

jQuery(function(){
    $("#submit").click(function(){
        var hasError = false;
        var passwordVal = $("#password").val();
        var checkVal = $("#password_check").val();
        if (passwordVal == '') {
            $("#password").after('<span >Please enter a password.</span>');
            hasError = true;
        } else if (checkVal == '') {
            $("#password_check").after('<span >Please re-enter your password.</span>');
            hasError = true;
        } else if (passwordVal != checkVal ) {
            $("#password_check").after('<span >Passwords do not match.</span>');
            hasError = true;
        }
        if(hasError == true) {return false;}
    });
})
