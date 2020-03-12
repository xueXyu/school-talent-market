<template>
    <div>
        <!-- Job List Start -->
        <router-link :to="{name:'JobSingle',params:{jobId: jobInfo.id}}"
                     class="job-list"
                     v-if="jobInfo&&companyInfo">
            <div class="company-logo col-auto">
                <el-image style="width: 70px; height: 70px; line-height: 70px;"
                          :src="this.util.getHost()+companyInfo.company_img"
                          fit="fit">
                    <div slot="error" class="image-slot">
                        <i class="el-icon-picture-outline" style="font-size: 2em; color: #909399;"></i>
                    </div>
                </el-image>
            </div>
            <div class="salary-type col-auto order-sm-3">
                <span class="salary-range">{{jobInfo.job_salary}}</span>
                <span v-if="jobInfo.job_way==='全职'" class="badge badge-success">{{jobInfo.job_way}}</span>
                <span v-if="jobInfo.job_way==='兼职'" class="badge badge-info">{{jobInfo.job_way}}</span>
                <span v-if="jobInfo.job_way==='实习'" class="badge badge-warning">{{jobInfo.job_way}}</span>
            </div>
            <div class="content col">
                <h6 class="title">{{jobInfo.job_name}}</h6>
                <ul class="meta">
                    <li><strong class="text-primary">{{companyInfo.company_name}}</strong></li>
                </ul>
            </div>
        </router-link>
        <!-- Job List Start -->
    </div>
</template>

<script>
    export default {
        name: "JobItem",
        props: [
            'jobInfo',
            'companyInfo'
        ],
    }
</script>

<style scoped>

</style>
