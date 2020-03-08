<template>
    <div>
        <!-- Job List Start -->
        <router-link :to="{name:'JobSingle',params:{jobId: jobInfo.id}}"
                     class="job-list"
                     v-if="jobInfo&&companyInfo">
            <div class="company-logo col-auto">
                <el-image style="width: 70px; height: 70px;"
                          :src="this.util.getHost()+companyInfo.company_img"
                          fit="fit"></el-image>
            </div>
            <div class="salary-type col-auto order-sm-3">
                <span class="salary-range">{{jobInfo.job_salary}}</span>
                <span class="badge badge-success">{{jobInfo.job_way}}</span>
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
