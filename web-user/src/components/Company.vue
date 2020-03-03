<template>
    <div>
        <!--OffCanvas Overlay-->
        <div class="offcanvas-overlay"></div>

        <!-- Page Heading Section Start -->
        <PageHeading :page-data="pageData"></PageHeading>
        <!-- Page Heading Section End -->

        <!-- Company List Start -->
        <div class="section section-padding">
            <div class="container">
                <div class="row mb-n5">

                    <div class="col-lg-8 col-12 mb-5 pr-lg-5">

                        <!-- Company List Wrap Start -->
                        <div class="company-list-wrap row">

                            <CompanyItem></CompanyItem>
                            <CompanyItem></CompanyItem>
                            <CompanyItem></CompanyItem>
                            <CompanyItem></CompanyItem>
                            <CompanyItem></CompanyItem>
                            <CompanyItem></CompanyItem>
                            <CompanyItem></CompanyItem>
                            <CompanyItem></CompanyItem>
                            <CompanyItem></CompanyItem>
                            <CompanyItem></CompanyItem>
                            <CompanyItem></CompanyItem>
                            <CompanyItem></CompanyItem>

                        </div>
                        <!-- Company List Wrap Start -->

                        <!-- Pagination Start -->
                        <Pagination></Pagination>
                        <!-- Pagination End -->

                    </div>

                    <!-- Company Sidebar Wrap Start -->
                    <div class="col-lg-4 col-12 mb-5">
                        <div class="sidebar-wrap">
                            <!-- Sidebar (Search) Start -->
                            <div class="sidebar-widget">
                                <div class="inner">
                                    <h6 class="title">搜索</h6>
                                    <form action="#">
                                        <div class="row">
                                            <div class="col-12 mb-3"><input type="text" placeholder="公司名"></div>
                                            <div class="col-12 mb-3">
                                                <label>公司地址</label>
                                                <input type="text" placeholder="公司地址">
                                            </div>
                                            <div class="col-12 mb-3">
                                                <label>公司规模</label>
                                                <select>
                                                    <option>All Company Size</option>
                                                    <option>&lt; 10 employees</option>
                                                    <option>10 ~ 50 employees</option>
                                                    <option>50 ~ 200 employees</option>
                                                    <option>200 ~ 500 employees</option>
                                                    <option>500 ~ 2000 employees</option>
                                                    <option>&gt; 2000 employees</option>
                                                </select>
                                            </div>
                                            <div class="col-12 mb-3">
                                                <input class="btn btn-primary w-100" type="submit" value="搜索">
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <!-- Sidebar (Search) End -->

                            <!-- Sidebar (Search) Start -->
                            <div class="sidebar-widget">
                                <div class="inner">
                                    <a class="banner" href="/" target="_blank"><img src="../../static/images/banner/banner-1.jpg" alt="Banner"></a>
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
    import Pagination from "./public/Pagination";
    export default {
        name: "Company",
        components:{
            CompanyItem,
            PageHeading,
            Pagination
        },
        data() {
            return {
                pageData: {
                    'name':'工作名称',
                    'navs':[
                        {'name':'Home','to':'Home','active':false},
                        {'name':'Jobs','to':'Jobs','active':false},
                        {'name':'工作名称','to':'','active':true},
                    ],
                }
            }
        },
    }
</script>

<style scoped>

</style>
