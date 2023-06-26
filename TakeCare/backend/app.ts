import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

const app = express();
app.use(cors());
app.use(express.json());
app.set('port', process.env.PORT || 3000);

// Se establece la conexión con la base de datos MySQL
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    port: "3306",
    database: "DB",
});

// Se establece la conexión con el servidor de la base de datos MySQL
connection.connect(function(err:any) {
    if (err) {
        console.error("Error al intentar conectar a la base de datos " + err.stack);
        return;
    } else {
        console.log("Conexión establecida " + connection.threadId);
    }
});

app.listen(app.get('port'), () => {
    console.log("Servidor funcionando en el puerto", app.get('port'));
});

//
// API REST para gestión de Users.
//
// Método GET (Devuelve todos los usuarios de la tabla Users.)
app.get('/getUsers', (req:any, res:any) => {
    connection.query("SELECT * FROM Users", (error:any, results:any) => {
        if (error) {
            console.error(error);
            res.status(500).send("No se logró obtener la lista de usuarios.");
        } else {
            console.log("Se logró obtener la lista de usuarios.")
            res.status(200).json(results);
        }
    })
})

//Método GET (Devuelve los datos de un solo usuario según su ID)
app.get('/getUser/:id', (req: Request, res: Response) => {
    let id: string = req.params.id;
    connection.query("SELECT * FROM Users WHERE `Users`.`ID` = ? LIMIT 1", [id], (error: any, results: any[]) => {
        if (error) {
            console.error(error);
            res.status(500).send("No se logró obtener los datos del usuario ID: "+id);
        } else {
            if (results.length > 0) {
                console.log("Se logró obtener los datos del usuario ID: "+id);
                res.status(200).json(results[0]);
            } else {
                res.status(404).send("No se encontró ningún usuario con la ID: "+id);
            }
        }
    });
});

// Método POST (Inserta un usuario dentro de la tabla Users)
// ARCHIVO TIPO JSON ES NECESARIO PARA QUE FUNCIONE!
// EJ: {"firstname":"Juan","lastname":"Alcayaga","email":"juan.alcayaga.y@outlook.com","profession":"Odontólogo","password":"Asd574sas5d7as464","isAdmin":true} 
app.post('/createUser', (req:any, res:any) => {
    const values = [
        req.body.firstname,
        req.body.lastname,
        req.body.email,
        req.body.profession,
        req.body.password,
        req.body.isAdmin
    ]

    connection.query("INSERT INTO Users (firstname, lastname, email, profession, password, isAdmin) VALUES (?)",[values], (err:any,result:any) => {
        if (err) {
            console.error("Error al crear el usuario: ", err);
            res.status(500).send("Error al crear el usuario");
            return;
        }

        console.log("Se logró agregar al usuario a la lista de usuarios.");
        res.status(200).send("Usuario creado exitosamente");
    });
});

// Método DELETE (Elimina un usuario de la tabla Users según su ID)
app.delete('/deleteUser/:id', (req: Request, res: Response) => {
    let id: string = req.params.id;
    connection.query("DELETE FROM Users WHERE `Users`.`ID` = ?", [id], (error: any, results: any) => {
        if (error) {
            console.error(error);
            res.status(500).send("No se ha logrado eliminar al usuario de la lista.");
        } else if (results.affectedRows === 0) {
            res.status(404).send("No se encontró ningún usuario con el ID especificado");
        } else {    
            res.status(200).json("Se ha eliminado el usuario exitosamente");
        }
    });
});

// Método PUT (Actualiza los datos de un usuario existente)
// ARCHIVO TIPO JSON ES NECESARIO PARA QUE FUNCIONE!
// EJ: {"firstname":"Juan","lastname":"Alcayaga","email":"juan.alcayaga.y@outlook.com","profession":"Odontólogo","password":"Asd574sas5d7as464","isAdmin":true} 
app.put("/updateUser/:id", jsonParser, (req: Request, res: Response) => {
    let id: string = req.params.id;
    let firstname: string = req.body.firstname;
    let lastname: string = req.body.lastname;
    let email: string = req.body.email;
    let profession: string = req.body.profession;
    let password: string = bcrypt.hashSync(req.body.password, 10);
    let isAdmin: boolean = req.body.isAdmin;
    connection.query("UPDATE Users SET firstname=?, lastname=?, email=?, profession=?, password=?, isAdmin=? WHERE ID=?", [firstname, lastname, email, profession, password, isAdmin, id], (error: any, results: any, fields: any) => {
        if (error) {
            console.error("Error al actualizar el usuario: ", error);
            res.status(500).send("Error al actualizar el usuario");
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).send("No se encontró ningún usuario asociado a la ID" +id);
            return;
        }
        console.log("Usuario actualizado exitosamente!");
        res.status(200).send("Usuario actualizado exitosamente");
    });
});

//
// API REST para gestión de Patients.
//
// Método GET (Devuelve todos los pacientes de la tabla Patients.)
app.get('/getPatients', (req:any, res:any) => {
    connection.query("SELECT * FROM Patients", (error:any, results:any) => {
        if (error) {
            console.error(error);
            res.status(500).send("No se logró obtener la lista de pacientes.");
        } else {
            console.log("Se logró obtener la lista de pacientes.")
            res.status(200).json(results);
        }
    })
})

// Método GET (Devuelve todos los pacientes de un usuario (profesional de la salud).)
app.get('/getUserPatients/:id', (req: Request, res: Response) => {
    let id: string = req.params.id;
    connection.query("SELECT * FROM Patients WHERE IDProfessional = ? LIMIT 100", [id], (error: any, results: any[]) => {
        if (error) {
            console.error(error);
            res.status(500).send("No se logró obtener los datos de los pacientes del usuario ID: " + id);
        } else {
            if (results.length > 0) {
                console.log("Se logró obtener los datos de los pacientes del usuario ID: " + id);
                res.status(200).json(results);
            } else {
                res.status(404).send("No se encontró ningún paciente asociado al usuario ID: " + id);
            }
        }
    });
});

// Método GET (Devuelve todos los datos de un paciente según su ID)
app.get('/getPatient/:id', (req: Request, res: Response) => {
    let id: string = req.params.id;
    connection.query("SELECT * FROM Patients WHERE `Patients`.`ID` = ? LIMIT 1", [id], (error: any, results: any[]) => {
        if (error) {
            console.error(error);
            res.status(500).send("No se logró obtener los datos del paciente ID: "+id);
        } else {
            if (results.length > 0) {
                console.log("Se logró obtener los datos del paciente ID: "+id);
                res.status(200).json(results[0]);
            } else {
                res.status(404).send("No se encontró ningún paciente con la ID: "+id);
            }
        }
    });
});

//Método POST (Inserta un paciente dentro de la tabla Patients)
// ARCHIVO TIPO JSON ES NECESARIO PARA QUE FUNCIONE!
// EJ: {"IDProfessional": "4", "firstname":"Juan", "middlename": "Lastarria", "lastname":"Alcayaga", "rut": "7.879.514-1", "birthdate": "1956-12-15", "gender": "true", "address": "calle 123 valparaiso", "phone": "+56948484884", "insurance": "fonasa","diagnostic": "pulmonia", "treatment": "antibioticos", "observations": "N/A"}
app.post("/createPatient", jsonParser, (req: Request, res: Response) => {
    let IDProfessional: number = req.body.IDProfessional;
    let firstname: string = req.body.firstname;
    let middlename: string = req.body.middlename;
    let lastname: string = req.body.lastname;
    let rut: string = req.body.rut;
    let birthdate: Date = req.body.birthdate;
    let age: number = req.body.age;
    let gender: boolean = req.body.gender;
    let address: string = req.body.address;
    let phone: string = req.body.phone;
    let insurance: string = req.body.insurance;
    let diagnostics: string = req.body.diagnostics;
    let treatments: string = req.body.treatments;
    let observations: string = req.body.observations;

    connection.query("INSERT INTO Patients (IDProfessional, firstname, middlename, lastname, rut, birthdate, age, gender, address, phone, insurance, diagnostics, treatments, observations) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [IDProfessional, firstname, middlename, lastname, rut, birthdate, age, gender, address, phone, insurance, diagnostics, treatments, observations], (error: any, results: any, fields: any) => {
            if (error) {
                console.error("Error al crear el paciente: ", error);
                res.status(500).send("Error al crear el paciente");
                return;
            }
            console.log("Se logró agregar al paciente a la lista de pacientes.");
            res.status(200).send("Paciente creado exitosamente");
        }
    );
});

// Método DELETE (Elimina un paciente de la tabla Patients según su ID)
app.delete('/deletePatient/:id', (req: Request, res: Response) => {
    let id: string = req.params.id;
    connection.query("DELETE FROM Patients WHERE `Patients`.`ID` = ?", [id], (error: any, results: any) => {
        if (error) {
            console.error(error);
            res.status(500).send("No se ha logrado eliminar al paciente de la lista.");
        } else if (results.affectedRows === 0) {
            res.status(404).send("No se encontró ningún paciente con el ID especificado");
        } else {    
            res.status(200).json("Se ha eliminado al paciente exitosamente");
        }
    });
});
// 
// Método PUT (Actualiza los datos de un paciente existente)
// ARCHIVO TIPO JSON ES NECESARIO PARA QUE FUNCIONE!
// EJ: {"IDProfessional":1,"firstname":"Juan","middlename":"Lastarria","lastname":"Alcayaga","rut":"7.879.514-1","birthdate":"1956-12-15","age":75,"gender":true,"address":"calle 123 valparaiso","phone":"+56948484884","insurance":"fonasa","diagnostics":"pulmonia","treatments":"antibioticos","observations":"ninguna"}
app.put("/updatePatient/:id", jsonParser, (req: Request, res: Response) => {
    let id: number = parseInt(req.params.id);
    let IDProfessional: number = req.body.IDProfessional;
    let firstname: string = req.body.firstname;
    let middlename: string = req.body.middlename;
    let lastname: string = req.body.lastname;
    let rut: string = req.body.rut;
    let birthdate: Date = req.body.birthdate;
    let age: number = req.body.age;
    let gender: boolean = req.body.gender;
    let address: string = req.body.address;
    let phone: string = req.body.phone;
    let insurance: string = req.body.insurance; 
    let diagnostics: string = req.body.diagnostics;
    let treatments: string = req.body.treatments;
    let observations: string = req.body.observations;
    connection.query("UPDATE Patients SET IDProfessional=?, firstname=?, middlename=?, lastname=?, rut=?, birthdate=?, age=?, gender=?, address=?, phone=?, insurance=?, diagnostics=?, treatments=?, observations=? WHERE ID=?", [IDProfessional, firstname, middlename, lastname, rut, birthdate, age, gender, address, phone, insurance, diagnostics, treatments, observations, id], (error: any, results: any, fields: any) => {
        if (error) {
            console.error("Error al actualizar al paciente: ", error);
            res.status(500).send("Error al actualizar al paciente");
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).send("No se encontró ningún paciente asociado a la ID");
            return;
        }
        console.log("Paciente actualizado exitosamente!");
        res.status(200).send("Paciente actualizado exitosamente");
    });
});




