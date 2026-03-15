import { Area, Bar, Line } from "recharts";
import { CHARTTYPE } from "@/constant/chart-constant";

interface ChartProps {
    chart?: typeof CHARTTYPE[keyof typeof CHARTTYPE]; // "area" | "line" | "bar"
    ykey: string;
    color: string;
    gradientId?: string;
}

export default function Chart({
    chart = CHARTTYPE.AREA, // default to area
    ykey,
    color,
    gradientId,
}: ChartProps) {
    const commonProps = {
        type: "monotone" as const,
        dataKey: ykey,
        stroke: color,
        strokeWidth: 2,
        dot: { fill: "var(--color-surface-base)" },
        activeDot: { stroke: "var(--color-surface-base)" },
    };

    switch (chart) {
        case CHARTTYPE.LINE:
            return <Line {...commonProps} />;
        case CHARTTYPE.BAR:
            return <Bar {...commonProps} fill={color} />;
        case CHARTTYPE.AREA:
        default:
            return <Area {...commonProps} fill={gradientId ? `url(#${gradientId})` : color} />;
    }
}