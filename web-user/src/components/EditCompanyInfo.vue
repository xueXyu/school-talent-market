<template>
    <div>
        <!--OffCanvas Overlay-->
        <div class="offcanvas-overlay"></div>

        <!-- Page Heading Section Start -->
        <PageHeading :page-data="pageData"></PageHeading>
        <!-- Page Heading Section End -->

        <!-- Create Job Start -->
        <div class="section section-padding">
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
                                    <el-form-item label="公司名称" prop="company_name" required>
                                        <el-input v-model="ruleForm.company_name"></el-input>
                                    </el-form-item>
                                    <el-form-item label="联系人" prop="company_contacts" required>
                                        <el-input v-model="ruleForm.company_contacts"></el-input>
                                    </el-form-item>
                                    <el-form-item label="联系电话" prop="company_phone" required>
                                        <el-input type="tel" v-model="ruleForm.company_phone"></el-input>
                                    </el-form-item>
                                    <el-form-item label="创立日期" prop="company_create" required>
                                        <el-date-picker type="date" placeholder="创立日期"
                                                        v-model="ruleForm.company_create"></el-date-picker>
                                    </el-form-item>
                                    <el-form-item label="公司规模" prop="company_size" required>
                                        <el-select v-model="ruleForm.company_size" auto-complete="off">
                                            <el-option label="0-20人" value="0-20人"></el-option>
                                            <el-option label="20-99人" value="20-99人"></el-option>
                                            <el-option label="100-499人" value="100-499人"></el-option>
                                            <el-option label="500-999人" value="500-999人"></el-option>
                                            <el-option label="1000-9999人" value="1000-9999人"></el-option>
                                            <el-option label="10000人以上" value="10000人以上"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="公司地址" prop="company_address" required>
                                        <el-input v-model="ruleForm.company_address"></el-input>
                                    </el-form-item>
                                    <el-form-item label="公司网站" prop="company_site" required>
                                        <el-input v-model="ruleForm.company_site"></el-input>
                                    </el-form-item>
                                    <el-form-item label="公司图片" prop="company_img" required>
                                        <Uploader from="company" @func="getUploadUrl"></Uploader>
                                    </el-form-item>
                                    <el-form-item label="公司简介" prop="company_detail" required>
                                        <QEditor ref="child" @func="getQEditorContent"></QEditor>
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
    import QEditor from "./public/QEditor";

    export default {
        name: "EditCompanyInfo",
        components: {
            PageHeading,
            Uploader,
            QEditor
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
                    'name': '修改公司信息',
                    'navs': [
                        {'name': 'Home', 'to': 'Home', 'active': false},
                        {'name': '个人中心', 'to': '', 'active': false},
                        {'name': '修改公司信息', 'to': '', 'active': true},
                    ],
                },
                loading: false,
                ruleForm: {
                    company_name: '',
                    company_contacts: '',
                    company_phone: '',
                    company_create: '',
                    company_size: '',
                    company_address: '',
                    company_site: '',
                    company_detail: '',
                    company_img: '',
                },
                rules: {
                    company_name: [
                        {required: true, message: '请输入公司名称', trigger: ['blur', 'change']},
                        {min: 2, max: 100, message: '长度在 2 到 100 个字符', trigger: ['blur', 'change']}
                    ],
                    company_contacts: [
                        {required: true, message: '请输入公司联系人', trigger: ['blur', 'change']},
                        {min: 2, max: 32, message: '长度在 2 到 32 个字符', trigger: ['blur', 'change']}
                    ],
                    company_phone: [
                        {required: true, trigger: ['change', 'blur'], validator: validPhone}
                    ],
                    company_create: [
                        {required: true, message: '请选择公司创立时间', trigger: ['blur', 'change']},
                    ],
                    company_size: [
                        {required: true, message: '请选择公司规模', trigger: ['change', 'blur']},
                        {
                            type: 'enum',
                            enum: ['0-20人', '20-99人', '100-499人', '500-999人', '1000-9999人', '10000人以上'],
                            message: '请选择正确的公司规模'
                        },
                    ],
                    company_address: [
                        {required: true, message: '请输入公司地址', trigger: ['blur', 'change']},
                        {min: 2, max: 100, message: '长度在 2 到 100 个字符', trigger: ['blur', 'change']}
                    ],
                    company_site: [
                        {required: true, message: '请输入公司网址', trigger: ['blur', 'change']},
                        {min: 2, max: 100, message: '长度在 2 到 100 个字符', trigger: ['blur', 'change']}
                    ],
                    company_img: [
                        {required: true, message: '请上传公司图片', trigger: ['blur', 'change']}
                    ],
                    company_detail: [
                        {required: true, message: '请输入公司简介', trigger: ['blur', 'change']},
                    ],
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
                // 接受子组件的传值
                this.ruleForm.company_img = data;
            },
            getQEditorContent(data) {
                // 接受子组件的传值
                this.ruleForm.company_detail = data;
            },
            async getInfo() {
                try {
                    await this.http.get(this.api.Company + '/' + this.store.state.userInfo.id).then(res => {
                        if (res.code == 0) {
                            this.ruleForm = {
                                company_name: res.data.company_name,
                                company_contacts: res.data.company_contacts,
                                company_phone: res.data.company_phone,
                                company_create: res.data.company_create,
                                company_size: res.data.company_size,
                                company_address: res.data.company_address,
                                company_site: res.data.company_site,
                                company_img: res.data.company_img,
                                company_detail: res.data.company_detail,
                            };
                            // 向子组件传值
                            this.$refs.child.childMethod(res.data.company_detail)
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
                    await this.http.put(this.api.Company + '/' + this.store.state.userInfo.id, this.ruleForm).then(res => {
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
                    await this.http.get(this.api.Company + '/' + this.store.state.userInfo.id).then(res => {
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

<style>
    label, .el-form--label-top .el-form-item__label {
        margin: 0;
        padding: 0;
    }

    .section-padding {
        padding: 50px 0;
    }

    .el-button {
        width: 100%;
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>
