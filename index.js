const movieContent = document.getElementById('movie-content')
const searchBtn = document.getElementById('search-btn')

const favoritesArray = []
const apiKey = 'fe69f146'
const baseURL = `https://www.omdbapi.com/?apikey=${apiKey}&`

searchBtn.addEventListener('click', handleClick)
function handleClick() {
    movieContent.innerHTML = ''
    const inputFieldValue = document.getElementById('search-field').value
    
    fetch(`${baseURL}s=${inputFieldValue}&type=movie&plot=full`)
        .then(res => res.json())
        .then(data=>{
            
            const searchArr = data.Search
            

            if (!data.Search) {
            movieContent.innerHTML = "<p>No results found.</p>";
            return;
}
            searchArr.forEach((result) => {
                fetch(`${baseURL}i=${result.imdbID}&type=movie&plot=full`)
                .then(res=>res.json())
                .then(data=>{
                    console.log(data)
                    const resultCard = document.createElement('div')
                    resultCard.innerHTML = 
                    `<div class="movie-card">
                        <img src="${data.Poster}" class="poster" alt="movie-poster" />
                            <div class="movie-text-container">
                                <div class="movie-header-text">
                                    <h2>${data.Title}</h2>
                                <div class='rating-set'>
                                    <img src="./Assets/Icon.png" alt="star-icon" />
                                    <p>${data.Ratings?.[0]?.Value || "N/A"}</p>
                                </div>
                                </div>
                                <div class="secondary-text">
                                    <p>${data.Runtime}</p>
                                    <p>${data.Genre}</p>
                                <div class="watchlist" id='watchlist'>
                                    <img src="./Assets/add.png" alt="add-image" class="add" />
                                    <p>Watchlist</p>
                                </div>
                                </div>
                                <div class="description">
                                    <p>${data.Plot}</p>
                                </div>
                            </div>
                            </div>
                            <hr />`
                    movieContent.append(resultCard)
                })
            })
        })
}