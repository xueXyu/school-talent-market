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
                    useEasing: true,
                    useGrouping: true,
                    duration: 6,
                    separator: ',',
                    decimal: '.',
                    prefix: '',
                    suffix: '',
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
