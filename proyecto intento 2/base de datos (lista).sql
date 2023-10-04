CREATE TABLE Chats (
	IDChat int auto_increment,
	PRIMARY KEY (IDChat),
    NombreChat text NOT NULL
    );

CREATE TABLE Contactos (
	IDContacto int NOT NULL,
	PRIMARY KEY (IDContacto),
    User text NOT NULL,
    Password text NOT NULL
    );
CREATE TABLE Mensajes (
	IDChat int NOT NULL,
    IDContacto int NOT NULL,
	FOREIGN KEY (IDChat) REFERENCES Chats(IDChat),
	FOREIGN KEY (IDContacto) REFERENCES Contactos(IDContacto),
	IDMensaje int auto_increment,
	PRIMARY KEY (IDMensaje),
    fecha DATE,
    mensaje text NOT NULL
    );
    
CREATE TABLE Contactos_Chats(
	IDChat int NOT NULL,
    IDContacto int NOT NULL,
	FOREIGN KEY (IDChat) REFERENCES Chats(IDChat),
	FOREIGN KEY (IDContacto) REFERENCES Contactos(IDContacto),
    IDcc int auto_increment,
	PRIMARY KEY (IDcc)
);

INSERT INTO Chats (IDChat, NombreChat) VALUES (1,"mama"), (2,"quinto b info"), (3,"FEDE"), (4,"cumple de uche");
INSERT INTO Contactos (IDContacto, User, Password) VALUES (987, "mariana", "123"),(12,"SOFI","2"),(1254, "MATIAS GALETTO","mg90");
INSERT INTO Mensajes(IDChat,IDContacto, fecha, mensaje) VALUES (1,987,"2023-09-10", "que vamos a comer?");
INSERT INTO Mensajes(IDChat,IDContacto, fecha, mensaje) VALUES (2,12,"2023-09-10", "madno tarea carrizo?");
INSERT INTO Mensajes(IDChat,IDContacto, fecha, mensaje) VALUES (3,1254,"2023-09-10", "que vamos a comer?");
INSERT INTO Mensajes(IDChat,IDContacto, fecha, mensaje) VALUES (4,12,"2023-09-10", "FELIZ CUMPLE!!!");
INSERT INTO Contactos_Chats (IDChat, IDContacto) VALUES (1, 987);
INSERT INTO Contactos_Chats (IDChat, IDContacto) VALUES (2, 12);
INSERT INTO Contactos_Chats (IDChat, IDContacto) VALUES (3, 1254);
INSERT INTO Contactos_Chats (IDChat, IDContacto) VALUES (4, 12);
