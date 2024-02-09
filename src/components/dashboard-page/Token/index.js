import React from 'react';
import { object } from 'prop-types';

import SectionHeader from '../SectionHeader';
import PriceChartWidget from './PriceChartWidget';
import StatsWidget from '../StatsWidget';
import SupplyWidget from './SupplyWidget';
// import DashboardJoyCarousel from '../JoyCarousel';
import Exchange from './Exchange';
import ReleaseScheduleChartWidget from './ReleaseScheduleChartWidget';
import AllocationTableWidget from './AllocationTableWidget';
import MintingChartWidget from './MintingChartWidget';
import RoiTableWidget from './RoiTableWidget';
import SupplyDistributionTableWidget from './SupplyDistributionTableWidget';

import { getTokenPriceMetrics, parsePercentage } from './utils';

import './style.scss';

const propTypes = {
  data: object,
};

const Token = ({ data }) => {
  const tokenPriceMetrics = getTokenPriceMetrics(data);

  const supplyStakedForValidation = parsePercentage(data?.percentSupplyStakedForValidation);
  const aprOnStaking = parsePercentage(data?.apr);

  return (
    <section className="dashboard-token">
      <div className="dashboard-token__container">
        <SectionHeader sectionId="token" sectionHeading="Token" />
        <div className="dashboard-token__price-metrics-grid grid-indents">
          <PriceChartWidget widgetCn="dashboard-token__price-chart-widget" data={data} />
          {tokenPriceMetrics.map((tokenPriceStats, index) => {
            return (
              <StatsWidget
                key={index}
                heading={tokenPriceStats.figure}
                text={tokenPriceStats.rate}
                helperText={tokenPriceStats.growthRate}
              />
            );
          })}
        </div>

        <SupplyWidget data={data} />

        {/* <DashboardJoyCarousel /> */}

        <Exchange data={data?.exchanges} />

        <ReleaseScheduleChartWidget />

        <div className="dashboard-token__allocation-minting-grid grid-indents">
          <AllocationTableWidget />
          <MintingChartWidget data={data} />
        </div>

        <div className="dashboard-token__percentage-widgets-grid grid-indents">
          <StatsWidget
            heading="Supply staked for validation"
            text={supplyStakedForValidation}
            withTextSizeIncreasedFromMd
          />
          <StatsWidget heading="APR on staking" text={aprOnStaking} withTextSizeIncreasedFromMd />
        </div>

        <div className="dashboard-token__stats-tables-grid grid-indents">
          <RoiTableWidget data={data?.roi} />
          <SupplyDistributionTableWidget data={data?.supplyDistribution} />
        </div>
      </div>
    </section>
  );
};

Token.propTypes = propTypes;

export default Token;
