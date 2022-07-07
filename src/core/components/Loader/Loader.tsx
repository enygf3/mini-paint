import { TailSpin } from 'react-loader-spinner';
import { ReactElement } from 'react';
import React from 'react';
import './styles.sass';

const Loader = (): ReactElement => {
  return (
    <div className="loader">
      <TailSpin color="#00BFFF" height={80} width={80} />
    </div>
  );
};

export default React.memo(Loader);
