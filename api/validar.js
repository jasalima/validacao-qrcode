export default async function handler(req, res) {
  try {
    const { codigo, hash } = req.query;

    if (!codigo || !hash) {
      return res.status(400).json({
        erro: "Parâmetros obrigatórios: codigo e hash"
      });
    }

    const response = await fetch("COLE_SUA_URL_DO_FLOW_AQUI", {
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
