<template>
    <div>
        <div>
            <EditForm 
            :document="document"
            :message="message"
            @submit:document="updateDocument"
            @update:message="updateMessage"
            >
            </EditForm>
        </div>
    </div>
</template>

<script>
import DocumentService from "@/services/doc.service"
import EditForm from "@/components/EditForm.vue"
export default {
    components: {
        EditForm,
    },
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            document: null,
            message: "",
        }
    },
    methods: {
        async getDocument(id) {
            try {
                this.document = await DocumentService.get(id);
            }catch (error) {
                console.log(error);
            }
        },
        async updateDocument(data) {
            try {
                let data1 = data
                let ext = data1.filename.substring(data.filename.indexOf("."))
                if (ext) {
                    data["extension"] = ext;
                }else {
                    data["extension"] = "?";
                }
                
                await DocumentService.update(this.document._id, data);
                this.message = "Saved";
            } catch (error) {
                console.log(error)
            }
        },
        async updateMessage() {
            this.message = "Saving..."
        }
    },
    created() {
        this.getDocument(this.id);
    }
}
</script>