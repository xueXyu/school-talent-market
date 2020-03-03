<template>
    <div>
        <!--OffCanvas Overlay-->
        <div class="offcanvas-overlay"></div>

        <!-- Page Heading Section Start -->
        <PageHeading :page-data="pageData"></PageHeading>
        <!-- Page Heading Section End -->

        <!-- Create Job Start -->
        <div class="section section-padding">
            <div class="container">
                <div class="row">
                    <div class="create-job-form col-lg-10 mx-auto">
                        <form action="#">
                            <div class="row mb-n3">
                                <div class="col-md-6 col-12 mb-3">
                                    <label for="jobTitle">Job Title</label>
                                    <input type="text" id="jobTitle" placeholder="e.g. web design">
                                </div>
                                <div class="col-md-6 col-12 mb-3">
                                    <label for="applicationDeadline">Application Deadline</label>
                                    <input type="text" id="applicationDeadline" placeholder="12/24/2019">
                                </div>
                                <div class="col-md-6 col-12 mb-3">
                                    <label for="jobType">Job Type</label>
                                    <select id="jobType">
                                        <option value="type1">Full Time</option>
                                        <option value="type2">Part Time</option>
                                        <option value="type3">Freelance</option>
                                    </select>
                                </div>
                                <div class="col-md-6 col-12 mb-3">
                                    <label for="jobCategory">Job Category</label>
                                    <select id="jobCategory">
                                        <option value="type1">Web Design</option>
                                        <option value="type2">Ui Ux Design</option>
                                        <option value="type3">WordPress Developer</option>
                                        <option value="type4">React Developer</option>
                                    </select>
                                </div>
                                <div class="col-md-6 col-12 mb-3">
                                    <label for="salaryRange">Salary Range</label>
                                    <input type="text" id="salaryRange" placeholder="5k-8k">
                                </div>
                                <div class="col-md-6 col-12 mb-3">
                                    <label for="jobGender">Gender</label>
                                    <select id="jobGender">
                                        <option value="type1">Any</option>
                                        <option value="type2">Male</option>
                                        <option value="type3">Female</option>
                                    </select>
                                </div>
                                <div class="col-md-6 col-12 mb-3">
                                    <label for="jobExperience">Experience</label>
                                    <select id="jobExperience">
                                        <option value="type1">1 Year to 2 Year</option>
                                        <option value="type2">2 Year to 3 Year</option>
                                        <option value="type3">3 Year to 4 Year</option>
                                        <option value="type4">4 Year to 5 Year</option>
                                    </select>
                                </div>
                                <div class="col-md-6 col-12 mb-3">
                                    <label for="jobEducation">Education</label>
                                    <select id="jobEducation">
                                        <option>Postdoc</option>
                                        <option>Ph.D.</option>
                                        <option>Master</option>
                                        <option>Bachelor</option>
                                    </select>
                                </div>
                                <div class="col-12 mb-3">
                                    <label for="jobDescription">Description</label>
                                    <textarea id="jobDescription" rows="5"></textarea>
                                </div>
                                <div class="col-12 mb-3">
                                    <button type="submit" class="btn btn-primary px-5">Post Job</button>
                                </div>
                            </div>
                            <div class="row"></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <!-- Create Job End -->
    </div>
</template>

<script>
    import PageHeading from "./public/PageHeading";

    export default {
        name: "CreateJob",
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
