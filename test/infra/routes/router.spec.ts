import request from 'supertest'; // Para fazer solicitações HTTP em seu aplicativo Express
import express, { Express } from 'express';
import GeraParcelasController from '../../../src/infra/controller/GeraParcelasController';
import { validarCorpoDaSolicitacao } from '../../../src/infra/routes/middleware/validarBodyGeraParcelar';
import router from  '../../../src/infra/routes/router';

const app: Express = express();

// Configurar roteador para testes - sempre definir o json antes do router
app.use(express.json());
app.use('/test', router);

// jest.mock('../controller/GeraParcelasController', () => {
//     return jest.fn().mockImplementation(() => ({
//       gerarParcelas: jest.fn(),
//       healthCheck: jest.fn(),
//     }));
//   });

describe('Testes das rotas', () => {

  it('Deve retornar status 200 ao acessar /geraparcelas', async () => {

    const objectRequest = {        
        valorFinanciamento: 10000,
        valorEntrada: 0, 
        taxaJuros: 1.5, 
        periodo: 12  
    };

    const response = await request(app)
      .post('/test/geraparcelas')
      .send(objectRequest);

    expect(response.status).toBe(200);
  });

  it('Deve retornar status 200 ao acessar /health', async () => {
    const response = await request(app).get('/test/health');
    expect(response.status).toBe(200);
  });
});
