import { createApiRef } from "@backstage/frontend-plugin-api"
import { TestWorkflowExecutions } from "../types"

export const testkubeApiRef = createApiRef<TestkubeApi>({
  id: 'plugin.testkube.service'
})

export type TestkubeApi = {
  listTestWorkflowExecutions(): Promise<{ totals: any, results: TestWorkflowExecutions[] }>;
}
