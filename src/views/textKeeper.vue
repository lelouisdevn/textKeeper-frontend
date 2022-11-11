<template>
    <div>
        <AddButton></AddButton>
        <span v-if="itemIndex >= 0">
            <router-link :to="{
                name: 'document.edit',
                params: { id: this.documents[itemIndex]._id },
            }">
                <div class="btn btn-outline-secondary">Edit</div>
            </router-link>
        </span>
    </div>

    <div style="margin: 20px 0;">
        <h4>Your documents</h4>
        <!-- <h5>{{ this.itemIndex }}</h5> -->
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
        activeDocument() {
            if (this.itemIndex < 0) return null;
            return this.filterDocuments[this.itemIndex];
        }
    },
    methods: {
        async getAllDocuments() {
            try {
                this.documents = await DocumentService.getAll();
            } catch (error) {
                console.log(error);
            }
        }
    },
    mounted() {
        this.getAllDocuments();
    }
}

</script>

