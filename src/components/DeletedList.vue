<script>
import DocumentService from "@/services/doc.service"
export default {
    props: {
        deletedList: { type: Array, default: [] },
    },
    data() {
        return {
            documents: [],
            finalList: [],
        }
    },
    methods: {
        async getDeletedFiles() {
            this.documents = await DocumentService.getAll()
            for (let index = 0; index < this.deletedList.length; index++) {
                let documentId = this.deletedList[index].documentID;
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

            this.deletedList.forEach(element => {
                if (element.documentID == this.finalList[index]._id) {
                    DocumentService.restore(this.deletedList[index]._id)
                }
            });
        }
    },
    created() {
        this.finalList = []
        this.getDeletedFiles();
    }
}
</script>
<template>
    <div style="margin-top: 30px;">
        <h4>Deleted Files</h4>
    </div>
    <div v-for="(text, index) in this.finalList" style="margin: 20px 0 0 0;">
        <div
            style="width: 100%; border: solid black 1px; border-radius: 7px; padding: 10px; background-color: whitesmoke; color: black">
            <router-link :to="{
                name: 'document.edit',
                params: { id: this.finalList[index]._id }
            }">{{ this.finalList[index].filename }}</router-link>

            <span style="float: right; margin: 0 10px; color: black;" @click="restore(index)">
                <i class="fas fa-refresh"></i>
            </span>
        </div>

    </div>
</template>