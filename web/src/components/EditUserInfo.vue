<template>
    <div>
        <!--OffCanvas Overlay-->
        <div class="offcanvas-overlay"></div>

        <!-- Page Heading Section Start -->
        <PageHeading :page-data="pageData"></PageHeading>
        <!-- Page Heading Section End -->

        <!-- Create Job Start -->
        <div class="section section-padding edit-user-info-section-padding">
            <div class="container">
                <div class="row">
                    <div class="create-job-form col-lg-6 mx-auto">
                        <form action="#">
                            <div class="row mb-n3">
                                <el-form :model="ruleForm"
                                         :rules="rules"
                                         ref="ruleForm"
                                         label-position="top"
                                         style="width: 100%;">
                                    <el-form-item label="姓名" prop="user_name" required>
                                        <el-input v-model="ruleForm.user_name"></el-input>
                                    </el-form-item>
                                    <el-form-item label="性别" prop="user_gender" required>
                                        <el-select v-model="ruleForm.user_gender" auto-complete="off">
                                            <el-option label="男" value="男"></el-option>
                                            <el-option label="女" value="女"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="年龄" prop="user_age" required>
                                        <el-input type="number" v-model.number="ruleForm.user_age"></el-input>
                                    </el-form-item>
                                    <el-form-item label="联系电话" prop="user_phone" required>
                                        <el-input type="tel" v-model="ruleForm.user_phone"></el-input>
                                    </el-form-item>
                                    <el-form-item label="用户照片" prop="user_img" required>
                                        <Uploader ref="childUploader" @func="getUploadUrl"></Uploader>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button type="primary" :loading="loading" @click="submitForm('ruleForm')">
                                            确认修改
                                        </el-button>
                                    </el-form-item>
                                </el-form>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <!-- Create Job End -->
    </div>
</template>

<script>
    import PageHeading from "./public/PageHeading";
    import Uploader from "./public/Uploader";
    const _ = require('lodash');

    export default {
        name: "EditUserInfo",
        components: {
            PageHeading,
            Uploader
        },
        data() {
            var validPhone = (rule, value, callback) => {
                if (!value || value === null || value === '') {
                    callback(new Error('请输入电话号码'))
                } else if (!this.util.isvalidPhone(value)) {
                    callback(new Error('请输入正确的11位电话号码'))
                } else {
                    callback()
                }
            };

            return {
                pageData: {
                    'name': '修改个人信息',
                    'navs': [
                        {'name': 'Home', 'to': 'Home', 'active': false},
                        {'name': '个人中心', 'to': '', 'active': false},
                        {'name': '修改个人信息', 'to': '', 'active': true},
                    ],
                },
                loading: false,
                ruleForm: {
                    user_name: '',
                    user_gender: '',
                    user_age: null,
                    user_phone: '',
                    user_img: '',
                },
                rules: {
                    user_name: [
                        {required: true, message: '请输入姓名', trigger: ['blur', 'change']},
                        {min: 2, max: 32, message: '长度在 2 到 32 个字符', trigger: ['blur', 'change']}
                    ],
                    user_gender: [
                        {required: true, message: '请选择性别', trigger: ['change', 'blur']},
                        {type: 'enum', enum: ['男', '女'], message: '性别只能为男或女'},
                    ],
                    user_age: [
                        {required: true, message: '请输入年龄', trigger: 'blur'},
                        {type: "number", message: '年龄必须为数字值'},
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
                        {required: true, trigger: ['change', 'blur'], validator: validPhone}
                    ],
                    user_img: [
                        {required: true, message: '请上传用户照片', trigger: ['blur', 'change']}
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        this.editInfo();
                    }
                });
            },
            getUploadUrl(data) {
                // console.log('父组件获取URL：'+data);
                this.ruleForm.user_img = data;
            },
            async getInfo() {
                try {
                    await this.http.get(this.api.User + '/' + this.store.state.userInfo.id).then(res => {
                        if (res.code == 0) {
                            this.ruleForm = {
                                user_name: res.data.user_name,
                                user_gender: res.data.user_gender,
                                user_age: res.data.user_age,
                                user_phone: res.data.user_phone,
                                user_img: res.data.user_img,
                            };
                            if (!_.isEmpty(res.data.user_img)) {
                                // 向子组件传值
                                this.$refs.childUploader.childMethod(res.data.user_img);
                            }
                        } else {
                            this.$message.error(res.message);
                        }
                    });
                } catch (error) {
                    console.error(error);
                }
            },
            async editInfo() {
                try {
                    await this.http.put(this.api.User + '/' + this.store.state.userInfo.id, this.ruleForm).then(res => {
                        if (res.code == 0) {
                            this.$message.success('修改成功');
                            // 更新state
                            this.updateUserInfo();
                            this.$router.push({name: 'Home'});
                        } else {
                            this.$message.error(res.message);
                        }
                    });
                } catch (error) {
                    console.error(error);
                }
            },
            async updateUserInfo() {
                try {
                    await this.http.get(this.api.User + '/' + this.store.state.userInfo.id).then(res => {
                        if (res.code == 0) {
                            this.store.dispatch("updateUserInfo", res.data);
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
            this.getInfo();
        }
    }
</script>

<style scoped>
    .edit-user-info-section-padding {
        padding: 60px 0 90px 0;
    }

    .edit-user-info-section-padding .el-form .el-form-item .el-form-item__content .el-button {
        width: 100%;
    }
</style>
