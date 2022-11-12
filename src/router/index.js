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
        path: "/new",
        name: "document.new",
        component: () => import("@/views/NewDocument.vue"),
        props: true
    },
    {
        path: "/edit/:id",
        name: "document.edit",
        component: () => import("@/views/Document.vue"),
        props: true
    },
    {
        path: "/delete/:id",
        name: "document.delete",
    }
];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});
export default router;