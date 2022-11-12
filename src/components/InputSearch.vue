<template>
    <input 
              style="width: 40%; float: right;"
              type="text" 
              placeholder="Find your document here..."
              :value="modelValue"
              @input="updateModelValue"
              @keyup.enter="submit"
          >
</template>
<script>
export default {
  props: {
    modelValue: {type: String, default: ""},
  },
  emits: ["submit", "update:modelValue"],
  methods: {
    updateModelValue(e) {
      this.$emit("update:modelValue", e.target.value)
    },
    submit() {
      this.$emit("submit")
    }
  }
}
</script>