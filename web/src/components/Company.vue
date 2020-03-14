<template>
    <div>
        <!--OffCanvas Overlay-->
        <div class="offcanvas-overlay"></div>

        <!-- Page Heading Section Start -->
        <PageHeading :page-data="pageData"></PageHeading>
        <!-- Page Heading Section End -->

        <!-- Company List Start -->
        <div class="section section-padding company-all-list">
            <div class="container">
                <div class="row mb-n5">

                    <div class="col-lg-8 col-12 mb-5 pr-lg-5">

                        <!-- Company List Wrap Start -->
                        <div class="company-list-wrap row">

                            <CompanyItem v-for="(item,index) in companyList" :key="index"
                                         :company-item="item"></CompanyItem>

                        </div>
                        <!-- Company List Wrap Start -->

                        <!-- Pagination Start -->
                        <el-pagination
                            class="pagination"
                            :hide-on-single-page="true"
                            background
                            layout="total,prev, pager, next"
                            @current-change="currentChange"
                            :page-size="page_size"
                            :total="page_count">
                        </el-pagination>
                        <!-- Pagination End -->

                    </div>

                    <!-- Company Sidebar Wrap Start -->
                    <div class="col-lg-4 col-12 mb-5">
                        <div class="sidebar-wrap">
                            <!-- Sidebar (Search) Start -->
                            <div class="sidebar-widget">
                                <div class="inner">
                                    <h6 class="title" style="margin-bottom: 30px;">搜索</h6>
                                    <el-form ref="searchForm" :model="searchForm" label-position="top"
                                             label-width="100%">
                                        <el-form-item label="公司名称" class="company-list-search-label">
                                            <el-input v-model="searchForm.company_name"></el-input>
                                        </el-form-item>
                                        <el-form-item label="公司地址" class="company-list-search-label">
                                            <el-input v-model="searchForm.company_address"></el-input>
                                        </el-form-item>
                                        <el-form-item label="公司规模" class="company-list-search-label">
                                            <el-select v-model="searchForm.company_size" placeholder="请选择公司规模">
                                                <el-option label="所有规模" value="所有规模"></el-option>
                                                <el-option label="0-20人" value="0-20人"></el-option>
                                                <el-option label="20-99人" value="20-99人"></el-option>
                                                <el-option label="100-499人" value="100-499人"></el-option>
                                                <el-option label="500-999人" value="500-999人"></el-option>
                                                <el-option label="1000-9999人" value="1000-9999人"></el-option>
                                                <el-option label="10000人以上" value="10000人以上"></el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item>
                                            <el-button type="primary" @click="searchCompany">搜索</el-button>
                                        </el-form-item>
                                    </el-form>
                                </div>
                            </div>
                            <!-- Sidebar (Search) End -->

                            <!-- Sidebar (Search) Start -->
                            <div class="sidebar-widget">
                                <div class="inner">
                                    <a @click="advertising" class="banner" target="_blank">
                                        <img src="../../static/images/banner/banner-1.jpg" alt="Banner">
                                    </a>
                                </div>
                            </div>
                            <!-- Sidebar (Search) End -->
                        </div>
                    </div>
                    <!-- Company Sidebar Wrap End -->

                </div>
            </div>
        </div>
        <!-- Company List End -->
    </div>
</template>

<script>
    import PageHeading from "./public/PageHeading";
    import CompanyItem from "./public/CompanyItem";

    const _ = require('lodash');

    export default {
        name: "Company",
        components: {
            CompanyItem,
            PageHeading
        },
        data() {
            return {
                pageData: {
                    'name': '公司',
                    'navs': [
                        {'name': 'Home', 'to': 'Home', 'active': false},
                        {'name': '公司', 'to': '', 'active': false},
                    ],
                },
                searchWhere: null,
                searchForm: {
                    company_name: null,
                    company_address: null,
                    company_size: null,
                },
                companyList: null,
                current_page: 1,
                page_count: 1,
                page_size: 12,
            }
        },
        methods: {
            currentChange(event) {
                this.current_page = event;
                this.getCompanyList();
            },
            advertising() {
                this.$message.info('这是一个广告~');
            },
            searchCompany() {
                var searchWhere = {};
                _.forEach(this.searchForm, function (value, key) {
                    if (!_.isEmpty(value) && key == 'company_name') {
                        searchWhere.company_name = value;
                    }
                    if (!_.isEmpty(value) && key == 'company_address') {
                        searchWhere.company_address = value;
                    }
                    if (!_.isEmpty(value) && key == 'company_size' && value !== '所有规模') {
                        searchWhere.company_size = value;
                    }
                });

                if (!_.isEmpty(searchWhere)) {
                    this.searchWhere = searchWhere;
                    this.searchCompanyList();
                } else {
                    this.getCompanyList();
                }
            },
            async searchCompanyList() {
                try {
                    await this.http.post(this.api.CompanySearch, this.searchWhere).then(res => {
                        if (res.code == 0) {
                            this.page_count = 0;
                            this.companyList = res.data.rows;
                        } else {
                            this.$message.error(res.message);
                        }
                    });
                } catch (error) {
                    console.error(error);
                }
            },
            async getCompanyList() {
                try {
                    await this.http.get(this.api.Company, {
                        limit: this.page_size,
                        offset: (this.current_page - 1) * this.page_size,
                        // order: ['created_at', 'DESC'],
                    }).then(res => {
                        if (res.code == 0) {
                            this.page_count = res.data.count;
                            this.companyList = res.data.rows;
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
            this.getCompanyList();
        }
    }
</script>

<style scoped>
    .pagination {
        display: flex;
        justify-content: center;
        padding-top: 90px;
    }

    .company-all-list .el-form .el-form-item .el-form-item__content .el-button {
        width: 100%;
        margin-top: 20px;
    }

    .company-list-search-label {
        margin-bottom: 18px;
    }
</style>

<style>
    .company-list-search-label .el-form--label-top .el-form-item__label,
    .company-list-search-label .el-form-item__label,
    .company-list-search-label label {
        padding: 0;
        margin: 0;
    }
</style>
