<template>
    <div class="home">
        <!--OffCanvas Overlay-->
        <div class="offcanvas-overlay"></div>

        <!-- Slider Section Start -->
        <div class="slider-section section">
            <!--        <parallax>-->
            <!--            <img src="static/images/slider/slider-1.jpg" style="z-index: 0;">-->
            <!--        </parallax>-->
            <div class="slide-item bg-parallax" style="background-image: url('static/images/slider/slider-1.jpg');"
                 data-overlay="50">
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
                        <div class="row mb-n3">

                            <!--                                <div class="col-lg-auto col-sm-6 col-12 flex-grow-1 mb-3">-->
                            <!--                                    <input type="text" placeholder="例如：前端工程师">-->
                            <!--                                </div>-->

                            <!--                                <div class="col-lg-auto col-sm-6 col-12 flex-grow-1 mb-3">-->
                            <!--                                    <select>-->
                            <!--                                        <option value="1">全职</option>-->
                            <!--                                        <option value="2">兼职</option>-->
                            <!--                                        <option value="3">实习</option>-->
                            <!--                                    </select>-->
                            <!--                                </div>-->

                            <!--                                <div class="col-lg-auto col-sm-6 col-12 flex-grow-1 mb-3">-->
                            <!--                                    <button class="btn btn-primary">搜索</button>-->
                            <!--                                </div>-->

                            <el-form ref="searchForm" :model="searchForm" label-position="top"
                                     label-width="100%">
                                <el-form-item label="" class="home-search-label">
                                    <el-input v-model="searchForm.job_name" placeholder="职位名称"></el-input>
                                </el-form-item>
                                <el-form-item label="" class="home-search-label">
                                    <el-select v-model="searchForm.job_way" auto-complete="off">
                                        <el-option label="所有类型" value="所有类型"></el-option>
                                        <el-option label="全职" value="全职"></el-option>
                                        <el-option label="兼职" value="兼职"></el-option>
                                        <el-option label="实习" value="实习"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="searchJobs">搜 索</el-button>
                                </el-form-item>
                            </el-form>

                        </div>
                    </div>
                    <!-- Job Search Form End -->

                </div>
            </div>
        </div>
        <!-- Job Search Section End -->

        <!-- Recent Jobs Start -->
        <div class="section section-padding" style="height: 1120px;">
            <div class="container" v-if="jobList">
                <div class="section-title">
                    <h2 class="title">最新职位</h2>
                </div>

                <!-- Job List Wrap Start -->
                <div class="job-list-wrap">

                    <JobItem v-for="(item,index) in jobList" :key="index"
                             :jobInfo="item"
                             :companyInfo="item.company"></JobItem>

                </div>
                <!-- Job List Wrap Start -->

                <div class="text-center mt-4 mt-lg-5">
                    <router-link :to="{name:'JobList'}" class="btn btn-primary">查看更多职位</router-link>
                </div>

            </div>
        </div>
        <!-- Recent Jobs End -->

        <!-- Funfact Section Start -->
        <div class="section section-padding bg-parallax"
             style="background-image: url('static/images/bg/bg-1.jpg'); height: 240px;"
             data-overlay="50">
            <div class="container" v-if="homeStatistics">
                <div class="funfact-wrap row">

                    <!-- Funfact Start -->
                    <div class="funfact col-md-3 col-sm-6 col-12">
                    <span class="counter">
                        <CountUp :countup-start="0" :countup-end="homeStatistics.count_job"></CountUp>
                    </span>
                        <span class="title">招聘职位</span>
                    </div>
                    <!-- Funfact Start -->

                    <!-- Funfact Start -->
                    <div class="funfact col-md-3 col-sm-6 col-12">
                    <span class="counter">
                        <CountUp :countup-start="0" :countup-end="homeStatistics.count_user"></CountUp>
                    </span>
                        <span class="title">求职者</span>
                    </div>
                    <!-- Funfact Start -->

                    <!-- Funfact Start -->
                    <div class="funfact col-md-3 col-sm-6 col-12">
                    <span class="counter">
                        <CountUp :countup-start="0" :countup-end="homeStatistics.count_resume"></CountUp>
                    </span>
                        <span class="title">简历</span>
                    </div>
                    <!-- Funfact Start -->

                    <!-- Funfact Start -->
                    <div class="funfact col-md-3 col-sm-6 col-12">
                    <span class="counter">
                        <CountUp :countup-start="0" :countup-end="homeStatistics.count_company"></CountUp>
                    </span>
                        <span class="title">公司</span>
                    </div>
                    <!-- Funfact Start -->

                </div>
            </div>
        </div>
        <!-- Funfact Section End -->

        <!-- Featured Conpanies Start -->
        <div class="section section-padding" style="height: 490px;">
            <div class="container" v-if="companyList">
                <div class="section-title">
                    <h2 class="title">特色企业</h2>
                </div>

                <!-- Company List Wrap Start -->
                <div class="company-slider row">

                    <HomeCompanyItem v-for="(item,index) in companyList" :key="index"
                                     :company-item="item"></HomeCompanyItem>

                </div>
                <!-- Company List Wrap Start -->

            </div>
        </div>
        <!-- Featured Conpanies End -->

        <!-- Testimonial Section Start -->
        <div class="section section-padding bg-parallax" style="background-image: url('static/images/bg/bg-2.jpg');"
             data-overlay="65">
            <div class="container" style="height: 259px;" v-if="homeFeedback">

                <!-- Testimonial Slider Start -->
                <div class="testimonial-slider row">

                    <div style="width: 100%;">
                        <el-carousel height="285px" indicator-position="none" arrow="always">
                            <el-carousel-item v-for="(item,index) in homeFeedback">
                                <!-- Testimonial Start -->
                                <RespondentsItem :feedba-item="item"></RespondentsItem>
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
        <div class="section section-padding" style="height: 750px;">
            <div class="container" v-if="newsList">

                <div class="section-title">
                    <h3 class="title">新闻&公告</h3>
                </div>

                <!-- Blog Slider Start -->
                <div class="blog-slider row">

                    <!-- Blog Start -->
                    <NewsItem v-for="(item,index) in newsList" :key="index"
                              :news-item-data="item"></NewsItem>
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
    // import parallax from 'vue-parallaxy' // 图片，并不是背景

    export default {
        name: 'Home',
        components: {
            JobItem,
            CountUp,
            NewsItem,
            HomeCompanyItem,
            RespondentsItem
        },
        data() {
            return {
                searchForm: {
                    job_name: null,
                    job_way: null,
                },
                jobList: null,
                companyList: null,
                newsList: null,
                homeStatistics: null,
                homeFeedback: null,
            }
        },
        methods: {
            init() {
                $('.bg-parallax').each(function () {
                    $(this).parallax("50%", 0.5);
                });
            },
            searchJobs() {
                var searchWhere = {};
                _.forEach(this.searchForm, function (value, key) {
                    if (!_.isEmpty(value) && key == 'job_name') {
                        searchWhere.job_name = value;
                    }
                    if (!_.isEmpty(value) && key == 'job_way' && value !== '所有类型') {
                        searchWhere.job_way = value;
                    }
                });

                if (!_.isEmpty(searchWhere)) {
                    this.$router.push({
                        name: 'JobList',
                        params: searchWhere
                    });
                } else {
                    this.$router.push({name: 'JobList'});
                }
            },
            async getJobList() {
                try {
                    await this.http.get(this.api.CompanyJob, {
                        limit: 6,
                        offset: 0,
                        order: ['created_at', 'DESC'],
                    }).then(res => {
                        if (res.code == 0) {
                            this.jobList = res.data.rows;
                        } else {
                            this.$message.error(res.message);
                        }
                    });
                } catch (error) {
                    console.error(error);
                }
            },
            async getCompanyList() {
                try {
                    await this.http.get(this.api.Company, {
                        limit: 6,
                        offset: 0,
                    }).then(res => {
                        if (res.code == 0) {
                            this.companyList = res.data.rows;
                        } else {
                            this.$message.error(res.message);
                        }
                    });
                } catch (error) {
                    console.error(error);
                }
            },
            async getNewsList() {
                try {
                    await this.http.get(this.api.News, {
                        limit: 3,
                        offset: 0,
                        order: ['created_at', 'DESC'],
                    }).then(res => {
                        if (res.code == 0) {
                            this.newsList = res.data.rows;
                        } else {
                            this.$message.error(res.message);
                        }
                    });
                } catch (error) {
                    console.error(error);
                }
            },
            async getHomeStatistics() {
                try {
                    await this.http.get(this.api.HomeStatistics).then(res => {
                        if (res.code == 0) {
                            this.homeStatistics = res.data;
                        } else {
                            this.$message.error(res.message);
                        }
                    });
                } catch (error) {
                    console.error(error);
                }
            },
            async getHomeFeedback() {
                try {
                    await this.http.get(this.api.HomeFeedback).then(res => {
                        if (res.code == 0) {
                            this.homeFeedback = res.data.rows;
                        } else {
                            this.$message.error(res.message);
                        }
                    });
                } catch (error) {
                    console.error(error);
                }
            },
        },
        created() {
        },
        mounted() {
            this.init();
            this.getJobList();
            this.getCompanyList();
            this.getNewsList();
            this.getHomeStatistics();
            this.getHomeFeedback();
        }

    }
</script>

<style scoped>
    .job-search-form .row .el-form {
        width: 100%;
        display: flex;
        justify-content: space-around;
    }

    .job-search-form .row .el-form .el-form-item {
        margin-bottom: 20px;
        width: 300px;
    }

    .job-search-form .row .el-form .el-form-item:last-child {
        width: 200px;
    }

    .job-search-form .row .el-form .el-form-item .el-form-item__content .el-input,
    .job-search-form .row .el-form .el-form-item .el-form-item__content .el-select,
    .job-search-form .row .el-form .el-form-item .el-form-item__content .el-button {
        width: 100%;
    }

</style>

<style>
    .home .section .container .testimonial-slider .el-carousel .el-carousel__container .el-carousel__arrow.el-carousel__arrow--left,
    .home .section .container .testimonial-slider .el-carousel .el-carousel__container .el-carousel__arrow.el-carousel__arrow--right {
        border: 1px solid;
    }
</style>
