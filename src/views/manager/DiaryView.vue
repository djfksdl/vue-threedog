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
                    <div class="diary-info-leftitem" v-if="selectedSchedule">
                        <label class="diary-label">추가요금: {{ selectedAdditionalFee?.price }}</label>
                        <div v-if="additionalFees">{{ additionalFees }}</div>
                        <table>
                            <tr v-for="(item, index) in additionalFees" :key="index" @click="selectAdditionalFee(item)">
                                <td>{{ item.name }}</td>
                                <td>{{ item.price }}</td>
                            </tr>
                        </table>
                    </div>
                    <div class="diary-info-leftitem" v-if="selectedSchedule">
                        <label class="diary-label">총 금액: {{ totalAmount }}</label>
                    </div>
                    <div v-if="selectedAdditionalFee">{{ selectedAdditionalFee }}</div>
                </div>
                <!-- 오른쪽 박스: 미용 기록 입력 -->
                <div class="diary-right-box">
                    <h2>미용 기록</h2>
                    <br>
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
                            <td>추가요금</td>
                            <td>{{ savedAdditionalFee?.price }}</td>
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
            selectedEvent: null, // 선택된 이벤트 정보
            petName: "보리", // 애견 이름
            breed: "포메라니안", // 품종
            groomingStyle: "베이비컷", // 미용 스타일
            price: "", // 가격
            additionalFees: null, // 추가 요금
            photoUrls: [], // 미용 사진 URL 목록
            groomingEtiquette: "", // 미용 예절
            condition: "", // 애견의 컨디션
            mattedArea: "", // 엉킨 부위
            dislikedArea: "", // 싫어했던 부위
            bathDry: "", // 목욕/드라이 정보
            note: "", // 전달 사항
            showModal: false, // 모달 표시 여부
            savedDate: "", // 저장된 이용일
            savedTime: "", // 저장된 이용 시간
            savedPetName: "", // 저장된 애견 이름
            savedGroomingEtiquette: "", // 저장된 미용 예절
            savedCondition: "", // 저장된 컨디션
            savedMattedArea: "", // 저장된 엉킨 부위
            savedDislikedArea: "", // 저장된 싫어했던 부위
            savedBathDry: "", // 저장된 목욕/드라이 정보
            selectedAdditionalFee: null, // 선택된 추가 요금
            savedNote: "", // 저장된 전달 사항
            attachedPhotos: [], // 첨부된 사진 파일들
            savedAttachedPhotos: [], // 저장된 첨부 사진 URL들
            images: [], // 이미지 리스트
            currentIndex: 0, // 현재 이미지 인덱스
            reserveVo: {
                rsNo: null // 예약 번호
            },
        };
    },
   
    methods: {


        // 미용 기록 업데이트
        updateGroomingRecord(rsNo, reserveVo) {
            axios({
                method: 'put',
                url: `${this.$store.state.apiBaseUrl}/api/jw/${rsNo}/grooming-record`,
                headers: { "Content-Type": "application/json; charset=utf-8" },
                data: reserveVo,
                responseType: 'json'
            }).then(response => {
                console.log('Response data:', response.data.apiData); // 응답 데이터 확인
                const data = response.data.apiData;

                // 성공적으로 업데이트된 미용 기록을 처리합니다.
                if (data) {
                    this.groomingEtiquette = data.groomingEtiquette;
                    this.condition = data.condition;
                    this.mattedArea = data.mattedArea;
                    this.dislikedArea = data.dislikedArea;
                    this.bathDry = data.bathDry;
                    this.note = data.note;
                    this.additionalFees = data.additionalFees;
                    this.photoUrls = data.photos || [];
                    this.selectedAdditionalFee = data.selectedAdditionalFee;
                }

                Swal.fire({
                    title: '업데이트되었습니다!',
                    icon: 'success',
                    confirmButtonText: '확인'
                }).then(() => {
                    this.$router.push({ name: 'schedule' });
                });
            }).catch(error => {
                console.error('Error updating grooming record:', error);
            });
        },
        // 사진 업로드
        uploadImage(rsNo, file) {
            const formData = new FormData();
            formData.append('file', file);
            axios({
                method: 'post',
                url: `${this.$store.state.apiBaseUrl}/api/jw/${rsNo}/upload-image`,
                headers: { "Content-Type": "multipart/form-data" },
                responseType: 'json'
            }).then(response => {
                console.log('Response data:', response.data.apiData);
                const newPhotoUrl = response.data.apiData.url;

                // 업로드된 사진 URL을 추가합니다.
                if (newPhotoUrl) {
                    this.photoUrls.push(newPhotoUrl);
                }

                Swal.fire({
                    title: '이미지 업로드 완료!',
                    icon: 'success',
                    confirmButtonText: '확인'
                });
            }).catch(error => {
                console.error('Error uploading image:', error);
            });
        },

        // 추가요금 선택
        selectAdditionalFee(item) {
            this.selectedAdditionalFee = item;
        },
        // 총 금액 계산
        calculateTotalAmount() {
            const basePrice = parseFloat(this.selectedSchedule.extendedProps.price) || 0;
            const additionalFee = parseFloat(this.selectedAdditionalFee?.price) || 0;
            return basePrice + additionalFee;
        },
        // 파일 업로드 처리
        handleFileUploads(event) {
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
        // 사진 삭제 기능
        removePhoto(index) {
            this.photoUrls.splice(index, 1);
            this.attachedPhotos.splice(index, 1);
        },
        // 알림 저장
        saveNotification() {
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
            this.savedAdditionalFee = this.selectedAdditionalFee;
            this.savedNote = this.note;
            this.savedAttachedPhotos = this.attachedPhotos.map(file => URL.createObjectURL(file));
            this.showModal = true;
        },
        // 모달 닫기
        closeModal() {
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
                    console.log(response.data.apiData);
                })
                .catch(error => {
                    console.log(error);
                });

            this.showModal = false;

            Swal.fire({
                title: '전송되었습니다!',
                icon: 'success',
                confirmButtonText: '확인'
            }).then(() => {
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
        }
    },
    watch: {
        // 선택된 일정이 변경될 때 처리
        selectedSchedule(newValue) {
            this.date = newValue;
        }
    },
    mounted() {
        // 다이어리 화면으로 이동할 때 선택된 일정 데이터를 가져옴
        this.selectedEvent = this.$route.params.event;
    },
};
</script>