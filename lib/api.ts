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
    console.log('🎬 Fetching all media from:', `${API_BASE_URL}/media`);
    
    const response = await fetch(`${API_BASE_URL}/media`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
      mode: 'cors',
      cache: 'no-store'
    });
    
    console.log('📡 API Response status:', response.status);
    console.log('📡 API Response headers:', response.headers);
    
    if (!response.ok) {
      console.error('❌ API Error:', response.status, response.statusText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('✅ Successfully fetched media count:', data.length);
    console.log('🎭 Sample media:', data[0]);
    
    return data;
  } catch (error) {
    console.error('💥 Error fetching all media:', error);
    
    // Return sample data with real API structure
    return getSampleData();
  }
}

export async function getMediaById(id: string | number): Promise<Media | null> {
  try {
    console.log('🔍 Fetching media by ID:', id);
    
    const response = await fetch(`${API_BASE_URL}/media/${id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
      mode: 'cors',
      cache: 'no-store'
    });
    
    console.log('📡 Single media response status:', response.status);
    
    if (!response.ok) {
      console.error('❌ API Error for media ID:', id, response.status);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('✅ Successfully fetched media:', data.title);
    
    return data;
  } catch (error) {
    console.error('💥 Error fetching media by ID:', error);
    return null;
  }
}

export async function searchMedia(query: string): Promise<Media[]> {
  try {
    if (!query.trim()) return [];
    
    console.log('🔎 Searching for:', query);
    
    const searchUrl = `${API_BASE_URL}/search?q=${encodeURIComponent(query)}`;
    console.log('🔎 Search URL:', searchUrl);
    
    const response = await fetch(searchUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
      mode: 'cors',
      cache: 'no-store'
    });
    
    console.log('📡 Search response status:', response.status);
    
    if (!response.ok) {
      console.error('❌ Search API Error:', response.status);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('✅ Search results count:', data.length);
    
    return data;
  } catch (error) {
    console.error('💥 Error searching media:', error);
    return [];
  }
}

// Sample data matching your API structure exactly
function getSampleData(): Media[] {
  return [
    {
      id: 2,
      type: 'movie',
      title: 'The Matrix',
      description: 'Set in the 22nd century, The Matrix tells the story of a computer hacker who joins a group of underground insurgents fighting the vast and powerful computers who now rule the earth.',
      poster_url: 'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
      release_date: '1999-03-30',
      language: 'en',
      tmdb_id: 603,
      video_links: {
        '720p': 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
        '1080p': 'https://sample-videos.com/zip/10/mp4/SampleVideo_1920x1080_2mb.mp4'
      }
    },
    {
      id: 1,
      type: 'tv',
      title: 'Breaking Bad',
      description: 'When Walter White, a New Mexico chemistry teacher, is diagnosed with Stage III cancer and given a prognosis of only two years left to live, he becomes filled with a sense of fearlessness and an unrelenting desire to secure his family financial future.',
      poster_url: 'https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg',
      release_date: '2008-01-20',
      language: 'en',
      total_seasons: 2,
      tmdb_id: 1396,
      seasons: {
        'season_1': {
          season_number: 1,
          total_episodes: 3,
          episodes: [
            {
              episode_number: 1,
              video_720p: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4'
            },
            {
              episode_number: 2,
              video_720p: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4'
            },
            {
              episode_number: 3,
              video_720p: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4'
            }
          ]
        },
        'season_2': {
          season_number: 2,
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
    },
    {
      id: 3,
      type: 'movie',
      title: 'Inception',
      description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
      poster_url: 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
      release_date: '2010-07-16',
      language: 'en',
      tmdb_id: 27205,
      video_links: {
        '720p': 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
        '1080p': 'https://sample-videos.com/zip/10/mp4/SampleVideo_1920x1080_2mb.mp4'
      }
    },
    {
      id: 4,
      type: 'tv',
      title: 'Stranger Things',
      description: 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.',
      poster_url: 'https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg',
      release_date: '2016-07-15',
      language: 'en',
      total_seasons: 1,
      tmdb_id: 66732,
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
