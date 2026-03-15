import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Area,
    AreaChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    XAxis,
    YAxis,
} from "recharts";

interface DashboardChartProps {
    chartData: Array<Record<string, any>>;
    xKey: string;
    yKey: string;
    color: string;
    title?: string;
}

export default function DashboardChart({
    chartData,
    xKey,
    yKey,
    color,
    title = "System Overview",
}: DashboardChartProps) {
    const gradientId = `stat-gradient-${color.replace("#", "")}`;

    return (
        <Card className="relative h-full gap-1 bg-[#18181b] overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 z-10 mb-4">
                <CardTitle>{title}</CardTitle>
            </CardHeader>

            <CardContent className="h-full pl-2">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                                <stop offset="95%" stopColor={color} stopOpacity={0} />
                            </linearGradient>
                        </defs>

                        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-3)" />

                        <XAxis
                            dataKey={xKey}
                            tick={{ fontSize: 11, fill: "#9ca3af" }}
                            tickLine={{ strokeWidth: 0.5 }}
                            axisLine={{ strokeWidth: 0.5 }}
                            tickMargin={8}
                        />

                        <YAxis
                            tick={{ fontSize: 11, fill: "#9ca3af" }}
                            tickLine={{ strokeWidth: 0.5 }}
                            axisLine={{ strokeWidth: 0.5 }}
                            tickMargin={8}
                        />

                        <Legend />

                        <Area
                            type="monotone"
                            dataKey={yKey}
                            stroke={color}
                            strokeWidth={2}
                            fill={`url(#${gradientId})`}
                            dot={{ fill: "var(--color-surface-base)" }}
                            activeDot={{ stroke: "var(--color-surface-base)" }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}