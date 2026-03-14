import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Roles',
        href: '/roles'
    },
];

export default function index() {
    return (
        <AppLayout breadcrumbs={breadcrumbs} >
            <Head title="Roles" />
            <div className="flex flex-1 flex-col gap-6 p-6" >
                Roles
            </div>
        </AppLayout>
    );
}
