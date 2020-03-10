<template>
    <!-- Testimonial Start -->
    <div class="col">
        <div class="testimonial text-center text-white">
            <p>{{feedbaItem.feedback}}</p>
            <img :src="feedbaItem.head" alt="">
            <h6 class="name">{{feedbaItem.name}}</h6>
            <span class="title">{{feedbaItem.title}}</span>
        </div>
    </div>
    <!-- Testimonial End -->
</template>

<script>
    export default {
        name: "RespondentsItem",
        props: ['feedbaItem']
    }
</script>

<style scoped>

</style>
