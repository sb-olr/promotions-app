-- DROP TABLE Promotions;

CREATE TABLE Promotions(
id text NOT NULL,
price numeric NOT NULL,
expiration_date text NOT NULL,
    CONSTRAINT "Promotions_pkey" PRIMARY KEY (id)
);
