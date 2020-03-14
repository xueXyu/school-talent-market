<template>
    <div>
        <!--OffCanvas Overlay-->
        <div class="offcanvas-overlay"></div>

        <!-- Page Heading Section Start -->
        <PageHeading :page-data="pageData"></PageHeading>
        <!-- Page Heading Section End -->

        <!-- About Us Start -->
        <div class="section section-padding">
            <div class="container">
                <div class="row mb-n4">
                    <!-- About Content Start -->
                    <div class="col-md-6 col-12 pr-lg-5 align-self-center mb-4">
                        <div class="about-content">
                            <h3 class="title">关于校园人才网</h3>
                            <p>
                                集校园招聘与应聘功能的平台，为企业和待业大学生提供便利。集校园招聘与应聘功能的平台，为企业和待业大学生提供便利。集校园招聘与应聘功能的平台，为企业和待业大学生提供便利。集校园招聘与应聘功能的平台，为企业和待业大学生提供便利。</p>
                            <ul>
                                <li>校园人才网</li>
                                <li>集校园招聘与应聘功能的平台，为企业和待业大学生提供便利。</li>
                                <li>校园人才网</li>
                                <li>集校园招聘与应聘功能的平台，为企业和待业大学生提供便利。</li>
                            </ul>
                        </div>
                    </div>
                    <!-- About Content End -->

                    <!-- About Image Start -->
                    <div class="col-md-6 col-12 mb-4">
                        <div class="about-image">
                            <img src="../../static/images/others/about-1.jpg" alt="">
                        </div>
                    </div>
                    <!-- About Image End -->
                </div>
            </div>
        </div>
        <!-- About Us End -->

        <!-- Funfact Section Start -->
        <div class="section section-padding bg-parallax" style="background-image: url('static/images/bg/bg-3.jpg');"
             data-overlay="50">
            <div class="container" v-if="homeStatistics">
                <div class="funfact-wrap row">

                    <!-- Funfact Start -->
                    <div class="funfact col-md-3 col-sm-6 col-12">
                        <span class="counter">
                            <CountTo :startVal="0" :endVal='homeStatistics.count_job'></CountTo>
                        </span>
                        <span class="title">招聘职位</span>
                    </div>
                    <!-- Funfact Start -->

                    <!-- Funfact Start -->
                    <div class="funfact col-md-3 col-sm-6 col-12">
                        <span class="counter">
                            <CountTo :startVal="0" :endVal='homeStatistics.count_user'></CountTo>
                        </span>
                        <span class="title">求职者</span>
                    </div>
                    <!-- Funfact Start -->

                    <!-- Funfact Start -->
                    <div class="funfact col-md-3 col-sm-6 col-12">
                        <span class="counter">
                            <CountTo :startVal="0" :endVal='homeStatistics.count_resume'></CountTo>
                        </span>
                        <span class="title">简历</span>
                    </div>
                    <!-- Funfact Start -->

                    <!-- Funfact Start -->
                    <div class="funfact col-md-3 col-sm-6 col-12">
                        <span class="counter">
                            <CountTo :startVal="0" :endVal='homeStatistics.count_company'></CountTo>
                        </span>
                        <span class="title">公司</span>
                    </div>
                    <!-- Funfact Start -->

                </div>
            </div>
        </div>
        <!-- Funfact Section End -->

        <!-- Team Section Start -->
        <div class="section section-padding">
            <div class="container">

                <div class="section-title">
                    <h3 class="title">我们的团队</h3>
                    <p>我们的团队是由所有专业人员组成的，<br>他们总是努力提高工作效率。
                    </p>
                </div>

                <div class="team-wrap row">

                    <!-- Team Start -->
                    <div class="col-lg-3 col-sm-6 col-12">
                        <div class="team">
                            <img src="../../static/images/team/team-1.jpg" alt="Team">
                            <div class="content">
                                <div class="inner">
                                    <h6 class="name">李狗蛋</h6>
                                    <span class="title">创始人</span>
                                    <div class="social">
                                        <a href="/"><i class="fa fa-qq"></i></a>
                                        <a href="/"><i class="fa fa-wechat"></i></a>
                                        <a href="/"><i class="fa fa-weibo"></i></a>
                                        <a href="/"><i class="fa fa-facebook"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Team Start -->

                    <!-- Team Start -->
                    <div class="col-lg-3 col-sm-6 col-12">
                        <div class="team">
                            <img src="../../static/images/team/team-2.jpg" alt="Team">
                            <div class="content">
                                <div class="inner">
                                    <h6 class="name">李铁柱</h6>
                                    <span class="title">项目经理</span>
                                    <div class="social">
                                        <a href="/"><i class="fa fa-qq"></i></a>
                                        <a href="/"><i class="fa fa-wechat"></i></a>
                                        <a href="/"><i class="fa fa-weibo"></i></a>
                                        <a href="/"><i class="fa fa-facebook"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Team Start -->

                    <!-- Team Start -->
                    <div class="col-lg-3 col-sm-6 col-12">
                        <div class="team">
                            <img src="../../static/images/team/team-3.jpg" alt="Team">
                            <div class="content">
                                <div class="inner">
                                    <h6 class="name">王二妞</h6>
                                    <span class="title">设计师</span>
                                    <div class="social">
                                        <a href="/"><i class="fa fa-qq"></i></a>
                                        <a href="/"><i class="fa fa-wechat"></i></a>
                                        <a href="/"><i class="fa fa-weibo"></i></a>
                                        <a href="/"><i class="fa fa-facebook"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Team Start -->

                    <!-- Team Start -->
                    <div class="col-lg-3 col-sm-6 col-12">
                        <div class="team">
                            <img src="../../static/images/team/team-4.jpg" alt="Team">
                            <div class="content">
                                <div class="inner">
                                    <h6 class="name">张全蛋</h6>
                                    <span class="title">后端工程师</span>
                                    <div class="social">
                                        <a href="/"><i class="fa fa-qq"></i></a>
                                        <a href="/"><i class="fa fa-wechat"></i></a>
                                        <a href="/"><i class="fa fa-weibo"></i></a>
                                        <a href="/"><i class="fa fa-facebook"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Team Start -->

                </div>
            </div>
        </div>
        <!-- Team Section End -->
    </div>
</template>

<script>
    import PageHeading from './public/PageHeading'
    import CountTo from 'vue-count-to'

    export default {
        name: 'AboutUs',
        components: {
            PageHeading,
            CountTo
        },
        data() {
            return {
                pageData: {
                    'name': '关于我们',
                    'navs': [
                        { 'name': 'Home', 'to': 'Home', 'active': false },
                        { 'name': '关于我们', 'to': '', 'active': true }
                    ]
                },
                homeStatistics: null
            }
        },
        methods: {
            async getHomeStatistics() {
                try {
                    await this.http.get(this.api.HomeStatistics).then(res => {
                        if (res.code == 0) {
                            this.homeStatistics = res.data
                        } else {
                            this.$message.error(res.message)
                        }
                    })
                } catch (error) {
                    console.error(error)
                }
            }
        },
        mounted() {
            this.getHomeStatistics()
        }
    }
</script>

<style scoped>

</style>
