import { useState, useEffect } from 'react';

export type DeviceLevel = 'high' | 'medium' | 'low';

/**
 * 设备性能检测 hook
 * 根据屏幕宽度、CPU 核心数和设备内存判断设备等级
 * - low: 手机或低端平板（<768px，或核心数<=4）
 * - medium: 中端平板/笔记本（768-1024px 且核心数>4）
 * - high: 桌面高性能设备（>1024px）
 */
export function useDevicePerformance(): DeviceLevel {
  const [level, setLevel] = useState<DeviceLevel>(() => {
    if (typeof window === 'undefined') return 'high';
    return detectLevel();
  });

  useEffect(() => {
    setLevel(detectLevel());
  }, []);

  return level;
}

function detectLevel(): DeviceLevel {
  if (typeof window === 'undefined') return 'high';

  const width = window.innerWidth;
  const cores = navigator.hardwareConcurrency || 4;
  const memory = (navigator as any).deviceMemory as number | undefined;

  // 手机：直接低端
  if (width < 768) return 'low';

  // 平板区间
  if (width <= 1024) {
    // 低核心数或低内存 → low
    if (cores <= 4 || (memory !== undefined && memory <= 4)) return 'low';
    return 'medium';
  }

  // 桌面但硬件差
  if (cores <= 2) return 'medium';

  return 'high';
}

export default useDevicePerformance;
