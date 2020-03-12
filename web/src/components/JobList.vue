<template>
    <div>
        <!--OffCanvas Overlay-->
        <div class="offcanvas-overlay"></div>

        <!-- Page Heading Section Start -->
        <PageHeading :page-data="pageData"></PageHeading>
        <!-- Page Heading Section End -->

        <!-- Recent Jobs Start -->
        <div class="section section-padding job-all-list">
            <div class="container">
                <div class="row mb-n5">

                    <div class="col-lg-8 col-12 mb-5 pr-lg-5">

                        <!-- Job List Wrap Start -->
                        <div class="job-list-wrap">

                            <JobItem v-for="(item,index) in jobList" :key="index"
                                     :jobInfo="item"
                                     :companyInfo="item.company"></JobItem>

                        </div>
                        <!-- Job List Wrap Start -->

                        <!-- Pagination Start -->
                        <el-pagination
                            class="pagination"
                            :hide-on-single-page="true"
                            background
                            layout="prev, pager, next"
                            @current-change="currentChange"
                            :page-size="page_size"
                            :total="page_count">
                        </el-pagination>
                        <!-- Pagination End -->

                    </div>

                    <!-- Job Sidebar Wrap Start -->
                    <div class="col-lg-4 col-12 mb-5">
                        <div class="sidebar-wrap">
                            <!-- Sidebar (Search) Start -->
                            <div class="sidebar-widget">
                                <div class="inner">
                                    <h6 class="title" style="margin-bottom: 30px;">搜索</h6>
                                    <el-form ref="searchForm" :model="searchForm" label-position="top"
                                             label-width="100%">
                                        <el-form-item label="职位名称" class="job-list-search-label">
                                            <el-input v-model="searchForm.job_name"></el-input>
                                        </el-form-item>
                                        <el-form-item label="工作性质">
                                            <el-select v-model="searchForm.job_way" auto-complete="off">
                                                <el-option label="所有类型" value="所有类型"></el-option>
                                                <el-option label="全职" value="全职"></el-option>
                                                <el-option label="兼职" value="兼职"></el-option>
                                                <el-option label="实习" value="实习"></el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item>
                                            <el-button type="primary" @click="searchJobs">搜索</el-button>
                                        </el-form-item>
                                    </el-form>
                                </div>
                            </div>
                            <!-- Sidebar (Search) End -->

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
        name: "JobList",
        components: {
            JobItem,
            PageHeading
        },
        data() {
            return {
                pageData: {
                    'name': '招聘列表',
                    'navs': [
                        {'name': 'Home', 'to': 'Home', 'active': false},
                        {'name': '招聘列表', 'to': '', 'active': true},
                    ],
                },
                searchWhere: null,
                searchForm: {
                    job_name: null,
                    job_way: null,
                },
                jobList: null,
                current_page: 1,
                page_count: 1,
                page_size: 12,
            }
        },
        methods: {
            currentChange(event) {
                this.current_page = event;
                this.getJobList();
            },
            homeSearchJobs() {
                // 是否有首页搜索跳转
                if (!_.isEmpty(this.$route.params)) {
                    this.searchWhere = this.$route.params;
                    if (!_.isEmpty(this.searchWhere.job_name)) {
                        this.searchForm.job_name = this.searchWhere.job_name;
                    }
                    if (!_.isEmpty(this.searchWhere.job_way)) {
                        this.searchForm.job_way = this.searchWhere.job_way;
                    }

                    this.searchJobList();
                } else {
                    this.getJobList();
                }
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
                    this.searchWhere = searchWhere;
                    this.searchJobList();
                } else {
                    this.getJobList();
                }
            },
            async searchJobList() {
                try {
                    await this.http.post(this.api.CompanyJobSeearch, this.searchWhere).then(res => {
                        if (res.code == 0) {
                            this.page_count = 0;
                            this.jobList = res.data.rows;
                        } else {
                            this.$message.error(res.message);
                        }
                    });
                } catch (error) {
                    console.error(error);
                }
            },
            async getJobList() {
                try {
                    await this.http.get(this.api.CompanyJob, {
                        limit: this.page_size,
                        offset: (this.current_page - 1) * this.page_size,
                        order: ['created_at', 'DESC'],
                    }).then(res => {
                        if (res.code == 0) {
                            this.page_count = res.data.count;
                            this.jobList = res.data.rows;
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
            this.homeSearchJobs();
        }
    }
</script>

<style scoped>
    .pagination {
        display: flex;
        justify-content: center;
        padding-top: 90px;
    }

    .job-all-list .el-form .el-form-item .el-form-item__content .el-button {
        width: 100%;
        margin-top: 20px;
    }

    .job-list-search-label {
        margin-bottom: 18px;
    }
</style>

<style>
    .job-list-search-label .el-form--label-top .el-form-item__label,
    .job-list-search-label .el-form-item__label,
    .job-list-search-label label {
        padding: 0;
        margin: 0;
    }
</style>
