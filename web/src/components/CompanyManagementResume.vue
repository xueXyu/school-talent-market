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
                        <el-menu-item index="申请中">未审核</el-menu-item>
                        <el-menu-item index="通过">已通过</el-menu-item>
                        <el-menu-item index="未通过">未通过</el-menu-item>
                    </el-menu>
                </div>

                <div class="job-table" v-if="resumeList">
                    <el-table
                        style="width: 100%"
                        :data="resumeList"
                        :stripe="true"
                        :max-height="600"
                        :highlight-current-row="true">
                        <el-table-column fixed prop="user.user_name" label="姓名" width="120">
                        </el-table-column>
                        <el-table-column prop="user.user_gender" label="性别" width="100">
                        </el-table-column>
                        <el-table-column prop="user.user_age" label="年龄" width="100">
                        </el-table-column>
                        <el-table-column prop="resumes.resume_education" label="学历" width="100">
                        </el-table-column>
                        <el-table-column prop="resumes.resume_working_years" label="工作经验" width="100">
                        </el-table-column>
                        <el-table-column prop="user.user_phone" label="电话" width="120">
                        </el-table-column>
                        <el-table-column prop="resumes.resume_email" label="邮箱" width="160">
                        </el-table-column>
                        <el-table-column fixed="right" label="操作" width="320">
                            <template slot-scope="scope">
                                <el-button type="primary" plain
                                           @click.native.prevent="viewRow(scope.$index, scope.row)">
                                    查看简历
                                </el-button>
                                <el-button v-if="activeState==='申请中'" type="success"
                                           @click.native.prevent="passRow(scope.$index, scope.row)">
                                    通过
                                </el-button>
                                <el-button v-if="activeState==='申请中'" type="danger" plain
                                           @click.native.prevent="nopassRow(scope.$index, scope.row)">
                                    不通过
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
        name: "CompanyManagementResume",
        components: {
            PageHeading
        },
        data() {
            return {
                pageData: {
                    'name': '管理简历',
                    'navs': [
                        {'name': 'Home', 'to': 'Home', 'active': false},
                        {'name': '个人中心', 'to': '', 'active': false},
                        {'name': '管理简历', 'to': '', 'active': true},
                    ],
                },
                activeState: '申请中',
                resumeList: null,
                current_page: 1,
                page_count: 1,
                page_size: 6,
            }
        },
        methods: {
            handleSelect(key) {
                this.activeState = key;
                this.getResumeList();
            },
            currentChange(event) {
                this.current_page = event;
                if (this.activeState === 'applyjob') {
                    this.getJobList();
                } else if (this.activeState === 'likejob') {
                    this.getLikeJobList();
                }
            },
            viewRow(index, row) {
                this.$router.push({
                    name: 'ResumeSingle',
                    params: {resumeId: row.id}
                })
            },
            passRow(index, row) {
                this.handleResume(row.id, '通过');
            },
            nopassRow(index, row) {
                this.handleResume(row.id, '未通过');
            },
            async getResumeList() {
                try {
                    await this.http.get(this.api.Job2Resume, {
                        limit: this.page_size,
                        offset: (this.current_page - 1) * this.page_size,
                        order: ['created_at', 'DESC'],
                        status: this.activeState,
                        company_id: this.store.state.userInfo.id
                    }).then(res => {
                        if (res.code == 0) {
                            this.page_count = res.data.count;
                            this.resumeList = res.data.rows;
                        } else {
                            this.$message.error(res.message);
                        }
                    });
                } catch (error) {
                    console.error(error);
                }
            },
            async handleResume(id, type) {
                try {
                    await this.http.put(this.api.Job2Resume + '/' + id, {status: type}).then(res => {
                        if (res.code == 0) {
                            this.$message.success('操作成功！');
                            this.getResumeList();
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
            this.getResumeList();
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
