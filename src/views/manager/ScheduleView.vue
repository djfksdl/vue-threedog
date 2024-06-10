<template>
    <div>
        <ManagerHeader /> <!-- 매니저 헤더 컴포넌트 -->
        <h2 class="schedule-title">예약 스케줄</h2>

        <div class="calendar-container">
            <!-- <h2 class="schedule-title">예약 스케줄</h2><br> -->
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
import { mapGetters, mapMutations } from 'vuex'; // Vuex 변이 사용을 위해 mapMutations 추가
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
            bNo: this.$store.state.auth.bNo,
            showModal: false, // 모달 표시 여부
            selectedEvent: null, // 선택된 이벤트 정보
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
            },
            availableTimes: [] // 예약 가능한 시간대 배열 추가
        };
    },
    computed: {
        ...mapGetters(['reservationData']), // Vuex의 reservationData를 계산된 속성으로 가져옴
        storeBNo() {
            return this.$store.state.auth.bNo; // Vuex 스토어에서 가게 번호를 가져옴
        }
    },
    mounted() {
        const bNo = this.storeBNo || 1; // Vuex 스토어에서 가게 번호를 가져와서 사용
        // const bNo = this.$route.params.bNo; // 라우트 파라미터에서 가게 번호를 받아옴, 없으면 기본값 1
        this.fetchReserveList(bNo); // bNo를 이용하여 예약 리스트를 가져옴
        this.$store.commit('setReservationData', this.reservations);
    },
    methods: {
        ...mapMutations(['setSelectedSchedule', 'setGroomingRecord']), // Vuex 변이 매핑

        //-------------------- 한 가게의 예약 리스트 정보 조회 ----------------------------

        fetchReserveList(bNo) {
            axios({
                method: 'get',
                url: `${this.$store.state.apiBaseUrl}/api/jw/${bNo}`,
                headers: { "Content-Type": "application/json; charset=utf-8" },
                responseType: 'json'
            }).then(response => {
                // 요청이 성공적으로 완료된 경우의 처리
                console.log('가게 번호로 불러온 예약 리스트:', response.data.apiData); // 응답데이터 확인
                this.reservations = Array.isArray(response.data.apiData) ? response.data.apiData : [];
                this.$store.commit('setReservationData', this.reservations); // 스토어에 데이터 업데이트
                this.updateCalendarEvents(bNo); // 예약 데이터로 캘린더 이벤트 업데이트
            }).catch(error => {
                // 오류 처리
                console.error('Error fetching reservations:', error);
            });
        },

        updateCalendarEvents(bNo) {
            const events = this.reservationData.map(reservation => {
                const dateParts = reservation.rtDate.split('-'); // rtDate를 연, 월, 일로 분리
                const timeParts = reservation.rtTime.split(':'); // rtTime을 시간과 분으로 분리

                // 연, 월, 일, 시간, 분을 각각 추출하여 Date 객체 생성
                const startTime = new Date(
                    parseInt(dateParts[0]),  // 연
                    parseInt(dateParts[1]) - 1, // 월 (0부터 시작하므로 1을 빼줌)
                    parseInt(dateParts[2]), // 일
                    parseInt(timeParts[0]), // 시간
                    parseInt(timeParts[1]) // 분
                );

                // 발송이 완료된 경우 해당 이벤트의 색상을 변경
                const backgroundColor = reservation.sent ? '#CCCCCC' : '#FFFFFF'; // 발송이 완료된 경우 회색 배경 색상

                return {
                    title: `${reservation.dogName}, ${reservation.beauty}, ${reservation.kind}, ${reservation.expectedPrice}원`,
                    start: startTime,
                    backgroundColor,
                    extendedProps: {
                        petName: reservation.dogName,
                        breed: reservation.kind,
                        groomingStyle: reservation.beauty,
                        price: reservation.expectedPrice,
                        rsNo: reservation.rsNo,
                        bNo: bNo // bNo 값을 설정
                    }
                };
            });

            this.calendarOptions.events = events;
            this.$refs.calendar.getApi().refetchEvents();
        },

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

            // 예약 가능한 시간대를 유지하도록 예약화면에 해당 시간대 추가
            this.addAvailableTime(info.event.start, info.event.end);
        },

        addAvailableTime(startTime, endTime) {
            // 예약 가능한 시간대 배열에서 해당 시간대를 제거하는 대신, 이를 유지하도록 새로운 배열을 생성합니다.
            const newAvailableTimes = [];

            this.availableTimes.forEach(time => {
                // 예약 내역의 시간대와 겹치는 경우에는 해당 시간대를 유지합니다.
                if (time.start.getTime() < startTime.getTime() || time.end.getTime() > endTime.getTime()) {
                    newAvailableTimes.push(time);
                }
            });
            this.availableTimes = newAvailableTimes;
        },


        //-------------------- 일자 수정 ----------------------------
        updateEventOnServer(rsNo, event) {
            console.log("updateEventOnServer");
            const start = event.start.toISOString().slice(0, 19).replace('T', ' '); // ISO 8601 형식을 MySQL 형식으로 변환

            // 예약 완료 상태일 때 rtfinish를 1로 설정하고, 예약 가능 상태일 때는 0으로 설정
            const rtfinish = event.rtfinish || 0; // 예약 완료 상태 확인
            //const rtfinish = event.isConfirmed ? 1 : 0;


            // 서버에 변경된 일정 정보를 업데이트하는 API 호출
            axios({
                method: 'put',
                url: `${this.$store.state.apiBaseUrl}/api/jw/${rsNo}/date`,
                data: { rsNo: rsNo, rtDate: start, rtfinish: rtfinish }, // 데이터 전송
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

        editEvent() {
            Swal.fire({
                title: '일정 수정',
                html: `
            <input id="editStart" class="swal2-input" type="datetime-local" placeholder="시작 시간" value="${this.formatDateTimeLocal(this.selectedEvent.start)}">
            <input id="editTitle" class="swal2-input" placeholder="일정명" value="${this.selectedEvent.title}">
        `,
                focusConfirm: false,
                preConfirm: () => {
                    const start = Swal.getPopup().querySelector('#editStart').value;
                    const title = Swal.getPopup().querySelector('#editTitle').value;

                    if (!title || !start) {
                        Swal.showValidationMessage('일정명과 시작 시간을 모두 입력해주세요.');
                    }

                    return { title, start };
                }
            }).then(result => {
                if (result.isConfirmed) {
                    const { start, title } = result.value;
                    //  this.selectedEvent.setStart(new Date(start));
                    this.selectedEvent.setProp('title', title);

                    // 서버에 변경된 예약 정보를 업데이트하는 API 호출
                    this.updateEventTimeOnServer(this.selectedEvent.extendedProps.rsNo, start);
                }
            });
        },


        //-------------------- 시간 수정 ----------------------------
        updateEventTimeOnServer(rsNo, start) {
            function convertToMySQLTime(isoTime) {
                const date = new Date(isoTime);
                const hours = date.getHours().toString().padStart(2, '0');
                const minutes = date.getMinutes().toString().padStart(2, '0');
                const seconds = date.getSeconds().toString().padStart(2, '0');
                return `${hours}:${minutes}:${seconds}`;
            }

            const startTime = convertToMySQLTime(start);

            // 예약 상태에 따라 rtfinish 값을 설정
            axios({
                method: 'put',
                url: `${this.$store.state.apiBaseUrl}/api/jw/${rsNo}/time`,
                data: { rsNo: rsNo, rtTime: startTime },
                headers: { "Content-Type": "application/json; charset=utf-8" },
                responseType: 'json'
            }).then(() => {
                console.log('시간이 성공적으로 업데이트되었습니다.');
                Swal.fire('시간 업데이트', '시간이 성공적으로 업데이트되었습니다.', 'success');
            }).catch(error => {
                console.error('시간 업데이트 에러:', error);
                Swal.fire('시간 업데이트 실패', '시간을 업데이트하는 도중 오류가 발생했습니다.', 'error');
            });
        },


        formatDateTimeLocal(date) {
            const d = new Date(Date.parse(date)); // 변경
            const year = d.getFullYear();
            const month = (d.getMonth() + 1).toString().padStart(2, '0');
            const day = d.getDate().toString().padStart(2, '0');
            const hours = d.getHours().toString().padStart(2, '0');
            const minutes = d.getMinutes().toString().padStart(2, '0');
            return `${year}-${month}-${day}T${hours}:${minutes}`;
        },


        //-------------------- 예약 정보 삭제 및 업데이트 ----------------------------

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
                    const rsNo = this.selectedEvent.extendedProps.rsNo;

                    if (!rsNo) {
                        console.error('rsNo가 정의되지 않았습니다.');
                        Swal.fire('삭제 실패', '일정을 삭제하는 도중 오류가 발생했습니다.', 'error');
                        return;
                    }

                    this.selectedEvent.remove();

                    // 서버에서 예약 정보를 삭제하는 API 호출
                    this.deleteEventOnServer(rsNo);

                    // 선택된 이벤트만 삭제하지 않고, 화면에서 사라지게 하는 대신 상태를 변경합니다.
                    // 삭제된 예약 시간을 사용 가능한 시간대로 추가합니다.
                    this.availableTimes.push({
                        start: this.selectedEvent.start,
                        end: this.selectedEvent.end
                    });

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
                console.log('일정이 성공적으로 삭제되었습니다.');
            }).catch(error => {
                console.error('Error deleting event:', error);
                Swal.fire('일정 삭제 실패', '일정을 삭제하는 도중 오류가 발생했습니다.', 'error');
            });
        },

        // ------------------알림장 보내보내----------------------------

        handleEventClick(info) {
            if (!info || !info.event) {
                console.error('클릭된 예약 정보가 없습니다.');

                return;
            }

            const event = info.event;
            if (!event.extendedProps || event.extendedProps.sent) {
                return; // 발송 완료된 이벤트는 클릭 불가
            }
            console.log('Event 정보:', event);

            const eventTitle = event.title || '';
            const eventStart = event.start ? new Date(event.start).toLocaleString().substring(0, 20).replace("/g", "") : '';

            Swal.fire({
                title: "일정",
                html: "스케줄: " + eventTitle + "<br/>일시: " + eventStart,
            });
            // const eventStart = event.start ? new Date(event.start) : '';

            // Swal.fire({
            //     title: "일정",
            //     html: "스케줄: " + eventTitle + "<br/>일시: " + eventStart,
            // });


            this.$store.commit("setSelectedSchedule", event);

            this.$router.push({ name: 'diary' }).then(() => {
                if (!event.extendedProps) {
                    console.error('event.extendedProps가 없습니다.');
                    return;
                }

                const rsNo = event.extendedProps.rsNo;
                const bNo = event.extendedProps.bNo;


                if (!rsNo) {
                    console.error('event.extendedProps.rsNo가 정의되지 않았습니다.');
                    return;
                }
                console.log('예약 번호 (rsNo):', rsNo);
                console.log('bNo 값:', bNo);



                // rsNo와 bNo 값을 함께 전달
                this.$root.$emit('selectGroomingRecord', { rsNo, bNo });
            });
        },
        // 예약 목록에서 발송이 완료된 일정을 식별하여 sent 속성을 true로 설정하는 메서드 추가
        updateReservationSentStatus(rsNo) {
            const reservation = this.reservations.find(res => res.rsNo === rsNo);
            if (reservation) {
                reservation.sent = true;
            }
        },


        closeModal() {
            this.selectedEvent = null;
            this.showModal = false;
        },



    }
};
</script>