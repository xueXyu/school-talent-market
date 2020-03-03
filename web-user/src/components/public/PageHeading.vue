<template>
    <!-- Page Heading Section Start -->
    <div class="page-heading-section section bg-parallax" data-bg-image="static/images/bg/bg-1.jpg" data-overlay="50">
        <div class="container">
            <div class="page-heading-content text-center">
                <h3 class="title">{{pageData.name}}</h3>
                <ol class="breadcrumb">
                    <li class="breadcrumb-item" v-for="item in pageData.navs" v-bind:class="{'active':item.active}">
                        <router-link v-if="!item.active" :to="item.to">{{item.name}}</router-link>
                        <span v-else>{{item.name}}</span>
                    </li>
                </ol>
            </div>
        </div>
    </div>
    <!-- Page Heading Section End -->
</template>

<script>
    import '../../../src/assets/js/plugins/jquery.parallax';
    export default {
        name: "PageHeading",
        props: [
            "pageData"
        ],
        mounted:() => {
            $('[data-bg-image]').each(function () {
                var $this = $(this),
                    $image = $this.data('bg-image');
                $this.css('background-image', 'url(' + $image + ')');

            });

            $('.bg-parallax').each(function () {
                $(this).parallax("50%", 0.5);
            });
        }
    }
</script>

<style scoped>

</style>
