import { Area, Line } from "recharts";

interface ChartProps {
    chart?: "area" | "line";
    ykey: string;
    color: string;
    gradientId?: string;
}

export default function Chart({ chart = "area", ykey, color, gradientId }: ChartProps) {
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