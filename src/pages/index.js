import React from 'react';
import { graphql } from 'gatsby';
import { useTranslation, useI18next } from 'gatsby-plugin-react-i18next';
import BaseLayout from '../components/_layouts/Base';
import SiteMetadata from '../components/SiteMetadata';
import useAxios from '../utils/useAxios';

// components
import Hero from '../components/index-page/Hero';
import Payouts from '../components/index-page/Payouts';
import VideoNFTs from '../components/index-page/VideoNFTs';
import CreatorTokens from '../components/index-page/CreatorTokens';
import JoystreamDAO from '../components/index-page/JoystreamDAO';
// import AvailableActivities from '../components/index-page/AvailableActivities';
import Ecosystem from '../components/index-page/Ecosystem';
// import Tokenomics from '../components/index-page/Tokenomics';
import Video from '../components/index-page/Video';
import Traction from '../components/index-page/Traction';
// import Upcoming from '../components/index-page/Upcoming';
import Creators from '../components/index-page/Creators';
import Dashboard from './dashboard';

import './style.scss';

const IndexPage = pageProps => {
  const { t } = useTranslation();
  const { language } = useI18next();

  const [data, loading, error] = useAxios('https://status.joystream.org/landing-page-data');

  const updatedPriceData = {
    price: data?.price ?? 0,
    error: error,
  };

  return (
    <BaseLayout t={t} mainnetReminder={true}>
      <SiteMetadata
        lang={language}
        title={t('siteMetadata.title')}
        description={t('landing.siteMetadata.description')}
      />

      <Hero t={t} />

      <Video t={t} />

      <Traction t={t} tractionData={data} priceData={updatedPriceData} />

      <Creators t={t} creators={data?.carouselData.creators} priceData={updatedPriceData} />

      <Ecosystem t={t} />

      <VideoNFTs t={t} nftData={data?.carouselData.nfts} priceData={updatedPriceData} />

      <Payouts t={t} payouts={data?.carouselData.payouts} priceData={updatedPriceData} />

      <CreatorTokens t={t} />

      {/* <Upcoming t={t} /> */}

      <JoystreamDAO t={t} proposalsData={data?.carouselData.proposals} />

      {/* <AvailableActivities t={t} budgets={data?.budgets} loading={loading} priceData={updatedPriceData} /> */}

      <Dashboard {...pageProps} />
    </BaseLayout>
  );
};

export { IndexPage };
export default IndexPage;

export const query = graphql`
  query($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      ...LanguageQueryFields
    }
  }
`;
