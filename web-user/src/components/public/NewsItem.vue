<template>
    <!-- Blog Start -->
    <div class="col-lg-4 col-md-6 col-12">
        <div class="blog">
            <div class="media">
                <a @click="gotoNewsSingle(newsItemData.id)">
                    <el-image
                        style="width: 100%;"
                        :src="this.util.getHost()+newsItemData.title_img"
                        fit="fit"></el-image>
                </a>
            </div>
            <div class="content">
                <h6 class="title"><a href="blog-single.html">{{newsItemData.title}}</a></h6>
                <ul class="meta">
                    <li>{{newsItemData.created_at}}</li>
                </ul>
                <div class="desc" v-html="newsItemData.title"></div>
                <a class="read-more" @click="gotoNewsSingle(newsItemData.id)">
                    查看详情<i class="fa fa-angle-right"></i>
                </a>
            </div>
        </div>
    </div>
    <!-- Blog End -->
</template>

<script>
    export default {
        name: "NewsItem",
        props: [
            'newsItemData'
        ],
        methods: {
            gotoNewsSingle(id) {
                this.$router.push({
                    name: 'NewsSingle',
                    params: {newsId: id}
                });
            },
        }
    }
</script>

<style>
    .content .title a, .content .desc {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>
