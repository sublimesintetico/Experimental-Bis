export default async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).end();

    const { texto, descripcion, imagen, fecha } = req.body;
    
    console.log("Body recibido:", { texto, descripcion, fecha, imagenLength: imagen?.length });

    const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            from: "onboarding@resend.dev",
            to: "sinteticosublime@gmail.com",
            subject: `Oración — ${fecha}`,
            html: `
                <p><strong>Texto:</strong> ${texto}</p>
                <p><strong>Grilla:</strong></p>
                <pre>${descripcion}</pre>
                <img src="${imagen}" style="max-width:100%"/>
            `,
        }),
    });

    const data = await response.json();
    console.log("Respuesta Resend:", data);
    
    if (!response.ok) return res.status(500).json(data);
    return res.status(200).json({ ok: true });
}

