<template>
    <span class="upperbody">
        <router-link to="/new">
            <div class="btn btn-primary">
                <i class="fa fa-plus"></i>
                New document    
            </div>
        </router-link>
    </span>
</template>

<script>
    export default {
        props: {
            document: { type: Object, default: null},
        }
    }
</script>