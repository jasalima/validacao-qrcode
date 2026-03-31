export default async function handler(req, res) {
  try {
    // =========================
    // PARAMETROS
    // =========================
    const codigo = req.query.codigo || req.body?.codigo;
    const hash   = req.query.hash   || req.body?.hash;

    if (!codigo || !hash) {
      return res.status(400).json({
        status: "erro",
        mensagem: "Parâmetros obrigatórios: codigo e hash"
      });
    }

    // =========================
    // CHAMADA DO FLOW
    // =========================
    const flowUrl = "https://default456213cf707347c6bf4941b654ad44.9b.environment.api.powerplatform.com/powerautomate/automations/direct/workflows/c170f3d2665d4f359c49ebed0f2596fc/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Z4FD88F15fMH5TSoVik5hDZ-6ROONamcSgjKV32OU3Q";

    const response = await fetch(flowUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
    console.log("FLOW RESPONSE:", JSON.stringify(data));

    // =========================
    // VALIDAÇÃO
    // =========================
    if (!data || data.status !== "valido") {
      return res.status(200).json({
        status: "invalido",
        mensagem: "Documento não encontrado ou inválido"
      });
    }

    const item = data.dados || {};

    // =========================
    // FUNÇÃO FLEXÍVEL DE LEITURA
    // Aceita string vazia como valor válido quando allowEmpty=true
    // =========================
    const get = (obj, keys, allowEmpty = false) => {
      for (let k of keys) {
        const val = obj[k];
        if (val !== undefined && val !== null) {
          if (allowEmpty) return val;           // aceita "" também
          if (val !== "") return val;           // ignora "" por padrão
        }
      }
      return null;
    };

    // =========================
    // TIPO
    // =========================
    const tipo = (data.tipo || item.tipo || "").toLowerCase();

    let dadosFormatados = {};

    // =========================
    // 📄 FISCALIZAÇÃO
    // Flow retorna: AssinanteNome, AssinanteMatricula, StatusGeral
    // =========================
    if (tipo === "fiscalizacao") {
      dadosFormatados = {
        tipo: "fiscalizacao",
        solicitante:          get(item, ["AssinanteNome", "Nome", "Solicitante"]),
        matricula:            get(item, ["AssinanteMatricula", "Matricula", "Matrícula"]),
        status:               get(item, ["StatusGeral", "Status"]),
        dataHora:             get(item, ["DataHora", "DataHoraAssinatura"]),
        // não usados neste tipo
        chefeSetor:           null,
        chefeMatricula:       null,
        responsavelTransporte: null,
        transporteMatricula:  null,
        transporteData:       null
      };

    // =========================
    // 🚗 TRANSPORTE
    // Flow retorna: Solicitante, StatusGeral (pode vir ""),
    //   ChefeNome, ChefeMatricula, RespTransporte,
    //   TransporteMatricula, TransporteDataAprova
    // =========================
    } else {
      // StatusGeral pode vir vazio ("") — exibimos "—" no front se for vazio
      const statusRaw = get(item, ["StatusGeral", "Status"], true); // allowEmpty

      dadosFormatados = {
        tipo:                 "transporte",
        solicitante:          get(item, ["Solicitante"]),
        // se StatusGeral vier "" ou null, manda null → front exibe "—"
        status:               (statusRaw !== null && statusRaw !== "") ? statusRaw : null,
        chefeSetor:           get(item, ["ChefeNome"]),
        chefeMatricula:       get(item, ["ChefeMatricula", "ChefeMatrícula"]),
        chefeData:            get(item, ["ChefeDataHoraAprovacao"]),
        responsavelTransporte: get(item, ["RespTransporte"]),
        transporteMatricula:  get(item, ["TransporteMatricula"]),
        transporteData:       get(item, ["TransporteDataAprova", "DataHoraAssinatura"])
      };
    }

    // =========================
    // RESPOSTA FINAL PADRONIZADA
    // =========================
    return res.status(200).json({
      status: "valido",
      codigo,
      hash,
      tipo,
      dados: dadosFormatados
    });

  } catch (error) {
    console.error("ERRO API:", error);
    return res.status(500).json({
      status: "erro",
      mensagem: "Erro interno na validação",
      detalhe: error.message
    });
  }
}
