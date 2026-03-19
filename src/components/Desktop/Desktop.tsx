'use client';

import MenuBar from './MenuBar';
import ControlCenter from './ControlCenter';
import Dock from './Dock';
import AppsView from './AppsView';
import WindowManager from '../Windows/WindowManager';

export default function Desktop() {
  return (
    <div className="w-screen h-screen bg-cover bg-center overflow-hidden flex flex-col text-sm text-mac-text relative"
      style={{ backgroundImage: 'url(/wallpapers/sequoia-light.jpg)' }}>
      <MenuBar />
      <ControlCenter />
      <AppsView />

      <WindowManager />

      <Dock />
    </div>
  );
}
