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
      } catch (err) {
        setError('Failed to load media');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchMedia();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="text-center py-12">
          <p className="text-red-500 text-lg">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-green-500 text-black px-6 py-2 rounded-md hover:bg-green-400 transition-colors"
          >
            Try Again
          </button>
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
          <h2 className="text-2xl font-bold mb-6 text-green-500">
            Latest Movies & TV Series
          </h2>
          
          {media.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No media available at the moment.</p>
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
