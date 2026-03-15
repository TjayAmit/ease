import { Area, Line } from "recharts";
import { CHARTTYPE } from "@/constant/chart-constants";

interface ChartProps {
    chart?: typeof CHARTTYPE[keyof typeof CHARTTYPE];
    ykey: string;
    color: string;
    gradientId?: string;
}

export default function Chart({ chart, ykey, color, gradientId }: ChartProps) {
    const commonProps = {
        type: "monotone" as const,
        dataKey: ykey,
        stroke: color,
        strokeWidth: 2,
        dot: { fill: "var(--color-surface-base)" },
        activeDot: { stroke: "var(--color-surface-base)" },
    };

    if (chart === "line") {
        return <Line {...commonProps} />;
    }

    return <Area {...commonProps} fill={gradientId ? `url(#${gradientId})` : color} />;
}