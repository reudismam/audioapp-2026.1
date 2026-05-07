
"use client"

import { useEffect, useRef, useState } from "react";
import { FaPauseCircle, FaPlayCircle } from "react-icons/fa";
import Music from "./data/Music";
import musics from "./data/musics";

export default function Home() {
  const [playing, isPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(1);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioIndex, setAudioIndex] = useState<number>(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      play();
    }
  }, [audioIndex]);

  useEffect(() => {
    configAudio(0);
  }, []);

  const play = () => {
    const audio = audioRef.current;
    if (!audio) return;
    console.log("play" + audio);
    audio.play();
  }

  const pause = () => {
    const audio = audioRef.current;
    if (!audio) return;
    console.log("pause" + audio);
    audio.pause();
  }

  const playPause = () => {
    if (playing) {
      pause();
    }
    else {
      play();
    }
    isPlaying(!playing);
  }

  const configVolume = (value: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = value;
    setVolume(value);
  }

  const configAudio = (index: number) => {
    const newIndex = index % musics.length;
    setAudioIndex(newIndex);
  }

  const nextMusic = () => {
    setAudioIndex(audioIndex + 1);
  }

  return (
    <div className="w-2xl mr-auto ml-auto flex">
      <div>
        <ul>
          {
            musics.map((music, index)=> {
              return (
                <div onClick={() => configAudio(index)} className="w-50" key={index}>
                  <img src={musics[index].imagem} alt={musics[index].nome} />
                </div>
              )
            })
          }
        </ul>
      </div>
      <div className="items-center flex flex-col rounded-2xl border-gray-500 border-2 w-50 m-0 mr-auto ml-auto">
        <audio ref={audioRef} src={musics[audioIndex].url} controls hidden></audio>
        <button onClick={() => playPause()} >
          {
            playing ? <FaPauseCircle /> : <FaPlayCircle />
          }
        </button>
        <input type="range"
          min={0}
          max={1}
          step={0.001}
          value={volume}
          onChange={(e) => configVolume(Number(e.target.value))}
        />
        <button onClick={() => nextMusic()}>Next</button>
      </div>
    </div>
  );
}
