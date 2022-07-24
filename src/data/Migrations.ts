import { BaseDatabase } from "./BaseDatabase";

class Migrations extends BaseDatabase {
  private static USERS = "ecom_users";
  private static PRODUCTS = "ecom_products";
  private static PURCHASES = "ecom_purchases";
  private static USER_ADDRESS = "ecom_user_address";

  async createTables() {
    try {
      await BaseDatabase.connection.raw(`

        CREATE TABLE IF NOT EXISTS ${Migrations.USERS} (
                id varchar(255) primary key not null,
                name varchar(255) not null,
                email varchar(255) unique not null,
                password varchar(255) not null,
                role varchar(50) not null
                cpf varchar(255) unique not null,
            );

        CREATE TABLE IF NOT EXISTS ${Migrations.PRODUCTS} (
                id varchar(255) primary key not null,
                name varchar(255) not null,
                price float not null,
                image_url varchar(255) not null
            );

        CREATE TABLE IF NOT EXISTS ${Migrations.PURCHASES} (
                id varchar(255) primary key not null,
                user_id varchar(255) not null,
                product_id varchar(255) not null,
                quantity int not null,
                total_price float not null,
                FOREIGN KEY (user_id) REFERENCES ecom_users(id),
                FOREIGN KEY (product_id) REFERENCES ecom_products(id)
            );

        CREATE TABLE IF NOT EXISTS ${Migrations.USER_ADDRESS} (
                id varchar(255) primary key not null,
                cep varchar(255) not null,
                logradouro varchar(255) not null,
                numero int,
                complemento varchar(255),
                bairro varchar(255) not null,
                cidade varchar(255) not null,
                estado varchar(255) not null,
                user_id varchar(255) not null,
                FOREIGN KEY (user_id) REFERENCES ecom_users(id)
            );
    `);
      console.log(
        `Tabelas ${Migrations.USERS}, ${Migrations.PRODUCTS}, ${Migrations.PURCHASES} e ${Migrations.USER_ADDRESS} foram criadas com sucesso!`
      );
    } finally {
      BaseDatabase.destroyConnection();
    }
  }
}

new Migrations().createTables();
