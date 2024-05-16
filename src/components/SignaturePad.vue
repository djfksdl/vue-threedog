<template>
    <div>
        <canvas ref="signatureCanvas" v-on:mousedown="onBegin" v-on:mouseup="onEnd"></canvas>
    </div>
    <div class="sign0">
        <button @click.prevent="clearCanvas">지우기</button>
    </div>
</template>

<script>
import SignaturePad from 'signature_pad';

export default {
    data() {
        return {
            signaturePad: null
        };
    },
    mounted() {
        const canvas = this.$refs.signatureCanvas;
        this.signaturePad = new SignaturePad(canvas);
    },
    methods: {
        clearCanvas() {
            this.signaturePad.clear();
        },
        onBegin() {
            this.signaturePad.onBegin();
        },
        onEnd() {
            this.signaturePad.onEnd();
        }
    }
};
</script>

<style scoped>
canvas {
    border: 1px solid #a7a4a4;
    width: 620px;
    height: 250px;
    border-radius: 10px;
}

.sign0 {
    width: 620px;
    /* background-color: red; */
    text-align: end;
}

.sign0 button {
    border: 1px solid gray;
    border-radius: 5px;
    padding: 10px;
    cursor: pointer;
}
</style>
