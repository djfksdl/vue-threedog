<template>
    <!-- 렌더링될 HTML 템플릿 -->
    <div id="wrap">
        <!-- 매니저 헤더 -->
        <ManagerHeader />
        <div id="portal-main-container" class="clearfix">
            <!-- 미용 정보 -->
            <div class="diary-container">
                <!-- 왼쪽 박스: 미용일 및 미용펫 정보 -->
                <div class="diary-left-box">
                    <!-- 미용 정보 제목 -->
                    <h2>미용 정보</h2>
                    <br>
                    <!-- 미용일 및 애견명 표시 -->
                    <!-- 날짜 형식을 변경하고, selectedSchedule이 있는지 확인 -->
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
                        <label class="diary-label">미용컷:{{ selectedSchedule.extendedProps.groomingStyle }}</label>
                    </div>
                    <div class="diary-info-leftitem" v-if="selectedSchedule">
                        <label class="diary-label">금액:{{ selectedSchedule.extendedProps.price }}</label>
                    </div>
                    <div class="diary-info-leftitem" v-if="selectedSchedule">
                        <label class="diary-label">추가요금: {{ selectedSchedule.additionalFee }}</label>
                    </div>
                    <div class="diary-info-leftitem" v-if="selectedSchedule">
                        <label class="diary-label">총 금액: {{ totalAmount }}</label>
                    </div>
                </div>
                <!-- 오른쪽 박스: 입력 폼 -->
                <div class="diary-right-box">
                    <!-- 미용 기록 제목 -->
                    <h2>미용 기록</h2>
                    <br>
                    <div>
                        <!-- 미용 사진 선택 -->
                        <div class="diary-info-leftitem">
                            <label class="diary-label" for="grooming-photo">미용 사진:</label>
                            <div class="diary-image-container">
                                <!-- 파일 업로드 입력 필드 -->
                                <input class="diary-input" type="file" id="grooming-photo" accept="image/*"
                                    @change="handleFileUploads($event)" multiple>
                                <!-- 업로드된 사진 미리보기 -->
                                <img v-for="(url, index) in photoUrls" :src="url" :key="index" alt="미용 사진">
                            </div>
                        </div>
                        <!-- 첨부된 사진들 표시 -->
                        <div class="diary-attached-photos">
                            <img v-for="(photo, index) in attachedPhotos" :src="photo" :key="index" alt="첨부된 사진">
                        </div>
                    </div>
                    <!-- 이미지 갤러리 -->
                    <div class="image-gallery">
                        <div class="gallery-images" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
                            <div v-for="(image, index) in images" :key="index" class="gallery-image">
                                <img :src="image" alt="Image">
                            </div>
                        </div>
                    </div>
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
                        <label class="diary-label" for="note">전달사항</label>
                        <textarea class="diary-textarea" id="note" v-model="note"></textarea>
                    </div>
                    <button @click="saveNotification" class="diary-save-button">저장</button>
                </div>
            </div>
            <!-- 모달 -->
            <div class="diary-modal" v-if="showModal">
                <!-- 모달 내용 -->
                <div class="diary-modal-content">
                    <!-- 모달 닫기 버튼 -->
                    <span class="diary-close" @click="closeModal">&times;</span>
                    <!-- 사진 갤러리 -->
                    <div class="image-gallery">
                        <div class="gallery-images" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
                            <div v-for="(photo, index) in savedAttachedPhotos" :key="index" class="gallery-image">
                                <img :src="photo" alt="Attached Photo">
                            </div>
                        </div>
                    </div>
                   <!-- 미용 기록 표 -->
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
                            <td>추가요금</td>
                            <td>{{ savedAdditionalFee }}</td>
                        </tr>
                        <tr>
                            <td>전달사항</td>
                            <td>{{ savedNote }}</td>
                        </tr>
                    </table>
                    <!-- 취소 및 보내기 버튼 -->
                    <div>
                        <button @click="closeModal" class="diary-edit-button">취소</button>
                        <button @click="sendNotification" class="diary-send-button">보내기</button>
                        <button @click="kakaosendNotification" class="diary-send-button">카카오톡 공유하기</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 매니저 푸터 -->
        <ManagerFooter />
    </div>
</template>

<script>
import ManagerFooter from "@/components/ManagerFooter.vue";
import ManagerHeader from "@/components/ManagerHeader.vue";
import "@/assets/css/manager/diary.css"
import { mapState } from 'vuex';
import Swal from 'sweetalert2'
import axios from 'axios';

export default {
    name: "DiaryView",
    components: {
        ManagerFooter,
        ManagerHeader,
    },
    data() {
        return {
            petName: "보리", // 애견 이름
            breed: "포메라니안", // 품종
            groomingStyle: "베이비컷", // 미용 스타일
            price: "", // 금액
            additionalFee: "", // 추가 요금
            photoUrls: [], // 업로드된 사진 URL 배열
            groomingEtiquette: "", // 미용 예절
            condition: "", // 컨디션
            mattedArea: "", // 엉킴 부위
            dislikedArea: "", // 싫어했던 부위
            bathDry: "", // 목욕/드라이
            note: "", // 전달 사항
            showModal: false, // 모달 표시 여부
            savedDate: "", // 저장된 이용일
            savedTime: "", // 저장된 이용 시간
            savedPetName: "", // 저장된 애견명
            savedGroomingEtiquette: "", // 저장된 미용 예절
            savedCondition: "", // 저장된 컨디션
            savedMattedArea: "", // 저장된 엉킴 부위
            savedDislikedArea: "", // 저장된 싫어했던 부위
            savedBathDry: "", // 저장된 목욕/드라이
            savedAdditionalFee: "", // 저장된 추가 요금
            savedNote: "", // 저장된 전달 사항
            attachedPhotos: [], // 첨부된 사진 배열
            savedAttachedPhotos: [], // 저장된 첨부 사진 배열
            images: [], // 이미지 배열
            currentIndex: 0, // 현재 이미지 인덱스
            reserveVo: {
                rsNo: null // 기본값은 null 또는 undefined로 설정
            },
        };
    },
    methods: {
        // 메서드 정의
        // 총 금액 계산
        calculateTotalAmount() {
            const priceValue = parseFloat(this.price) || 0;
            const additionalFeeValue = parseFloat(this.additionalFee) || 0;
            return priceValue + additionalFeeValue;
        },
        handleFileUploads(event) {
            // 파일 업로드 처리
            const files = event.target.files;
            for (let i = 0; i < files.length; i++) {
                const reader = new FileReader();
                reader.readAsDataURL(files[i]);
                reader.onload = () => {
                    this.photoUrls.push(reader.result);
                };
            }
            this.attachedPhotos = [...this.attachedPhotos, ...Array.from(files)];
        },
        saveNotification() {
            // 미용 기록 저장
            if (this.selectedSchedule) {
                this.savedDate = this.formatDate(this.selectedSchedule.start);
                this.savedTime = this.formatTime(this.selectedSchedule.start);
                this.savedPetName = this.selectedSchedule.extendedProps.petName;
            }
            this.savedGroomingEtiquette = this.groomingEtiquette;
            this.savedCondition = this.condition;
            this.savedMattedArea = this.mattedArea;
            this.savedDislikedArea = this.dislikedArea;
            this.savedBathDry = this.bathDry;
            this.savedAdditionalFee = this.additionalFee;
            this.savedNote = this.note;
            this.savedAttachedPhotos = this.attachedPhotos.map(file => URL.createObjectURL(file));
            this.showModal = true;
        },
        closeModal() {
            // 모달 닫기
            this.showModal = false;
        },
       // 알림 전송
       sendNotification() {
            axios({
                method: 'put',
                url: `${this.$store.state.apiBaseUrl}/api/jw/${this.reserveVo.rsNo}`,
                headers: { "Content-Type": "application/json; charset=utf-8" },
                data: this.reserveVo,
                responseType: 'json'
            })
                .then(response => {
                    alert("수정이 완료되었습니다.");
                    console.log(response.data.apidate);
                })
                .catch(error => {
                    console.log(error);
                });

            this.showModal = false;

             // 모달 알림 메시지 표시
             Swal.fire({
                title: '전송되었습니다!',
                icon: 'success',
                confirmButtonText: '확인'
            }).then(() => {
                // schedule 화면으로 이동
                this.$router.push({ name: 'schedule' });
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
            this.showModal = false;
        },
        // 날짜 형식 변경
        formatDate(date) {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(date).toLocaleDateString(undefined, options);
        },
        // 시간 형식 변경
        formatTime(date) {
            const options = { hour: '2-digit', minute: '2-digit' };
            return new Date(date).toLocaleTimeString(undefined, options);
        }
    },
    computed: {
        ...mapState(['selectedSchedule']),
        totalAmount() {
            return this.calculateTotalAmount();
        }
    },
    watch: {
        selectedSchedule(newValue) {
            // 스케줄에 있는 날짜를 이용일에 할당
            this.date = newValue;
        }
    }
};
</script>