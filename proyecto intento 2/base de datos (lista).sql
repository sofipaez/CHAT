CREATE TABLE Chats (
	IDChat int NOT NULL,
	PRIMARY KEY (IDChat),
    NombreChat int NOT NULL
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
	IDMensaje int NOT NULL,
	PRIMARY KEY (IDMensaje),
    fecha DATE,
    mensaje text NOT NULL
    );
    
CREATE TABLE Contactos_Chats(
	IDChat int NOT NULL,
    IDContacto int NOT NULL,
	FOREIGN KEY (IDChat) REFERENCES Chats(IDChat),
	FOREIGN KEY (IDContacto) REFERENCES Contactos(IDContacto),
    IDcc int NOT NULL,
	PRIMARY KEY (IDcc)
);