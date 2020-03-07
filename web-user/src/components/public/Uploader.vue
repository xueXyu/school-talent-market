<template>
    <div>
        <el-upload
            class="avatar-uploader"
            :action="uploadHost"
            file="file"
            with-credentials
            :show-file-list="false"
            :on-success="handleSuccess"
            :on-error="handleError"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过1MB</div>
        </el-upload>
    </div>
</template>

<script>
    export default {
        name: "Uploader",
        props: [
            "from"
        ],
        data() {
            return {
                uploadHost: this.http.hosts() + this.api.UploadImg,
                imageUrl: '',
            }
        },
        methods: {
            // 上传成功
            handleSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
                if (res.code === 0) {
                    //func: 是父组件指定的传数据绑定的函数，this.msg:子组件给父组件传递的数据
                    this.$emit('func', res.data.url)
                }
            },
            //上传失败
            handleError(err, file) {
                this.$message.error('图片上传失败！');
                console.log(err);
            },
            beforeAvatarUpload(file) {
                const isJPGPNG = (file.type === 'image/jpeg' || file.type === 'image/png');
                const isLt1M = file.size / 1024 / 1024 < 1;

                if (!isJPGPNG) {
                    this.$message.error('上传图片只能是 JPG/PNG 格式!');
                }
                if (!isLt1M) {
                    this.$message.error('上传图片大小不能超过 1MB!');
                }

                return isJPGPNG && isLt1M;
            },
            getHeadImage() {
                if (this.store.state.userInfo) {
                    if (this.store.state.userInfo.user_img) {
                        this.imageUrl = this.util.getHost() + this.store.state.userInfo.user_img;
                    }
                }
            },
        },
        mounted() {
            if (this.from === 'head') {
                this.getHeadImage();
            }
        }
    }
</script>

<style scoped>

</style>
