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
          <router-link :to="{name:'CreateJob'}">
            <el-button class="job-add" type="success">新增招聘</el-button>
          </router-link>
        </div>

        <div class="job-table">
          <el-table style="width: 100%" :data="jobList" :stripe="true" :max-height="600" :highlight-current-row="true">
            <el-table-column fixed prop="job_name" label="职位名称" width="200"></el-table-column>
            <el-table-column prop="job_salary" label="薪资待遇" width="150"></el-table-column>
            <el-table-column prop="job_way" label="工作性质" width="150"></el-table-column>
            <el-table-column prop="job_gender" label="性别要求" width="150"></el-table-column>
            <el-table-column fixed="right" label="操作" width="280">
              <template slot-scope="scope">
                <el-button type="info" @click.native.prevent="singleRow(scope.$index, scope.row)" plain>查看</el-button>
                <el-button type="primary" @click.native.prevent="editRow(scope.$index, scope.row)" plain>修改</el-button>
                <el-button type="danger" @click.native.prevent="deleteRow(scope.$index, scope.row)" plain>删除</el-button>
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
            :total="page_count"
          ></el-pagination>
          <!-- Pagination End -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageHeading from './public/PageHeading';

export default {
    name: 'CompanyManagementJobs',
    components: {
        PageHeading
    },
    data() {
        return {
            pageData: {
                name: '管理招聘',
                navs: [
                    { name: 'Home', to: 'Home', active: false },
                    { name: '个人中心', to: '', active: false },
                    { name: '管理招聘', to: '', active: true }
                ]
            },
            jobList: null,
            current_page: 1,
            page_count: 1,
            page_size: 6
        };
    },
    methods: {
        singleRow(index, row) {
            this.$router.push({
                name: 'JobSingle',
                params: { jobId: row.id }
            });
        },
        editRow(index, row) {
            this.$router.push({
                name: 'EditJob',
                params: { jobId: row.id }
            });
        },
        deleteRow(index, row) {
            this.$confirm('此操作将永久删除该改简历, 是否继续?', '删除提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.delJob(row.id);
                })
                .catch(() => {});
        },
        currentChange(event) {
            this.current_page = event;
            this.getJobList();
        },
        async getJobList() {
            try {
                await this.http
                    .get(this.api.CompanyJob, {
                        limit: this.page_size,
                        offset: (this.current_page - 1) * this.page_size,
                        order: ['created_at', 'DESC'],
                        company_id: this.store.state.userInfo.id
                    })
                    .then(res => {
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
        async delJob(jobId) {
            try {
                await this.http.delete(this.api.CompanyJob + '/' + jobId).then(res => {
                    if (res.code == 0) {
                        this.$message.success('删除成功！');
                        this.getJobList();
                    } else {
                        this.$message.error(res.message);
                    }
                });
            } catch (error) {
                console.error(error);
            }
        }
    },
    mounted() {
        this.getJobList();
    }
};
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
