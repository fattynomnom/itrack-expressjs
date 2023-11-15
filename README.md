# About

This is a work-in-progress to learn ExpressJs + GraphQL + PostgreSQL + Knex

The purpose is to create an app that can help keep track of the user's monthly expenses and budgeting, see NextJs client [itrack-nextjs](https://github.com/fattynomnom/itrack-nextjs). This app will serve as the backend.

Development document [here](https://fattynomnom.github.io)

# Pre-requisites

## Install dependencies

Run `npm install`

## Setup environment

Run `cp .env.example .env`

## Setup local PostgreSQL database

1. Make sure you have PostgreSQL installed, if not install via `brew install postgresql`
1. Start PostgreSQL: `brew services start postgresql@14` (To stop: `brew services stop postgresql@14`)
1. Access PostgreSQL command line: `psql postgres`
1. Create a user with `CREATE USER admin;` if user has not been created yet
1. Grant user permission to create database: `ALTER ROLE admin CREATEDB;`
1. Exit PostgreSQL command line: `\q`
1. Login as the created user: `psql postgres -U admin`
1. Create a database: `CREATE DATABASE itrack;`
1. Grant database privileges to the user: `GRANT ALL PRIVILEGES ON DATABASE itrack TO admin;`
1. Exit PostgreSQL command line, or in a new terminal, run migrations: `npx knex migrate:latest`
1. Seed tables: `npx knex seed:run`

Resource: [Set up postgres + database on MacOS (M1)](https://gist.github.com/phortuin/2fe698b6c741fd84357cec84219c6667)

## Configure Auth0 API

1. Create new API in Auth0, with the audience set to `http://localhost:4000/graphql`
1. In the `.env` file, set the `AUTH0_API_AUDIENCE` and `AUTH0_DOMAIN`

## Configure Auth0 action flow

Follow the steps in the post titled "Adding user email to Auth0 token claims" [here](https://fattynomnom.github.io)

## Generate schema types

`npm run codegen`

## Running locally with hot reload

`npm run dev`

## Compiling and serving production build

`npm start`
