<template>
    <div class="trashbin row">
        <div class="col-8">
            <span class="btn btn-outline-primary" @click="restore(itemIndex)">
                <i class="fas fa-refresh"></i> Restore
            </span>
            <span class="btn btn-outline-danger" @click="restore(itemIndex)">
                <i class="fas fa-trash"></i> Delete
            </span>
            <span v-if="itemIndex >= 0">
                {{ this.finalList[itemIndex].filename }}
            </span>
        </div>
        <div class="col-4" style="text-align: right;">
            <span class="btn btn-outline-secondary" @click="restoreAllItems()">Restore all</span>
            <span class="btn btn-danger" @click="emptyTrash()">Empty trash</span>
        </div>
    </div>
    <hr>
    <DeletedList :finalList="this.finalList" v-model:itemIndex="itemIndex"></DeletedList>
</template>
<script>
import DeletedList from "@/components/DeletedList.vue"
import DocumentService from "@/services/doc.service"
export default {
    components: {
        DeletedList,
    },
    data() {
        return {
            deletedFiles: [],
            itemIndex: -1,
            documents: [],
            finalList: [],
        }
    },
    methods: {
        async getDeletedFile() {
            this.deletedFiles = await DocumentService.getDeletedFile()
            this.documents = await DocumentService.getAll()

            for (let index = 0; index < this.deletedFiles.length; index++) {
                let documentId = this.deletedFiles[index].documentID;
                for (let j = 0; j < this.documents.length; j++) {
                    if (this.documents[j]._id === documentId) {
                        this.finalList.push(this.documents[j]);
                    }
                }
            }
        },
        async restore(index) {
            let data = {}
            data["status"] = "okay"

            await DocumentService.update(this.finalList[index]._id, data)

            this.deletedFiles.forEach(element => {
                if (element.documentID == this.finalList[index]._id) {
                    DocumentService.restore(this.deletedFiles[index]._id)
                    this.itemIndex = -1;
                }
            })

            this.finalList = []
            this.getDeletedFile()
        },
        async restoreAllItems() { },
        async emptyTrash() { },
    },
    created() {
        this.getDeletedFile()
        console.log(this.finalList)
    }
}
</script>
<style>
.trashbin span {
    margin: 0 5px;
}
</style>