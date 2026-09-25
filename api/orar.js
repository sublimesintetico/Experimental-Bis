const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).end();

    const { texto, descripcion, imagen, fecha, emailDestino } = req.body;

    if (!imagen) {
        return res.status(400).json({ ok: false, error: "Falta la imagen/PDF." });
    }

    // Armar la lista de destinatarios: el fijo, más el del usuario si es válido.
    // OJO: mandamos un email POR CADA destinatario (to: [uno solo]) en vez de
    // un único email con varios "to" — tener varios destinatarios desconocidos
    // entre sí en el mismo mail es una señal típica de spam para Gmail.
    const destinatarios = ["sinteticosublime@gmail.com"];
    const emailUsuarioValido = typeof emailDestino === "string" && EMAIL_REGEX.test(emailDestino.trim());
    if (emailUsuarioValido) {
        destinatarios.push(emailDestino.trim());
    }

    // Separar el header del base64 puro
    const base64Data = imagen.replace(/^data:image\/\w+;base64,/, "");

    const textoPlano = `Texto: ${texto}\n\nGrilla:\n${descripcion}\n\nLa grilla está adjunta como imagen.`;

    const enviarA = (destinatario) =>
        fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                from: "orar@sublimesintetico.com",
                to: [destinatario],
                subject: `Oración — ${fecha}`,
                html: `
                    <p><strong>Texto:</strong> ${texto}</p>
                    <p><strong>Grilla:</strong></p>
                    <pre>${descripcion}</pre>
                    <p>La grilla está adjunta como imagen.</p>
                `,
                text: textoPlano,
                attachments: [
                    {
                        filename: "grilla.pdf",
                        content: base64Data,
                    }
                ]
            }),
        }).then(async (response) => {
            const data = await response.json();
            return { destinatario, ok: response.ok, status: response.status, data };
        });

    const resultados = await Promise.all(destinatarios.map(enviarA));
    console.log("Respuestas Resend:", resultados);

    const fallo = resultados.find((r) => !r.ok);
    // Si falla el envío al mail fijo, es un error real. Si solo falla el
    // del usuario (por ejemplo mail inválido para Resend), no lo tratamos
    // como error fatal para no bloquear el envío que sí funcionó.
    const falloFijo = resultados.find((r) => r.destinatario === "sinteticosublime@gmail.com" && !r.ok);
    if (falloFijo) return res.status(500).json({ ok: false, resultados });

    return res.status(200).json({
        ok: true,
        enviadoA: resultados.filter((r) => r.ok).map((r) => r.destinatario),
        resendIds: resultados.map((r) => r.data?.id || null),
        errores: fallo ? [fallo] : [],
    });
}