import React, { useEffect, useRef, useState } from 'react';
import { Button } from '../ui/button';
import { Pause, Play } from 'lucide-react';
type Props = {
  audioUrl: string | null;
};

const AudioPlayer: React.FC<Props> = ({ audioUrl }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, audioRef]);

  const handleToggle = () => {
    setIsPlaying((state) => !state);
  };

  return (
    <div>
      <Button
        disabled={!audioUrl}
        size="icon"
        variant="outline"
        onClick={handleToggle}
      >
        {isPlaying ? <Pause /> : <Play />}
      </Button>
      <audio src={audioUrl || ''} ref={audioRef} />
    </div>
  );
};

export default AudioPlayer;
