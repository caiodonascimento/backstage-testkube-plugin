import {
  configApiRef,
  createApiFactory,
  createPlugin,
  createComponentExtension,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';
import { testkubeApiRef } from './api/TestkubeApi';
import { TestkubeClient } from './api/TestkubeClient';

export const testkubePlugin = createPlugin({
  id: 'testkube',
  routes: {
    root: rootRouteRef,
  },
  featureFlags: [
    {
      name: 'testkube'
    }
  ],
  apis: [
    createApiFactory({
      api: testkubeApiRef,
      deps: {},
      factory: () => new TestkubeClient()
      // factory: ({ configApi }) => new TestkubeClient({ configApi })
    })
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
