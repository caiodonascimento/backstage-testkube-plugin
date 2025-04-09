import React, { useEffect, useState } from 'react';
import { Typography, Grid } from '@material-ui/core';
import {
  InfoCard,
  Header,
  Page,
  Content,
  ContentHeader,
  HeaderLabel,
  Table,
  TableColumn,
  EmptyState,
} from '@backstage/core-components';
import { TestWorkflowExecutions } from '../../types';
import { useApi } from '@backstage/frontend-plugin-api';
import { testkubeApiRef } from '../../api/TestkubeApi';

export const DashboardComponent = () => {
  const TestkubeApi = useApi(testkubeApiRef);
  const [data, setData] = useState<{ totals: any, results: TestWorkflowExecutions[] }>({
    totals: {
      passed: 0,
      failed: 0,
      results: 0,
    },
    results: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const lastExecutionsColumns: TableColumn[] = [
    { title: '#', field: 'number' },
    { title: 'Test Name', field: 'name' },
    { title: 'Status', field: 'result.status' },
    { title: 'Start Time', field: 'scheduledAt' },
    { title: 'Last update Time', field: 'statusAt' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      console.log('Fetching data from API ...')
      TestkubeApi.listTestWorkflowExecutions()
        .then((response) => {
          console.log('Response from API:', response);
          if (!response || !response.results) {
            throw new Error('Invalid response format: results is missing');
          }
          if (!Array.isArray(response.results)) {
            throw new Error('Invalid response format: results is not an array');
          }
          setData(response);
        })
        .catch((fetchError) => {
          console.log('Error fetching test workflow executions:', fetchError);
          setError('Failed to fetch test workflow executions');
        }).finally(() => setLoading(false));
    }
    fetchData();
  }, [TestkubeApi]);

  // TODO: simplify this logic to not replicate page and header 3 times
  if (loading) {
    return (<Page themeId="home">
      <Header title="Testkube" subtitle="Test Automation Execution Platform">
      </Header>
      <Content>
        <Typography>Loading...</Typography>
      </Content>
    </Page>);
  }
  if (error || !data || !data.results || data.results.length === 0) {
    return (
      <Page themeId="home">
        <Header title="Testkube" subtitle="Test Automation Execution Platform">
        </Header>
        <Content>
          <EmptyState
            missing="info"
            title="No data available"
            description="Unable to load data from Testkube API, please review your set up."
          >
          </EmptyState>
        </Content>
      </Page>
    );
  }
  return (<Page themeId="home">
    <Header title="Testkube" subtitle="Test Automation Execution Platform">
      <HeaderLabel label="Go to platform" value="https://app.testkube.io"></HeaderLabel>
    </Header>
    <Content>
      <ContentHeader title="Dashboard"></ContentHeader>
      <Grid container spacing={3} direction="row" alignItems="stretch">
        <Grid item xs={12} sm={6} md={4}>
          <InfoCard title="Pass/Fail Ratio">
            <Typography variant="h5">
              {data.totals.passed * 100 / data.totals.results || 0}%
            </Typography>
          </InfoCard>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <InfoCard title="Failed Executions">
            <Typography variant="h5">
              {data.totals.failed}
            </Typography>
          </InfoCard>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <InfoCard title="Total Executions">
            <Typography variant="h5">
              {data.totals.results}
            </Typography>
          </InfoCard>
        </Grid>
      </Grid>
      <br />
      <Table columns={lastExecutionsColumns} title="Last Executions" subtitle='The last 20 executions' options={{ paging: false }} data={data.results}>
      </Table>
    </Content>
  </Page>);
}
