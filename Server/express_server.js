"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Todo: Nutzer sollen später in einer Datenbank abgespeichert werden können mittels Registrierung
 */
var User = /** @class */ (function () {
    function User(userName, password) {
        this.userName = userName;
        this.password = password;
    }
    return User;
}());
var userList = [];
userList[0] = new User("admin", "admin");
userList[1] = new User("anonymous", "guest");
function checkPassword(userName, password) {
    for (var _i = 0, userList_1 = userList; _i < userList_1.length; _i++) {
        var user = userList_1[_i];
        if ((user.userName === userName) && (user.password === password)) {
            return true;
        }
    }
    return false;
}
/** Express Server **/
var express = require("express");
var app = express();
/** Server starten **/
app.listen(8080, "localhost", function () {
    console.log("Server startet auf http://localhost:8080\n");
    console.log("Testnutzer-Login mit:\n", "\t E-Mail: admin\n", "\t Passwort: admin\n");
});
/** statische Routen **/
app.use('/', express.static(__dirname + '/../client'));
app.use(express.json());
/** dynamische Routen **/
// Login
app.post("/login", function (request, response) {
    var responseMessage = "";
    var userName = request.body.userName;
    var password = request.body.password;
    if ((userName != "") && (password != "")) {
        if (checkPassword(userName, password)) {
            responseMessage += "Login erfolgreich";
            response.status(200);
            response.json({ "responseMessage": responseMessage, "userName": userName });
        }
        else {
            responseMessage += "Leider ist dein eingegebenes Passwort falsch. Bitte überprüfe es noch einmal.";
            response.status(401);
            response.json({ "responseMessage": responseMessage, "userName": userName });
        }
    }
    else {
        responseMessage += "Bitte füllen Sie alle Eingabefelder aus.";
        response.status(401);
        response.json({ "responseMessage": responseMessage, "userName": userName });
    }
});
