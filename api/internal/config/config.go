package config

import (
	"path/filepath"
	"strings"
	"time"

	"github.com/spf13/viper"
)

type Config struct {
	Server struct {
		Port         int
		Env          string
		ReadTimeout  time.Duration
		WriteTimeout time.Duration
		Cors struct {
			AllowOrigins     []string
			AllowMethods     []string
			AllowHeaders     []string
			AllowCredentials bool
		}
	}
	Log struct {
		Level string
		Json  bool
	}
	JWT struct {
		Secret     string
		AccessTTL  time.Duration
		RefreshTTL time.Duration
	}
	Database struct {
		Driver          string
		DSN             string
		MaxOpenConns    int
		MaxIdleConns    int
		ConnMaxLifetime time.Duration
	}
	Security struct {
		RateLimit struct {
			Enabled bool
			RPS     int
		}
	}
}

func Load(path string, env string) (*Config, error) {
	v := viper.New()
	v.SetConfigFile(path)
	if err := v.ReadInConfig(); err != nil {
		return nil, err
	}

	if env != "" {
		v.SetConfigName("confyg." + env)
		v.AddConfigPath(filepath.Dir(path))
		_ = v.MergeInConfig()
	}

	v.SetEnvPrefix("APP")
	v.AutomaticEnv()
	v.SetEnvKeyReplacer(strings.NewReplacer(".", "_"))

	var c Config
	if err := v.Unmarshal(&c); err != nil {
		return nil, err
	}
	return &c, nil
}
