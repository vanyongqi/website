package db

import (
	"database/sql"

	"example.com/myapp/internal/config"
	"go.uber.org/zap"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

type DB struct {
	Gorm  *gorm.DB
	SQLDB *sql.DB
}

func Open(cfg *config.Config) (*DB, error) {
	dial := mysql.Open(cfg.Database.DSN)
	gormDB, err := gorm.Open(dial, &gorm.Config{})
	if err != nil {
		return nil, err
	}
	sqldb, err := gormDB.DB()
	if err != nil {
		return nil, err
	}
	sqldb.SetMaxOpenConns(cfg.Database.MaxOpenConns)
	sqldb.SetMaxIdleConns(cfg.Database.MaxIdleConns)
	sqldb.SetConnMaxLifetime(cfg.Database.ConnMaxLifetime)
	return &DB{Gorm: gormDB, SQLDB: sqldb}, nil
}

func AutoMigrate(log *zap.Logger, db *DB, models ...interface{}) {
	if err := db.Gorm.AutoMigrate(models...); err != nil {
		log.Sugar().Fatalf("auto migrate: %v", err)
	}
}
