<template>
    <header class="header">
        <div class="container">
            <div class="row justify-content-between align-items-center">

                <!-- Header Logo Start -->
                <div class="col">
                    <div class="header-logo">
                        <a href="index.html"><img src="../../static/images/logo/logo-light.png" alt="Site Logo"></a>
                    </div>
                </div><!-- Header Logo End -->

                <!-- Offcanvas Toggle Start -->
                <div class="col-auto d-lg-none d-flex align-items-center">
                    <button class="offcanvas-toggle">
                        <span></span>
                    </button>
                </div>
                <!-- Offcanvas Toggle End -->

                <!-- Header Links Start -->
                <div class="header-links col-auto order-lg-3">
                    <a href="#" data-toggle="modal" data-target="#loginSignupModal" data-target-sub="#login">登录</a>
                    <span>or</span>
                    <a href="#" data-toggle="modal" data-target="#loginSignupModal" data-target-sub="#signup">注册</a>
                </div><!-- Header Links End -->

                <!-- Header Menu Start -->
                <nav id="main-menu" class="main-menu col-lg-auto order-lg-2">
                    <ul>
                        <li class="has-children"><a href="index.html">首页</a>
<!--                            <ul class="sub-menu">-->
<!--                                <li><a href="index.html">Home One</a></li>-->
<!--                                <li><a href="index-2.html">Home Two</a></li>-->
<!--                            </ul>-->
                        </li>
                        <li class="has-children"><a href="job-list.html">工作</a>
                            <ul class="sub-menu">
                                <li><a href="job-list.html">工作列表</a></li>
                                <li><a href="job-single.html">职位详情</a></li>
                            </ul>
                        </li>
                        <li><a href="company-list.html">公司</a>
                            <ul class="sub-menu">
                                <li><a href="company-list.html">公司列表</a></li>
                                <li><a href="company-single.html">公司详情</a></li>
                                <li><a href="create-job.html">创建招聘</a></li>
                            </ul>
                        </li>
                        <li><a href="blog.html">新闻</a>
                            <ul class="sub-menu">
                                <li><a href="blog.html">新闻列表</a></li>
                                <li><a href="blog-right-sidebar.html">新闻列表2</a></li>
                                <li><a href="blog-single.html">新闻详情</a></li>
                            </ul>
                        </li>
                        <li><a href="#">公告</a></li>
                        <li><a href="#">关于我们</a></li>
                        <li><a href="#">联系我们</a></li>
                    </ul>
                </nav>
                <!-- Header Menu End -->

            </div>

        </div>
    </header>
</template>

<script>
    export default {
        name: "Header",
    }
</script>

<style scoped>

</style>
