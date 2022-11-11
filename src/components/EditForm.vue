<template>
    <span class="btn btn-primary">
        <i class="fas fa-save"></i> Save
    </span>
    <span>{{ document.filename }}</span>
    <textarea class="textfield" name="" id="" cols="30" rows="10">{{ document.content }}</textarea>
</template>

<script>
export default {
    props: {
        document: { type: Object, required: true }
    }
}
</script>