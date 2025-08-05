import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../../components/Layout';
import VideoPlayer from '../../../components/VideoPlayer';
import { getMediaById, Media } from '../../../lib/api';

export default function StreamEpisode() {
  const router = useRouter();
  const { id, season, episode } = router.query;
  const [media, setMedia] = useState<Media | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id || !season || !episode) return;

    async function fetchMedia() {
      try {
        setLoading(true);
        const mediaData = await getMediaById(id as string);
        if (mediaData && mediaData.type !== 'tv') {
          setError('This content is not a TV series');
          return;
        }
        setMedia(mediaData);
      } catch (err) {
        setError('Failed to load TV series');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchMedia();
  }, [id, season, episode]);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
        </div>
      </Layout>
    );
  }

  if (error || !media || !media.seasons) {
    return (
      <Layout>
        <div className="text-center py-12">
          <p className="text-red-500 text-lg">{error || 'TV series not found'}</p>
          <Link href="/" className="mt-4 inline-block bg-green-500 text-black px-6 py-2 rounded-md hover:bg-green-400 transition-colors">
            Back to Home
          </Link>
        </div>
      </Layout>
    );
  }

  const seasonKey = `season_${season}`;
  const selectedSeason = media.seasons[seasonKey];
  
  if (!selectedSeason) {
    return (
      <Layout>
        <div className="text-center py-12">
          <p className="text-red-500 text-lg">Season {season} not found</p>
          <Link href={`/media/${media.id}`} className="mt-4 inline-block bg-green-500 text-black px-6 py-2 rounded-md hover:bg-green-400 transition-colors">
            Back to Series Details
          </Link>
        </div>
      </Layout>
    );
  }

  const selectedEpisode = selectedSeason.episodes.find(
    ep => ep.episode_number === parseInt(episode as string)
  );

  if (!selectedEpisode) {
    return (
      <Layout>
        <div className="text-center py-12">
          <p className="text-red-500 text-lg">Episode {episode} not found in Season {season}</p>
          <Link href={`/media/${media.id}`} className="mt-4 inline-block bg-green-500 text-black px-6 py-2 rounded-md hover:bg-green-400 transition-colors">
            Back to Series Details
          </Link>
        </div>
      </Layout>
    );
  }

  const episodeTitle = `${media.title} - S${season}E${episode}`;

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
            Back to Series Details
          </Link>
        </div>

        {/* Video Player */}
        <div className="mb-8">
          <VideoPlayer 
            videoUrl={selectedEpisode.video_720p}
            title={episodeTitle}
          />
        </div>

        {/* Episode Navigation */}
        <div className="bg-gray-900 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Episode Navigation</h3>
          <div className="flex justify-between items-center">
            {/* Previous Episode */}
            <div>
              {parseInt(episode as string) > 1 && (
                <Link
                  href={`/stream/episode/${media.id}?season=${season}&episode=${parseInt(episode as string) - 1}`}
                  className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
                >
                  ← Previous Episode
                </Link>
              )}
            </div>

            {/* Current Episode Info */}
            <div className="text-center">
              <p className="text-green-500 font-semibold">
                Season {season}, Episode {episode}
              </p>
            </div>

            {/* Next Episode */}
            <div>
              {parseInt(episode as string) < selectedSeason.total_episodes && (
                <Link
                  href={`/stream/episode/${media.id}?season=${season}&episode=${parseInt(episode as string) + 1}`}
                  className="bg-green-500 text-black px-4 py-2 rounded-md hover:bg-green-400 transition-colors"
                >
                  Next Episode →
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* All Episodes in Season */}
        <div className="bg-gray-900 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Season {season} Episodes</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {selectedSeason.episodes.map((ep) => (
              <Link
                key={ep.episode_number}
                href={`/stream/episode/${media.id}?season=${season}&episode=${ep.episode_number}`}
                className={`p-3 rounded-md text-center transition-colors ${
                  ep.episode_number === parseInt(episode as string)
                    ? 'bg-green-500 text-black'
                    : 'bg-gray-700 text-white hover:bg-gray-600'
                }`}
              >
                Ep {ep.episode_number}
              </Link>
            ))}
          </div>
        </div>

        {/* Series Info */}
        <div className="bg-gray-900 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-green-500">{media.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div>
              <span className="text-gray-400">Release Date:</span>
              <p className="font-semibold">{new Date(media.release_date).getFullYear()}</p>
            </div>
            <div>
              <span className="text-gray-400">Language:</span>
              <p className="font-semibold uppercase">{media.language}</p>
            </div>
            <div>
              <span className="text-gray-400">Total Seasons:</span>
              <p className="font-semibold">{media.total_seasons}</p>
            </div>
            <div>
              <span className="text-gray-400">Type:</span>
              <p className="font-semibold">TV Series</p>
            </div>
          </div>
          <p className="text-gray-300 leading-relaxed">{media.description}</p>
        </div>
      </div>
    </Layout>
  );
}
