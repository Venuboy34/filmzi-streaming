import { useEffect, useRef } from 'react';

interface VideoPlayerProps {
  videoUrl: string;
  title: string;
  qualities?: { [key: string]: string };
}

export default function VideoPlayer({ videoUrl, title, qualities }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    // Dynamically import Plyr to avoid SSR issues
    import('plyr').then((Plyr) => {
      if (videoRef.current && !playerRef.current) {
        playerRef.current = new Plyr.default(videoRef.current, {
          controls: [
            'play-large',
            'play',
            'progress',
            'current-time',
            'mute',
            'volume',
            'settings',
            'fullscreen'
          ],
          settings: ['quality', 'speed'],
          quality: {
            default: '720p',
            options: qualities ? Object.keys(qualities) : ['720p']
          }
        });

        // Handle quality changes
        if (qualities) {
          playerRef.current.on('qualitychange', (event: any) => {
            const quality = event.detail.quality;
            if (qualities[quality]) {
              playerRef.current.source = {
                type: 'video',
                sources: [{
                  src: qualities[quality],
                  type: 'video/mp4',
                  size: quality
                }]
              };
            }
          });
        }
      }
    });

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [videoUrl, qualities]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-black rounded-lg overflow-hidden shadow-2xl">
        <video
          ref={videoRef}
          className="w-full h-auto"
          controls
          playsInline
          crossOrigin="anonymous"
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="mt-4 text-center">
        <h2 className="text-xl font-bold text-green-500">{title}</h2>
      </div>
    </div>
  );
}
