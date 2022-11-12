<script>

export default {
    props: {
        documents: { type: Array, default: [] },
        itemIndex: { type: Number, default: -1 },
        extension: { type: Array, default: [] },
    },
    emits: ["update:itemIndex"],
    methods: {
        updateItemIndex(index) {
            this.$emit("update:itemIndex", index);
        },
    },
    created() {
        console.log(this.extension)
    }
}


</script>

<template>
    <div 
        v-for="(text, index) in documents"
        :key="text._id" 
        class="elements"
        
        @click="updateItemIndex(index)"
        style="width: 135px; display: inline-block; margin: 10px; cursor: pointer;">
        <div></div>
        <div class="card text-white mb-3" style="background-color: whitesmoke">
            <div class="card-body" style="height: 160px; font-size: 30px; color: black; text-align: center; display: flex; justify-content: center; align-items: center;">
            <span>{{ text.extension }}</span>
            </div>
        </div>
        <div style="text-align: center;">
            {{ text.filename }}
        </div>
    </div>
</template>