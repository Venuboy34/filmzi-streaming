# 🚀 Filmzi Deployment Guide - Cloudflare Pages

## Prerequisites

1. **Node.js** (v18 or higher)
2. **Cloudflare Account** (free tier works)
3. **Git** repository

## 📁 Project Structure

```
filmzi-streaming/
├── components/
│   ├── Layout.tsx
│   ├── MediaCard.tsx
│   └── VideoPlayer.tsx
├── lib/
│   └── api.ts
├── pages/
│   ├── _app.tsx
│   ├── _document.tsx
│   ├── index.tsx
│   ├── search.tsx
│   ├── media/
│   │   └── [id].tsx
│   └── stream/
│       ├── movie/
│       │   └── [id].tsx
│       └── episode/
│           └── [id].tsx
├── styles/
│   └── globals.css
├── functions/
│   └── _headers
├── package.json
├── next.config.js
├── tailwind.config.js
├── wrangler.toml
└── .gitignore
```

## 🛠️ Installation Steps

### 1. Clone and Setup

```bash
# Create project directory
mkdir filmzi-streaming
cd filmzi-streaming

# Initialize package.json and install dependencies
npm init -y
npm install next@14.0.4 react@^18 react-dom@^18 plyr@^3.7.8
npm install -D @next/eslint-config-next@14.0.4 @types/node@^20 @types/react@^18 @types/react-dom@^18 autoprefixer@^10.0.1 eslint@^8 postcss@^8 tailwindcss@^3.3.0 typescript@^5

# Initialize Tailwind CSS
npx tailwindcss init -p
```

### 2. Create All Files

Copy all the configuration files and components from the provided code.

### 3. Build the Project

```bash
# Build the static site
npm run build
```

## ☁️ Cloudflare Pages Deployment

### Method 1: Git Integration (Recommended)

1. **Push to Git Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Filmzi streaming site"
   git branch -M main
   git remote add origin YOUR_REPO_URL
   git push -u origin main
   ```

2. **Connect to Cloudflare Pages**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
   - Navigate to **Pages** → **Create a project**
   - Select **Connect to Git**
   - Choose your repository
   - Configure build settings:
     - **Framework preset**: `Next.js (Static HTML Export)`
     - **Build command**: `npm run build`
     - **Build output directory**: `out`
     - **Root directory**: `/` (leave empty)

3. **Environment Variables** (if needed)
   - No environment variables required for this setup
   - API calls go directly to the external Flask API

4. **Deploy**
   - Click **Save and Deploy**
   - Your site will be available at `https://your-project.pages.dev`

### Method 2: Direct Upload

1. **Build Locally**
   ```bash
   npm run build
   ```

2. **Upload via Dashboard**
   - Go to Cloudflare Pages
   - Create project → **Direct upload**
   - Upload the entire `out` folder
   - Deploy

### Method 3: Wrangler CLI

1. **Install Wrangler**
   ```bash
   npm install -g wrangler
   ```

2. **Login to Cloudflare**
   ```bash
   wrangler login
   ```

3. **Deploy**
   ```bash
   npm run build
   wrangler pages publish out --project-name=filmzi-streaming
   ```

## 🔧 Configuration Details

### Build Settings for Cloudflare Pages

- **Framework**: Next.js (Static HTML Export)
- **Build command**: `npm run build`
- **Build output directory**: `out`
- **Node.js version**: 18.x or higher

### Custom Domain Setup

1. In Cloudflare Pages dashboard
2. Go to your project → **Custom domains**
3. Add your domain (e.g., `filmzi.com`)
4. Follow DNS configuration instructions

### Performance Optimizations

1. **Caching Headers** - Already configured in `functions/_headers`
2. **Image Optimization** - Using Next.js Image component
3. **Static Generation** - All pages are pre-generated
4. **CDN Distribution** - Cloudflare's global network

## 🎬 Features Included

✅ **Homepage** - Display all movies/TV shows  
✅ **Search Page** - Search functionality  
✅ **Media Details** - Individual movie/show pages  
✅ **Movie Streaming** - Quality selection (720p, 1080p)  
✅ **TV Series Streaming** - Season/episode navigation  
✅ **Video Player** - Plyr.io integration  
✅ **Responsive Design** - Mobile-friendly  
✅ **SEO Optimized** - Meta tags and structured data  
✅ **Fast Loading** - Static generation  

## 🌐 API Integration

The site connects to: `https://v0-flask-movie-database-nine.vercel.app`

**Endpoints used:**
- `GET /media` - All media
- `GET /media/:id` - Single media item
- `GET /search?q=query` - Search media

## 📱 Mobile Optimization

- Responsive grid layouts
- Touch-friendly navigation
- Optimized video player
- Fast loading on mobile networks

## 🔒 Security Features

- Content Security Policy headers
- XSS protection
- Frame options security
- CORS handling

## 🚀 Go Live Checklist

- [ ] All files created and configured
- [ ] Build runs successfully (`npm run build`)
- [ ] Git repository created and pushed
- [ ] Cloudflare Pages project connected
- [ ] Build settings configured correctly
- [ ] Custom domain added (optional)
- [ ] Site tested on multiple devices
- [ ] Video streaming works properly

## 🎯 Post-Deployment

1. **Test all functionality**:
   - Homepage loads
   - Search works
   - Movies stream properly
   - TV episodes play correctly
   - Mobile responsive

2. **Monitor performance**:
   - Use Cloudflare Analytics
   - Check Core Web Vitals
   - Monitor video loading times

3. **Updates**:
   - Push changes to Git
   - Auto-deployment will trigger
   - Changes live in ~1-2 minutes

##
