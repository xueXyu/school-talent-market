<template>
    <div>
        <!--OffCanvas Overlay-->
        <div class="offcanvas-overlay"></div>

        <!-- Page Heading Section Start -->
        <PageHeading :page-data="pageData"></PageHeading>
        <!-- Page Heading Section End -->

        <!-- Company List Start -->
        <div class="section section-padding" v-if="companyInfo">
            <div class="container">
                <div class="row mb-n5">

                    <div class="col-lg-8 col-12 mb-5 pr-lg-5">

                        <!-- Company Details Start -->
                        <div class="company-details">
                            <h5 class="mb-3">公司简介</h5>
                            <div v-html="companyInfo.company_detail"></div>
                        </div>
                        <!-- Company Details Start -->

                        <!-- Job List Wrap Start -->
                        <div class="job-list-wrap mt-5">
                            <JobItem v-for="(item,index) in companyInfo.jobs" :key="index"
                                     :jobInfo="item"
                                     :companyInfo="companyInfo"></JobItem>
                        </div>
                        <!-- Job List Wrap Start -->

                    </div>

                    <!-- Company Sidebar Wrap Start -->
                    <div class="col-lg-4 col-12 mb-5">
                        <div class="sidebar-wrap">
                            <!-- Sidebar (Company) Start -->
                            <div class="sidebar-widget">
                                <div class="inner">
                                    <div class="sidebar-company">
                                        <span class="company-logo">
                                            <el-image style="width: 70px; height: 70px;"
                                                      :src="this.util.getHost()+companyInfo.company_img"
                                                      fit="fit"></el-image>
                                        </span>
                                        <h6 class="title">{{companyInfo.company_name}}</h6>
                                        <ul>
                                            <li><strong>成立时间：</strong>{{companyInfo.company_create}}</li>
                                            <li><strong>公司规模：</strong>{{companyInfo.company_size}}</li>
                                            <li><strong>公司地址：</strong>{{companyInfo.company_address}}</li>
                                            <li><strong>公司网站：</strong>
                                                <a :href="companyInfo.company_site" target="_blank">{{companyInfo.company_site}}</a>
                                            </li>
                                            <li><strong>空缺职位:</strong> {{companyInfo.jobs.length}} 个</li>
                                            <li><strong>联系人：</strong>{{companyInfo.company_contacts}}</li>
                                            <li><strong>联系电话：</strong>{{companyInfo.company_phone}}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <!-- Sidebar (Company) End -->
                        </div>
                    </div>
                    <!-- Company Sidebar Wrap End -->
                </div>
            </div>
        </div>
        <!-- Company List End -->
    </div>
</template>

<script>
    import PageHeading from "./public/PageHeading";
    import JobItem from "./public/JobItem";

    export default {
        name: "CompanySingle",
        components: {
            JobItem,
            PageHeading
        },
        data() {
            return {
                pageData: {
                    'name': '公司详情',
                    'navs': [
                        {'name': 'Home', 'to': 'Home', 'active': false},
                        {'name': '公司', 'to': 'Company', 'active': false},
                        {'name': '公司详情', 'to': '', 'active': true},
                    ],
                },
                companyInfo: null,
                jobsCount: 0,
            }
        },
        methods: {
            async getCompany() {
                try {
                    await this.http.get(this.api.Company + '/' + this.$route.params.companyId).then(res => {
                        if (res.code == 0) {
                            this.companyInfo = res.data;
                            this.jobsCount = res.data.jobs.length;
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
            this.getCompany();
        }
    }
</script>

<style scoped>

</style>
