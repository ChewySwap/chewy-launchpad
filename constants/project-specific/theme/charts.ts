
type TextTheme = {
    fontFamily: string;
    fontSize: number;
    color: {
        text: string;
        textSubtle: string;
    },
}
type CandleStickTheme = {
    upColor: string;
    downColor: string;
    borderDownColor: string;
    borderUpColor: string;
    wickDownColor: string;
    wickUpColor: string;
}
interface ChartTheme {
    text: TextTheme;
    candleStick: CandleStickTheme;
}
export const chartTheme: ChartTheme = {
    text: {
        fontFamily: "Kanit, sans-serif",
        fontSize: 12,
        color: {
            text: '#FFF',
            textSubtle: '#333',
        },
    },
    candleStick: {
        upColor: '#00ff5e',
        downColor: '#ff5e23',
        borderDownColor: '#ff5e23',
        borderUpColor: '#00ff5e',
        wickDownColor: '#d800c2',
        wickUpColor: '#00ffe5',
    }
}
