<template>
    <div>
        <!--OffCanvas Overlay-->
        <div class="offcanvas-overlay"></div>

        <!-- Page Heading Section Start -->
        <PageHeading :page-data="pageData"></PageHeading>
        <!-- Page Heading Section End -->

        <!-- Blog Section Start -->
        <div class="section section-padding">
            <div class="container">
                <div class="row mb-n5">

                    <div class="col-lg-8 col-12 mb-5 pr-lg-5">

                        <!-- Blog Wrapper Start -->
                        <div class="blog-wrap row">

                            <!-- Blog Single Start -->
                            <div class="col-12">
                                <div class="blog blog-single">
                                    <div class="media">
                                        <img src="../../static/images/blog/single-1.jpg" alt="">
                                    </div>
                                    <div class="content">
                                        <h6 class="title">The Top 5 Job Interview Questions For IT Professional</h6>
                                        <ul class="meta">
                                            <li>Posted on 25 Jan, 2019</li>
                                            <li><a href="#">3 Comments</a></li>
                                        </ul>
                                        <div class="desc">
                                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi enim corporis totam. Deserunt, aperiam. Neque quibusdam nihil sunt, soluta unde inventore odit ea consequatur voluptatem doloribus assumenda, nisi expedita ipsam eaque harum. Quam, ipsa? Nihil, harum, veniam dignissimos laudantium nobis libero a nostrum quis voluptatum beatae pariatur hic cum odio natus, tenetur officia similique incidunt!</p>
                                            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio totam ab reiciendis distinctio dicta deserunt? Culpa ex quam eligendi sapiente quo laboriosam velit pariatur obcaecati omnis soluta necessitatibus, fugiat minima?</p>
                                            <blockquote class="blockquote">
                                                <p class="mb-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas aspernatur nemo pariatur eius corrupti cupiditate rem molestias voluptatem explicabo eum.</p>
                                                <footer class="blockquote-footer"> <cite title="Source Title">Source Title</cite></footer>
                                            </blockquote>
                                            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium facilis molestiae qui quod rerum numquam, neque inventore non eius reiciendis, necessitatibus exercitationem, maxime natus dignissimos saepe veritatis id recusandae distinctio doloremque aliquam provident similique consequatur. A cupiditate tempore repellat sint.</p>
                                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore sint quaerat dolore, ipsa voluptates illo ullam sed numquam! Pariatur excepturi reiciendis sequi dolorum placeat quaerat at, nostrum iusto soluta corrupti.</p>
                                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet, omnis aliquam! Porro minima quasi repudiandae ad officia expedita quae? Aspernatur ipsam provident ullam architecto natus, accusantium asperiores earum totam quaerat odit eligendi? Sunt dolore saepe minima reiciendis nesciunt odio tempora repudiandae non veritatis esse officia maxime, voluptatum reprehenderit? Sint sapiente omnis dolore error ipsa quibusdam obcaecati nisi accusamus dolorum reiciendis a quos, maiores dignissimos nostrum aspernatur, pariatur quia amet. Praesentium nobis ullam quae accusantium recusandae.</p>
                                        </div>
                                        <div class="foot row justify-content-between align-items-start mb-n2">
                                            <div class="blog-share col-auto mb-2">
                                                <ul>
                                                    <li><strong>Share:</strong></li>
                                                    <li><a href="#"><i class="fa fa-qq"></i></a></li>
                                                    <li><a href="#"><i class="fa fa-wechat"></i></a></li>
                                                    <li><a href="#"><i class="fa fa-weibo"></i></a></li>
                                                    <li><a href="#"><i class="fa fa-facebook"></i></a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- Blog Single End -->


                        </div>
                        <!-- Blog Wrapper End -->

                    </div>

                    <!-- Blog Sidebar Wrap Start -->
                    <div class="col-lg-4 col-12 mb-5">
                        <div class="sidebar-wrap">

                            <!-- Sidebar (Recent Posts) Start -->
                            <div class="sidebar-widget">
                                <div class="inner">
                                    <h6 class="title">最近新闻&公告</h6>
                                    <ul class="sidebar-post">
                                        <li>
                                            <a href="blog-single.html" class="image"><img src="../../static/images/blog/sidebar-1.jpg" alt=""></a>
                                            <a href="blog-single.html" class="title">The Top 5 Job Interview Questions For IT Professional</a>
                                        </li>
                                        <li>
                                            <a href="blog-single.html" class="image"><img src="../../static/images/blog/sidebar-2.jpg" alt=""></a>
                                            <a href="blog-single.html" class="title">7 Careers To Consider If You Love Traveling</a>
                                        </li>
                                        <li>
                                            <a href="blog-single.html" class="image"><img src="../../static/images/blog/sidebar-3.jpg" alt=""></a>
                                            <a href="blog-single.html" class="title">When the Perfect Candidate Turns Out To Be an Imperfect Fit</a>
                                        </li>
                                        <li>
                                            <a href="blog-single.html" class="image"><img src="../../static/images/blog/sidebar-4.jpg" alt=""></a>
                                            <a href="blog-single.html" class="title">5 ways to keep calm and carry on during your job search</a>
                                        </li>
                                        <li>
                                            <a href="blog-single.html" class="image"><img src="../../static/images/blog/sidebar-5.jpg" alt=""></a>
                                            <a href="blog-single.html" class="title">Should I reapply for a job vacancy that was reposted?</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <!-- Sidebar (Recent Posts) End -->

                        </div>
                    </div>
                    <!-- Blog Sidebar Wrap End -->

                </div>

            </div>
        </div>
        <!-- Blog Section End -->
    </div>
</template>

<script>
    import PageHeading from "./public/PageHeading";
    import NewsItem from "./public/NewsItem";
    import Pagination from "./public/Pagination";

    export default {
        name: "NewsSingle",
        components: {
            PageHeading
        },
        data() {
            return {
                pageData: {
                    'name':'工作名称',
                    'navs':[
                        {'name':'Home','to':'Home','active':false},
                        {'name':'Jobs','to':'Jobs','active':false},
                        {'name':'工作名称','to':'','active':true},
                    ],
                }
            }
        },
    }
</script>

<style scoped>

</style>
