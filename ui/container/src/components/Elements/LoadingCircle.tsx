import { CSSProperties } from 'react';

type LoadingCircleProps = {
  style?: CSSProperties;
  [x: string]: any;
}

export default (props: LoadingCircleProps) => {
  return (
    <div className='sk-dotcircle' style={props?.style}>
      <div className='sk-chase-dotcircle'></div>
      <div className='sk-chase-dotcircle'></div>
      <div className='sk-chase-dotcircle'></div>
      <div className='sk-chase-dotcircle'></div>
      <div className='sk-chase-dotcircle'></div>
      <div className='sk-chase-dotcircle'></div>
    </div>
  );
}