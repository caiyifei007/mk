<template>
    <b-container fluid class="px-0">
        <!-- 轮播图 -->
        <carousel></carousel>
        <b-container>
            <home-course></home-course>
        </b-container>
    </b-container>
</template>

<script>
import Carousel from "@/components/Carousel";
import HomeCourse from "@/components/HomeCourse";
export default {
    name: "home",
    components: {
        Carousel,
        HomeCourse
    }
};
</script>
<style scoped>
</style>