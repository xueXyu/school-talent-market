<template>
    <div>
        <!--OffCanvas Overlay-->
        <div class="offcanvas-overlay"></div>

        <!-- Page Heading Section Start -->
        <PageHeading :page-data="pageData"></PageHeading>
        <!-- Page Heading Section End -->

        <!-- Blog Section Start -->
        <div class="section section-padding" v-if="newsInfo">
            <div class="container">
                <div class="row mb-n5">

                    <div class="col-lg-8 col-12 mb-5 pr-lg-5">

                        <!-- Blog Wrapper Start -->
                        <div class="blog-wrap row">

                            <!-- Blog Single Start -->
                            <div class="col-12">
                                <div class="blog blog-single">
                                    <div class="media">
                                        <el-image
                                            style="width: 100%;"
                                            :src="this.util.getHost()+newsInfo.title_img"
                                            fit="fit"></el-image>
                                    </div>
                                    <div class="content">
                                        <h6 class="title">{{newsInfo.title}}</h6>
                                        <ul class="meta">
                                            <li>{{newsInfo.created_at}}</li>
                                        </ul>
                                        <div class="desc" v-html="newsInfo.content"></div>
                                        <div class="foot row justify-content-between align-items-start mb-n2">
                                            <div class="blog-share col-auto mb-2">
                                                <ul>
                                                    <li><strong>Share:</strong></li>
                                                    <li><a href="/"><i class="fa fa-qq"></i></a></li>
                                                    <li><a href="/"><i class="fa fa-wechat"></i></a></li>
                                                    <li><a href="/"><i class="fa fa-weibo"></i></a></li>
                                                    <li><a href="/"><i class="fa fa-facebook"></i></a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- Blog Single End -->


                        </div>
                        <!-- Blog Wrapper End -->

                    </div>

                    <!-- Blog Sidebar Wrap Start -->
                    <div class="col-lg-4 col-12 mb-5">
                        <div class="sidebar-wrap">

                            <!-- Sidebar (Recent Posts) Start -->
                            <div class="sidebar-widget" v-if="latestNews">
                                <div class="inner">
                                    <h6 class="title">最新新闻&公告</h6>
                                    <ul class="sidebar-post">
                                        <li v-for="(news,index) in latestNews" :key="index">
                                            <a class="image">
                                                <el-image
                                                    @click="gotoNewsSingle(news.id)"
                                                    style="width: 70px; height: 70px"
                                                    :src="theHost+news.title_img"
                                                    fit="fit"></el-image>
                                            </a>
                                            <a class="title"
                                               @click="gotoNewsSingle(news.id)"
                                               v-html="news.title"></a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <!-- Sidebar (Recent Posts) End -->

                        </div>
                    </div>
                    <!-- Blog Sidebar Wrap End -->

                </div>

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
        name: "NewsSingle",
        components: {
            PageHeading
        },
        data() {
            return {
                pageData: {
                    'name': '新闻&公告详情',
                    'navs': [
                        {'name': 'Home', 'to': 'Home', 'active': false},
                        {'name': '新闻&公告', 'to': 'News', 'active': false},
                        {'name': '新闻&公告详情', 'to': '', 'active': true},
                    ],
                },
                newsInfo: null,
                latestNews: null,
                theHost: this.util.getHost(),
                routerAlive: true
            }
        },

        methods: {
            gotoNewsSingle(id) {
                this.$router.push({
                    name: 'NewsSingle',
                    params: {newsId: id}
                });
                // 同页面重新加载数据
                this.getNews();
                this.getLatestNews();
                this.$router.go(0);
            },
            async getNews() {
                try {
                    await this.http.get(this.api.News + '/' + this.$route.params.newsId).then(res => {
                        if (res.code == 0) {
                            this.newsInfo = res.data;
                        } else {
                            this.$message.error(res.message);
                        }
                    });
                } catch (error) {
                    console.error(error);
                }
            },
            async getLatestNews() {
                try {
                    await this.http.get(this.api.News, {
                        limit: 6,
                        order: ['created_at', 'DESC'],
                    }).then(res => {
                        if (res.code == 0) {
                            this.latestNews = res.data.rows;
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
            this.getNews();
            this.getLatestNews();
        }
    }
</script>

<style scoped>
    .sidebar-post li .title {
        width: 100%;
        height: 60px;
        overflow: hidden; /*设置超出的部分进行影藏*/
        text-overflow: ellipsis; /*设置超出部分使用省略号*/
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
    }
</style>
