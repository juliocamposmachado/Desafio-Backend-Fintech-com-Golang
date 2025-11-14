package transactions

import (
	"time"

	"github.com/google/uuid"
)

type Transaction struct {
	ID                uuid.UUID `json:"id"`
	SourceAccountID   uuid.UUID `json:"source_account_id"`
	DestinationAccountID uuid.UUID `json:"destination_account_id"`
	Amount            float64   `json:"amount"`
	Status            string    `json:"status"`
	CreatedAt         time.Time `json:"created_at"`
}

type CreateTransactionRequest struct {
	SourceAccountID   string  `json:"source_account_id" binding:"required"`
	DestinationAccountID string  `json:"destination_account_id" binding:"required"`
	Amount            float64 `json:"amount" binding:"required,gt=0"`
}