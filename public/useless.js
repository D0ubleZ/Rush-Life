CREATE TABLE Customers (
    Name varchar(255) NOT NULL PRIMARY KEY,
    Password varchar(255),
    age float(10),
    gender varchar(255),
    height float(10),
    weight float(10),
    food varchar(255),
    fat_percent float(10),
    time float(10)

);

INSERT INTO Customers (Name, Password,age,gender,height,weight,food,fat_percent,time)
VALUES ('admin','admin','18','male','180','60','chicken','13','0');

INSERT INTO Customers (Name, Password,age,gender,height,weight,food,fat_percent,time)
VALUES ('guest','guest','23','male','190','66','beef','20','0');

INSERT INTO Customers (Name, Password,age,gender,height,weight,food,fat_percent,time)
VALUES ('new','new','18','female','182','50','beef','15','0');

INSERT INTO Customers (Name, Password,age,gender,height,weight,food,fat_percent,time)
VALUES ('sam','sam','13','female','182','50','beef','25','0');

INSERT INTO Customers (Name, Password,age,gender,height,weight,food,fat_percent,time)
VALUES ('vitas','vitas','9','female','175','50','beef','18','0');

INSERT INTO Customers (Name, Password,age,gender,height,weight,food,fat_percent,time)
VALUES ('eric','eric','7','male','168','169','fish','17','0');

INSERT INTO Customers (Name, Password,age,gender,height,weight,food,fat_percent,time)
VALUES ('rick','rick','100','female','170','138','egg','10','0');

INSERT INTO Customers (Name, Password,age,gender,height,weight,food,fat_percent,time)
VALUES ('jim','jim','5','female','182','120','beef','16','0');

INSERT INTO Customers (Name, Password,age,gender,height,weight,food,fat_percent,time)
VALUES ('liana','liana','3','male','152','80','vegitable','22','0');


CREATE TABLE seven_day (
    Name varchar(255),
    day float(10),
    swim float(10),
    running float(10),
    mountaineering float(10),
    cycling_sport float(10),
    ball_games float(10),
    gym_exercise float(10),
    pork float(10),
    fish float(10),
    chicken float(10),
    egg float(10),
    rice float(10),
    noodle float(10),
    FOREIGN KEY (Name) REFERENCES Customers(Name)
);
