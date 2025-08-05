import Link from 'next/link';
import Image from 'next/image';

interface Media {
  id: number;
  type: 'movie' | 'tv';
  title: string;
  description: string;
  poster_url: string;
  release_date: string;
  language: string;
}

interface MediaCardProps {
  media: Media;
}

export default function MediaCard({ media }: MediaCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.getFullYear();
  };

  return (
    <Link href={`/media/${media.id}`} className="group">
      <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-green-500/20 transition-all duration-300 transform hover:scale-105">
        <div className="relative aspect-[2/3] overflow-hidden">
          <Image
            src={media.poster_url}
            alt={media.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
          <div className="absolute top-2 right-2">
            <span className={`px-2 py-1 text-xs font-semibold rounded ${
              media.type === 'movie' 
                ? 'bg-blue-600 text-white' 
                : 'bg-purple-600 text-white'
            }`}>
              {media.type === 'movie' ? 'Movie' : 'TV Series'}
            </span>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-green-500 transition-colors">
            {media.title}
          </h3>
          <p className="text-gray-400 text-sm mb-2">
            {formatDate(media.release_date)}
          </p>
          <p className="text-gray-300 text-sm line-clamp-3">
            {media.description}
          </p>
        </div>
      </div>
    </Link>
  );
}
