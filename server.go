package main

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	_ "github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
)

func getEnvVariable(key string) string {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal(err)
	}
	return os.Getenv(key)
}

func DBConnect() (db *sql.DB) {
	fmt.Println("Setup...")
	dbUsername := getEnvVariable("USERNAME")
	dbPassword := getEnvVariable("PASSWORD")
	dbHost := getEnvVariable("HOST")
	dbPort := getEnvVariable("PORT")
	dbName := getEnvVariable("DATABASE")
	db, err := sql.Open("mysql", fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", dbUsername, dbPassword, dbHost, dbPort, dbName))

	if err != nil {
		log.Fatal(err)
	}
	return db
}
