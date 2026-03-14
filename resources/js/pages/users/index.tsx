import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: '/users'
    },
];

export default function index() {
    return (
        <AppLayout breadcrumbs={breadcrumbs} >
            <Head title="Users" />
            <div className="flex flex-1 flex-col gap-6 p-6" >
                Test
            </div>
        </AppLayout>
    );
}
