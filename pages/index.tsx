import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import MediaCard from '../components/MediaCard';
import { getAllMedia, Media } from '../lib/api';

export default function Home() {
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [apiStatus, setApiStatus] = useState<string>('Checking...');

  useEffect(() => {
    async function fetchMedia() {
      try {
        setLoading(true);
        setApiStatus('Connecting to API...');
        console.log('🚀 Starting media fetch...');
        
        const mediaData = await getAllMedia();
        console.log('📊 Received media data:', mediaData);
        
        if (mediaData && mediaData.length > 0) {
          setMedia(mediaData);
          setApiStatus(`✅ API Connected - ${mediaData.length} items loaded`);
          setError(null);
        } else {
          setApiStatus('⚠️ API returned empty data');
          setError('No media found');
        }
      } catch (err) {
        console.error('💥 Homepage error:', err);
        setError('Failed to load media');
        setApiStatus('❌ API Connection Failed');
      } finally {
        setLoading(false);
      }
    }

    fetchMedia();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="flex flex-col justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mb-4"></div>
          <p className="text-green-500 text-lg">{apiStatus}</p>
          <p className="text-gray-400 text-sm mt-2">Loading Filmzi content...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div>
        {/* Debug Info */}
        <div className="bg-gray-900 rounded-lg p-4 mb-6">
          <p className="text-sm">
            <span className="text-green-500">API Status:</span> {apiStatus}
          </p>
          <p className="text-sm">
            <span className="text-green-500">Media Count:</span> {media.length}
          </p>
          {error && (
            <p className="text-sm">
              <span className="text-red-500">Error:</span> {error}
            </p>
          )}
        </div>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Welcome to <span className="text-green-500">Filmzi</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Stream and download your favorite movies and TV series
          </p>
          <div className="flex justify-center">
            <a 
              href="https://t.me/filmzi2" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-green-500 text-black px-8 py-3 rounded-md text-lg font-semibold hover:bg-green-400 transition-colors"
            >
              Join Our Community
            </a>
          </div>
        </div>

        {/* Media Grid */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-green-500">
            Latest Movies & TV Series ({media.length})
          </h2>
          
          {error && media.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-red-500 text-lg mb-4">{error}</p>
              <p className="text-gray-400 mb-4">
                There seems to be an issue connecting to the movie database.
              </p>
              <button 
                onClick={() => window.location.reload()} 
                className="bg-green-500 text-black px-6 py-2 rounded-md hover:bg-green-400 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : media.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No media available at the moment.</p>
              <p className="text-gray-500 text-sm mt-2">Check console for API debug info</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {media.map((item) => (
                <MediaCard key={item.id} media={item} />
              ))}
            </div>
          )}
        </div>

        {/* API Test Section */}
        <div className="mt-16 bg-gray-900 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 text-green-500">🔧 API Debug Info</h3>
          <div className="text-sm text-gray-300 space-y-2">
            <p><strong>API Base URL:</strong> https://v0-flask-movie-database-nine.vercel.app</p>
            <p><strong>Endpoints:</strong></p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>GET /media - All movies & TV shows</li>
              <li>GET /media/[id] - Single item</li>
              <li>GET /search?q=[query] - Search</li>
            </ul>
            <p><strong>Current Status:</strong> {apiStatus}</p>
            <p className="text-xs text-gray-500 mt-4">
              Open browser console (F12) to see detailed API logs
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
