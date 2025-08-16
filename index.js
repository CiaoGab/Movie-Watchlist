// --- Constants & Local Storage Key ---
const favoritesKey = 'favorites';

// --- DOM Elements (conditionally) ---
const movieContent = document.getElementById('movie-content');
const searchBtn = document.getElementById('search-btn');
const searchField = document.getElementById('search-field');
const watchlistContainer = document.getElementById('favorites-movie-content');

// --- API Setup ---
const apiKey = 'fe69f146';
const baseURL = `https://www.omdbapi.com/?apikey=${apiKey}&`;

// --- Load favorites from localStorage safely ---
let favoritesArray = [];
try {
    const storedFavorites = JSON.parse(localStorage.getItem(favoritesKey));
    if (Array.isArray(storedFavorites)) favoritesArray = storedFavorites;
} catch (err) {
    console.warn('Could not parse favorites from localStorage', err);
}

// --- Event Listeners (only if on home page) ---
if (searchBtn && searchField && movieContent) {
    searchBtn.addEventListener('click', handleSearch);
}

// --- Functions ---

// Fetch movies by search term
async function handleSearch() {
    const query = searchField.value.trim();
    if (!query) return;

    movieContent.innerHTML = '';

    try {
        const res = await fetch(`${baseURL}s=${encodeURIComponent(query)}&type=movie`);
        const data = await res.json();

        if (!data.Search) {
            movieContent.innerHTML = "<p class='no-results'>No results found.</p>";
            return;
        }

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

// Render a movie card
function renderMovieCard(movieData, container, showWatchlistButton = true) {
    if (!container || !movieData) return;

    const card = document.createElement('div');
    card.classList.add('movie-card-wrapper');

    card.innerHTML = `
        <div class="movie-card">
            <img src="${movieData.Poster !== 'N/A' ? movieData.Poster : 'Assets/movieicon.png'}" class="poster" alt="movie-poster" />
            <div class="movie-text-container">
                <div class="movie-header-text">
                    <h2>${movieData.Title}</h2>
                    <div class='rating-set'>
                        <img src="/Assets/Icon.png" alt="star-icon" />
                        <p>${movieData.Ratings?.[0]?.Value || "N/A"}</p>
                    </div>
                </div>
                <div class="secondary-text">
                    <p>${movieData.Runtime || 'N/A'}</p>
                    <p>${movieData.Genre || 'N/A'}</p>
                    ${showWatchlistButton ? `
                    <div class="watchlist">
                        <img src="Assets/add.png" alt="add-image" class="add" />
                        <p>Watchlist</p>
                    </div>` : ''}
                </div>
                <div class="description">
                    <p>${movieData.Plot || 'No description available.'}</p>
                </div>
            </div>
        </div>
        <hr />`;

    if (showWatchlistButton) {
        const watchlistBtn = card.querySelector('.watchlist');
        if (watchlistBtn) {
            watchlistBtn.addEventListener('click', () => addToFavorites(movieData));
        }
    }

    container.appendChild(card);
}

// Add movie to favorites
function addToFavorites(movieData) {
    if (!movieData) return;

    if (!favoritesArray.some(movie => movie.imdbID === movieData.imdbID)) {
        favoritesArray.push(movieData);
        localStorage.setItem(favoritesKey, JSON.stringify(favoritesArray));
        console.log(`${movieData.Title} added to watchlist!`);
    } else {
        console.log(`${movieData.Title} is already in your watchlist.`);
    }
}

// Render watchlist page
function renderWatchlist() {
    if (!watchlistContainer) return;

    watchlistContainer.innerHTML = '';

    if (favoritesArray.length === 0) {
        watchlistContainer.innerHTML = `
            <div class="watchlist-page-placeholder">
                <img src="/Assets/movieicon.png" alt="">
                <p>Your watchlist is looking a little empty...</p>
                <a href="/Index.html" class="watchlist-link">
                    <span><img src="/Assets/add.png" alt=""></span>Let's add some movies!
                </a>
            </div>
        `;
        return;
    }

    favoritesArray.forEach(movie => renderMovieCard(movie, watchlistContainer, false));
}

// --- Initialize ---
renderWatchlist();
