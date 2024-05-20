<template>
    <div>
        <ManagerHeader /> <!-- 매니저 헤더 컴포넌트 -->

        <div class="calendar-container">
            <FullCalendar :options="calendarOptions" id="calendar" />
        </div>

        <ManagerFooter /> <!-- 매니저 푸터 컴포넌트 -->
    </div>
</template>

<script>
import ManagerFooter from "@/components/ManagerFooter.vue";
import ManagerHeader from "@/components/ManagerHeader.vue";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // 드래그 앤 드롭 플러그인 추가
import Swal from "sweetalert2";
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

            // 선택된 스케줄 정보 저장
            this.setSelectedSchedule(info.event.title);
            // 다이어리 알림장 표시
            this.$router.push("/diary");
        },
        handleEventDrop(info) {
            alert('이벤트가 ' + info.event.start.toISOString() + '로 이동되었습니다.');
            // 데이터베이스에서 이벤트 업데이트 등의 작업 수행
        },
        handleEventResize(info) {
            alert('이벤트가 ' + info.event.end.toISOString() + '로 끝나는 것으로 조정되었습니다.');
            // 데이터베이스에서 이벤트 업데이트 등의 작업 수행
        }
    }
};
</script>
