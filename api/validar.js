export default async function handler(req, res) {

    const { codigo, hash } = req.query;

    // valida parâmetros
    if (!codigo || !hash) {
        return res.status(400).json({
            status: "erro",
            mensagem: "Parâmetros inválidos"
        });
    }

    try {

        const url = `https://colaboragov.sharepoint.com/sites/gestor-spu/_api/web/lists/getbytitle('dbReservas')/items?$filter=TransporteChaveEletronica eq '${codigo}' and TransporteHashAssinatura eq '${hash}'`;

        const response = await fetch(url, {
            headers: {
                "Accept": "application/json;odata=nometadata"
            }
        });

        if (!response.ok) {
            return res.status(response.status).json({
                status: "erro",
                mensagem: "Erro ao acessar SharePoint (provável bloqueio)"
            });
        }

        const data = await response.json();

        if (data.value && data.value.length > 0) {

            const item = data.value[0];

            return res.status(200).json({
                status: "valido",
                nome: item.RespTransporte,
                matricula: item.TransporteMatricula,
                data: item.TransporteDataAprova
            });

        } else {

            return res.status(200).json({
                status: "invalido"
            });

        }

    } catch (error) {

        return res.status(500).json({
            status: "erro",
            mensagem: "Erro interno na validação"
        });

    }
}
