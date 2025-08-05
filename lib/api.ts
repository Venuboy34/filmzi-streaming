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
    console.log('Fetching all media from:', `${API_BASE_URL}/media`);
    const response = await fetch(`${API_BASE_URL}/media`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    });
    
    console.log('Response status:', response.status);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Fetched media count:', data.length);
    return data;
  } catch (error) {
    console.error('Error fetching all media:', error);
    // Return mock data if API fails
    return getMockData();
  }
}

export async function getMediaById(id: string | number): Promise<Media | null> {
  try {
    console.log('Fetching media by ID:', id);
    const response = await fetch(`${API_BASE_URL}/media/${id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Fetched media:', data.title);
    return data;
  } catch (error) {
    console.error('Error fetching media by ID:', error);
    return null;
  }
}

export async function searchMedia(query: string): Promise<Media[]> {
  try {
    if (!query.trim()) return [];
    
    console.log('Searching for:', query);
    const response = await fetch(`${API_BASE_URL}/search?q=${encodeURIComponent(query)}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Search results count:', data.length);
    return data;
  } catch (error) {
    console.error('Error searching media:', error);
    return [];
  }
}

// Mock data fallback
function getMockData(): Media[] {
  return [
    {
      id: 1,
      type: 'movie',
      title: 'Sample Movie',
      description: 'This is a sample movie while we connect to the API.',
      poster_url: 'https://via.placeholder.com/500x750/1f2937/00ff00?text=Movie',
      release_date: '2024-01-01',
      language: 'en',
      tmdb_id: 1,
      video_links: {
        '720p': 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
        '1080p': 'https://sample-videos.com/zip/10/mp4/SampleVideo_1920x1080_2mb.mp4'
      }
    },
    {
      id: 2,
      type: 'tv',
      title: 'Sample TV Series',
      description: 'This is a sample TV series while we connect to the API.',
      poster_url: 'https://via.placeholder.com/500x750/1f2937/00ff00?text=TV+Series',
      release_date: '2024-01-01',
      language: 'en',
      tmdb_id: 2,
      total_seasons: 1,
      seasons: {
        'season_1': {
          season_number: 1,
          total_episodes: 2,
          episodes: [
            {
              episode_number: 1,
              video_720p: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4'
            },
            {
              episode_number: 2,
              video_720p: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4'
            }
          ]
        }
      }
    }
  ];
}
