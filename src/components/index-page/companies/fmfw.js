import React from 'react';

import ActiveImage from '../../../assets/images/investor-logos/FMFW.io/Color.png';
import InactiveImage from '../../../assets/images/investor-logos/FMFW.io/Mono.png';

const Active = (props) => (
  <img alt="" {...props} src={ActiveImage} />
);

const Inactive = (props) => (
  <img alt="" {...props} src={InactiveImage} />
);

const FMFW = ({ className }) => {
  return (
    <div>
      <Active className={`${className} ${className}--active`} />
      <Inactive className={`${className} ${className}--inactive`} />
    </div>
  );
};

export default FMFW;