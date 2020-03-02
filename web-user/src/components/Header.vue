<template>
    <div class="header">
        <el-row :gutter="10" style="width: 980px;">
            <el-col :span="6">
                <div class="logo">
<!--                    <img src="../assets/logo.png" height="40"/>-->
                </div>
            </el-col>
            <el-col :span="12" style="text-align: center;">
                <div class="nav">
                    <el-menu
                        :default-active="activeIndex"
                        class="el-menu-demo"
                        mode="horizontal"
                        @select="handleSelect"
                        background-color="#303a40"
                        text-color="#fff"
                        active-text-color="#ffd04b">
                        <el-menu-item index="1">首页</el-menu-item>
                        <el-menu-item index="2">简历</el-menu-item>
                        <el-menu-item index="3">职位</el-menu-item>
                        <el-menu-item index="4">公告</el-menu-item>
                        <el-menu-item index="5">新闻中心</el-menu-item>
                    </el-menu>
                </div>
            </el-col>
            <el-col :span="6" style="color:#ffffff;">
                <el-col :span="24" style="text-align: center;">
                    <el-col :span="6">登录</el-col>
                    <el-col :span="6">注册</el-col>
                </el-col>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "Header",
        data() {
            return {
                activeIndex: '1'
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

<style scoped>
    .header {
        display: flex;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        justify-items: center;
        height: 60px;
        line-height: 60px;
        overflow: hidden;
        background-color: #303a40;
    }

    .logo {
        height: 60px;
        overflow: hidden;
    }

    .logo img {
        vertical-align: middle;
    }

</style>
