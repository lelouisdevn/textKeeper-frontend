import { createWebHistory, createRouter } from "vue-router";
import textKeeper from "@/views/textKeeper.vue";
const routes = [
    {
        path: "/",
        name: "textKeeper",
        component: textKeeper,
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),
    },
    {
        path: "/edit/:id",
        name: "document.edit",
        component: () => import("@/views/Document.vue"),
        props: true

    }
];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});
export default router;