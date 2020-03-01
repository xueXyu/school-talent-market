# 数据库名称：school-talent-market

CREATE TABLE `admin` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`created_at` datetime DEFAULT NULL,
	`updated_at` datetime DEFAULT NULL,
	`deleted_at` datetime DEFAULT NULL,

	`admin_account` varchar(32) NOT NULL DEFAULT '0' COMMENT '管理员账号',
	`admin_password` varchar(64) NOT NULL DEFAULT '0' COMMENT '管理员密码',
	PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='管理员表';

CREATE TABLE `user` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`created_at` datetime DEFAULT NULL,
	`updated_at` datetime DEFAULT NULL,
	`deleted_at` datetime DEFAULT NULL,

	`user_account` varchar(32) NOT NULL DEFAULT '0' COMMENT '账号',
	`user_password` varchar(64) NOT NULL DEFAULT '0' COMMENT '密码',
	`user_name` varchar(32) DEFAULT '' COMMENT '姓名',
	`user_gender` char(5) DEFAULT '未知' COMMENT '性别 男 女',
	`user_age` tinyint(5) DEFAULT 0 COMMENT '年龄',
	`user_phone` varchar(32) DEFAULT '' COMMENT '电话',
	`user_img` varchar(255) DEFAULT '' COMMENT '头像',
	PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户表';

CREATE TABLE `user_resume` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`created_at` datetime DEFAULT NULL,
	`updated_at` datetime DEFAULT NULL,
	`deleted_at` datetime DEFAULT NULL,

	`user_id` int(11) NOT NULL COMMENT '用户表id',
	`resume_email` varchar(255) DEFAULT '' COMMENT '邮箱',
	`resume_education` varchar(64) DEFAULT '' COMMENT '学历 初中及以下 中专/中技 高中 大专 本科 硕士 博士',
	`resume_working_years` varchar(32) DEFAULT '' COMMENT '（几年）工作经验',
	`resume_job_intension` text COMMENT '求职意向',
	PRIMARY KEY (`id`),
	FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户简历表';

CREATE TABLE `company` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`created_at` datetime DEFAULT NULL,
	`updated_at` datetime DEFAULT NULL,
	`deleted_at` datetime DEFAULT NULL,

	`company_account` varchar(32) NOT NULL DEFAULT '0' COMMENT '公司账号',
	`company_password` varchar(64) NOT NULL DEFAULT '0' COMMENT '公司密码',
	`company_name` varchar(255) DEFAULT '' COMMENT '公司名称',
	`company_phone` varchar(32) DEFAULT '' COMMENT '联系电话',
	`company_contacts` varchar(32) DEFAULT '' COMMENT '联系人',
	`company_size` varchar(32) DEFAULT '' COMMENT '公司规模 0-20人 20-99人 100-499人 500-999人 1000-9999人 10000人以上',
	`company_address` varchar(255) DEFAULT '' COMMENT '公司地址',
	PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='公司表';

CREATE TABLE `company_job` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`created_at` datetime DEFAULT NULL,
	`updated_at` datetime DEFAULT NULL,
	`deleted_at` datetime DEFAULT NULL,

	`company_id` int(11) NOT NULL COMMENT '公司表id',
	`job_name` varchar(32) NOT NULL DEFAULT '0' COMMENT '职位名称',
	`job_salary` varchar(32) NOT NULL DEFAULT '0' COMMENT '薪资待遇',
	`job_gender` char(5) NOT NULL DEFAULT '无' COMMENT '职位要求性别 男 女',
	`job_way` char(5) NOT NULL DEFAULT '全职' COMMENT '工作性质 全职 兼职 实习',
	`job_description` text COMMENT '职责描述',
	PRIMARY KEY (`id`),
	FOREIGN KEY (`company_id`) REFERENCES `company` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='公司职位表';

CREATE TABLE `job_resume` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`created_at` datetime DEFAULT NULL,
	`updated_at` datetime DEFAULT NULL,
	`deleted_at` datetime DEFAULT NULL,

	`company_id` int(11) NOT NULL COMMENT '公司表id',
	`user_id` int(11) NOT NULL COMMENT '用户表id',
	`job_id` int(11) NOT NULL COMMENT '职位表id',
	`resume_id` int(11) NOT NULL COMMENT '简历表id',
	`status` tinyint(1) DEFAULT 0 COMMENT '简历状态 0 已投递 1 待面试/邀请面试 2 不合适',
	PRIMARY KEY (`id`),
	FOREIGN KEY (`company_id`) REFERENCES `company` (`id`) ON DELETE CASCADE,
	FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
	FOREIGN KEY (`job_id`) REFERENCES `company_job` (`id`) ON DELETE CASCADE,
	FOREIGN KEY (`resume_id`) REFERENCES `user_resume` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='公司职位与简历投递关联表';

CREATE TABLE `news` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`created_at` datetime DEFAULT NULL,
	`updated_at` datetime DEFAULT NULL,
	`deleted_at` datetime DEFAULT NULL,

	`title` varchar(255) NOT NULL DEFAULT 'title' COMMENT '新闻标题',
	`content` text COMMENT '新闻内容',
	PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='新闻表';
