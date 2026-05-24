/* window.addEventListener('load', () => {
    gridDefine();
     setTimeout(() => {
            randomPopUp()
        }, Math.floor(Math.random() * 5000))
});

/* window.addEventListener('beforeprint', () => {
    printResize();
    printTextSizing();
});

window.addEventListener('afterprint', () => {
    normalTextSizing();
    gridDefine();
}); */ /*

let display = 0
i = 0
called = 0
resetCalled = 0
time = 150
text = ""
let popupSelected = 0
let maxPopUps = 32 // Numero de popups + 1 (Randomizador)
let zIndex = 20

let popDone = []


const langues = ["esp", "fr", "eng"]
let currentLangue = 0

const ornaments = ["infierno", "mas", "gilda"]
let currentOrnament = 0


function gridDefine() {
    const root = document.getElementById('container-root');
    const info = document.getElementById('abajo-info-' + langues[currentLangue]);
    const width = window.innerWidth;
    const height = window.innerHeight;
    columnNumber = 8;
    rowNumber = 8;

    columnSize = Math.floor(width / columnNumber) -6;
    row = Math.floor(height / rowNumber) -6;

    marginSize = Math.floor(row * 3.5);

    root.style.gridTemplateColumns = `repeat(${columnNumber}, ${columnSize}px)`;
    root.style.gridTemplateRows = `repeat(${rowNumber}, ${row}px)`;

    info.style.marginTop = `${marginSize}px`;

    console.log(`Grid defined: ${columnSize}px columns, ${row}px rows`);
    console.log(`Margin defined: ${marginSize}px`);
}

function reset() {
    console.log("Reset Called")
    img = document.getElementById("gif")
    title = document.getElementById("title-infierno")

    /* if (title.addEventListener("mouseover", () => {
        i = 0
        resetCalled ++
        time = 150
        img.src = ""
        return
    })) */ /*

        if (called === 1) {
                resets = resetCalled
                resetCalled = 0
                time = 150
            }

            setTimeout(() => {
                if (i > 0){
                        img = document.getElementById("gif")
                        img.src = `gif/${ornaments[currentOrnament]}/${i}.jpg`
                        i --
                        time -= i
                        resetCalled ++
                        called = 0
                        reset()   
                } else {
                    time = 150
                    img = document.getElementById("gif")
                    img.src = ''
                    resetCalled = 0
                    return
                }
                }, time);
                console.log(i)
}

function espReveal() {
    currentLangue = 0
    langueReveal()
}

function frReveal() {
    currentLangue = 1
    langueReveal()
}

function engReveal() {
    currentLangue = 2
    langueReveal()
}

function langueReveal() {
    gridDefine()
    let container = document.getElementById("text-center-" + langues[currentLangue])
    console.log("text-center-" + langues[currentLangue])
    container.style.display = "block"

    if (currentLangue === 0) {
        let autre1 = document.getElementById("text-center-" + langues[currentLangue + 1])
        let autre2 = document.getElementById("text-center-" + langues[currentLangue + 2])
        autre1.style.display = "none"
        autre2.style.display = "none"
    } if (currentLangue === 1) {
        let autre1 = document.getElementById("text-center-" + langues[currentLangue - 1])
        let autre2 = document.getElementById("text-center-" + langues[currentLangue + 1])
        autre1.style.display = "none"
        autre2.style.display = "none"
    } if (currentLangue === 2) {
        let autre1 = document.getElementById("text-center-" + langues[currentLangue - 1])
        let autre2 = document.getElementById("text-center-" + langues[currentLangue - 2])
        autre1.style.display = "none"
        autre2.style.display = "none"
    } else {
        return
    }
}

function ornamentInfierno() {
    currentOrnament = 0
    ornamental()
}

function ornamentMas() {
    currentOrnament = 1
    ornamental()

}

function ornamentGilda() {
    currentOrnament = 2
    ornamental()
}

function ornamental() {
    title = document.getElementById("title-infierno")

    if (display === 0) {
        if (called === 0) {
                resets = resetCalled
                resetCalled = 0
            }

            setTimeout(() => {
                i ++
                if (i < 14){
                    if (resets != resetCalled) {
                        called = 0
                        return
                    } else {
                        img = document.getElementById("gif")
                        img.src = `gif/${ornaments[currentOrnament]}/${i}.jpg`
                        time -= i
                        called = 1
                        ornamental()
                    }    
                }
                }, time);
                console.log(i)
    } else {
        return
    }
}

/* function printResize() {
    const root = document.getElementById('container-root');
    const width = 17;
    const height = 27;
    columnNumber = 8;
    rowNumber = 8;

    columnSize = Math.floor(width / columnNumber);
    row = Math.floor(height / rowNumber);

    root.style.gridTemplateColumns = `repeat(${columnNumber}, ${columnSize}cm)`;
    root.style.gridTemplateRows = `repeat(${rowNumber}, ${row}cm)`;

    console.log(`Grid defined: ${columnSize}cm columns, ${row}cm rows`);
}

function printTextSizing() {
    let container = document.getElementById("text-center");
    let where = document.getElementById(textosComplete[1].where);
    let paragraph = document.getElementsByTagName("p");
    let colophon = document.getElementById('colophon-show');
    
    /* for (let i = 1; i < textosComplete.length; i++) {
        let where = document.getElementById(textosComplete[i].where);
        where.style.display = "block";
    } 

    for (let i = 0; i < paragraph.length; i++) {
        paragraph[i].style.fontSize = "1.2em"
    } 

    where.style.display = "block";
    colophon.style.display = "block";
    container.style.gridArea = "1 / 1 / 8 / 9";
} */ /*

function revealInfierno() {
    text = "infierno"
    revealer()
}

function revealGilda() {
    text = "gilda"
    revealer()
}

function revealer() {
    reset()

    let container = document.getElementById("text-center-" + langues[currentLangue]);
    let where = document.getElementById(text + "-" + langues[currentLangue]);
    let colonnes = document.getElementById("colonnes")

    if (display === 0) {
        where.style.display = "block";
        colonnes.style.marginBottom = "0.5em"
        container.style.gridArea = "1 / 3 / 8 / 7";
        display ++
    } else {
        where.style.display = "none";
        colonnes.style.marginBottom = "0em"
        container.style.gridArea = "4 / 4 / 6 / 6";
        display --
        setTimeout(() => {
            popDone = []
            randomPopUp()
        }, Math.floor(Math.random() * 5000))
    }
}

let popupCount = 0
const popupInitialDelay = 5000   // delay máximo del primer popup
const popupMinDelay = 400        // delay mínimo al final
const popupAccelStep = 600       // cuánto se reduce el máximo por cada popup
 
function randomPopUp() {
        zIndex ++
        popupNow = Math.floor(Math.random() * maxPopUps)
 
        if (popDone.length === maxPopUps) {
            return
        } else {
            while (popDone.includes(popupNow)) {
                    popupNow = Math.floor(Math.random() * maxPopUps)
                }
        }

        popDone.push(popupNow)
        console.log(popDone)
 
        let popper = document.getElementById('popup-' + popupNow);
 
        if (display === 0) {
            if (popper.className === "popup" || popper.className === "popup-black") {
                    distancetop = Math.floor(Math.random() * 60)
                    distanceleft = Math.floor(Math.random() * 23)
            } if (popper.className === "popup-long" || popper.className === "popup-long-black") {
                    distancetop = Math.floor(Math.random() * 47)
                    distanceleft = Math.floor(Math.random() * 23)
            }  if (popper.className === "popup-wide" || popper.className === "popup-wide-black") {
                    distancetop = Math.floor(Math.random() * 75)
                    distanceleft = Math.floor(Math.random() * 23) 
            }
        } else {
            return
        }
 
        // Forzar re-trigger de la animación CSS
        popper.style.animation = 'none'
        popper.offsetHeight // reflow
        popper.style.animation = ''
        
        popper.style.display = 'inherit';
        popper.style.top = distancetop + '%';
        popper.style.left = distanceleft + '%';
        popper.style.zIndex = zIndex;
        console.log(distancetop)
 
        // Calcular el siguiente delay: cada popup reduce el máximo en popupAccelStep
        popupCount++
        const maxDelay = Math.max(popupMinDelay, popupInitialDelay - (popupCount * popupAccelStep))
        const nextDelay = Math.floor(Math.random() * maxDelay) + popupMinDelay
 
        setTimeout(() => {
            randomPopUp()
        }, nextDelay)
}


function closePopUp0() {
    console.log("closePopUp0")
    popupSelected = 0
    closePopUp()
}

function closePopUp1() {
    popupSelected = 1
    closePopUp()
}

function closePopUp2() {
    popupSelected = 2
    closePopUp()
}

function closePopUp3() {
    popupSelected = 3
    closePopUp()
}

function closePopUp4() {
    popupSelected = 4
    closePopUp()
}

function closePopUp5() {
    popupSelected = 5
    closePopUp()
}

function closePopUp6() {
    popupSelected = 6
    closePopUp()
}


function closePopUp7() {
    popupSelected = 7
    closePopUp()
}



function closePopUp() {
    popper = document.getElementById('popup-' + popupSelected);
    popper.style.display = 'none';
} */

window.addEventListener('load', () => {
    gridDefine();
    setTimeout(() => {
        randomPopUp()
    }, Math.floor(Math.random() * 5000))
});
 
let display = 0
let i = 0
let called = 0
let resetCalled = 0
let time = 150
let text = ""
let popupSelected = 0
let maxPopUps = 32 // Numero de popups + 1 (Randomizador)
let zIndex = 20
 
let popDone = []
 
const langues = ["esp", "fr", "eng"]
let currentLangue = 0
 
const ornaments = ["infierno", "mas", "gilda"]
let currentOrnament = 0
 
 
function gridDefine() {
    const root = document.getElementById('container-root');
    const info = document.getElementById('abajo-info-' + langues[currentLangue]);
    const width = window.innerWidth;
    const height = window.innerHeight;
    const columnNumber = 8;
    const rowNumber = 8;
 
    const columnSize = Math.floor(width / columnNumber) - 6;
    const row = Math.floor(height / rowNumber) - 6;
    const marginSize = Math.floor(row * 3.5);
 
    root.style.gridTemplateColumns = `repeat(${columnNumber}, ${columnSize}px)`;
    root.style.gridTemplateRows = `repeat(${rowNumber}, ${row}px)`;
    info.style.marginTop = `${marginSize}px`;
 
    console.log(`Grid defined: ${columnSize}px columns, ${row}px rows`);
    console.log(`Margin defined: ${marginSize}px`);
}
 
// ── RESET: reemplaza la recursión por un setInterval iterativo ──────────────
let resetInterval = null
 
function reset() {
    console.log("Reset Called")
 
    // Cancelar cualquier reset en curso
    if (resetInterval) {
        clearInterval(resetInterval)
        resetInterval = null
    }
 
    if (called === 1) {
        resetCalled = 0
        time = 150
    }
 
    resetInterval = setInterval(() => {
        if (i > 0) {
            const img = document.getElementById("gif")
            img.src = `gif/${ornaments[currentOrnament]}/${i}.jpg`
            i--
            // Nota: no modificamos `time` aquí para que el intervalo sea estable;
            // si querés acelerar el reset, podés ajustar el intervalo dinámicamente
            resetCalled++
            called = 0
        } else {
            clearInterval(resetInterval)
            resetInterval = null
            time = 150
            const img = document.getElementById("gif")
            img.src = ''
            resetCalled = 0
        }
    }, time)
}
 
function espReveal() {
    currentLangue = 0
    langueReveal()
}
 
function frReveal() {
    currentLangue = 1
    langueReveal()
}
 
function engReveal() {
    currentLangue = 2
    langueReveal()
}
 
function langueReveal() {
    gridDefine()
    const container = document.getElementById("text-center-" + langues[currentLangue])
    container.style.display = "block"
 
    // Ocultar los otros dos idiomas
    langues.forEach((l, idx) => {
        if (idx !== currentLangue) {
            document.getElementById("text-center-" + l).style.display = "none"
        }
    })
}
 
function ornamentInfierno() {
    currentOrnament = 0
    ornamental()
}
 
function ornamentMas() {
    currentOrnament = 1
    ornamental()
}
 
function ornamentGilda() {
    currentOrnament = 2
    ornamental()
}
 
// ── ORNAMENTAL: reemplaza la recursión por un setInterval iterativo ─────────
let ornamentalInterval = null
 
function ornamental() {
    if (display !== 0) return
 
    // Evitar múltiples intervalos en paralelo
    if (ornamentalInterval) return
 
    if (called === 0) {
        // Guardamos el estado de reset para detectar interrupciones
        window._ornamentalResets = resetCalled
        resetCalled = 0
    }
 
    ornamentalInterval = setInterval(() => {
        i++
        if (i < 14) {
            if (window._ornamentalResets !== resetCalled) {
                // Fue interrumpido
                called = 0
                clearInterval(ornamentalInterval)
                ornamentalInterval = null
                return
            }
            const img = document.getElementById("gif")
            img.src = `gif/${ornaments[currentOrnament]}/${i}.jpg`
            time = Math.max(50, time - i) // evitar delays negativos
            called = 1
        } else {
            // Llegamos al frame 13, terminamos
            clearInterval(ornamentalInterval)
            ornamentalInterval = null
        }
    }, time)
}
 
function revealInfierno() {
    text = "infierno"
    revealer()
}
 
function revealGilda() {
    text = "gilda"
    revealer()
}
 
function revealer() {
    reset()
 
    const container = document.getElementById("text-center-" + langues[currentLangue]);
    const where = document.getElementById(text + "-" + langues[currentLangue]);
    const colonnes = document.getElementById("colonnes")
 
    if (display === 0) {
        where.style.display = "block";
        colonnes.style.marginBottom = "0.5em"
        container.style.gridArea = "1 / 3 / 8 / 7";
        display++
    } else {
        where.style.display = "none";
        colonnes.style.marginBottom = "0em"
        container.style.gridArea = "4 / 4 / 6 / 6";
        display--
        setTimeout(() => {
            popDone = []
            popupCount = 0   // ← resetear el contador de aceleración también
            randomPopUp()
        }, Math.floor(Math.random() * 5000))
    }
}
 
let popupCount = 0
const popupInitialDelay = 5000   // delay máximo del primer popup
const popupMinDelay = 400        // delay mínimo al final
const popupAccelStep = 600       // cuánto se reduce el máximo por cada popup
 
function randomPopUp() {
    // Condición de parada: ya mostramos todos los popups
    if (popDone.length >= maxPopUps) return
 
    // Si el texto está abierto, no mostrar popups
    if (display !== 0) return
 
    zIndex++
 
    // Elegir un popup no mostrado aún
    let popupNow = Math.floor(Math.random() * maxPopUps)
    let attempts = 0
    while (popDone.includes(popupNow)) {
        popupNow = Math.floor(Math.random() * maxPopUps)
        attempts++
        // Seguridad: si no encontramos uno libre en muchos intentos, salir
        if (attempts > maxPopUps * 3) return
    }
 
    popDone.push(popupNow)
    console.log(popDone)
 
    const popper = document.getElementById('popup-' + popupNow)
    if (!popper) {
        // El elemento no existe en el DOM, programar el siguiente igualmente
        scheduleNextPopUp()
        return
    }
 
    let distancetop, distanceleft
 
    if (popper.className === "popup" || popper.className === "popup-black") {
        distancetop = Math.floor(Math.random() * 60)
        distanceleft = Math.floor(Math.random() * 23)
    } else if (popper.className === "popup-long" || popper.className === "popup-long-black") {
        distancetop = Math.floor(Math.random() * 47)
        distanceleft = Math.floor(Math.random() * 23)
    } else if (popper.className === "popup-wide" || popper.className === "popup-wide-black") {
        distancetop = Math.floor(Math.random() * 75)
        distanceleft = Math.floor(Math.random() * 23)
    } else {
        // Clase desconocida: valores por defecto
        distancetop = Math.floor(Math.random() * 60)
        distanceleft = Math.floor(Math.random() * 23)
    }
 
    // Forzar re-trigger de la animación CSS
    popper.style.animation = 'none'
    popper.offsetHeight // reflow
    popper.style.animation = ''
 
    popper.style.display = 'inherit'
    popper.style.top = distancetop + '%'
    popper.style.left = distanceleft + '%'
    popper.style.zIndex = zIndex
    console.log(distancetop)
 
    scheduleNextPopUp()
}
 
function scheduleNextPopUp() {
    if (popDone.length >= maxPopUps) return
 
    popupCount++
    const maxDelay = Math.max(popupMinDelay, popupInitialDelay - (popupCount * popupAccelStep))
    const nextDelay = Math.floor(Math.random() * maxDelay) + popupMinDelay
 
    setTimeout(() => {
        randomPopUp()
    }, nextDelay)
}
 
 
// ── closePopUp: versión unificada, sin repetir N funciones ──────────────────
function closePopUp(id) {
    // Acepta llamada directa closePopUp(3) o desde los wrappers legacy
    const target = (id !== undefined) ? id : popupSelected
    const popper = document.getElementById('popup-' + target)
    if (popper) popper.style.display = 'none'
}
 
// Wrappers legacy (por si el HTML los llama por nombre)
function closePopUp0() { closePopUp(0) }
function closePopUp1() { closePopUp(1) }
function closePopUp2() { closePopUp(2) }
function closePopUp3() { closePopUp(3) }
function closePopUp4() { closePopUp(4) }
function closePopUp5() { closePopUp(5) }
function closePopUp6() { closePopUp(6) }
function closePopUp7() { closePopUp(7) }
