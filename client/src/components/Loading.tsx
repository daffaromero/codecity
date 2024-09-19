import { useNProgress } from '@tanem/react-nprogress'
import React from 'react'

interface LoadingProps {
  isRouteChanging: boolean
}

const Loading: React.FC<LoadingProps> = ({ isRouteChanging }) => {
  const { animationDuration, isFinished, progress } = useNProgress({
    isAnimating: isRouteChanging,
  })

  return (
    <>
      <style jsx>
        {`
          .loading {
            opacity: ${isFinished ? 0 : 1};
            pointer-events: none;
            transition: opacity ${animationDuration}ms linear;
          }

          .bar {
            background: #386bed;
            height: 2px;
            left: 0;
            margin-left: ${(-1 + progress) * 100}%;
            position: fixed;
            top: 0;
            transition: margin-left ${animationDuration}ms linear;
            width: 100%;
            z-index: 1031;
          }

          .spinner {
            box-shadow: 0 0 10px #386bed, 0 0 5px #386bed;
            display: block;
            height: 100%;
            opacity: 1;
            position: absolute;
            right: 0;
            transform: rotate(3deg) translate(0px, -4px);
            width: 100px;
          }
        `}
      </style>

      <div className='loading'>
        <div className='bar'>
          <div className='spinner' />
        </div>
      </div>
    </>
  )
}

export default React.memo(Loading)
