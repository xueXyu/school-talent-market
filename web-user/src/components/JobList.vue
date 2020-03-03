<template>
    <div>
        <!--OffCanvas Overlay-->
        <div class="offcanvas-overlay"></div>

        <!-- Page Heading Section Start -->
        <div class="page-heading-section section bg-parallax" data-bg-image="static/images/bg/bg-1.jpg" data-overlay="50">
            <div class="container">
                <div class="page-heading-content text-center">
                    <h3 class="title">职位列表</h3>
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="index.html">Home</a></li>
                        <li class="breadcrumb-item active">Jobs</li>
                    </ol>
                </div>
            </div>
        </div>
        <!-- Page Heading Section End -->

        <!-- Recent Jobs Start -->
        <div class="section section-padding">
            <div class="container">
                <div class="row mb-n5">

                    <div class="col-lg-8 col-12 mb-5 pr-lg-5">

                        <!-- Job List Wrap Start -->
                        <div class="job-list-wrap">

                            <job-item></job-item>
                            <job-item></job-item>
                            <job-item></job-item>
                            <job-item></job-item>
                            <job-item></job-item>

                        </div>
                        <!-- Job List Wrap Start -->

                        <!-- Pagination Start -->
                        <ul class="pagination pagination-center mt-5">
                            <li class="page-item"><a class="page-link" href="#"><i class="fa fa-angle-left"></i></a></li>
                            <li class="page-item active"><a class="page-link" href="#">1</a></li>
                            <li class="page-item"><a class="page-link" href="#">2</a></li>
                            <li class="page-item"><a class="page-link" href="#">3</a></li>
                            <li class="page-item"><a class="page-link" href="#">4</a></li>
                            <li class="page-item"><a class="page-link" href="#"><i class="fa fa-angle-right"></i></a></li>
                        </ul>
                        <!-- Pagination End -->

                    </div>

                    <!-- Job Sidebar Wrap Start -->
                    <div class="col-lg-4 col-12 mb-5">
                        <div class="sidebar-wrap">
                            <!-- Sidebar (Search) Start -->
                            <div class="sidebar-widget">
                                <div class="inner">
                                    <h6 class="title">职位名称</h6>
                                    <form action="#">
                                        <input type="text" placeholder="例如：前端开发工程师">
                                    </form>
                                </div>
                            </div>
                            <!-- Sidebar (Search) End -->

                            <!-- Sidebar (Location) Start -->
                            <div class="sidebar-widget">
                                <div class="inner">
                                    <h6 class="title">公司地址</h6>
                                    <form action="#">
                                        <input type="text" placeholder="Location">
                                    </form>
                                </div>
                            </div>
                            <!-- Sidebar (Location) End -->

                            <!-- Sidebar (Job Type) Start -->
                            <div class="sidebar-widget">
                                <div class="inner">
                                    <h6 class="title">工作类型</h6>
                                    <form action="#" class="mb-n1">
                                        <div class="custom-control custom-checkbox mb-1">
                                            <input type="checkbox" class="custom-control-input" id="jobtype0">
                                            <label class="custom-control-label" for="jobtype0">全职</label>
                                        </div>
                                        <div class="custom-control custom-checkbox mb-1">
                                            <input type="checkbox" class="custom-control-input" id="jobtype1">
                                            <label class="custom-control-label" for="jobtype1">兼职</label>
                                        </div>
                                        <div class="custom-control custom-checkbox mb-1">
                                            <input type="checkbox" class="custom-control-input" id="jobtype2">
                                            <label class="custom-control-label" for="jobtype2">实习</label>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <!-- Sidebar (Job Type) End -->

                            <!-- Sidebar (Salary Range) Start -->
                            <div class="sidebar-widget">
                                <div class="inner">
                                    <h6 class="title">薪资待遇</h6>
                                    <form action="#">
                                        <input type="text" id="salary-range" name="salary-range" class="range-slider" value="" />
                                    </form>
                                </div>
                            </div>
                            <!-- Sidebar (Salary Range) End -->

                            <!-- Sidebar (Qualification) Start -->
                            <div class="sidebar-widget">
                                <div class="mb-3">
                                    <input class="btn btn-primary w-100" type="submit" value="搜索">
                                </div>
                            </div>
                            <!-- Sidebar (Qualification) End -->
                        </div>
                    </div>
                    <!-- Job Sidebar Wrap End -->

                </div>
            </div>
        </div>
        <!-- Recent Jobs End -->
    </div>
</template>

<script>
    import JobItem from "./public/JobItem";

    export default {
        name: "JobList",
        components:{
            'job-item': JobItem,
        }
    }
</script>

<style scoped>

</style>
