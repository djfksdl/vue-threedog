<template>
    <div id="wrap">
        <ManagerHeader />
        <div id="portal-main-container" class="clearfix">
            <div class="diary-container">
                <!-- 왼쪽 박스: 미용 정보 표시 -->
                <div class="diary-left-box">
                    <h2>미용 정보</h2>
                    <br>
                    <div class="diary-info-leftitem" v-if="selectedSchedule">
                        <label class="diary-label" for="date">이용일: {{ formatDate(selectedSchedule.start) }}</label>
                    </div>
                    <div class="diary-info-leftitem" v-if="selectedSchedule">
                        <label class="diary-label" for="time">미용 시간: {{ formatTime(selectedSchedule.start) }}</label>
                    </div>
                    <div class="diary-info-leftitem" v-if="selectedSchedule">
                        <label class="diary-label">애견명: {{ selectedSchedule.extendedProps.petName }}</label>
                    </div>
                    <div class="diary-info-leftitem" v-if="selectedSchedule">
                        <label class="diary-label">품종: {{ selectedSchedule.extendedProps.breed }}</label>
                    </div>
                    <div class="diary-info-leftitem" v-if="selectedSchedule">
                        <label class="diary-label">미용컷: {{ selectedSchedule.extendedProps.groomingStyle }}</label>
                    </div>
                    <div class="diary-info-leftitem" v-if="selectedSchedule">
                        <label class="diary-label">금액: {{ selectedSchedule.extendedProps.price }}</label>
                    </div>

                    <div class="diary-info-leftitem2" v-if="selectedSchedule">
                        <label class="diary-label">추가요금:</label>
                        <table style="width: 100%;">
                            <tbody>
                                <tr v-for="(priceItem, index) in priceList2" :key="index">
                                    <th>{{ priceItem.beauty }}</th>
                                    <td :class="{ 'selected': priceItem.selected }"
                                        @click="toggleSelectedAdditionalFee(priceItem)">
                                        {{ priceItem.onePrice.toLocaleString() }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="diary-info-leftitem" v-if="selectedSchedule">
                        <label class="diary-label2">총 금액: {{ totalAmount }}</label>
                    </div>


                    <!-- <div v-if="selectedAdditionalFee">{{ toggleSelectedAdditionalFee }}</div> -->

                    <div>
                        <div class="diary-info-leftitem">
                            <label class="diary-label" for="grooming-photo">미용 사진:</label>
                            <div class="diary-image-container">
                                <!-- 파일 업로드 입력 -->
                                <input class="diary-input" type="file" id="grooming-photo" accept="image/*"
                                    @change="handleFileUploads($event)" multiple>

                                <!-- 업로드된 사진 미리보기 -->
                                <div v-for="(url, index) in photoUrls" :key="index" class="diary-image-preview">
                                    <img :src="url" alt="미용 사진">
                                    <button @click="removePhoto(index)">삭제</button>
                                </div>
                            </div>
                        </div>
                        <div class="diary-attached-photos">
                            <img v-for="(photo, index) in attachedPhotos" :src="photo" :key="index" alt="첨부된 사진">
                        </div>
                    </div>
                </div>
                <!-- 오른쪽 박스: 미용 기록 입력 -->
                <div class="diary-right-box">
                    <h2>미용 기록</h2>
                    <br>

                    <!-- 미용 기록 입력 폼 -->
                    <div class="diary-info-rightitem">
                        <label class="diary-label" for="grooming-etiquette">미용예절</label>
                        <input class="diary-input" type="text" id="grooming-etiquette" v-model="groomingEtiquette">
                    </div>
                    <div class="diary-info-rightitem">
                        <label class="diary-label" for="condition">컨디션</label>
                        <input class="diary-input" type="text" id="condition" v-model="condition">
                    </div>
                    <div class="diary-info-rightitem">
                        <label class="diary-label" for="matted-area">엉킴(부위)</label>
                        <input class="diary-input" type="text" id="matted-area" v-model="mattedArea">
                    </div>
                    <div class="diary-info-rightitem">
                        <label class="diary-label" for="disliked-area">싫어했던 부위</label>
                        <input class="diary-input" type="text" id="disliked-area" v-model="dislikedArea">
                    </div>
                    <div class="diary-info-rightitem">
                        <label class="diary-label" for="bath-dry">목욕/드라이</label>
                        <input class="diary-input" type="text" id="bath-dry" v-model="bathDry">
                    </div>
                    <div class="diary-info-rightitem">
                        <label class="diary-label" for="curruntWeight">몸무게</label>
                        <input class="diary-input" type="text" id="curruntWeight" v-model="curruntWeight">
                    </div>
                    <div class="diary-info-rightitem">
                        <label class="diary-label" for="note">전달사항</label>
                        <textarea class="diary-textarea" id="note" v-model="note"></textarea>
                    </div>
                    <button @click="saveNotification" class="diary-save-button">저장</button>
                </div>
            </div>
            <!-- 모달: 기록된 정보 확인 및 전송 -->
            <div class="diary-modal" v-if="showModal">
                <div class="diary-modal-content">
                    <span class="diary-close" @click="closeModal">&times;</span>
                    <div class="image-gallery">
                        <div class="gallery-images" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
                            <div v-for="(photo, index) in savedAttachedPhotos" :key="index" class="gallery-image">
                                <img :src="photo" alt="Attached Photo">
                            </div>
                        </div>
                    </div>
                    <table class="diary-table">
                        <tr>
                            <th>항목</th>
                            <th>내용</th>
                        </tr>
                        <tr>
                            <td>이용일</td>
                            <td>{{ savedDate }}</td>
                        </tr>
                        <tr>
                            <td>이용 시간</td>
                            <td>{{ savedTime }}</td>
                        </tr>
                        <tr>
                            <td>애견명</td>
                            <td>{{ savedPetName }}</td>
                        </tr>
                        <tr>
                            <td>미용예절</td>
                            <td>{{ savedGroomingEtiquette }}</td>
                        </tr>
                        <tr>
                            <td>컨디션</td>
                            <td>{{ savedCondition }}</td>
                        </tr>
                        <tr>
                            <td>엉킴(부위)</td>
                            <td>{{ savedMattedArea }}</td>
                        </tr>
                        <tr>
                            <td>싫어했던 부위</td>
                            <td>{{ savedDislikedArea }}</td>
                        </tr>
                        <tr>
                            <td>목욕/드라이</td>
                            <td>{{ savedBathDry }}</td>
                        </tr>
                        <tr>
                            <td>몸무게</td>
                            <td>{{ curruntWeight }}</td>
                        </tr>
                        <tr v-if="reserveVo.expectedPrice2 > 0">
                            <td>추가요금</td>
                            <td>{{ reserveVo.expectedPrice2 }}</td>
                        </tr>
                        <tr>
                            <td>전달사항</td>
                            <td>{{ savedNote }}</td>
                        </tr>
                    </table>
                    <div>
                        <button @click="closeModal" class="diary-edit-button">취소</button>
                        <button @click="sendNotification" class="diary-send-button">보내기</button>
                        <button @click="kakaosendNotification" class="diary-send-button">카카오톡 공유하기</button>
                    </div>
                </div>
            </div>
            <div v-if="showModal2" class="modal-wrapper">
                <div class="modal">
                    <div class="modal-header">
                        <h2>카카오톡 알림</h2>
                        <button @click="closeModal">&times;</button>
                    </div>
                    <div class="modal-body">
                        <p>알림이 발송되었습니다!</p>
                    </div>
                </div>
            </div>
        </div>
        <ManagerFooter />
    </div>
</template>

<script>
import ManagerFooter from "@/components/ManagerFooter.vue";
import ManagerHeader from "@/components/ManagerHeader.vue";
import "@/assets/css/manager/diary.css";
import { mapState } from 'vuex';
import Swal from 'sweetalert2';
import axios from 'axios';


export default {
    name: "DiaryView",
    components: {
        ManagerFooter,
        ManagerHeader,
    },
    data() {
        return {
            // rsNo 값을 저장할 변수
            rsNo: null,
            selectedEvent: null, // 선택된 이벤트 정보
            petName: "보리", // 애견 이름
            breed: "포메라니안", // 품종
            groomingStyle: "베이비컷", // 미용 스타일
            price: "", // 가격
            photoUrls: [], // 미용 사진 URL 목록
            groomingEtiquette: "", // 미용 예절
            condition: "", // 애견의 컨디션
            mattedArea: "", // 엉킨 부위
            dislikedArea: "", // 싫어했던 부위
            bathDry: "", // 목욕/드라이 정보
            curruntWeight: "",//몸무게currentWeight
            note: "", // 전달 사항
            showModal: false, // 모달 표시 여부
            showModal2: false,
            savedDate: "", // 저장된 이용일
            savedTime: "", // 저장된 이용 시간
            savedPetName: "", // 저장된 애견 이름
            savedGroomingEtiquette: "", // 저장된 미용 예절
            savedCondition: "", // 저장된 컨디션
            savedMattedArea: "", // 저장된 엉킨 부위
            savedDislikedArea: "", // 저장된 싫어했던 부위
            savedBathDry: "", // 저장된 목욕/드라이 정보
            savedcurruntWeight: 0, // 몸무게
            additionalFee: 0,// 추가 요금 초기화
            //selectedAdditionalFee: 0, // 선택된 추가 요금
            savedAdditionalFee: [], // 저장된 추가 요금
            savedNote: "", // 저장된 전달 사항
            attachedPhotos: [], // 첨부된 사진 파일들
            savedAttachedPhotos: [], // 저장된 첨부 사진 URL들
            images: [], // 이미지 리스트
            currentIndex: 0, // 현재 이미지 인덱스
            reserveVo: {
                rsNo: null, // 예약 번호
                expectedPrice2: 0, // 예상 가격 초기화
                priceNo2: [],
                beauty2: []
            },
            priceList2: [], // 추가 요금 리스트 초기화
            priceVo: {
                bNo: null,
                expectedPrice2: 0,
                priceNo2: [],
                beauty2: [],
            },
        };
    },

    mounted() {
        const rsNo = this.$store.state.selectedSchedule ? this.$store.state.selectedSchedule.extendedProps.rsNo : null;
        const bNo = this.$store.state.selectedSchedule ? this.$store.state.selectedSchedule.extendedProps.bNo : null;

        if (rsNo && bNo) {
            this.rsNo = rsNo;
            this.priceVo.bNo = bNo;
            this.selectGroomingRecord({ rsNo, bNo });
            this.getPlusPrice();
            this.date = this.$store.state.selectedSchedule.start;
        } else {
            console.log("rsNo 값이나 bNo 값이 null입니다.");
        }

    },

    methods: {

        //-------------------- 알림장 화면----------------------------
        // 특정 예약의 미용 기록 조회
        selectGroomingRecord({ rsNo, bNo }) {
            axios({
                method: 'get',
                url: `${this.$store.state.apiBaseUrl}/api/jw/${rsNo}/groomingrecord`,
                headers: { "Content-Type": "application/json; charset=utf-8" },
                responseType: 'json'
            }).then(response => {
                console.log('응답 데이터:', response.data.apiData); // 응답 데이터 확인
                const groomingRecord = response.data.apiData;

                // 미용 기록이 없는 경우에 대한 처리
                if (!groomingRecord) {
                    console.warn('미용 기록을 찾을 수 없습니다.');
                    return;
                }

                // Vuex에 데이터 업데이트
                this.$store.commit("setGroomingRecord", groomingRecord);

                // groomingRecord에서 bNo 값을 추출하여 설정하거나, 전달된 bNo 값을 사용
                this.priceVo.bNo = groomingRecord.bNo || bNo;
                console.log('설정된 bNo 값:', this.priceVo.bNo);

                // 추가요금 가져오기 호출
                this.getPlusPrice();

            }).catch(error => {
                console.error('미용 기록 조회 중 오류 발생:', error);
            });


        },

        //-------------------- 금액금액----------------------------

        // 추가요금가져오기
        getPlusPrice() {

            console.log("bNo 값 확인:", this.priceVo.bNo); // bNo 값을 콘솔에 출력

            console.log("가격표-추가요금 가져오기");
            axios({
                method: 'get',
                url: `${this.$store.state.apiBaseUrl}/api/mypage/getplusprice`,
                headers: { "Content-Type": "application/json; charset=utf-8" },
                params: { bNo: this.priceVo.bNo },
                responseType: 'json'
            }).then(response => {
                if (response.data.apiData && response.data.apiData.length > 0) {
                    console.log("가격표-추가요금 가져오기 성공");
                    console.log(response.data.apiData);
                    this.priceList2 = response.data.apiData;
                } else {
                    console.log("추가 요금 데이터가 비어 있습니다.");
                }
            }).catch(error => {
                console.log("추가 요금 데이터를 가져오는 중 오류 발생:", error);
            });

        },



        // 추가요금가격표
        toggleSelectedAdditionalFee(priceList2) {
            // 선택 상태를 토글합니다.
            priceList2.selected = !priceList2.selected;

            if (priceList2.selected) {
                console.log('선택한 값 :', priceList2.onePrice);
                this.reserveVo.expectedPrice2 = parseFloat(this.reserveVo.expectedPrice2) + parseFloat(priceList2.onePrice); // 선택한 값의 누적을 수행합니다.
                this.priceVo.priceNo2.push(priceList2.priceNo);
                this.priceVo.beauty2.push(priceList2.beauty);

                // 가격표 No 출력 및 추가
                console.log("priceNo:", priceList2.priceNo);
                this.priceVo.priceNo2.push(priceList2.priceNo); // priceNo2 배열에 추가합니다.

                // 선택한 td의 가로의 th 값을 가져옵니다.
                const thValue = priceList2.beauty;
                console.log('선택한 td의 가로의 th 값:', thValue);
                this.priceVo.beauty2.push(thValue);
                console.log(this.priceVo.beauty2);

            } else {
                console.log('선택 취소한 값 :', priceList2.onePrice);
                this.reserveVo.expectedPrice2 = parseFloat(this.reserveVo.expectedPrice2) - parseFloat(priceList2.onePrice); // 선택 취소한 값을 차감합니다.

                // 선택 취소한 th 값을 beauty2 배열에서 제거합니다.
                const thIndex = this.priceVo.beauty2.indexOf(priceList2.beauty);
                if (thIndex > -1) {
                    this.priceVo.beauty2.splice(thIndex, 1);
                }

                // 선택 취소한 priceNo 값을 priceNo2 배열에서 제거합니다.
                const priceNoIndex = this.priceVo.priceNo2.indexOf(priceList2.priceNo);
                if (priceNoIndex > -1) {
                    this.priceVo.priceNo2.splice(priceNoIndex, 1);
                }
            }

            this.additionalFee = this.reserveVo.expectedPrice2;

            // 콘솔에 현재 예상 가격 출력
            console.log('현재 예상 가격 :', this.reserveVo.expectedPrice2);

            // 콘솔에 현재 priceNo2 배열 출력
            console.log('현재 priceNo 배열 :', this.priceVo.priceNo2);
        },



        //-------------------- 사진사진----------------------------

        // 사진 업로드를 처리하는 컨트롤러 메서드
        handleFileUploads(event) {
            const files = event.target.files;
            if (!files || files.length === 0) {
                console.error('선택된 파일이 없습니다.');
                return;
            }

            // 로그 위치 변경: FormData 생성 전에 확인
            console.log('업로드할 데이터:', files); // files 확인

            const formData = new FormData();

            // 추가 필드들을 FormData에 추가
            formData.append('rsNo', this.rsNo);
            formData.append('petName', this.petName);
            formData.append('groomingStyle', this.groomingStyle);

            for (let i = 0; i < files.length; i++) {
                formData.append('file', files[i]);

                // 미리보기 URL을 생성하여 photoUrls 배열에 추가
                const url = URL.createObjectURL(files[i]);
                this.photoUrls.push(url);

                // 업로드된 사진을 attachedPhotos 배열에 추가
                this.attachedPhotos.push(files[i]);
            }

            if (!this.rsNo) {
                console.error('rsNo 값이 없습니다.');
                return;
            }
            // saveNotification 메서드 호출 시 formData를 전달합니다.
            this.saveNotification(formData);
        },
        // 사진 삭제 기능
        removePhoto(index) {
            this.photoUrls.splice(index, 1);
        },




        //-------------------- 모두 저장저장----------------------------
        // 업데이트 및 사진 db에 저장
        saveNotification() {

            console.log('초기 rsNo:', this.rsNo);

            if (!this.selectedSchedule) {
                console.error('selectedSchedule이 없습니다.');
                return;
            }
            if (this.selectedSchedule) {
                this.savedDate = this.formatDate(this.selectedSchedule.start);
                this.savedTime = this.formatTime(this.selectedSchedule.start);
                this.savedPetName = this.selectedSchedule.extendedProps.petName;
                this.reserveVo.rsNo = this.rsNo; // rsNo 값을 설정
                console.log('예약 번호 설정 후:', this.reserveVo.rsNo);
            }
            this.savedGroomingEtiquette = this.groomingEtiquette;
            this.savedCondition = this.condition;
            this.savedMattedArea = this.mattedArea;
            this.savedDislikedArea = this.dislikedArea;
            this.savedBathDry = this.bathDry;
            this.savedcurruntWeight = this.curruntWeight; // 몸무게 추가
            this.savedAdditionalFee = this.additionalFee; // 추가요금
            this.savedNote = this.note;
            this.savedAttachedPhotos = this.attachedPhotos.map(file => URL.createObjectURL(file));
            this.showModal = true;

            console.log("ssssssssssssssssssssssssssssssss");

            console.log(this.savedAdditionalFee);
            // console.log(this.savedMattedArea);
            // console.log(this.savedcurruntWeight);

            // FormData 생성
            const formData = new FormData();
            formData.append('rsNo', this.rsNo);
            formData.append('groomingEtiquette', this.savedGroomingEtiquette);
            formData.append('condition', this.savedCondition);
            formData.append('mattedArea', this.savedMattedArea);
            formData.append('dislikedArea', this.savedDislikedArea);
            formData.append('bathDry', this.savedBathDry);
            formData.append('curruntWeight', this.savedcurruntWeight); // 몸무게 추가
            formData.append('note', this.savedNote);
            formData.append('additionalFee', this.additionalFee); // 추가 요금을 추가합니다

            // basePrice + additionalFee

            // 이미지 파일 추가
            this.attachedPhotos.forEach(photo => {
                formData.append('file', photo);
            });



            // 폼데이터 화면에 찍는 방법
            function logFormData(formData) {
                for (let [key, value] of formData.entries()) {
                    console.log(`${key}:`, value);
                }
            }
            // FormData 내용을 콘솔에 출력
            logFormData(formData);

            // 미용 기록 업데이트 요청과 이미지 업로드 요청을 Promise.all로 동시에 실행
            Promise.all([
                this.updateGroomingRecord(this.rsNo, formData),
                this.uploadImages(this.rsNo)
            ]).then(([formData]) => {

                // 여기서 각각의 응답을 처리합니다.
                console.log('FormData 확인:', formData);
                // console.log('업데이트:', groomingRecordResponse);
                // console.log('이미지 업로드:', imageUploadResponse);

                // 두 요청 모두 성공했을 때 알림 표시
                Swal.fire({
                    title: '저장되었습니다!',
                    icon: 'success',
                    confirmButtonText: '확인'
                }).then(() => {

                });
            }).catch(errors => {
                // 하나 이상의 요청이 실패했을 때 에러 처리
                console.error('에러에러에러ㅔㅇ러:', errors);
            });
        },


        // 미용 기록 업데이트
        updateGroomingRecord(rsNo, formData) {
            axios({
                method: 'put',
                url: `${this.$store.state.apiBaseUrl}/api/jw/${rsNo}/updategroomingrecord`,
                headers: { "Content-Type": "application/json; charset=utf-8" },
                data: formData,
                responseType: 'json'
            }).then(response => {
                console.log("미용 기록 업데이트");
                console.log(response.data.apiData);
                // 여기서 미용 기록을 업데이트한 후의 작업을 수행합니다.

            }).catch(error => {
                console.log(error);
            });
        },


        // 이미지 업로드 관련 
        uploadImages(rsNo) {
            const formData = new FormData();
            this.attachedPhotos.forEach(photo => {
                formData.append('file', photo);
            });
            // FormData에 추가된 이미지 데이터 전송
            axios({
                method: 'post',
                url: `${this.$store.state.apiBaseUrl}/api/jw/${rsNo}/uploadimage`,
                headers: { "Content-Type": "multipart/form-data" },
                data: formData,
                responseType: 'json'
            }).then(response => {
                console.log("이미지 업로드 완료");
                console.log(response.data.apiData);
                // 이미지를 업로드한 후의 작업을 수행합니다.

                // 업로드된 이미지 URL을 받아와서 저장합니다.
                // const uploadedImageUrl = response.data.apiData;

                // 업로드된 이미지의 URL을 savedAttachedPhotos 배열에 추가합니다.
                // this.savedAttachedPhotos.push(uploadedImageUrl);

            }).catch(error => {
                console.log(error);
            });
        },





        // 총 금액 계산
        calculateTotalAmount() {
            const basePrice = parseFloat(this.selectedSchedule?.extendedProps?.price) || 0;
            const additionalFee = parseFloat(this.reserveVo.expectedPrice2) || 0; // 추가 요금 합산
            return basePrice + additionalFee; // 기본 금액과 추가 요금을 합산하여 총 금액을 반환합니다.
        },

        // 모달 닫기
        closeModal() {
            this.showModal = false;
        },

        //-------------------- 모두 완료되었을때----------------------------
        // 보내기 누르면 푸쉬완료
        sendNotification() {
            // 추가 요금 데이터 반영
            this.reserveVo.additionalFee = this.additionalFee;

            // 몸무게 데이터 반영
            this.reserveVo.curruntWeight = this.curruntWeight;

            // 이미지 업로드
            this.uploadImages(this.rsNo);

            // 미용 기록 업데이트
            //this.updateGroomingRecord(this.rsNo, this.formData);

            // 푸시 알림 보내기
            this.sendPushNotification(this.rsNo);

            // 모든 데이터가 저장되었음을 알림
            Swal.fire({
                title: '전송되었습니다!',
                icon: 'success',
                confirmButtonText: '확인'
            }).then(() => {

                // 예약 스케줄 화면으로 이동하고 알림 표시 색상 변경
                this.$router.push({ name: 'schedule' });
                this.scheduleNotificationStatus = 'completed';
            });
        },

        // 푸시 알림 보내기
        sendPushNotification(rsNo) {
            const notificationData = {
                title: '미용 기록이 업데이트 되었습니다.',
                body: '애견의 미용 기록이 성공적으로 업데이트되었습니다.',
                icon: 'https://example.com/icon.png', // 알림 아이콘
                data: {
                    rsNo: rsNo // 업데이트된 미용 기록의 고유 번호
                }
            };

            // 서버로 푸시 알림 요청을 보냅니다.
            axios({
                method: 'post',
                url: `${this.$store.state.apiBaseUrl}/api/jw/${rsNo}/insertPushNotification`,
                headers: { "Content-Type": "application/json; charset=utf-8" },
                data: notificationData,
                responseType: 'json'
            }).then(response => {
                console.log("푸시 알림이 성공적으로 전송되었습니다.");
                console.log(response.data.apiData);
                // 푸시 알림 전송 후의 작업을 수행합니다.
            }).catch(error => {
                console.log("푸시 알림 전송 중 오류가 발생했습니다.");
                console.log(error);
            });
        },

        // 카카오톡 알림 전송
        kakaosendNotification() {
            Swal.fire({
                title: '카카오톡 공유하기',
                text: 'Notification sent via KakaoTalk!',
                icon: 'success',
                confirmButtonText: '확인'
            });
            this.showModal2 = false;
        }, openModal() {
            this.showModal2 = true;
            // 여기에서 알림을 발송하는 함수를 호출
        },
        // 날짜 포맷팅
        formatDate(date) {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(date).toLocaleDateString(undefined, options);
        },
        // 시간 포맷팅
        formatTime(date) {
            const options = { hour: '2-digit', minute: '2-digit' };
            return new Date(date).toLocaleTimeString(undefined, options);
        }
    },
    computed: {
        // Vuex 상태 매핑
        ...mapState(['selectedSchedule']),

        // 총 금액 계산
        totalAmount() {
            return this.calculateTotalAmount();
        },


    },
    watch: {
        // 선택된 일정이 변경될 때 처리
        selectedSchedule(newValue) {
            this.date = newValue;
        }
    },



};
</script>