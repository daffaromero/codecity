import { DependencyList, EffectCallback, useEffect, useLayoutEffect, useRef } from 'react'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import type { Dispatch, RootState } from '@/store'

export const useAppDispatch = () => useDispatch<Dispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

const useFirstMountState = (): boolean => {
  const isFirst = useRef(true)

  if (isFirst.current) {
    isFirst.current = false

    return true
  }

  return isFirst.current
}

export const useUpdateEffect: typeof useEffect = (effect: EffectCallback, deps?: DependencyList) => {
  const isFirstMount = useFirstMountState()

  useEffect(() => {
    if (!isFirstMount) {
      return effect()
    }
  }, deps)
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const useBrowserLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : () => {}
