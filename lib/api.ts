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
    const response = await fetch(`${API_BASE_URL}/media`, {
      cache: 'no-store'
    });
    if (!response.ok) {
      throw new Error('Failed to fetch media');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching all media:', error);
    return [];
  }
}

export async function getMediaById(id: string | number): Promise<Media | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/media/${id}`, {
      cache: 'no-store'
    });
    if (!response.ok) {
      throw new Error('Failed to fetch media');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching media by ID:', error);
    return null;
  }
}

export async function searchMedia(query: string): Promise<Media[]> {
  try {
    if (!query.trim()) return [];
    
    const response = await fetch(`${API_BASE_URL}/search?q=${encodeURIComponent(query)}`, {
      cache: 'no-store'
    });
    if (!response.ok) {
      throw new Error('Failed to search media');
    }
    return await response.json();
  } catch (error) {
    console.error('Error searching media:', error);
    return [];
  }
}
