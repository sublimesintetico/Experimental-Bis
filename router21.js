// Sistema de routing para Portfolio

function gridDefine() {
    const root = document.getElementById('container-root');
    const width = window.innerWidth;
    const height = window.innerHeight;
    columnNumber = 4;
    rowNumber = 8;

    columnSize = Math.floor(width / columnNumber) -2;
    row = Math.floor(height / rowNumber) -2;

    root.style.gridTemplateColumns = `repeat(${columnNumber}, ${columnSize}px)`;
    root.style.gridTemplateRows = `repeat(${rowNumber}, ${row}px)`;

    console.log(`Grid defined: ${columnSize}px columns, ${row}px rows`);
}

/* function pictureResize() {
    const img = document.getElementById('project-picture');
    const height = window.innerHeight;
    const row = Math.floor(height / rowNumber) -2;


    if (!img) return; else {
        const imgHeight = window.innerWidth * 0.8;
        img.height = imgHeight;
    }
} */

const routes = {
    '/': 'home',
    '/proj0': 'proj0',
    '/proj1': 'proj1',
    '/proj2': 'proj2',
    '/proj3': 'proj3',
    '/proj4': 'proj4',
    '/proj5': 'proj5',
    '/proj6': 'proj6',
    '/proj7': 'proj7',
    '/proj8': 'proj8',
    '/proj9': 'proj9',
    '/proj10': 'proj10',
    '/proj11': 'proj11',
    '/proj12': 'proj12',
    '/projects': 'projects',
    '/contact': 'contact'
}

const totalProjects = 13

// Variables globales para trackear la imagen actual y el proyecto
let currentImageIndex = 0;
let currentProject = null;
let isChangingImage = false;
let display = 0;
let x = 0;


const projectImages = {
    'proj0': {
        basePath: '0media/bouquet/',
        baseName: 'bouquet',
        extension: '.webp',
        totalImages: 3,
        dynamicNumber: 0,
    },
    'proj1': {
        basePath: '0media/scans-ugb-webp/',
        baseName: 'UGB1',
        extension: '.webp',
        totalImages: 10,
        dynamicNumber: 0,
    },
    'proj2': {
        basePath: '0media/scans-ugb-webp/',
        baseName: 'UGB2',
        extension: '.webp',
        totalImages: 11,
        dynamicNumber: 0,
    },
    'proj3': {
        basePath: '0media/scans-ugb-webp/',
        baseName: 'UGB3',
        extension: '.webp',
        totalImages: 11,
        dynamicNumber: 0,
    },  
    'proj4': {
        basePath: '0media/orphan-book-photos/',
        baseName: 'OrphanB',
        extension: '.webp',
        totalImages: 7,
        dynamicNumber: 0,
    },
    'proj5': {
        basePath: '0media/mtq/forget-her-somehow/',
        baseName: 'mtq',
        extension: '.webp',
        totalImages: 4,
        dynamicNumber: 0,
    },
    'proj6': {
        basePath: '0media/mtq/affiches/',
        baseName: 'mtqa',
        extension: '.webp',
        totalImages: 8, // Ajusta este número según cuántas imágenes tengas (0 a 9 = 10 imágenes)
        dynamicNumber: 4,
    },
    'proj7': {
        basePath: '0media/aeterna-absentia/',
        baseName: 'absentia',
        extension: '.webp',
        totalImages: 8, // Ajusta este número según cuántas imágenes tengas (0 a 9 = 10 imágenes)
        dynamicNumber: 0,
    },
    'proj8': {
        basePath: '0media/ipomea/',
        baseName: 'ipomea',
        extension: '.webp',
        totalImages: 8, // Ajusta este número según cuántas imágenes tengas (0 a 9 = 10 imágenes)
        dynamicNumber: 0,
    },
    'proj9': {
        basePath: '0media/pink-dream/poster/',
        baseName: 'pink',
        extension: '.webp',
        totalImages: 8, // Ajusta este número según cuántas imágenes tengas (0 a 9 = 10 imágenes)
        dynamicNumber: 0,
    },
    'proj10': {
        basePath: '0media/pink-dream/mural/',
        baseName: 'pinky',
        extension: '.webp',
        totalImages: 8, // Ajusta este número según cuántas imágenes tengas (0 a 9 = 10 imágenes)
        dynamicNumber: 0,
    },
    'proj12': {
        basePath: '0media/scans-memoire-webp/',
        baseName: 'anges',
        extension: '.webp',
        totalImages: 17,
        dynamicNumber: 0,
    },
}


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

/* function dynamicText(nombrePath, currentImageIndex) {
    console.log('Dynamic Text Function Called with:', nombrePath, currentImageIndex);
    if (nombrePath === 'proj6') {
        if (currentImageIndex === projectImages[nombrePath]?.dynamicNumber) {
            document.getElementById('dynamic-text1').style.display = 'none';
            document.getElementById('dynamic-text2').style.display = 'block';
        }
        if (currentImageIndex < projectImages[nombrePath]?.dynamicNumber) {
            document.getElementById('dynamic-text1').style.display = 'block';
            document.getElementById('dynamic-text2').style.display = 'none';
        }
    }
} */

function definePath() {
    const currentPath = window.location.hash.substring(1); // Elimina el '#' del hash
    const numeroPath = currentPath.replace(/^\D+/g, '');

    return { numeroPath };
}

function nextProject() {
    const { numeroPath } = definePath();
    
    if (numeroPath) {
        const currentNum = parseInt(numeroPath);
        const nextNum = (currentNum + 1) % totalProjects; // Incrementa y vuelve a 0 después de totalProjects
        window.location.hash = `/proj${nextNum}`;
    }
}

function prevProject() {
    const { numeroPath } = definePath(); //Usa función definePath para obtener el número del proyecto actual

    if (numeroPath) {
        const currentNum = parseInt(numeroPath);
        const prevNum = (currentNum - 1 + totalProjects) % totalProjects;
        window.location.hash = `/proj${prevNum}`;
    }
}

function nextImg() { 
  const { numeroPath } = definePath();
  if (isChangingImage) return;

  nombrePath = `proj${numeroPath}`;
  basePath = projectImages[nombrePath]?.basePath;
  baseName = projectImages[nombrePath]?.baseName;
  extension = projectImages[nombrePath]?.extension;

  if (numeroPath) {
    isChangingImage = true;
    currentImageIndex = (currentImageIndex + 1) % projectImages[nombrePath].totalImages;

    const img = document.querySelector('#project-photo img');
    let newSrc = null;

    if (img && newSrc === null) {
      img.src = `${basePath}${baseName}_${currentImageIndex}${extension}`;
          
          setTimeout(() => {
            isChangingImage = false;
            }, 100);
        } 
        if (currentImageIndex + 1 != projectImages[nombrePath].totalImages) {
            newSrc = `${basePath}${baseName}_${currentImageIndex+1}${extension}`;
            /*if (projectImages[nombrePath].dynamicNumber != 0) {
                dynamicText(nombrePath, currentImageIndex+1)
            }*/
            console.log(newSrc);
        } else {
            newSrc = `${basePath}${baseName}_${0}${extension}`;
            console.log(newSrc);
        }
    } else {
        img.src = newSrc;
        setTimeout(() => {
        isChangingImage = false;
        }, 100); // Espera 100ms antes de permitir el cambio de imagen
    }
    isChangingImage = false;
  }

function prevImg() { 
  const { numeroPath } = definePath();
  if (isChangingImage) return;

  nombrePath = `proj${numeroPath}`;
  basePath = projectImages[nombrePath]?.basePath;
  baseName = projectImages[nombrePath]?.baseName;
  extension = projectImages[nombrePath]?.extension;

  if (numeroPath) {
    isChangingImage = true;
    currentImageIndex = (currentImageIndex - 1 + projectImages[nombrePath].totalImages) % projectImages[nombrePath].totalImages;

    const img = document.querySelector('#project-photo img');
    let newSrc = null;

    if (img && newSrc === null) {
      img.src = `${basePath}${baseName}_${currentImageIndex}${extension}`;
          setTimeout(() => {
            isChangingImage = false;
            }, 100); // Espera 100ms antes de permitir el cambio de imagen
        } 
    } else {
        if (currentImageIndex - 1 >= 0) {
            newSrc = `${basePath}${baseName}_${currentImageIndex-1}${extension}`;
        } else {
            newSrc = `${basePath}${baseName}_${projectImages[nombrePath].totalImages - 1}${extension}`;
        }    
    }

    const img = document.querySelector('#project-photo img');

    if (newSrc) {
        img.src = newSrc;
        setTimeout(() => {
        isChangingImage = false;
        }, 100); // Espera 100ms antes de permitir el cambio de imagen
    } else {
      isChangingImage = false;
    }
}

function masMenos() {
    const title = document.getElementById('project-title');
    const texto = document.getElementById('project-text');
    const details = document.getElementById('project-details');
    const photo = document.getElementById('project-photo');

    const before = document.getElementById('pag-nav-prev');
    const after = document.getElementById('pag-nav-nxt');

    const verMas = document.getElementById('ver-mas');
    const verMenos = document.getElementById('ver-menos');

    console.log(title, texto, details, photo);

    if (photo && texto && details) {
        if (display === 0) {
            title.style.display = 'block';
            texto.style.display = 'block';
            details.style.display = 'block';

            before.style.gridArea = '4 / 2 / 5 / 3';
            after.style.gridArea = '4 / 7 / 5 / 8';

            verMas.style.display = 'none';
            verMenos.style.display = 'flex';

            photo.style.gridArea = '2 / 3 / 7 / 7';

            display = 1;
        } else {
            title.style.display = 'none';
            texto.style.display = 'none';
            details.style.display = 'none';

            before.style.gridArea = '4 / 2 / 6 / 3';
            after.style.gridArea = '4 / 7 / 6 / 8';

            verMas.style.display = 'flex';
            verMenos.style.display = 'none';

            photo.style.gridArea = '2 / 3 / 8 / 7';

            display = 0;
        }
    }
}

function escribirType(){
    textInput = document.getElementById("input-text");
    reset = document.getElementById("reset-text");
    escribirInput = document.getElementById("type-written");
    if (!textInput || !escribirInput) return;
    textInput.addEventListener("input", function(e){
        maj = e.target.value.toUpperCase()
        escribirInput.innerText = "" + maj
    })
    reset.addEventListener("click", () =>{
        escribirInput.innerText = ""
    })
     
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

  // Resetear el índice de imágenes cuando cambia el proyecto
  currentImageIndex = 0;

  if (view === 'proj11') {
    escribirType();
  }

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

  if (view === 'home' && x === 0) {
    setTimeout(lookProjects, 30000)
    x ++
  }

    if (display === 1) {
        display = 0;
        masMenos();
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
  proj0: `
      <div id="opacity" style="width:100vw; height:100vh; background:rgba(246, 246, 246, 0.5); position:fixed; top:0; left:0; z-index:1;"></div>

      <div class="project-title" id='project-title' style="background-color: none; border-color: none; background: none; display: none;">
          <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 0em;">Los poseídos entre lilas</p>
          <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 3em;">/ Dead flower Bouquet</p>
      </div>

      <div class="project-photo" id="project-photo">
          <img src="0media/bouquet/bouquet_0.webp" alt="Memoire" style="width:auto; height:100%;">
      </div>

      <div class="pag-nav-prev" id="pag-nav-prev" style="grid-area: 4/2/5/3; z-index: 15; background: none; border-color: none;">
          <p id="pre-proj" style="cursor:pointer; text-align:right; margin-right: 3em;border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6;"> <a onclick="prevImg()">&#8592;</a></p>
      </div>

      <div class="pag-nav-next" id="pag-nav-nxt" style="grid-area: 4/7/5/8; background: none; z-index: 15; border-color: none;">
          <p id="next-proj" style="cursor:pointer;  margin-left: 3em; border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6;"> <a onclick="nextImg()">&#8594;</a></p>
      </div>

      <div class="project-text" id='project-text' style="background-color: none; border-color: none; display: none;">
          <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 0em;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Named after a Pizarnik poem, this bouquet is inspired after the flowers left forgotten at the popular altars of Saint the Death. Created using left-over fabric & leather, wax from burnt candles & safety-pins & buttons found on the street, this bouquet exists as defense of residual creation.</p>
      </div>

      <div class="project-details" id='project-details' style="background-color: none; border-color: none; display: none;">
          <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 3em;  margin-bottom: -1.3em">480x200mm</p>
          <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 3em; margin-bottom: -1.3em">9 Waxed Cotton flowers</p>
          <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 6em; margin-bottom: -1.3em">Steel wire stems</p>
          <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 6em; margin-bottom: -1.3em">Molded Leather</p>
      </div>

      <div class="project-nav-prev" id="project-nav" style="background: none; border-color: none;">
          <p id="pre-proj" style="cursor:pointer; text-align:right; margin-right: 3em;border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6;"> <a onclick="prevProject()">&#8592;</a></p>
      </div>

      <div class="project-nav-next" id="project-nav" style="background: none; border-color: none;">
          <p id="next-proj" style="cursor:pointer;  margin-left: 3em; border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6;"> <a onclick="nextProject()">&#8594;</a></p>
      </div>

      <div class="look-projects" id='ver-mas' style="margin-top: 3em; z-index: 99;">
            <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6"><a onclick="masMenos()">More</a></p>
      </div>

      <div class="look-projects" id='ver-menos' style="margin-top: 3em; z-index: 99; display: none;">
            <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6"><a onclick="masMenos()">The less I know the better</a></p>
      </div>
  `,

  // UGB 1 
  proj1: `
      <div class="desk" id="opacity" style="width:100vw; height:100vh; background:rgba(246, 246, 246, 0.5); position:fixed; top:0; left:0; z-index:1;"></div>

      <div class="project-photo" id="project-photo"> 
          <img src="0media/scans-ugb-webp/UGB1_0.webp" alt="Page" style="width:auto; height:100%;">
      </div>

      <div class="pag-nav-prev" id="pag-nav-prev" style="z-index: 15; background: none; border-color: none;">
          <p class="desk" id="pre-proj" style="cursor:pointer; text-align:right; margin-right: 3em;border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6;"> <a onclick="prevImg()">&#8592;</a></p>
      </div>

      <div class="pag-nav-next" id="pag-nav-nxt" style="background: none; z-index: 15; border-color: none;">
          <p id="next-proj" style="cursor:pointer;  margin-left: 3em; border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6;"> <a onclick="nextImg()">&#8594;</a></p>
      </div>

      <div class="project-title" id='project-title' style="background:none; border-color: none; display: none;">
          <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 0em;">Ugly Girls & Boys</p>
          <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 3em;">/ I</p>
      </div>

      <div class="project-text" id='project-text' style="background-color: none; border-color: none; display: none;">
          <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 0em;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Tone on Tone Fanzine created Collectively with <a style='background: none;' href="https://www.instagram.com/kishin.dissolved/" target="_blank">@kishin.dissolved</a>. Visual experimentation using illustrations, custom typefaces and collages. Horses Edition.</p>
      </div>

      <div class="project-details" id='project-details' style="background-color: none; border-color: none; display: none;">
          <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 3em;  margin-bottom: -1.3em">First edition 2025. Reprinted 2026.</p>
          <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 3em; margin-bottom: -1.3em">200x270mm</p>
          <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 6em; margin-bottom: -1.3em;">Laser-printed on 160g Black Paper</p>
      </div>

      <div class="project-nav-prev" id="project-nav" style="background: none; border-color: none;">
          <p id="pre-proj" style="cursor:pointer; text-align:right; margin-right: 3em;border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6;"> <a onclick="prevProject()">&#8592;</a></p>
      </div>

      <div class="project-nav-next" id="project-nav" style="background: none; border-color: none;">
          <p id="next-proj" style="cursor:pointer;  margin-left: 3em; border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6;"> <a onclick="nextProject()">&#8594;</a></p>
      </div>

      <div class="look-projects" id='ver-mas' style="margin-top: 3em; z-index: 99;">
            <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6"><a onclick="masMenos()">More</a></p>
      </div>

      <div class="look-projects" id='ver-menos' style="margin-top: 3em; z-index: 99; display: none;">
            <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6"><a onclick="masMenos()">The less I know the better</a></p>
      </div>
`,

// UGB 2
  proj2: `
      <div id="opacity" style="width:100vw; height:100vh; background:rgba(246, 246, 246, 0.5); position:fixed; top:0; left:0; z-index:1;"></div>

      <div class="project-photo" id="project-photo">
          <img src="0media/scans-ugb-webp/UGB2_0.webp" alt="Page" style="width:auto; height:100%;">
      </div>

      <div class="pag-nav-prev" id="pag-nav-prev" style="background: none; border-color: none;">
          <p id="pre-proj" style="cursor:pointer; text-align:right; margin-right: 3em;border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6;"> <a onclick="prevImg()">&#8592;</a></p>
      </div>

      <div class="pag-nav-next" id="pag-nav-nxt" style="background: none; border-color: none;">
          <p id="next-proj" style="cursor:pointer;  margin-left: 3em; border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6;"> <a onclick="nextImg()">&#8594;</a></p>
      </div>

      <div class="project-title" id='project-title' style="background:none; border-color: none; display: none;">
          <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 0em;">Ugly Girls & Boys</p>
          <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 3em;">/ II</p>
      </div>

      <div class="project-text" id='project-text' style="background-color: none; border-color: none; display: none;">
          <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 0em;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Tone on Tone Fanzine created Collectively with <a style='background: none;' href="https://www.instagram.com/kishin.dissolved/" target="_blank">@kishin.dissolved</a>. Visual experimentation using illustrations, custom typefaces and collages. Gambling Edition.</p>
      </div>

      <div class="project-details" id='project-details' style="background: none; background-color: none; border-color: none; display: none;">
          <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 3em;  margin-bottom: -1.3em">First edition 2026.</p>
          <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 3em; margin-bottom: -1.3em">200x270mm</p>
          <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 6em; margin-bottom: -1.3em;">Laser-printed on 180g Red Paper</p>
      </div>

      <div class="project-nav-prev" id="project-nav" style="background: none; border-color: none;">
          <p id="pre-proj" style="cursor:pointer; text-align:right; margin-right: 3em;border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6;"> <a onclick="prevProject()">&#8592;</a></p>
      </div>

      <div class="project-nav-next" id="project-nav" style="background: none; border-color: none;">
          <p id="next-proj" style="cursor:pointer;  margin-left: 3em; border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6;"> <a onclick="nextProject()">&#8594;</a></p>
      </div>

      <div class="look-projects" id='ver-mas' style="margin-top: 3em; z-index: 99;">
            <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6"><a onclick="masMenos()">More</a></p>
      </div>

      <div class="look-projects" id='ver-menos' style="margin-top: 3em; z-index: 99; display: none;">
            <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6"><a onclick="masMenos()">The less I know the better</a></p>
      </div>
  `,

// UGB 3
  proj3: `
      <div id="opacity" style="width:100vw; height:100vh; background:rgba(246, 246, 246, 0.5); position:fixed; top:0; left:0; z-index:1;"></div>

      <div class="project-photo" id="project-photo">
          <img src="0media/scans-ugb-webp/UGB3_0.webp" alt="Page" style="width:auto; height:100%;">
      </div>

      <div class="pag-nav-prev" id='pag-nav-prev' style="background: none; border-color: none;">
          <p id="pre-proj" style="cursor:pointer; text-align:right; margin-right: 3em;border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6;"> <a onclick="prevImg()">&#8592;</a></p>
      </div>

      <div class="pag-nav-next" id='pag-nav-nxt' style="background: none; border-color: none;">
          <p id="next-proj" style="cursor:pointer;  margin-left: 3em; border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6;"> <a onclick="nextImg()">&#8594;</a></p>
      </div>

      <div class="project-title" id='project-title' style="background: none; border-color: none; display: none;">
          <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 0em;">Ugly Girls & Boys</p>
          <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 3em;">/ III</p>
      </div>

      <div class="project-text" id='project-text' style="background-color: none; border-color: none; display: none;">
          <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 0em;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Tone on Tone Fanzine created Collectively with <a style='background: none;' href="https://www.instagram.com/kishin.dissolved/" target="_blank">@kishin.dissolved</a>. Visual experimentation using illustrations, custom typefaces and collages. Bodyparts Edition.</p>
      </div>

      <div class="project-details" id='project-details' style="background-color: none; border-color: none; display: none;">
          <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 3em;  margin-bottom: -1.3em">First edition 2026.</p>
          <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 3em; margin-bottom: -1.3em">200x270mm</p>
          <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 6em; margin-bottom: -1.3em;">Laser-printed on 160g White (Normal...) Paper</p>
      </div>

      <div class="project-nav-prev" id="project-nav" style="background: none; border-color: none;">
          <p id="pre-proj" style="cursor:pointer; text-align:right; margin-right: 3em;border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6;"> <a onclick="prevProject()">&#8592;</a></p>
      </div>

      <div class="project-nav-next" id="project-nav" style="background: none; border-color: none;">
          <p id="next-proj" style="cursor:pointer;  margin-left: 3em; border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6;"> <a onclick="nextProject()">&#8594;</a></p>
      </div>

      <div class="look-projects" id='ver-mas' style="margin-top: 3em; z-index: 99;">
            <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6"><a onclick="masMenos()">More</a></p>
      </div>

      <div class="look-projects" id='ver-menos' style="margin-top: 3em; z-index: 99; display: none;">
            <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6"><a onclick="masMenos()">The less I know the better</a></p>
      </div>
  `,

//Orphan Book
  proj4: `
      <div id="opacity" style="width:100vw; height:100vh; background:rgba(246, 246, 246, 0.5); position:fixed; top:0; left:0; z-index:1;"></div>

      <div class="project-photo" id="project-photo">
          <img src="0media/orphan-book-photos/OrphanB_0.webp" alt="Page" style="width:auto; height:100%;">
      </div>

      <div class="pag-nav-prev" id="pag-nav-prev" style="background: none; border-color: none;">
          <p id="pre-proj" style="cursor:pointer; text-align:right; margin-right: 3em;border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6;"> <a onclick="prevImg()">&#8592;</a></p>
      </div>

      <div class="pag-nav-next" id="pag-nav-nxt" style="background: none; border-color: none;">
          <p id="next-proj" style="cursor:pointer;  margin-left: 3em; border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6;"> <a onclick="nextImg()">&#8594;</a></p>
      </div>

      <div class="project-title" id='project-title' style="background: none; border-color: none; display: none;">
          <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 0em;">The Orphan Book</p>
          <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 3em;">/ The Structure of Abandonment</p>
      </div>

      <div class="project-text" id='project-text' style="background: none; border-color: none; display: none;">
          <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 0em;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; The Orphan Book is the recollection of Nouchs’ trace of forgotten, or thoughtfully abandoned, drawings. These creatures, created & left where they’re conceived, are put into this book without a particular order, brought together only by the metal clamps that do not unite them, but separate them further. </p>
      </div>

      <div class="project-details" id='project-details' style="background: none; border-color: none; display: none;">
          <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 3em;  margin-bottom: -1.3em">Limited Edition</p>
          <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 3em; margin-bottom: -1.3em">290x237mm (65mm thick)</p>
          <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 6em; margin-bottom: -1.3em;">80 Illustrations by <a href="https://www.instagram.com/nouch_amsterdam" target="_blank">@nouch_amsterdam</a></p>
          <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 6em; margin-bottom: -1.3em;">Laser-cut steel by <a href="https://www.instagram.com/atelier_v_asseldonk" target="_blank">@atelier_v_asseldonk</a></p>
      </div>

      <div class="project-nav-prev" id="project-nav" style="background: none; border-color: none;">
          <p id="pre-proj"  style="cursor:pointer; text-align:right; margin-right: 3em;border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6;"> <a onclick="prevProject()">&#8592;</a></p>
      </div>

      <div class="project-nav-next" id="project-nav" style="background: none; border-color: none;">
          <p id="next-proj" style="cursor:pointer;  margin-left: 3em; border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6;"> <a onclick="nextProject()">&#8594;</a></p>
      </div>

      <div class="look-projects" id='ver-mas' style="margin-top: 3em; z-index: 99;">
            <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6"><a onclick="masMenos()">More</a></p>
      </div>

      <div class="look-projects" id='ver-menos' style="margin-top: 3em; z-index: 99; display: none;">
            <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6"><a onclick="masMenos()">The less I know the better</a></p>
      </div>
  `,

//May the Queen (Forget Her Somehow)
  proj5: `  
      <div id="opacity" style="width:100vw; height:100vh; background:rgba(246, 246, 246, 0.5); position:fixed; top:0; left:0; z-index:1; justify-content: center; align-items:center; display:flex;"></div>

      <div class="project-photo" id="project-photo">
          <img src="0media/mtq/forget-her-somehow/mtq_0.webp" alt="Forget Her Somehow" style="width:auto; height:100%;">
      </div>

      <div class="pag-nav-prev" id='pag-nav-prev' style="background: none; border-color: none;">
          <p id="pre-proj" style="cursor:pointer; text-align:right; margin-right: 3em;border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6;"> <a onclick="prevImg()">&#8592;</a></p>
      </div>

      <div class="pag-nav-next" id='pag-nav-nxt' style="background: none; border-color: none;">
          <p id="next-proj" style="cursor:pointer;  margin-left: 3em; border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6;"> <a onclick="nextImg()">&#8594;</a></p>
      </div>

      <div class="project-title" id='project-title' style="background: none; border-color: none; display: none;">
          <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 0em;"><a href="https://www.instagram.com/sublimesintetico/" target="_blank">Forget Her Somehow</a></p>
          <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 3em;">/ May the Queen</p>
      </div>

        <div class="project-text" id='project-text' style="background: none; border-color: none; display: none;">
          <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 0em;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; A decaying ornement and the distorted image of a forgotten book make for May the Queen's first EP cover, evoking the nostalgia & escapism of their sound. This ornament marks my first experimentation with ornamental typography. </p>
      </div>

      <div class="project-details" id='project-details' style="background: none; border-color: none; display: none;">
          <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 3em;  margin-bottom: -1.3em">2025</p>
          <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 3em; margin-bottom: -1.3em">Ornament created entirely with type (Mutlu)</p>
      </div>

      <div class="project-nav-prev" id="project-nav" style="background: none; border-color: none;">
          <p id="pre-proj" style="cursor:pointer; text-align:right; margin-right: 3em;border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6;"> <a onclick="prevProject()">&#8592;</a></p>
      </div>

      <div class="project-nav-next" id="project-nav" style="background: none; border-color: none;">
          <p id="next-proj" style="cursor:pointer;  margin-left: 3em; border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6;"> <a onclick="nextProject()">&#8594;</a></p>
      </div>

      <div class="look-projects" id='ver-mas' style="margin-top: 3em; z-index: 99;">
            <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6"><a onclick="masMenos()">More</a></p>
      </div>

      <div class="look-projects" id='ver-menos' style="margin-top: 3em; z-index: 99; display: none;">
            <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6"><a onclick="masMenos()">The less I know the better</a></p>
      </div>
  `,

//May the Queen (Affiches)
  proj6: `
      <div id="opacity" style="width:100vw; height:100vh; background:rgba(246, 246, 246, 0.5); position:fixed; top:0; left:0; z-index:1;"></div>

      <div class="project-photo" id="project-photo">
          <img src="0media/mtq/affiches/mtqa_0.webp" alt="Affiches Gueule" style="width:auto; height:100%;">
      </div>

      <div class="pag-nav-prev" id='pag-nav-prev' style="grid-area: 4/2/5/3; z-index: 15; background: none; border-color: none;">
          <p id="pre-proj" style="cursor:pointer; text-align:right; margin-right: 3em;border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6;"> <a onclick="prevImg()">&#8592;</a></p>
      </div>

      <div class="pag-nav-next" id='pag-nav-nxt' style="background: none; border-color: none;">
          <p id="next-proj" style="cursor:pointer;  margin-left: 3em; border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6;"> <a onclick="nextImg()">&#8594;</a></p>
      </div>

      <div class="project-title" id="project-title" style="background: none; border-color: none; display: none;">
          <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 0em;">Affiches & Lettrages</p>
          <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 3em;">/ May the Queen</p>
      </div>

      <div class="project-text" id='project-text' style="background: none; border-color: none; display: none;">
            <p id="dynamic-text1" class='contame-todo' style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 0em;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Posters created for May the Queen's opening show for Grand Access Audio at the Truskel Club in Paris. Created with an elegant minimal style, using a single mirrored image and a lettering with Modular Caps made with I & O's only</p>
            <p id="dynamic-text2" class='no-more' style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 0em;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Custom modular typeface created for May the Queen using my own cross pendant. Posters created by <a style='background: none;' href="https://www.instagram.com/kishin.dissolved/" target="_blank">@kishin.dissolved</a></p>
      </div>

      <div class="project-details" id="project-details" style="background: none; border-color: none; display: none;">
          <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 3em;  margin-bottom: -1.3em">2025</p>
          <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 3em; margin-bottom: -1.3em">Ornament created entirely with type (Mutlu)</p>
      </div>

      <div class="project-nav-prev" id="project-nav" style=" background: none; border-color: none;">
          <p id="pre-proj" style="cursor:pointer; text-align:right; margin-right: 3em;border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6;"> <a onclick="prevProject()">&#8592;</a></p>
      </div>

      <div class="project-nav-next" id="project-nav" style="background: none; border-color: none;">
          <p id="next-proj" style="cursor:pointer;  margin-left: 3em; border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6;"> <a onclick="nextProject()">&#8594;</a></p>
      </div>

      <div class="look-projects" id='ver-mas' style="margin-top: 3em; z-index: 99;">
            <p id="ver-mas" style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6"><a onclick="masMenos()">More</a></p>
      </div>

      <div class="look-projects" id='ver-menos' style="margin-top: 3em; z-index: 99; display: none;">
            <p id='ver-mas' style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6"><a onclick="masMenos()">The less I know the better</a></p>
      </div>
    `,

  //Aeterna Absentia
    proj7: `
        <div id="opacity" style="width:100vw; height:100vh; background:rgba(246, 246, 246, 0.5); position:fixed; top:0; left:0; z-index:1;"></div>

        <div class="project-photo" id="project-photo">
          <img src="0media/aeterna-absentia/absentia_0.webp" alt="Aeterna Absentia" style="width:auto; height:100%;">
      </div>

      <div class="pag-nav-prev" id='pag-nav-prev' style="background: none; border-color: none;">
          <p id="pre-proj" style="cursor:pointer; text-align:right; margin-right: 3em;border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6;"> <a onclick="prevImg()">&#8592;</a></p>
      </div>

      <div class="pag-nav-next" id='pag-nav-nxt' style="background: none; border-color: none;">
          <p id="next-proj" style="cursor:pointer;  margin-left: 3em; border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6;"> <a onclick="nextImg()">&#8594;</a></p>
      </div>

      <div class="project-title" id='project-title' style="background: none; border-color: none; display: none;">
          <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 0em;">Aeterna Absentia</p>
          <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 3em;">/ Ornamental Tattoo</p>
      </div>

        <div class="project-text" id='project-text' style="background: none; border-color: none; display: none;">
          <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 0em;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Typographic ornament designer as a tattoo for a friend. Created with individual arabesques, that are then assembled, making it readable. The design was fragmented for the tattoo, allowing it to be smaller, and making it then unreadable.</p>
      </div>

      <div class="project-details" id='project-details' style="background: none; border-color: none; display: none;">
          <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 3em;  margin-bottom: -1.3em">2025</p>
          <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 3em; margin-bottom: -1.3em">Created entirely with type (Mutlu)</p>
          <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 6em; margin-bottom: -1.3em">Tattoed by <a href='https://www.instagram.com/_cronico_/' target='blank'>@_cronico_</a></p>
      </div>

        <div class="project-nav-prev" id="project-nav" style="background: none; border-color: none;">
            <p id="pre-proj" style="cursor:pointer; text-align:right; margin-right: 3em;border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6;"> <a onclick="prevProject()">&#8592;</a></p>
        </div>

        <div class="project-nav-next" id="project-nav" style="background: none; border-color: none;">
            <p id="next-proj" style="cursor:pointer;  margin-left: 3em; border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6;"> <a onclick="nextProject()">&#8594;</a></p>
        </div>

        <div class="look-projects" id='ver-mas' style="margin-top: 3em; z-index: 99;">
            <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6"><a onclick="masMenos()">More</a></p>
      </div>

      <div class="look-projects" id='ver-menos' style="margin-top: 3em; z-index: 99; display: none;">
            <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6"><a onclick="masMenos()">The less I know the better</a></p>
      </div>
    `,

  // Ipomea Festival  
    proj8: `
        <div id="opacity" style="width:100vw; height:100vh; background:rgba(246, 246, 246, 0.5); position:fixed; top:0; left:0; z-index:1;"></div>

        <div class="project-photo" id="project-photo">
          <img src="0media/ipomea/ipomea_0.webp" alt="Ipomea Affiche" style="width:auto; height:100%;">
      </div>

      <div class="pag-nav-prev" id='pag-nav-prev' style="background: none; border-color: none;">
          <p id="pre-proj" style="cursor:pointer; text-align:right; margin-right: 3em;border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6;"> <a onclick="prevImg()">&#8592;</a></p>
      </div>

      <div class="pag-nav-next" id='pag-nav-nxt' style="background: none; border-color: none;">
          <p id="next-proj" style="cursor:pointer;  margin-left: 3em; border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6;"> <a onclick="nextImg()">&#8594;</a></p>
      </div>

      <div class="project-title" id='project-title' style="background: none; border-color: none; display: none;">
          <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 0em;">Ipomea Festival</p>
          <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 3em;">/ Diritti Migrazione Ambiente</p>
      </div>

        <div class="project-text" id='project-text' style="background: none; border-color: none; display: none;">
          <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 0em;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Posters & Letterings created for the Ipomea Festival & Nouch's work. Lettering created from a Karl Blossfeldt photography, referencing the ambiental subjects highlighted.</p>
      </div>

      <div class="project-details" id='project-details' style="background: none; border-color: none; display: none;">
          <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 3em;  margin-bottom: -1.3em">2025</p>
          <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 3em; margin-bottom: -1.3em">Palermo, Italy.</p>
          <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 6em; margin-bottom: -1.3em">Tattoed by <a href='https://www.instagram.com/_cronico_/' target='blank'>@_cronico_</a></p>
      </div>

        <div class="project-nav-prev" id="project-nav" style="background: none; border-color: none;">
            <p id="pre-proj" style="cursor:pointer; text-align:right; margin-right: 3em;border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6;"> <a onclick="prevProject()">&#8592;</a></p>
        </div>

        <div class="project-nav-next" id="project-nav" style="background: none; border-color: none;">
            <p id="next-proj" style="cursor:pointer;  margin-left: 3em; border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6;"> <a onclick="nextProject()">&#8594;</a></p>
        </div>

        <div class="look-projects" id='ver-mas' style="margin-top: 3em; z-index: 99;">
            <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6"><a onclick="masMenos()">More</a></p>
      </div>

      <div class="look-projects" id='ver-menos' style="margin-top: 3em; z-index: 99; display: none;">
            <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6"><a onclick="masMenos()">The less I know the better</a></p>
      </div>
  `,

//Pink Dream (Type)
  proj9: `
    <div id="opacity" style="width:100vw; height:100vh; background:rgba(246, 246, 246, 0.5); position:fixed; top:0; left:0; z-index:1;"></div>
    
    <div class="project-title" style="background: none; border-color: none;">
          <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 0em;">Area Under Construction</p>
      </div>
    
    <div class="project-nav-prev" id="project-nav" style="background: none; border-color: none;">
          <p id="pre-proj" style="cursor:pointer; text-align:right; margin-right: 3em;border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6;"> <a onclick="prevProject()">&#8592;</a></p>
      </div>

      <div class="project-nav-next" id="project-nav" style="background: none; border-color: none;">
          <p id="next-proj" style="cursor:pointer;  margin-left: 3em; border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6;"> <a onclick="nextProject()">&#8594;</a></p>
      </div>
  `,
  /*`
        <div id="opacity" style="width:100vw; height:100vh; background:rgba(246, 246, 246, 0.5); position:fixed; top:0; left:0; z-index:1;"></div>

        <div class="project-nav-prev" id="project-nav" style="background: none; border-color: none;">
            <p id="pre-proj" style="cursor:pointer; text-align:right; margin-right: 3em;border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6;"> <a onclick="prevProject()">&#8592;</a></p>
        </div>

        <div class="project-nav-next" id="project-nav" style="background: none; border-color: none;">
            <p id="next-proj" style="cursor:pointer;  margin-left: 3em; border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6;"> <a onclick="nextProject()">&#8594;</a></p>
        </div>

        <div class="look-projects" id='ver-mas' style="margin-top: 3em; z-index: 99;">
            <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6"><a onclick="masMenos()">More</a></p>
        </div>

        <div class="look-projects" id='ver-menos' style="margin-top: 3em; z-index: 99; display: none;">
                <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6"><a onclick="masMenos()">The less I know the better</a></p>
        </div>
  `,*/

//Pink Dream (Cul-de-sac)
  proj10: `
    <div id="opacity" style="width:100vw; height:100vh; background:rgba(246, 246, 246, 0.5); position:fixed; top:0; left:0; z-index:1;"></div>
    
    <div class="project-title" style="background: none; border-color: none;">
          <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 0em;">Area Under Construction</p>
      </div>
    
    <div class="project-nav-prev" id="project-nav" style="background: none; border-color: none;">
          <p id="pre-proj" style="cursor:pointer; text-align:right; margin-right: 3em;border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6;"> <a onclick="prevProject()">&#8592;</a></p>
      </div>

      <div class="project-nav-next" id="project-nav" style="background: none; border-color: none;">
          <p id="next-proj" style="cursor:pointer;  margin-left: 3em; border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6;"> <a onclick="nextProject()">&#8594;</a></p>
      </div>
  `,
  /*`
    <div id="opacity" style="width:100vw; height:100vh; background:rgba(246, 246, 246, 0.5); position:fixed; top:0; left:0; z-index:1;"></div>

        <div class="project-photo" id="project-photo">
          <img src="0media/pink-dream/mural/pinky_0.webp" alt="Pink Dream Mural" style="width:auto; height:100%;">
      </div>

      <div class="pag-nav-prev" id='pag-nav-prev' style="background: none; border-color: none;">
          <p id="pre-proj" style="cursor:pointer; text-align:right; margin-right: 3em;border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6;"> <a onclick="prevImg()">&#8592;</a></p>
      </div>

      <div class="pag-nav-next" id='pag-nav-nxt' style="background: none; border-color: none;">
          <p id="next-proj" style="cursor:pointer;  margin-left: 3em; border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6;"> <a onclick="nextImg()">&#8594;</a></p>
      </div>

      <div class="project-title" id='project-title' style="background: none; border-color: none; display: none;">
          <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 0em;">Pink Dream</p>
          <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 3em;">Cul-de-Sac (Mural)</p>
      </div>

        <div class="project-text" id='project-text' style="background: none; border-color: none; display: none;">
          <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 0em;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Typographic ornament designer as a tattoo for a friend. Created with individual arabesques, that are then assembled, making it readable. The design was fragmented for the tattoo, allowing it to be smaller, and making it then unreadable.</p>
      </div>

      <div class="project-details" id='project-details' style="background: none; border-color: none; display: none;">
          <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 3em;  margin-bottom: -1.3em">2.3 x 1.7 meters at a 3rd floor</p>
          <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 3em; margin-bottom: -1.3em">Traced & Handcut Stencil</p>
          <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 6em; margin-bottom: -1.3em">Painted using Air-Ink</p>
      </div>

      <div class="project-nav-prev" id="project-nav" style="background: none; border-color: none;">
          <p id="pre-proj" style="cursor:pointer; text-align:right; margin-right: 3em;border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6;"> <a onclick="prevProject()">&#8592;</a></p>
      </div>

      <div class="project-nav-next" id="project-nav" style="background: none; border-color: none;">
          <p id="next-proj" style="cursor:pointer;  margin-left: 3em; border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6;"> <a onclick="nextProject()">&#8594;</a></p>
      </div>

      <div class="look-projects" id='ver-mas' style="margin-top: 3em; z-index: 99;">
            <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6"><a onclick="masMenos()">More</a></p>
      </div>

      <div class="look-projects" id='ver-menos' style="margin-top: 3em; z-index: 99; display: none;">
            <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6"><a onclick="masMenos()">The less I know the better</a></p>
      </div>
  `,*/

//Ave Maria (Type)
  proj11: `
    <div id="opacity" style="width:100vw; height:100vh; background:rgba(246, 246, 246, 0.5); position:fixed; top:0; left:0; z-index:1;"></div>
    
    <div class="project-title" style="background: none; border-color: none;">
          <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 0em;">Area Under Construction</p>
      </div>
    
    <div class="project-nav-prev" id="project-nav" style="background: none; border-color: none;">
          <p id="pre-proj" style="cursor:pointer; text-align:right; margin-right: 3em;border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6;"> <a onclick="prevProject()">&#8592;</a></p>
      </div>

      <div class="project-nav-next" id="project-nav" style="background: none; border-color: none;">
          <p id="next-proj" style="cursor:pointer;  margin-left: 3em; border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6;"> <a onclick="nextProject()">&#8594;</a></p>
      </div>
  `,
  
  /*`
    <div id="opacity" style="width:100vw; height:100vh; background:rgba(246, 246, 246, 0.5); position:fixed; top:0; left:0; z-index:1;"></div>

    <div class="project-photo" id="project-photo">
        <img>
    </div>

    <div class="type-written" style="background:none; border-color: none;">
        <p1 id="type-written" style="font:"Ave Maria"; text-justify: auto; border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 0em;"></p1>
    </div>

    <div class="text-input" id="text-input" style="background: none; border-color: none;">
        <form style="background:none; border-color:none;">
            <div>
                <input type="text" id="input-text" name="texto-written" placeholder="Type some bullshit here" style="border-bottom: 0.5em; font-size: 0.92em; border: solid; border-color: #f6f6f6;outline: none; background: none; color: black; font-family: '', serif;">
            </div>
            
            <div style="justify-content: center; align-items: center; display: flex;">
                <input type="reset" id="reset-text" value="Reset" style="border-bottom: 0.5em; font-size: 0.92em; border: solid; border-color: #f6f6f6; outline: none; background: none; color: black; font-family: '', serif; text-align: center; text-justify: center; cursor: pointer;">
            </div>
        </form>
    </div>

    <div class="project-title" id='project-title' style="background: none; border-color: none; display: none;">
        <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 0em;">Ave Maria Typeface</p>
        <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 3em;  margin-bottom: -1.2em;">Eat my Flesh / Drink my Blood</p>
        <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 3em;">/ Use my Typeface</p>
    </div>

    <div class="project-text" id='project-text' style="background: none; border-color: none; display: none;">
        <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 0em;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Ornamental & blasphemous type, fully developped from  from the carving in a parisian tombstone saying "Ave Mariae". Feel free to download it & use it. </p>
    </div>

    <div class="project-details" id='project-details' style="background: none; border-color: none; display: none;">
        <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 3em;  margin-bottom: -1.3em">2025</p>
        <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 3em; margin-bottom: -1.3em">Ornament created entirely with type (Mutlu)</p>
    </div>

    <div class="project-nav-prev" id="project-nav" style="background: none; border-color: none;">
        <p id="pre-proj" style="cursor:pointer; text-align:right; margin-right: 3em;border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6;"> <a onclick="prevProject()">&#8592;</a></p>
    </div>

    <div class="project-nav-next" id="project-nav" style="background: none; border-color: none;">
        <p id="next-proj" style="cursor:pointer;  margin-left: 3em; border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6;"> <a onclick="nextProject()">&#8594;</a></p>
    </div>

    <div class="look-projects" id='ver-mas' style="margin-top: 3em; z-index: 99;">
            <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6"><a onclick="masMenos()">More</a></p>
      </div>

      <div class="look-projects" id='ver-menos' style="margin-top: 3em; z-index: 99; display: none;">
            <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6"><a onclick="masMenos()">The less I know the better</a></p>
      </div>
  `,*/

  //Memoire
  proj12: `
      <div id="opacity" style="width:100vw; height:100vh; background:rgba(246, 246, 246, 0.5); position:fixed; top:0; left:0; z-index:1;"></div>

      <div class="project-title" id='project-title' style="background-color: none; border-color: none; background: none; display: none;">
          <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 0em;">Les Anges Gris</p>
          <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 3em;">/ La foi populaire en Argentine</p>
      </div>

      <div class="project-photo" id="project-photo">
          <img src="0media/scans-memoire-webp/anges_0.webp" alt="Memoire" style="width:auto; height:100%;">
      </div>

      <div class="pag-nav-prev" id="pag-nav-prev" style="grid-area: 4/2/5/3; z-index: 15; background: none; border-color: none;">
          <p id="pre-proj" style="cursor:pointer; text-align:right; margin-right: 3em;border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6;"> <a onclick="prevImg()">&#8592;</a></p>
      </div>

      <div class="pag-nav-next" id="pag-nav-nxt" style="grid-area: 4/7/5/8; background: none; z-index: 15; border-color: none;">
          <p id="next-proj" style="cursor:pointer;  margin-left: 3em; border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6;"> <a onclick="nextImg()">&#8594;</a></p>
      </div>

      <div class="project-text" id='project-text' style="background-color: none; border-color: none; display: none;">
          <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 0em;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; My mémoire, regarding the Unrecognized Saints of the Argentinian people. An edition in defense of unorganized residual creation. In defense of the takeover of imposed symbols, as the creation of an authentic voice.</p>
      </div>

      <div class="project-details" id='project-details' style="background-color: none; border-color: none; display: none;">
          <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 3em;  margin-bottom: -1.3em">Written & Printed 2026.</p>
          <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 3em; margin-bottom: -1.3em">125x165mm</p>
          <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 6em; margin-bottom: -1.3em">Laser printed on 80g Recycled Paper</p>
          <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 6em; margin-bottom: -1.3em">Hand-sewn</p>
          <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 6em; margin-bottom: -1.3em">Leather cover</p>
      </div>

      <div class="project-nav-prev" id="project-nav" style="background: none; border-color: none;">
          <p id="pre-proj" style="cursor:pointer; text-align:right; margin-right: 3em;border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6;"> <a onclick="prevProject()">&#8592;</a></p>
      </div>

      <div class="project-nav-next" id="project-nav" style="background: none; border-color: none;">
          <p id="next-proj" style="cursor:pointer;  margin-left: 3em; border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6;"> <a onclick="nextProject()">&#8594;</a></p>
      </div>

      <div class="look-projects" id='ver-mas' style="margin-top: 3em; z-index: 99;">
            <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6"><a onclick="masMenos()">More</a></p>
      </div>

      <div class="look-projects" id='ver-menos' style="margin-top: 3em; z-index: 99; display: none;">
            <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6"><a onclick="masMenos()">The less I know the better</a></p>
      </div>
  `,

//Idk Si jamais
  proj13: `
    <div id="opacity" style="width:100vw; height:100vh; background:rgba(246, 246, 246, 0.5); position:fixed; top:0; left:0; z-index:1;"></div>

        <div class="project-photo" id="project-photo">
          <img src="0media/pink-dream/mural/pinky_0.webp" alt="Pink Dream Mural" style="width:auto; height:100%;">
      </div>

      <div class="pag-nav-prev" id='pag-nav-prev' style="background: none; border-color: none;">
          <p id="pre-proj" style="cursor:pointer; text-align:right; margin-right: 3em;border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6;"> <a onclick="prevImg()">&#8592;</a></p>
      </div>

      <div class="pag-nav-next" id='pag-nav-nxt' style="background: none; border-color: none;">
          <p id="next-proj" style="cursor:pointer;  margin-left: 3em; border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6;"> <a onclick="nextImg()">&#8594;</a></p>
      </div>

      <div class="project-title" style="background: none; border-color: none;">
          <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 0em;">Pink Dream</p>
          <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 3em;">Cul-de-Sac (Mural)</p>
      </div>

        <div class="project-text" style="background: none; border-color: none;">
          <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 0em;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Typographic ornament designer as a tattoo for a friend. Created with individual arabesques, that are then assembled, making it readable. The design was fragmented for the tattoo, allowing it to be smaller, and making it then unreadable.</p>
      </div>

      <div class="project-details" style="background: none; border-color: none;">
          <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 3em;  margin-bottom: -1.3em">2.3 x 1.7 meters at a 3rd floor</p>
          <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 3em; margin-bottom: -1.3em">Traced & Handcut Stencil</p>
          <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 6em; margin-bottom: -1.3em">Painted using Air-Ink</p>
      </div>

      <div class="project-nav-prev" id="project-nav" style="background: none; border-color: none;">
          <p id="pre-proj" style="cursor:pointer; text-align:right; margin-right: 3em;border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6;"> <a onclick="prevProject()">&#8592;</a></p>
      </div>

      <div class="project-nav-next" id="project-nav" style="background: none; border-color: none;">
          <p id="next-proj" style="cursor:pointer;  margin-left: 3em; border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6;"> <a onclick="nextProject()">&#8594;</a></p>
      </div>
  `,

  projects: `
        <div class="project-container" style="background:none; border-color: none;">

        <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 0em;">(2026)</p>

        <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 3em; margin-bottom: -1.2em; cursor:pointer;"><a a href="./ornament/trying0.html" target="blank">/ Encrypted Prayers</a></p>

        <p style="border-bottom: 0.5em; border-style: solid; border-color: #f6f6f6; margin-left: 3em; margin-bottom: -1.2em; cursor:pointer;"><a a href="./w2p/index.html" target="blank">/ Colectivo</a></p>
        
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
