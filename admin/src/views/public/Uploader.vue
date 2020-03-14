<template>
  <div>
    <el-upload
      class="user-head-uploader"
      :action="uploadHost"
      file="file"
      with-credentials
      :show-file-list="false"
      :on-success="handleSuccess"
      :on-error="handleError"
      :before-upload="beforeAvatarUpload">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus user-head-uploader-icon"></i>
      <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过1MB</div>
    </el-upload>
  </div>
</template>

<script>
  const _ = require('lodash')

  export default {
    name: 'Uploader',
    props: ['imgurl'],
    data() {
      return {
        uploadHost: process.env.VUE_APP_BASE_API + '/upload/img',
        imageUrl: ''
      }
    },
    watch: {
      imgurl: {
        handler(url) {
          if (!_.isEmpty(url)) {
            this.imageUrl = process.env.VUE_APP_BASE_API + url
          } else {
            this.imageUrl = ''
          }
        },
        immediate: true
      }
    },
    methods: {
      childMethod(data) {
        // 接受父组件传值
        // this.imageUrl = process.env.VUE_APP_BASE_API + data
      },
      // 上传成功
      handleSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw)
        if (res.code === 0) {
          //func: 是父组件指定的传数据绑定的函数，this.msg:子组件给父组件传递的数据
          this.$emit('func', res.data.url)
        }
      },
      //上传失败
      handleError(err, file) {
        this.$message.error('图片上传失败！')
        console.log(err)
      },
      beforeAvatarUpload(file) {
        const isJPGPNG = (file.type === 'image/jpeg' || file.type === 'image/png')
        const isLt1M = file.size / 1024 / 1024 < 1

        if (!isJPGPNG) {
          this.$message.error('上传图片只能是 JPG/PNG 格式!')
        }
        if (!isLt1M) {
          this.$message.error('上传图片大小不能超过 1MB!')
        }

        return isJPGPNG && isLt1M
      }
    }
  }
</script>

<style scoped>
  .user-head-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }

  .user-head-uploader .el-upload .avatar {
    width: 120px;
    height: 120px;
    display: block;
  }
</style>

<style>

  .user-head-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .user-head-uploader .el-upload:hover {
    border-color: #409EFF;
  }
</style>
