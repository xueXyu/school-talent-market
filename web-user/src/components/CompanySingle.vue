<template>
    <div>
        <!--OffCanvas Overlay-->
        <div class="offcanvas-overlay"></div>

        <!-- Page Heading Section Start -->
        <div class="page-heading-section section bg-parallax" data-bg-image="static/images/bg/bg-1.jpg" data-overlay="50">
            <div class="container">
                <div class="page-heading-content text-center">
                    <h3 class="title">公司名</h3>
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="index.html">首页</a></li>
                        <li class="breadcrumb-item"><a href="company-list.html">公司列表</a></li>
                        <li class="breadcrumb-item active">公司名</li>
                    </ol>
                </div>
            </div>
        </div>
        <!-- Page Heading Section End -->

        <!-- Company List Start -->
        <div class="section section-padding">
            <div class="container">
                <div class="row mb-n5">

                    <div class="col-lg-8 col-12 mb-5 pr-lg-5">

                        <!-- Company Details Start -->
                        <div class="company-details">
                            <h5 class="mb-3">About Envato</h5>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam necessitatibus doloribus soluta ut? Laudantium unde, hic itaque voluptatem nemo ut error fugiat debitis praesentium? Expedita placeat vero quia dolore reprehenderit nostrum velit. Cupiditate qui sunt excepturi dolore nihil, incidunt doloremque, cum dignissimos ex voluptatibus sed sapiente officia obcaecati mollitia distinctio repellat ab molestiae explicabo sequi.</p>
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque, nesciunt? Velit placeat animi blanditiis eveniet cum doloribus voluptates illo dolore, in aliquid odio quidem quasi fugit quaerat architecto quas magnam autem quod totam deleniti! Veniam accusamus fugit perferendis ducimus enim expedita exercitationem natus porro ratione.</p>
                            <ul>
                                <li>Proven work experienceas a web designer</li>
                                <li>Demonstrable graphic design skills with a strong portfolio</li>
                                <li>Proficiency in HTML, CSS and JavaScript for rapid prototyping</li>
                                <li>Experience working in an Agile/Scrum development process</li>
                                <li>Proven work experienceas a web designer</li>
                                <li>Excellent visual design skills with sensitivity to user-system interaction</li>
                                <li>Ability to solve problems creatively and effectively</li>
                                <li>Proven work experienceas a web designer</li>
                                <li>Up-to-date with the latest Web trends, techniques and technologies</li>
                                <li>BS/MS in Human-Computer Interaction, Interaction Design or a Visual Arts subject</li>
                            </ul>
                            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id eos enim distinctio odit nulla repellat exercitationem, fugiat nihil itaque iste amet sapiente molestias voluptas nemo error expedita? Voluptates vitae animi inventore iusto ullam facere modi corporis possimus culpa nostrum maxime delectus tempore, expedita itaque quaerat? Consequuntur quo nostrum quisquam placeat?</p>
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo culpa facere perspiciatis consequatur iure repellendus molestias dolore dicta inventore unde, asperiores alias consectetur ipsum cum ea exercitationem voluptatem, veniam mollitia numquam sit et cupiditate, aperiam blanditiis iusto. Dicta officia dolores atque, delectus tempora numquam ducimus? Sunt perspiciatis omnis atque non debitis vero similique illum distinctio?</p>
                        </div>
                        <!-- Company Details Start -->

                        <!-- Job List Wrap Start -->
                        <div class="job-list-wrap mt-5">

                            <job-item></job-item>

                        </div>
                        <!-- Job List Wrap Start -->

                    </div>

                    <!-- Company Sidebar Wrap Start -->
                    <div class="col-lg-4 col-12 mb-5">
                        <div class="sidebar-wrap">
                            <!-- Sidebar (Company) Start -->
                            <div class="sidebar-widget">
                                <div class="inner">
                                    <div class="sidebar-company">
                                        <span class="company-logo"><img src="static/images/companies/company-1.png" alt="company-1"></span>
                                        <h6 class="title">公司名</h6>
                                        <ul>
                                            <li><strong>成立时间:</strong> 2006</li>
                                            <li><strong>公司规模:</strong> 50 - 100</li>
                                            <li><strong>空缺职位:</strong> 3</li>
                                            <li><strong>网站:</strong> <a href="">envato.com</a></li>
                                            <li><strong>地址:</strong> Melbourne, Australia</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <!-- Sidebar (Company) End -->
                        </div>
                    </div>
                    <!-- Company Sidebar Wrap End -->

                </div>
            </div>
        </div>
        <!-- Company List End -->
    </div>
</template>

<script>
    import JobItem from "./public/JobItem";

    export default {
        name: "CompanySingle",
        components:{
            'job-item': JobItem,
        }
    }
</script>

<style scoped>

</style>
