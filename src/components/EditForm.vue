<template>
    <div>
        <span class="btn btn-primary" @click="updateDocument">
            <i class="fas fa-save"></i> Save
        </span>
        <span style="margin-left: 10px;" @keydown="updateFilename">
            <input style="width: fit-content ;border: none" type="text" v-model="localDocument.filename">
        </span>
        <span style="margin-left: 40px;" v-if="message" class="" id="msg">
            <i class="fas fa-sync"></i> {{ this.message }}
        </span>

        <span style="float: right; font-size: 23px; margin-right: 10px;">
            <router-link to="/" style="color: black;">
                <i class="fas fa-close"></i>
            </router-link>
        </span>

        <select name="" id="" v-model="selected" required @change="updateFont" style="float: right; margin: 5px 10px; width: 20%;" >
            <option value="" selected="selected">Default</option>
            <option value="0" >Monospace</option>
            <option value="1" >Arial</option>
            <option value="2" >Ubuntu</option>
            <option value="3" >roboto</option>
        </select>
    </div>
    
    <textarea class="textfield" name="" id="" cols="30" rows="10" :style="{fontFamily: this.font}"
        v-model="localDocument.content">{{ document.content }}</textarea>
</template>

<script>
export default {
    props: {
        document: { type: Object, required: true },
        message: "",
    },
    emits: ["submit:document", "update:message"],
    data() {
        return {
            localDocument: this.document,
            localMessage: this.message,
            selected: "",
            sizeSelected: "",
            font: this.document.fontStyle,
            size: 15,
        };
    },
    methods: {
        updateFont() {
            const fonts = ["monospace", "arial", "ubuntu", "roboto"]
            this.font = fonts[this.selected];
        },
        updateDocument() {
            this.localMessage = "Saving..."
            this.localDocument["fontStyle"] = this.font;
            this.$emit("update:message", this.localMessage)
            setTimeout(() => {
                this.$emit("submit:document", this.localDocument)
            }, 3000);
        },
        updateFilename(e) {
            if (e.which == 13){
                this.updateDocument();
                $("input").blur()
            }
        }
    }
}
</script>

