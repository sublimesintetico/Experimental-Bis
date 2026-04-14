window.addEventListener("load", () => {
	escribirType();
	gridDefine();
	random();
})

function gridDefine() {
    const root = document.getElementById('grid2');
    const width = window.innerWidth / 4;
    const height = window.innerHeight ;

    columnSize = Math.floor(width / 8) -2;
    row = Math.floor(height / 8) -2;

    root.style.gridTemplateColumns = `repeat(8, ${columnSize}px)`;
    root.style.gridTemplateRows = `repeat(8, ${row}px)`;
        console.log(`Grid defined: ${columnSize}px columns, ${row}px rows`);
}

let alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

let zIndex = 0
let rotX = 0
let rotY = 0

let display = 0
let displayDatita = 1
let maxOrnaments = 3

function centralOrnament(i, row, col, size) {
	// Recortar size si se sale del borde inferior/derecho
	size = Math.min(size, 26 - row, 26 - col);
	size = Math.max(1, size);

	let rS, cS;

	if (i === 1) {
		rS = row;
		cS = col;
	} else if (i === 2) {
		rS = row;
		cS = 27 - col - size;
	} else if (i === 3) {
		rS = 27 - row - size;
		cS = col;
	} else { // i === 4
		rS = 27 - row - size;
		cS = 27 - col - size;
	}

	const rE = rS + size;
	const cE = cS + size;

	return `grid-area: ${rS} / ${cS} / ${rE} / ${cE};`;
}

function cero() {
	flecha = document.getElementById('flecha-0')
	flecha1 = document.getElementById('flecha-1')
	flecha2 = document.getElementById('flecha-2')
	flecha.style.display = "inherit"
	flecha1.style.display = "none"
	flecha2.style.display = "none"
	ornaments = 0 ;
	console.log('Ornament =', ornaments);
}

function uno() {
	flecha = document.getElementById('flecha-1')
	flecha0 = document.getElementById('flecha-0')
	flecha2 = document.getElementById('flecha-2')
	flecha.style.display = "inherit"
	flecha0.style.display = "none"
	flecha2.style.display = "none"
	ornaments = 1 ;
	console.log('Ornament =', ornaments);
}

function dos() {
	flecha = document.getElementById('flecha-2')
	flecha0 = document.getElementById('flecha-0')
	flecha1 = document.getElementById('flecha-1')
	flecha.style.display = "inherit"
	flecha0.style.display = "none"
	flecha1.style.display = "none"
	ornaments = 2 ;
	console.log('Ornament =', ornaments);
}

function random() {
	ornaments = Math.floor(Math.random() * maxOrnaments)
	flecha = document.getElementById('flecha-' + ornaments)
	flecha.style.display = "inherit"
	console.log('Ornament =', ornaments);
}

function imgcero() {
	img = document.getElementById('img0')
	img1 = document.getElementById('img1')
	img2 = document.getElementById('img2')
	img.style.display = "block"
	img1.style.display = "none"
	img2.style.display = "none"
}

function imguno() {
	img = document.getElementById('img0')
	img1 = document.getElementById('img1')
	img2 = document.getElementById('img2')
	img.style.display = "none"
	img1.style.display = "block"
	img2.style.display = "none"
}

function imgdos() {
	img = document.getElementById('img0')
	img1 = document.getElementById('img1')
	img2 = document.getElementById('img2')
	img.style.display = "none"
	img1.style.display = "none"
	img2.style.display = "block"
}

function noshow() {
	img = document.getElementById('img0')
	img1 = document.getElementById('img1')
	img2 = document.getElementById('img2')
	img.style.display = "none"
	img1.style.display = "none"
	img2.style.display = "none"
}

function mostrarInfo() {
	info = document.getElementById('info')
	
	if (display === 0) {
		info.style.display = 'block';
		display = 1
	} else {
		info.style.display = 'none';
		display = 0
	}
}

function mostrarTodo() {
	datita = document.getElementById('datita')
	mostrar =  document.getElementById('mostrar')
	nomostrar =  document.getElementById('nomostrar')
	if (displayDatita === 0) {
		datita.style.display = "block";
		displayDatita = 1
		nomostrar.style.display = "block";
		mostrar.style.display = "none";
	} else {
		datita.style.display = "none";
		displayDatita = 0
		nomostrar.style.display = "none";
		mostrar.style.display = "block";
	}
}

function rotation(i) {
	if (i === 1) {
			return 'transform: scale(1, 1);';
		} else if (i === 2) {
			return 'transform: scaleX(-1);';
		} else if (i === 3) {
			return 'transform: scaleY(-1);';
		} else { // i === 4
			return 'transform: scale(-1, -1);';
	}
}

function escribirType() {
	texto = document.getElementById("texto-input");
	escribir = document.getElementById("escribime");
	let funcUses = 0;
	let row = 13;
	let col = 13;

	texto.addEventListener("keydown", function(e){

		if (alphabet.includes(e.key.toLowerCase())) {
			zIndex ++ 
			funcUses ++			
			let size = Math.floor(Math.random()*3) + 2

			for (var i = 1; i <= 4; i++) {
				let img = document.createElement('img');
				img.src = './media/trying0/ornaments' + ornaments + '/No-Contour/' + e.key.toLowerCase() + '.png';
				img.style = centralOrnament(i, row, col, size) +"z-index:" + zIndex + "; justify-items: center; align-items: center; object-fit: contain; width: 100%; border: solid; border-width: 0.5px; border-color: white; outline: 0.5px solid black;" + rotation(i)
				document.getElementById('grid').appendChild(img);
			}

			if (funcUses % 2 === 0) {
				row += Math.floor(Math.random() * 2) + 1
				if ((Math.floor(Math.random() * 6) + 1) === 2) {
					col -= Math.floor(Math.random() * 4) + 1
				}
				if ((Math.floor(Math.random() * 6) + 1) === 3) {
					col += Math.floor(Math.random() * 4) + 1
					if (col + 4 > 25) {
						col = 13
					}
				}
				if (row + 4 > 25) {
					row = 13
				}
			} else {
				col += Math.floor(Math.random() * 2) + 1
				if ((Math.floor(Math.random() * 6) + 1) === 2) {
					row -= Math.floor(Math.random() * 3) + 1
				}
				if ((Math.floor(Math.random() * 6) + 1) === 3) {
					row += Math.floor(Math.random() * 3) + 1
					if (row + 4 > 25) {
						row = 13
					}
				}
				if (col + 4 > 25) {
					col = 13
				}
			}

		}
	})
}


async function orar() {
    const boton = document.getElementById("print-button");
    const textoInput = document.getElementById("texto-input");
    const texto = textoInput?.value?.trim() || "(sin texto)";
    const fecha = new Date().toLocaleString("es-AR", { dateStyle: "long", timeStyle: "short" });

    boton.textContent = "Orando...";
    boton.disabled = true;

    try {
        const grilla = document.getElementById("grid");

        const ocultarEls = grilla.querySelectorAll(".print-button, .form, input, button");
        ocultarEls.forEach(el => el.style.visibility = "hidden");

        const canvas = await html2canvas(grilla, {
            backgroundColor: "#ffffff",
            scale: 6,
            useCORS: true,
            allowTaint: true,
            scrollX: 0,
            scrollY: 0,
            width: grilla.scrollWidth,
            height: grilla.scrollHeight,
        });

        ocultarEls.forEach(el => el.style.visibility = "");

        const imgData = canvas.toDataURL("image/jpeg", 0.9);

        const { jsPDF } = window.jspdf;

        // Hoja fija — mismas dimensiones que tu @page en CSS
        const pageW = 180; // mm (18cm)
        const pageH = 240; // mm (24cm)
        const margin = 10; // mm de margen en cada lado

        const maxW = pageW - margin * 2;
        const maxH = pageH - margin * 2;

        // Dimensiones reales de la imagen capturada
        const pxToMm = (px) => px * 0.2645833;
        const imgW = pxToMm(canvas.width / 6);
        const imgH = pxToMm(canvas.height / 6);

        // Escalar proporcionalmente para que entre en el área útil (object-fit: contain)
        const ratio = Math.min(maxW / imgW, maxH / imgH);
        const finalW = imgW * ratio;
        const finalH = imgH * ratio;

        // Centrar en la página
        const offsetX = (pageW - finalW) / 2;
        const offsetY = (pageH - finalH) / 2;

        const pdf = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: [pageW, pageH],
        });

        pdf.addImage(imgData, "JPEG", offsetX, offsetY, finalW, finalH);
        const pdfBase64 = pdf.output("datauristring").split(",")[1];

        // Conteo de ornamentos
        const imgs = grilla.querySelectorAll("img");
        const conteo = {};
        imgs.forEach((img) => {
            const match = img.src.match(/ornaments(\d+)\/[^/]+\/(\w+)\.png/);
            if (match) {
                const tipo = match[1] === "0" ? "Venir Bien" : match[1] === "1" ? "Fúnebre" : "Cintas al Viento";
                const letra = match[2].toUpperCase();
                const key = `${tipo} - ${letra}`;
                conteo[key] = (conteo[key] || 0) + 1;
            }
        });

        const descripcion = Object.entries(conteo)
            .map(([k, v]) => `${k}: ${v} fragmento${v > 1 ? "s" : ""}`)
            .join("\n") || "Grilla vacía";

        const res = await fetch("https://experimental.sublimesintetico.com/api/orar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ texto, descripcion, imagen: pdfBase64, fecha }),
        });

        if (!res.ok) throw new Error(`API error: ${res.status}`);

        boton.textContent = "Oración enviada";
        setTimeout(() => {
            boton.textContent = "Orar";
            boton.disabled = false;
        }, 3000);

    } catch (err) {
        console.error("Error al orar:", err);
        boton.textContent = "Error — intentá de nuevo";
        boton.disabled = false;
        setTimeout(() => (boton.textContent = "Orar"), 3000);
    }
}