window.addEventListener('load', () => {
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
}); */

let display = 0
i = 0
called = 0
resetCalled = 0
time = 150
text = ""
let popupSelected = 0
let maxPopUps = 7 // Numero de popups + 1 (Randomizador)
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
    })) */

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
} */

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
}