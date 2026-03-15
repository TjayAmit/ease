import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@radix-ui/react-dropdown-menu";
import {
    AreaChart,
    Area,
    ResponsiveContainer,
} from "recharts";

interface DashboardCardProps {
    title: string;
    value: string;
    change: string;
    icon: React.ReactNode;
    chartData?: number[];
    color?: string;
}

export default function DashboardCard({ title, value, change, icon, chartData = [7, 2, 10, 3, 15, 4, 17], color = "#22c55e" }: DashboardCardProps) {
    const data = chartData.map((v, i) => ({
        name: i,
        value: v,
    }));

    const gradientId = `stat-gradient-${title.replace(/\s+/g, "-").toLowerCase()}`;

    return (
        <Card className="relative h-32 gap-1 dark:bg-[#18181b] overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 z-10">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                {icon}
            </CardHeader>

            <CardContent className="z-10">
                <div className="text-3xl font-bold mb-1">{value}</div>
                <Label className="text-xs" style={{ color }}>{change}</Label>
            </CardContent>

            {chartData.length > 0 && (
                <div className="absolute bottom-0 left-0 w-full h-10 opacity-40">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                                    <stop offset="95%" stopColor={color} stopOpacity={0} />
                                </linearGradient>
                            </defs>

                            <Area
                                type="monotone"
                                dataKey="value"
                                stroke={color}
                                strokeWidth={2}
                                fill={`url(#${gradientId})`}
                                dot={false}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            )}
        </Card>
    );
}