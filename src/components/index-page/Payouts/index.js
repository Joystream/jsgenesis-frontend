import React, { useState, useRef } from 'react';
import cn from 'classnames';
import Plx from 'react-plx';
import { Trans, useI18next, Link } from 'gatsby-plugin-react-i18next';

import { parseDateToRelativeTime, getDateHoursAgo } from '../../../utils/pages/landing/parseDateToRelativeTime';
import useRemoveElementFocusOnKeydown from '../../../utils/useRemoveElementFocusOnKeydown';
import useImageFallback from '../../../utils/useImageFallback';

// import { ArrowButton } from '../../ArrowButton';

import PayoutsBackgroundImage from '../../../assets/images/landing/payouts-background.webp';
import PayoutsForeground from '../../../assets/images/landing/payouts-foreground.webp';
import { ReactComponent as InfoIcon } from '../../../assets/svg/info.svg';
import { ReactComponent as ClockIcon } from '../../../assets/svg/landing/clock.svg';
import { ReactComponent as PlusIcon } from '../../../assets/svg/plus.svg';
import PlaceholderIcon from '../../../assets/svg/empty-avatar.svg';
// import { ReactComponent as YoutubeLogo } from '../../../assets/svg/landing/youtube-logo.svg';
// import { ReactComponent as ConnectionIcon } from '../../../assets/svg/landing/connection-icon.svg';
// import { ReactComponent as JoystreamLogo } from '../../../assets/svg/logo-mark.svg';

import './style.scss';

const parallaxDataForeground = [
  {
    startOffset: -100,
    start: 'self',
    duration: 1500,
    easing: 'easeIn',
    properties: [
      {
        startValue: 200,
        endValue: -350,
        property: 'translateY',
        unit: 'px',
      },
    ],
  },
];

const CarouselItem = ({ img, joyAmount, priceData, channelName, time, setIsCarouselRunning, channelUrl }) => {
  const [imgSrc, onError] = useImageFallback(img, PlaceholderIcon);
  let usdAmount = `$${(priceData.price * joyAmount).toFixed(2)}`;

  if (priceData.error) {
    usdAmount = 'Error';
  }

  return (
    <a href={channelUrl} target="_blank" rel="noreferrer">
      <div
        className="IndexPage__payouts-carousel__item"
        onMouseEnter={() => setIsCarouselRunning(true)}
        onMouseLeave={() => setIsCarouselRunning(false)}
      >
        <div className="IndexPage__payouts-carousel__item__image">
          <img src={imgSrc} onError={e => onError(e)} alt="" />
        </div>
        <div className="IndexPage__payouts-carousel__item__channel">
          <Trans i18nKey="landing.payouts.carousel.item.channel" components={{ span: <span />, channelName }} />
        </div>
        <div className="IndexPage__payouts-carousel__item__price">
          <PlusIcon className="IndexPage__payouts-carousel__item__price__icon" />
          <div className="IndexPage__payouts-carousel__item__price__text">
            <Trans i18nKey="landing.payouts.carousel.item.price" components={{ span: <span />, joyAmount }} />
          </div>
        </div>
        <p className="IndexPage__payouts-carousel__item__price-usd">{usdAmount}</p>
        <div className="IndexPage__payouts-carousel__item__time">
          <ClockIcon className="IndexPage__payouts-carousel__item__time__icon" /> {time}
        </div>
      </div>
    </a>
  );
};

const Carousel = ({ itemsData, priceData, t }) => {
  const [isCarouselRunning, setIsCarouselRunning] = useState(false);

  const items = itemsData.map(({ img, joyAmount, channelName, time, channelUrl }) => (
    <CarouselItem
      key={`${joyAmount}-${channelName}-${time}`}
      img={img}
      joyAmount={joyAmount}
      priceData={priceData}
      channelName={channelName}
      time={time}
      setIsCarouselRunning={setIsCarouselRunning}
      channelUrl={channelUrl}
      t={t}
    />
  ));

  return (
    <>
      <div
        className={cn('IndexPage__payouts-carousel__items', {
          'IndexPage__payouts-carousel__items--paused': isCarouselRunning,
        })}
      >
        {items}
      </div>
      <div
        className={cn('IndexPage__payouts-carousel__items', {
          'IndexPage__payouts-carousel__items--paused': isCarouselRunning,
        })}
        aria-hidden="true"
      >
        {items}
      </div>
    </>
  );
};

const Payouts = ({ t, payouts, priceData }) => {
  const { language } = useI18next();
  const payoutsCarouselInfoLabelRef = useRef();
  useRemoveElementFocusOnKeydown(payoutsCarouselInfoLabelRef, ['Escape']);

  return (
    <section className="IndexPage__payouts-wrapper">
      <div className="IndexPage__payouts" id="creator-payouts">
        <div className="IndexPage__payouts__main__content">
          <span className="IndexPage__payouts__main__content__section-title">{t('landing.payouts.sectionTitle')}</span>
          <h3 className="IndexPage__payouts__main__content__title">
            <Trans i18nKey="landing.payouts.title" components={{ br: <br /> }} />
          </h3>
          <p className="IndexPage__payouts__main__content__subtitle">{t('landing.payouts.subtitle')}</p>
        </div>
        <div className="IndexPage__payouts__main__illustration">
          <img
            src={PayoutsBackgroundImage}
            className="IndexPage__payouts__main__illustration__background"
            alt="my payments tab in atlas studio"
          />
          <Plx parallaxData={parallaxDataForeground} animateWhenNotInViewport={true}>
            <img
              src={PayoutsForeground}
              className="IndexPage__payouts__main__illustration__foreground"
              alt="claim payout popup, in front of the my payments tab"
            />
          </Plx>
        </div>
      </div>
      {/* <div className="IndexPage__payouts__carousel-title-and-info-wrapper">
        <div className="IndexPage__payouts__carousel-title-and-info">
          <h3 className="IndexPage__payouts__carousel-title-and-info__title">{t('landing.payouts.carousel.title')}</h3>
          <div className="IndexPage__payouts__carousel-title-and-info__info">
            <div
              className="IndexPage__payouts__carousel-title-and-info__info__label"
              // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
              tabIndex={0}
              aria-describedby="IndexPage__payouts__carousel-title-and-info__info__modal"
              ref={payoutsCarouselInfoLabelRef}
            >
              {t('landing.payouts.carousel.info.label')}
              <div className="IndexPage__payouts__carousel-title-and-info__info__icon">
                <InfoIcon />
              </div>
            </div>
            <div
              role="tooltip"
              id="IndexPage__payouts__carousel-title-and-info__info__modal"
              className="IndexPage__payouts__carousel-title-and-info__info__modal"
            >
              <Trans i18nKey={'landing.payouts.carousel.info.text'} components={{ exchanges: <Link to="/token#exchanges" /> } } />
            </div>
          </div>
        </div>
      </div>
      <section className="IndexPage__payouts-carousel">
        <div className="IndexPage__payouts-carousel__items-wrapper">
          {payouts && payouts.length > 0 ? (
            <Carousel
              itemsData={payouts?.map(({ createdAt, imageUrl, ...rest }) => ({
                img: imageUrl,
                time: parseDateToRelativeTime(createdAt, language),
                ...rest,
              }))}
              priceData={priceData}
              t={t}
            />
          ) : null}
        </div>
      </section> */}
    </section>
  );
};

export default Payouts;
