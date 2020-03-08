<template>
    <div>
        <!--OffCanvas Overlay-->
        <div class="offcanvas-overlay"></div>

        <!-- Page Heading Section Start -->
        <PageHeading :page-data="pageData"></PageHeading>
        <!-- Page Heading Section End -->

        <!-- Recent Jobs Start -->
        <div class="section section-padding" v-if="resumeInfo">
            <div class="container">
                <div class="row mb-n5">
                    <!-- Job List Details Start -->
                    <div class="col-lg-8 col-12 mb-5 pr-lg-5">
                        <div class="job-list-details">
                            <div v-on:click.prevent.self="doThat" v-on:click.self.prevent="doThat">
                                <!-- Job List Start -->
                                <span class="job-list">
                                    <div class="company-logo col-auto">
                                        <el-image style="width: 70px; height: 70px;"
                                                  :src="this.util.getHost()+resumeInfo.user.user_img"
                                                  fit="fit"></el-image>
                                    </div>
                                    <div class="salary-type col-auto order-sm-3">
                                    </div>
                                    <div class="content col">
                                        <h6 class="title">{{resumeInfo.user.user_name+'（'+resumeInfo.user.user_gender+'）'}}</h6>
                                        <ul class="meta">
                                            <li><strong class="text-primary">{{resumeInfo.user.user_age}}岁</strong></li>
                                            <li><i class="fa fa-mobile-phone"></i>{{resumeInfo.user.user_phone}}</li>
                                        </ul>
                                    </div>
                                </span>
                                <!-- Job List Start -->
                            </div>
                            <div class="job-details-body mt-4">
                                <h6 class="mb-3 mt-4">求职意向</h6>
                                <div v-html="resumeInfo.resume_job_intension"></div>
                            </div>
                        </div>
                    </div>
                    <!-- Job List Details End -->

                    <!-- Job Sidebar Wrap Start -->
                    <div class="col-lg-4 col-12 mb-5">
                        <div class="sidebar-wrap">
                            <!-- Sidebar (Apply Buttons) Start -->
                            <div class="sidebar-widget" v-if="this.store.state.userRole=='company'">
                                <div class="inner">
                                    <div class="row m-n2">
                                        <div class="col-xl-auto col-lg-12 col-sm-auto col-12 p-2">
                                            <a href="/" class="d-block btn btn-primary">审核通过</a>
                                        </div>
                                        <div class="col-xl-auto col-lg-12 col-sm-auto col-12 p-2">
                                            <a href="/" class="d-block btn btn-outline-secondary">审核不通过</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- Sidebar (Apply Buttons) End -->

                            <!-- Sidebar (Job Overview) Start -->
                            <div class="sidebar-widget">
                                <div class="inner">
                                    <h6 class="title">{{resumeInfo.user.user_name}}</h6>
                                    <ul class="job-overview list-unstyled">
                                        <li><strong>邮箱：</strong>{{resumeInfo.resume_email}}</li>
                                        <li><strong>学历：</strong>{{resumeInfo.resume_education}}</li>
                                        <li><strong>工作经验：</strong>{{resumeInfo.resume_working_years}}</li>
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

    export default {
        name: "ResumeSingle",
        components: {
            PageHeading,
        },
        data() {
            return {
                pageData: {
                    'name': '简历详情',
                    'navs': [
                        {'name': 'Home', 'to': 'Home', 'active': false},
                        {'name': '简历管理', 'to': '', 'active': false},
                        {'name': '简历详情', 'to': '', 'active': true},
                    ],
                },
                resumeInfo: null,
            }
        },
        methods: {
            async getResume() {
                try {
                    await this.http.get(this.api.UserResume + '/' + this.$route.params.resumeId).then(res => {
                        if (res.code == 0) {
                            this.resumeInfo = res.data;
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
            this.getResume();
        }
    }
</script>

<style scoped>

</style>
