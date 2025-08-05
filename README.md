# 🎬 Filmzi - Movie & TV Series Streaming Platform

A modern, responsive streaming platform built with Next.js and deployed on Cloudflare Pages.

![Filmzi](https://envs.sh/E9r.jpg)

## ✨ Features

- 🎥 **Movie Streaming** - Multiple quality options (720p, 1080p)
- 📺 **TV Series** - Season and episode navigation
- 🔍 **Advanced Search** - Find your favorite content quickly
- 📱 **Responsive Design** - Perfect on all devices
- ⚡ **Fast Loading** - Static generation with Cloudflare CDN
- 🎨 **Modern UI** - Dark theme with green accents
- 🔗 **Direct Links** - Share specific movies/episodes
- 📥 **Download Options** - Direct download links

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Video Player**: Plyr.io
- **Deployment**: Cloudflare Pages
- **API**: External Flask Movie Database

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd filmzi-streaming
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
filmzi-streaming/
├── components/           # React components
│   ├── Layout.tsx       # Main layout wrapper
│   ├── MediaCard.tsx    # Movie/TV show cards
│   └── VideoPlayer.tsx  # Video player component
├── lib/                 # Utility functions
│   └── api.ts          # API service functions
├── pages/              # Next.js pages
│   ├── index.tsx       # Homepage
│   ├── search.tsx      # Search page
│   ├── media/          # Media detail pages
│   └── stream/         # Streaming pages
├── styles/             # CSS styles
│   └── globals.css     # Global styles
└── functions/          # Cloudflare Functions
    └── _headers        # HTTP headers
```

## 🎯 Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage with all media |
| `/search?q=query` | Search results |
| `/media/[id]` | Movie/TV show details |
| `/stream/movie/[id]?quality=720p` | Movie streaming |
| `/stream/episode/[id]?season=1&episode=1` | TV episode streaming |

## 🔌 API Integration

The platform integrates with a Flask Movie Database API:

- **Base URL**: `https://v0-flask-movie-database-nine.vercel.app`
- **Get All Media**: `GET /media`
- **Get Single Media**: `GET /media/:id`
- **Search**: `GET /search?q=query`

### API Response Format

**Movie**:
```json
{
  "id": 2,
  "type": "movie",
  "title": "The Matrix",
  "description": "...",
  "poster_url": "https://image.tmdb.org/t/p/w500/...",
  "release_date": "1999-03-30",
  "language": "en",
  "video_links": {
    "720p": "https://example.com/matrix_720p.mp4",
    "1080p": "https://example.com/matrix_1080p.mp4"
  }
}
```

**TV Series**:
```json
{
  "id": 1,
  "type": "tv",
  "title": "Breaking Bad",
  "total_seasons": 2,
  "seasons": {
    "season_1": {
      "season_number": 1,
      "total_episodes": 3,
      "episodes": [
        {
          "episode_number": 1,
          "video_720p": "https://example.com/episode.mp4"
        }
      ]
    }
  }
}
```

## 🎨 Design System

### Colors
- **Primary**: Green (#00ff00)
- **Background**: Black (#000000)
- **Cards**: Dark Gray (#1f2937)
- **Text**: White (#ffffff)
- **Secondary Text**: Gray (#9ca3af)

### Components
- **Buttons**: Green primary, gray secondary
- **Cards**: Hover effects with green accents
- **Player**: Custom Plyr theme
- **Navigation**: Sticky header with logo

## 📱 Responsive Design

- **Mobile**: 2-column grid, touch-friendly
- **Tablet**: 3-column grid, optimized spacing
- **Desktop**: 4-5 column grid, full features
- **Video Player**: Adaptive sizing

## ⚡ Performance

- **Static Generation**: All pages pre-built
- **Image Optimization**: Next.js Image component
- **CDN**: Cloudflare global network
- **Caching**: Aggressive caching headers
- **Bundle Size**: Optimized with tree shaking

## 🔒 Security

- **CSP Headers**: Content Security Policy
- **XSS Protection**: Built-in Next.js protection
- **HTTPS**: Forced SSL on Cloudflare
- **CORS**: Proper cross-origin handling

## 🚀 Deployment

### Cloudflare Pages

1. **Connect Git Repository**
   - Framework: Next.js (Static HTML Export)
   - Build command: `npm run build`
   - Output directory: `out`

2. **Environment Variables** (none required)

3. **Custom Domain** (optional)
   - Add domain in Pages dashboard
   - Configure DNS settings

### Build Settings
```yaml
Build command: npm run build
Output directory: out
Root directory: /
Node.js version: 18.x
```

## 📊 Analytics & Monitoring

- **Cloudflare Analytics**: Built-in traffic analytics
- **Core Web Vitals**: Performance monitoring
- **Error Tracking**: Console error logging
- **API Monitoring**: External API health checks

## 🔧 Configuration

### Environment Variables
```env
# No environment variables required
# API endpoint is hardcoded in lib/api.ts
```

### Build Configuration
```javascript
// next.config.js
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true }
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🔗 Links

- **Live Site**: [Your Cloudflare Pages URL]
- **Telegram**: https://t.me/filmzi2
- **API Documentation**: [API Endpoint Documentation]

## 🆘 Support

For support and questions:
- Join our Telegram: https://t.me/filmzi2
- Create an issue on GitHub
- Check the deployment guide

---

**© 2025 Filmzi — All Rights Reserved**
