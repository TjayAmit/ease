import { AreaChart, LineChart, CartesianGrid, XAxis, YAxis, Legend } from "recharts";

interface ChartWrapperProps {
    chart?: "area" | "line";
    chartData: Array<Record<string, any>>;
    xKey: string;
    gradientId: string;
    color: string;
    children: React.ReactNode;
}

export default function ChartWrapper({
    chart = "area",
    chartData,
    xKey,
    gradientId,
    color,
    children,
}: ChartWrapperProps) {
    // Shared chart props
    const chartProps = {
        data: chartData,
        margin: { top: 10, right: 10, left: 0, bottom: 0 },
    };

    // Shared axes
    const xAxis = (
        <XAxis
            dataKey={xKey}
            tick={{ fontSize: 11, fill: "#9ca3af" }}
            tickLine={{ strokeWidth: 0.5 }}
            axisLine={{ strokeWidth: 0.5 }}
            tickMargin={8}
        />
    );

    const yAxis = (
        <YAxis
            tick={{ fontSize: 11, fill: "#9ca3af" }}
            tickLine={{ strokeWidth: 0.5 }}
            axisLine={{ strokeWidth: 0.5 }}
            tickMargin={8}
        />
    );

    const grid = <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-3)" />;
    const legend = <Legend />;

    // Gradient for Area or Line
    const defs = (
        <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
        </defs>
    );

    return chart === "line" ? (
        <LineChart {...chartProps}>
            {defs}
            {grid}
            {xAxis}
            {yAxis}
            {legend}
            {children}
        </LineChart>
    ) : (
        <AreaChart {...chartProps}>
            {defs}
            {grid}
            {xAxis}
            {yAxis}
            {legend}
            {children}
        </AreaChart>
    );
}