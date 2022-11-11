<template>
    <div>
        <div>
            <EditForm :document="document"></EditForm>
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
        }
    },
    methods: {
        async getDocument(id) {
            try {
                this.document = await DocumentService.get(id);
            }catch (error) {
                console.log(error);
            }
        }
    },
    created() {
        this.getDocument(this.id);
    }
}
</script>