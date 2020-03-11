<template>
    <div>
        <header class="header" :class="header_class">
            <div @scroll="handleScroll" class="container">
                <div class="row justify-content-between align-items-center">

                    <!-- Header Logo Start -->
                    <div class="col">
                        <div class="header-logo">
                            <router-link :to="{name:'Home'}"><img src="../../../static/images/logo/logo-light.png"
                                                                  alt="Site Logo"></router-link>
                        </div>
                    </div><!-- Header Logo End -->

                    <!-- Offcanvas Toggle Start -->
                    <div class="col-auto d-lg-none d-flex align-items-center">
                        <button class="offcanvas-toggle">
                            <span></span>
                        </button>
                    </div>
                    <!-- Offcanvas Toggle End -->

                    <!-- Header Links Start -->
                    <div v-if="!this.store.state.isLogin" class="header-links col-auto order-lg-3">
                        <a v-on:click="onLogin('login')">登录</a>
                        <span>or</span>
                        <a v-on:click="onLogin('signup')">注册</a>
                    </div>
                    <!-- Header Links End -->

                    <!-- Header Menu Start -->
                    <nav id="main-menu" class="main-menu col-lg-auto order-lg-2">
                        <ul>
                            <li class="has-children">
                                <router-link :to="{name:'Home'}">首页</router-link>
                            </li>
                            <li class="has-children">
                                <router-link :to="{name:'JobList'}">招聘</router-link>
                                <ul class="sub-menu">
                                    <li>
                                        <router-link :to="{name:'JobList'}">招聘列表</router-link>
                                    </li>
                                    <li>
                                        <router-link :to="{name:'JobSingle',params:{jobId:1}}">招聘详情</router-link>
                                    </li>
                                    <li>
                                        <router-link :to="{name:'ResumeSingle',params:{resumeId:1}}">简历详情</router-link>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <router-link :to="{name:'Company'}">公司</router-link>
                                <ul class="sub-menu">
                                    <li>
                                        <router-link :to="{name:'Company'}">公司列表</router-link>
                                    </li>
                                    <li>
                                        <router-link :to="{name:'CompanySingle',params:{companyId:10}}">公司详情</router-link>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <router-link :to="{name:'News'}">新闻&公告</router-link>
                                <ul class="sub-menu">
                                    <li>
                                        <router-link :to="{name:'News'}">新闻&公告列表</router-link>
                                    </li>
                                    <li>
                                        <router-link :to="{name:'NewsSingle',params:{newsId:1}}">新闻&公告详情</router-link>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <router-link :to="{name:'AboutUs'}">关于我们</router-link>
                            </li>
                            <li>
                                <router-link :to="{name:'ContactUs'}">联系我们</router-link>
                            </li>
                            <li v-if="this.store.state.isLogin">
                                <span :to="{name:'News'}">
                                    {{this.store.state.userInfo.user_account || this.store.state.userInfo.company_account}}-个人中心
                                </span>
                                <ul class="sub-menu">
                                    <li>
                                        <router-link :to="{name:'EditUserInfo'}">修改个人信息</router-link>
                                    </li>
                                    <li>
                                        <router-link :to="{name:'EditCompanyInfo'}">修改公司信息</router-link>
                                    </li>
                                    <li>
                                        <router-link :to="{name:'CreateJob'}">创建招聘</router-link>
                                    </li>
                                    <li>
                                        <router-link :to="{name:'CreateResume'}">创建简历</router-link>
                                    </li>
                                    <li>
                                        <router-link :to="{name:'UserManagementJobs'}">用户-管理职位</router-link>
                                    </li>
                                    <li>
                                        <router-link :to="{name:'UserManagementResume'}">用户-管理简历</router-link>
                                    </li>
                                    <li>
                                        <router-link :to="{name:'CompanyManagementJobs'}">公司-管理招聘</router-link>
                                    </li>
                                    <li>
                                        <router-link :to="{name:'CompanyManagementResume'}">公司-管理简历</router-link>
                                    </li>
                                    <li>
                                        <a @click="loginOut">退出登录</a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                    <!-- Header Menu End -->

                </div>
            </div>
        </header>

        <LoginSignup ref="childSignupLogin"></LoginSignup>
    </div>
</template>

<script>
    import LoginSignup from "./LoginSignup";

    export default {
        name: "Header",
        components: {
            LoginSignup,
        },
        data() {
            return {
                header_class: '',
                openLoginSign: false,
                activeLogin: true,
            }
        },
        methods: {
            handleScroll: function () {
                let scrollTop = this.getScroll().top;
                if (scrollTop > 180) {
                    this.header_class = 'is-sticky';
                } else {
                    this.header_class = '';
                }
            },
            getScroll: function () {
                return {
                    left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0,
                    top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
                }
            },
            onLogin: function (t) {
                this.$refs.childSignupLogin.changeStatus(t);
            },
            loginOut: function () {
                this.util.loginOut(this);
                this.$route.name === 'Home' ? '' : this.$router.push({name: 'Home'});
            },
            async destroySession() {
                try {
                    await this.http.delete(this.api.Sessions).then(res => {
                        if (res.code == 0) {
                            this.$message.success('退出成功');
                        } else {
                            this.$message.error(res.message);
                        }
                    });
                } catch (error) {
                    console.error(error);
                }
            }
        },
        created() {
            window.addEventListener('scroll', this.handleScroll);
        },
        mounted() {

        }
    }
</script>

<style scoped>

</style>
