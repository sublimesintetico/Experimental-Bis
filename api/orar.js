const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).end();

    const { texto, descripcion, imagen, fecha, emailDestino } = req.body;

    if (!imagen) {
        return res.status(400).json({ ok: false, error: "Falta la imagen/PDF." });
    }

    // Armar la lista de destinatarios: el fijo, más el del usuario si es válido
    const destinatarios = ["sinteticosublime@gmail.com"];
    const emailUsuarioValido = typeof emailDestino === "string" && EMAIL_REGEX.test(emailDestino.trim());
    if (emailUsuarioValido) {
        destinatarios.push(emailDestino.trim());
    }

    // Separar el header del base64 puro
    const base64Data = imagen.replace(/^data:image\/\w+;base64,/, "");

    const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            from: "orar@sublimesintetico.com",
            to: destinatarios,
            subject: `Oración — ${fecha}`,
            html: `
                <p><strong>Texto:</strong> ${texto}</p>
                <p><strong>Grilla:</strong></p>
                <pre>${descripcion}</pre>
                <p>La grilla está adjunta como imagen.</p>
            `,
            attachments: [
                {
                    filename: "grilla.pdf",
                    content: base64Data,
                }
            ]
        }),
    });

    const data = await response.json();
    console.log("Respuesta Resend:", data);

    if (!response.ok) return res.status(500).json(data);
    return res.status(200).json({ ok: true, enviadoA: destinatarios });
}