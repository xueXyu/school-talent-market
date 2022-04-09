<template>
    <div>
        <ICountUp
            :delay="delay"
            :endVal="endVal"
            :options="options"
            @ready="onCountUp"
        />
    </div>
</template>

<script>
    import ICountUp from 'vue-countup-v2';

    export default {
        name: "CountUp",
        components: {
            ICountUp
        },
        props: [
            "countupStart",
            "countupEnd",
        ],
        data() {
            return {
                delay: this.countupStart,
                endVal: this.countupEnd,
                options: {
                    useEasing: true, // 过渡动画效果，默认ture
                    useGrouping: true, //千分位效果，例：1000->1,000。默认true
                    duration: 6, 
                    separator: ',',  // 使用千分位时分割符号
                    decimal: '.', // 小数位分割符号
                    prefix: '',  // 前置符号
                    suffix: '',  // 后置符号，可汉字
                }
            };
        },
        methods: {
            onCountUp: function (instance, CountUp) {
                instance.update(this.endVal);
            },
        },
        beforeDestroy() {
        },
        mounted() {

        },
    }
</script>

<style scoped>

</style>
