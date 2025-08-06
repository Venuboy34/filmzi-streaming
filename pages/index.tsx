import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import MediaCard from '../components/MediaCard';
import { getAllMedia, Media } from '../lib/api';

export default function Home() {
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMedia() {
      try {
        setLoading(true);
        const mediaData = await getAllMedia();
        setMedia(mediaData);
        setError(null);
      } catch (err) {
        console.error('Homepage error:', err);
        setError('Failed to load media');
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

        {/* Media Grid */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-green-500">
              Latest Movies & TV Series
            </h2>
            {media.length > 0 && (
              <span className="text-gray-400 text-sm">
                {media.length} titles available
              </span>
            )}
          </div>
          
          {error ? (
            <div className="text-center py-12">
              <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-8 max-w-md mx-auto">
                <div className="text-red-400 text-4xl mb-4">⚠️</div>
                <p className="text-red-400 text-lg font-semibold mb-2">Connection Error</p>
                <p className="text-gray-300 mb-4">
                  Unable to load content from the movie database.
                </p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="bg-green-500 text-black px-6 py-2 rounded-md hover:bg-green-400 transition-colors font-semibold"
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : media.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-gray-900 rounded-lg p-8 max-w-md mx-auto">
                <div className="text-gray-400 text-4xl mb-4">📽️</div>
                <p className="text-gray-300 text-lg mb-2">No Content Available</p>
                <p className="text-gray-400 text-sm">
                  The movie database appears to be empty.
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-gray-900 rounded-lg p-4 text-center">
                  <div className="text-green-500 text-2xl font-bold">
                    {media.filter(m => m.type === 'movie').length}
                  </div>
                  <div className="text-gray-400 text-sm">Movies</div>
                </div>
                <div className="bg-gray-900 rounded-lg p-4 text-center">
                  <div className="text-green-500 text-2xl font-bold">
                    {media.filter(m => m.type === 'tv').length}
                  </div>
                  <div className="text-gray-400 text-sm">TV Series</div>
                </div>
                <div className="bg-gray-900 rounded-lg p-4 text-center">
                  <div className="text-green-500 text-2xl font-bold">
                    {media.reduce((acc, m) => acc + (m.total_seasons || 0), 0)}
                  </div>
                  <div className="text-gray-400 text-sm">Seasons</div>
                </div>
                <div className="bg-gray-900 rounded-lg p-4 text-center">
                  <div className="text-green-500 text-2xl font-bold">HD</div>
                  <div className="text-gray-400 text-sm">Quality</div>
                </div>
              </div>

              {/* Media Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {media.map((item) => (
                  <MediaCard key={item.id} media={item} />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Features Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-900 rounded-lg p-6 text-center">
            <div className="text-green-500 text-3xl mb-4">🎬</div>
            <h3 className="text-lg font-semibold mb-2">High Quality Streaming</h3>
            <p className="text-gray-400 text-sm">
              Watch movies and TV shows in 720p and 1080p quality
            </p>
          </div>
          <div className="bg-gray-900 rounded-lg p-6 text-center">
            <div className="text-green-500 text-3xl mb-4">📱</div>
            <h3 className="text-lg font-semibold mb-2">Mobile Friendly</h3>
            <p className="text-gray-400 text-sm">
              Optimized for all devices - mobile, tablet, and desktop
            </p>
          </div>
          <div className="bg-gray-900 rounded-lg p-6 text-center">
            <div className="text-green-500 text-3xl mb-4">⚡</div>
            <h3 className="text-lg font-semibold mb-2">Fast Loading</h3>
            <p className="text-gray-400 text-sm">
              Quick streaming with minimal buffering and instant playback
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
