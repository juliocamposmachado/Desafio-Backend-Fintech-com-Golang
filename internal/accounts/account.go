package accounts

import (
	"time"

	"github.com/google/uuid"
)

type Account struct {
	ID             uuid.UUID `json:"id"`
	DocumentNumber string    `json:"document_number"`
	Name           string    `json:"name"`
	CreatedAt      time.Time `json:"created_at"`
}

type CreateAccountRequest struct {
	DocumentNumber string `json:"document_number" binding:"required"`
	Name           string `json:"name" binding:"required"`
}