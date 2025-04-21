// Music.jsx
import React from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { GiMusicSpell } from 'react-icons/gi';
import { Button } from '.';
import { useMusic } from '../contexts/MusicContext';

const musicList = [
  {
    name: 'Calm Vibes',
    src: 'https://nadorzik.com/mp3/0/9/0/090c7a19513f8a4ac042d9f03b4d3de6.mp3',
  },
  {
    name: 'Energetic Beat',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  },
  {
    name: 'Lo-fi Chill',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  },
];

const Music = ({ onClose }) => {
  const { playMusic, currentTrack } = useMusic();

  return (
    <div className="bg-half-transparent w-full fixed nav-item top-0 right-0 z-50">
      <div className="float-right h-screen duration-1000 ease-in-out dark:text-gray-200 transition-all dark:bg-[#484B52] bg-white md:w-400 p-8">
        <div className="flex justify-between items-center mb-4">
          <p className="font-semibold text-lg flex items-center gap-2">
            <GiMusicSpell /> Music Player
          </p>
          <Button
            icon={<MdOutlineCancel />}
            color="rgb(153, 171, 180)"
            bgHoverColor="light-gray"
            size="2xl"
            borderRadius="50%"
            onClick={onClose}
          />
        </div>

        <ul className="space-y-4">
          {musicList.map((track, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-3 bg-gray-100 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600"
              onClick={() => playMusic(track)}
            >
              <span>{track.name}</span>
              {currentTrack?.src === track.src && (
                <span className="text-green-500 text-sm">Playing</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Music;
