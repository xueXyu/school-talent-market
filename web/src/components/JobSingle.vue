<template>
    <div>
        <!--OffCanvas Overlay-->
        <div class="offcanvas-overlay"></div>

        <!-- Page Heading Section Start -->
        <PageHeading :page-data="pageData"></PageHeading>
        <!-- Page Heading Section End -->

        <!-- User Resumes Start-->
        <el-dialog
            class="apply-for-job"
            :visible.sync="dialogVisible"
            title="请确认投递的简历"
            width="50%"
            :modal="true"
            :before-close="handleClose" v-if="userInfo">
            <el-form :model="resumeForm" :rules="resumeFormRules" ref="resumeForm"
                     label-position="top">
                <el-form-item label="" prop="resume">
                    <el-radio-group v-model="resumeForm.resume_id">
                        <el-radio v-for="(item,index) in userInfo.resumes" :key="index"
                                  :label="item.id">
                            {{item.resume_name}}
                            （
                            <router-link :to="{name:'ResumeSingle',params:{resumeId:item.id}}">
                                简历详情
                            </router-link>
                            ）
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitForm">确 定</el-button>
            </span>

        </el-dialog>
        <!-- User Resumes End-->

        <!-- Recent Jobs Start -->
        <div class="section section-padding" v-if="jobInfo">
            <div class="container">
                <div class="row mb-n5">
                    <!-- Job List Details Start -->
                    <div class="col-lg-8 col-12 mb-5 pr-lg-5">
                        <div class="job-list-details">
                            <div>
                                <JobItem :jobInfo="jobInfo" :companyInfo="jobInfo.company"></JobItem>
                            </div>
                            <div class="job-details-body mt-4">
                                <h6 class="mb-3">职责描述</h6>
                                <div v-html="jobInfo.job_description"></div>
                            </div>
                        </div>
                    </div>
                    <!-- Job List Details End -->

                    <!-- Job Sidebar Wrap Start -->
                    <div class="col-lg-4 col-12 mb-5">
                        <div class="sidebar-wrap">
                            <!-- Sidebar (Apply Buttons) Start -->
                            <div class="sidebar-widget" v-if="this.store.state.userRole==='user'">
                                <div class="inner">
                                    <div class="row m-n2">
                                        <div class="col-xl-auto col-lg-12 col-sm-auto col-12 p-2">
                                            <el-button v-if="!isLikeJob" @click="likeJob" type="primary" plain>
                                                <i class="fa fa-heart-o mr-1"></i>收藏职位
                                            </el-button>
                                            <el-button v-if="isLikeJob" @click="likeJob" type="primary">
                                                <i class="fa fa-heart mr-1"></i>收藏职位
                                            </el-button>
                                        </div>
                                        <div class="col-xl-auto col-lg-12 col-sm-auto col-12 p-2">
                                            <el-button v-if="!isApplyForJob" @click="showResumes"
                                                       type="success" plain>
                                                <i class="fa fa-file-text-o mr-1"></i>申请职位
                                            </el-button>
                                            <el-button v-if="isApplyForJob" @click="submitForm" type="success">
                                                <i class="fa fa-file-text-o mr-1"></i>申请职位
                                            </el-button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- Sidebar (Apply Buttons) End -->

                            <!-- Sidebar (Job Overview) Start -->
                            <div class="sidebar-widget">
                                <div class="inner">
                                    <h6 class="title">公司信息</h6>
                                    <ul class="job-overview list-unstyled">
                                        <li><strong>公司名称：</strong>{{jobInfo.company.company_name}}</li>
                                        <li><strong>成立时间：</strong>{{jobInfo.company.company_create}}</li>
                                        <li><strong>公司规模：</strong>{{jobInfo.company.company_size}}</li>
                                        <li><strong>公司地址：</strong>{{jobInfo.company.company_address}}</li>
                                        <li><strong>公司网站：</strong><a :href="jobInfo.company.company_site"
                                                                     target="_blank">{{jobInfo.company.company_site}}</a>
                                        </li>
                                        <li><strong>联系人：</strong>{{jobInfo.company.company_contacts}}</li>
                                        <li><strong>联系电话：</strong>{{jobInfo.company.company_phone}}</li>
                                    </ul>
                                </div>
                            </div>
                            <!-- Sidebar (Job Overview) End -->

                        </div>
                    </div>
                    <!-- Job Sidebar Wrap End -->

                </div>
            </div>
        </div>
        <!-- Recent Jobs End -->
    </div>
</template>

<script>
    import PageHeading from "./public/PageHeading";
    import JobItem from "./public/JobItem";

    const _ = require('lodash');

    export default {
        name: "JobSingle",
        components: {
            PageHeading,
            JobItem,
        },
        data() {
            return {
                pageData: {
                    'name': '招聘详情',
                    'navs': [
                        {'name': 'Home', 'to': 'Home', 'active': false},
                        {'name': '管理招聘', 'to': '', 'active': false},
                        {'name': '招聘详情', 'to': '', 'active': true},
                    ],
                },
                dialogVisible: false,
                resumeForm: {
                    resume_id: null
                },
                resumeFormRules: {
                    resume_id: [
                        {required: true, message: '请输选择简历', trigger: 'blur'}
                    ],
                },
                jobInfo: null,
                userInfo: null,
                isLikeJob: false,
                isApplyForJob: false,
            }
        },
        methods: {
            handleClose(done) {
                done();
            },
            showResumes() {
                if (this.userInfo.resumes.length > 0) {
                    this.dialogVisible = true;
                } else {
                    this.$confirm('你还没有简历，去创建简历吧~', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$router.push({name: 'CreateResume'});
                    }).catch(() => {
                    });
                }
            },
            submitForm() {
                if (this.isApplyForJob) {
                    this.$message.warning('职位已经申请了~');
                } else {
                    this.applyForJob(this.resumeForm.resume_id);
                    this.dialogVisible = false;
                }
            },
            async getJob() {
                try {
                    await this.http.get(this.api.CompanyJob + '/' + this.$route.params.jobId).then(res => {
                        if (res.code == 0) {
                            this.jobInfo = res.data;
                            this.isLikeJobFunc();
                            this.isApplyForJobFunc();
                        } else {
                            this.$message.error(res.message);
                        }
                    });
                } catch (error) {
                    console.error(error);
                }
            },
            async getUserInfo() {
                try {
                    await this.http.get(this.api.User + '/' + this.store.state.userInfo.id).then(res => {
                        if (res.code == 0) {
                            this.userInfo = res.data;
                        } else {
                            this.$message.error(res.message);
                        }
                    });
                } catch (error) {
                    console.error(error);
                }
            },
            async applyForJob(id) {
                try {
                    await this.http.post(this.api.Job2Resume, {
                        user_id: parseInt(this.store.state.userInfo.id),
                        job_id: parseInt(this.$route.params.jobId),
                        company_id: parseInt(this.jobInfo.company.id),
                        resume_id: parseInt(id),
                    }).then(res => {
                        if (res.code == 0) {
                            this.$message.success('申请已提交~');
                            this.isApplyForJob = true;
                        } else {
                            this.$message.error(res.message);
                        }
                    });
                } catch (error) {
                    console.error(error);
                }
            },
            async isApplyForJobFunc() {
                try {
                    await this.http.get(this.api.Job2Resume, {
                        user_id: this.store.state.userInfo.id,
                        job_id: this.$route.params.jobId,
                    }).then(res => {
                        if (res.code == 0) {
                            if (!_.isEmpty(res.data)) {
                                this.isApplyForJob = true;
                            }
                        } else {
                            this.$message.error(res.message);
                        }
                    });
                } catch (error) {
                    console.error(error);
                }
            },
            async likeJob() {
                if (this.isLikeJob) {
                    this.$message.warning('招聘信息，已经收藏了~');
                } else {
                    try {
                        await this.http.post(this.api.UserLikeJob, {
                            user_id: parseInt(this.store.state.userInfo.id),
                            job_id: parseInt(this.$route.params.jobId),
                            company_id: parseInt(this.jobInfo.company.id),
                        }).then(res => {
                            if (res.code == 0) {
                                this.$message.success('收藏成功~');
                                this.isLikeJob = true;
                            } else {
                                this.$message.error(res.message);
                            }
                        });
                    } catch (error) {
                        console.error(error);
                    }
                }
            },
            async isLikeJobFunc() {
                try {
                    await this.http.get(this.api.UserLikeJob, {
                        user_id: parseInt(this.store.state.userInfo.id),
                        job_id: parseInt(this.$route.params.jobId),
                    }).then(res => {
                        if (res.code == 0) {
                            if (!_.isEmpty(res.data)) {
                                this.isLikeJob = true;
                            }
                        } else {
                            this.$message.error(res.message);
                        }
                    });
                } catch (error) {
                    console.error(error);
                }
            },
        }
        ,
        mounted() {
            this.getJob();
            if (this.store.state.isLogin) {
                this.getUserInfo();
            }
        }
    }
</script>

<style scoped>
    .apply-for-job .el-form-item {
        margin-bottom: 6px;
    }

    .apply-for-job .el-radio-group {
        line-height: 45px;
    }

    .apply-for-job .el-radio {
        width: 45%;
    }
</style>
