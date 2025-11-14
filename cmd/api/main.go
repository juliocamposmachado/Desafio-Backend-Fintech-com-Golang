package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"

	"fintech-challenge/internal/accounts"
	"fintech-challenge/internal/transactions"
)

func main() {
	r := chi.NewRouter()

	// Middlewares
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins: []string{
			"http://localhost:5173", // Para desenvolvimento local do frontend
			"https://desafio-backend-fintech-com-golang-354404045586.europe-west1.run.app", // URL do seu backend no Cloud Run
			"https://desafio-backend-fintech-com-golang.vercel.app", // *** SUBSTITUA PELA URL REAL DO SEU FRONTEND NO VERCEL ***
		},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders: []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders: []string{"Link"},
		AllowCredentials: true,
		MaxAge:           300,
	}))

	// Inicializar serviços e handlers
	accountService := accounts.NewService()
	accountHandler := accounts.NewHandler(accountService)

	transactionService := transactions.NewService()
	transactionHandler := transactions.NewHandler(transactionService)

	// Rotas para Accounts
	r.Route("/accounts", func(r chi.Router) {
		r.Post("/", accountHandler.CreateAccount)
		r.Get("/{id}", accountHandler.GetAccount)
		r.Get("/{id}/balance", accountHandler.GetAccountBalance)
	})

	// Rotas para Transactions
	r.Route("/transactions", func(r chi.Router) {
		r.Post("/", transactionHandler.CreateTransaction)
	})

	// Rota de saúde/teste
	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Hello, Fintech Challenge!")
	})

	port := os.Getenv("PORT") // Pega o valor da variável de ambiente PORT
	if port == "" {
		port = "8080" // Se não houver, usa 8080 como padrão (bom para desenvolvimento local)
	}

	fmt.Printf("Server started on :%s\n", port)
	log.Fatal(http.ListenAndServe(":"+port, r))
}