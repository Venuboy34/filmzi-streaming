import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../../components/Layout';
import { getMediaById, Media } from '../../lib/api';

export default function MediaDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [media, setMedia] = useState<Media | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    async function fetchMedia() {
      try {
        setLoading(true);
        const mediaData = await getMediaById(id as string);
        setMedia(mediaData);
      } catch (err) {
        setError('Failed to load media details');
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

  if (error || !media) {
    return (
      <Layout>
        <div className="text-center py-12">
          <p className="text-red-500 text-lg">{error || 'Media not found'}</p>
          <Link href="/" className="mt-4 inline-block bg-green-500 text-black px-6 py-2 rounded-md hover:bg-green-400 transition-colors">
            Back to Home
          </Link>
        </div>
      </Layout>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Poster */}
          <div className="lg:col-span-1">
            <div className="relative aspect-[2/3] overflow-hidden rounded-lg shadow-2xl">
              <Image
                src={media.poster_url}
                alt={media.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Details */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <span className={`px-3 py-1 text-sm font-semibold rounded ${
                media.type === 'movie' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-purple-600 text-white'
              }`}>
                {media.type === 'movie' ? 'Movie' : 'TV Series'}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-green-500">
              {media.title}
            </h1>

            <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
              <div>
                <span className="text-gray-400">Release Date:</span>
                <p className="font-semibold">{formatDate(media.release_date)}</p>
              </div>
              <div>
                <span className="text-gray-400">Language:</span>
                <p className="font-semibold uppercase">{media.language}</p>
              </div>
              {media.total_seasons && (
                <div>
                  <span className="text-gray-400">Seasons:</span>
                  <p className="font-semibold">{media.total_seasons}</p>
                </div>
              )}
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3">Description</h3>
              <p className="text-gray-300 leading-relaxed">{media.description}</p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-6">
              {/* Movie Buttons */}
              {media.type === 'movie' && media.video_links && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Watch Movie</h3>
                  <div className="flex flex-wrap gap-4">
                    {Object.entries(media.video_links).map(([quality, url]) => (
                      <Link
                        key={quality}
                        href={`/stream/movie/${media.id}?quality=${quality}`}
                        className="bg-green-500 text-black px-6 py-3 rounded-md font-semibold hover:bg-green-400 transition-colors"
                      >
                        Stream {quality.toUpperCase()}
                      </Link>
                    ))}
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="text-lg font-semibold mb-3">Download</h4>
                    <div className="flex flex-wrap gap-4">
                      {Object.entries(media.video_links).map(([quality, url]) => (
                        <a
                          key={quality}
                          href={url}
                          download
                          className="bg-gray-700 text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-600 transition-colors"
                        >
                          Download {quality.toUpperCase()}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TV Series Episodes */}
              {media.type === 'tv' && media.seasons && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Episodes</h3>
                  <div className="space-y-6">
                    {Object.entries(media.seasons).map(([seasonKey, season]) => (
                      <div key={seasonKey} className="bg-gray-900 rounded-lg p-6">
                        <h4 className="text-lg font-semibold mb-4 text-green-500">
                          Season {season.season_number}
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                          {season.episodes.map((episode) => (
                            <Link
                              key={episode.episode_number}
                              href={`/stream/episode/${media.id}?season=${season.season_number}&episode=${episode.episode_number}`}
                              className="bg-gray-800 hover:bg-green-600 text-white p-3 rounded-md text-center transition-colors"
                            >
                              Episode {episode.episode_number}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
