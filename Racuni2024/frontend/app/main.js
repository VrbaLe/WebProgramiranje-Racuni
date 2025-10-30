import { Application } from "./application.js";


let brojStanova= await fetch("https://localhost:7080/Ispit/BrojStanova").then(r=>r.json());
//console.log(brojStanova);

const app= new Application(brojStanova);
app.draw(document.body);