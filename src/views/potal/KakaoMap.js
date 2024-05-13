// export function initializeMap() {
//     if (typeof kakao !== 'undefined') {
//         var container = document.getElementById('map');
//         var options = {
//             center: new kakao.maps.LatLng(37.497946, 126.570667),
//             level: 3
//         };
//         var map = new kakao.maps.Map(container, options);
//     } else {
//         console.error('Failed to load Kakao Maps API');
//     }
// }

// // Kakao 지도 API 로드
// (function loadKakaoMapScript() {
//     const script = document.createElement('script');
//     script.src = 'https://dapi.kakao.com/v2/maps/sdk.js?appkey=57e9df8ad65dc994e5c28c552418428b&libraries=services'; // 자신의 Kakao API 키를 넣어주세요
//     script.onload = initializeMap;
//     document.head.appendChild(script);
// })();
