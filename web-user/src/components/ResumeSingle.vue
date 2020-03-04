<template>
    <div>
        <!--OffCanvas Overlay-->
        <div class="offcanvas-overlay"></div>

        <!-- Page Heading Section Start -->
        <PageHeading :page-data="pageData"></PageHeading>
        <!-- Page Heading Section End -->

        <!-- Recent Jobs Start -->
        <div class="section section-padding">
            <div class="container">
                <div class="row mb-n5">
                    <!-- Job List Details Start -->
                    <div class="col-lg-8 col-12 mb-5 pr-lg-5">
                        <div class="job-list-details">
                            <div v-on:click.prevent.self="doThat" v-on:click.self.prevent="doThat">
                                <JobItem></JobItem>
                            </div>
                            <div class="job-details-body mt-4">
                                <h6 class="mb-3 mt-4">简历信息</h6>
                                <ul>
                                    <li>Proven work experienceas a web designer</li>
                                    <li>Demonstrable graphic design skills with a strong portfolio</li>
                                    <li>Proficiency in HTML, CSS and JavaScript for rapid prototyping</li>
                                    <li>Experience working in an Agile/Scrum development process</li>
                                    <li>Proven work experienceas a web designer</li>
                                    <li>Excellent visual design skills with sensitivity to user-system interaction</li>
                                    <li>Ability to solve problems creatively and effectively</li>
                                    <li>Proven work experienceas a web designer</li>
                                    <li>Up-to-date with the latest Web trends, techniques and technologies</li>
                                    <li>BS/MS in Human-Computer Interaction, Interaction Design or a Visual Arts subject</li>
                                </ul>
                                <h6 class="mb-3 mt-4">Education + Experience</h6>
                                <ul>
                                    <li>Advanced degree or equivalent experience in graphic and web design</li>
                                    <li>3 or more years of professional design experience</li>
                                    <li>Direct response email experience</li>
                                    <li>Ecommerce website design experience</li>
                                    <li>Familiarity with mobile and web apps preferred</li>
                                    <li>Excellent communication skills, most notably a demonstrated ability to solicit and address creative and design feedback</li>
                                    <li>Must be able to work under pressure and meet deadlines while maintaining a positive attitude and providing exemplary customer service</li>
                                    <li>Ability to work independently and to carry out assignments to completion within parameters of instructions given, prescribed routines, and standard accepted practices</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <!-- Job List Details End -->

                    <!-- Job Sidebar Wrap Start -->
                    <div class="col-lg-4 col-12 mb-5">
                        <div class="sidebar-wrap">
                            <!-- Sidebar (Apply Buttons) Start -->
                            <div class="sidebar-widget">
                                <div class="inner">
                                    <div class="row m-n2">
                                        <div class="col-xl-auto col-lg-12 col-sm-auto col-12 p-2">
                                            <a href="#" class="d-block btn btn-primary">审核通过</a>
                                        </div>
                                        <div class="col-xl-auto col-lg-12 col-sm-auto col-12 p-2">
                                            <a href="#" class="d-block btn btn-outline-secondary">审核不通过</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- Sidebar (Apply Buttons) End -->

                            <!-- Sidebar (Job Overview) Start -->
                            <div class="sidebar-widget">
                                <div class="inner">
                                    <h6 class="title">姓名</h6>
                                    <ul class="job-overview list-unstyled">
                                        <li><strong>投递时间:</strong> Nov 6, 2019</li>
                                        <li><strong>个人信息:</strong> Nov 6, 2019</li>
                                        <li><strong>个人信息:</strong> Nov 6, 2019</li>
                                        <li><strong>个人信息:</strong> Nov 6, 2019</li>
                                    </ul>
                                </div>
                            </div>
                            <!-- Sidebar (Job Overview) End -->

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
    import PageHeading from "./public/PageHeading";
    import JobItem from "./public/JobItem";

    export default {
        name: "ResumeSingle",
        components:{
            PageHeading,
            JobItem,
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
