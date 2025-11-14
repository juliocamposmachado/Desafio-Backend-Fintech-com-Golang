package transactions

import (
	"fmt"
	"time"

	"github.com/google/uuid"
)

type Service struct {
	// Aqui você adicionaria dependências como um repositório de transações, serviço de contas, etc.
}

func NewService() *Service {
	return &Service{}
}

func (s *Service) CreateTransaction(req CreateTransactionRequest) (Transaction, error) {
	// Simulação de criação de transação
	sourceID, err := uuid.Parse(req.SourceAccountID)
	if err != nil {
		return Transaction{}, fmt.Errorf("invalid source account ID: %w", err)
	}

	destinationID, err := uuid.Parse(req.DestinationAccountID)
	if err != nil {
		return Transaction{}, fmt.Errorf("invalid destination account ID: %w", err)
	}

	newTransaction := Transaction{
		ID:                uuid.New(),
		SourceAccountID:   sourceID,
		DestinationAccountID: destinationID,
		Amount:            req.Amount,
		Status:            "completed", // Simula uma transação bem-sucedida
		CreatedAt:         time.Now(),
	}
	return newTransaction, nil
}