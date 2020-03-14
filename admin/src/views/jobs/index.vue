<template>
  <div class="app-container">
    <el-table
      :loading="listLoading"
      :data="jobList"
      :stripe="true"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column fixed align="center" label="序号" width="60">
        <template slot-scope="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>
      <el-table-column fixed prop="company.company_name" label="公司名称" align="center" width="200" />
      <el-table-column fixed prop="job_name" label="职位名称" align="center" />
      <el-table-column prop="job_salary" label="薪资待遇" align="center" />
      <el-table-column prop="job_way" label="工作性质" align="center" />
      <el-table-column prop="job_gender" label="性别要求" align="center" />
      <el-table-column prop="job_description" label="职责描述" align="center" width="120">
        <template slot-scope="scope">
          <div
            style="width: 100px; height: 50px; overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
            v-html="scope.row.job_description"
          />
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center" width="200">
        <template slot-scope="scope">
          <el-button
            type="primary"
            plain
            @click.native.prevent="handleUpdate(scope.row)"
          >修改
          </el-button>
          <el-button
            type="danger"
            plain
            @click.native.prevent="handleDelete(scope.row)"
          >删除
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
      :page-size="page_size"
      :total="page_count"
      @current-change="currentChange"
    />
    <!-- Pagination End -->

    <!--    修改弹窗-->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogVisible">
      <el-form
        ref="dataForm"
        :model="temp"
        :rules="rules"
        label-position="left"
        label-width="100px"
        style="margin-left:20px;"
      >
        <el-form-item label="职位名称" prop="job_name" required>
          <el-input v-model="temp.job_name" />
        </el-form-item>
        <el-form-item label="薪资待遇" prop="job_salary" required>
          <el-input v-model="temp.job_salary" />
        </el-form-item>
        <el-form-item label="性别要求" prop="job_gender" required>
          <el-select v-model="temp.job_gender" auto-complete="off">
            <el-option label="无" value="无" />
            <el-option label="男" value="男" />
            <el-option label="女" value="女" />
          </el-select>
        </el-form-item>
        <el-form-item label="工作性质" prop="job_way" required>
          <el-select v-model="temp.job_way" auto-complete="off">
            <el-option label="全职" value="全职" />
            <el-option label="兼职" value="兼职" />
            <el-option label="实习" value="实习" />
          </el-select>
        </el-form-item>
        <el-form-item label="职责描述" prop="job_description" required>
          <QEditor ref="childQeditor" :editorcontent.sync="temp.job_description" @func="getQEditorContent" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          确认
        </el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { jobList, updateJob, deleteJob } from '@/api/job'
import QEditor from '../public/QEditor'

export default {
  components: {
    QEditor
  },
  data() {
    return {
      jobList: null,
      listLoading: true,
      imgHost: process.env.VUE_APP_BASE_API,
      current_page: 1,
      page_count: 1,
      page_size: 6,
      dialogVisible: false,
      dialogStatus: '',
      textMap: {
        'create': '新增招聘',
        'update': '修改招聘信息'
      },
      temp: {
        id: null,
        job_name: null,
        job_salary: null,
        job_gender: null,
        job_way: null,
        job_description: null
      },
      rules: {
        job_name: [
          { required: true, message: '请输入职位名称', trigger: ['blur', 'change'] },
          { min: 2, max: 32, message: '长度在 2 到 32 个字符', trigger: ['blur', 'change'] }
        ],
        job_salary: [
          { required: true, message: '请输入薪资待遇', trigger: ['blur', 'change'] }
        ],
        job_gender: [
          { required: true, message: '请选择性别要求', trigger: 'blur' },
          {
            type: 'enum',
            enum: ['无', '男', '女'],
            message: '请选择正确的性别要求'
          }
        ],
        job_way: [
          { required: true, message: '请选择工作性质', trigger: 'blur' },
          {
            type: 'enum',
            enum: ['全职', '兼职', '实习'],
            message: '请选择正确的工作性质'
          }
        ],
        job_description: [
          { required: true, message: '请输入职责描述', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      jobList({
        limit: this.page_size,
        offset: (this.current_page - 1) * this.page_size,
        order: ['created_at', 'DESC']
      }).then(res => {
        this.jobList = res.data.rows
        this.page_count = res.data.count
        this.listLoading = false
      })
    },
    currentChange(page) {
      this.current_page = page
      this.fetchData()
    },
    resetTemp() {
      this.temp = {
        id: null,
        job_name: null,
        job_salary: null,
        job_gender: null,
        job_way: null,
        job_description: null
      }
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row)
      this.dialogStatus = 'update'
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          var id = this.temp.id
          delete this.temp.id
          delete this.temp.created_at
          delete this.temp.company_id
          delete this.temp.company
          updateJob(id, this.temp).then(res => {
            if (res.code === 0) {
              this.$message.success('招聘信息，修改成功')
              this.dialogVisible = false
              this.fetchData()
            } else {
              this.$message.error(res.message)
            }
          })
        }
      })
    },
    handleDelete(row) {
      this.$confirm('此操作将永久删除招聘数据, 是否继续?', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteData(row.id)
      }).catch(() => {
      })
    },
    deleteData(id) {
      deleteJob(id).then(res => {
        if (res.code === 0) {
          this.$message.success('招聘信息，删除成功')
          this.fetchData()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    getQEditorContent(data) {
      // 接受子组件的传值
      this.ruleForm.company_detail = data
    }
  }
}
</script>

<style scoped>
  .pagination {
    display: flex;
    justify-content: center;
    padding-top: 30px;
  }

  .add-user {
    text-align: right;
    margin: 10px 0;
  }

  .el-form-item:last-child {
    margin: 0;
  }
</style>
