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
                                    <el-form-item label="简历名称" prop="resume_name" required>
                                        <el-input v-model="ruleForm.resume_name"></el-input>
                                    </el-form-item>
                                    <el-form-item label="邮箱" prop="resume_email" required>
                                        <el-input v-model="ruleForm.resume_email"></el-input>
                                    </el-form-item>
                                    <el-form-item label="学历" prop="resume_education" required>
                                        <el-select v-model="ruleForm.resume_education" auto-complete="off">
                                            <el-option label="初中及以下" value="初中及以下"></el-option>
                                            <el-option label="中专/中技" value="中专/中技"></el-option>
                                            <el-option label="高中" value="高中"></el-option>
                                            <el-option label="大专" value="大专"></el-option>
                                            <el-option label="本科" value="本科"></el-option>
                                            <el-option label="硕士" value="硕士"></el-option>
                                            <el-option label="博士" value="博士"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="工作经验" prop="resume_working_years" required>
                                        <el-select v-model="ruleForm.resume_working_years" auto-complete="off">
                                            <el-option label="零经验" value="零经验"></el-option>
                                            <el-option label="一年" value="一年"></el-option>
                                            <el-option label="两年" value="两年"></el-option>
                                            <el-option label="三年" value="三年"></el-option>
                                            <el-option label="四年" value="四年"></el-option>
                                            <el-option label="五年" value="五年"></el-option>
                                            <el-option label="五年以上" value="五年以上"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="求职意向" prop="resume_job_intension" required>
                                        <QEditor ref="childQeditor" @func="getQEditorContent"></QEditor>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button type="primary" :loading="loading" @click="submitForm('ruleForm')">
                                            修改简历
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
    import QEditor from "./public/QEditor";

    export default {
        name: "EditResume",
        components: {
            PageHeading,
            QEditor
        },
        data() {
            return {
                pageData: {
                    'name': '修改简历',
                    'navs': [
                        {'name': 'Home', 'to': 'Home', 'active': false},
                        {'name': '管理简历', 'to': 'UserManagementResume', 'active': false},
                        {'name': '修改简历', 'to': '', 'active': true},
                    ],
                },
                loading: false,
                ruleForm: {
                    resume_name: '',
                    resume_email: '',
                    resume_education: '',
                    resume_working_years: '',
                    resume_job_intension: '',
                },
                rules: {
                    resume_name: [
                        {required: true, message: '请输入简历名称', trigger: ['blur', 'change']},
                        {min: 2, max: 32, message: '长度在 2 到 32 个字符', trigger: ['blur', 'change']}
                    ],
                    resume_email: [
                        {required: true, message: '请输入邮箱', trigger: ['change', 'blur']},
                        {min: 2, max: 100, message: '长度在 2 到 100 个字符', trigger: ['blur', 'change']}
                    ],
                    resume_education: [
                        {required: true, message: '请选择学历', trigger: 'blur'},
                        {
                            type: 'enum',
                            enum: ['初中及以下', '中专/中技', '高中', '大专', '本科', '硕士', '博士'],
                            message: '请选择正确的学历'
                        },
                    ],
                    resume_working_years: [
                        {required: true, message: '请选择工作经验', trigger: 'blur'},
                        {
                            type: 'enum',
                            enum: ['零经验', '一年', '两年', '三年', '四年', '五年', '五年以上'],
                            message: '请选择正确的工作经验'
                        },
                    ],
                    resume_job_intension: [
                        {required: true, message: '请输入求职意向', trigger: ['blur', 'change']}
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        this.editResume();
                    }
                });
            },
            getQEditorContent(data) {
                // 接受子组件的传值
                this.ruleForm.resume_job_intension = data;
            },
            async getResumeInfo() {
                try {
                    await this.http.get(this.api.UserResume + '/' + this.$route.params.resumeId).then(res => {
                        if (res.code == 0) {
                            this.ruleForm.resume_name = res.data.resume_name;
                            this.ruleForm.resume_email = res.data.resume_email;
                            this.ruleForm.resume_education = res.data.resume_education;
                            this.ruleForm.resume_working_years = res.data.resume_working_years;
                            this.ruleForm.resume_job_intension = res.data.resume_job_intension;
                            this.$refs.childQeditor.childMethod(res.data.resume_job_intension);
                        } else {
                            this.$message.error(res.message);
                        }
                    });
                } catch (error) {
                    console.error(error);
                }
            },
            async editResume() {
                try {
                    await this.http.put(this.api.UserResume + '/' + this.$route.params.resumeId, this.ruleForm).then(res => {
                        if (res.code == 0) {
                            this.$message.success('简历修改成功');
                            this.$router.push({name: 'Home'});
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
            this.getResumeInfo();
        }
    }
</script>

<style scoped>
    .section-padding {
        padding: 60px 0 90px 0;
    }

    .el-form .el-form-item .el-form-item__content .el-button {
        width: 100%;
    }
</style>
