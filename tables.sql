CREATE DATABASE "laBoleria";

CREATE TABLE "cakes" (
  "id" serial PRIMARY KEY,
  "name" varchar NOT NULL UNIQUE,
  "price" numeric NOT NULL CHECK ("price" > 0),
  "image" varchar NOT NULL,
  "description" text,
);

CREATE TABLE "clients" (
  "id" serial PRIMARY KEY,
  "name" varchar NOT NULL,
  "address" varchar NOT NULL,
  "phone" varchar NOT NULL CHECK (LENGTH("phone") = 10 OR LENGTH("phone") = 11)
);

CREATE TABLE "orders" (
  "id" serial PRIMARY KEY,
  "clientId" int NOT NULL REFERENCES "clients" ("id"),
  "cakeId" int NOT NULL REFERENCES "cakes" ("id"),
  "quantity" int CHECK ("quantity" > 0 AND "quantity" < 5),
  "createdAt" timestamp NOT NULL DEFAULT NOW(),
  "totalPrice" numeric CHECK ("totalPrice" > 0),
  "isDelivered" boolean DEFAULT FALSE
);