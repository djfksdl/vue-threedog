<template>
    <div>
        <ManagerHeader /> <!-- 매니저 헤더 컴포넌트 -->

        <div class="calendar-container">
            <FullCalendar ref="calendar" :options="calendarOptions" id="calendar" />
        </div>

        <ManagerFooter /> <!-- 매니저 푸터 컴포넌트 -->
        <!-- 일정 모달 -->
        <div v-if="selectedEvent" class="schedule-modal" @click.self="closeModal">
            <div class="schedule-modal-content">
                <h2>일정 변경<br><br>{{ selectedEvent.title }}</h2>
                <p>일시: {{ selectedEvent.start }}</p>
                <!-- 추가된 예약 정보 표시 -->
                <p>애견명: {{ selectedEvent.extendedProps.petName }}</p>
                <p>품종: {{ selectedEvent.extendedProps.breed }}</p>
                <p>미용컷: {{ selectedEvent.extendedProps.groomingStyle }}</p>
                <p>금액: {{ selectedEvent.extendedProps.price }}</p>
                <span class="schedule-edit" @click="editEvent">시간수정</span>
                <span class="schedule-delete" @click="deleteEvent">삭제</span>
                <span class="schedule-close" @click="closeModal">확인</span>
                
            </div>
        </div>
    </div>
</template>

<script>
import ManagerFooter from "@/components/ManagerFooter.vue";
import ManagerHeader from "@/components/ManagerHeader.vue";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import Swal from "sweetalert2";
import interactionPlugin from "@fullcalendar/interaction"; // 드래그 앤 드롭 플러그인 추가
import { mapMutations } from 'vuex'; // Vuex 변이 사용을 위해 mapMutations 추가
import "@/assets/css/manager/schedule.css"; // 추가적인 스타일링을 위한 CSS 파일
import axios from 'axios';

export default {
    name: "ScheduleView", // 컴포넌트 이름

    components: {
        ManagerFooter,
        ManagerHeader,
        FullCalendar
    },
    data() {
        return {
            showModal: false, // 모달 표시 여부
            selectedEvent: null, // 선택된 이벤트 정보
            reservations: [], // 예약 데이터를 저장할 배열
            calendarOptions: {
                plugins: [dayGridPlugin, interactionPlugin], // interactionPlugin 추가
                initialView: "dayGridMonth",
                headerToolbar: {
                    start: "prev,next today",
                    center: "title",
                    end: "dayGridMonth,dayGridWeek,dayGridDay"
                },
                editable: true, // 드래그 앤 드롭 및 크기 조정 활성화
                contentHeight: 800,
                locale: "ko",
                events: [],
                eventClick: this.handleEventClick,
                eventDrop: this.handleEventDrop, // 이벤트 드롭 핸들러 추가
                eventResize: this.handleEventResize // 이벤트 크기 조정 핸들러 추가
            }
        };
    },
    mounted() {
        const bNo = 1;
        this.fetchReserveList(bNo); // bNo를 이용하여 예약 리스트를 가져옴
    },
    methods: {
        ...mapMutations(['setSelectedSchedule']), // Vuex 변이 매핑

        //-------------------- 예약내역 가져오는 리스트   ----------------------------
        fetchReserveList(bNo) {
            axios({
                method: 'get',
                url: `${this.$store.state.apiBaseUrl}/api/jw/${bNo}`,
                headers: { "Content-Type": "application/json; charset=utf-8" },
                responseType: 'json'
            }).then(response => {
                // 요청이 성공적으로 완료된 경우의 처리
                console.log('불러와진다 우히히:', response.data.apiData); // 응답데이터 확인

                this.reservations = Array.isArray(response.data.apiData) ? response.data.apiData : [];
                this.updateCalendarEvents(); // 예약 데이터로 캘린더 이벤트 업데이트
            }).catch(error => {
                // 오류 처리
                console.error('Error fetching reservations:', error);
            });
        },

        updateCalendarEvents() {
            const events = this.reservations.map(reservation => ({
                title: `${reservation.dogName},  ${reservation.beauty}, ${reservation.kind},${reservation.expectedPrice}원`,
                start: reservation.rtDate,
                end: reservation.endDate,
                extendedProps: {
                    petName: reservation.dogName,
                    breed: reservation.kind,
                    groomingStyle: reservation.beauty,
                    price: reservation.expectedPrice,
                    rsNo: reservation.rsNo // rsNo 추가
                }
            }));
            console.log('변화된이벤트:', events); // 변환된 이벤트 데이터 확인

            // FullCalendar의 events 속성에 예약된 정보를 추가
            this.calendarOptions.events = events;
            console.log('할당된 이벤트:', this.calendarOptions.events); // 할당된 이벤트 확인

            // FullCalendar를 갱신하여 새로운 이벤트를 반영
            this.$refs.calendar.getApi().refetchEvents();

        },


        //-------------------- 드롭 이벤트  화면 ----------------------------

        //드롭 일정변경
        handleEventDrop(info) {
            console.log("handleEventDrop");

            // 드롭한 이벤트 정보를 저장하고 모달을 표시
            this.selectedEvent = info.event;
            this.showModal = true;

            // 선택된 이벤트의 예약 번호 가져오기
            const rsNo = info.event.extendedProps.rsNo;

            // 선택된 이벤트의 일자를 변경된 값으로 업데이트
            this.selectedEvent.setStart(info.event.start);
            this.selectedEvent.setEnd(info.event.end);

            // 서버에 변경된 예약 정보를 업데이트하는 API 호출
            this.updateEventOnServer(rsNo, info.event);
        },

        updateEventOnServer(rsNo, event) {
            console.log("updateEventOnServer");
            const start = event.start.toISOString().slice(0, 19).replace('T', ' '); // ISO 8601 형식을 MySQL 형식으로 변환
            // const end = event.end ? event.end.toISOString().slice(0, 19).replace('T', ' ') : null; // ISO 8601 형식을 MySQL 형식으로 변환

            // 서버에 변경된 일정 정보를 업데이트하는 API 호출
            axios({
                method: 'put',
                url: `${this.$store.state.apiBaseUrl}/api/jw/${rsNo}/date`,
                data: { rsNo: rsNo, rtDate: start }, // 데이터 전송
                // data: { rsNo: rsNo, rtDate: start, rtDateTime: end }, // 데이터 전송
                headers: { "Content-Type": "application/json; charset=utf-8" },
                responseType: 'json'
            }).then(response => {
                console.log(response.data.apiData); //수신데이타
                // 성공적으로 업데이트된 경우의 처리
                console.log('일정이 성공적으로 업데이트되었습니다.');
                Swal.fire('일정 업데이트', '일정이 성공적으로 업데이트되었습니다.', 'success');
            }).catch(error => {
                // 오류 처리
                console.error('Error updating event:', error);
                Swal.fire('일정 업데이트 실패', '일정을 업데이트하는 도중 오류가 발생했습니다.', 'error');
            });
        },

        //드롭 후 시간수정
        editEvent() {
            Swal.fire({
                title: '일정 수정',
                html: `
            <input id="editStart" class="swal2-input" type="datetime-local" placeholder="시작 시간" value="${this.formatDateTimeLocal(this.selectedEvent.start)}">
            <input id="editEnd" class="swal2-input" type="datetime-local" placeholder="종료 시간" value="${this.formatDateTimeLocal(this.selectedEvent.end)}">
            <input id="editTitle" class="swal2-input" placeholder="일정명" value="${this.selectedEvent.title}">
            `,
                focusConfirm: false,
                preConfirm: () => {
                    // console.log("시간수정");

                    const start = Swal.getPopup().querySelector('#editStart').value;
                    const end = Swal.getPopup().querySelector('#editEnd').value;
                    const title = Swal.getPopup().querySelector('#editTitle').value;
                    if (!title || !start) {
                        Swal.showValidationMessage('일정명과 시작 시간을 모두 입력해주세요.');
                    }
                    return { title, start, end };
                }
            }).then(result => {
                if (result.isConfirmed) {
                    const { start, end, title } = result.value;
                    // 수정된 일정 업데이트
                    this.selectedEvent.setStart(new Date(start)); // 시작 시간 업데이트
                    this.selectedEvent.setEnd(new Date(end)); // 종료 시간 업데이트
                    this.selectedEvent.setProp('title', title); // 제목 업데이트

                    // 서버에 변경된 예약 정보를 업데이트하는 API 호출
                    this.updateEventTimeOnServer(this.selectedEvent.extendedProps.rsNo, start, end);

                    // Swal.fire('수정 완료', '일정이 수정되었습니다.', 'success');
                }
            });
        },

        updateEventTimeOnServer(rsNo, start, end) {
            // ISO 8601 형식을 MySQL 시간 형식으로 변환하는 함수
            function convertToMySQLTime(isoTime) {
                const date = new Date(isoTime); // ISO 8601 형식의 시간을 Date 객체로 변환
                const hours = date.getHours().toString().padStart(2, '0'); // 시간
                const minutes = date.getMinutes().toString().padStart(2, '0'); // 분
                const seconds = date.getSeconds().toString().padStart(2, '0'); // 초
                return `${hours}:${minutes}:${seconds}`; // MySQL 시간 형식으로 변환하여 반환
            }

            // 예약 시작 시간을 MySQL 시간 형식으로 변환
            const startTime = convertToMySQLTime(start);
            // 예약 종료 시간이 있는 경우 MySQL 시간 형식으로 변환, 없는 경우 null로 설정
            const endTime = end ? convertToMySQLTime(end) : null;

            // 서버에 변경된 일정 정보를 업데이트하는 API 호출
            axios({
                method: 'put',
                url: `${this.$store.state.apiBaseUrl}/api/jw/${rsNo}/time`,
                data: { rsNo: rsNo, rtTime: startTime, rtEndTime: endTime }, // 데이터 전송
                headers: { "Content-Type": "application/json; charset=utf-8" },
                responseType: 'json'
            }).then(() => {
                //console.log(response.data.apiData); //수신데이타
                // 성공적으로 업데이트된 경우의 처리
                console.log('시간이 성공적으로 업데이트되었습니다.');
                Swal.fire('시간 업데이트', '시간이 성공적으로 업데이트되었습니다.', 'success');

            }).catch(error => {
                console.error('시간 업데이트 에러:', error); // 에러 처리
                Swal.fire('시간 업데이트 실패', '시간을 업데이트하는 도중 오류가 발생했습니다.', 'error');
            });
        },
        // 추가: 날짜 형식을 'YYYY-MM-DDTHH:mm' 형식으로 변환하는 헬퍼 함수
        // formatDateTimeLocal() 함수 내용 수정
        formatDateTimeLocal(date) {
            const d = new Date(Date.parse(date)); // 변경
            const pad = (n) => n < 10 ? '0' + n : n;
            return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
        },


        // deleteEvent() 함수 내용 수정
        //드롭 후 삭제
        deleteEvent() {
            Swal.fire({
                title: '일정 삭제',
                text: '정말로 이 일정을 삭제하시겠습니까?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: '삭제',
                cancelButtonText: '취소'
            }).then(result => {
                if (result.isConfirmed) {
                    // 선택된 이벤트 삭제
                    this.selectedEvent.remove();

                    // 서버에 삭제 요청 보내기
                    this.deleteEventOnServer(this.selectedEvent.extendedProps.rsNo);

                    this.showModal = false;
                    Swal.fire('삭제 완료', '일정이 삭제되었습니다.', 'success');
                }
            });
        },

        deleteEventOnServer(rsNo) {
            axios({
                method: 'delete',
                url: `${this.$store.state.apiBaseUrl}/api/jw/${rsNo}/delete`,
                headers: { "Content-Type": "application/json; charset=utf-8" },
                responseType: 'json'
            }).then(response => {
                console.log(response.data.apiData); // 응답 데이터 확인
                // 성공적으로 삭제된 경우의 처리
                console.log('일정이 성공적으로 삭제되었습니다.');
            }).catch(error => {
                console.error('Error deleting event:', error);
                Swal.fire('일정 삭제 실패', '일정을 삭제하는 도중 오류가 발생했습니다.', 'error');
            });
        },



        //-------------------- 알림장 화면으로 이동  ----------------------------
        // 예약 일정 클릭 이벤트 처리
        handleEventClick(info) {
            Swal.fire({
                title: "일정",
                html: "스케줄: " + info.event.title + 
                      "<br/>일시: " + new Date(info.event.start).toLocaleString().substring(0, 20).replace("/g", ""),
            });

            // 선택된 예약 정보를 Vuex에 저장
            this.$store.commit("setSelectedSchedule", info.event);

            // 다이어리 화면으로 이동
            this.$router.push({ name: "diary" });
        },



        //확인
        closeModal() {
            this.selectedEvent = null;
            this.showModal = false;
        },


    }
};
</script>