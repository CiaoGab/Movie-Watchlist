# Movie Watchlist

A responsive web application that allows users to search for movies and add them to their watchlist. Built with vanilla JavaScript, HTML, and CSS, this project utilizes the OMDB API to fetch movie information and provide a clean, user-friendly interface for managing your movie watchlist.

![Movie Watchlist Screenshot](./Assets/Screenshot%202025-08-15%20212917.png)

## Features

- **Movie Search**: Search for movies using the OMDB API
- **Responsive Design**: Fully responsive layout that works on desktop and mobile devices (down to 375px)
- **Movie Details**: View comprehensive movie information including:
  - Title
  - Rating
  - Runtime
  - Genre
  - Plot summary
- **Interactive Elements**:
  - Read More/Less functionality for long plot descriptions
  - Add to Watchlist feature
  - Responsive image handling with proper aspect ratios

## Technical Details

- **API Integration**: Uses the OMDB API for movie data
- **Responsive Images**: Maintains 4:6 aspect ratio for movie posters
- **Mobile-First Design**: Optimized for various screen sizes:
  - Desktop layout
  - Tablet layout (768px)
  - Mobile layout (375px)
- **Modern CSS Features**:
  - Flexbox for layout
  - Media queries for responsiveness
  - CSS transitions for smooth interactions

## Getting Started

1. Clone the repository
2. **Set up your API key**:
   - Open `index.js` and replace `'fe69f146'` with your actual OMDB API key
   - Get a free API key from [OMDB API](http://www.omdbapi.com/apikey.aspx)
   - **Note**: For public repositories, consider using a public API key or implementing proper environment variable handling
3. Open `index.html` in your browser
4. Start searching for movies!

## Deployment

This project is configured for GitHub Pages deployment. The main entry point is `index.html` (lowercase) to ensure compatibility with GitHub Pages hosting.

## Security Notes

### API Key Security
- **Public Repositories**: If your repository is public, be aware that your API key will be visible in the code
- **Private Repositories**: Safe to use with private repositories
- **Production**: For production applications, consider implementing proper environment variable handling
- **OMDB API**: The OMDB API used here is free and designed for public use, but monitor your usage

### Best Practices
- Regularly rotate your API keys
- Monitor API usage to prevent abuse
- Consider rate limiting for production applications

## Built With

- HTML5
- CSS3
- JavaScript
- OMDB API

## Project Structure

```
Movie-Watchlist/
│
├── index.html          # Main application page
├── index.js            # JavaScript functionality
├── styles.css          # Main stylesheet
├── Pages/
│   └── Watchlist.html  # Watchlist page
│
└── Assets/
    ├── add.png
    ├── remove.png
    ├── Icon.png
    ├── movieicon.png
    ├── search-icon-2-614x460.png
    └── ... (other assets)
```

## Recent Updates & Refactoring

### GitHub Pages Compatibility (Latest)
- **Fixed 404 errors** by renaming `Index.html` to `index.html` for proper case sensitivity
- **Refactored asset paths** from absolute (`/Assets/`) to relative (`Assets/`) for proper GitHub Pages deployment
- **Updated navigation links** between pages to use correct relative paths
- **Standardized file structure** for better hosting compatibility

### Code Quality Improvements
- **Cleaner file organization** with dedicated `Pages/` directory for secondary HTML files
- **Consistent path references** throughout the application
- **Improved maintainability** with proper relative path structure

### Security Improvements
- **API key protection** with clear documentation for secure deployment
- **Simplified module system** for better GitHub Pages compatibility
- **Security best practices** documented for different deployment scenarios

## Contributing

Feel free to fork this project and submit pull requests for any improvements!

