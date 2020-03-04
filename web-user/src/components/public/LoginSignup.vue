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
                                    <div class="row mb-n3">
                                        <div class="col-12 mb-3"><input type="email" placeholder="账号"></div>
                                        <div class="col-12 mb-3"><input type="password" placeholder="密码"></div>
                                        <div class="col-12 mb-3">
                                            <div class="row justify-content-sm-between pl-4">
                                                <div class="col-auto"><input type="radio" name="sex" id="login-user"
                                                                             class="custom-control-input"
                                                                             selected="selected" value="我是求职者"><label
                                                    class="custom-control-label" for="login-user">我是求职者</label></div>
                                                <div class="col-auto"><input type="radio" name="sex" id="login-company"
                                                                             class="custom-control-input" value="我是招聘者"><label
                                                    class="custom-control-label" for="login-company">我是招聘者</label></div>
                                            </div>
                                        </div>
                                        <div class="col-12 mb-3">
                                            <div class="row justify-content-between mb-n2">
                                                <div class="col-auto mb-2">
                                                    <div class="custom-control custom-checkbox">
                                                        <input type="checkbox" name="remember-me" id="remember-me"
                                                               value="checkedValue" class="custom-control-input">
                                                        <label class="custom-control-label"
                                                               for="remember-me">记住我</label>
                                                    </div>
                                                </div>
                                                <div class="col-auto mb-2"><a href="#">忘记密码啦?</a></div>
                                            </div>
                                        </div>
                                        <div class="col-12 mb-3"><input class="btn btn-primary w-100" type="submit"
                                                                        value="登录"></div>
                                    </div>
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
                                    <div class="row mb-n3">
                                        <div class="col-12 mb-3"><input type="text" placeholder="账号"></div>
                                        <div class="col-12 mb-3"><input type="password" placeholder="密码"></div>
                                        <div class="col-12 mb-3"><input type="password" placeholder="重复密码"></div>
                                        <div class="col-12 mb-3">
                                            <div class="row justify-content-sm-between pl-4">
                                                <div class="col-auto"><input type="radio" name="sex" id="signup-user"
                                                                             class="custom-control-input"
                                                                             selected="selected" value="我是求职者"><label
                                                    class="custom-control-label" for="signup-user">我是求职者</label></div>
                                                <div class="col-auto"><input type="radio" name="sex" id="signup-company"
                                                                             class="custom-control-input" value="我是招聘者"><label
                                                    class="custom-control-label" for="signup-company">我是招聘者</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12 mb-3"><input class="btn btn-primary w-100" type="submit"
                                                                        value="注册"></div>
                                    </div>
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
            return {
                openLoginSign: false,
                activeLogin: true,
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
            }

        }
    }
</script>

<style scoped>

</style>
