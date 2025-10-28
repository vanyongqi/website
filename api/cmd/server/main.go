package main

import (
	"fmt"
	"log"
	"os"

	"example.com/myapp/internal/config"
	"example.com/myapp/internal/db"
	"example.com/myapp/internal/logger"
	"example.com/myapp/internal/router"
)

func main() {
	configPath := os.Getenv("CONFIG_PATH")
	if configPath == "" {
		configPath = "/app/conf/confyg.yaml"
	}
	env := os.Getenv("APP_SERVER_ENV")

	cfg, err := config.Load(configPath, env)
	if err != nil {
		log.Fatalf("load config: %v", err)
	}

	logr := logger.New(cfg)
	defer logr.Sync()

	dbConn, err := db.Open(cfg)
	if err != nil {
		logr.Sugar().Fatalf("db open error: %v", err)
	}
	defer func() { _ = dbConn.SQLDB.Close() }()

	r := router.New(cfg, logr, dbConn)
	addr := fmt.Sprintf(":%d", cfg.Server.Port)
	logr.Sugar().Infow("server starting", "addr", addr, "env", cfg.Server.Env)
	if err := r.Run(addr); err != nil {
		logr.Sugar().Fatalf("server run: %v", err)
	}
}
