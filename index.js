import config from './api-config.js';

const movieContent = document.getElementById('movie-content');
const searchBtn = document.getElementById('search-btn');
const searchField = document.getElementById('search-field');
const favoritesKey = 'favorites';


const isWatchlistPage = document.getElementById('favorites-movie-content') !== null;

const starIcon = isWatchlistPage ? "../Assets/Icon.png" : "Assets/Icon.png";
const addIcon = isWatchlistPage ? "../Assets/add.png" : "Assets/add.png";
const removeIcon = isWatchlistPage ? "../Assets/remove.png" : "Assets/remove.png"


const apiKey = config.OMDB_API_KEY;
const baseURL = `https://www.omdbapi.com/?apikey=${apiKey}&`;


let favoritesArray = JSON.parse(localStorage.getItem(favoritesKey)) || [];


if (!isWatchlistPage && searchBtn) {
    searchBtn.addEventListener('click', handleSearch);
}

// --- Functions ---


async function handleSearch() {
    const query = searchField.value.trim();
    if (!query) return;

    movieContent.innerHTML = '';

    try {
        const res = await fetch(`${baseURL}s=${query}&type=movie`);
        const data = await res.json();

        if (!data.Search) {
            movieContent.innerHTML = "<p class='no-results'>No results found.</p>";
            return;
        }

        // Fetch detailed info for each movie
        const movies = await Promise.all(
            data.Search.map(result =>
                fetch(`${baseURL}i=${result.imdbID}&plot=full`).then(res => res.json())
            )
        );

        movies.forEach(movieData => renderMovieCard(movieData, movieContent));
    } catch (error) {
        console.error("Error fetching movies:", error);
        movieContent.innerHTML = "<p class='no-results'>Something went wrong. Try again.</p>";
    }
}


function renderMovieCard(movieData, container, showWatchlistButton = true) {
    const card = document.createElement('div');
    card.classList.add('movie-card-wrapper');

    card.innerHTML = `
        <div class="movie-card">
            <img src="${movieData.Poster}" class="poster" alt="movie-poster" />
            <div class="movie-text-container">
                <div class="movie-header-text">
                    <h2>${movieData.Title}</h2>
                    <div class='rating-set'>
                        <img src="${starIcon}" alt="star-icon" />
                        <p>${movieData.Ratings?.[0]?.Value || "N/A"}</p>
                    </div>
                </div>
                <div class="secondary-text">
                    <p>${movieData.Runtime}</p>
                    <p>${movieData.Genre}</p>
                    ${showWatchlistButton ? `
                    <div class="watchlist">
                        <img src="${addIcon}" alt="add-image" class="add" />
                        <p>Watchlist</p>
                    </div>` : `
                    <div class="remove">
                        <img src="${removeIcon}" alt="remove-image" class="remove" />
                        <p>Remove</p>
                    </div>`}
                </div>
                <div class="description">
                    <p>${movieData.Plot}</p>
                </div>
            </div>
        </div>
        <hr />`;

   if (showWatchlistButton) {
    const watchlistBtn = card.querySelector('.watchlist');
    const watchlistText = watchlistBtn.querySelector('p'); 
    watchlistBtn.addEventListener('click', () => {
        addToFavorites(movieData);
        watchlistText.textContent = "Added to Watchlist!"; 
    });
} else {
    const removeBtn = card.querySelector('.remove');
    removeBtn.addEventListener('click', () => removeFromFavorites(movieData.imdbID, card));
}
    container.appendChild(card);
}


function addToFavorites(movieData) {
    if (!favoritesArray.some(movie => movie.imdbID === movieData.imdbID)) {
        favoritesArray.push(movieData);
        localStorage.setItem(favoritesKey, JSON.stringify(favoritesArray));
        console.log(`${movieData.Title} added to watchlist!`);
    } else {
        console.log(`${movieData.Title} is already in your watchlist.`);
    }
}


function removeFromFavorites(imdbID, cardElement) {
    favoritesArray = favoritesArray.filter(movie => movie.imdbID !== imdbID);
    localStorage.setItem(favoritesKey, JSON.stringify(favoritesArray));

    if (cardElement) cardElement.remove();
    console.log(`Movie removed from watchlist.`);

    updatePlaceholder();
}


function renderWatchlist() {
    if (!isWatchlistPage) return;

    const watchlistContainer = document.getElementById('favorites-movie-content');
    if (!watchlistContainer) return;

    watchlistContainer.innerHTML = '';

    favoritesArray.forEach(movie => renderMovieCard(movie, watchlistContainer, false));

    updatePlaceholder();
}

function updatePlaceholder() {
    const watchlistContainer = document.getElementById('favorites-movie-content');
    if (!watchlistContainer) return;


    if (favoritesArray.length === 0) {
        watchlistContainer.innerHTML = `
            <div class="watchlist-page-placeholder">
                <img src="../Assets/movieicon.png" alt="placeholder" />
                <p>Your watchlist is looking a little empty...</p>
                <a href="../Index.html" class="watchlist-link">
                    <span><img src="../Assets/add.png" alt="add-icon"></span>
                    Let's add some movies!
                </a>
            </div>`;
    }
}



renderWatchlist();
