<template>
    <div>
        <!--OffCanvas Overlay-->
        <div class="offcanvas-overlay"></div>

        <!-- Page Heading Section Start -->
        <PageHeading :page-data="pageData"></PageHeading>
        <!-- Page Heading Section End -->

        <div class="job-switch">
            <el-menu class="el-menu-demo"
                     :default-active="activeIndex"
                     mode="horizontal"
                     @select="handleSelect">
                <el-menu-item index="1">未审核</el-menu-item>
                <el-menu-item index="2">已通过</el-menu-item>
                <el-menu-item index="3">未通过</el-menu-item>
            </el-menu>
        </div>

        <div class="job-table">
            <el-table
                :data="tableData"
                stripe="stripe"
                style="width: 100%"
                max-height="600">
                <el-table-column fixed prop="date" label="姓名" width="120">
                </el-table-column>
                <el-table-column prop="address" label="性别" width="120">
                </el-table-column>
                <el-table-column prop="province" label="年龄" width="120">
                </el-table-column>
                <el-table-column prop="city" label="学历" width="120">
                </el-table-column>
                <el-table-column prop="city" label="工作经验" width="120">
                </el-table-column>
                <el-table-column prop="zip" label="电话" width="120">
                </el-table-column>
                <el-table-column prop="name" label="邮箱" width="120">
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="350">
                    <template slot-scope="scope">
                        <el-button type="info" plain
                                   @click.native.prevent="deleteRow(scope.$index, tableData)">
                            查看
                        </el-button>
                        <el-button type="primary"
                                   @click.native.prevent="deleteRow(scope.$index, tableData)">
                            审核通过
                        </el-button>
                        <el-button type="warning" plain
                                   @click.native.prevent="deleteRow(scope.$index, tableData)">
                            审核不通过
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                class="job-pagination"
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
        name: "CompanyManagementResume",
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
                    date: '2016-05-03',
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
    }

    .job-table {
        margin: 20px 6%;
    }

    .job-pagination {
        margin-top: 30px;
        margin-bottom: 40px;
    }
</style>
