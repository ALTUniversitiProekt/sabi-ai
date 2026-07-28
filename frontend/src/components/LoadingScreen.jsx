import React from 'react';
import { SabinaAvatar } from './SabinaAvatar';

export const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-50 bg-[#080511] flex flex-col items-center justify-center">
      <SabinaAvatar size="lg" mood="Calm" />
      <p className="mt-6 text-sm font-semibold tracking-wider text-pink-300 animate-pulse">
        SABINA AI ЖҮКТЕЛУДЕ...
      </p>
    </div>
  );
};
