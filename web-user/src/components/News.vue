<template>
    <div>
        <!--OffCanvas Overlay-->
        <div class="offcanvas-overlay"></div>

        <!-- Page Heading Section Start -->
        <PageHeading :page-data="pageData"></PageHeading>
        <!-- Page Heading Section End -->

        <!-- Blog Section Start -->
        <div class="section section-padding">
            <div class="container">

                <!-- Blog Wrapper Start -->
                <div class="blog-wrap row">

                    <NewsItem></NewsItem>
                    <NewsItem></NewsItem>
                    <NewsItem></NewsItem>
                    <NewsItem></NewsItem>
                    <NewsItem></NewsItem>
                    <NewsItem></NewsItem>
                    <NewsItem></NewsItem>
                    <NewsItem></NewsItem>
                    <NewsItem></NewsItem>

                </div>
                <!-- Blog Wrapper End -->

                <Pagination></Pagination>

            </div>
        </div>
        <!-- Blog Section End -->
    </div>
</template>

<script>
    import PageHeading from "./public/PageHeading";
    import NewsItem from "./public/NewsItem";
    import Pagination from "./public/Pagination";

    export default {
        name: "News",
        components: {
            NewsItem,
            Pagination,
            PageHeading
        },
        data() {
            return {
                pageData: {
                    'name':'工作名称',
                    'navs':[
                        {'name':'Home','to':'Home','active':false},
                        {'name':'Jobs','to':'Jobs','active':false},
                        {'name':'工作名称','to':'','active':true},
                    ],
                }
            }
        },
    }
</script>

<style scoped>

</style>
