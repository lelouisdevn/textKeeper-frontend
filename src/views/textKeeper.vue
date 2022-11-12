<template>

    <div>
        <span>
            <AddButton></AddButton>
            <span class="btn btn-success">Upload your file</span>
        </span>

        <span v-if="itemIndex >= 0" style="margin-left: 10px;">
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

        <InputSearch v-model="searchText"></InputSearch>

    </div>

    <div style="margin: 20px 0;">
        <h4>Your documents</h4>
        <DocumentList v-if="filterDocuments.length > 0" :documents="filterDocuments" v-model:itemIndex="itemIndex" />
    </div>

</template>

<script>
import InputSearch from "@/components/InputSearch.vue"
import DocumentList from "@/components/DocumentList.vue";
import AddButton from "@/components/AddButton.vue";
import DocumentService from "@/services/doc.service"
import EditForm from "@/components/EditForm.vue";


export default {
    components: {
        DocumentList,
        AddButton,
        EditForm,
        InputSearch
    },
    props: {
        // searchText: "",
    },
    emits: ["update:query"],
    data() {
        return {
            documents: [],
            itemIndex: -1,
            searchText: ""
        };
    },
    watch: {
        searchText() {
            this.itemIndex = -1;
        }
    },
    computed: {
        filterDocuments() {
            if (!this.searchText) return this.documents;
            return this.documents.filter((_doc, index) =>
                this.documents[index].filename.toLowerCase().includes(this.searchText))
        },
    },
    methods: {
        async getAllDocuments() {
            this.documents = await DocumentService.getAll();
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
                let name = e.target.value;
                let data = {};
                if (name.indexOf(".") > 0) {
                    data = { "filename": this.documents[this.itemIndex].filename, "extension": name.substring(name.indexOf(".")) }
                } else {
                    data = { "filename": this.documents[this.itemIndex].filename, "extension": "?" }
                }

                try {
                    await DocumentService.update(this.documents[this.itemIndex]._id, data);

                    this.message = "Saved";

                    this.getAllDocuments();
                } catch (error) {
                    console.log(error)
                }
            }
        },
    },
    mounted() {
        this.getAllDocuments();
    }
}

</script>

