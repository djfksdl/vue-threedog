<template>
    <div id="wrap">
        <ManagerHeader />
        <div class="container4">
            <!-- 달력 -->
            <div class="calendarContainer">
                <div class="calendar-container2">
                    <FullCalendar ref="calendar" :options="calendarOptions" id="calendar2" @eventClick="handleEventClick"/>
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
                    <input type="date" v-model="selectedStartDate" :min="today" ref="startDateInput" @input="handleDateChange('start')"> ~
                    <input type="date" v-model="selectedEndDate" :min="selectedStartDate" ref="endDateInput" @focus="checkStartDate" @input="handleDateChange('end')">
                </div>
                <div class="weekAllDayCheck">
                    <label id="checkAllDay">동일한 시간 추가</label>
                    <input id="checkAllDay" type="checkbox" :disabled="!isMultipleDatesSelected" @change="applySameTime"> 
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
                                        <input type="time" v-model="day.startTime" @input="handleTimeInput(day)" step="600" :disabled="!day.active"> ~
                                        <input type="time" v-model="day.endTime" @input="handleTimeInput(day)" step="600" :disabled="!day.active">
                                    </div>
                                </div>
                            </div>
                            <div class="rightColumn">
                                <div class="selectWorkTime" v-for="(day, index) in rightColumnDays" :key="index">
                                    <div :class="['selectWorkDay', { active: day.active }]">
                                        {{ day.label }}
                                    </div>
                                    <div>
                                        <input type="time" v-model="day.startTime" @input="handleTimeInput(day)" step="600" :disabled="!day.active"> ~
                                        <input type="time" v-model="day.endTime" @input="handleTimeInput(day)" step="600" :disabled="!day.active">
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
import Swal from "sweetalert2"; // 모달창
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
                dateClick: this.handleDateClick, // 날짜 클릭 이벤트 핸들러 
                dateSet: this.handleDateSet, //날짜 선택 이벤트 핸들러 
                eventClick: this.handleEventClick, // 이벤트 클릭 핸들러 추가
                eventContent: this.renderEventContent, // 이벤트 내용을 렌더링하는 함수 추가
            },
            holidays : [],// 공휴일 데이터를 저장할 배열

            //날짜,시간관련
            selectedStartDate: null, //선택된 시작 날짜
            selectedEndDate: null,//선택된 끝 날짜
            selectedDateElements: [], // 선택된 날짜 요소를 저장할 배열
            workDays: [
            { label: '월', active: false, startTime: '', endTime: '' },
            { label: '화', active: false, startTime: '', endTime: '' },
            { label: '수', active: false, startTime: '', endTime: '' },
            { label: '목', active: false, startTime: '', endTime: '' },
            { label: '금', active: false, startTime: '', endTime: '' },
            { label: '점심', active: false, startTime: '', endTime: '' },
            { label: '토', active: false, startTime: '', endTime: '' },
            { label: '일', active: false, startTime: '', endTime: '' },
            { label: '공휴일', active: false, startTime: '', endTime: '' },
            { label: '주말점심', active: false, startTime: '', endTime: '' }
            ],
            rtVo:{
                rtDates:[],
                rtTimes:[],
                bNo : this.$route.params.bNo,
            },
            today: new Date().toISOString().split('T')[0], // 오늘 날짜
            originalTimes: [], // 동일시간추가 하기전 시간을 담을 배열
            
        };
    },
    computed: {
        
        // 왼쪽, 오른쪽에 해당 요일 배치
        leftColumnDays() {
            return this.workDays.slice(0, 6) || []; // 월~금, 점심
        },
        rightColumnDays() {
            return this.workDays.slice(6) || []; // 토, 일, 공휴일, 주말점심
        },
        //동일한 시간 추가
        isMultipleDatesSelected() {
            return this.selectedStartDate && this.selectedEndDate && this.selectedStartDate !== this.selectedEndDate;
        }
    },
    methods: {
        // ***** 달력에 날짜 범위 표시 및 시간 초기화 *****
        handleDateChange(type) {
            this.updateCalendar();
            this.activateWorkDays();
            if (type === 'start' || type === 'end') {
                this.clearTimeInputs();
            }
        },

        // ***** 시간 입력창 초기화 *****
        clearTimeInputs() {
            this.workDays.forEach(day => {
                day.startTime = '';
                day.endTime = '';
            });
        },

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
                if (!this.selectedEndDate || this.selectedStartDate === this.selectedEndDate) {
                    this.selectedEndDate = this.selectedStartDate;
                }
                this.highlightDateRange();
                this.activateWorkDays();
            }
        },

        // ***** 첫번째 날짜만 선택하고 시간입력했을때 *****
        handleTimeInput(day) {
            if (this.selectedStartDate && !this.selectedEndDate) {
                this.selectedEndDate = this.selectedStartDate;
            }
            this.updateWorkTime(day);
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
                const formattedDate = currentDay.toISOString().split('T')[0].replace(/-/g, ''); //공휴일관련변수

                if (this.holidays.includes(formattedDate)) {
                    this.workDays[8].active = true; // 공휴일 활성화
                    this.workDays[9].active = true; // 주말 점심 활성화
                } else {
                    if (dayIndex === 0) {
                        this.workDays[7].active = true; // 일요일 활성화
                        this.workDays[9].active = true; // 주말 점심 활성화
                    } else if (dayIndex === 6) {
                        this.workDays[6].active = true; // 토요일 활성화
                        this.workDays[9].active = true; // 주말 점심 활성화
                    } else {
                        this.workDays[dayIndex - 1].active = true; // 평일 활성화
                        this.workDays[5].active = true; // 점심 활성화
                    }
                }

                // 공휴일 활성화
                if (this.holidays.includes(formattedDate)) {
                    this.workDays[8].active = true; // 공휴일
                    // 공휴일이면 점심 비활성화하고 주말 점심 활성화
                    this.workDays[5].active = false; // 점심 비활성화
                    this.workDays[9].active = true; // 주말 점심 활성화
                }
            }
        },

        // ***** 시작 날짜 확인 *****
        checkStartDate() {
            if (!this.selectedStartDate) {
                alert("시작 날짜부터 선택해주세요.");
                this.$refs.startDateInput.focus();
            }
        },

        // ***** 입력된 시간 저장하기 *****
        updateWorkTime(day) {
            const dayIndex = this.workDays.findIndex(d => d.label === day.label);
            if (dayIndex !== -1) {
                this.workDays[dayIndex].startTime = day.startTime;
                this.workDays[dayIndex].endTime = day.endTime;
            }
        },

        // ***** 공휴일 api불러오기 *****
        async fetchHolidays() {
            const apiKey = 'LxLWmax008pxOL9%2F%2BIFK%2BVhedunUAqbNuCcRNufjvl9k%2FRjucI7%2BNJoqtTSgEkQdXaSWSiT47iGhVevdBijjOQ%3D%3D'; // 발급받은 API 키(Encoding)
            const year = new Date().getFullYear();
            const url = `https://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo?ServiceKey=${apiKey}&solYear=${year}&numOfRows=100&_type=json`;

            try {
                const response = await axios.get(url);
                const holidays = response.data.response.body.items.item;

                holidays.forEach(holiday => {
                    this.$refs.calendar.getApi().addEvent({
                        title: holiday.dateName,
                        start: holiday.locdate.toString(),
                        allDay: true,
                        color: 'red', // 공휴일 이벤트의 색상을 빨간색으로 설정
                        classNames: ['holiday-event'] // 공휴일 이벤트에 클래스 추가(드래그 막기 위해서)
                    });
                });

                this.holidays = holidays.map(holiday => holiday.locdate.toString());
                
            } catch (error) {
                console.error('Error fetching holidays:', error);
            }
        },

        // ***** 이용가능시간 등록하기 *****
        insertRT() {

            // 두번째 날짜를 선택안하고 등록했을때 첫번째 날짜 할당
            if (!this.selectedEndDate) {
                this.selectedEndDate = this.selectedStartDate;
            }

            const startDate = new Date(this.selectedStartDate);
            const endDate = new Date(this.selectedEndDate);
            const daysBetween = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

            this.rtVo.rtDates = [];
            this.rtVo.rtTimes = [];

            for (let i = 0; i < daysBetween; i++) {
                const currentDay = new Date(startDate);
                currentDay.setDate(currentDay.getDate() + i);
                const dayIndex = currentDay.getDay(); // 0 (일요일) ~ 6 (토요일)
                const formattedDate = currentDay.toISOString().split('T')[0].replace(/-/g, ''); // 공휴일 관련 변수

                let dayLabel;
                if (dayIndex === 0) dayLabel = '일';
                else if (dayIndex === 6) dayLabel = '토';
                else dayLabel = ['월', '화', '수', '목', '금'][dayIndex - 1];

                const isHoliday = this.holidays.includes(formattedDate);
                const isWeekend = dayIndex === 0 || dayIndex === 6;

                let workTime;
                if (isHoliday) {
                    workTime = `${this.workDays[8].startTime} ~ ${this.workDays[8].endTime}`;
                    workTime = this.subtractTime(workTime, `${this.workDays[9].startTime} ~ ${this.workDays[9].endTime}`);
                } else if (isWeekend) {
                    workTime = `${this.workDays.find(day => day.label === dayLabel).startTime} ~ ${this.workDays.find(day => day.label === dayLabel).endTime}`;
                    workTime = this.subtractTime(workTime, `${this.workDays[9].startTime} ~ ${this.workDays[9].endTime}`);
                } else {
                    workTime = `${this.workDays.find(day => day.label === dayLabel).startTime} ~ ${this.workDays.find(day => day.label === dayLabel).endTime}`;
                    workTime = this.subtractTime(workTime, `${this.workDays[5].startTime} ~ ${this.workDays[5].endTime}`);
                }

                const timeSlots = this.generateTimeSlots(workTime);
                timeSlots.forEach(slot => {
                    const [startTime] = slot.split(' ~ '); // 시작 시간만 저장
                    this.rtVo.rtDates.push(formattedDate);
                    this.rtVo.rtTimes.push(startTime);

                   
                });
            }

            axios({
                method: 'post',
                url: `${this.$store.state.apiBaseUrl}/api/su/insertRT`,
                headers: { "Content-Type": "application/json; charset=utf-8" },
                data: this.rtVo,
                responseType: 'json'
            }).then(response => {
                console.log(response.data.apiData);
                this.$router.push(`/inserttime/${this.bNo}`);
            }).catch(error => {
                console.log(error);
            });
        },

        // ***** 시간 빼기 메소드 *****
        subtractTime(workTime, subtractTime) {
            if (!workTime || !subtractTime) return workTime;

            const [workStart, workEnd] = workTime.split('~').map(time => time.trim());
            const [subtractStart, subtractEnd] = subtractTime.split('~').map(time => time.trim());

            if (workStart >= subtractEnd || workEnd <= subtractStart) return workTime; // 시간대가 겹치지 않으면 그대로 반환

            let resultTimes = [];

            if (workStart < subtractStart) {
                resultTimes.push(`${workStart} ~ ${subtractStart}`);
            }
            if (workEnd > subtractEnd) {
                resultTimes.push(`${subtractEnd} ~ ${workEnd}`);
            }

            return resultTimes.join(', ');
        },

        // ***** 시간대 1시간 단위로 나누는 메소드 *****
        generateTimeSlots(timeRange) {
            const slots = [];
            const ranges = timeRange.split(',').map(range => range.trim());

            ranges.forEach(range => {
                const [start, end] = range.split('~').map(time => time.trim());
                let current = new Date(`1970-01-01T${start}:00`);
                const endDate = new Date(`1970-01-01T${end}:00`);

                while (current < endDate) {
                    const next = new Date(current);
                    next.setHours(current.getHours() + 1);
                    if (next <= endDate) {
                        slots.push(`${this.formatTime(current)} ~ ${this.formatTime(next)}`);
                    }
                    current = next;
                }
            });

            return slots;
        },

        // ***** 시간 형식 변환 메소드 *****
        formatTime(date) {
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            return `${hours}:${minutes}`;
        },

        // ***** 동일한 시간 입력하기 *****
        applySameTime(event) {
            const activeDays = this.workDays.filter(day => day.active && ['월', '화', '수', '목', '금', '토', '일'].includes(day.label));
            if (activeDays.length < 2) {
                event.target.checked = false;
                return; // 활성화된 요일이 2개 미만일 경우 아무 일도 안 함
            }

            if (event.target.checked) {
                const referenceDay = activeDays.find(day => day.startTime && day.endTime);
                if (!referenceDay) {
                    alert('시간을 선택해주세요');
                    event.target.checked = false;
                    return;
                }

                const { startTime, endTime } = referenceDay;

                if (!startTime && !endTime) {
                    alert('시간을 선택해주세요');
                    event.target.checked = false;
                    return;
                }

                if (startTime && !endTime) {
                    alert('마치는 시간을 입력해주세요');
                    event.target.checked = false;
                    return;
                }

                // Store original times before applying the same time
                this.originalTimes = activeDays.map(day => ({ label: day.label, startTime: day.startTime, endTime: day.endTime }));

                activeDays.forEach(day => {
                    if (day !== referenceDay && day.label !== '점심' && day.label !== '주말점심') {
                        day.startTime = startTime;
                        day.endTime = endTime;
                    }
                });
            } else {
                // Restore original times when unchecked
                this.originalTimes.forEach(original => {
                    const day = this.workDays.find(day => day.label === original.label);
                    if (day) {
                        day.startTime = original.startTime;
                        day.endTime = original.endTime;
                    }
                });
            }
        },

        // ***** 등록되어있는 날짜 가져오기 *****
        selectRt() {

            console.log("등록여부 확인");

            axios({
                method: 'get',
                url: `${this.$store.state.apiBaseUrl}/api/su/selectRt`,
                headers: { "Content-Type": "application/json; charset=utf-8" },
                params : {bNo: this.rtVo.bNo},
                responseType: 'json'
            }).then(response => {
                    console.log("화깅ㄴ하기")
                    console.log(response.data.apiData);

                    // 이벤트 소스를 FullCalendar에 추가
                    const rtData = response.data.apiData;
                    const formattedDates = rtData.map(item => item.rtDate);
                    this.addCompletionEvents(formattedDates); 
              
            }).catch(error => {
                console.log(error);
            });
        },

        // ***** 등록되어있는 날짜에 달력에 추가 *****
        addCompletionEvents(dates) {
            const calendarApi = this.$refs.calendar.getApi();
            dates.forEach(date => {
                calendarApi.addEvent({
                    title: '',
                    start: date, // 날짜 형식이 일치하는지 확인 필요 (예: '2023-06-10')
                    allDay: true,
                    display: 'background', // 배경으로 표시
                    backgroundColor: 'transparent', // 투명 배경
                    extendedProps: {
                        imageUrl: require('@/assets/images/check_date.png') // 이미지 경로 추가
                    }
                });
            });
        },

        // ***** 등록되어있는 시간 가져오기(모달창 시간 입력 위해) *****
        selectRtime(date) {
            console.log("등록시간 가져오기");

            return axios({

                method: 'get',
                url: `${this.$store.state.apiBaseUrl}/api/su/selectRtime`,
                headers: { "Content-Type": "application/json; charset=utf-8" },
                params: { bNo: this.rtVo.bNo, rtDate: date },
                responseType: 'json'
            }).then(response => {
                console.log("등록된 시간들");
                console.log(response.data.apiData);
                return response.data.apiData;
            }).catch(error => {
                console.log(error);
                return [];
            });
        },

        // ***** 달력 모달창 *****
        async handleEventClick(info) {
            const event = info.event;
            const selectedDate = event.start.toLocaleDateString('sv-SE').replace(/-/g, '');

            const rtData = await this.selectRtime(selectedDate);

            if (rtData && rtData.length > 0) {
                const rtTimes = rtData.map(item => item.rtTime);

                const startTime = rtTimes[0];
                const endTime = this.addOneHour(rtTimes[rtTimes.length - 1]);

                let lunchStartTime = '';
                let lunchEndTime = '';

                for (let i = 1; i < rtTimes.length; i++) {
                    if (this.diffInHours(rtTimes[i - 1], rtTimes[i]) > 1) {
                        lunchStartTime = this.addOneHour(rtTimes[i - 1]);
                        lunchEndTime = rtTimes[i];
                        break;
                    }
                }

                // 클릭한 날짜와 요일 정의
                const clickedDate = event.start.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' }); 

                Swal.fire({
                    title: `${clickedDate}`,
                    html: `
                        <label><strong>등록시간:</strong></label>
                        <input type="time" id="startTime" value="${startTime}" step="600"> ~
                        <input type="time" id="endTime" value="${endTime}" step="600">
                        <br>
                        <label><strong>점심시간:</strong></label>
                        <input type="time" id="lunchStartTime" value="${lunchStartTime}" step="600"> ~
                        <input type="time" id="lunchEndTime" value="${lunchEndTime}" step="600">
                        <br>
                        <button id="deleteButton" class="swal2-styled">삭제</button>
                        <button id="updateButton" class="swal2-styled">수정</button>
                    `,
                    icon: 'info',
                    showCloseButton: true, // 오른쪽 상단에 X 버튼 추가
                    showConfirmButton: false, // 하단의 닫기 버튼 제거

                    // 모달창 수정,삭제 
                    didOpen: () => {

                        // 모달창 삭제
                        document.getElementById('deleteButton').addEventListener('click', () => {
                            Swal.fire({
                                title: '삭제하시겠습니까?',
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonText: '네',
                                cancelButtonText: '아니요'
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    axios({
                                        method: 'delete', 
                                        url: `${this.$store.state.apiBaseUrl}/api/su/deleteRtime`, 
                                        headers: { "Content-Type": "application/json; charset=utf-8" },
                                        data: {
                                            bNo: this.rtVo.bNo,
                                            rtDate: selectedDate 
                                        }
                                    }).then(response => {

                                        if (response.data.result === 'success') {
                                            event.remove();
                                            Swal.fire('삭제되었습니다.', '', 'success');

                                            this.$router.push(`/inserttime/${this.bNo}`);

                                        } else {
                                            Swal.fire('삭제 실패', '다시 시도해주세요.', 'error');
                                        }
                                    }).catch(error => {
                                        console.log(error);
                                        Swal.fire('삭제 실패', '서버와의 통신 중 오류가 발생했습니다.', 'error');
                                    });
                                }
                            });
                        });

                        // 모달창 수정
                        document.getElementById('updateButton').addEventListener('click', () => {
                            const startTime = document.getElementById('startTime').value;
                            const endTime = document.getElementById('endTime').value;
                            const lunchStartTime = document.getElementById('lunchStartTime').value;
                            const lunchEndTime = document.getElementById('lunchEndTime').value;

                             // 전체 시간 범위를 점심 시간을 제외하고 1시간 단위로 나누기
                            const workTime = `${startTime} ~ ${endTime}`;
                            const filteredTimeSlots = this.subtractTime(workTime, `${lunchStartTime} ~ ${lunchEndTime}`);
                            const updatedTimeSlots = this.generateTimeSlots(filteredTimeSlots);

                            // 모든 시간을 updatedRtTimes 배열에 넣기
                            const updatedRtTimes = [];
                            updatedTimeSlots.forEach(slot => {
                                const [startTime] = slot.split(' ~ '); // 시작 시간만 저장
                                updatedRtTimes.push(startTime);
                            });

                            console.log(this.rtVo.bNo);
                            console.log(selectedDate);
                            console.log(updatedRtTimes);

                            axios({
                                method: 'post',
                                url: `${this.$store.state.apiBaseUrl}/api/su/updateRtime`, 
                                headers: { "Content-Type": "application/json; charset=utf-8" },
                                data: {
                                    bNo: this.rtVo.bNo,
                                    rtDate: selectedDate,
                                    rtTimes: updatedRtTimes
                                }
                            }).then(response => {
                                if (response.data.result === 'success') {
                                    Swal.fire('수정되었습니다.', '', 'success');
                                } else {
                                    Swal.fire('수정 실패', '다시 시도해주세요.', 'error');
                                }
                            }).catch(error => {
                                console.log(error);
                                Swal.fire('수정 실패', '서버와의 통신 중 오류가 발생했습니다.', 'error');
                            });
                        });
                    },
                    preConfirm: () => {
                        const startTime = document.getElementById('startTime').value;
                        const endTime = document.getElementById('endTime').value;
                        const lunchStartTime = document.getElementById('lunchStartTime').value;
                        const lunchEndTime = document.getElementById('lunchEndTime').value;

                        return {
                            startTime: startTime,
                            endTime: endTime,
                            lunchStartTime: lunchStartTime,
                            lunchEndTime: lunchEndTime
                        };
                    }
                }).then((result) => {
                    if (result.isConfirmed) {
                        const { startTime, endTime, lunchStartTime, lunchEndTime } = result.value;
                        event.setExtendedProp('startTime', startTime);
                        event.setExtendedProp('endTime', endTime);
                        event.setExtendedProp('lunchStartTime', lunchStartTime);
                        event.setExtendedProp('lunchEndTime', lunchEndTime);
                    }
                });
            }
        },

        // ***** 시간 1시간 더하기 메소드 *****
        addOneHour(time) {
            const [hours, minutes] = time.split(':');
            let newHours = parseInt(hours, 10) + 1;
            if (newHours < 10) newHours = `0${newHours}`;
            return `${newHours}:${minutes}`;
        },

         // ***** 시간 차이 계산 메소드 *****
        diffInHours(time1, time2) {
            const [hours1, minutes1] = time1.split(':').map(Number);
            const [hours2, minutes2] = time2.split(':').map(Number);
            return (hours2 + minutes2 / 60) - (hours1 + minutes1 / 60);
        },

        // ***** 등록된 날짜에 이미지 추가, 공휴일은 영향안받게 *****
        renderEventContent(arg) {
            if (arg.event.extendedProps.imageUrl) {
                // 등록 완료 이벤트에 이미지 추가
                return {
                    html: `<img src="${arg.event.extendedProps.imageUrl}" style="width: 20px; height: 20px; display: block;">`
                };
            } else if (arg.event.title) {
                // 공휴일 이벤트는 제목을 그대로 표시
                return { html: arg.event.title };
            }
        },



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
        // 공휴일 불러오기
        this.fetchHolidays();

        //저장되어있는 날짜 불러오기
        this.selectRt();
        
    },
};
</script>