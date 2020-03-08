import Vue from 'vue';
import Router from 'vue-router';

import Home from '_c/Home';
import JobList from '_c/JobList';
import JobSingle from '_c/JobSingle';
import Company from '_c/Company';
import CompanySingle from '_c/CompanySingle';
import CreateJob from '_c/CreateJob';
import CreateResume from '_c/CreateResume';
import ResumeSingle from "_c/ResumeSingle";
import News from '_c/News';
import NewsSingle from '_c/NewsSingle';
import AboutUs from '_c/AboutUs';
import ContactUs from '_c/ContactUs';
import EditUserInfo from "_c/EditUserInfo";
import EditCompanyInfo from "_c/EditCompanyInfo";
import UserManagementJobs from '_c/UserManagementJobs';
import UserManagementResume from '_c/UserManagementResume';
import CompanyManagementJobs from '_c/CompanyManagementJobs';
import CompanyManagementResume from '_c/CompanyManagementResume';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        { // 职位列表
            path: '/job-list',
            name: 'JobList',
            component: JobList
        },
        {// 职位详情
            path: '/job-single/:jobId',
            name: 'JobSingle',
            component: JobSingle
        },
        {// 公司列表
            path: '/company',
            name: 'Company',
            component: Company
        },
        {// 公司详情
            path: '/company-single',
            name: 'CompanySingle',
            component: CompanySingle
        },
        {// 创建职位
            path: '/create-job',
            name: 'CreateJob',
            component: CreateJob
        },
        {// 创建简历
            path: '/create-resume',
            name: 'CreateResume',
            component: CreateResume
        },
        {// 简历详情
            path: '/resume-single/:resumeId',
            name: 'ResumeSingle',
            component: ResumeSingle
        },
        {// 新闻&公告列表
            path: '/news',
            name: 'News',
            component: News
        },
        {// 新闻&公告列详情
            path: '/news-single',
            name: 'NewsSingle',
            component: NewsSingle
        },
        {// 关于我们
            path: '/about-us',
            name: 'AboutUs',
            component: AboutUs
        },
        {// 联系我们
            path: '/contact-us',
            name: 'ContactUs',
            component: ContactUs
        },
        {// 编辑用户信息
            path: '/edit-user-info',
            name: 'EditUserInfo',
            component: EditUserInfo
        },
        {// 编辑公司信息
            path: '/edit-company-info',
            name: 'EditCompanyInfo',
            component: EditCompanyInfo
        },
        {// 用户-管理职位
            path: '/user-management-jobs',
            name: 'UserManagementJobs',
            component: UserManagementJobs
        },
        {// 用户-管理简历
            path: '/user-management-resume',
            name: 'UserManagementResume',
            component: UserManagementResume
        },
        {// 公司-管理职位
            path: '/company-management-jobs',
            name: 'CompanyManagementJobs',
            component: CompanyManagementJobs
        },
        {// 公司-管理简历
            path: '/company-management-resume',
            name: 'CompanyManagementResume',
            component: CompanyManagementResume
        },
    ]
})
