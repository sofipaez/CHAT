CREATE TABLE Usuarios(
	id_usuario INT NOT NULL PRIMARY KEY,
	usuario TEXT,
    nombre_completo TEXT,
	gmail TEXT,
	contraseña TEXT
);
CREATE TABLE Juego(
    nivel int NOT NULL PRIMARY KEY,
    puntuacion_max INT,
    id_usuario INT,
	FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario)
);
CREATE TABLE Casillas(
	id_ods int NOT NULL PRIMARY KEY,
	descripcion TEXT
);
INSERT INTO Usuarios (id_usuario, usuario, nombre_completo, gmail, contraseña)
Values (12345678, "sopa", "sofi paez", "so@gmail.com", "123"),(78951472, "catape", "cata perinetti", "catap@gmail.com", "2807"),(45679812, "rober","robertiño","rob@gnmail.com","2211"); 

INSERT INTO Juego (nivel, puntuacion_max, cant_partidas, id_usuario)
VALUES (1,100,3,12345678),(3,50,7,78951472),(5,200,4,45679812);

INSERT INTO Casillas (id_ods, descripcion)
Values (1, "Fin de la pobreza: Propone poner fin a la pobreza en todas sus dimensiones para el año 2030. Requiere enfocarse en los más vulnerables, aumentar el acceso a los recursos y servicios básicos y apoyar a las comunidades afectadas por conflictos y desastres relacionados con el clima."),
(2, "Hambre cero: Propone terminar con todas las formas de hambre y desnutrición para 2030 y velar por el acceso de todas las personas, en especial los niños, a una alimentación suficiente y nutritiva durante todo el año."),
(3, "Salud y bienestar: Propone terminar con la pobreza, reducir las desigualdades y asegurar una buena salud para todas las personas."),
(4, "Educación de calidad: Propone lograr una educación inclusiva y de calidad para todos. Busca asegurar que todas las niñas y niños completen su educación primaria y secundaria gratuita para 2030."),
(5, "Igualdad de género: Propone garantizar el acceso universal a salud reproductiva y sexual y otorgar a la mujer derechos igualitarios en el acceso a recursos económicos, como tierras y propiedades."),
(6, "Agua limpia y saneamiento: Propone garantizar el acceso universal al agua potable segura y asequible para todos."),
(7, "Energía asequible y no contaminante: Propone garantizar el acceso universal a servicios energéticos asequibles, fiables y modernos."),
(8, "Trabajo decente y crecimiento económico: Propone lograr empleo pleno y productivo y un trabajo decente para todos los hombres y mujeres."),
(9, "Industria, innovación e infraestructura: Propone garantizar el acceso igualitario a la información y el conocimiento, y promover la innovación y el emprendimiento."),
(10, "Reducción de las desigualdades: Propone mejorar la regulación y el control de los mercados y las instituciones financieras y fomentar la asistencia para el desarrollo y la inversión extranjera directa para las regiones que más lo necesiten. Facilitar la migración y la movilidad segura de las personas."),
(11, "Ciudades y comunidades sostenibles: Propone mejorar la seguridad y la sostenibilidad de las ciudades y garantizar el acceso a viviendas seguras y asequibles y el mejoramiento de los asentamientos marginales."),
(12, "Producción y consumo responsables: Propone lograr la gestión sostenible y el uso eficiente de los recursos naturales."),
(13, "Acción por el clima: Propone abordar las necesidades de los países en desarrollo en cuanto a adaptación al cambio climático e inversión en el desarrollo bajo en carbono."),
(14, "Vida submarina: Propone ordenar y proteger de manera sostenible los ecosistemas marinos y costeros de la contaminación terrestre."),
(15, "Vida de ecosistemas terrestres: Propone reducir la pérdida de hábitats naturales y biodiversidad que forman parte de nuestro patrimonio común y apoyar la seguridad alimentaria y del agua a nivel mundial, la mitigación y adaptación al cambio climático, la paz y la seguridad."),
(16, "Paz, justicia e instituciones sólidas: Propone reducir sustancialmente todas las formas de violencia y poner fin al maltrato, la explotación, la trata y todas las formas de violencia y tortura contra los niños."),
(17, "Alianza para lograr los objetivos: La finalidad de los objetivos es mejorar la cooperación Norte-Sur y Sur-Sur, apoyando los planes nacionales en el cumplimiento de todas las metas. Promover el comercio internacional y ayudar a los países en desarrollo para que aumenten sus exportaciones. Lograr un sistema de comercio universal equitativo y basado en reglas que sea justo, abierto y beneficie a todos.");
 


