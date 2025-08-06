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
    
    // Simple fetch like your bot
    const response = await fetch(`${API_BASE_URL}/media`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
    });
    
    console.log('📡 Response status:', response.status);
    
    if (response.status === 200) {
      const data = await response.json();
      console.log('✅ Successfully loaded', data.length, 'items');
      
      // Sort by ID descending (newest first) like your bot
      return data.sort((a: Media, b: Media) => b.id - a.id);
    }
    
    console.error('❌ API Error:', response.status, response.statusText);
    return [];
    
  } catch (error) {
    console.error('💥 API Error:', error);
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
      }
    });
    
    if (response.status === 200) {
      const data = await response.json();
      console.log('✅ Loaded:', data.title);
      return data;
    }
    
    console.error('❌ Media not found:', response.status);
    return null;
    
  } catch (error) {
    console.error('💥 Error fetching media:', error);
    return null;
  }
}

export async function searchMedia(query: string): Promise<Media[]> {
  try {
    if (!query.trim()) return [];
    
    console.log('🔎 Searching for:', query);
    
    // Use the same search approach as your bot
    const response = await fetch(`${API_BASE_URL}/search?q=${encodeURIComponent(query.trim())}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
    });
    
    if (response.status === 200) {
      const data = await response.json();
      console.log('✅ Found', data.length, 'results');
      return Array.isArray(data) ? data : [];
    }
    
    console.error('❌ Search failed:', response.status);
    return [];
    
  } catch (error) {
    console.error('💥 Search error:', error);
    return [];
  }
}
