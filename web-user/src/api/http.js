import axios from 'axios';
import {Message} from 'element-ui';
import router from '../router';
import util from '../util';

const localhosts = util.getHost();   //请求的后台域名

// 添加一个请求拦截器
axios.interceptors.request.use(function (config) {
    //请求之前(可以设置token)
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 处理请求错误
    Message.error('请求错误：' + error);
    return Promise.reject(error);
});

// 添加一个响应拦截器
axios.interceptors.response.use(function (response) {
    // 位于2xx范围内的任何状态代码都会触发此函数
    // 对响应数据做些什么
    return response;
}, function (error) {
    // 任何超出2xx范围的状态码都会触发此函数
    // 处理响应错误
    Message.error('Http请求失败，响应错误');
    return Promise.reject(error);
});

function successfun(res) {//处理后台返回的非200错误
    if (res.status === 200) {
        return res.data;
    } else {
        Message.warning(res.message);
        return res;
    }
}

function errorfun(res) {
    if (res.status == 404) {
        Message.error('接口不存在');
    } else if (res.status == 500) {
        Message.error('服务器内部错误');
    } else {
        Message.error(res.message);
    }
}

export default {
    hosts() {
        return localhosts;
    },
    post(url, data) {//post请求
        return axios({
            method: 'post',
            baseURL: localhosts,
            url,
            data: data,
            withCredentials: true,
            timeout: 5000,//响应时间
        }).then(res => {
            return successfun(res)
        }, err => {
            return errorfun(err);
        });
    },
    get(url, params) {//get请求
        return axios({
            method: 'get',
            baseURL: localhosts,
            url,
            params,
            withCredentials: true,
            timeout: 5000,
        }).then(res => {
            return successfun(res)
        }, err => {
            return errorfun(err)
        });
    },
    put(url, data) {//put请求
        return axios({
            method: 'put',
            baseURL: localhosts,
            url,
            data,
            withCredentials: true,
            timeout: 5000,
        }).then(res => {
            return successfun(res)
        }, err => {
            return errorfun(err)
        });
    },
    delete(url, params) {//delete请求
        return axios({
            method: 'delete',
            baseURL: localhosts,
            url,
            params,
            withCredentials: true,
            timeout: 5000,
        }).then(res => {
            return successfun(res)
        }, err => {
            return errorfun(err)
        });
    }
}
