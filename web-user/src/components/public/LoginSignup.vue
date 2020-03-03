<template>
    <div class="loginSignupModal modal fade" id="loginSignupModal" tabindex="-1" role="dialog" aria-labelledby="loginSignupModal" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">

                    <ul class="loginSignupNav nav">
                        <li><a class="nav-link active" data-toggle="tab" href="#login">登录</a></li>
                        <li><a class="nav-link" data-toggle="tab" href="#signup">注册</a></li>
                    </ul>

                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>

                </div>
                <div class="modal-body">
                    <div class="tab-content" id="myTabContent">
                        <div class="tab-pane fade show active" id="login">
                            <form>
                                <div class="row mb-n3">
                                    <div class="col-12 mb-3"><input type="email" placeholder="账号"></div>
                                    <div class="col-12 mb-3"><input type="password" placeholder="密码"></div>
                                    <div class="col-12 mb-3">
                                        <div class="row justify-content-sm-between pl-4">
                                            <div class="col-auto"><input type="radio" name="sex" id="login-user" class="custom-control-input" selected="selected" value="我是求职者"><label class="custom-control-label" for="login-user">我是求职者</label></div>
                                            <div class="col-auto"><input type="radio" name="sex" id="login-company" class="custom-control-input" value="我是招聘者"><label class="custom-control-label" for="login-company">我是招聘者</label></div>
                                        </div>
                                    </div>
                                    <div class="col-12 mb-3">
                                        <div class="row justify-content-between mb-n2">
                                            <div class="col-auto mb-2">
                                                <div class="custom-control custom-checkbox">
                                                    <input type="checkbox" name="remember-me" id="remember-me" value="checkedValue" class="custom-control-input">
                                                    <label class="custom-control-label" for="remember-me">记住我</label>
                                                </div>
                                            </div>
                                            <div class="col-auto mb-2"><a href="#">忘记密码啦?</a></div>
                                        </div>
                                    </div>
                                    <div class="col-12 mb-3"><input class="btn btn-primary w-100" type="submit" value="登录"></div>
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
                        <div class="tab-pane fade" id="signup">
                            <form>
                                <div class="row mb-n3">
                                    <div class="col-12 mb-3"><input type="text" placeholder="账号"></div>
                                    <div class="col-12 mb-3"><input type="password" placeholder="密码"></div>
                                    <div class="col-12 mb-3"><input type="password" placeholder="重复密码"></div>
                                    <div class="col-12 mb-3">
                                        <div class="row justify-content-sm-between pl-4">
                                            <div class="col-auto"><input type="radio" name="sex" id="signup-user" class="custom-control-input" selected="selected" value="我是求职者"><label class="custom-control-label" for="signup-user">我是求职者</label></div>
                                            <div class="col-auto"><input type="radio" name="sex" id="signup-company" class="custom-control-input" value="我是招聘者"><label class="custom-control-label" for="signup-company">我是招聘者</label></div>
                                        </div>
                                    </div>
                                    <div class="col-12 mb-3"><input class="btn btn-primary w-100" type="submit" value="注册"></div>
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
</template>

<script>
    export default {
        name: "LoginSignup",
        mounted:() => {
            $('#loginSignupModal').on('show.bs.modal', function (event) {
                var $button = $(event.relatedTarget),
                    $target = $button.data('target-sub'),
                    $modal = $(this);
                $modal.find('.nav-link').removeClass('active');
                $modal.find('.nav-link[href="' + $target + '"]').addClass('active');
                $modal.find('.tab-pane').removeClass('active show');
                $modal.find('.tab-pane' + $target).addClass('active show');
            })
        }
    }
</script>

<style scoped>

</style>
