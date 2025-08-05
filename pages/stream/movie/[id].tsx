import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../../components/Layout';
import VideoPlayer from '../../../components/VideoPlayer';
import { getMediaById, Media } from '../../../lib/api';

export default function StreamMovie() {
  const router = useRouter();
  const { id, quality } = router.query;
  const [media, setMedia] = useState<Media | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    async function fetchMedia() {
      try {
        setLoading(true);
        const mediaData = await getMediaById(id as string);
        if (mediaData && mediaData.type !== 'movie') {
          setError('This content is not a movie');
          return;
        }
        setMedia(mediaData);
      } catch (err) {
        setError('Failed to load movie');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchMedia();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
        </div>
      </Layout>
    );
  }

  if (error || !media || !media.video_links) {
    return (
      <Layout>
        <div className="text-center py-12">
          <p className="text-red-500 text-lg">{error || 'Movie not found or not available for streaming'}</p>
          <Link href="/" className="mt-4 inline-block bg-green-500 text-black px-6 py-2 rounded-md hover:bg-green-400 transition-colors">
            Back to Home
          </Link>
        </div>
      </Layout>
    );
  }

  const selectedQuality = (quality as string) || Object.keys(media.video_links)[0];
  const videoUrl = media.video_links[selectedQuality];

  if (!videoUrl) {
    return (
      <Layout>
        <div className="text-center py-12">
          <p className="text-red-500 text-lg">Selected quality not available</p>
          <Link href={`/media/${media.id}`} className="mt-4 inline-block bg-green-500 text-black px-6 py-2 rounded-md hover:bg-green-400 transition-colors">
            Back to Movie Details
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <Link 
            href={`/media/${media.id}`}
            className="inline-flex items-center text-green-500 hover:text-green-400 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Movie Details
          </Link>
        </div>

        {/* Video Player */}
        <div className="mb-8">
          <VideoPlayer 
            videoUrl={videoUrl}
            title={`${media.title} (${selectedQuality.toUpperCase()})`}
            qualities={media.video_links}
          />
        </div>

        {/* Quality Options */}
        <div className="bg-gray-900 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Available Qualities</h3>
          <div className="flex flex-wrap gap-3">
            {Object.keys(media.video_links).map((qual) => (
              <Link
                key={qual}
                href={`/stream/movie/${media.id}?quality=${qual}`}
                className={`px-4 py-2 rounded-md transition-colors ${
                  qual === selectedQuality
                    ? 'bg-green-500 text-black'
                    : 'bg-gray-700 text-white hover:bg-gray-600'
                }`}
              >
                {qual.toUpperCase()}
              </Link>
            ))}
          </div>
        </div>

        {/* Movie Info */}
        <div className="bg-gray-900 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-green-500">{media.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <span className="text-gray-400">Release Date:</span>
              <p className="font-semibold">{new Date(media.release_date).getFullYear()}</p>
            </div>
            <div>
              <span className="text-gray-400">Language:</span>
              <p className="font-semibold uppercase">{media.language}</p>
            </div>
            <div>
              <span className="text-gray-400">Type:</span>
              <p className="font-semibold">Movie</p>
            </div>
          </div>
          <p className="text-gray-300 leading-relaxed">{media.description}</p>
        </div>
      </div>
    </Layout>
  );
}
