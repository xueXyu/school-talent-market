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
                                    <el-form-item label="职位名称" prop="job_name" required>
                                        <el-input v-model="ruleForm.job_name"></el-input>
                                    </el-form-item>
                                    <el-form-item label="薪资待遇" prop="job_salary" required>
                                        <el-input v-model="ruleForm.job_salary"></el-input>
                                    </el-form-item>
                                    <el-form-item label="性别要求" prop="job_gender" required>
                                        <el-select v-model="ruleForm.job_gender" auto-complete="off">
                                            <el-option label="无" value="无"></el-option>
                                            <el-option label="男" value="男"></el-option>
                                            <el-option label="女" value="女"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="工作性质" prop="job_way" required>
                                        <el-select v-model="ruleForm.job_way" auto-complete="off">
                                            <el-option label="全职" value="全职"></el-option>
                                            <el-option label="兼职" value="兼职"></el-option>
                                            <el-option label="实习" value="实习"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="职责描述" prop="job_description" required>
                                        <QEditor ref="childQeditor" @func="getQEditorContent"></QEditor>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button type="primary" :loading="loading" @click="submitForm('ruleForm')">
                                            修改招聘
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
        name: "EditJob",
        components: {
            PageHeading,
            QEditor
        },
        data() {
            return {
                pageData: {
                    'name': '修改招聘',
                    'navs': [
                        {'name': 'Home', 'to': 'Home', 'active': false},
                        {'name': '管理招聘', 'to': 'CompanyManagementJobs', 'active': false},
                        {'name': '修改招聘', 'to': '', 'active': true},
                    ],
                },
                loading: false,
                ruleForm: {
                    job_name: '',
                    job_salary: '',
                    job_gender: '',
                    job_way: '',
                    job_description: '',
                },
                rules: {
                    job_name: [
                        {required: true, message: '请输入职位名称', trigger: ['blur', 'change']},
                        {min: 2, max: 32, message: '长度在 2 到 32 个字符', trigger: ['blur', 'change']}
                    ],
                    job_salary: [
                        {required: true, message: '请输入薪资待遇', trigger: ['blur', 'change']},
                    ],
                    job_gender: [
                        {required: true, message: '请选择性别要求', trigger: 'blur'},
                        {
                            type: 'enum',
                            enum: ['无', '男', '女'],
                            message: '请选择正确的性别要求'
                        },
                    ],
                    job_way: [
                        {required: true, message: '请选择工作性质', trigger: 'blur'},
                        {
                            type: 'enum',
                            enum: ['全职', '兼职', '实习'],
                            message: '请选择正确的工作性质'
                        },
                    ],
                    job_description: [
                        {required: true, message: '请输入职责描述', trigger: ['blur', 'change']}
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        this.editJob();
                    }
                });
            },
            getQEditorContent(data) {
                // 接受子组件的传值
                this.ruleForm.job_description = data;
            },
            async getJobInfo() {
                try {
                    await this.http.get(this.api.CompanyJob + '/' + this.$route.params.jobId).then(res => {
                        if (res.code == 0) {
                            this.ruleForm.job_name = res.data.job_name;
                            this.ruleForm.job_salary = res.data.job_salary;
                            this.ruleForm.job_gender = res.data.job_gender;
                            this.ruleForm.job_way = res.data.job_way;
                            this.ruleForm.job_description = res.data.job_description;
                            this.$refs.childQeditor.childMethod(res.data.job_description);
                        } else {
                            this.$message.error(res.message);
                        }
                    });
                } catch (error) {
                    console.error(error);
                }
            },
            async editJob() {
                try {
                    await this.http.put(this.api.CompanyJob + '/' + this.$route.params.jobId, this.ruleForm).then(res => {
                        if (res.code == 0) {
                            this.$message.success('招聘修改成功');
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
            this.getJobInfo();
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
