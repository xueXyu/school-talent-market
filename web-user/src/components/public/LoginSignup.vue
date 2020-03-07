<template>
    <div>
        <!--OffCanvas Overlay-->
        <div class="offcanvas-overlay"></div>

        <div v-if="openLoginSign" class="loginSignupModal modal fade show" style="display: block;" id="loginSignupModal"
             tabindex="-1"
             role="dialog" aria-labelledby="loginSignupModal">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">

                        <ul class="loginSignupNav nav">
                            <li><a class="nav-link" v-bind:class="{'active':activeLogin}" v-on:click="onlogin">登录</a>
                            </li>
                            <li><a class="nav-link" v-bind:class="{'active':!activeLogin}" v-on:click="onlogin">注册</a>
                            </li>
                        </ul>

                        <button type="button" class="close" v-on:click="onclose">
                            <span aria-hidden="true">&times;</span>
                        </button>

                    </div>
                    <div class="modal-body">
                        <div class="tab-content" id="myTabContent">
                            <div class="tab-pane fade" v-bind:class="{'show active':activeLogin}" id="login">
                                <form>
                                    <el-form :model="loginForm" :rules="loginRules" ref="loginForm">
                                        <el-form-item label="" prop="username">
                                            <el-input v-model="loginForm.username" placeholder="账号"></el-input>
                                        </el-form-item>
                                        <el-form-item label="" prop="password">
                                            <el-input v-model="loginForm.password" type="password"
                                                      placeholder="密码"></el-input>
                                        </el-form-item>
                                        <el-form-item label="" prop="usertype">
                                            <el-radio-group v-model="loginForm.usertype">
                                                <el-radio label="user" value="user">我是求职者</el-radio>
                                                <el-radio label="company" value="company">我是招聘者</el-radio>
                                            </el-radio-group>
                                        </el-form-item>
                                        <el-form-item>
                                            <el-button class="signup-button" type="primary" style="width: 100%;"
                                                       @click="submitForm('loginForm')"
                                                       :loading="signupLoading">登录
                                            </el-button>
                                        </el-form-item>
                                        <div class="row" style="text-align: center;">
                                            <div class="col-12">
                                                <a @click="forgotPassword">忘记密码啦?</a>
                                            </div>
                                        </div>
                                    </el-form>
                                    <div class="row mt-4">
                                        <div class="col text-center">
                                            <div class="login-reg-social">
                                                <a href="#"><i class="fa fa-qq"></i></a>
                                                <a href="#"><i class="fa fa-wechat"></i></a>
                                                <a href="#"><i class="fa fa-weibo"></i></a>
                                                <a href="#"><i class="fa fa-facebook"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div class="tab-pane fade" v-bind:class="{'show active':!activeLogin}" id="signup">
                                <form>
                                    <el-form :model="signupForm" :rules="signupRules" ref="signupForm">
                                        <el-form-item label="" prop="username">
                                            <el-input v-model="signupForm.username" placeholder="账号"></el-input>
                                        </el-form-item>
                                        <el-form-item label="" prop="password">
                                            <el-input v-model="signupForm.password" type="password"
                                                      placeholder="密码"></el-input>
                                        </el-form-item>
                                        <el-form-item label="" prop="repassword">
                                            <el-input v-model="signupForm.repassword" type="password"
                                                      placeholder="确认密码"></el-input>
                                        </el-form-item>
                                        <el-form-item label="" prop="usertype">
                                            <el-radio-group v-model="signupForm.usertype">
                                                <el-radio label="user" value="user">我是求职者</el-radio>
                                                <el-radio label="company" value="company">我是招聘者</el-radio>
                                            </el-radio-group>
                                        </el-form-item>
                                        <el-form-item>
                                            <el-button class="signup-button" type="primary" style="width: 100%;"
                                                       @click="submitForm('signupForm')"
                                                       :loading="signupLoading">注册
                                            </el-button>
                                        </el-form-item>
                                    </el-form>
                                    <div class="row mt-4">
                                        <div class="col text-center">
                                            <div class="login-reg-social">
                                                <a href="#"><i class="fa fa-qq"></i></a>
                                                <a href="#"><i class="fa fa-wechat"></i></a>
                                                <a href="#"><i class="fa fa-weibo"></i></a>
                                                <a href="#"><i class="fa fa-facebook"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--蒙层-->
        <div v-if="openLoginSign" class="modal-backdrop fade show"></div>
    </div>
</template>

<script>
    export default {
        name: "LoginSignup",
        data() {
            var checkPass = (rule, value, callback) => {
                if (typeof value == 'undefined' || value == '' || value == null) {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.signupForm.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                openLoginSign: false,
                activeLogin: true,
                signupLoading: false,
                loginLoading: false,
                signupForm: {
                    username: null,
                    password: null,
                    repassword: null,
                    usertype: null,
                },
                loginForm: {
                    username: null,
                    password: null,
                    usertype: null,
                },
                usertype: '',
                signupRules: {
                    username: [
                        {required: true, message: '请输入账号', trigger: 'blur'},
                        {min: 3, max: 30, message: '账号长度在 3 到 30 个字符', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 6, max: 30, message: '密码长度在 6 到 30 个字符', trigger: 'blur'}
                    ],
                    repassword: [
                        {validator: checkPass, trigger: 'blur'}
                    ],
                    usertype: [
                        {required: true, message: '请选择用户类型', trigger: 'change'}
                    ],
                },
                loginRules: {
                    username: [
                        {required: true, message: '请输入账号', trigger: 'blur'},
                        {min: 3, max: 30, message: '账号长度在 3 到 30 个字符', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 6, max: 30, message: '密码长度在 6 到 30 个字符', trigger: 'blur'}
                    ],
                    usertype: [
                        {required: true, message: '请选择用户类型', trigger: 'change'}
                    ],
                }
            }
        },
        methods: {
            onlogin: function () {
                this.activeLogin = !this.activeLogin;
            },
            onclose: function () {
                this.openLoginSign = false;
                $("body").removeClass("modal-open");
            },
            changeStatus: function (foo) {
                if (foo == 'login') {
                    $("body").addClass("modal-open");
                    this.openLoginSign = true;
                    this.activeLogin = true;
                } else if (foo == 'signup') {
                    $("body").addClass("modal-open");
                    this.openLoginSign = true;
                    this.activeLogin = false;
                }
            },
            forgotPassword() {
                this.$message.success('哈哈哈，忘记就忘记吧~');
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (formName == 'signupForm') {
                            this.signupLoading = true;
                            this.userSignup();
                        } else if (formName == 'loginForm') {
                            this.loginLoading = true;
                            this.userLogin();
                        }

                    }
                });
            },
            submitSuccess(data) {
                this.onclose();
                this.store.dispatch("updateIsLogin", true);
                this.store.dispatch("updateUserRole", this.usertype);
                this.store.dispatch("updateUserInfo", data);
                this.signupLoading = false;
                this.loginLoading = false;
                this.$route.name === 'Home' ? '' : this.$router.push({name: 'Home'});
            },
            async userSignup() {
                try {
                    await this.http.post(this.api.User, {
                        username: this.signupForm.username,
                        password: this.signupForm.password,
                        usertype: this.signupForm.usertype
                    })
                        .then(res => {
                            if (res.code == 0) {
                                this.$message.success('注册成功');
                                this.usertype = this.signupForm.usertype;
                                this.submitSuccess(res.data);
                            } else {
                                this.$message.error(res.message);
                            }
                        });
                } catch (error) {
                    console.error(error);
                }
            },
            async userLogin() {
                try {
                    await this.http.post(this.api.Sessions, this.loginForm).then(res => {
                        if (res.code == 0) {
                            this.$message.success('登录成功');
                            this.usertype = this.loginForm.usertype;
                            this.submitSuccess(res.data);
                        } else {
                            this.$message.error(res.message);
                        }
                    });
                } catch (error) {
                    console.error(error);
                }
            }
        }
    }
</script>


<style scoped>

</style>
