import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import MediaCard from '../components/MediaCard';
import { getAllMedia, Media } from '../lib/api';

export default function Home() {
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMedia() {
      console.log('🚀 Starting to load media...');
      const data = await getAllMedia();
      console.log('📦 Received data:', data);
      setMedia(data);
      setLoading(false);
    }

    loadMedia();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="flex flex-col justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mb-4"></div>
          <p className="text-green-500 text-lg">Loading Filmzi...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div>
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

        {/* Debug Info */}
        <div className="bg-gray-900 rounded-lg p-4 mb-6">
          <p className="text-green-500 font-semibold">
            📊 Status: {media.length > 0 ? `Loaded ${media.length} items` : 'No content loaded'}
          </p>
          <p className="text-gray-400 text-sm">
            API: https://v0-flask-movie-database-nine.vercel.app/media
          </p>
          {media.length > 0 && (
            <p className="text-gray-400 text-sm">
              Movies: {media.filter(m => m.type === 'movie').length} | 
              TV Shows: {media.filter(m => m.type === 'tv').length}
            </p>
          )}
        </div>

        {/* Content */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-green-500">
            Latest Movies & TV Series
          </h2>
          
          {media.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-8 max-w-md mx-auto">
                <div className="text-red-400 text-4xl mb-4">📽️</div>
                <p className="text-red-400 text-lg font-semibold mb-2">No Content Available</p>
                <p className="text-gray-300 mb-4">
                  The movie database appears to be empty or unreachable.
                </p>
                <p className="text-gray-400 text-sm mb-4">
                  Open browser console (F12) to see detailed logs.
                </p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="bg-green-500 text-black px-6 py-2 rounded-md hover:bg-green-400 transition-colors font-semibold"
                >
                  Retry
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {media.map((item) => (
                <MediaCard key={item.id} media={item} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
