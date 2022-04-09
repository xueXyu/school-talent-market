<template>
    <div>
        <!--OffCanvas Overlay-->
        <div class="offcanvas-overlay"></div>

        <!-- Page Heading Section Start -->
        <PageHeading :page-data="pageData"></PageHeading>
        <!-- Page Heading Section End -->

        <div class="section section-padding">
            <div class="container">
                <div class="job-switch">
                    <el-menu class="el-menu-demo"
                             :default-active="activeState"
                             mode="horizontal"
                             @select="handleSelect">
                        <el-menu-item index="applyjob">申请的职位</el-menu-item>
 <el-menu-item index="likejob">收藏的职位</el-menu-item>
                    </el-menu>
                </div>

                <div class="job-table" v-if="jobList">
                    <el-table
                        style="width: 100%"
                        :data="jobList"
                        :stripe="true"
                        :max-height="600"
                        :highlight-current-row="true">
                        <el-table-column fixed prop="jobs.job_name" label="职位名称" width="240">
                        </el-table-column>
                        <el-table-column prop="company.company_name" label="公司名称" width="300">
                        </el-table-column>
                        <el-table-column prop="jobs.job_salary" label="薪资待遇" width="150">
                        </el-table-column>
                        <el-table-column prop="jobs.job_way" label="工作性质" width="100">
                        </el-table-column>
                        <el-table-column prop="jobs.job_gender" label="性别要求" width="100">
                        </el-table-column>
                        <el-table-column v-if="activeState==='applyjob'" prop="resumes.resume_name" label="申请简历"
                                         width="180">
                        </el-table-column>
                        <el-table-column
                            v-if="activeState==='applyjob'"
                            prop="state"
                            label="状态"
                            :filters="stateFilters"
                            :filter-method="filterState"
                            filter-placement="top">
                            <template slot-scope="scope">
                                <el-tag
                                    :type="stateColor(scope.row.status)"
                                    effect="dark"
                                    disable-transitions>{{scope.row.status}}
                                </el-tag>
                            </template>
                        </el-table-column>

                        <el-table-column v-if="activeState==='likejob'" fixed="right" label="操作">
                            <template slot-scope="scope" v-if="activeState==='likejob'">
                                <el-button type="info"
                                           @click.native.prevent="singleRow(scope.$index, scope.row)"
                                           plain>查看
                                </el-button>
                                <el-button type="primary"
                                           @click.native.prevent="editRow(scope.$index, scope.row)"
                                           plain>取消收藏
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>

                    <!-- Pagination Start -->
                    <el-pagination
                        class="pagination"
                        :hide-on-single-page="true"
                        background
                        layout="total,prev, pager, next"
                        @current-change="currentChange"
                        :page-size="page_size"
                        :total="page_count">
                    </el-pagination>
                    <!-- Pagination End -->

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import PageHeading from "./public/PageHeading";

    export default {
        name: "UserManagementJobs",
        components: {
            PageHeading
        },
        data() {
            return {
                pageData: {
                    'name': '管理招聘',
                    'navs': [
                        {'name': 'Home', 'to': 'Home', 'active': false},
                        {'name': '个人中心', 'to': '', 'active': false},
                        {'name': '管理招聘', 'to': '', 'active': true},
                    ],
                },
                stateFilters: [
                    {text: '申请中 ', value: '申请中'},
                    {text: '通过', value: '通过'},
                    {text: '未通过', value: '未通过'},
                ],
                activeState: 'applyjob',
                jobList: null,
                current_page: 1,
                page_count: 1,
                page_size: 6,
            }
        },
        methods: {
            handleSelect(key) {
                this.activeState = key;
                if (this.activeState === 'applyjob') {
                    this.getJobList();
                } else if (this.activeState === 'likejob') {
                    this.getLikeJobList();
                }
            },
            stateColor(val) {
                switch (val) {
                    case '通过':
                        return 'success';
                    case '未通过':
                        return 'danger';
                    case '申请中':
                        return 'primary';
                }
            },
            filterState(value, row) {
                return row.status === value;
            },
            singleRow(index, row) {
                this.$router.push({
                    name: 'JobSingle',
                    params: {jobId: row.jobs.id}
                });
            },
            editRow(index, row) {
                this.cancelLikeJob(row.id);
            },
            currentChange(event) {
                this.current_page = event;
                if (this.activeState === 'applyjob') {
                    this.getJobList();
                } else if (this.activeState === 'likejob') {
                    this.getLikeJobList();
                }
            },
            async getLikeJobList() {
                try {
                    await this.http.get(this.api.UserLikeJob, {
                        limit: this.page_size,
                        offset: (this.current_page - 1) * this.page_size,
                        order: ['created_at', 'DESC'],
                        user_id: this.store.state.userInfo.id
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
            async getJobList() {
                try {
                    await this.http.get(this.api.Job2Resume, {
                        limit: this.page_size,
                        offset: (this.current_page - 1) * this.page_size,
                        order: ['created_at', 'DESC'],
                        user_id: this.store.state.userInfo.id
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
            async cancelLikeJob(id) {
                try {
                    await this.http.delete(this.api.UserLikeJob + '/' + id).then(res => {
                        if (res.code == 0) {
                            this.$message.success('取消收藏成功！');
                            this.getLikeJobList();
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
            this.getJobList();
        }

    }
</script>

<style scoped>
    .job-switch {
        line-height: 60px;
        text-align: right;
    }

    .job-add {
        width: 120px;
        margin-right: 30px;
    }

    .pagination {
        display: flex;
        justify-content: center;
        padding-top: 90px;
    }
</style>
