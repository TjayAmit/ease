import { Head } from '@inertiajs/react';
import { Activity, Users, UserPlus, Zap } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardCard } from '@/components/custom/dashboard';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
    },
];

type User = {
    id: number;
    name: string;
    email: string;
    created_at: string;
};

type Stats = {
    total_users: number;
    new_users_today: number;
    peak_requests: string;
    active_sessions: number;
};

interface DashboardProps {
    stats: Stats;
    recent_users: User[];
}

export default function Dashboard({ stats, recent_users }: DashboardProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex flex-1 flex-col gap-6 p-6">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <DashboardCard
                        title="Total Users"
                        value={stats.total_users.toLocaleString()}
                        change="+20.1% from last month"
                        icon={<Users className="w-4 text-muted-foreground" />}
                    />

                    <DashboardCard
                        title="New Users Today"
                        value={stats.new_users_today.toLocaleString()}
                        change="+20.1% from last month"
                        icon={<UserPlus className="w-4 text-muted-foreground" />}
                        color='gray'
                    />

                    <DashboardCard
                        title="Peak Requests"
                        value={stats.peak_requests}
                        change="Requests/min"
                        icon={<Zap className="w-4 text-muted-foreground text-amber-900" />}
                        color='orange'
                    />

                    <DashboardCard
                        title="Active Sessions"
                        value={stats.active_sessions.toLocaleString()}
                        change="Currently online"
                        icon={<Activity className="w-4 text-muted-foreground" />}
                        color='teal'
                    />
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                    <Card className="col-span-4 lg:col-span-4">
                        <CardHeader>
                            <CardTitle>System Overview</CardTitle>
                        </CardHeader>
                        <CardContent className="pl-2">
                            <div className="h-[300px] w-full bg-sidebar rounded-xl border border-sidebar-border/50 flex items-center justify-center p-6 text-muted-foreground">
                                <span className="flex items-center gap-2">
                                    <Activity className="h-5 w-5" /> Analytics Chart Visualization
                                </span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="col-span-3">
                        <CardHeader>
                            <CardTitle>Recent Users</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-8">
                                {recent_users.map((user) => (
                                    <div key={user.id} className="flex items-center">
                                        <div className="ml-4 space-y-1">
                                            <p className="text-sm font-medium leading-none">{user.name}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {user.email}
                                            </p>
                                        </div>
                                        <div className="ml-auto font-medium text-sm text-muted-foreground">
                                            {new Date(user.created_at).toLocaleDateString()}
                                        </div>
                                    </div>
                                ))}
                                {recent_users.length === 0 && (
                                    <div className="text-sm text-muted-foreground py-4 text-center">
                                        No recent users found.
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
