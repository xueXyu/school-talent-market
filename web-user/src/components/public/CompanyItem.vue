<template>
    <!-- Company List Start -->
    <div class="company-item col-xl-4 col-lg-6 col-md-4 col-sm-6 col-12">
        <router-link :to="{name:'CompanySingle',params:{companyId:companyItem.id}}" class="company-list">
            <span class="company-logo">
                <el-image style="width: 70px; height: 70px; line-height: 70px;"
                          :src="this.util.getHost()+companyItem.company_img"
                          fit="fit">
                    <div slot="error" class="image-slot">
                        <i class="el-icon-picture-outline" style="font-size: 2em; color: #909399;"></i>
                    </div>
                </el-image>
            </span>
            <h6 class="title">{{companyItem.company_name}}</h6>
            <span class="open-job">1 open positions</span>
            <span class="location"><i class="fa fa-map-o"></i>{{companyItem.company_address}}</span>
        </router-link>
    </div>
    <!-- Company List Start -->
</template>

<script>
    export default {
        name: "CompanyItem",
        props: ['companyItem']
    }
</script>

<style>
    .company-item .title, .company-item .location {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>
