import { NextFunction, Request, Response } from "express";

export function validarCorpoDaSolicitacao(req: Request, res: Response, next: NextFunction) {
    const {valorFinanciamento, valorEntrada, taxaJuros, periodo} = req.body;
  
    // Verificar se todos os campos obrigatórios estão presentes
    if (
      valorFinanciamento === undefined ||
      valorEntrada === undefined ||
      taxaJuros === undefined ||
      periodo === undefined
    ) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }
  
    // Verificar se os campos têm os tipos esperados
    if (
      typeof valorFinanciamento !== 'number' ||
      typeof valorEntrada !== 'number' ||
      typeof taxaJuros !== 'number' ||
      typeof periodo !== 'number'
    ) {
      return res.status(400).json({ error: 'Tipos de campo inválidos.' });
    }
  
    // Se todas as validações passarem, chame o próximo middleware ou a função de rota principal
    next();
  }