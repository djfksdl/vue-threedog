<template>
    <v-data-table
        :headers="headers" 
        :items="items"
        :items-per-page="itemsPerPage"
        hide-default-footer
        class="elevation-1">
    </v-data-table>
  
</template>

<script>
import axios from 'axios';
export default {
    name: "PriceTable",
    components: {},
    data() {
    return {
      page: 1,
      pageCount: 0,
      itemsPerPage: 10, //한 페이지에서 보여줄 list의 갯수
      headers: [
        { text: '회사명', align: 'center', sortable: false, value: 'corpName' },
        { text: '회사코드', align: 'center', sortable: false, value: 'corpCode' },
        { text: '종목코드', align: 'center', sortable: false, value: 'stockCode' },
        { text: '수정일자', align: 'center', sortable: false, value: 'modifyDate' },
      ],
      items: [],
    };
  },  
    methods: {
        getPrice(){
            // console.log("값 가져오기");
            axios({
                method: 'get', // put, post, delete 
                url: `${this.$store.state.apiBaseUrl}/api/su/firstprice`,
                headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
                // params: {uId: this.userVo.uId}, //get방식 파라미터로 값이 전달
                // data: this.userVo, //put, post, delete 방식 자동으로 JSON으로 변환 전달
                responseType: 'json' //수신타입
            }).then(response => {
                console.log(response.data.apiData); //수신데이타

                
            }).catch(error => {
                console.log(error);
            });
        }
    },
    created(){
        this.getPrice();
    }
};
</script>
<style></style>
