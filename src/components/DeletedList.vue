<script>
// import DocumentService from "@/services/doc.service"
export default {
    props: {
        finalList: { type: Array, default: [] },
        itemIndex: { type: Number, default: -1},
    },
    emits: ["update:itemIndex"],
    methods: {
        restore(index) {
            this.$emit("update:itemIndex", index)
        }
    },
    created() {

    }
}
</script>
<template>
    <div style="margin-top: 30px;">
        <h4>Deleted Files</h4>
    </div>
    <div v-for="(text, index) in this.finalList" style="margin: 10px 7px; width: auto; display: inline-block;">
        <div
            style="width: 100%; border: solid black 1px; border-radius: 7px; padding: 10px; background-color: whitesmoke;">
            <router-link :to="{
                name: 'document.edit',
                params: { id: this.finalList[index]._id }
            }">
                <span style="color: black;">
                    {{ this.finalList[index].filename }}
                </span>
            </router-link>

            <span style="float: right; margin: 0 10px; color: black;" @click="restore(index)">
                <i class="fas fa-refresh"></i>
            </span>
        </div>

    </div>
</template>