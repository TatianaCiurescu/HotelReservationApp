CREATE database ReservationDb

USE ReservationDb

CREATE Table Reservation
(
Id int NOT NULL IDENTITY(1,1) PRIMARY KEY,
FirstName nvarchar (50) NOT NULL ,
LastName nvarchar (50) NOT NULL ,
Cnp nvarchar(50) NOT NULL,
Phone int,
RoomNo int,
CheckIn datetime,
CheckOut datetime
)

INSERT INTO Reservation VALUES
('Nicu', 'Ionescu', '1901231678950', 0720001122, 22, '2022-10-08','2022-10-15'),
('Vasile', 'Popescu', '1880731652820', 0721233442, 10, '2022-11-09','2022-11-12'),
('Ion', 'Ion', '1761264836801', 0720001121, 5, '2022-02-08','2022-03-07'),
('Ana', 'Ionescu', '2901231678950', 0730001122, 19, '2023-01-08','2023-01-14'),
('Vali', 'Andrei', '1901231558950', 0740004422, 13, '2022-09-08','2022-09-15'),
('Dani', 'Iordan', '1901231678950', 0751001122, 23, '2022-10-08','2022-11-11')

SELECT * FROM Reservation