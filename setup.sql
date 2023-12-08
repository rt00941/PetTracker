-- SQL Queries to setup database

-- Create Database

CREATE DATABASE PetsDatabase

-- Create Type: species

CREATE TYPE species AS ENUM ('Cat', 'Dog', 'Bird');

-- Create Table: pets_table

CREATE TABLE IF NOT EXISTS pets_table
(
    pet_id SERIAL,
    name text NOT NULL,
    pictureurl text NOT NULL,
    friendly boolean,
    specie species NOT NULL
)