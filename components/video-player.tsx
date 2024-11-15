"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { X, Volume2, VolumeX, Maximize, Pause, Play } from "lucide-react";
import { useState, useRef } from "react";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";

interface VideoPlayerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export function VideoPlayer({ isOpen, onClose, title }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(80);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Using a reliable video source
  const videoUrl = "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (value: number) => {
    if (videoRef.current) {
      videoRef.current.volume = value / 100;
      setVolume(value);
      setIsMuted(value === 0);
    }
  };

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-6xl w-full p-0 bg-black overflow-hidden">
        <div className="relative group">
          <video
            ref={videoRef}
            className="w-full aspect-video"
            src={videoUrl}
            autoPlay
            playsInline
            onEnded={() => setIsPlaying(false)}
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-opacity" />

          <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-white opacity-0 group-hover:opacity-100 transition-opacity">
            <h2 className="text-xl font-bold">{title}</h2>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex items-center gap-4 text-white opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={handlePlayPause}
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5" />
              )}
            </Button>

            <div className="flex items-center gap-2 group/volume">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={handleMuteToggle}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="h-5 w-5" />
                ) : (
                  <Volume2 className="h-5 w-5" />
                )}
              </Button>
              <div className="w-24 hidden group-hover/volume:block">
                <Slider
                  value={[volume]}
                  max={100}
                  step={1}
                  className="cursor-pointer"
                  onValueChange={(value) => handleVolumeChange(value[0])}
                />
              </div>
            </div>

            <div className="flex-1" />

            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={handleFullscreen}
            >
              <Maximize className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}