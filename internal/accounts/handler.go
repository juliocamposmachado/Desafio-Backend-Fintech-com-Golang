package accounts

import (
	"encoding/json"
	"net/http"

	"github.com/go-chi/chi/v5"

	"fintech-challenge/pkg/web"
)

type Handler struct {
	Service *Service
}

func NewHandler(s *Service) *Handler {
	return &Handler{Service: s}
}

func (h *Handler) CreateAccount(w http.ResponseWriter, r *http.Request) {
	var req CreateAccountRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		web.RespondWithError(w, http.StatusBadRequest, err.Error())
		return
	}

	if req.DocumentNumber == "" || req.Name == "" {
		web.RespondWithError(w, http.StatusBadRequest, "Document number and name are required")
		return
	}

	account, err := h.Service.CreateAccount(req)
	if err != nil {
		web.RespondWithError(w, http.StatusInternalServerError, err.Error())
		return
	}

	web.RespondWithJSON(w, http.StatusCreated, account)
}

func (h *Handler) GetAccount(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	if id == "" {
		web.RespondWithError(w, http.StatusBadRequest, "Account ID is required")
		return
	}

	account, err := h.Service.GetAccount(id)
	if err != nil {
		web.RespondWithError(w, http.StatusInternalServerError, err.Error())
		return
	}

	web.RespondWithJSON(w, http.StatusOK, account)
}

func (h *Handler) GetAccountBalance(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	if id == "" {
		web.RespondWithError(w, http.StatusBadRequest, "Account ID is required")
		return
	}

	balance, err := h.Service.GetAccountBalance(id)
	if err != nil {
		web.RespondWithError(w, http.StatusInternalServerError, err.Error())
		return
	}

	web.RespondWithJSON(w, http.StatusOK, map[string]interface{}{"account_id": id, "balance": balance})
}