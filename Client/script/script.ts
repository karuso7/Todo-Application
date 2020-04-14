
/** Loginhandler **/
function handleLogin(): void {
    let data: Object = {userName: $("#userNameInput").val(), password: $("#passwordInput").val()};

    $.ajax( {
        url: 'http://localhost:8080/login',
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        dataType: 'json',
        error: (jqXHR, textStatus) => {
            renderResponseMessage(jqXHR.responseJSON.responseMessage, jqXHR.status);
            },
        success:(data) => {
                renderResponseMessage(data.responseMessage, 0);
            },
    });
}


/**
 *
 * @param responseMessage: Antwort vom Server, die auf der Login-Seite dargestellt werden soll.
 * @param status: Response-Status-Code vom Server. Bei Erfolg manuell 0 übergeben.
 *                Ansonsten den Error-Statuscode vom Server.
 */
function renderResponseMessage(responseMessage: string, status: number) {
    let loginStatus: JQuery = $("#loginStatus");

    if(status == 0) {
        loginStatus.addClass("request-success");
        loginStatus.html(responseMessage);
    } else {
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
})




