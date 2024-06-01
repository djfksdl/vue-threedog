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
            <div class="timeContainer" >
                <!-- 타이틀 -->
                <div class="timeTop">
                    <h1>영업시간 등록</h1>
                </div>

                <!-- 스케쥴 등록 -->
                <div class="insertScheduleContainer">
                    <!-- 날짜 선택 -->
                    <div class="selectWorkDate">
                        <div v-if="!isAllDayCheck">
                            <input type="date" :value="selectedDate" @input="updateDate($event.target.value)">
                        </div>
                        <div v-else>
                            <input type="date" :value="selectedStartDate" @input="updateStartDate($event.target.value)">~
                            <input type="date" :value="selectedEndDate" @input="updateEndDate($event.target.value)">
                        </div>
                        <div class="weekAllDayCheck">
                            <label id="checkAllDay">일괄등록하기</label>
                            <input id="checkAllDay" type="checkbox" v-model="isAllDayCheck"> 
                        </div>
                    </div>

                    <!-- 시간 선택 -->
                    <div class="selectWorkTimeContainer selectedTimeContainer" v-if="isAllDayCheck">
                        <div class="selectWorkTimeWrapper">
                            <div class="leftColumn">
                                <div class="selectWorkTime" v-for="(day, index) in workDays" :key="day">
                                    <div :class="{'selectWorkDay': true, 'selected': selectedDays.includes(index)}" @click="selectDay(index)">
                                        {{ day }}
                                    </div>
                                    <div>
                                        <input type="time" step="600" :value="rtVo.rtTimes[index]?.startTime || ''" @input="updateStartTime(index, $event.target.value)"> ~ 
                                        <input type="time" step="600" :value="rtVo.rtTimes[index]?.endTime || ''" @input="updateEndTime(index, $event.target.value)">
                                    </div>
                                </div>
                                <div class="selectWorkTime">
                                    <div class="selectWorkDay" @click="selectDay('lunch')" :class="{'selected': selectedDays.includes('lunch')}">
                                        점심
                                    </div>
                                    <div>
                                        <input type="time" step="600" :value="rtVo.rtTimes['lunch']?.startTime || ''" @input="updateStartTime('lunch', $event.target.value)"> ~ 
                                        <input type="time" step="600" :value="rtVo.rtTimes['lunch']?.endTime || ''" @input="updateEndTime('lunch', $event.target.value)">
                                    </div>
                                </div>
                            </div>
                            <div class="rightColumn">
                                
                                <div class="selectWorkTime">
                                    <div class="selectWorkDay" @click="selectDay('sat')" :class="{'selected': selectedDays.includes('sat')}">
                                        토
                                    </div>
                                    <div>
                                        <input type="time" step="600" :value="rtVo.rtTimes['sat']?.startTime || ''" @input="updateStartTime('sat', $event.target.value)"> ~ 
                                        <input type="time" step="600" :value="rtVo.rtTimes['sat']?.endTime || ''" @input="updateEndTime('sat', $event.target.value)">
                                    </div>
                                </div>
                                <div class="selectWorkTime">
                                    <div class="selectWorkDay" @click="selectDay('sun')" :class="{'selected': selectedDays.includes('sun')}">
                                        일
                                    </div>
                                    <div>
                                        <input type="time" step="600" :value="rtVo.rtTimes['sun']?.startTime || ''" @input="updateStartTime('sun', $event.target.value)"> ~ 
                                        <input type="time" step="600" :value="rtVo.rtTimes['sun']?.endTime || ''" @input="updateEndTime('sun', $event.target.value)">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="selectWorkTimeContainer selectedTimeContainer2" v-else>
                        <div class="selectWorkTime">
                            <div :class="{'selectWorkDay': true, 'selected': selectedDays.includes(getDayIndex(selectedDate))}">
                                {{ getDayName(selectedDate) }}
                            </div>
                            <div>
                                <input type="time" step="600" :value="rtVo.rtTimes[getDayIndex(selectedDate)]?.startTime || ''" @input="updateStartTime(getDayIndex(selectedDate), $event.target.value)"> ~ 
                                <input type="time" step="600" :value="rtVo.rtTimes[getDayIndex(selectedDate)]?.endTime || ''" @input="updateEndTime(getDayIndex(selectedDate), $event.target.value)">
                            </div>
                        </div>
                        <div class="selectWorkTime">
                            <div class="selectWorkDay" @click="selectDay('lunch', true)" :class="{'selected': selectedDays.includes('lunch')}">
                                점심
                            </div>
                            <div>
                                <input type="time" step="600" :value="rtVo.rtTimes['lunch']?.startTime || ''" @input="updateStartTime('lunch', $event.target.value)"> ~ 
                                <input type="time" step="600" :value="rtVo.rtTimes['lunch']?.endTime || ''" @input="updateEndTime('lunch', $event.target.value)">
                            </div>
                        </div>
                    </div>


                    <!-- 등록,수정버튼 -->
                    <button type="submit" class="insertBtn" v-on:click="insertRT">등록</button>

                </div>
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
import axios from 'axios';


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
                events:this.events,//이벤트 소스를 events 배열로 설정
                dateClick: this.handleDateClick, // 날짜 클릭 이벤트 핸들러 
                dateSet: this.handleDateSet //날짜 선택 이벤트 핸들러 
            },
            // holidays : [],// 공휴일 데이터를 저장할 배열

            //날짜,시간관련
            isAllDayCheck: false,
            selectedDays: [], // 선택된 요일 인덱스, 다중 선택이 가능하기 위해 배열로 설정
            workDays: ['월', '화', '수', '목', '금'],
            allDays: ['월', '화', '수', '목', '금', '토', '일'],  // 전체 요일 목록
            selectedDate: '',
            selectedStartDate: '', // 일괄 등록시 시작 날짜
            selectedEndDate: '' ,// 일괄 등록시 종료 날짜
            selectedDateElements:[], //선택된 날짜 요소들
            workTimes:[], //선택된 요일별 시간
            
            rtVo:{
                rtDates:[],
                rtTimes:[],
                bNo : this.$route.params.bNo,
            },
            // 이벤트 데이터를 저장할 배열 추가
            events: [],
            
        };
    },
    methods: {
        // ***** 공휴일 api불러오기 - 나중에 *****
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
        insertRT() {
            // console.log("등록 버튼");

            // 선택된 날짜와 시간을 기반으로 rtVo 구성
            this.rtVo.rtDates = this.isAllDayCheck ? [this.selectedStartDate, this.selectedEndDate] : [this.selectedDate];

            // 일괄등록 안 했을 때
            if (!this.isAllDayCheck) {
                const selectedTimeInputs = document.querySelectorAll('.selectedTimeContainer2 input[type="time"]');
                let startTime = selectedTimeInputs[0].value;
                let endTime = selectedTimeInputs[1].value;

                // 1시간 단위로 시간을 쪼개서 rtVo에 추가
                let currentTime = new Date(`1970-01-01T${startTime}:00`);
                let endDateTime = new Date(`1970-01-01T${endTime}:00`);
                this.rtVo.rtTimes = [];
                while (currentTime < endDateTime) {
                    let nextHour = new Date(currentTime);
                    nextHour.setHours(currentTime.getHours() + 1);

                    if (this.isLunchTime(currentTime, nextHour)) {
                        currentTime = nextHour;
                        continue; // 점심 시간은 제외
                    }

                    this.rtVo.rtTimes.push(this.formatTime(currentTime));
                    currentTime = nextHour;
                }
            } else {
                // 일괄등록 로직
                this.rtVo.rtTimes = this.selectedDays.map(day => {
                    return this.rtVo.rtTimes[day]?.startTime || '';
                });
            }

            // console.log("여기 확인하라");
            // console.log(this.rtVo);

            axios({
                method: 'post', 
                url: `${this.$store.state.apiBaseUrl}/api/su/insertRT`,
                headers: { "Content-Type": "application/json; charset=utf-8" },
                data: this.rtVo,
                responseType: 'json'
            }).then(response => {
                console.log(response.data.apiData);

                
            }).catch(error => {
                console.log(error);
            });
        },
        // 등록되어있는 날짜 가져오기
        selectRt() {

            // console.log("등록여부 확인");
            axios({
                method: 'get',
                url: `${this.$store.state.apiBaseUrl}/api/su/selectRt`,
                headers: { "Content-Type": "application/json; charset=utf-8" },
                params : {bNo: this.rtVo.bNo},
                responseType: 'json'
            }).then(response => {
                    console.log("화깅ㄴ하기")
                    console.log(response.data.apiData);

                    // 서버로부터 기존 이벤트를 받아서 events 배열에 추가
                    response.data.apiData.forEach(event => {
                        this.events.push({
                            title: 'V완료V',
                            start: event.rtDate.split(' ')[0], // rtDate에서 날짜만 추출
                            allDay: true
                        });
                    });

                    // 이벤트 소스를 FullCalendar에 추가
                    this.$refs.calendar.getApi().removeAllEvents(); // 기존 이벤트 제거
                    this.$refs.calendar.getApi().addEventSource(this.events); // 새로운 이벤트 소스 추가
              
            }).catch(error => {
                console.log(error);
            });
        },

        addEventRange(startDate, endDate) {
            let currentDate = new Date(startDate);
            let endDateObj = new Date(endDate);

            while (currentDate <= endDateObj) {
                this.addEvent(currentDate.toISOString().split('T')[0]);
                currentDate.setDate(currentDate.getDate() + 1);
            }
        },

        // ***** 점심 시간 체크 *****
        isLunchTime(startTime, endTime) {
            if (!this.selectedDays.includes('lunch')) {
                return false; // 점심시간이 선택되지 않은 경우, 항상 false를 반환하여 시간을 포함시키도록 합니다.
            }
            const lunchStart = new Date('1970-01-01T12:00:00');
            const lunchEnd = new Date('1970-01-01T13:00:00');
            return (startTime >= lunchStart && startTime < lunchEnd) || (endTime > lunchStart && endTime <= lunchEnd);
        },

        // ***** 시간을 "HH:mm" 형식으로 포맷팅 *****
        formatTime(date) {
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            return `${hours}:${minutes}`;
        },
       
        
        // ***** 달력 클릭시 input창에 해당 날짜 할당 *****
        handleDateClick(info) {
            console.log(info); // 클릭 이벤트 확인용

            const clickedDate = new Date(info.dateStr);
            const today = new Date();
            
            // 오늘 날짜 이전인지 확인
            if (clickedDate < today.setHours(0, 0, 0, 0)) {
                alert("오늘 날짜 이전은 선택할 수 없습니다.");
                return; // 함수 종료
            }

            //  일괄등록x 
            if (!this.isAllDayCheck) {
                this.selectedDate = info.dateStr;
                this.highlightDate(info.dateStr); // 날짜 강조 표시
            } else { //  일괄등록o
                this.selectedStartDate = info.dateStr;

                const clickedDate = new Date(info.dateStr);
                const day = clickedDate.getDay();
                
                // 일요일을 선택했을 때 - 다음주 일요일이 안찍히게 
                if (day === 0) {
                    this.selectedEndDate = info.dateStr;
                } else {
                    const diffToSaturday = 7 - day;
                    const saturdayDate = new Date(clickedDate);
                    saturdayDate.setDate(clickedDate.getDate() + diffToSaturday);

                    this.selectedEndDate = saturdayDate.toISOString().split('T')[0];
                }
                this.highlightDateRange(); // 날짜 범위 강조 표시
            }
        },

         // ***** 일괄등록x 날짜 강조 표시 *****
         highlightDate(dateStr) {
            // 기존 선택된 날짜 초기화
            this.clearHighlightedDates();

            // 오늘 날짜 스타일 리셋 (선택된 날짜가 오늘이 아닌 경우)
            const todayElement = document.querySelector('.fc-day-today');
            if (todayElement && todayElement.getAttribute('data-date') !== dateStr) {
                todayElement.classList.add('fc-day-today-bold-only');
                todayElement.classList.remove('fc-day-today');
            }

            const dateElement = document.querySelector(`[data-date="${dateStr}"]`);
            if (dateElement) {
                dateElement.style.backgroundColor = '#f8a247'; // 원하는 배경색
                this.selectedDateElements.push(dateElement);
            }
        },

        // ***** 일괄등록o 날짜 범위 강조 표시 *****
        highlightDateRange() {
            // 기존 선택된 날짜 초기화
            this.clearHighlightedDates();

            // 오늘 날짜 스타일 리셋 (선택된 범위에 오늘이 포함되지 않은 경우)
            const todayElement = document.querySelector('.fc-day-today');
            const startDate = new Date(this.selectedStartDate);
            const endDate = new Date(this.selectedEndDate);
            if (todayElement && (todayElement.getAttribute('data-date') < this.selectedStartDate || todayElement.getAttribute('data-date') > this.selectedEndDate)) {
                todayElement.classList.add('fc-day-today-bold-only');
                todayElement.classList.remove('fc-day-today');
            }

            for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
                const dateStr = d.toISOString().split('T')[0];
                const dateElement = document.querySelector(`[data-date="${dateStr}"]`);
                if (dateElement) {
                    dateElement.style.backgroundColor = '#f8a247'; // 원하는 배경색
                    this.selectedDateElements.push(dateElement);
                }
            }
        },

        // ***** 기존 강조 표시 초기화 *****
        clearHighlightedDates() {
            this.selectedDateElements.forEach(element => {
                element.style.backgroundColor = ''; // 기본 배경색으로 초기화
            });
            this.selectedDateElements = [];
        },

        // ***** 일괄등록x 선택된 날짜 업데이트 *****
        updateDate(date) {
            this.selectedDate = date;

            // 날짜가 변경될 때도 점심이 선택된 상태로 유지
            if (!this.selectedDays.includes('lunch')) {
                this.selectedDays.push('lunch');
            }
        },

        // ***** 일괄등록o 선택된 시작 날짜 업데이트 *****
        updateStartDate(date) {
            this.selectedStartDate = date;
            this.highlightDateRange(); 
        },

        // ***** 일괄등록o 선택된 종료(일요일) 날짜 업데이트 *****
        updateEndDate(date) {
            this.selectedEndDate = date;
            this.highlightDateRange(); 
        },

        // 점심 시간을 토글하는 메서드
        toggleLunch() {
            const selectedIndex = this.selectedDays.indexOf('lunch');
            if (selectedIndex === -1) {
                this.selectedDays.push('lunch'); // 점심 추가
            } else {
                this.selectedDays.splice(selectedIndex, 1); // 점심 취소
            }
        },
        // ***** 요일 선택(다중 선택 가능) *****
        selectDay(index, isLunch) {
            if (isLunch) {
                const selectedIndex = this.selectedDays.indexOf('lunch');
                if (selectedIndex === -1) {
                    this.selectedDays.push('lunch'); // 선택 추가
                } else {
                    this.selectedDays.splice(selectedIndex, 1); // 선택 취소
                }
            } else {
                if (!this.selectedDays.includes(index)) {
                    this.selectedDays = this.workDays; // 요일은 계속 선택된 상태로 유지
                    // 날짜가 변경될 때도 점심이 선택된 상태로 유지
                    if (!this.selectedDays.includes('lunch')) {
                        this.selectedDays.push('lunch');
                    }
                }
            }
        },

        // ***** 선택된 날짜의 해당 요일 반환 *****
        getDayName(dateStr) {
            const date = new Date(dateStr);
            const days = ['일', '월', '화', '수', '목', '금', '토'];
            return days[date.getDay()];
        },

        // ***** 선택된 날짜의 해당 요일의 index 반환 *****
        getDayIndex(dateStr) {
            const date = new Date(dateStr);
            return date.getDay();
        },

        // 새로운 datesSet 이벤트 핸들러
        handleDatesSet() {
            if (this.isAllDayCheck && this.selectedStartDate && this.selectedEndDate) {
                this.highlightDateRange();
            } else if (this.selectedDate) {
                this.highlightDate(this.selectedDate);
            }
        },

        // 업데이트 메서드 추가
        updateStartTime(day, time) {
            if (!this.rtVo.rtTimes[day]) {
                this.rtVo.rtTimes = { ...this.rtVo.rtTimes, [day]: {} }; // 대신 일반 JavaScript 방식을 사용
            }
            this.rtVo.rtTimes[day].startTime = time;
        },

        updateEndTime(day, time) {
            if (!this.rtVo.rtTimes[day]) {
                this.rtVo.rtTimes = { ...this.rtVo.rtTimes, [day]: {} }; // 대신 일반 JavaScript 방식을 사용
            }
            this.rtVo.rtTimes[day].endTime = time;
        },

    },
    watch:{
        selectedDate() {
            // 날짜가 변경될 때도 점심이 선택된 상태로 유지
            if (!this.selectedDays.includes('lunch')) {
                this.selectedDays.push('lunch');
            }
        },
        isAllDayCheck(newVal) {
            if (!newVal) {
                this.selectedStartDate = '';
                this.selectedEndDate = '';
                this.clearHighlightedDates();
            } else if (this.selectedDate) {
                // '일괄등록하기'를 체크하고 이미 선택된 날짜가 있는 경우
                this.selectedStartDate = this.selectedDate;
                const clickedDate = new Date(this.selectedDate);
                const day = clickedDate.getDay();

                //일요일을 선택했을때 
                if (day === 0) {
                    this.selectedEndDate = this.selectedStartDate;
                } else {
                    const diffToSaturday = 7 - day;
                    const saturdayDate = new Date(clickedDate);
                    saturdayDate.setDate(clickedDate.getDate() + diffToSaturday);

                    this.selectedEndDate = saturdayDate.toISOString().split('T')[0];
                }
                this.highlightDateRange();
            }
        },
        selectedStartDate() {
            this.highlightDateRange();
        },
        selectedEndDate() {
            this.highlightDateRange();
        }
    },
    created() {

        // this.fetchHolidays(); //공휴일 가져옴

        // 오늘 날짜를 YYYY-MM-DD 형식으로 설정
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        this.selectedDate = `${yyyy}-${mm}-${dd}`;

         // 기본적으로 월요일부터 일요일까지의 요일을 선택된 상태로 설정
        this.selectedDays = [0,1, 2, 3, 4, 5, 6 , 'lunch']; // 월요일부터 일요일까지의 요일 인덱스

        this.selectRt();
    },
};
</script>