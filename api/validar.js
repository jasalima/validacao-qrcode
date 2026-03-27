export default async function handler(req, res) {
  try {
    const codigo = req.query.codigo;
    const hash = req.query.hash;

    if (!codigo || !hash) {
      return res.status(400).json({
        status: "erro",
        mensagem: "Parâmetros obrigatórios: codigo e hash"
      });
    }

    const flowUrl = "https://default456213cf707347c6bf4941b654ad44.9b.environment.api.powerplatform.com/powerautomate/automations/direct/workflows/c170f3d2665d4f359c49ebed0f2596fc/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Z4FD88F15fMH5TSoVik5hDZ-6ROONamcSgjKV32OU3Q";

    const response = await fetch(flowUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ codigo, hash })
    });

    if (!response.ok) {
      const text = await response.text();
      return res.status(500).json({
        status: "erro",
        mensagem: "Erro ao consultar fluxo",
        detalhe: text
      });
    }

    const data = await response.json();

    if (!data.resultado || data.resultado.length === 0) {
      return res.status(200).json({
        status: "invalido",
        mensagem: "Documento não encontrado ou inválido"
      });
    }

    const item = data.resultado[0];

    // 🔥 FORÇA O TIPO (IMPORTANTE)
    const tipo = (item.Tipo || "").toLowerCase();

    let dadosFormatados;

    if (tipo === "fiscalizacao") {

      dadosFormatados = {
        tipo: "fiscalizacao",
        fiscalContrato: item.FiscalContrato,
        matricula: item.Matricula,
        dataHoraAtesto: item.DataHoraAtesto
      };

    } else {

      dadosFormatados = {
        tipo: "reserva",
        solicitante: item.Solicitante,
        status: item.StatusGeral,
        chefeSetor: item.ChefeNome,
        matricula: item.ChefeMatrícula,
        setor: item.RespTransporte,
        dataHora: item.TransporteDataAprova
      };

    }

    return res.status(200).json({
      status: "valido",
      dados: dadosFormatados
    });

  } catch (error) {
    return res.status(500).json({
      status: "erro",
      mensagem: "Erro interno",
      detalhe: error.message
    });
  }
}
