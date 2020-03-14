<template>
  <div class="app-container">
    <div class="add-user">
      <el-button type="success" @click="handleCreate">
        新增新闻&公告
      </el-button>
    </div>

    <el-table
      :loading="listLoading"
      :data="newsList"
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
      <el-table-column fixed prop="title" label="标题" align="center" />
      <el-table-column prop="title_img" label="头图" align="center" width="200">
        <template slot-scope="scope">
          <el-image
            style="width: 70px; height: 70px; line-height: 70px;"
            :src="imgHost+scope.row.title_img"
            fit="fit"
          >
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline" style="font-size: 2em; color: #909399;" />
            </div>
          </el-image>
        </template>
      </el-table-column>
      <el-table-column prop="content" label="内容" align="center" width="320">
        <template slot-scope="scope">
          <div
            style="width: 200px; height: 50px; overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
            v-html="scope.row.content"
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
        <el-form-item label="标题" prop="title" required>
          <el-input v-model="temp.title" />
        </el-form-item>
        <el-form-item label="头图" prop="title_img" required>
          <Uploader ref="childUploader" :imgurl.sync="temp.title_img" @func="getUploadUrl" />
        </el-form-item>
        <el-form-item label="内容" prop="content" required>
          <QEditor ref="childQeditor" :editorcontent.sync="temp.content" @func="getQEditorContent" />
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
import { newsList, createNews, updateNews, deleteNews } from '@/api/news'
import Uploader from '../public/Uploader'
import QEditor from '../public/QEditor'

export default {
  components: {
    Uploader,
    QEditor
  },
  data() {
    return {
      newsList: null,
      listLoading: true,
      imgHost: process.env.VUE_APP_BASE_API,
      current_page: 1,
      page_count: 1,
      page_size: 6,
      dialogVisible: false,
      dialogStatus: '',
      textMap: {
        'create': '新增新闻&公告',
        'update': '修改新闻&公告信息'
      },
      temp: {
        id: null,
        title: null,
        title_img: null,
        content: null
      },
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 3, max: 30, message: '账号长度在 3 到 100 个字符', trigger: 'blur' }
        ],
        title_img: [
          { required: true, message: '请上传新闻&公告照片', trigger: ['blur', 'change'] }
        ],
        content: [
          { required: true, message: '请输入内容', trigger: ['blur', 'change'] }
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
      newsList({
        limit: this.page_size,
        offset: (this.current_page - 1) * this.page_size,
        order: ['created_at', 'DESC']
      }).then(res => {
        this.newsList = res.data.rows
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
        title: null,
        title_img: null,
        content: null
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
          createNews(this.temp).then(res => {
            if (res.code === 0) {
              this.$message.success('新闻&公告新增成功')
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
          updateNews(id, this.temp).then(res => {
            if (res.code === 0) {
              this.$message.success('新闻&公告信息，修改成功')
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
      this.$confirm('此操作将永久删除新闻&公告数据, 是否继续?', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteData(row.id)
      }).catch(() => {
      })
    },
    deleteData(id) {
      deleteNews(id).then(res => {
        if (res.code === 0) {
          this.$message.success('新闻&公告信息，删除成功')
          this.fetchData()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    getUploadUrl(data) {
      // console.log('父组件获取URL：'+data);
      this.temp.title_img = data
    },
    getQEditorContent(data) {
      // 接受子组件的传值
      this.temp.content = data
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
