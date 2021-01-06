import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { GamePage } from '../../components/pages/GamePage';

import { GamePageController } from '../../controllers';

import { IServices } from '../../services/createServices';

import { GamePageService } from '../services/GamePageService';
import { RootStore } from '../../stores/RootStore';
import { ThreeJSController } from '../../controllers/3Dengine/ThreeJSController';

const services: Partial<IServices> = {
  gamePageService: new GamePageService(),
};

const rootStore = new RootStore(services as any);

storiesOf('Pages', module).add('GamePage', () => {
  const controller = new GamePageController(rootStore, new ThreeJSController());

  return <GamePage controller={controller} />;
});
