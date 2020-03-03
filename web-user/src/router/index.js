import Vue from 'vue';
import Router from 'vue-router';

import Home from '../components/Home';
import JobList from '../components/JobList';
import JobSingle from '../components/JobSingle';
import Company from '../components/Company';
import CompanySingle from '../components/CompanySingle';
import CreateJob from '../components/CreateJob';
import CreateResume from '../components/CreateResume';
import News from '../components/News';
import NewsSingle from '../components/NewsSingle';
import AboutUs from '../components/AboutUs';
import ContactUs from '../components/ContactUs';
import ManagementJobs from '../components/ManagementJobs';
import ManagementResume from '../components/ManagementResume';

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
            path: '/job-single',
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
        {// 管理职位
            path: '/management-jobs',
            name: 'ManagementJobs',
            component: ManagementJobs
        },
        {// 管理简历
            path: '/management-resume',
            name: 'ManagementResume',
            component: ManagementResume
        },
    ]
})
