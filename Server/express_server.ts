/**
 * Todo: Nutzer sollen später in einer Datenbank abgespeichert werden können mittels Registrierung
 */
class User {
    userName: String;
    password: String;

    constructor(userName: String, password: String) {
        this.userName = userName;
        this.password = password;
    }
}

let userList: User[] = [];
userList[0] = new User("admin", "admin");
userList[1] = new User("anonymous", "guest");

function checkPassword(userName: String, password: String) : boolean {
    for (let user of userList) {
        if ((user.userName === userName) && (user.password === password)) {
            return true;
        }
    }
    return false;
}


/** Express Server **/
import * as express from 'express';
import {NextFunction, Request, Response} from "express";
import session = require ("express-session");

let app = express();

/** Server starten **/
app.listen(8080, "localhost", () => {
    console.log("Server startet auf http://localhost:8080\n");
    console.log("Testnutzer-Login mit:\n", "\t E-Mail: admin\n", "\t Passwort: admin\n");
});

/** statische Routen **/
app.use('/', express.static(__dirname + '/../client'));
app.use(express.json());


/** dynamische Routen **/

// Login
app.post("/login", function (request: Request, response: Response ) {
   let responseMessage: String = "";
   let userName: String = request.body.userName;
   let password: String = request.body.password;

   if ((userName != "") && (password != "")) {
       if (checkPassword(userName, password)) {
           responseMessage += "Login erfolgreich"
           response.status(200);
           response.json({"responseMessage": responseMessage, "userName" : userName});
       } else {
           responseMessage += "Leider ist dein eingegebenes Passwort falsch. Bitte überprüfe es noch einmal.";
           response.status(401);
           response.json({"responseMessage": responseMessage, "userName" : userName});
       }
   } else {
       responseMessage += "Bitte füllen Sie alle Eingabefelder aus.";
       response.status(401);
       response.json({"responseMessage": responseMessage, "userName" : userName});
   }
});





















