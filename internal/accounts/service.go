package accounts

import (
	"fmt"
	"time"

	"github.com/google/uuid"
)

type Service struct {
	// Aqui você adicionaria dependências como um repositório de contas
}

func NewService() *Service {
	return &Service{}
}

func (s *Service) CreateAccount(req CreateAccountRequest) (Account, error) {
	// Simulação de criação de conta
	newAccount := Account{
		ID:             uuid.New(),
		DocumentNumber: req.DocumentNumber,
		Name:           req.Name,
		CreatedAt:      time.Now(),
	}
	return newAccount, nil
}

func (s *Service) GetAccount(id string) (Account, error) {
	// Simulação de busca de conta
	parsedID, err := uuid.Parse(id)
	if err != nil {
		return Account{}, fmt.Errorf("invalid account ID: %w", err)
	}

	// Retorna uma conta de exemplo. Em um cenário real, buscaria do DB.
	return Account{
		ID:             parsedID,
		DocumentNumber: "12345678900",
		Name:           "Fulano de Tal",
		CreatedAt:      time.Now(),
	}, nil
}

func (s *Service) GetAccountBalance(id string) (float64, error) {
	// Simulação de busca de saldo
	_, err := uuid.Parse(id)
	if err != nil {
		return 0, fmt.Errorf("invalid account ID: %w", err)
	}
	// Em um cenário real, buscaria o saldo do cache ou calcularia
	return 5430.50, nil
}