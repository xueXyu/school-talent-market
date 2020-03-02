<template>
    <footer class="footer">
        <div class="tese-ls">
            <el-row type="flex" justify="space-around">
                <el-col :span="8">
                    <div class="tese">
                        <i class="el-icon-medal-1"></i>
                        <span>名企热招</span>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="tese">
                        <i class="el-icon-alarm-clock"></i>
                        <span>24小时反馈</span>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="tese">
                        <i class="el-icon-money"></i>
                        <span>涨薪无忧</span>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="copy-footer">
            <p>
                <a class="police-record" href="#" target="_blank">京ICP备123456789号</a>
                <a class="police-record" href="#" target="_blank">营业执照</a>
                <a class="police-record" href="#" target="_blank">人才服务许可证:123456789号</a>
                <a class="police-record" href="#" target="_blank">
                    <img src="https://concat.lietou-static.com/fe-www-pc/v5/static/images/record.a82bd61b.png">
                    <span>京公网安备：123456789号</span>
                </a>
            </p>
            <p>Copyright © 2006-2020 liepin.com All Rights Reserved</p>
        </div>
    </footer>
</template>

<script>
    export default {
        name: "Footer"
    }
</script>

<style scoped>
    .footer {
        width: 100%;
        position: fixed;
        bottom: 0;
        padding-top: 30px;
    }

    .tese-ls {
        margin: 0 20%;
        line-height: 60px;
        border-bottom: 1px solid #d8d8d8;
    }

    .tese-ls i {
        font-size: 2em;
        vertical-align: middle;
    }

    .copy-footer {
        padding: 28px 0;
        font-size: 12px;
        color: #999;
        text-align: center;
        background-color: transparent;
    }

    .copy-footer a {
        color: #00528c;
        text-decoration: none;
    }

    .copy-footer .police-record {
        color: #999;
    }
</style>
