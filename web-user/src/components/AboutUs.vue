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
                            <h3 class="title">About Keller</h3>
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam eius, cumque eaque iste amet deleniti repudiandae debitis consequatur, vel, non nulla autem sequi qui accusamus? Tempore pariatur deleniti voluptas quas porro incidunt id, doloremque quidem at fugiat neque soluta temporibus!</p>
                            <ul>
                                <li>Lorem ipsum, dolor sit amet</li>
                                <li>Consectetur adipisicing elit</li>
                                <li>Numquam eius, cumque eaque iste</li>
                                <li>Amet deleniti repudiandae debitis consequatur</li>
                                <li>Tempore pariatur deleniti voluptas</li>
                            </ul>
                        </div>
                    </div>
                    <!-- About Content End -->

                    <!-- About Image Start -->
                    <div class="col-md-6 col-12 mb-4">
                        <div class="about-image">
                            <img src="static/images/others/about-1.jpg" alt="">
                        </div>
                    </div>
                    <!-- About Image End -->
                </div>
            </div>
        </div>
        <!-- About Us End -->

        <!-- Funfact Section Start -->
        <div class="section section-padding bg-parallax" data-bg-image="static/images/bg/bg-3.jpg" data-overlay="50">
            <div class="container">
                <div class="funfact-wrap row">

                    <!-- Funfact Start -->
                    <div class="funfact col-md-3 col-sm-6 col-12">
                        <span class="counter">1354</span>
                        <span class="title">Job Post</span>
                    </div>
                    <!-- Funfact Start -->

                    <!-- Funfact Start -->
                    <div class="funfact col-md-3 col-sm-6 col-12">
                        <span class="counter">1741</span>
                        <span class="title">Members</span>
                    </div>
                    <!-- Funfact Start -->

                    <!-- Funfact Start -->
                    <div class="funfact col-md-3 col-sm-6 col-12">
                        <span class="counter">1204</span>
                        <span class="title">Resume</span>
                    </div>
                    <!-- Funfact Start -->

                    <!-- Funfact Start -->
                    <div class="funfact col-md-3 col-sm-6 col-12">
                        <span class="counter">142</span>
                        <span class="title">Company</span>
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
                    <h3 class="title">Our Team</h3>
                    <p>Our team are build by all professional members who <br> always try to get the efficiency work.</p>
                </div>

                <div class="team-wrap row">

                    <!-- Team Start -->
                    <div class="col-lg-3 col-sm-6 col-12">
                        <div class="team">
                            <img src="static/images/team/team-1.jpg" alt="Team">
                            <div class="content">
                                <div class="inner">
                                    <h6 class="name">Matthew Wilder</h6>
                                    <span class="title">FOUNDER</span>
                                    <div class="social">
                                        <a href="#"><i class="fa fa-qq"></i></a>
                                        <a href="#"><i class="fa fa-wechat"></i></a>
                                        <a href="#"><i class="fa fa-weibo"></i></a>
                                        <a href="#"><i class="fa fa-facebook"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Team Start -->

                    <!-- Team Start -->
                    <div class="col-lg-3 col-sm-6 col-12">
                        <div class="team">
                            <img src="static/images/team/team-2.jpg" alt="Team">
                            <div class="content">
                                <div class="inner">
                                    <h6 class="name">Jameson Bau</h6>
                                    <span class="title">PROJECT MANAGER</span>
                                    <div class="social">
                                        <a href="#"><i class="fa fa-qq"></i></a>
                                        <a href="#"><i class="fa fa-wechat"></i></a>
                                        <a href="#"><i class="fa fa-weibo"></i></a>
                                        <a href="#"><i class="fa fa-facebook"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Team Start -->

                    <!-- Team Start -->
                    <div class="col-lg-3 col-sm-6 col-12">
                        <div class="team">
                            <img src="static/images/team/team-3.jpg" alt="Team">
                            <div class="content">
                                <div class="inner">
                                    <h6 class="name">Irene Simon</h6>
                                    <span class="title">DESIGNER</span>
                                    <div class="social">
                                        <a href="#"><i class="fa fa-qq"></i></a>
                                        <a href="#"><i class="fa fa-wechat"></i></a>
                                        <a href="#"><i class="fa fa-weibo"></i></a>
                                        <a href="#"><i class="fa fa-facebook"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Team Start -->

                    <!-- Team Start -->
                    <div class="col-lg-3 col-sm-6 col-12">
                        <div class="team">
                            <img src="static/images/team/team-4.jpg" alt="Team">
                            <div class="content">
                                <div class="inner">
                                    <h6 class="name">Chris Walker</h6>
                                    <span class="title">BACKEND DEVELOPER</span>
                                    <div class="social">
                                        <a href="#"><i class="fa fa-qq"></i></a>
                                        <a href="#"><i class="fa fa-wechat"></i></a>
                                        <a href="#"><i class="fa fa-weibo"></i></a>
                                        <a href="#"><i class="fa fa-facebook"></i></a>
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
    import PageHeading from "./public/PageHeading";

    export default {
        name: "AboutUs",
        components: {
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
