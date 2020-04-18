/** Loginhandler **/
function handleLogin() {
    var data = { userName: $("#userNameInput").val(), password: $("#passwordInput").val() };
    $.ajax({
        url: 'http://localhost:8080/login',
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        dataType: 'json',
        error: function (jqXHR, textStatus) {
            renderResponseMessage(jqXHR.responseJSON.responseMessage, jqXHR.status);
        },
        success: function (data) {
            renderResponseMessage(data.responseMessage, 0);
            window.open("../html/todo_list.html", "_self");
        },
    });
}
/**
 *
 * @param responseMessage: Antwort vom Server, die auf der Login-Seite dargestellt werden soll.
 * @param status: Response-Status-Code vom Server. Bei Erfolg manuell 0 übergeben.
 *                Ansonsten den Error-Statuscode vom Server.
 */
function renderResponseMessage(responseMessage, status) {
    var loginStatus = $("#loginStatus");
    if (status == 0) {
        loginStatus.addClass("request-success");
        loginStatus.html(responseMessage);
    }
    else {
        loginStatus.removeClass("request-success");
        loginStatus.addClass("request-error");
        loginStatus.html(responseMessage);
    }
}
/** Main Eventlistener **/
$(function () {
    $("#loginButton").on('click', function () {
        handleLogin();
    });
});
