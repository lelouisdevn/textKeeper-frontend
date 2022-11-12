<template>

    <div>
        <AddButton></AddButton>
        <span v-if="itemIndex >= 0">
            <router-link :to="{
                name: 'document.edit',
                params: { id: this.documents[itemIndex]._id },
            }">
                <div class="btn btn-outline-secondary">
                    <i class="fas fa-edit"></i>
                </div>
            </router-link>
        </span>
        <span v-if="itemIndex >= 0" style="margin-left: 10px;" @click="deleteDocument()">
            <div class="btn btn-outline-secondary">
                <i class="fas fa-trash"></i>
            </div>
        </span>
        <span v-if="itemIndex >= 0" style="margin-left: 10px;">
            <input type="text" v-model="this.documents[itemIndex].filename" style="border: none;" @keydown="rename">
        </span>
    </div>

    <div style="margin: 20px 0;">
        <h4>Your documents</h4>
        <DocumentList v-if="filterDocuments.length > 0" :documents="filterDocuments" v-model:itemIndex="itemIndex" />
    </div>

</template>

<script>

import DocumentList from "@/components/DocumentList.vue";
import AddButton from "@/components/AddButton.vue";
import DocumentService from "@/services/doc.service"
import EditForm from "../components/EditForm.vue";
export default {
    components: {
        DocumentList,
        AddButton,
        EditForm
    },
    data() {
        return {
            documents: [],
            itemIndex: -1,
            searchText: "",
        };
    },
    computed: {
        filterDocuments() {
            return this.documents;
        },
    },
    methods: {
        async getAllDocuments() {
            try {
                this.documents = await DocumentService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        async deleteDocument() {
            try {
                await DocumentService.delete(this.documents[this.itemIndex]._id);
                this.itemIndex = -1;
                this.getAllDocuments()
            } catch (error) {
                console.log(error)
            }
        },
        async rename(e) {
            if (e.which == 13) {
                $("input").blur()
                let data = {"filename": this.documents[this.itemIndex].filename, }
                try {
                    await DocumentService.update(this.documents[this.itemIndex]._id, data);
                    this.message = "Saved";
                } catch (error) {
                    console.log(error)
                }
            }
        }
    },
    mounted() {
        this.getAllDocuments();
    }
}

</script>

