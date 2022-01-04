package main

import "database/sql"

type MySQLRepository struct {
	DB *sql.DB
}

func NewMySQLConnection() *MySQLRepository {
	s := MySQLRepository{DB: DBConnect()}
	return &s
}
