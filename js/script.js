const global = {
    currentPage: window.location.pathname
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

//Fetch data from TMDB API
async function fetchAPIData(endpoint) {
    //const Token_Leitura_API = eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNzkwMWQ0OTEyZGI3ZmJlZmNhNmE3Nzk1OTA5MDFjOSIsInN1YiI6IjY1Y2NjNDFjZTIxMDIzMDE4NWMzZWU2YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nJyoE8P8az9IAJpcpfo80bb21YPHJVrN4Ve-8NaiOaQ;
    //const API_KEY = '3fd2be6f0c70a2a598f084ddfb75487c' // Brad Traversy;
    const API_KEY = '27901d4912db7fbefca6a779590901c9';
    const API_URL = 'https://api.themoviedb.org/3/';

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