<template>
<div class="home">
    <!--OffCanvas Overlay-->
    <div class="offcanvas-overlay"></div>

    <!-- Slider Section Start -->
    <div class="slider-section section">
<!--        <parallax>-->
<!--            <img src="static/images/slider/slider-1.jpg" style="z-index: 0;">-->
<!--        </parallax>-->
        <div class="slide-item bg-parallax" style="background-image: url('static/images/slider/slider-1.jpg');" data-overlay="50">
            <div class="container">
                <div class="slider-content text-center">
                    <h2 class="title">千里马常有&nbsp;&nbsp;而伯乐不常有</h2>
                    <p>全站已发布 <span>3,527</span> 个职位</p>
                </div>
            </div>
        </div>
    </div>
    <!-- Slider Section End -->

    <!-- Job Search Section Start -->
    <div class="job-search-section section">
        <div class="container">
            <div class="job-search-wrap">

                <!-- Job Search Form Start -->
                <div class="job-search-form">
                    <form action="#">
                        <div class="row mb-n3">

                            <div class="col-lg-auto col-sm-6 col-12 flex-grow-1 mb-3">
                                <input type="text" placeholder="例如：前端工程师">
                            </div>

                            <div class="col-lg-auto col-sm-6 col-12 flex-grow-1 mb-4">
                                <input type="text" placeholder="薪资待遇">
                            </div>

                            <div class="col-lg-auto col-sm-6 col-12 flex-grow-1 mb-3">
                                <select>
                                    <option value="1">全职</option>
                                    <option value="2">兼职</option>
                                    <option value="3">实习</option>
                                </select>
                            </div>

                            <div class="col-lg-auto col-sm-6 col-12 flex-grow-1 mb-3">
                                <button class="btn btn-primary">搜索</button>
                            </div>

                        </div>
                    </form>
                </div>
                <!-- Job Search Form End -->

            </div>
        </div>
    </div>
    <!-- Job Search Section End -->

    <!-- Recent Jobs Start -->
    <div class="section section-padding">
        <div class="container">
            <div class="section-title">
                <h2 class="title">最新职位</h2>
            </div>

            <!-- Job List Wrap Start -->
            <div class="job-list-wrap">

                <JobItem></JobItem>
                <JobItem></JobItem>
                <JobItem></JobItem>
                <JobItem></JobItem>

            </div>
            <!-- Job List Wrap Start -->

            <div class="text-center mt-4 mt-lg-5">
                <a href="job-list.html" class="btn btn-primary">查看更多职位</a>
            </div>

        </div>
    </div>
    <!-- Recent Jobs End -->

    <!-- Funfact Section Start -->
    <div class="section section-padding bg-parallax" style="background-image: url('static/images/bg/bg-1.jpg');" data-overlay="50">
        <div class="container">
            <div class="funfact-wrap row">

                <!-- Funfact Start -->
                <div class="funfact col-md-3 col-sm-6 col-12">
                    <span class="counter">
                        <CountUp countup-start="0" countup-end="1354"></CountUp>
                    </span>
                    <span class="title">招聘职位</span>
                </div>
                <!-- Funfact Start -->

                <!-- Funfact Start -->
                <div class="funfact col-md-3 col-sm-6 col-12">
                    <span class="counter">
                        <CountUp countup-start="0" countup-end="1741"></CountUp>
                    </span>
                    <span class="title">求职者</span>
                </div>
                <!-- Funfact Start -->

                <!-- Funfact Start -->
                <div class="funfact col-md-3 col-sm-6 col-12">
                    <span class="counter">
                        <CountUp countup-start="0" countup-end="1204"></CountUp>
                    </span>
                    <span class="title">简历</span>
                </div>
                <!-- Funfact Start -->

                <!-- Funfact Start -->
                <div class="funfact col-md-3 col-sm-6 col-12">
                    <span class="counter">
                        <CountUp countup-start="0" countup-end="142"></CountUp>
                    </span>
                    <span class="title">公司</span>
                </div>
                <!-- Funfact Start -->

            </div>
        </div>
    </div>
    <!-- Funfact Section End -->

    <!-- Featured Conpanies Start -->
    <div class="section section-padding">
        <div class="container">
            <div class="section-title">
                <h2 class="title">特色企业</h2>
            </div>

            <!-- Company List Wrap Start -->
            <div class="company-slider row">

                <HomeCompanyItem></HomeCompanyItem>
                <HomeCompanyItem></HomeCompanyItem>
                <HomeCompanyItem></HomeCompanyItem>
                <HomeCompanyItem></HomeCompanyItem>
                <HomeCompanyItem></HomeCompanyItem>
                <HomeCompanyItem></HomeCompanyItem>

            </div>
            <!-- Company List Wrap Start -->

        </div>
    </div>
    <!-- Featured Conpanies End -->

    <!-- Testimonial Section Start -->
    <div class="section section-padding bg-parallax" style="background-image: url('static/images/bg/bg-2.jpg');" data-overlay="65">
        <div class="container">

            <!-- Testimonial Slider Start -->
            <div class="testimonial-slider row">

                <div style="width: 100%;">
                    <el-carousel height="285px" indicator-position="none" arrow="always">
                        <el-carousel-item>
                            <!-- Testimonial Start -->
                            <RespondentsItem></RespondentsItem>
                            <!-- Testimonial End -->
                        </el-carousel-item>
                        <el-carousel-item>
                            <!-- Testimonial Start -->
                            <RespondentsItem></RespondentsItem>
                            <!-- Testimonial End -->
                        </el-carousel-item>
                        <el-carousel-item>
                            <!-- Testimonial Start -->
                            <RespondentsItem></RespondentsItem>
                            <!-- Testimonial End -->
                        </el-carousel-item>
                    </el-carousel>
                </div>
            </div>
            <!-- Testimonial Slider End -->

        </div>
    </div>
    <!-- Testimonial Section End -->

    <!-- Blog Section Start -->
    <div class="section section-padding">
        <div class="container">

            <div class="section-title">
                <h3 class="title">新闻&公告</h3>
            </div>

            <!-- Blog Slider Start -->
            <div class="blog-slider row">

                <!-- Blog Start -->
                <NewsItem></NewsItem>
                <!-- Blog End -->

                <!-- Blog Start -->
                <NewsItem></NewsItem>
                <!-- Blog End -->

                <!-- Blog Start -->
                <NewsItem></NewsItem>
                <!-- Blog End -->

            </div>
            <!-- Blog Slider End -->

        </div>
    </div>
    <!-- Blog Section End -->
</div>
</template>

<script>
    import JobItem from "./public/JobItem";
    import CountUp from "./public/CountUp";
    import HomeCompanyItem from "./public/HomeCompanyItem";
    import RespondentsItem from './public/RespondentsItem';
    import NewsItem from './public/NewsItem';
    // import Parallax from 'vue-parallaxy' // 图片，并不是背景
    import '../../src/assets/js/plugins/jquery.parallax';

    export default {
        name: 'Home',
        components:{
            JobItem,
            CountUp,
            NewsItem,
            HomeCompanyItem,
            RespondentsItem
        },
        data() {
            return {
                startNum:1,
                endNum:10000,
            }
        },
        methods:{
            init() {
                $('.bg-parallax').each(function () {
                    $(this).parallax("50%", 0.5);
                });
            },
            async getUser() {
                try {
                    await this.http.get(this.api.User+'/1')
                        .then(res => {
                            if(res.code == 0) {
                                console.log(res.data);
                                this.store.commit("updateUserInfo",res.data);
                            }
                        });
                    console.log(this.store.state.userInfo);
                } catch (error) {
                    console.error(error);
                }
            }
        },
        created() {
        },
        mounted() {
            this.init();
            // this.getUser();
        }

    }
</script>

<style>
    .el-carousel__arrow--left,.el-carousel__arrow--right {
        border: 1px solid;
    }

</style>
