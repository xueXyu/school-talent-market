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
                    <el-button class="job-add" type="success">
                        <router-link :to="{name:'CreateResume'}">新增简历</router-link>
                    </el-button>
                </div>

                <div class="job-table">
                    <el-table
                        style="width: 100%"
                        :data="resumeList"
                        :stripe="true"
                        :max-height="600"
                        :highlight-current-row="true">
                        <el-table-column fixed prop="resume_name" label="简历名称" width="200">
                        </el-table-column>
                        <el-table-column prop="created_at" label="创建时间" width="200">
                        </el-table-column>
                        <el-table-column prop="resume_education" label="学历" width="120">
                        </el-table-column>
                        <el-table-column prop="resume_working_years" label="工作经验" width="120">
                        </el-table-column>
                        <el-table-column prop="resume_email" label="邮箱" width="200">
                        </el-table-column>
                        <el-table-column fixed="right" label="操作" width="280">
                            <template slot-scope="scope">
                                <el-button type="info"
                                           @click.native.prevent="singleRow(scope.$index, scope.row)"
                                           plain>查看
                                </el-button>
                                <el-button type="primary"
                                           @click.native.prevent="editRow(scope.$index, scope.row)"
                                           plain>修改
                                </el-button>
                                <el-button type="danger"
                                           @click.native.prevent="deleteRow(scope.$index, scope.row)"
                                           plain>删除
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
        name: "UserManagementResume",
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
                resumeList: null,
                current_page: 1,
                page_count: 1,
                page_size: 6,
            }
        },
        methods: {
            singleRow(index, row) {
                this.$router.push({
                    name: 'ResumeSingle',
                    params: {resumeId: row.id}
                });
            },
            editRow(index, row) {
                this.$router.push({
                    name: 'EditResume',
                    params: {resumeId: row.id}
                });
            },
            deleteRow(index, row) {
                this.$confirm('此操作将永久删除该改简历, 是否继续?', '删除提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.delResume(row.id);
                }).catch(() => {
                });
            },
            currentChange(event) {
                this.current_page = event;
                this.getResumeList();
            },
            async getResumeList() {
                try {
                    await this.http.get(this.api.UserResume, {
                        limit: this.page_size,
                        offset: (this.current_page - 1) * this.page_size,
                        order: ['created_at', 'DESC'],
                        user_id: this.store.state.userInfo.id
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
            async delResume(resumeId) {
                try {
                    await this.http.delete(this.api.UserResume + '/' + resumeId).then(res => {
                        if (res.code == 0) {
                            this.$message.error('删除成功！');
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
