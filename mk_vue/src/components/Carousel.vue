<template>
    <div>
        <b-carousel
            id="carousel-1"
            v-model="slide"
            :interval="4000"
            controls
            indicators
            background="#ababab"
            img-width="1024"
            img-height="480"
            style="text-shadow: 1px 1px 2px #333;"
            @sliding-start="onSlideStart"
            @sliding-end="onSlideEnd"
        >
            <b-carousel-slide v-for="(img, i) of imgArray" :key="i">
                <template v-slot:img>
                    <img
                        class="d-block img-fluid w-100"
                        width="1024"
                        height="480"
                        :src="img"
                        style="height: 380px"
                        alt="image slot"
                    />
                </template>
            </b-carousel-slide>
        </b-carousel>
    </div>
</template>
<script>
export default {
    name: "carousel",
    data() {
        return {
            slide: 0,
            sliding: null,
            imgArray: [
                require("@/assets/images/banner01.jpg"),
                require("@/assets/images/banner02.jpg"),
                require("@/assets/images/banner03.jpg"),
                require("@/assets/images/banner04.jpg")
            ]
        };
    },
    methods: {
        onSlideStart(slide) {
            this.sliding = true;
        },
        onSlideEnd(slide) {
            this.sliding = false;
        }
    }
};
</script>
<style scoped></style>