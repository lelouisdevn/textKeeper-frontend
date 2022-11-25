<template>

    <div>
        <span>
            <AddButton></AddButton>
            <span class="btn btn-success" id="uploadF" @click="openFileDialogue">Upload your file</span>
            <input type="file" name="" id="fileDialogue" @change="uploadFile" style="display: none;">
        </span>

        <span v-if="itemIndex >= 0" style="margin-left: 10px;">
            <router-link :to="{
                name: 'document.edit',
                params: { id: this.documents[itemIndex]._id },
            }">
                <div class="btn btn-outline-secondary">
                    <i class="fas fa-edit"></i> Edit
                </div>
            </router-link>
        </span>
        <span v-if="itemIndex >= 0" style="margin-left: 10px;" @click="deleteDocument()">
            <div class="btn btn-outline-danger">
                <i class="fas fa-trash"></i> Delete
            </div>
        </span>
        <span v-if="itemIndex >= 0" style="margin-left: 10px;" @click="deleteDocument()">
            <div class="btn btn-outline-warning">
                <i class="fas fa-star"></i> Star
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
            if (!this.searchText) this.getAllDocuments
            return this.documents.filter((_doc, index) =>
                this.documents[index].filename.toLowerCase().includes(this.searchText))
        },
    },
    methods: {
        async getAllDocuments() {
            // this.documents = await DocumentService.getAll();
            let temp = await DocumentService.getAll()
            let document = []
            console.log(temp)
            for (let index = 0; index < temp.length; index++) {
                if (temp[index].status === "okay" || !temp[index].status) {
                    document.push(temp[index])
                }
            }
            this.documents = document;
        },
        async deleteDocument() {
            let data = {}
            data['documentID'] = this.documents[this.itemIndex]._id;
            await DocumentService.moveToTrash(data);
            let updateData = {}
            updateData["status"] = "false"
            try {
                await DocumentService.update(this.documents[this.itemIndex]._id, updateData);
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
        async uploadFile() {
            let file = document.getElementById("fileDialogue").files[0];
            let filename = file.name;
            let extension = "";
            filename.indexOf(".") > 0
                ? extension = filename.substring(filename.indexOf("."))
                : extension = "?"
            let reader = new FileReader()


            let newfile = {};
            reader.addEventListener("loadend", async () => {
                let data = reader.result;
                console.log(data)
                newfile = { "filename": filename, "content": data, "extension": extension };
                console.log(newfile)
                await DocumentService.create(newfile)
                this.getAllDocuments()
            });
            reader.readAsText(file);

            
        },
        async openFileDialogue() {
            $("#fileDialogue").trigger("click");
        }
    },
    mounted() {
        this.getAllDocuments();
    }   
}


</script>

