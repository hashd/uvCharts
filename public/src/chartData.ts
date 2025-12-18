import type { GraphDefinition } from '@uvcharts/types';

export const barChartData: GraphDefinition = {
  categories: ['Sales'],
  dataset: {
    Sales: [
      { name: 'Jan', value: 100 },
      { name: 'Feb', value: 200 },
      { name: 'Mar', value: 150 },
      { name: 'Apr', value: 300 },
      { name: 'May', value: 250 },
    ],
  },
};

export const lineChartData: GraphDefinition = {
  categories: ['Revenue', 'Cost'],
  dataset: {
    Revenue: [
      { name: '2019', value: 1000 },
      { name: '2020', value: 1200 },
      { name: '2021', value: 1100 },
      { name: '2022', value: 1400 },
      { name: '2023', value: 1600 },
    ],
    Cost: [
      { name: '2019', value: 800 },
      { name: '2020', value: 900 },
      { name: '2021', value: 850 },
      { name: '2022', value: 1000 },
      { name: '2023', value: 1100 },
    ],
  },
};

export const areaChartData: GraphDefinition = {
  categories: ['Users'],
  dataset: {
    Users: [
      { name: 'Mon', value: 50 },
      { name: 'Tue', value: 80 },
      { name: 'Wed', value: 60 },
      { name: 'Thu', value: 100 },
      { name: 'Fri', value: 120 },
    ],
  },
};

export const pieChartData: GraphDefinition = {
  categories: ['Distribution'],
  dataset: {
    Distribution: [
      { name: 'Chrome', value: 60 },
      { name: 'Safari', value: 20 },
      { name: 'Firefox', value: 10 },
      { name: 'Edge', value: 5 },
      { name: 'Others', value: 5 },
    ],
  },
};

export const donutChartData: GraphDefinition = {
  categories: ['Storage'],
  dataset: {
    Storage: [
      { name: 'Used', value: 75 },
      { name: 'Free', value: 25 },
    ],
  },
};

export const waterfallChartData: GraphDefinition = {
  categories: ['Cashflow'],
  dataset: {
    Cashflow: [
      { name: 'Start', value: 1000 },
      { name: 'Sales', value: 500 },
      { name: 'Cost', value: -200 },
      { name: 'Tax', value: -100 },
      { name: 'End', value: 1200 },
    ],
  },
};
