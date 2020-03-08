<template>
    <div>
        <!--OffCanvas Overlay-->
        <div class="offcanvas-overlay"></div>

        <!-- Page Heading Section Start -->
        <PageHeading :page-data="pageData"></PageHeading>
        <!-- Page Heading Section End -->

        <!-- Recent Jobs Start -->
        <div class="section section-padding" v-if="jobInfo">
            <div class="container">
                <div class="row mb-n5">
                    <!-- Job List Details Start -->
                    <div class="col-lg-8 col-12 mb-5 pr-lg-5">
                        <div class="job-list-details">
                            <div>
                                <JobItem ref="childd" :jobInfo="jobInfo" :companyInfo="jobInfo.company" ></JobItem>
                            </div>
                            <div class="job-details-body mt-4">
                                <h6 class="mb-3">职责描述</h6>
                                <div v-html="jobInfo.job_description"></div>
                            </div>
                        </div>
                    </div>
                    <!-- Job List Details End -->

                    <!-- Job Sidebar Wrap Start -->
                    <div class="col-lg-4 col-12 mb-5">
                        <div class="sidebar-wrap">
                            <!-- Sidebar (Apply Buttons) Start -->
                            <div class="sidebar-widget" v-if="this.store.state.userRole=='user'">
                                <div class="inner">
                                    <div class="row m-n2">
                                        <div class="col-xl-auto col-lg-12 col-sm-auto col-12 p-2">
                                            <a href="/" class="d-block btn btn-outline-success">
                                                <i class="fa fa-heart-o mr-1"></i>收藏职位
                                            </a>
                                        </div>
                                        <div class="col-xl-auto col-lg-12 col-sm-auto col-12 p-2">
                                            <a href="/" class="d-block btn btn-primary">申请职位</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- Sidebar (Apply Buttons) End -->

                            <!-- Sidebar (Job Overview) Start -->
                            <div class="sidebar-widget">
                                <div class="inner">
                                    <h6 class="title">公司信息</h6>
                                    <ul class="job-overview list-unstyled">
                                        <li><strong>公司名称：</strong>{{jobInfo.company.company_name}}</li>
                                        <li><strong>创立时间：</strong>{{jobInfo.company.company_create}}</li>
                                        <li><strong>公司规模：</strong>{{jobInfo.company.company_size}}</li>
                                        <li><strong>公司地址：</strong>{{jobInfo.company.company_address}}</li>
                                        <li><strong>公司网站：</strong><a :href="jobInfo.company.company_site" target="_blank" >{{jobInfo.company.company_site}}</a></li>
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
        name: "JobSingle",
        components: {
            PageHeading,
            JobItem,
        },
        data() {
            return {
                pageData: {
                    'name': '招聘详情',
                    'navs': [
                        {'name': 'Home', 'to': 'Home', 'active': false},
                        {'name': '管理招聘', 'to': '', 'active': false},
                        {'name': '招聘详情', 'to': '', 'active': true},
                    ],
                },
                jobInfo: null,
            }
        },
        methods: {
            async getJob() {
                try {
                    await this.http.get(this.api.CompanyJob + '/' + this.$route.params.jobId).then(res => {
                        if (res.code == 0) {
                            this.jobInfo = res.data;
                        } else {
                            this.$message.error(res.message);
                        }
                    });
                } catch (error) {
                    console.error(error);
                }
            },
        },
        mounted() {
            this.getJob();
        }
    }
</script>

<style scoped>

</style>
