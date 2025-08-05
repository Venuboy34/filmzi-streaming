import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import MediaCard from '../components/MediaCard';
import { searchMedia, Media } from '../lib/api';

export default function Search() {
  const router = useRouter();
  const { q } = router.query;
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<Media[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (q && typeof q === 'string') {
      setSearchQuery(q);
      performSearch(q);
    }
  }, [q]);

  const performSearch = async (query: string) => {
    if (!query.trim()) return;
    
    setLoading(true);
    setHasSearched(true);
    try {
      const searchResults = await searchMedia(query);
      setResults(searchResults);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        {/* Search Form */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Search <span className="text-green-500">Movies & TV Shows</span>
          </h1>
          
          <form onSubmit={handleSubmit} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for movies, TV shows..."
              className="w-full px-6 py-4 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-500 text-black px-6 py-2 rounded-md hover:bg-green-400 transition-colors disabled:opacity-50"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </form>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
          </div>
        )}

        {/* Search Results */}
        {!loading && hasSearched && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold">
                {results.length > 0 
                  ? `Found ${results.length} result${results.length !== 1 ? 's' : ''} for "${q}"`
                  : `No results found for "${q}"`
                }
              </h2>
            </div>

            {results.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {results.map((item) => (
                  <MediaCard key={item.id} media={item} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg mb-4">
                  No movies or TV shows found matching your search.
                </p>
                <p className="text-gray-500">
                  Try searching with different keywords or check the spelling.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Default State */}
        {!hasSearched && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              Enter a search term to find movies and TV shows.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}
