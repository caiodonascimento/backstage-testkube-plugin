import {
  createComponentExtension,
  createPlugin
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const testkubePlugin = createPlugin({
  id: 'testkube',
  routes: {
    root: rootRouteRef,
  },
  featureFlags: [
    {
      name: 'testkube'
    }
  ]
});

export const TestkubeDashboardPage = testkubePlugin.provide(
  createComponentExtension({
    name: 'TestkubeDashboardPage',
    component: {
      lazy: () =>
      import('./components/DashboardComponent').then(m => m.DashboardComponent)
    }
  }),
);

export const TestkubeSummaryPage = testkubePlugin.provide(
  createComponentExtension({
    name: 'TestkubeSummaryPage',
    component: {
      lazy: () =>
      import('./components/SummaryComponent').then(m => m.SummaryComponent)
    }
  }),
);
