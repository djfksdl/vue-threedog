<template>
    <div>
        <ManagerHeader /> <!-- 매니저 헤더 컴포넌트 -->

        <div class="calendar-container">
            <FullCalendar :options="calendarOptions" id="calendar" />
        </div>

        <ManagerFooter /> <!-- 매니저 푸터 컴포넌트 -->
        <!-- 일정 모달 -->
        <div v-if="selectedEvent" class="schedule-modal" @click.self="closeModal">
            <div class="schedule-modal-content">
                <h2>일정 변경<br><br>{{ selectedEvent.title }}</h2>
                <p>일시: {{ selectedEvent.start }}</p>
                <span class="schedule-edit" @click="editEvent">시간수정</span>
                <span class="schedule-delete" @click="deleteEvent">삭제</span>
                <span class="schedule-close" @click="closeModal">확인</span>
                <!-- 여기에 더 많은 일정 정보 표시 -->
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
                events: [
                    { title: "보리, 전체 미용, 50,000원", start: "2024-05-10T09:00:00", end: "2024-05-10T12:00:00" },
                    { title: "예슬이, 말티푸, 전체 미용, 50,000원", start: "2024-05-14T14:00:00", end: "2024-05-13T11:00:00" },
                    { title: "마리, 전체 미용, 50,000원", start: "2024-05-15T15:00:00", end: "2024-05-15T17:00:00" }
                    // 예약된 스케줄에 따라 수정
                ],
                eventClick: this.handleEventClick,
                eventDrop: this.handleEventDrop, // 이벤트 드롭 핸들러 추가
                eventResize: this.handleEventResize // 이벤트 크기 조정 핸들러 추가
            }
        };
    },
    methods: {
        ...mapMutations(['setSelectedSchedule']), // Vuex 변이 매핑
        handleEventClick(info) {
            Swal.fire({
                title: "일정",
                html: "스케줄: " + info.event.title + "<br/>일시: " + new Date(info.event.start).toLocaleString().substring(0, 20).replace("/g", ""),
            });
            this.selectedEvent = info.event;
            this.showModal = true;
            // 선택된 스케줄 정보 저장
            this.$store.commit("setSelectedSchedule", info.event.title);
            // 다이어리 알림장 표시
            this.$router.push("/diary");
        },
        closeModal() {
            this.selectedEvent = null;
            this.showModal = false;
        },
        handleEventDrop(info) {
            // 드롭한 이벤트 정보를 저장하고 모달을 표시
            this.selectedEvent = info.event;
            this.showModal = true;
        },
        editEvent() {
            Swal.fire({
                title: '일정 수정',
                html: `
           
            <input id="editStart" class="swal2-input" placeholder="시작 시간" value="${this.selectedEvent.start}">
            <input id="editEnd" class="swal2-input" placeholder="종료 시간" value="${this.selectedEvent.end}">
            <input id="editTitle" class="swal2-input" placeholder="일정명" value="${this.selectedEvent.title}"
            >`,
                focusConfirm: false,
                preConfirm: () => {
                    
                    const start = Swal.getPopup().querySelector('#editStart').value;
                    const end = Swal.getPopup().querySelector('#editEnd').value;
                    const title = Swal.getPopup().querySelector('#editTitle').value;
                    if (!title || !start || !end) {
                        Swal.showValidationMessage('일정명과 시간을 모두 입력해주세요.');
                    }
                    return { title, start, end };
                }
            }).then(result => {
                if (result.isConfirmed) {
                    const {  start, end, title} = result.value;
                    // 수정된 일정 업데이트
                   
                    this.selectedEvent.setStart(start);
                    this.selectedEvent.setEnd(end);
                    this.selectedEvent.setProp('title', title);
                    Swal.fire('수정 완료', '일정이 수정되었습니다.', 'success');
                }
            });
        },

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
                    // this.selectedEvent = null;
                    this.showModal = false;
                    Swal.fire('삭제 완료', '일정이 삭제되었습니다.', 'success');
                }
            });
        },

    }
};
</script>
