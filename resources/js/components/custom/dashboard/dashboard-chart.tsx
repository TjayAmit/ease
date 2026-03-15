import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer } from "recharts";
import { Chart, ChartWrapper } from "./ui";
import { CHARTTYPE } from "@/constant/chart-constant";

interface DashboardChartProps {
    chart?: typeof CHARTTYPE[keyof typeof CHARTTYPE];
    chartData: Array<Record<string, any>>;
    xKey: string;
    yKey: string;
    color: string;
    title?: string;
}

export default function DashboardChart({
    chart = CHARTTYPE.AREA,
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
                    <ChartWrapper chart={chart} chartData={chartData} xKey={xKey} gradientId={gradientId} color={color}>
                        <Chart chart={chart} ykey={yKey} color={color} gradientId={gradientId} />
                    </ChartWrapper>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}