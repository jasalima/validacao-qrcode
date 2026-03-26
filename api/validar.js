export default async function handler(req, res) {
  try {
    const { codigo, hash } = req.query;

    if (!codigo || !hash) {
      return res.status(400).json({
        erro: "Parâmetros obrigatórios: codigo e hash"
      });
    }

    const response = await fetch("https://default456213cf707347c6bf4941b654ad44.9b.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/c170f3d2665d4f359c49ebed0f2596fc/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Z4FD88F15fMH5TSoVik5hDZ-6ROONamcSgjKV32OU3Q", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        codigo: codigo,
        hash: hash
      })
    });

    const data = await response.json();

    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({
      erro: "Erro ao validar",
      detalhe: error.message
    });
  }
}
