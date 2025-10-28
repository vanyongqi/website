package router

import (
	"net/http"
	"time"

	"example.com/myapp/internal/config"
	"example.com/myapp/internal/db"
	"example.com/myapp/internal/handler"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
)

func New(cfg *config.Config, log *zap.Logger, dbc *db.DB) *gin.Engine {
	r := gin.New()
	r.Use(gin.Recovery())
	r.Use(gin.Logger())

	c := cors.Config{
		AllowOrigins:     cfg.Server.Cors.AllowOrigins,
		AllowMethods:     cfg.Server.Cors.AllowMethods,
		AllowHeaders:     cfg.Server.Cors.AllowHeaders,
		AllowCredentials: cfg.Server.Cors.AllowCredentials,
		MaxAge:           12 * time.Hour,
	}
	r.Use(cors.New(c))

	r.GET("/healthz", handler.Healthz())

	api := r.Group("/api/v1")
	{
		api.GET("/ping", func(c *gin.Context) { c.JSON(http.StatusOK, gin.H{"message": "pong"}) })
	}

	return r
}
