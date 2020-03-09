<template>
    <div>
        <!--OffCanvas Overlay-->
        <div class="offcanvas-overlay"></div>

        <!-- Page Heading Section Start -->
        <PageHeading :page-data="pageData"></PageHeading>
        <!-- Page Heading Section End -->

        <div class="job-switch">
            <el-button class="job-add" type="success">新增简历</el-button>
        </div>

        <div class="job-table">
            <el-table
                :data="tableData"
                stripe="stripe"
                style="width: 100%"
                max-height="600">
                <el-table-column fixed prop="date" label="职位名称" width="200">
                </el-table-column>
                <el-table-column prop="address" label="薪资待遇" width="120">
                </el-table-column>
                <el-table-column prop="province" label="工作性质" width="120">
                </el-table-column>
                <el-table-column prop="city" label="性别要求" width="120">
                </el-table-column>
                <el-table-column prop="zip" label="申请人数" width="300">
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="270">
                    <template slot-scope="scope">
                        <el-button type="info" plain>查看</el-button>
                        <el-button type="primary" plain>修改</el-button>
                        <el-button type="danger" plain
                                   @click.native.prevent="deleteRow(scope.$index, tableData)">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                class="job-pagination"
                :hide-on-single-page="true"
                background
                layout="prev, pager, next"
                :total="1000">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import PageHeading from "./public/PageHeading";

    export default {
        name: "CompanyManagementJobs",
        components: {
            PageHeading
        },
        data() {
            return {
                pageData: {
                    'name': '工作名称',
                    'navs': [
                        {'name': 'Home', 'to': 'Home', 'active': false},
                        {'name': 'Jobs', 'to': 'Jobs', 'active': false},
                        {'name': '工作名称', 'to': '', 'active': true},
                    ],
                },
                activeIndex: '1',
                tableData: [{
                    date: '全职后端开发工程师',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    date: '2016-05-02',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    date: '2016-05-08',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    date: '2016-05-06',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    date: '2016-05-07',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }]
            }
        },
        methods: {
            deleteRow(index, rows) {
                rows.splice(index, 1);
            },
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            }
        },

    }
</script>

<style scoped>
    .job-switch {
        position: relative;
        top: 10px;
        margin: 0 6%;
        line-height: 58px;
        text-align: right;
    }

    .job-add {
        width: 120px;
        margin-right: 30px;
    }

    .job-table {
        margin: 20px 6%;
    }

    .job-pagination {
        margin-top: 30px;
        margin-bottom: 40px;
    }
</style>
