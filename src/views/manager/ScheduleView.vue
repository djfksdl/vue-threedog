<template>
    <ManagerHeader /> <!-- 매니저 헤더 컴포넌트 -->
  
    <div class="calendar-container">
      <FullCalendar :options="calendarOptions" id="calendar" />
    </div>
  
    <ManagerFooter /> <!-- 매니저 푸터 컴포넌트 -->
  </template>
  
  <script>
  import ManagerFooter from "@/components/ManagerFooter.vue";
  import ManagerHeader from "@/components/ManagerHeader.vue";
  import "@/assets/css/manager/schedule.css"; // 추가적인 스타일링을 위한 CSS 파일
  import FullCalendar from "@fullcalendar/vue3";
  import dayGridPlugin from "@fullcalendar/daygrid";
  import Swal from "sweetalert2";
  
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
          plugins: [dayGridPlugin],
          initialView: "dayGridMonth",
          headerToolbar: {
            start: "prev,next today",
            center: "title",
            end: "dayGridMonth,dayGridWeek,dayGridDay"
          },
          contentHeight: 800,
          locale: "ko",
          events: [
            { title: "Meeting", start: new Date() },
            { title: "Meeting", start: "2024-05-10 08:00:00", end: "2024-05-12 01:00:00" },
            { title: "Meeting", start: "2024-05-22 18:00:00", end: "2024-05-23 01:00:00" }
          ],
          eventClick: function(info) {
            Swal.fire({
              title: "일정",
              html:
                "스케줄: " + info.event.title +
                "<br/>일시: " + new Date(info.event.start).toLocaleString().substring(0, 20).replace("/g", ""),
            });
          }
        }
      };
    },
  };
  </script>
  