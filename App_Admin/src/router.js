import { createMemoryHistory, createRouter } from 'vue-router'

const routes = [
    {
        name: 'employee-list',
        path: '/employee/list',
        component: () => import('./components/Employee/List.vue')
    },
    {
        name: 'project-list',
        path: '/project/list',
        component: () => import('./components/Project/List.vue')
    },
    // {
    //     name: 'employee-update',
    //     path: ':id',
    //     component: EmployeeUpdate
    // }
]

const router = new createRouter({
    history: createMemoryHistory(),
    routes,
})

export default router