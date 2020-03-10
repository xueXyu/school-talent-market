<template>
    <!-- Company List Start -->
    <div class="col company-item">
        <router-link :to="{name:'CompanySingle',params:{companyId:companyItem.id}}" class="feature-company">
            <span class="company-logo">
                <el-image :src="this.util.getHost()+companyItem.company_img"
                          fit="fit"
                          style="width: 70px; height: 70px; line-height: 70px;"></el-image>
            </span>
            <h6 class="title">{{companyItem.company_name}}</h6>
            <span class="open-job">{{companyItem.jobs.length}} 个正在招聘的职位</span>
        </router-link>
    </div>
    <!-- Company List Start -->
</template>

<script>
    export default {
        name: "HomeCompanyItem",
        props: ['companyItem']
    }
</script>

<style scoped>
    .company-item .title {
        width: 160px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>
