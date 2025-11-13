
import React, { useState } from 'react';
import CodeBlock from './CodeBlock';

const API_BASE_URL = 'http://localhost:8080';

const ApiTester: React.FC = () => {
    const [createAccountData, setCreateAccountData] = useState({ document_number: '', name: '' });
    const [createTransactionData, setCreateTransactionData] = useState({ source_account_id: '', destination_account_id: '', amount: '' });
    const [getAccountId, setGetAccountId] = useState('');
    const [getBalanceId, setGetBalanceId] = useState('');
    const [response, setResponse] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const handleRequest = async (path: string, method: string, body?: any) => {
        setLoading(true);
        setResponse(null);
        try {
            const options: RequestInit = {
                method,
                headers: { 'Content-Type': 'application/json' },
            };
            if (body) {
                options.body = JSON.stringify(body);
            }
            const res = await fetch(`${API_BASE_URL}${path}`, options);
            const data = await res.json();
            setResponse({
                status: res.status,
                statusText: res.statusText,
                data
            });
        } catch (error: any) {
            setResponse({
                status: 'Error',
                statusText: 'Network Error or API not running',
                data: { message: error.message }
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold text-accent border-b border-border-color pb-2">API Tester</h2>
            <p className="text-text-secondary">Use esta interface para interagir com a sua API Go. Certifique-se de que seus contêineres Docker estejam em execução.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Create Account */}
                <div className="bg-secondary p-6 rounded-lg border border-border-color">
                    <h3 className="text-xl font-semibold mb-4">Criar Conta (POST /accounts)</h3>
                    <form onSubmit={(e) => { e.preventDefault(); handleRequest('/accounts', 'POST', {...createAccountData}); }} className="space-y-4">
                        <input type="text" placeholder="Número do Documento" value={createAccountData.document_number} onChange={e => setCreateAccountData({ ...createAccountData, document_number: e.target.value })} className="w-full bg-primary border border-border-color rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent" />
                        <input type="text" placeholder="Nome Completo" value={createAccountData.name} onChange={e => setCreateAccountData({ ...createAccountData, name: e.target.value })} className="w-full bg-primary border border-border-color rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent" />
                        <button type="submit" className="w-full bg-accent text-primary font-bold py-2 px-4 rounded hover:bg-blue-400 transition-colors">Criar Conta</button>
                    </form>
                </div>
                
                {/* Create Transaction */}
                <div className="bg-secondary p-6 rounded-lg border border-border-color">
                    <h3 className="text-xl font-semibold mb-4">Criar Transação (POST /transactions)</h3>
                    <form onSubmit={(e) => { e.preventDefault(); handleRequest('/transactions', 'POST', { ...createTransactionData, amount: parseFloat(createTransactionData.amount) }); }} className="space-y-4">
                        <input type="text" placeholder="ID da Conta de Origem" value={createTransactionData.source_account_id} onChange={e => setCreateTransactionData({ ...createTransactionData, source_account_id: e.target.value })} className="w-full bg-primary border border-border-color rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent" />
                        <input type="text" placeholder="ID da Conta de Destino" value={createTransactionData.destination_account_id} onChange={e => setCreateTransactionData({ ...createTransactionData, destination_account_id: e.target.value })} className="w-full bg-primary border border-border-color rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent" />
                        <input type="number" placeholder="Valor" value={createTransactionData.amount} onChange={e => setCreateTransactionData({ ...createTransactionData, amount: e.target.value })} className="w-full bg-primary border border-border-color rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent" />
                        <button type="submit" className="w-full bg-accent text-primary font-bold py-2 px-4 rounded hover:bg-blue-400 transition-colors">Enviar Transação</button>
                    </form>
                </div>

                {/* Get Account */}
                 <div className="bg-secondary p-6 rounded-lg border border-border-color">
                    <h3 className="text-xl font-semibold mb-4">Consultar Conta (GET /accounts/{'{id}'})</h3>
                    <form onSubmit={(e) => { e.preventDefault(); handleRequest(`/accounts/${getAccountId}`, 'GET'); }} className="space-y-4">
                        <input type="text" placeholder="ID da Conta" value={getAccountId} onChange={e => setGetAccountId(e.target.value)} className="w-full bg-primary border border-border-color rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent" />
                        <button type="submit" className="w-full bg-accent text-primary font-bold py-2 px-4 rounded hover:bg-blue-400 transition-colors">Consultar Conta</button>
                    </form>
                </div>

                {/* Get Balance */}
                 <div className="bg-secondary p-6 rounded-lg border border-border-color">
                    <h3 className="text-xl font-semibold mb-4">Consultar Saldo (GET /accounts/{'{id}'}/balance)</h3>
                    <form onSubmit={(e) => { e.preventDefault(); handleRequest(`/accounts/${getBalanceId}/balance`, 'GET'); }} className="space-y-4">
                        <input type="text" placeholder="ID da Conta" value={getBalanceId} onChange={e => setGetBalanceId(e.target.value)} className="w-full bg-primary border border-border-color rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent" />
                        <button type="submit" className="w-full bg-accent text-primary font-bold py-2 px-4 rounded hover:bg-blue-400 transition-colors">Consultar Saldo</button>
                    </form>
                </div>
            </div>

            {/* Response Area */}
            <div className="bg-secondary p-6 rounded-lg border border-border-color mt-8">
                <h3 className="text-xl font-semibold mb-4">Resposta da API</h3>
                {loading && <p className="text-accent">Carregando...</p>}
                {response && (
                    <div>
                        <p>
                            <span className="font-bold">Status: </span>
                            <span className={response.status === 200 || response.status === 201 ? 'text-green-400' : 'text-red-400'}>
                                {response.status} {response.statusText}
                            </span>
                        </p>
                        <CodeBlock language="json" code={JSON.stringify(response.data, null, 2)} />
                    </div>
                )}
                {!loading && !response && <p className="text-text-secondary">Faça uma requisição para ver a resposta aqui.</p>}
            </div>
        </div>
    );
};

export default ApiTester;
   