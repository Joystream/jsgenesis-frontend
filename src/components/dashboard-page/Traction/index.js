import React from 'react';
import { bool } from 'prop-types';

import DashboardSectionHeader from '../../DashboardSectionHeader';
import ChartWidget from './ChartWidget';
import DashboardWidgetHeading from '../../DashboardWidgetHeading';
import Metrics from './Metrics';

import { chartMockData, metrics } from './data.js';

import './style.scss';

const propTypes = {
  shouldAddScrollOffset: bool,
};

const Traction = ({ shouldAddScrollOffset }) => {
  return (
    <section className="dashboard-traction">
      <div className="dashboard-traction__container">
        <DashboardSectionHeader
          sectionId="traction"
          sectionHeading="Traction"
          shouldAddScrollOffset={shouldAddScrollOffset}
        />
        <div className="dashboard-traction__grid">
          <ChartWidget
            heading="Content creators"
            valueOfIndicatorInThousands={1.2}
            growthRate={5}
            indicator="Signs up"
            chartData={chartMockData}
          />
          <ChartWidget
            heading="Videos uploaded"
            valueOfIndicatorInThousands={300}
            growthRate={2}
            indicator="Uploads"
            chartData={chartMockData}
          />
          <ChartWidget
            heading="Comments & reactions"
            valueOfIndicatorInThousands={1.9}
            growthRate={12}
            indicator="Comments & reactions"
            chartData={chartMockData}
          />
          <div className="dashboard-traction__metrics">
            <DashboardWidgetHeading heading="Chain metrics" />
            <div className="dashboard-traction__metrics-wrapper">
              {metrics.map(m => (
                <Metrics {...m} />
              ))}
            </div>
          </div>
          <ChartWidget
            heading="NFTs"
            valueOfIndicatorInThousands={260}
            growthRate={5}
            indicator="Traded volume"
            chartData={chartMockData}
          />
          <ChartWidget
            heading="Creator tokens"
            valueOfIndicatorInThousands={260}
            growthRate={5}
            indicator="Traded volume"
            chartData={chartMockData}
          />
        </div>
      </div>
    </section>
  );
};

Traction.propTypes = propTypes;

export default Traction;
