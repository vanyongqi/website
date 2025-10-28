package logger

import (
	"strings"

	"example.com/myapp/internal/config"
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
)

func New(cfg *config.Config) *zap.Logger {
	lvl := parseLevel(cfg.Log.Level)
	if cfg.Log.Json {
		pc := zap.NewProductionConfig()
		pc.Level = zap.NewAtomicLevelAt(lvl)
		pc.EncoderConfig.EncodeTime = zapcore.ISO8601TimeEncoder
		l, _ := pc.Build()
		return l
	}
	dc := zap.NewDevelopmentConfig()
	dc.Level = zap.NewAtomicLevelAt(lvl)
	dc.EncoderConfig.EncodeTime = zapcore.ISO8601TimeEncoder
	l, _ := dc.Build()
	return l
}

func parseLevel(s string) zapcore.Level {
	switch strings.ToLower(s) {
	case "debug":
		return zapcore.DebugLevel
	case "warn":
		return zapcore.WarnLevel
	case "error":
		return zapcore.ErrorLevel
	default:
		return zapcore.InfoLevel
	}
}
