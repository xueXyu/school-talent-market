<template>
    <!-- Blog Start -->
    <div class="col-lg-4 col-md-6 col-12">
        <div class="blog">
            <div class="media">
                <el-image
                    style="width:370px; height: 240px;"
                    :src="this.util.getHost()+newsItemData.title_img"
                    fit="fit"></el-image>
            </div>
            <div class="content">
                <h6 class="title">
                    <router-link :to="{name:'NewsSingle',params: {newsId: newsItemData.id}}">
                        {{newsItemData.title}}
                    </router-link>
                </h6>
                <ul class="meta">
                    <li>{{newsItemData.created_at}}</li>
                </ul>
                <div class="desc" v-html="newsItemData.title"></div>
                <router-link :to="{name:'NewsSingle',params: {newsId: newsItemData.id}}" class="read-more">
                    查看详情<i class="fa fa-angle-right"></i>
                </router-link>
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
    }
</script>

<style scoped>
    .blog .content .title a,
    .blog .content .desc {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>
