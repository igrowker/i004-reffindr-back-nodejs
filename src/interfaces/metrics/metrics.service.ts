import client from 'prom-client';

export const getMetrics = async (): Promise<string> => {
  return client.register.metrics();
};
