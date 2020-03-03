<template>
<div class="home">
    <!--OffCanvas Overlay-->
    <div class="offcanvas-overlay"></div>

    <!-- Slider Section Start -->
    <div class="slider-section section">
        <div class="slide-item bg-parallax" data-bg-image="static/images/slider/slider-1.jpg" data-overlay="50">
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
    <div class="section section-padding bg-parallax" data-bg-image="static/images/bg/bg-1.jpg" data-overlay="50">
        <div class="container">
            <div class="funfact-wrap row">

                <!-- Funfact Start -->
                <div class="funfact col-md-3 col-sm-6 col-12">
                    <span class="counter">1354</span>
                    <span class="title">工作职位</span>
                </div>
                <!-- Funfact Start -->

                <!-- Funfact Start -->
                <div class="funfact col-md-3 col-sm-6 col-12">
                    <span class="counter">1741</span>
                    <span class="title">求职者</span>
                </div>
                <!-- Funfact Start -->

                <!-- Funfact Start -->
                <div class="funfact col-md-3 col-sm-6 col-12">
                    <span class="counter">1204</span>
                    <span class="title">简历</span>
                </div>
                <!-- Funfact Start -->

                <!-- Funfact Start -->
                <div class="funfact col-md-3 col-sm-6 col-12">
                    <span class="counter">142</span>
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

                <!-- Company List Start -->
                <div class="col">
                    <a href="company-single.html" class="feature-company">
                        <span class="company-logo"><img src="../../static/images/companies/company-1.png" alt="company-1"></span>
                        <h6 class="title">Envato</h6>
                        <span class="open-job">2 个空缺职位</span>
                    </a>
                </div>
                <!-- Company List Start -->

                <!-- Company List Start -->
                <div class="col">
                    <a href="company-single.html" class="feature-company">
                        <span class="company-logo"><img src="../../static/images/companies/company-2.png" alt="company-1"></span>
                        <h6 class="title">Astha</h6>
                        <span class="open-job">1 个空缺职位</span>
                    </a>
                </div>
                <!-- Company List Start -->

                <!-- Company List Start -->
                <div class="col">
                    <a href="company-single.html" class="feature-company">
                        <span class="company-logo"><img src="../../static/images/companies/company-3.png" alt="company-1"></span>
                        <h6 class="title">Github</h6>
                        <span class="open-job">4 个空缺职位</span>
                    </a>
                </div>
                <!-- Company List Start -->

                <!-- Company List Start -->
                <div class="col">
                    <a href="company-single.html" class="feature-company">
                        <span class="company-logo"><img src="../../static/images/companies/company-4.png" alt="company-1"></span>
                        <h6 class="title">Medicore</h6>
                        <span class="open-job">1 个空缺职位</span>
                    </a>
                </div>
                <!-- Company List Start -->

                <!-- Company List Start -->
                <div class="col">
                    <a href="company-single.html" class="feature-company">
                        <span class="company-logo"><img src="../../static/images/companies/company-5.png" alt="company-1"></span>
                        <h6 class="title">Greensoul</h6>
                        <span class="open-job">1 个空缺职位</span>
                    </a>
                </div>
                <!-- Company List Start -->

                <!-- Company List Start -->
                <div class="col">
                    <a href="company-single.html" class="feature-company">
                        <span class="company-logo"><img src="../../static/images/companies/company-6.png" alt="company-1"></span>
                        <h6 class="title">Generous</h6>
                        <span class="open-job">2 个空缺职位</span>
                    </a>
                </div>
                <!-- Company List Start -->

                <!-- Company List Start -->
                <div class="col">
                    <a href="company-single.html" class="feature-company">
                        <span class="company-logo"><img src="../../static/images/companies/company-7.png" alt="company-1"></span>
                        <h6 class="title">Buzco</h6>
                        <span class="open-job">3 个空缺职位</span>
                    </a>
                </div>
                <!-- Company List Start -->

                <!-- Company List Start -->
                <div class="col">
                    <a href="company-single.html" class="feature-company">
                        <span class="company-logo"><img src="../../static/images/companies/company-8.png" alt="company-1"></span>
                        <h6 class="title">Salina</h6>
                        <span class="open-job">1 个空缺职位</span>
                    </a>
                </div>
                <!-- Company List Start -->

                <!-- Company List Start -->
                <div class="col">
                    <a href="company-single.html" class="feature-company">
                        <span class="company-logo"><img src="../../static/images/companies/company-9.png" alt="company-1"></span>
                        <h6 class="title">Hope</h6>
                        <span class="open-job">1 个空缺职位</span>
                    </a>
                </div>
                <!-- Company List Start -->

                <!-- Company List Start -->
                <div class="col">
                    <a href="company-single.html" class="feature-company">
                        <span class="company-logo"><img src="../../static/images/companies/company-10.png" alt="company-span"></span>
                        <h6 class="title">Bebsha</h6>
                        <span class="open-job">2 个空缺职位</span>
                    </a>
                </div>
                <!-- Company List Start -->

            </div>
            <!-- Company List Wrap Start -->

        </div>
    </div>
    <!-- Featured Conpanies End -->

    <!-- Testimonial Section Start -->
    <div class="section section-padding bg-parallax" data-bg-image="static/images/bg/bg-2.jpg" data-overlay="65">
        <div class="container">

            <!-- Testimonial Slider Start -->
            <div class="testimonial-slider row">

                <!-- Testimonial Start -->
                <div class="col">
                    <div class="testimonial text-center text-white">
                        <p>求职者反馈求职者反馈求职者反馈求职者反馈求职者反馈求职者反馈求职者反馈求职者反馈求职者反馈</p>
                        <img src="../../static/images/authors/author-1.jpg" alt="">
                        <h6 class="name">李二妞</h6>
                        <span class="title">华北销售负责人</span>
                    </div>
                </div>
                <!-- Testimonial End -->

                <!-- Testimonial Start -->
                <div class="col">
                    <div class="testimonial text-center text-white">
                        <p>公司反馈公司反馈公司反馈公司反馈公司反馈公司反馈公司反馈公司反馈公司反馈公司反馈公司反馈公司反馈公司反馈</p>
                        <img src="../../static/images/authors/author-2.jpg" alt="">
                        <h6 class="name">张三</h6>
                        <span class="title">铁憨憨CEO</span>
                    </div>
                </div>
                <!-- Testimonial End -->

                <!-- Testimonial Start -->
                <div class="col">
                    <div class="testimonial text-center text-white">
                        <p>求职者反馈求职者反馈求职者反馈求职者反馈求职者反馈求职者反馈求职者反馈求职者反馈求职者反馈</p>
                        <img src="../../static/images/authors/author-3.jpg" alt="">
                        <h6 class="name">李铁柱</h6>
                        <span class="title">百度后端开发</span>
                    </div>
                </div>
                <!-- Testimonial End -->

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
                <div class="col">
                    <div class="blog">
                        <div class="media">
                            <a href="blog-single.html"><img src="../../static/images/blog/blog-1.jpg" alt=""></a>
                        </div>
                        <div class="content">
                            <h6 class="title"><a href="blog-single.html">标题标题标题标题标题标题</a></h6>
                            <ul class="meta">
                                <li>2020-12-12 12:12:21</li>
                            </ul>
                            <div class="desc">
                                <p>新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容</p>
                            </div>
                            <a href="blog-single.html" class="read-more">查看详情<i class="fa fa-angle-right"></i></a>
                        </div>
                    </div>
                </div>
                <!-- Blog End -->

                <!-- Blog Start -->
                <div class="col">
                    <div class="blog">
                        <div class="media">
                            <a href="blog-single.html"><img src="../../static/images/blog/blog-2.jpg" alt=""></a>
                        </div>
                        <div class="content">
                            <h6 class="title"><a href="blog-single.html">标题标题标题标题标题标题</a></h6>
                            <ul class="meta">
                                <li>2020-12-12 12:12:21</li>
                            </ul>
                            <div class="desc">
                                <p>公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容公告内容</p>
                            </div>
                            <a href="blog-single.html" class="read-more">查看详情<i class="fa fa-angle-right"></i></a>
                        </div>
                    </div>
                </div>
                <!-- Blog End -->

                <!-- Blog Start -->
                <div class="col">
                    <div class="blog">
                        <div class="media">
                            <a href="blog-single.html"><img src="../../static/images/blog/blog-3.jpg" alt=""></a>
                        </div>
                        <div class="content">
                            <h6 class="title"><a href="blog-single.html">标题标题标题标题标题标题</a></h6>
                            <ul class="meta">
                                <li>2020-12-12 12:12:21</li>
                            </ul>
                            <div class="desc">
                                <p>新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容</p>
                            </div>
                            <a href="blog-single.html" class="read-more">查看详情<i class="fa fa-angle-right"></i></a>
                        </div>
                    </div>
                </div>
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
    import '../../src/assets/js/plugins/jquery.parallax';

    export default {
        name: 'Home',
        components:{
            JobItem,
        },
        methods:{
        },
        created() {
        },
        mounted:() => {
            // console.log($.fn.parallax);
            console.log('log123123');
            console.log($('#offcanvas-overlay').html());

            $('[data-bg-image]').each(function () {
                var $this = $(this),
                    $image = $this.data('bg-image');
                $this.css('background-image', 'url(' + $image + ')');

            });

            $('.bg-parallax').each(function () {
                $(this).parallax("50%", 0.5);
            });

            // $('.counter').counterUp({
            //     time: 3000
            // });

        }

    }
</script>

<style scoped>

</style>
