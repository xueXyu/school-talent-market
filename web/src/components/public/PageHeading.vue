<template>
    <!-- Page Heading Section Start -->
    <div class="page-heading-section section bg-parallax" :style="randombg" data-overlay="50">
        <div class="container">
            <div class="page-heading-content text-center">
                <h3 class="title">{{pageData.name}}</h3>
                <div class="breadcrumb mt-3">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item v-for="(item,index) in pageData.navs" :key="index"
                                            :to="{name:item.to}">
                            {{item.name}}
                        </el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
            </div>
        </div>
    </div>
    <!-- Page Heading Section End -->
</template>

<script>
    import '../../../src/assets/js/plugins/jquery.parallax';

    export default {
        name: "PageHeading",
        props: [
            "pageData"
        ],
        data() {
            return {
                randombg: '',
            }
        },
        methods: {
            init() {
                $('.bg-parallax').each(function () {
                    $(this).parallax("50%", 0.5);
                });
            },
            randomFrom(lowerValue, upperValue) {
                return Math.floor(Math.random() * (upperValue - lowerValue + 1) + lowerValue);
            },
            randomFun() {
                let num = this.randomFrom(1, 3);
                this.randombg = 'background-image: url(\"static/images/bg/bg-' + num + '.jpg\");'
            }
        },
        created() {
            this.randomFun();
        },
        mounted() {
            this.init();
        }
    }
</script>

<style>
    .section .container .page-heading-content .breadcrumb .el-breadcrumb .el-breadcrumb__item .el-breadcrumb__inner.is-link {
        color: #ffffff !important;
    }
</style>
