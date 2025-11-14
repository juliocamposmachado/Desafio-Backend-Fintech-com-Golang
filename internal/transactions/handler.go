package transactions

import (
	"encoding/json"
	"net/http"

	"fintech-challenge/pkg/web"
)

type Handler struct {
	Service *Service
}

func NewHandler(s *Service) *Handler {
	return &Handler{Service: s}
}

func (h *Handler) CreateTransaction(w http.ResponseWriter, r *http.Request) {
	var req CreateTransactionRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		web.RespondWithError(w, http.StatusBadRequest, err.Error())
		return
	}

	if req.SourceAccountID == "" || req.DestinationAccountID == "" || req.Amount <= 0 {
		web.RespondWithError(w, http.StatusBadRequest, "Source account ID, destination account ID, and a positive amount are required")
		return
	}

	transaction, err := h.Service.CreateTransaction(req)
	if err != nil {
		web.RespondWithError(w, http.StatusInternalServerError, err.Error())
		return
	}

	web.RespondWithJSON(w, http.StatusCreated, transaction)
}
