"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
// Server starten
app.listen(8080, "localhost", function () {
    console.log("Server startet auf http://localhost:8080\n");
    console.log("Testnutzer-Login mit:\n", "\t E-Mail: admin\n", "\t Passwort: admin\n");
});
// statische Routen
app.use('/', express.static(__dirname + '/../client'));
app.use(express.json());
