<template>
    <div id="wrap">
        <ManagerHeader />
        <div class="container4">
            <!-- 달력 -->
            <div class="calendarContainer">
                <div class="calendar-container2">
                    <FullCalendar ref="calendar" :options="calendarOptions" id="calendar2" />
                </div>
            </div>
            
            <!-- 시간등록 -->
            <div class="timeContainer">
                <!-- 타이틀 -->
                <div class="timeTop">
                    <h1>영업시간 등록</h1>
                </div>

                <!-- 스케쥴 등록 -->
                <div class="insertScheduleContainer">
                    <!-- 날짜 선택 -->
                    <div class="selectWorkDate">
                        <div>
                            <input type="date" v-model="selectedStartDate" @input="updateCalendar"> ~
                            <input type="date" v-model="selectedEndDate" @input="updateCalendar">
                        </div>
                    </div>

                    <!-- 시간 선택 -->
                    <div class="selectWorkTimeContainer selectedTimeContainer">
                        <div class="selectWorkTimeWrapper">
                            <div class="leftColumn">
                                <div class="selectWorkTime" v-for="(day, index) in leftColumnDays" :key="index">
                                    <div :class="['selectWorkDay', { active: day.active }]">
                                        {{ day.label }}
                                    </div>
                                    <div>
                                        <input type="time" step="600" :disabled="!day.active"> ~
                                        <input type="time" step="600" :disabled="!day.active">
                                    </div>
                                </div>
                            </div>
                            <div class="rightColumn">
                                <div class="selectWorkTime" v-for="(day, index) in rightColumnDays" :key="index">
                                    <div :class="['selectWorkDay', { active: day.active }]">
                                        {{ day.label }}
                                    </div>
                                    <div>
                                        <input type="time" step="600" :disabled="!day.active"> ~
                                        <input type="time" step="600" :disabled="!day.active">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 등록,수정버튼 -->
                <button type="submit" class="insertBtn" v-on:click="insertRT">등록</button>
            </div>
        </div>
        <TopButton />  
        <ManagerFooter /> 
    </div><!-- wrap --> 
</template>

<script>
import '@/assets/css/manager/insertTime.css';
import ManagerFooter from "@/components/ManagerFooter.vue";
import ManagerHeader from "@/components/ManagerHeader.vue";
import TopButton from "@/components/TopButton.vue";
import FullCalendar from "@fullcalendar/vue3";
import interactionPlugin from "@fullcalendar/interaction"; // 상호작용 플러그인
import dayGridPlugin from "@fullcalendar/daygrid";
import "@/assets/css/manager/insertTime.css"; 
// import axios from 'axios';


export default {
    name: "InsertTime",
    components: {
        ManagerFooter,
        ManagerHeader,
        TopButton,
        FullCalendar
    },
    data() {
        return {
            // 달력관련
            calendarOptions: {
                plugins: [dayGridPlugin ,interactionPlugin], 
                initialView: "dayGridMonth",
                headerToolbar: {
                    start: "title",
                    center: "",
                    end: "prev,next today"
                },
                editable: true, // 드래그 앤 드롭 및 크기 조정 활성화
                contentHeight: 500,
                locale: "ko",
                firstDay: 1, //월요일을 시작일로 설정
                dateClick: this.handleDateClick, // 날짜 클릭 이벤트 핸들러 
                dateSet: this.handleDateSet //날짜 선택 이벤트 핸들러 
            },
            // holidays : [],// 공휴일 데이터를 저장할 배열

            //날짜,시간관련
            selectedStartDate: null, //선택된 시작 날짜
            selectedEndDate: null,//선택된 끝 날짜
            selectedDateElements: [], // 선택된 날짜 요소를 저장할 배열
            workDays: [
                { label: '월', active: false },
                { label: '화', active: false },
                { label: '수', active: false },
                { label: '목', active: false },
                { label: '금', active: false },
                { label: '토', active: false },
                { label: '일', active: false },
                { label: '점심', active: false },
                { label: '공휴일', active: false },
                { label: '주말점심', active: false }
            ],
            rtVo:{
                rtDates:[],
                rtTimes:[],
                bNo : this.$route.params.bNo,
            },
            
        };
    },
    computed: {
        // 왼쪽, 오른쪽에 해당 요일 배치
        leftColumnDays() {
            return this.workDays.slice(0, 6); // 월~금, 점심
        },
        rightColumnDays() {
            return this.workDays.slice(6); // 토, 일, 공휴일, 주말점심
        }
    },
    methods: {

        // ***** 기존 하이라이트 초기화 *****
        clearHighlightedDates() {
            this.selectedDateElements.forEach(element => {
                element.style.backgroundColor = ''; // 배경색 초기화
            });
            this.selectedDateElements = [];
        },

        // ***** 날짜 범위 하이라이트 *****
        highlightDateRange() {
            // 기존 선택된 날짜 초기화
            this.clearHighlightedDates();

            // 오늘 날짜 스타일 리셋 (선택된 범위에 오늘이 포함되지 않은 경우)
            const startDate = new Date(this.selectedStartDate);
            const endDate = this.selectedEndDate ? new Date(this.selectedEndDate) : startDate;
            const todayElement = document.querySelector('.fc-day-today');

            if (todayElement) {
                const todayStr = todayElement.getAttribute('data-date');
                if (todayStr < this.selectedStartDate || todayStr > this.selectedEndDate) {
                    todayElement.classList.add('fc-day-today-bold-only');
                    todayElement.classList.remove('fc-day-today');
                } else {
                    todayElement.classList.remove('fc-day-today-bold-only');
                    todayElement.classList.add('fc-day-today');
                }
            }

            for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
                const dateStr = d.toISOString().split('T')[0];
                const dateElement = document.querySelector(`[data-date="${dateStr}"]`);
                if (dateElement) {
                    dateElement.style.backgroundColor = '#f8a247'; // 원하는 배경색
                    this.selectedDateElements.push(dateElement);
                }
            }
        },

        // ***** 달력에 날짜 범위 표시 *****
        updateCalendar() {
            if (this.selectedStartDate) {
                this.highlightDateRange();
                this.activateWorkDays();
            }
        },

        // ***** 날짜에 해당하는 요일 활성화 *****
        activateWorkDays() {
            const startDate = new Date(this.selectedStartDate);
            const endDate = this.selectedEndDate ? new Date(this.selectedEndDate) : startDate;
            const daysBetween = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

            // 모든 요일을 비활성화
            this.workDays.forEach(day => {
                day.active = false;
            });

            // 선택된 날짜 범위의 요일들을 활성화
            for (let i = 0; i < daysBetween; i++) {
                const currentDay = new Date(startDate);
                currentDay.setDate(currentDay.getDate() + i);
                const dayIndex = currentDay.getDay(); // 0 (일요일) ~ 6 (토요일)

                if (dayIndex === 0) this.workDays[6].active = true; // 일요일
                else if (dayIndex === 6) this.workDays[5].active = true; // 토요일
                else this.workDays[dayIndex - 1].active = true; // 평일

                // 점심 및 주말 점심 활성화
                this.workDays[7].active = true; // 점심
                if (dayIndex === 0 || dayIndex === 6) this.workDays[9].active = true; // 주말 점심
            }
        },


        // ***** 공휴일 api불러오기 *****
        // async fetchHolidays() {
        //     try {
        //         const response = await axios.get('API_URL_HERE'); // 공휴일 데이터를 제공하는 API의 URL
        //         this.holidays = response.data; // API의 데이터 구조에 따라 수정
        //         // 공휴일 데이터를 events 배열에 추가
        //         this.holidays.forEach(holiday => {
        //             this.events.push({
        //                 title: holiday.name,
        //                 start: holiday.date,
        //                 allDay: true,
        //                 color: 'red' // 공휴일 이벤트의 색상을 빨간색으로 설정
        //             });
        //         });
        //         this.$refs.calendar.getApi().addEventSource(this.events); // 이벤트 소스를 FullCalendar에 추가
        //     } catch (error) {
        //         console.error('Error fetching holidays:', error);
        //     }
        // },

        // ***** 이용가능시간 등록하기 *****
        // insertRT() {


        //     axios({
        //         method: 'post', 
        //         url: `${this.$store.state.apiBaseUrl}/api/su/insertRT`,
        //         headers: { "Content-Type": "application/json; charset=utf-8" },
        //         data: this.rtVo,
        //         responseType: 'json'
        //     }).then(response => {
        //         console.log(response.data.apiData);

                
        //     }).catch(error => {
        //         console.log(error);
        //     });
        // },
        // 등록되어있는 날짜 가져오기
        // selectRt() {

        //     // console.log("등록여부 확인");
        //     axios({
        //         method: 'get',
        //         url: `${this.$store.state.apiBaseUrl}/api/su/selectRt`,
        //         headers: { "Content-Type": "application/json; charset=utf-8" },
        //         params : {bNo: this.rtVo.bNo},
        //         responseType: 'json'
        //     }).then(response => {
        //             console.log("화깅ㄴ하기")
        //             console.log(response.data.apiData);

        //             // 이벤트 소스를 FullCalendar에 추가
              
        //     }).catch(error => {
        //         console.log(error);
        //     });
        // },



    },

    // ***** input창에 바로 적용시키기 위해서 감시 *****
    watch: {
        selectedStartDate() {
            this.updateCalendar();
            this.activateWorkDays();
        },
        selectedEndDate() {
            this.updateCalendar();
            this.activateWorkDays();
        }
    },

    created() {

        
    },
};
</script>