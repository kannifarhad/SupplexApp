import React from 'react';

type LoadingOpacityProps = {
  loading: boolean;
  children: React.ReactNode;
  [x: string]: any;
}


export default ({ loading, children }: LoadingOpacityProps) => {
  return (
    <div className='loadingContentWrapper'>
      {loading && <div className='loadingContentConatiner'>
        <div className='animated-background'></div>
        <LoadingIcon />
        <div className='text'>Gözləyin</div>
      </div>
      }
      {children}
    </div>
  )
}

const LoadingIcon = () => {
  return (
    <div className='contentLoaderIcon'>
      <div className='inner one'></div>
      <div className='inner two'></div>
      <div className='inner three'></div>
    </div>
  );
}