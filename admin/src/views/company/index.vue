<template>
  <div class="app-container">
    <div class="add-user">
      <el-button type="success" @click="handleCreate">
        新增公司
      </el-button>
    </div>

    <el-table
      :loading="listLoading"
      :data="companyList"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="序号" width="60">
        <template slot-scope="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>
      <el-table-column prop="company_account" label="账号" align="center" width="120" />
      <el-table-column prop="company_name" label="公司名称" align="center" width="240" />
      <el-table-column prop="company_create" label="创立日期" align="center" width="120" />
      <el-table-column prop="company_size" label="公司规模" align="center" width="120" />
      <el-table-column prop="company_address" label="公司地址" align="center" width="200" />
      <el-table-column prop="company_site" label="公司网站" align="center" width="200" />
      <el-table-column prop="company_contacts" label="联系人" align="center" width="120" />
      <el-table-column prop="company_phone" label="联系电话" align="center" width="120" />
      <el-table-column prop="company_detail" label="公司简介" align="center" width="120">
        <template slot-scope="scope">
          <div
            style="width: 100px; height: 50px; overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
            v-html="scope.row.company_detail"
          />
        </template>
      </el-table-column>
      <el-table-column prop="company_img" label="公司照片" align="center" width="200">
        <template slot-scope="scope">
          <el-image
            style="width: 70px; height: 70px; line-height: 70px;"
            :src="imgHost+scope.row.company_img"
            fit="fit"
          >
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline" style="font-size: 2em; color: #909399;" />
            </div>
          </el-image>
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
        style="margin-left: 10px;"
      >
        <el-form-item label="账号" prop="company_account" required>
          <el-input v-model="temp.company_account" :disabled="dialogStatus==='update'" />
        </el-form-item>
        <el-form-item label="密码" prop="company_password" required>
          <el-input v-model="temp.company_password" :disabled="dialogStatus==='update'" />
        </el-form-item>
        <el-form-item label="公司名称" prop="company_name" required>
          <el-input v-model="temp.company_name" />
        </el-form-item>
        <el-form-item label="联系人" prop="company_contacts" required>
          <el-input v-model="temp.company_contacts" />
        </el-form-item>
        <el-form-item label="联系电话" prop="company_phone" required>
          <el-input v-model="temp.company_phone" type="tel" />
        </el-form-item>
        <el-form-item label="创立日期" prop="company_create" required>
          <el-date-picker
            v-model="temp.company_create"
            type="date"
            placeholder="创立日期"
          />
        </el-form-item>
        <el-form-item label="公司规模" prop="company_size" required>
          <el-select v-model="temp.company_size" auto-complete="off">
            <el-option label="0-20人" value="0-20人" />
            <el-option label="20-99人" value="20-99人" />
            <el-option label="100-499人" value="100-499人" />
            <el-option label="500-999人" value="500-999人" />
            <el-option label="1000-9999人" value="1000-9999人" />
            <el-option label="10000人以上" value="10000人以上" />
          </el-select>
        </el-form-item>
        <el-form-item label="公司地址" prop="company_address" required>
          <el-input v-model="temp.company_address" />
        </el-form-item>
        <el-form-item label="公司网站" prop="company_site" required>
          <el-input v-model="temp.company_site" />
        </el-form-item>
        <el-form-item label="公司照片" prop="company_img" required>
          <Uploader ref="childUploader" :imgurl.sync="temp.company_img" @func="getUploadUrl" />
        </el-form-item>
        <el-form-item label="公司简介" prop="company_detail" required>
          <QEditor ref="childQeditor" :editorcontent.sync="temp.company_detail" @func="getQEditorContent" />
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
import { companyList, createCompany, updateCompany, deleteCompany } from '@/api/company'
import { isvalidPhone } from '@/utils/index'
import Uploader from '../public/Uploader'
import QEditor from '../public/QEditor'

export default {
  components: {
    Uploader,
    QEditor
  },
  data() {
    var validPhone = (rule, value, callback) => {
      if (!value || value === null || value === '') {
        callback(new Error('请输入电话号码'))
      } else if (!isvalidPhone(value)) {
        callback(new Error('请输入正确的11位电话号码'))
      } else {
        callback()
      }
    }
    var checkUsername = (rule, value, callback) => {
      var patt = /^[a-zA-Z0-9]{3,30}$/
      if (patt.test(value)) {
        callback()
      } else {
        callback(new Error('密码只能包含数字和字母!'))
      }
    }
    return {
      companyList: null,
      listLoading: true,
      imgHost: process.env.VUE_APP_BASE_API,
      current_page: 1,
      page_count: 1,
      page_size: 6,
      dialogVisible: false,
      dialogStatus: '',
      textMap: {
        'create': '新增公司',
        'update': '修改公司信息'
      },
      temp: {
        id: null,
        company_account: null,
        company_password: null,
        company_name: null,
        company_phone: null,
        company_contacts: null,
        company_create: null,
        company_size: null,
        company_address: null,
        company_site: null,
        company_detail: null,
        company_img: null
      },
      rules: {
        company_account: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 3, max: 30, message: '账号长度在 3 到 30 个字符', trigger: 'blur' },
          { validator: checkUsername, trigger: 'blur' }
        ],
        company_password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 30, message: '密码长度在 6 到 30 个字符', trigger: 'blur' }
        ],
        company_name: [
          { required: true, message: '请输入公司名称', trigger: ['blur', 'change'] },
          { min: 2, max: 100, message: '长度在 2 到 100 个字符', trigger: ['blur', 'change'] }
        ],
        company_contacts: [
          { required: true, message: '请输入公司联系人', trigger: ['blur', 'change'] },
          { min: 2, max: 32, message: '长度在 2 到 32 个字符', trigger: ['blur', 'change'] }
        ],
        company_phone: [
          { required: true, trigger: ['change', 'blur'], validator: validPhone }
        ],
        company_create: [
          { required: true, message: '请选择公司创立时间', trigger: ['blur', 'change'] }
        ],
        company_size: [
          { required: true, message: '请选择公司规模', trigger: ['change', 'blur'] },
          {
            type: 'enum',
            enum: ['0-20人', '20-99人', '100-499人', '500-999人', '1000-9999人', '10000人以上'],
            message: '请选择正确的公司规模'
          }
        ],
        company_address: [
          { required: true, message: '请输入公司地址', trigger: ['blur', 'change'] },
          { min: 2, max: 100, message: '长度在 2 到 100 个字符', trigger: ['blur', 'change'] }
        ],
        company_site: [
          { required: true, message: '请输入公司网址', trigger: ['blur', 'change'] },
          { min: 2, max: 100, message: '长度在 2 到 100 个字符', trigger: ['blur', 'change'] }
        ],
        company_img: [
          { required: true, message: '请上传公司图片', trigger: ['blur', 'change'] }
        ],
        company_detail: [
          { required: true, message: '请输入公司简介', trigger: ['blur', 'change'] }
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
      companyList({
        limit: this.page_size,
        offset: (this.current_page - 1) * this.page_size
      }).then(res => {
        this.companyList = res.data.rows
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
        company_account: null,
        company_password: null,
        company_name: null,
        company_phone: null,
        company_contacts: null,
        company_create: null,
        company_size: null,
        company_address: null,
        company_site: null,
        company_detail: null,
        company_img: null
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          delete this.temp.id
          createCompany(this.temp).then(res => {
            if (res.code === 0) {
              this.$message.success('公司新增成功')
              this.dialogVisible = false
              this.fetchData()
            } else {
              this.$message.error(res.message)
            }
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row)
      this.dialogStatus = 'update'
      this.temp.company_password = '123456'
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
          updateCompany(id, this.temp).then(res => {
            if (res.code === 0) {
              this.$message.success('公司信息，修改成功')
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
      this.$confirm('此操作将永久删除公司数据, 是否继续?', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteData(row.id)
      }).catch(() => {
      })
    },
    deleteData(id) {
      deleteCompany(id).then(res => {
        if (res.code === 0) {
          this.$message.success('公司信息，删除成功')
          this.fetchData()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    getQEditorContent(data) {
      // 接受子组件的传值
      this.temp.company_detail = data
    },
    getUploadUrl(data) {
      // console.log('父组件获取URL：'+data);
      this.temp.company_img = data
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
