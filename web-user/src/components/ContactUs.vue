<template>
    <div>
        <!--OffCanvas Overlay-->
        <div class="offcanvas-overlay"></div>

        <!-- Page Heading Section Start -->
        <PageHeading :page-data="pageData"></PageHeading>
        <!-- Page Heading Section End -->

        <!-- Contact Section Start -->
        <div class="section section-padding">
            <div class="container">
                <div class="row mb-n5">

                    <!-- Contact Information Start -->
                    <div class="col-lg-5 col-12 mb-5">
                        <div class="contact-information">
                            <h5 class="title mb-4">联系信息</h5>
                            <ul>
                                <li><i class="fa fa-map-o"></i><span>北京市朝阳区望京SOHO</span>
                                </li>
                                <li><i class="fa fa-phone"></i><span>+86 138 8888 8888</span></li>
                                <li><i class="fa fa-envelope-o"></i><span>jack@wu06.com</span></li>
                            </ul>
                            <div class="contact-social">
                                <a href="#"><i class="fa fa-qq"></i></a>
                                <a href="#"><i class="fa fa-wechat"></i></a>
                                <a href="#"><i class="fa fa-weibo"></i></a>
                                <a href="#"><i class="fa fa-facebook"></i></a>
                            </div>
                        </div>
                    </div>
                    <!-- Contact Information End -->

                    <!-- Contact Form Start -->
                    <div class="col-lg-7 col-12 mb-5">
                        <div class="contact-form">
                            <h5 class="title mb-4">取得联系</h5>

                            <form id="contact-form" action="#" method="post">
                                <div class="row mb-n3">
                                    <div class="col-md-6 col-12 mb-3">
                                        <input type="text" name="name" placeholder="你的名字">
                                    </div>
                                    <div class="col-md-6 col-12 mb-3">
                                        <input type="email" name="email" placeholder="邮箱地址">
                                    </div>
                                    <div class="col-12 mb-3">
                                        <textarea name="message" placeholder="想说点儿什么" rows="4"></textarea>
                                    </div>
                                    <div class="col-12 mb-3">
                                        <el-button class="btn btn-primary px-5" type="primary" @click="onSubmit">提 交
                                        </el-button>
                                    </div>
                                </div>
                            </form>
                            <div class="form-messege"></div>
                        </div>
                    </div>
                    <!-- Contact Form End -->

                </div>
            </div>
        </div>
        <!-- Contact Section End -->
    </div>
</template>

<script>
    import PageHeading from "./public/PageHeading";

    export default {
        name: "ContactUs",
        components: {
            PageHeading
        },
        data() {
            return {
                pageData: {
                    'name': '联系我们',
                    'navs': [
                        {'name': 'Home', 'to': 'Home', 'active': false},
                        {'name': '联系我们', 'to': '', 'active': true},
                    ],
                }
            }
        },
        methods: {
            onSubmit() {
                this.$message.success('信息提交成功，请耐心等待我们的回复~');
            }
        }
    }
</script>

<style scoped>

</style>
