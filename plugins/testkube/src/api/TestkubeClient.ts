import { TestkubeApi } from './TestkubeApi';
import { TestWorkflowExecutions } from '../types';

export class TestkubeClient implements TestkubeApi {
  async listTestWorkflowExecutions(): Promise<{ totals: any, results: TestWorkflowExecutions[] }> {
    // TODO: take the API URL from the config
    // const configApi = useApi(configApiRef);
    // const testkubeApi = configApi.getOptionalString('testkube.api');
    const testkubeApi = 'http://localhost:8088'; // Replace with your actual Testkube API URL
    console.log('Using Testkube API: ', testkubeApi);
    // TODO: move Testkube API call to backend plugin
    const response = await fetch(`${testkubeApi}/v1/test-workflow-executions`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok || response.status != 200) {
      throw new Error(`Error fetching test workflow executions: ${response.statusText}`);
    }
    return response.json();
  }
}
