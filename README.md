# userdetailsexpressnodejs

#create table inside the user table as:-

create table user (id int NOT NULL, city varchar(255), created_at datetime(6), logo varchar(255), name varchar(255), phone_no varchar(255), updated_at datetime(6), zip_code varchar(255), street varchar(255),

PRIMARY KEY(id) );

#Alter table add auto_increment

alter table user modify id INT NOT NULL AUTO_INCREMENT;
