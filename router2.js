// Sistema de routing para Portfolio

function gridDefine() {
    const root = document.getElementById('container-root');
    const width = window.innerWidth;
    const height = window.innerHeight;


    columnSize = Math.floor(width / 8) -2;
    row = Math.floor(height / 8) -2;

    root.style.gridTemplateColumns = `repeat(8, ${columnSize}px)`;
    root.style.gridTemplateRows = `repeat(8, ${row}px)`;
        console.log(`Grid defined: ${columnSize}px columns, ${row}px rows`);


    const pupils = document.getElementById('container');
        console.log('Pupils:', pupils);
    pupilSize = height / 12;

    pupils.style['max-width'] = `${pupilSize}rem`;
    pupils.style['display'] = 'flex';
    pupils.style['justify-content'] = 'center';
    pupils.style['align-items'] = 'center';
}

const routes = {
    '/': 'home',
    '/exp0': 'exp0',
    '/exp1': 'exp1',
    '/exp2': 'exp2',
    '/exp3': 'exp3',
    '/exp4': 'exp4',
    '/exp5': 'exp5',
    '/exp6': 'exp6',
    '/exp7': 'exp7',
    '/exp8': 'exp8',
    '/exp9': 'exp9',
    '/exp10': 'exp10',
    '/exp11': 'exp11',
    '/exp12': 'exp12',
    '/projects': 'projects',
    '/contact': 'contact'
}

const totalProjects = 13

// Variables globales para trackear la imagen actual y el proyecto
let currentImageIndex = 0;
let currentexpect = null;
let isChangingImage = false;
let x = 0;

function lookProjects() {
    const { numeroPath } = definePath();

    if (numeroPath === '') {
        document.getElementById('look-projects').style.display = 'block';
        setTimeout(() => {
            document.getElementById('look-projects2').style.display = 'block';
        }, 30000);
    } else {
        return;
    }
}

function definePath() {
    const currentPath = window.location.hash.substring(1); // Elimina el '#' del hash
    const numeroPath = currentPath.replace(/^\D+/g, '');

    return { numeroPath };
}

function nextProject() {
    const { numeroPath } = definePath();
    
    if (numeroPath) {
        const currentNum = parseInt(numeroPath);
        const nextNum = (currentNum + 1) % totalProjects; // Incrementa y vuelve a 0 después de totalexpects
        window.location.hash = `/exp${nextNum}`;
    }
}

function prevProject() {
    const { numeroPath } = definePath(); //Usa función definePath para obtener el número del proyecto actual

    if (numeroPath) {
        const currentNum = parseInt(numeroPath);
        const prevNum = (currentNum - 1 + totalProjects) % totalProjects;
        window.location.hash = `/exp${prevNum}`;
    }
}

function route() {
  const path = window.location.hash.slice(1) || '/';
  const view = routes[path] || 'home';
  
  // Buscar o crear el contenedor de contenido dinámico
  let contentContainer = document.getElementById('dynamic-content');
  const rootContainer = document.getElementById('container-root');
  
  if (!contentContainer) {
    contentContainer = document.createElement('div');
    contentContainer.id = 'dynamic-content';
    // Heredar las propiedades del grid del container padre
    contentContainer.style.display = 'contents'; // Esto hace que los hijos usen el grid del padre
    rootContainer.appendChild(contentContainer);
  }

  // Actualizar solo el contenido dinámico
  contentContainer.innerHTML = views[view];

  if (view != 'home') {
    if (view != 'projects') {  
        if (view != 'contact') {  
            if (document.getElementById('look-projects') != null) {
                    document.getElementById('look-projects').style.display = 'none';
                    if (document.getElementById('look-projects2') != null) {
                        document.getElementById('look-projects2').style.display = 'none';
                    }
                }  
            }
        }
    }
}

// Eye tracker logic - se inicializa una sola vez
function initEyeTracker() {
  const leftPupil = document.getElementById('leftPupil');
  const rightPupil = document.getElementById('rightPupil');
  const container = document.getElementById('container');

  if (!leftPupil || !rightPupil || !container) return;
  
  let movementRange = 11;
  
  function updateEyes(e) {
    const rect = container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    const deltaX = (mouseX - centerX) / (rect.width / 2);
    const deltaY = (mouseY - centerY) / (rect.height / 2);
    
    const moveX = Math.max(-1, Math.min(1, deltaX)) * movementRange;
    const moveY = Math.max(-1, Math.min(1, deltaY)) * movementRange;
    
    if (leftPupil) leftPupil.style.transform = `translate(${moveX}px, ${moveY}px)`;
    if (rightPupil) rightPupil.style.transform = `translate(${moveX}px, ${moveY}px)`;
  }

  document.addEventListener('mousemove', updateEyes);
}

// Inicializar cuando carga la página
window.addEventListener('load', () => {
    gridDefine();
    initEyeTracker();
    route();
});

window.addEventListener('hashchange', route);

// Contenido de cada vista (solo el contenido que aparece/desaparece)
const views = {
  home: '', // Home está vacío porque solo muestra el eye tracker

  //Bouquet
  exp0: `
        <head>
            <title>Trying</title>
            </head>
            <body>
                <div id="container0" style="display:flex; grid-area: 1 / 1 / 9 / 9; height:100%; width:100%; align-items: center; justify-content: center;">
                    <div id="grid" class="container1" style="">
                        <div class='form' style="display: flex; grid-area: 25 / 2 / 27 / 27; justify-content: center; align-items: center; z-index: 9999999; margin-top: 0,5em; background: none;">
                            <form class='form' id="texto-input" autocomplete="off" style="z-index: 9999999;grid-area: 26 / 2 / 27 / 27; margin-bottom: 1em; background: none;">
                            <input type="text" placeholder="Qué querés?">
                        </div> 

                        <div style="display: flex; grid-area: 27 / 2 / 27 / 27; justify-content: center; align-items: center; z-index: 9999999; margin-bottom: 1em; background: none">
                            <button class="print-button" id="print-button" onclick="window.print();" style="background: none; z-index: 999999; ">
                                Orar
                            </button>  
                        </div>
                </div>
            </body>
  `,

  projects: `
    <div class="project-container" style="background:none; border-color: none;">

        <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 0em;">(2026)</p>

        <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 3em; margin-bottom: -1.2em; cursor:pointer;"><a a href="./ornament/trying0.html" target="blank">/ Encrypted Prayers</a></p>

        <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 3em; margin-bottom: -1.2em; cursor:pointer;"><a a href="./ornament/trying0.html" target="blank">/ Encrypted Prayers</a></p>
        
        <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 3em; margin-bottom: -1.2em; cursor:pointer;">/ More coming Soon!</p>

    </div>
  `,
  
  contact: `
    <div class="contacts-0" style="background: none; border-color: none;">
        <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 0em;">I am a pluridisciplinary argentinian designer based in Paris & Buenos Aires (That still struggles with structuring a portfolio) </p>
        <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 3em;">/ Currently at 48°51′40″N 2°23′39″E </p>
        <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 0em;">Studying at ENSAAMA. Édition & Typographie.</p>
    </div>

    <div class="contacts-1" style="background: none; border-color: none;">
        <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6;">Feel free to get in touch for enquiries, collaboration requests, additional information or a coffee.</p>
        <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6;"> But not for a ping pong match. I suck at ping pong.</p>
        <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; cursor:pointer; margin-left: 3em;" onclick='window.location="dinamico.html"'>/ Email <a href="mailto:tgganm@gmail.com" rel="mailto"> tgganm@gmail.com</a></p>
        <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6;cursor:pointer; margin-left: 3em;">/ Instagram <a href="https://www.instagram.com/sublimesintetico/" target="_blank"> @sublimesintetico</a></p>
    </div>
  `
};

// Trying 0
window.addEventListener("load", () => {
	escribirType();
})

let alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

let gridRows = [25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13];
let gridColumns = [25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13];
let zIndex = 0
let rotX = 0
let rotY = 0

rS = Math.max(1, rS); rE = Math.min(25, rE);
cS = Math.max(1, cS); cE = Math.min(25, cE);

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
				img.src = 'media/trying0/ornaments/No-Contour/' + e.key.toLowerCase() + '.png';
				img.style = centralOrnament(i, row, col, size) +"z-index:" + zIndex + "; justify-items: center; align-items: center; object-fit: contain; width: 100%; border: solid; border-width: 0.5px; border-color: white; outline: 0.5px solid black;  background: none;" + rotation(i)
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