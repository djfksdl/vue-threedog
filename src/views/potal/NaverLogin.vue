<template>
    <div>
      <div>
        <p>email: {{ email }}</p>
        <p>nickname: {{ nickname }}</p>
      </div>
      <button type="button" @click="logout">로그아웃</button>
    </div>
  </template>
  <script>
  import axios from "axios";
  import router from "@/router";
  
  // 네이버 개발자센터에서 어플리케이션 등록 시 발급된 값
  const clientId = "dc1j0BkcYhtjZfREkzlH";
  const clientSecret = "8CZ3Cbg23l";
  
  export default {
    data() {
      return {
        accessToken: "",
        email: "",
        nickname: "",
      };
    },
    mounted() {
      this.naverLogin = new window.naver_id_login(clientId);
      this.accessToken = this.naverLogin.oauthParams.access_token;
      this.userInfo();
    },
    methods: {
      // 사용자 프로필 조회
      async userInfo() {
        const url = `/v1/nid/me`;
        let header = "Bearer " + this.accessToken;
        const headers = { Authorization: header };
        const { data } = await axios.get(url, { headers });
        console.log("userInfo: ", data);
        this.email = data.response.email; // 이메일
        this.nickname = data.response.nickname; // 별명
      },
      
      // 로그인 연동 해제 샘플
      logout() {
        const url = `/oauth2.0/token?grant_type=delete&client_id=${clientId}&client_secret=${clientSecret}&access_token=${this.accessToken}&service_provider=NAVER`;
  
        axios.get(url).then((res) => {
          console.log(res.data);
          router.push({ path: "login" });
        });
      },
    },
  };
  </script>