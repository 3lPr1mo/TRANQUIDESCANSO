--------TABLES-------
CREATE TABLE ciudad(
	id INT PRIMARY KEY NOT NULL,
	nombre VARCHAR (10) NOT NULL
);

CREATE TABLE categoria(
	id INT PRIMARY KEY NOT NULL,
	num_estrella VARCHAR (1) NOT NULL
);

CREATE TABLE hotel(
	id INT PRIMARY KEY NOT NULL,
	nombre VARCHAR (20) NOT NULL,
	direccion VARCHAR (20) NOT NULL,
	anio_inaguracion VARCHAR (4) NOT NULL,
	antiguedad INT NOT NULL,
	id_ciudad INT NOT NULL,
	FOREIGN KEY (id_ciudad) REFERENCES ciudad(id)
);

CREATE TABLE categoria_hotel(
	id_hotel INT NOT NULL,
	id_categoria INT NOT NULL,
	fecha_cambio DATE NOT NULL,
	PRIMARY KEY (id_Hotel,id_Categoria),
	FOREIGN KEY (id_Hotel) REFERENCES hotel(id),
	FOREIGN KEY (id_Categoria) REFERENCES categoria(id)
);

CREATE TABLE telefono_hotel(
	id_hotel INT NOT NULL,
	telefono VARCHAR (10) NOT NULL,
	PRIMARY KEY (id_Hotel,telefono),
	FOREIGN KEY (id_Hotel) REFERENCES hotel(id)
);

CREATE TABLE agencia(
	id INT PRIMARY KEY NOT NULL,
	nombre VARCHAR (10) NOT NULL
);

CREATE TABLE tipo_habitacion(
	id INT PRIMARY KEY NOT NULL,
	nombre VARCHAR (10) NOT NULL
);

CREATE TABLE habitacion(
	id INT PRIMARY KEY NOT NULL,
	id_tipohabitacion INT NOT NULL,
	reservada INT NOT NULL, --Solo recibe 1 y 0
	FOREIGN KEY (id_tipoHabitacion) REFERENCES tipo_habitacion(id)
);

CREATE TABLE titular(
	id INT PRIMARY KEY NOT NULL,
	nombre VARCHAR (30) NOT NULL,
	direccion VARCHAR (20) NOT NULL,
	id_agencia INT,
	FOREIGN KEY (id_Agencia) REFERENCES agencia(id)
);

CREATE TABLE telefono_titular(
	id_titular INT NOT NULL,
	telefono VARCHAR (10) NOT NULL,
	PRIMARY KEY (id_Titular,telefono),
	FOREIGN KEY (id_Titular) REFERENCES titular(id)
);

CREATE TABLE acompanante(
	id INT PRIMARY KEY NOT NULL,
	nombre VARCHAR (30) NOT NULL,
	edad INT NOT NULL,
	id_titular INT NOT NULL,
	mascota INT NOT NULL, --Solo recibe 1 y 0
	FOREIGN KEY (id_Titular) REFERENCES titular(id)
);

CREATE TABLE habitacion_titular(
	id_Titular INT NOT NULL,
	id_Habitacion INT NOT NULL,
	PRIMARY KEY (id_Titular,id_Habitacion),
	FOREIGN KEY (id_Titular) REFERENCES titular(id),
	FOREIGN KEY (id_Habitacion) REFERENCES habitacion(id)
);

CREATE TABLE registro_llegada(
	id INT PRIMARY KEY NOT NULL,
	fecha DATE NOT NULL,
	hora TIME NOT NULL
);

CREATE TABLE registro_salida(
	id INT PRIMARY KEY NOT NULL,
	fecha DATE NOT NULL,
	hora TIME (5) NOT NULL
);

CREATE TABLE servicio(
	id INT PRIMARY KEY NOT NULL,
	nombre VARCHAR (10) NOT NULL,
	valor REAL NOT NULL
);

CREATE TABLE reserva(
	id INT PRIMARY KEY NOT NULL,
	num_habitaciones INT NOT NULL,
	num_personas INT NOT NULL,
	fecha_inic DATE NOT NULL,
	fecha_fin DATE NOT NULL,
	valor REAL NOT NULL,
	valor_servicios REAL,--Inicia siendo null
	estado INT DEFAULT '1', --Solo recibe 1 y 0
	id_Hotel INT NOT NULL,
	id_Titular INT NOT NULL,
	id_Llegada INT,--Inicia siendo null
	id_Salida INT,--Inicia siendo null
	FOREIGN KEY (id_Hotel) REFERENCES hotel(id),
	FOREIGN KEY (id_Titular) REFERENCES titular(id),
	FOREIGN KEY (id_Llegada) REFERENCES registro_llegada(id),
	FOREIGN KEY (id_Salida) REFERENCES registro_salida(id)
);

CREATE TABLE pago(
	id INT PRIMARY KEY NOT NULL,
	fecha_pago DATE NOT NULL,
	valor REAL NOT NULL
);

CREATE TABLE pago_reserva(
	id_reserva INT NOT NULL,
	id_pago INT NOT NULL,
	total_pagado REAL,
	PRIMARY KEY (id_Reserva,id_Pago),
	FOREIGN KEY (id_Reserva) REFERENCES reserva(id),
	FOREIGN KEY (id_Pago) REFERENCES pago(id)
);

CREATE TABLE servicio_reserva(
	id_reserva INT NOT NULL,
	id_servicio INT NOT NULL,
	total_costo REAL,
	PRIMARY KEY (id_Reserva,id_Servicio),
	FOREIGN KEY (id_Reserva) REFERENCES reserva(id),
	FOREIGN KEY (id_Servicio) REFERENCES servicio(id)
);

---------CONSTRAINT------- 

ALTER TABLE registro_llegada 
ADD CONSTRAINT  fecha_chk 
CHECK (hora >= '15:00' AND hora <= '19:00');

ALTER TABLE categoria
ADD CONSTRAINT numEstrella_chk
CHECK (num_estrella ~ '^[0-5]$');

ALTER TABLE habitacion 
ADD CONSTRAINT  reserva_chk 
CHECK (reservada >= 0 AND reservada <= 1);

ALTER TABLE acompanante 
ADD CONSTRAINT  mascota_chk 
CHECK (mascota >= 0 AND mascota <= 1);
--------FUNCIONES---------

--------FUNCION SUMAR PAGOS DE UNA RESERVA%--------- 
CREATE FUNCTION calcular_total_pagado(reserva_id INT) 
RETURNS REAL 
AS 
$$ 
	DECLARE 
		total REAL; 
	BEGIN 
		SELECT COALESCE(SUM(valor), 0) INTO total 
		FROM pago_reserva 
		JOIN pago ON pago_reserva.id_Pago = pago.id 
		WHERE pago_reserva.id_Reserva = reserva_id; 

		UPDATE pago_reserva 
		SET total_pagado = total 
		WHERE id_Reserva = reserva_id; 

		RETURN total; 
	END; 
$$ 
LANGUAGE plpgsql; 

-- Crear el trigger
CREATE OR REPLACE FUNCTION actualizar_total_pagado()
    RETURNS TRIGGER AS
$$
BEGIN
    IF TG_OP = 'INSERT' THEN
        -- Obtener el ID de la reserva
        DECLARE
            reserva_id INT;
        BEGIN
            reserva_id := NEW.id_Reserva;
        
            -- Ejecutar la función calcular_total_pagado
            PERFORM calcular_total_pagado(reserva_id);
        END;
    END IF;

    RETURN NEW;
END;
$$
LANGUAGE plpgsql;

CREATE TRIGGER trigger_actualizar_total_pagado
AFTER INSERT ON pago_reserva
FOR EACH ROW
EXECUTE FUNCTION actualizar_total_pagado();

---------FUNCION PARA CAMBIAR ESTADO RESERVA 20%------

CREATE OR REPLACE FUNCTION trigger_cambiar_estado_reserva()
    RETURNS TRIGGER AS
$$
BEGIN
    -- Ejecutar la función calcular_total_pagado para actualizar el total pagado
    NEW.total_pagado := calcular_total_pagado(NEW.id_Reserva);

    -- Cambiar el estado de la reserva según el total pagado
    IF (NEW.total_pagado >= (SELECT valor FROM reserva WHERE id = NEW.id_Reserva) * 0.2) THEN
        UPDATE reserva
        SET estado = 1
        WHERE id = NEW.id_Reserva;
    ELSE
        UPDATE reserva
        SET estado = 0
        WHERE id = NEW.id_Reserva;
    END IF;

    RETURN NEW;
END;
$$
LANGUAGE plpgsql;

CREATE TRIGGER trigger_activar_cambiar_estado_reserva
AFTER INSERT OR UPDATE OF id_Reserva ON pago_reserva
FOR EACH ROW
EXECUTE FUNCTION trigger_cambiar_estado_reserva();

----FUNCION PARA CAMBIAR ESTADO HABITACION
CREATE FUNCTION cambiarEstadoHabitacion(idReserva INT)
RETURNS VOID
AS $$
BEGIN
    UPDATE habitacion
    SET reservada = CASE WHEN (SELECT estado FROM reserva WHERE id = idReserva) = 1 THEN 1 ELSE 0 END
    WHERE id IN (SELECT id_Habitacion FROM habitacion_titular WHERE id_Titular = (SELECT id_Titular FROM reserva WHERE id = idReserva));
END;
$$ LANGUAGE plpgsql;

-- Crear el trigger para cambiar el estado de la habitación
CREATE OR REPLACE FUNCTION trigger_cambiar_estado_habitacion()
    RETURNS TRIGGER AS
$$
BEGIN
    -- Obtener el ID de la reserva
    DECLARE
        reserva_id INT;
    BEGIN
        reserva_id := NEW.id_Reserva;

        -- Ejecutar la función cambiarEstadoHabitacion
        PERFORM cambiarEstadoHabitacion(reserva_id);
    END;

    RETURN NEW;
END;
$$
LANGUAGE plpgsql;

-- Crear el trigger que activa el trigger para cambiar el estado de la habitación
CREATE TRIGGER trigger_activar_cambiar_estado_habitacion
AFTER UPDATE OF estado ON reserva
FOR EACH ROW
WHEN (OLD.estado <> NEW.estado)
EXECUTE FUNCTION trigger_cambiar_estado_habitacion();

 -------FUNCION para saber si ya pago el total de la reserva
CREATE OR REPLACE FUNCTION cambiar_estado_habitacion()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.id_Llegada IS NOT NULL -- Verifica si se está actualizando el campo id_Llegada
    THEN
        -- Verifica si el total_pagado es igual al valor de la reserva
        IF EXISTS (
            SELECT 1
            FROM (
                SELECT pr.total_pagado, r.valor
                FROM pago_reserva pr
                JOIN reserva r ON pr.id_Reserva = r.id
                WHERE r.id = NEW.id
            ) subquery
            WHERE subquery.total_pagado >= subquery.valor
        )
        THEN
            -- Si el pago total es igual o mayor al valor de la reserva, no se cambia el estado
            NEW.estado := 1;
        ELSE
            -- Si el pago total no es igual al valor de la reserva, se actualiza el estado de las habitaciones a 0
            UPDATE habitacion
            SET reservada = 0
            WHERE id IN (SELECT id_Habitacion FROM habitacion_titular WHERE id_Titular = (SELECT id_Titular FROM reserva WHERE id = NEW.id));
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER evitarCambioEstado
BEFORE UPDATE OF id_Llegada
ON reserva
FOR EACH ROW
EXECUTE FUNCTION cambiar_estado_habitacion();

-- Función para calcular el total pagado por servicios de una reserva
CREATE FUNCTION calcular_total_servicios(reserva_id INT)
    RETURNS REAL
AS
$$
DECLARE
    total_servicios REAL;
BEGIN
    SELECT COALESCE(SUM(servicio.valore), 0)
    INTO total_servicios
    FROM servicio_reserva
    JOIN servicio ON servicio_reserva.id_Servicio = servicio.id
    WHERE servicio_reserva.id_Reserva = reserva_id;

    RETURN total_servicios;
END;
$$
LANGUAGE plpgsql;

-- Trigger para actualizar el campo "valor_servicios" en la tabla "reserva"
CREATE OR REPLACE FUNCTION actualizar_valor_servicios()
    RETURNS TRIGGER AS
$$
BEGIN
    IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
        -- Obtener el ID de la reserva
        DECLARE
            reserva_id INT;
            total_servicios REAL;
        BEGIN
            reserva_id := NEW.id_Reserva;

            -- Calcular el total de servicios utilizando la función calcular_total_servicios
            total_servicios := calcular_total_servicios(reserva_id);

            -- Actualizar el campo "valor_servicios" en la tabla "reserva"
            UPDATE reserva
            SET valor_servicios = total_servicios
            WHERE id = reserva_id;
        END;
    END IF;

    RETURN NEW;
END;
$$
LANGUAGE plpgsql;

-- Trigger/Disparador
CREATE TRIGGER trigger_actualizar_valor_servicios
AFTER INSERT OR UPDATE ON servicio_reserva
FOR EACH ROW
EXECUTE FUNCTION actualizar_valor_servicios();

------INSERTS 
INSERT INTO ciudad (id, nombre) 
VALUES (1, 'Ciudad A'), 
       (2, 'Ciudad B'), 
       (3, 'Ciudad C'); 
	   
-- Insertar valores en la tabla categoria
INSERT INTO categoria (id, num_estrella)
VALUES (1, '3'),
       (2, '4'),
       (3, '5');

-- Insertar valores en la tabla hotel 
INSERT INTO hotel (id, nombre, direccion, anio_inaguracion, antiguedad, id_ciudad) 
VALUES (1, 'Hotel X', 'Dirección X', '2000', 23, 1), 
       (2, 'Hotel Y', 'Dirección Y', '1998', 25, 2), 
       (3, 'Hotel Z', 'Dirección Z', '2010', 13, 3);

-- Insertar valores en la tabla categoria_hotel
INSERT INTO categoria_hotel (id_Hotel, id_Categoria, fecha_cambio)
VALUES (1, 1, '2022-01-01'),
       (2, 2, '2022-01-01'),
       (3, 3, '2022-01-01');

-- Insertar valores en la tabla telefono_hotel 
INSERT INTO telefono_hotel (id_Hotel, telefono) 
VALUES (1, '1234567890'), 
       (2, '9876543210'), 
       (3, '5555555555'); 

-- Insertar valores en la tabla agencia 
INSERT INTO agencia (id, nombre) 
VALUES (1, 'Agencia A'), 
       (2, 'Agencia B'), 
       (3, 'Agencia C'); 
	   
-- Insertar valores en la tabla tipo_habitacion 
INSERT INTO tipo_habitacion (id, nombre) 
VALUES (1, 'Individual'), 
       (2, 'Doble'), 
       (3, 'Suite'); 

-- Insertar valores en la tabla habitacion 
INSERT INTO habitacion (id, id_TipoHabitacion, reservada) 
VALUES (1, 1, 0), 
       (2, 1, 1), 
       (3, 2, 1); 

-- Insertar valores en la tabla titular 

INSERT INTO titular (id, nombre, direccion, id_Agencia) 
VALUES (1, 'Titular A', 'Dirección A', 1), 
       (2, 'Titular B', 'Dirección B', 2), 
       (3, 'Titular C', 'Dirección C', 3); 

-- Insertar valores en la tabla telefono_titular 

INSERT INTO telefono_titular (id_Titular, telefono) 
VALUES (1, '1111111111'), 
       (2, '2222222222'), 
       (3, '3333333333'); 


-- Insertar valores en la tabla acompanante 

INSERT INTO acompanante (id, nombre, edad, id_Titular, mascota) 
VALUES (1, 'Acompañante A', 30, 1,0), 
       (2, 'Acompañante B', 25, 2,1), 
       (3, 'Acompañante C', 40, 3,0); 

-- Insertar valores en la tabla habitacion_titular 
INSERT INTO habitacion_titular (id_Titular, id_Habitacion) 
VALUES (1, 1), 
       (2, 2), 
       (3, 3); 
 
-- Insertar valores en la tabla registro_llegada 
INSERT INTO registro_llegada (id, fecha, hora) 
VALUES (1, '2022-01-01', '15:00:00'), 
       (2, '2022-02-15', '15:30:00'), 
       (3, '2022-03-20', '16:45:00'); 

-- Insertar valores en la tabla registro_salida 
INSERT INTO registro_salida (id, fecha, hora) 
VALUES (1, '2022-01-05', '10:00:00'), 
       (2, '2022-01-06', '11:30:00'), 
       (3, '2022-01-07', '09:45:00'); 

-- Insertar valores en la tabla servicio 
INSERT INTO servicio (id, nombre, valor) 
VALUES (1, 'Servicio A', 50.0), 
       (2, 'Servicio B', 75.0), 
       (3, 'Servicio C', 100.0); 	

-- Insertar valores en la tabla reserva 
INSERT INTO reserva (id, num_habitaciones, num_personas, fecha_inic, fecha_fin, valor, estado, id_Hotel, id_Titular) 
VALUES (1, 2, 4, '2022-01-01', '2022-01-05', 500.0, 1, 1, 1), 
       (2, 1, 2, '2022-01-02', '2022-01-06', 300.0, 1, 2, 2), 
       (3, 3, 6, '2022-01-03', '2022-01-07', 750.0, 1, 3, 3); 

-- Insertar valores en la tabla pago 
INSERT INTO pago (id, fecha_pago, valor) 
VALUES (1, '2022-01-02', 200.0), 
       (2, '2022-01-03', 100.0), 
       (3, '2022-01-04', 150.0);  

-- Insertar valores en la tabla servicio_reserva 
INSERT INTO servicio_reserva (id_Reserva, id_Servicio, total_costo) 
VALUES (1, 1,10), 
       (1, 2,20), 
       (2, 3,10), 
       (3, 1,10), 
       (3, 2,10), 
       (3, 3,10);
	   
-- Insertar valores en la tabla pago_reserva 
INSERT INTO pago_reserva (id_Reserva, id_Pago) 
VALUES (1, 1), 
       (1, 2), 
       (1, 3);
	   
Select*from habitacion
Select*from reserva
Select*from pago_reserva
Select*from servicio_reserva