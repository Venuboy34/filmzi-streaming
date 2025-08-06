const API_BASE_URL = 'https://v0-flask-movie-database-nine.vercel.app';

export interface Media {
  id: number;
  type: 'movie' | 'tv';
  title: string;
  description: string;
  poster_url: string;
  release_date: string;
  language: string;
  tmdb_id: number;
  video_links?: {
    [key: string]: string;
  };
  total_seasons?: number;
  seasons?: {
    [key: string]: {
      season_number: number;
      total_episodes: number;
      episodes: Array<{
        episode_number: number;
        video_720p: string;
      }>;
    };
  };
}

export async function getAllMedia(): Promise<Media[]> {
  try {
    console.log('🎬 Fetching media from API...');
    
    const response = await fetch(`${API_BASE_URL}/media`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('✅ Successfully loaded', data.length, 'movies and shows');
    
    // Sort by ID descending to show newest first
    return data.sort((a: Media, b: Media) => b.id - a.id);
    
  } catch (error) {
    console.error('❌ API Error:', error);
    
    // Return empty array on error - the UI will handle the empty state
    return [];
  }
}

export async function getMediaById(id: string | number): Promise<Media | null> {
  try {
    console.log('🔍 Fetching media ID:', id);
    
    const response = await fetch(`${API_BASE_URL}/media/${id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    });
    
    if (!response.ok) {
      console.error('❌ Media not found:', response.status);
      return null;
    }
    
    const data = await response.json();
    console.log('✅ Loaded:', data.title);
    
    return data;
    
  } catch (error) {
    console.error('❌ Error fetching media:', error);
    return null;
  }
}

export async function searchMedia(query: string): Promise<Media[]> {
  try {
    if (!query.trim()) return [];
    
    console.log('🔎 Searching for:', query);
    
    const response = await fetch(`${API_BASE_URL}/search?q=${encodeURIComponent(query)}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    });
    
    if (!response.ok) {
      console.error('❌ Search failed:', response.status);
      return [];
    }
    
    const data = await response.json();
    console.log('✅ Found', data.length, 'results');
    
    return data;
    
  } catch (error) {
    console.error('❌ Search error:', error);
    return [];
  }
}
