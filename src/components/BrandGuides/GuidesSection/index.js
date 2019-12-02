import React, { useContext } from 'react';
import { string, node, func, oneOf, bool } from 'prop-types';
import cn from 'classnames';
import { SidebarContext } from '../../../components/BrandSidebar';
import { InView } from 'react-intersection-observer';

import './style.scss';

export const Section = React.memo(({ className, children, title, ...props }) => {
  const { setCurrentElement } = useContext(SidebarContext);

  return (
    <InView
      as="div"
      threshold={0}
      onChange={inView => {
        if (inView) setCurrentElement(props.id);
      }}
    >
      <section className={cn('GuidesSection__section', className)} {...props}>
        {title && <h4 className="GuidesSection__section-title">{title}</h4>}
        {children}
      </section>
    </InView>
  );
});

Section.propTypes = {
  title: string,
  onEnterViewport: func,
  id: string.isRequired,
};

export const SubSection = React.memo(({ children, title, className, ...props }) => {
  const { setCurrentSubElement } = useContext(SidebarContext);

  return (
    <InView
      as="div"
      threshold={0.25}
      onChange={inView => {
        if (inView) setCurrentSubElement(props.id);
      }}
    >
      <div className={cn('GuidesSection__subsection', className)} {...props}>
        {title && <h4 className="GuidesSection__subsection-title">{title}</h4>}
        {children}
      </div>
    </InView>
  );
});

SubSection.propTypes = {
  title: string,
};

export const SubTitle = ({ className, children, bold, ...props }) => {
  return (
    <p className={cn('GuidesSection__sub-title', className)} {...props}>
      {children}
    </p>
  );
};

SubTitle.propTypes = {
  bold: bool,
};

export const Text = ({ className, ...props }) => {
  return <p className={cn('GuidesSection__text', className)} {...props} />;
};

export const DetailText = ({ className, ...props }) => {
  return <p className={cn('GuidesSection__detail-text', className)} {...props} />;
};

export const Heading = ({ className, children, variant, ...props }) => {
  const Component = variant;
  return (
    <Component className={cn('GuidesSection__heading', `GuidesSection__heading--${variant}`)} {...props}>
      {children}
    </Component>
  );
};

Heading.propTypes = {
  variant: oneOf(['h1', 'h2', 'h3', 'h4']).isRequired,
};

export const BlueSection = ({ bottom, className, ...props }) => {
  return (
    <div
      className={cn('GuidesSection__blue', className, {
        'GuidesSection__blue--bottom': bottom,
      })}
      {...props}
    />
  );
};

export const Image = ({ className, description, ...props }) => {
  return (
    <>
      <img className={cn('GuidesSection__image', className)} alt="" {...props} />
      {description && <p className="GuidesSection__image-description">{description}</p>}
    </>
  );
};

Image.propTypes = {
  className: string,
  description: node,
};