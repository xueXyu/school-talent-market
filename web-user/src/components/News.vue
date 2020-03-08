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

                    <NewsItem v-for="(item,index) in newsList" :key="index" :news-item-data="item"></NewsItem>

                </div>
                <!-- Blog Wrapper End -->

                <el-pagination
                    class="pagination"
                    background
                    layout="prev, pager, next"
                    @current-change="currentChange"
                    :page-size="page_size"
                    :total="page_count">
                </el-pagination>

            </div>
        </div>
        <!-- Blog Section End -->
    </div>
</template>

<script>
    import PageHeading from "./public/PageHeading";
    import NewsItem from "./public/NewsItem";

    export default {
        name: "News",
        components: {
            NewsItem,
            PageHeading
        },
        data() {
            return {
                pageData: {
                    'name': '新闻&公告',
                    'navs': [
                        {'name': 'Home', 'to': 'Home', 'active': false},
                        {'name': '新闻&公告', 'to': '', 'active': true},
                    ],
                },
                newsList: null,
                current_page: 1,
                page_count: 1,
                page_size: 9,
            }
        },
        methods: {
            currentChange(event) {
                this.current_page = (event - 1) * this.page_size;
                this.getNewsList();
            },
            async getNewsList() {
                try {
                    await this.http.get(this.api.News, {
                        limit: this.page_size,
                        offset: this.current_page,
                        order: ['created_at', 'DESC'],
                    }).then(res => {
                        if (res.code == 0) {
                            this.page_count = res.data.count;
                            this.newsList = res.data.rows;
                        } else {
                            this.$message.error(res.message);
                        }
                    });
                } catch (error) {
                    console.error(error);
                }
            },
        },
        mounted() {
            this.getNewsList();
        }
    }
</script>

<style scoped>
    .pagination {
        display: flex;
        justify-content: center;
        padding-top: 90px;
    }


</style>
