-- datos para la tabla de categorías
INSERT IGNORE INTO category (name) VALUES 
('Hombres'),
('Mujeres'),
('Niños');

-- datos para la tabla de colores 
INSERT IGNORE INTO color (name) VALUES
('Plateado, Verde'),
('Plateado, Azul'),
('Plateado, Oro rosa'),
('Negro'),
('Lila'),
('Azul, Amarillo'),
('Marrón, Blanco'),
('Plateado, Azul'),
('Marrón oscuro'),
('Rosa, Plateado'),
('Azul'),
('Rojo, Plateado'),
('Rojo, Plateado, Blanco'),
('Blanco'),
('Rosa'),
('Rojo');

-- datos para la tabla de correas
INSERT IGNORE INTO band (description)
VALUES
('Correa Plateada'),
('Piel de aligátor Azul'),
('Acero inoxidable con detalles en oro rosa de 18 quilates'),
('Piel de aligátor azul'),
('Silicona Lila'),
('Silicona Negra'),
('Tela elástica azul'),
('Cuero Marrón'),
('Acero inoxidable'),
('Cuero de cocodrilo'),
('Pulsera de acero inoxidable plateada'),
('Cuero perforado azul'),
('Correa de cocodrilo rojo'),
('Correa de cuero'),
('Correa de silicona rosa'),
('Correa de acero inoxidable plateada'),
('Correa de piel negra'),
('Correa de goma negra');

INSERT IGNORE INTO band (description)
VALUES
('Correa de silicón blanco'),
('Correa de caimán púrpura')

-- datos para la tabla de marcas
INSERT IGNORE INTO brand (name) VALUES 
('Rolex'),
('IWC'),
('Cartier'),
('Timex'),
('Lacoste'),
('Hermès'),
('Omega'),
('Longines'),
('Bvlgari'),
('TAG Heuer'),
('Jaeger-LeCoultre'),
('Patek Philippe');

INSERT IGNORE INTO brand (name) VALUES 
('Lorus')

-- datos para la tabla de modelos
INSERT IGNORE INTO model (name) VALUES
('Submariner'),
('Portuguese Automatic'),
('Ballon Bleu de Cartier'),
('Da Vinci Automatic'),
('Ironman'),
('2030042'),
('TW7C058009J'),
('Cape Cod'),
('Seamaster Diver 300M'),
('Master Watch'),
('Serpenti'),
('CBL2115.99FC6494'),
('Speedmaster'),
('Reverso Classic edición Sara Baras'),
('Kids RRX95EX9'),
('LA.9912.9912 Kids'),
('Calatrava 7200-200R-001'),
('RRX85HX-9');

-- datos para la tabla de cajas
INSERT IGNORE INTO box (description) VALUES
('Acero Inoxidable'),
('40.994 mm, Acero'),
('Acero inoxidable, 33 mm'),
('38 mm, Silicona, Lila'),
('33 mm, TR90'),
('Resina, 29 mm, Redondo'),
('3.993 cm, Acero'),
('42 mm, Acero inoxidable'),
('33 mm, Acero inoxidable y oro rosa'),
('39 mm, Acero inoxidable'),
('36 mm, Acero'),
('34.992 x 21 mm, Acero'),
('32 mm, Plástico blanco'),
('34 mm, Acero inoxidable'),
('34.996 mm, Oro rosa de 18 quilates'),
('36.995 mm, Plástico negro');

-- datos para la tabla de diales
INSERT IGNORE INTO dial (description)
VALUES
('Negro'),
('Plata con números arábigos'),
('Madreperla con marcadores de números romanos'),
('Plata'),
('Lila'),
('Vidrio negro mineral'),
('Blanco'),
('Gris'),
('Plateado con manecillas azules'),
('Blanco con números romanos y marcas de índice en rosa'),
('Cronógrafo azul con visualización de fecha'),
('Nácar con números arábigos'),
('Blanco con cristal acrílico'),
('Mineral'),
('Granulado plateado, números árabes'),
('Negro con marcadores en barras');

-- datos para la tabla de movimiento
INSERT IGNORE INTO movement (description)
VALUES 
('Cronómetro de 31 Joyas'),
('Automático, Calibre 82200'),
('Automático, Calibre Cartier 076'),
('Automático'),
('Cuarzo'),
('Automático suizo'),
('Mecánico, Calibre Omega 3220'),
('Cuarzo, Calibre Y121, Maquinaria Japonesa'),
('Automático, Calibre 240'),
('Cuarzo, Calibre Y121');

-- datos para la tabla de resistencia al agua
INSERT IGNORE INTO water_resistance (description) 
VALUES 
('1000 pies'),
('3 ATM'),
('30 m'),
('100 m'),
('5 ATM'),
('300 m'),
('10 ATM');

INSERT IGNORE INTO water_resistance (description) 
VALUES 
('50 m')


-- -- Triggers para mi tabla de product
DELIMITER //

CREATE TRIGGER before_insert_product
BEFORE INSERT ON product
FOR EACH ROW
BEGIN
    IF NEW.99offer = 0 THEN
        SET NEW.99discount_percentage = 0;
    END IF;
END; //

DELIMITER ;

DELIMITER //

CREATE TRIGGER before_update_product
BEFORE UPDATE ON product
FOR EACH ROW
BEGIN
    IF NEW.99offer = 0 THEN
        SET NEW.99discount_percentage = 0;
    END IF;
END; //

DELIMITER ;


-- datos para la tabla de productos
INSERT INTO product (
name, 
description, 
category_id, color_id, price, brand_id, 
model_id, box_id, dial_id, 
movement_id, band_id, water_resistance_id, 
stock, offer, discount_percentage) 
VALUES 
('Rolex Submariner', 
'Experimenta la elegancia clásica del Rolex Submariner con este modelo pre-owned 16610. Con un llamativo bisel verde personalizado, este reloj combina el atractivo atemporal del acero inoxidable con la sofisticación de una esfera negra y un cristal de zafiro. El reloj está en excelente estado, reflejando su cuidado meticuloso.',
1, 1, 9995.99, 1, 
1, 1, 1, 
1, 1, 1, 
8, 1, 15),
('IWC Portugieser', 
'El IWC Portuguese Automatic, modelo IW358304, es un elegante reloj con caja de acero inoxidable de 40.994 mm y cristal de zafiro. Su movimiento automático calibre 82200 ofrece una reserva de marcha de 60 horas y una precisión destacada. La esfera de plata con números arábigos y el pequeño segundero con función de parada complementan su sofisticado diseño. La correa de piel de aligátor azul con cierre desplegable de acero proporciona comodidad y estilo. El reloj es nuevo y se entrega con estuche y documentos originales.',
1, 2, 8470.99, 2, 
2, 2, 2, 
2, 2, 2, 
6, 0, 0),
('Cartier Ballon Bleu', 
'Este reloj de lujo para mujer de Cartier, modelo Ballon Bleu, cuenta con una caja redonda de 33 mm de acero inoxidable y eslabones centrales en oro rosa de 18 quilates. Su esfera de nácar tiene agujas azules y marcadores de hora en números romanos. Funciona con un movimiento automático y está protegido por un cristal de zafiro resistente a los arañazos. Es resistente al agua hasta 30 m y tiene un cierre desplegable. Con una reserva de marcha de 38 horas, este reloj es un ejemplo de la sofisticación suiza.',
2, 3, 6880.99, 3, 
3, 3, 3, 
3, 3, 3, 
4, 0, 0),
('IWC Da Vinci Automatic', 
'El IWC Da Vinci Fases de la Luna (referencia IW459306) es una pieza destacada en acero inoxidable con un diámetro de 36 mm. Su elegante caja, cristal de zafiro y movimiento automático IWC calibre 35800 ofrecen precisión y durabilidad. La correa de piel de caimán, con hebilla desplegable de acero, aporta lujo y confort, aunque muestra signos de desgaste. Revisado por un relojero certificado de IWC, el reloj está en buen estado y cuenta con garantía internacional hasta 2029.',
2, 4, 5087.99, 2, 
4, 11, 4, 
4, 2, 2, 
6, 1, 10),
('Timex Iron Kids', 
'El Timex Ironman Fusion TW5M17300 es un reloj deportivo unisex con una caja y correa de silicona lila. Con un diámetro de 38 mm, su esfera también es lila, y tiene agujas y subesferas a juego. Ofrece una resistencia al agua de hasta 100 m, ideal para uso diario y actividades acuáticas. Equipado con movimiento de cuarzo y luz nocturna Indiglo, es ligero (60 g) y tiene un cierre de hebilla simple. Su diseño liso y colorido lo hacen tanto funcional como estilizado, aunque no incluye alarma.',
3, 5, 1263.99, 4, 
5, 4, 5, 
5, 4, 4, 
5, 0, 0),
('Lacoste Reloj Analógico', 
'El reloj Lacoste modelo 2030042, diseñado especialmente para niños, ofrece un estilo moderno con una caja de 32 mm y una esfera negra destacada por el logo de Lacoste. Su correa de silicona negra de 15 mm proporciona comodidad y resistencia. Con una resistencia al agua de 5 ATM, es adecuado para duchas y natación, pero no para buceo profundo. El bisel de acero inoxidable es fijo, y el cierre tipo tongue buckle asegura un ajuste seguro. Ligero y práctico, con un peso de solo 24 g, es perfecto para el uso diario de los más jóvenes.',
3, 4, 44.99, 5, 
6, 5, 6, 
5, 5, 5, 
4, 0, 0),
('Timex Time Machines', 
'Facilite el aprendizaje de la hora para los niños con el reloj analógico de Timex diseñado especialmente para ellos. Con números grandes y marcas de minutos en el borde, este reloj ayuda a los más jóvenes a comprender cómo leer la hora. La correa de tela elástica en rayas amarillas y azul marino es cómoda y fácil de ajustar, y su hebilla práctica asegura un ajuste seguro. Además, el reloj es resistente al agua, haciéndolo duradero y adecuado para el uso diario de los niños. Ideal tanto para niños como para niñas, este reloj combina elegancia con funcionalidad, haciendo que aprender a decir la hora sea una experiencia divertida y accesible.',
3, 6, 29.99, 4, 
7, 6, 7, 
5, 6, 3, 
4, 0, 0),
('Hermès Cape Cod', 
'Este reloj Hermès para caballero, modelo Cape Cod, presenta una caja de acero inoxidable de 3.993 cm con una esfera blanca y correa de cuero marrón. Su movimiento de cuarzo garantiza precisión, mientras que las agujas luminiscentes y el segundero central ofrecen visibilidad en condiciones de poca luz. Con funciones de día y un broche plegable, el reloj está en buen estado, aunque muestra leves marcas de uso. Con un peso de 61.996 g, es una pieza elegante y funcional. Se entrega solo el reloj.',
1, 7, 26735.99, 6, 
8, 7, 7, 
5, 7, 3, 
6, 0, 0),
('Omega Seamaster Diver', 
'El Omega Seamaster Diver 300M (modelo 210.9930.9942.9920.9906.99001) es un reloj de lujo con una caja de acero inoxidable de 42 mm y una esfera gris con patrón de ondas oceánicas. Ofrece una resistencia al agua de hasta 300 m, ideal para el buceo, y cuenta con un bisel unidireccional azul, cristal de zafiro, y válvula de helio. Su movimiento automático de 35 joyas asegura precisión cronométrica. Con una correa de acero inoxidable y cierre de hebilla, el reloj combina estilo elegante con funcionalidades avanzadas.',
1, 2, 4416.99, 7, 
9, 8, 8, 
4, 8, 6, 
3, 0, 0),
('Longines Master Collection', 
'El Longines Master Watch (modelo L2.99893.994.9978.993) es un elegante reloj masculino con una caja de acero inoxidable plateado de 42 mm y una esfera plateada con agujas azules. Su banda de cuero de cocodrilo marrón y el cristal de zafiro resistente a los arañazos aportan un toque de sofisticación. Con movimiento automático, resistencia al agua de 30 m y funciones de fecha, hora, minuto y segundo, este reloj combina precisión y estilo clásico. La caja tiene un diseño de esqueleto y un cierre de despliegue para un ajuste seguro.',
1, 8, 2296.99, 8, 
10, 8, 9, 
4, 9, 3, 
8, 0, 0),
('Bvlgari Serpenti White Women', 
'El Bvlgari Serpenti Seduttori 103144 presenta una esfera opalina plateada con manecillas de oro rosa en forma de espada. La caja y pulsera de acero inoxidable plateado complementan el diseño. Cuenta con movimiento de cuarzo, resistencia al agua de 50 m, y cristal de zafiro resistente a arañazos. El reloj tiene un tamaño de 33 mm y un cierre desplegable con botón de liberación. La corona está adornada con un cabujón de zafiro rosa.',
2, 9, 6143.99, 9, 
11, 9, 10, 
5, 10, 3, 
4, 1, 10),
('Tag Heuer Monaco', 
'El TAG Heuer Monaco X Gulf Chronograph (modelo CBL2115.99FC6494) es un elegante reloj con una caja cuadrada de acero inoxidable de 39 x 39 mm y una esfera azul con cronógrafo y fecha. Presenta una correa de cuero perforado azul, movimiento automático suizo, y cristal de zafiro resistente a los arañazos. Con una resistencia al agua de 100 m y un cierre de despliegue con liberación de botón pulsador, combina estilo sofisticado y funcionalidad.',
1, 10, 8605.99, 10, 
12, 10, 11, 
6, 11, 4, 
5, 0, 0),
('Omega Speedmaster Women', 
'El Omega Speedmaster es un reloj elegante y funcional, con una caja de acero de 36 mm, bisel rojo con diamantes, esfera de nácar blanca y correa de cocodrilo roja. Equipado con un movimiento mecánico cronógrafo Omega calibre 3220, tiene una reserva de marcha de 40 horas y cristal de zafiro resistente a arañazos. Es resistente al agua hasta 10 ATM, combinando estilo y precisión.',
2, 11, 5703.99, 7, 
13, 11, 12, 
7, 12, 7, 
5, 0, 0),
('Jaeger-LeCoultre Reverso', 
'Jaeger-LeCoultre celebra el Arte Español con el Reverso Classic, un reloj que rinde homenaje a la bailaora y coreógrafa Sara Baras con un grabado en su parte posterior. Este modelo combina elegancia y pasión, presentando una caja de acero noble de 34.992 x 21 mm, una esfera plateada, y una correa de cuero en un vibrante rojo intenso.',
2, 12, 12400.99, 11, 
14, 12, 7, 
5, 13, 3, 
4, 0, 0),
('Reloj Lorus Kids RRX95EX9', 
'Somos los distribuidores oficiales y exclusivos de Lorus en México, ofreciendo modelos 100% nuevos y originales con etiquetas. Todos los relojes incluyen estuche original, instructivo y garantía limitada de un año. El reloj Lorus Kids es unisex, con movimiento de cuarzo japonés, resistente al agua hasta 100 m, y tiene una caja de plástico blanco de 32 mm y correa de silicón blanca. Envío sin costo en todo México y garantía de un año por defectos de fabricación.',
3, 13, 79.99, 13, 
15, 13, 13, 
8, 19, 4, 
7, 0, 0),
('Reloj Lacoste para niña', 
'Este reloj Lacoste, diseñado especialmente para niñas, combina un estilo deportivo con comodidad y atención al detalle. Con una caja de acero inoxidable de 34 mm, resistente al agua hasta 50 m, y una correa de silicón, es perfecto para el uso diario. Su mecanismo de cuarzo garantiza precisión, mientras que el cristal mineral ofrece durabilidad. Además, es una edición especial para celebrar el Año Nuevo chino, ideal para quienes buscan un accesorio moderno y funcional.',
3, 14, 1199.99, 5, 
16, 14, 14, 
5, 14, 8, 
6, 0, 0),
('Reloj Automático Calatrava',
'Este sofisticado reloj Patek Philippe de la serie Calatrava presenta una elegante caja de oro rosa de 18 quilates, complementada por una correa de piel de aligátor violeta. Su bisel fijo, adornado con 142 diamantes (~1,08 ct), y la esfera plateada granulada con agujas en oro rosa y números arábigos, destacan por su refinamiento. El movimiento automático Calibre 240, con una reserva de marcha de 48 horas, está protegido por un cristal de zafiro resistente a los arañazos. Con un diámetro de 34,6 mm y un grosor de 7,37 mm, este reloj es resistente al agua hasta 30 m. Un verdadero lujo en cada detalle.',
2, 15, 32552.99, 12, 
17, 15, 15, 
9, 20, 3, 
7, 1, 20),
('Lorus Sports RRX85HX-9',
'Este reloj analógico para jóvenes combina estilo y funcionalidad. Equipado con movimiento de cuarzo y una correa de silicona negra, es resistente al agua hasta 100 metros. Su diseño incluye una caja de plástico negra y un dial negro con marcadores en forma de barras, ideal para un uso diario activo.',
3, 4, 69.99, 13, 
18, 16, 16, 
10, 19, 4, 
3, 0, 0);

ALTER TABLE product
MODIFY offer TINYINT;

ALTER TABLE product
MODIFY discount_percentage INT;


-- datos para la tabla de usuarios
INSERT INTO user (id, first_Name, last_Name, email, password, type, phone, url) VALUES
(1, 'Robin', 'Macveigh', 'rmacveigh0@patch.com', '$2a$04$jt6E6.vz8Z.Xj8LE./gcuOGgEAV2J1DHyEqWloIYCNWt10VDfQBPS', 'Registrado', '331-472-4987', 'http://localhost:3000/images/users/RobinMacveigh.jpg'),
(2, 'Zea', 'Bennett', 'zbennett1@google.co.jp', '$2a$04$Ny76Mh7xdoslqQMvCw400e2KQ76zlcwcHTd5l04sicvMSriCSjOLS', 'Registrado', '188-594-6973', 'http://localhost:3000/images/users/ZeaBennett.jpg'),
(3, 'Shelia', 'Chstney', 'schstney2@moonfruit.com', '$2a$04$gwbwH8ZVtbLEwRAwQUpzL.Gnnge6yRcIbsZdSqoGuZ1RVH6VM0svW', 'Registrado', '747-362-9020', 'http://localhost:3000/images/users/SheliaChstney.jpg'),
(4, 'Gerome', 'Feilden', 'gfeilden3@samsung.com', '$2a$04$JxkLT373dNbk9hM2KIAirOY22ya4Im1rHv3afyXedIshb1ywj1z.G', 'Registrado', '668-708-2546', 'http://localhost:3000/images/users/GeromeFeilden.jpg'),
(5, 'Glad', 'Warricker', 'gwarricker4@timesonline.co.uk', '$2a$04$9UgM25KY7RKhQEajvagXc.vQ4uvr59mMLn2RmprtI1GxAQLikxRDO', 'Registrado', '821-315-8964', 'http://localhost:3000/images/users/GladWarricker.jpg'),
(6, 'Rona', 'McCay', 'rmccay5@jigsy.com', '$2a$04$Gs92Xr5nrpP3QtE/hbP42OUKFwPTUoP5whfGjlOClJz.8Tb6FeuoG', 'Registrado', '174-453-7342', 'http://localhost:3000/images/users/RonaMcCay.jpg'),
(7, 'Devinne', 'Kinghorn', 'dkinghorn6@trellian.com', '$2a$04$BcC9UuYxi7o13Ad5HVsY2OZk1i0mQiYn8bYreSMH0WbHEy7YbPoiy', 'Registrado', '700-679-7815', 'http://localhost:3000/images/users/DevinneKinghorn.jpg'),
(8, 'Papageno', 'Iannello', 'piannello7@dmoz.org', '$2a$04$HpT.EgMRIpmWJYqYywR34eIKtQO3nxMomY1uOrMT6MchtnES.s3jK', 'Registrado', '718-425-2844', 'http://localhost:3000/images/users/PapagenoIannello.jpg'),
(9, 'Kelsi', 'Lovemore', 'klovemore8@mozilla.org', '$2a$04$CYWJk2x7fEFaxR8uc76e/Oe4gMxBbHfIJ/BMk0dSAs0dW6nvEbuZq', 'Registrado', '500-575-7986', 'http://localhost:3000/images/users/KelsiLovemore.jpg'),
(10, 'Cecilla', 'Atwill', 'catwill9@spiegel.de', '$2a$04$kVO2Ghgpgh65i8AT53s60.tvNbxcFOVCGTDDGcrlzP8lUhpIXejDS', 'Registrado', '271-254-6899', 'http://localhost:3000/images/users/CecillaAtwill.jpg'),
(11, 'Dionne', 'Branston', 'dbranstona@shutterfly.com', '$2a$04$ilSXzzJNKUqkRYxuG8M0AupTgcCmj6SH8QSf00Rlz9VgqAfVaEwBS', 'Administrador', '372-213-6454', 'http://localhost:3000/images/users/DionneBranston.jpg'),
(12, 'Lin', 'Chalcraft', 'lchalcraftb@naver.com', '$2a$04$k5HwvjTKqxTv52W1924VmOPE6Xrd7OL0w0nOmQB4xGNv110DhQRNq', 'Registrado', '740-368-3502', 'http://localhost:3000/images/users/LinChalcraft.jpg'),
(13, 'Tore', 'Sorsbie', 'tsorsbiec@mail.ru', '$2a$04$sP8zZSyRKb54BD0VdFMWIu3q7g4/ryngnKtKAeIjfzVCJV36LBmgW', 'Registrado', '226-156-8114', 'http://localhost:3000/images/users/ToreSorsbie.jpg'),
(14, 'Tod', 'Holttom', 'tholttomd@pcworld.com', '$2a$04$Mw1qzgAveoAOxHRiSsFR.uFYzFLFtJPQCLWW17IvdqieDSxZUbhAS', 'Registrado', '189-860-5703', 'http://localhost:3000/images/users/TodHolttom.jpg'),
(15, 'Babs', 'Nystrom', 'bnystrome@ihg.com', '$2a$04$QLHB6WV0IfUPz8o6yKpW9.QI5Hab.umBBHpvs1APxJ/p6Z8rD5/Tq', 'Registrado', '768-703-0407', 'http://localhost:3000/images/users/BabsNystrom.jpg'),
(16, 'Alanah', 'Rupke', 'arupkef@msn.com', '$2a$04$rwcqskegBwzmeRy3S8mV1OtYYHISQQv752qMGPrr2JjeZG9ofKu7m', 'Registrado', '552-757-7394','http://localhost:3000/images/users/AlanahRupke.jpg'),
(17, 'Darelle', 'Van Castele', 'dvancasteleg@oakley.com', '$2a$04$Gv0/AM.lVH2o6EAdPnPq1eNZlZE8E1PX5bzG/EdM/sJeZVwI0NPyK', 'Registrado', '165-231-2524', 'http://localhost:3000/images/users/DarelleVanCastele.jpg'),
(18, 'Joel', 'Tuffin', 'jtuffinh@constantcontact.com', '$2a$04$5zVlcGVW79x0Q14jhE0CZej0mQkcElndhPs.ThL.SOUaWBTLFxX4e', 'Registrado', '539-787-7705', 'http://localhost:3000/images/users/JoelTuffin.jpg'),
(19, 'Alcibiades', 'Acosta', 'alcibiadesacosta99@gmail.com', '$2a$10$QbFj8wj5OBYkj5Y2givJs.F5MxhFCfzbBleWqThYPi/1BdkpBXU5q', 'Administrador', '1234-5678', 'http://localhost:3000/images/users/AlcibiadesAcosta.png'),
(20, 'Rubi', 'Pretor', 'rpretorj@cpanel.net', '$2a$04$xMUbNNZqEivtWG7PIW0bEO/C5ydvmxedxxZsQJ9T2dqm9AzBri0PG', 'Registrado', '937-414-3706', 'http://localhost:3000/images/users/RubiPretor.jpg');



-- datos para tabla de carritos
INSERT INTO cart (user_id, fecha_de_creacion)
SELECT
    id,
    CURDATE() - INTERVAL FLOOR(RAND() * 30) DAY
FROM
    user
WHERE
    type = 'Registrado';

-- datos para la tabla de detalles del carrito
INSERT INTO cart_detail (cart_id, product_id, quantity, unit_price)
SELECT
    c.id AS cart_id,
    p.id AS product_id,
    FLOOR(RAND() * 3) + 1 AS quantity, -- Cantidad aleatoria entre 1 y 3
    p.price AS unit_price -- Precio unitario del producto
FROM
    cart c
JOIN
    product p ON p.id IS NOT NULL
WHERE
    EXISTS (
        SELECT 1
        FROM user u
        WHERE u.id = c.user_id AND u.type = 'Registrado'
    )
    AND (SELECT COUNT(*) FROM cart_detail cd WHERE cd.cart_id = c.id) < 10
ORDER BY
    RAND();

-- datos para la tabla de imagenes
INSERT INTO product_image (product_id, image_type, url, created_at, updated_at)
VALUES
(1, 'product', 'http://localhost:3000/images/productos/RolexSubmariner.jpg', NOW(), NOW()),
(2, 'product', 'http://localhost:3000/images/productos/IWCPortugieser.jpg', NOW(), NOW()),
(3, 'product', 'http://localhost:3000/images/productos/CartierBallonBleu.jpg', NOW(), NOW()),
(4, 'product', 'http://localhost:3000/images/productos/IWCDaVinciAutomatic.jpg', NOW(), NOW()),
(5, 'product', 'http://localhost:3000/images/productos/TimexIronKids.jpg', NOW(), NOW()),
(6, 'product', 'http://localhost:3000/images/productos/LacosteRelojAnalogicoCuarzo.jpg', NOW(), NOW()),
(7, 'product', 'http://localhost:3000/images/productos/TimexTimeMachines.jpg', NOW(), NOW()),
(8, 'product', 'http://localhost:3000/images/productos/HermèsCapeCod.jpg', NOW(), NOW()),
(9, 'product', 'http://localhost:3000/images/productos/OmegaSeamasterDiver.jpg', NOW(), NOW()),
(10, 'product', 'http://localhost:3000/images/productos/LonginesMasterCollection.jpg', NOW(), NOW()),
(11, 'product', 'http://localhost:3000/images/productos/BvlgariSerpentiWhiteWomen.jpg', NOW(), NOW()),
(12, 'product', 'http://localhost:3000/images/productos/TagHeuerMonaco.jpg', NOW(), NOW()),
(13, 'product', 'http://localhost:3000/images/productos/OmegaSpeedmasterWomen.jpg', NOW(), NOW()),
(14, 'product', 'http://localhost:3000/images/productos/Jaeger-LeCoultreReverso.jpg', NOW(), NOW()),
(15, 'product', 'http://localhost:3000/images/productos/RelojLorusKidsRRX95EX9.jpg', NOW(), NOW()),
(16, 'product', 'http://localhost:3000/images/productos/RelojLacosteparaniña.jpg', NOW(), NOW()),
(17, 'product', 'http://localhost:3000/images/productos/RelojAutomáticoCalatravaConDiamantes.jpg', NOW(), NOW()),
(18, 'product', 'http://localhost:3000/images/productos/LorusSportsRRX85HX9.jpg', NOW(), NOW());





