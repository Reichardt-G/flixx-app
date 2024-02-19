const global = {
    currentPage: window.location.pathname,
    search: {
      term: '',
      type: '',
      page: 1,
      totalPages: 1,
      totalResults: 0
    },
    api: {
      apiKey: '27901d4912db7fbefca6a779590901c9',
      apiUrl: 'https://api.themoviedb.org/3/'
    }
};

//Mostrar filmes mais populares
async function displayPopularMovies() {

    const {results} = await fetchAPIData('movie/popular');

    //Remover todos os cards previamente registrados no index
    const parentElement = document.getElementById('popular-movies');
    const elementsToRemove = parentElement.querySelectorAll('.card');

    elementsToRemove.forEach(element => {
        element.parentNode.removeChild(element);
    });
    //Fim

    results.forEach(movie => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
          <a href="movie-details.html?id=${movie.id}">
            ${movie.poster_path
                ? 
                `<img
                src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                class="card-img-top"
                alt="${movie.title}"
                />`
                :
                `<img
                src="../images/no-image.jpg"
                class="card-img-top"
                alt="${movie.title}"
                />`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${movie.release_date}</small>
            </p>
          </div>
        `;
        document.querySelector('#popular-movies').appendChild(div);
    });

}

//Mostrar shows de TV mais populares
async function displayPopularShows() {

    const {results} = await fetchAPIData('tv/popular');

    //Remover todos os cards previamente registrados no index
    const parentElement = document.getElementById('popular-shows');
    const elementsToRemove = parentElement.querySelectorAll('.card');

    elementsToRemove.forEach(element => {
        element.parentNode.removeChild(element);
    });
    //Fim

    results.forEach(show => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
          <a href="tv-details.html?id=${show.id}">
            ${show.poster_path
                ? 
                `<img
                src="https://image.tmdb.org/t/p/w500${show.poster_path}"
                class="card-img-top"
                alt="${show.name}"
                />`
                :
                `<img
                src="../images/no-image.jpg"
                class="card-img-top"
                alt="${show.name}"
                />`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${show.name}</h5>
            <p class="card-text">
              <small class="text-muted">Air Date: ${show.first_air_date}</small>
            </p>
          </div>
        `;
        document.querySelector('#popular-shows').appendChild(div);
    });

}

//Mostrar Detalhes do Filme
async function displayMovieDetails(){
    const movieId = window.location.search.split('=')[1];

    const movie = await fetchAPIData("movie/" + 
        movieId);

    // Overlay for background image
    displayBackgroundImage('movie', movie.backdrop_path);

    const div = document.createElement('div');

    div.innerHTML = `
    <div class="details-top">
    <div>
    ${movie.poster_path
        ? 
        `<img
        src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
        class="card-img-top"
        alt="${movie.title}"
        />`
        :
        `<img
        src="../images/no-image.jpg"
        class="card-img-top"
        alt="${movie.title}"
        />`
    }
    </div>
    <div>
      <h2>${movie.title}</h2>
      <p>
        <i class="fas fa-star text-primary"></i>
        ${movie.vote_average.toFixed(1)} / 10
      </p>
      <p class="text-muted">Release Date: ${movie.release_date}</p>
      <p>
        ${movie.overview}
      </p>
      <h5>Genres</h5>
      <ul class="list-group">
        ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
      </ul>
      <a href="${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
    </div>
  </div>
  <div class="details-bottom">
    <h2>Movie Info</h2>
    <ul>
      <li><span class="text-secondary">Budget:</span> $${addCommasToNumber(movie.budget)}</li>
      <li><span class="text-secondary">Revenue:</span> $${addCommasToNumber(movie.revenue)}</li>
      <li><span class="text-secondary">Runtime:</span> ${movie.runtime} minutes</li>
      <li><span class="text-secondary">Status:</span> ${movie.status}</li>
    </ul>
    <h4>Production Companies</h4>
    <div class="list-group">${movie.production_companies.map((company) => `<span>${company.name}</span>`).join('; ')}</div>
  </div>`;

  document.querySelector('#movie-details').appendChild(div);

}

//Mostrar detalhes do TV-Show
async function displayShowDetails(){
  const showId = window.location.search.split('=')[1];

  const show = await fetchAPIData("tv/" + 
    showId);

  // Overlay for background image
  displayBackgroundImage('tv', show.backdrop_path);

  const div = document.createElement('div');

  div.innerHTML = `
  <div class="details-top">
  <div>
  ${show.poster_path
      ? 
      `<img
      src="https://image.tmdb.org/t/p/w500${show.poster_path}"
      class="card-img-top"
      alt="${show.name}"
      />`
      :
      `<img
      src="../images/no-image.jpg"
      class="card-img-top"
      alt="${show.name}"
      />`
  }
  </div>
  <div>
    <h2>${show.name}</h2>
    <p>
      <i class="fas fa-star text-primary"></i>
      ${show.vote_average.toFixed(1)} / 10
    </p>
    <p class="text-muted">Last Air Date: ${show.last_air_date}</p>
    <p>
      ${show.overview}
    </p>
    <h5>Genres</h5>
    <ul class="list-group">
      ${show.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
    </ul>
    <a href="${show.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
  </div>
</div>
<div class="details-bottom">
  <h2>Show Info</h2>
  <ul>
    <li><span class="text-secondary">Number of Episodes:</span> ${show.number_of_episodes}</li>
    <li><span class="text-secondary">Last Episode to Air:</span> ${show.last_episode_to_air.name}</li>
    <li><span class="text-secondary">Status:</span> ${show.status}</li>
  </ul>
  <h4>Production Companies</h4>
  <div class="list-group">${show.production_companies.map((company) => `<span>${company.name}</span>`).join('; ')}</div>
</div>`;

document.querySelector('#show-details').appendChild(div);

}

//Display Backdrop On Details Pages
function displayBackgroundImage(type, backgroundPath) {
  const overlayDiv = document.createElement('div');
  overlayDiv.style.backgroundImage = 'url(https://image.tmdb.org/t/p/original/' +
    backgroundPath;
  
  overlayDiv.style.backgroundSize = 'cover';
  overlayDiv.style.backgroundPosition = 'center';
  overlayDiv.style.backgroundRepeat = 'no-repeat';
  overlayDiv.style.height = '100vh';
  overlayDiv.style.width = '100vw';
  overlayDiv.style.position = 'absolute';
  overlayDiv.style.top = '0';
  overlayDiv.style.left = '0';
  overlayDiv.style.zIndex = '-1';
  overlayDiv.style.opacity = '0.3';

  if (type === 'movie') {
    document.querySelector('#movie-details').appendChild(overlayDiv);
  } else {
    document.querySelector('#show-details').appendChild(overlayDiv);
  }
}

async function search(){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  global.search.type = urlParams.get('type');
  global.search.term = urlParams.get('search-term');

  if (global.search.term !== '' && global.search.term !== null) {
    //Fazer requisição e mostrar resultados
    const {results, total_pages, page, total_results} = await searchAPIData();
    
    global.search.page = page;
    global.search.totalPages = total_pages;
    global.search.totalResults = total_results;

    if (results.length === 0) {
      showAlert('Nenhum resultado encontrado.', 'error');
      return;
    }

    displaySearchResults(results);

    document.querySelector('#search-term').value = '';

  } else {
    //alert('Por favor, insira um termo de pesquisa!');
    showAlert('Por favor, insira um termo de pesquisa!', 'error');
  }
}

// Mostrar Resultados de pesquisa
function displaySearchResults(results){
  
  //Limpar HUD
  document.querySelector('#search-results').innerHTML = '';
  document.querySelector('#search-results-heading').innerHTML = '';
  document.querySelector('#pagination').innerHTML = '';

  const pagAtual = global.search.page;
  const totalPaginas = global.search.totalPages;
  const totalFilmes = global.search.totalResults;
  const filmesNaPag = results.length;

  //Fim dos resultados
  let fimResults =  20 * global.search.page;
  if (fimResults > totalFilmes) {
    fimResults = totalFilmes;
  } 

  //Início dos resultados
  const iniResults = fimResults - filmesNaPag + 1;

  // console.log("\n\n");
  // console.log("fimResults: " + fimResults);
  // console.log("iniResults: " + iniResults);
  // console.log("totalFilmes: " + totalFilmes);

  showSpinner();

  results.forEach((result) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
      <a href="${global.search.type}-details.html?id=${result.id}">
        ${result.poster_path
            ? 
            `<img
            src="https://image.tmdb.org/t/p/w500${result.poster_path}"
            class="card-img-top"
            alt="${global.search.type === 'movie' ?
              result.title : result.name}"
            />`
            :
            `<img
            src="../images/no-image.jpg"
            class="card-img-top"
            alt="${global.search.type === 'movie' ?
            result.title : result.name}"
            />`
        }
      </a>
      <div class="card-body">
        <h5 class="card-title">${global.search.type === 'movie' ?
        result.title : result.name}</h5>
        <p class="card-text">
          <small class="text-muted">Release: ${global.search.type === 'movie' ? 
            result.release_date : result.first_air_date}</small>
        </p>
      </div>
    `;

    document.querySelector('#search-results-heading').innerHTML = `
        <h2>Mostrando resultados para "${global.search.term}"</h2>
        <h2>(Mostrando ${iniResults} a ${fimResults} de ${global.search.totalResults})</h2>
    `;

    document.querySelector('#search-results').appendChild(div);
  });
  
  displayPagination();
}

// Criar e mostrar paginação para pesquisa
function displayPagination(){
  const div = document.createElement('div');
  div.classList.add('pagination');

  div.innerHTML = `
    <button class="btn btn-primary" id="prev">Anterior</button>
    <button class="btn btn-primary" id="next">Próxima</button>
    <div class="page-counter">
      Página ${global.search.page} de ${global.search.totalPages}</div>   
  `;

  document.querySelector('#pagination').appendChild(div);

  // Desabilitar botão 'Anterior' na página 1
  if (global.search.page === 1) {
    const elementToRemove = document.getElementById('prev');

    if (elementToRemove) {
      const parent = elementToRemove.parentNode;
      parent.removeChild(elementToRemove);
    }
  }

  // // Desabilitar botão 'Anterior' : forma alternativa
  // if (global.search.page === 1 && document.getElementById('prev')) {
  //   document.getElementById('prev').parentNode.
  //     removeChild(document.getElementById('prev'));
  // }

  // Desabilitar botão 'Próxima' na última página
  if (global.search.page === global.search.totalPages) {
    const elementToRemove = document.getElementById('next');

    if (elementToRemove) {
      const parent = elementToRemove.parentNode;
      parent.removeChild(elementToRemove);
    }
  }

  // // Próxima página
  // document.querySelector('#next').addEventListener('click', async() => 
  // {
  //   global.search.page++;
  //   const {results, total_pages} = await searchAPIData();
  //   displaySearchResults(results);
  // });
  if (document.querySelector('#next')) {
    document.querySelector('#next').addEventListener('click',btnProxPag);
  }

  // Página anterior
  if (document.querySelector('#prev')) {
    document.querySelector('#prev').addEventListener('click',btnAntPag);
  }

  hideSpinner();

}

// Botão página anterior
async function btnAntPag() {

  showSpinner();

  if (global.search.page > 1) {
    global.search.page--;
    const {results, total_pages} = await searchAPIData();
    displaySearchResults(results);
  } else {
    showAlert('Não há página anterior!','error');
  }

  hideSpinner;
}

// Botão próxima página
async function btnProxPag() {

  showSpinner();

  if (global.search.page < global.search.totalPages) {
    global.search.page++;
    const {results, total_pages} = await searchAPIData();
    displaySearchResults(results);
  } else {
    showAlert('Não há próxima página!', 'error');
  }

  hideSpinner();

}

// Mostrar slider de filmes
async function displaySlider() {
  const {results} = await fetchAPIData('movie/now_playing');

  results.forEach((movie) => {
    const div = document.createElement('div');
    div.classList.add('swiper-slide');

    div.innerHTML =  `
    <a href="movie-details.html?id=${movie.id}">
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" 
      alt="${movie.title}" />
    </a>
    <h4 class="swiper-rating">
      <i class="fas fa-star text-secondary"></i> ${movie.vote_average} / 10
    </h4> 
    `
    ;

    document.querySelector('.swiper-wrapper').appendChild(div);

    initSwiper();
  });
}

// Inicializar Swiper
function initSwiper() {
  const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false
    },
    breakpoints: {
      500: {slidesPerView: 2},
      700: {slidesPerView: 3},
      1200: {slidesPerView: 4}
    },
  });
}

// Buscar dados de TMDB API
async function fetchAPIData(endpoint) {
    //const Token_Leitura_API = eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNzkwMWQ0OTEyZGI3ZmJlZmNhNmE3Nzk1OTA5MDFjOSIsInN1YiI6IjY1Y2NjNDFjZTIxMDIzMDE4NWMzZWU2YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nJyoE8P8az9IAJpcpfo80bb21YPHJVrN4Ve-8NaiOaQ;
    //const API_KEY = '3fd2be6f0c70a2a598f084ddfb75487c' // Brad Traversy;
    const API_KEY = global.api.apiKey;
    const API_URL = global.api.apiUrl;

    showSpinner();

    const response = await fetch(API_URL +
        endpoint +
        '?api_key=' +
        API_KEY +
        '&language=en-US');
    
    const data = await response.json();

    hideSpinner();

    return data;
}

// Fazer request para Search API Data - mecanismo de pesquisa
async function searchAPIData() {
  const API_KEY = global.api.apiKey;
  const API_URL = global.api.apiUrl;

  showSpinner();

  const response = await fetch(API_URL +
      'search/' +
      global.search.type +
      '?api_key=' +
      API_KEY +
      '&language=en-US&query=' +
      global.search.term +
      '&page=' +
      global.search.page);
  
  const data = await response.json();

  hideSpinner();

  return data;
}

function showSpinner() {
    document.querySelector('.spinner').classList.add('show');
}

function hideSpinner() {
    document.querySelector('.spinner').classList.remove('show');
}

//Highlight active link
function highlightActiveLink() {
    const links = document.querySelectorAll('.nav-link');
    links.forEach((link) => {
        if (link.getAttribute('href') === global.currentPage) {
            link.classList.add('active');
        }
    });
}

function addCommasToNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Show Alert
function showAlert(message, className) {
  const alertEl = document.createElement('div');
  alertEl.classList.add('alert', className);
  alertEl.appendChild(document.createTextNode(message));
  document.querySelector('#alert').appendChild(alertEl);

  setTimeout(() => alertEl.remove(), 3000);
}

//Init App
function init() {
    showSpinner();
    switch (global.currentPage) {
        case '/':
        case '/index.html':
            console.log('Home Page / Popular Movies');
            displaySlider();
            displayPopularMovies();
            break;
        case '/shows.html':
            console.log('Shows');
            displayPopularShows();
            break;
        case '/movie-details.html':
            console.log('Movie Details');
            displayMovieDetails();
            break;
        case '/tv-details.html':
            console.log('TV-Show Details');
            displayShowDetails();
            break;
        case '/search.html':
            console.log('Search');
            search();
            break;
        default:
            console.log('Situação não definida');
            alert('Problemas!');
            break;
    }
    highlightActiveLink();
    hideSpinner();
}

document.addEventListener('DOMContentLoaded', init);