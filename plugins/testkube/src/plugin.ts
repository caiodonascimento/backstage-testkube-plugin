import {
  configApiRef,
  createApiFactory,
  createPlugin,
  createRoutableExtension,
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

export const TestkubePage = testkubePlugin.provide(
  createRoutableExtension({
    name: 'TestkubePage',
    component: () =>
      import('./components/DashboardComponent').then(m => m.DashboardComponent),
    mountPoint: rootRouteRef,
  }),
);
