<template>
  <div class="app-container">
    <div class="add-user">
      <el-button type="success" @click="handleCreate">
        添加用户
      </el-button>
    </div>

    <el-table
      :loading="listLoading"
      :data="userList"
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
      <el-table-column prop="user_account" label="账号" align="center" />
      <el-table-column prop="user_name" label="姓名" align="center" />
      <el-table-column prop="user_gender" label="性别" align="center" />
      <el-table-column prop="user_age" label="年龄" align="center" />
      <el-table-column prop="user_phone" label="电话" align="center" width="150" />
      <el-table-column prop="user_img" label="头像" align="center" width="200">
        <template slot-scope="scope">
          <el-image
            style="width: 70px; height: 70px; line-height: 70px;"
            :src="imgHost+scope.row.user_img"
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
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="账号" prop="user_account" required>
          <el-input v-model="temp.user_account" :disabled="dialogStatus==='update'" />
        </el-form-item>
        <el-form-item label="密码" prop="user_password" required>
          <el-input v-model="temp.user_password" :disabled="dialogStatus==='update'" />
        </el-form-item>
        <el-form-item label="姓名" prop="user_name" required>
          <el-input v-model="temp.user_name" />
        </el-form-item>
        <el-form-item label="性别" prop="user_gender" required>
          <el-select v-model="temp.user_gender" auto-complete="off">
            <el-option label="男" value="男" />
            <el-option label="女" value="女" />
          </el-select>
        </el-form-item>
        <el-form-item label="年龄" prop="user_age" required>
          <el-input v-model.number="temp.user_age" type="number" />
        </el-form-item>
        <el-form-item label="联系电话" prop="user_phone" required>
          <el-input v-model="temp.user_phone" type="tel" />
        </el-form-item>
        <el-form-item label="用户照片" prop="user_img" required>
          <Uploader ref="childUploader" :imgurl.sync="temp.user_img" @func="getUploadUrl" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">
          取消
        </el-button>
        <el-button type="primary" :loading="buttonLoading" @click="dialogStatus==='create'?createData():updateData()">
          确认
        </el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
// createUser, updateUser, deleteUser
import { userList, createUser, updateUser } from '@/api/user'
import { isvalidPhone } from '@/utils/index'
import Uploader from '../public/Uploader'

// const _ = require('lodash')

export default {
  components: {
    Uploader
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
    var checkUserName = (rule, value, callback) => {
      var patt = /^[a-zA-Z0-9]{3,30}$/
      if (patt.test(value)) {
        callback()
      } else {
        callback(new Error('密码只能包含数字和字母!'))
      }
    }
    return {
      userList: null,
      listLoading: true,
      imgHost: process.env.VUE_APP_BASE_API,
      current_page: 1,
      page_count: 1,
      page_size: 6,
      dialogVisible: false,
      dialogStatus: '',
      textMap: {
        'create': '新增用户',
        'update': '修改用户信息'
      },
      buttonLoading: false,
      temp: {
        id: null,
        user_account: null,
        user_password: null,
        user_name: null,
        user_gender: null,
        user_age: null,
        user_phone: null,
        user_img: null
      },
      rules: {
        user_account: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 3, max: 30, message: '账号长度在 3 到 30 个字符', trigger: 'blur' },
          { validator: checkUserName, trigger: 'blur' }
        ],
        user_password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 30, message: '密码长度在 6 到 30 个字符', trigger: 'blur' }
        ],
        user_name: [
          { required: true, message: '请输入姓名', trigger: ['blur', 'change'] },
          { min: 2, max: 32, message: '长度在 2 到 32 个字符', trigger: ['blur', 'change'] }
        ],
        user_gender: [
          { required: true, message: '请选择性别', trigger: ['change', 'blur'] },
          { type: 'enum', enum: ['男', '女'], message: '性别只能为男或女' }
        ],
        user_age: [
          { required: true, message: '请输入年龄', trigger: 'blur' },
          { type: 'number', message: '年龄必须为数字值' },
          {
            validator(rule, value, callback) {
              if (Number.isInteger(Number(value)) && Number(value) > 18 && Number(value) < 80) {
                callback()
              } else {
                callback(false)
              }
            },
            trigger: 'blur',
            message: '年龄必须在18-80之间'
          }
        ],
        user_phone: [
          { required: true, trigger: ['change', 'blur'], validator: validPhone }
        ],
        user_img: [
          { required: true, message: '请上传用户照片', trigger: ['blur', 'change'] }
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
      userList({
        limit: this.page_size,
        offset: (this.current_page - 1) * this.page_size,
        order: ['created_at', 'DESC']
      }).then(res => {
        this.userList = res.data.rows
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
        user_account: null,
        user_password: null,
        user_name: null,
        user_gender: null,
        user_age: null,
        user_phone: null,
        user_img: null
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
          createUser(this.temp).then(res => {
            if (res.code === 0) {
              this.$message.success('用户新增成功')
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
      this.temp.user_password = '123456'
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
          updateUser(id, this.temp).then(res => {
            if (res.code === 0) {
              this.$message.success('用户信息，修改成功')
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
    },
    deleteData(row) {
    },
    getUploadUrl(data) {
      // console.log('父组件获取URL：'+data);
      this.temp.user_img = data
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
