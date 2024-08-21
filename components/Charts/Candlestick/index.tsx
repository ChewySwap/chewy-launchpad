"use client";
import { ChartLoading } from '@/components/Charts/ChartsLoading'
import dayjs from 'dayjs'
import { ColorType, IChartApi, createChart } from 'lightweight-charts'
import { chartTheme as theme } from '@/constants/project-specific/theme/charts'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'

const CANDLE_CHART_HEIGHT = 250

export type LineChartProps = {
  data: any[] | null | undefined
  setValue?: Dispatch<SetStateAction<number | undefined>> // used for value on hover
  setLabel?: Dispatch<SetStateAction<string | undefined>> // used for value label on hover
} & React.HTMLAttributes<HTMLDivElement>

const CandleChart = ({ data, setValue, setLabel }: LineChartProps) => {

  const chartRef = useRef<HTMLDivElement>(null)
  const [chartCreated, setChart] = useState<IChartApi | undefined>()

  // if chart not instantiated in canvas, create it
  useEffect(() => {
    if (!chartRef.current || !data) return
    const chart = createChart(chartRef.current, {
      autoSize: true,
      // height: CANDLE_CHART_HEIGHT,
      // width: chartRef.current.parentElement.clientWidth - 32,
      layout: {
        attributionLogo: false,
        background: {
          type: ColorType.Solid,
          color: 'transparent',
        },
        textColor: theme.text.color.textSubtle,
        fontFamily: theme.text.fontFamily,
        fontSize: theme.text.fontSize,
      },
      rightPriceScale: {
        scaleMargins: {
          top: 0.1,
          bottom: 0.1,
        },
        borderVisible: false,
      },
      timeScale: {
        borderVisible: false,
        secondsVisible: true,
        tickMarkFormatter: (unixTime: number) => {
          return dayjs.unix(unixTime).format('MM/DD h:mm a')
        },
      },
      watermark: {
        visible: false,
      },
      grid: {
        horzLines: {
          visible: false,
        },
        vertLines: {
          visible: false,
        },
      },
      crosshair: {
        horzLine: {
          visible: false,
          labelVisible: false,
        },
        mode: 1,
        vertLine: {
          visible: true,
          labelVisible: false,
          style: 3,
          width: 1,
          color: theme.text.color.textSubtle,
          labelBackgroundColor: theme.text.color.text,
        },
      },
    })

    chart.timeScale().fitContent()
    setChart(chart)
    // if (!chartCreated && data && !!chartRef?.current?.parentElement) {
    // }

    const series = chart.addCandlestickSeries({
      upColor: theme.candleStick.upColor,
      downColor: theme.candleStick.downColor,
      borderDownColor: theme.candleStick.borderDownColor,
      borderUpColor: theme.candleStick.borderUpColor,
      wickDownColor: theme.candleStick.wickDownColor,
      wickUpColor: theme.candleStick.wickUpColor,
    })

    series.setData(data)

    chart.applyOptions({
      layout: {
        textColor: theme.text.color.text,
      },
    })

    // update the title when hovering on the chart
    chart.subscribeCrosshairMove((param) => {
      if (
        chartRef?.current &&
        (param === undefined ||
          param.time === undefined ||
          (param && param.point && param.point.x < 0) ||
          (param && param.point && param.point.x > chartRef.current.clientWidth) ||
          (param && param.point && param.point.y < 0) ||
          (param && param.point && param.point.y > CANDLE_CHART_HEIGHT))
      ) {
        // reset values
        if (setValue) setValue(undefined)
        if (setLabel) setLabel(undefined)
      } else if (series && param) {
        const timestamp = param.time as number
        const now = new Date(timestamp * 1000)
        const time = `${now.toLocaleString('en-us', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          timeZone: 'UTC',
        })} (UTC)`
        const parsed = param.seriesData.get(series) as { open: number } | undefined
        if (setValue) setValue(parsed?.open)
        if (setLabel) setLabel(time)
      }
    })

    // eslint-disable-next-line consistent-return
    return () => {
      if (chart) {
        chart.remove()
        setChart(undefined)
      }
    }
  }, [data, setLabel, setValue])

  return (
    <>
      {!chartCreated && <ChartLoading />}
      <div className="flex flex-col content-center items-center self-center w-full">
        <div className="flex w-[500px] h-[200px]" ref={chartRef} />
      </div>
    </>
  )
}

export default CandleChart