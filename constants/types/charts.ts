/**
 * Formatted type for Candlestick charts
 */
export interface PriceChartEntry {
    time: number
    open: number
    close: number
    high: number
    low: number
  }

  export interface TvlChartEntry {
    date: number
    liquidityUSD: number
  }

  export interface VolumeChartEntry {
    date: number
    volumeUSD: number
  }