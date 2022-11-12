<template>
    <div>
        <div>
            <EditForm :document="document" :message="message" @submit:document="updateDocument"
                @update:message="updateMessage">
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
            document: { type: Object, default: null },
            message: "",
        }
    },
    methods: {
        async updateDocument(data) {
            try {
                let doc = await DocumentService.create(data);

                this.message = "Saved";

                this.$router.push({
                    name: "document.edit",
                    params: { id: doc._id }
                })
            } catch (error) {
                console.log(error)
            }
        },
        async updateMessage() {
            this.message = "Saving..."
        }
    },
    created() {
        this.document.filename = "New Document.txt";
    }
}
</script>