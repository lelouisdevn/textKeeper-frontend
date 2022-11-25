<template>
    <div class="trashbin">
        <span class="btn btn-outline-secondary">Restore all</span>
        <span class="btn btn-outline-danger">Empty trash</span>
    </div>

    <DeletedList :deletedList="this.deletedFiles"></DeletedList>
</template>
<script>
import DeletedList from "@/components/DeletedList.vue"
import DocumentService from "@/services/doc.service"
export default {
    components: {
        DeletedList,
    },
    // props: {
    //     deletedFiles: { type: Array, default: [] }
    // },
    data() {
        return {
            deletedFiles: [],
        }
    },
    methods: {
        async getDeletedFile() {
            this.deletedFiles = await DocumentService.getDeletedFile()
        }
    },
    mounted() {
        this.getDeletedFile()
    }
}
</script>
<style>
.trashbin span {
    margin: 0 5px;
}
</style>