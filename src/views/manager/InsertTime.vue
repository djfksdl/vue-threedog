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
                    <h1>한 주 스케쥴 등록</h1>
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
                                        <input type="time"> ~ <input type="time">
                                    </div>
                                </div>
                            </div>
                            <div class="rightColumn">
                                <div class="selectWorkTime">
                                    <div class="selectWorkDay" @click="selectDay('lunch')" :class="{'selected': selectedDays.includes('lunch')}">
                                        점심
                                    </div>
                                    <div>
                                        <input type="time"> ~ <input type="time">
                                    </div>
                                </div>
                                <div class="selectWorkTime">
                                    <div class="selectWorkDay" @click="selectDay('sat')" :class="{'selected': selectedDays.includes('sat')}">
                                        토
                                    </div>
                                    <div>
                                        <input type="time"> ~ <input type="time">
                                    </div>
                                </div>
                                <div class="selectWorkTime">
                                    <div class="selectWorkDay" @click="selectDay('sun')" :class="{'selected': selectedDays.includes('sun')}">
                                        일
                                    </div>
                                    <div>
                                        <input type="time"> ~ <input type="time">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="selectWorkTimeContainer selectedTimeContainer2" v-else>
                        <div class="selectWorkTime">
                            <div :class="{'selectWorkDay': true, 'selected': selectedDays.includes(getDayIndex(selectedDate))}" @click="selectDay(getDayIndex(selectedDate))">
                                {{ getDayName(selectedDate) }}
                            </div>
                            <div>
                                <input type="time"> ~ <input type="time">
                            </div>
                        </div>
                        <div class="selectWorkTime">
                            <div class="selectWorkDay" @click="selectDay('lunch')" :class="{'selected': selectedDays.includes('lunch')}">
                                점심
                            </div>
                            <div>
                                <input type="time"> ~ <input type="time">
                            </div>
                        </div>
                    </div>

                    <!-- 등록,수정버튼 -->
                    <button type="submit" class="insertBtn">등록</button>

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
                    start: "prev,next today",
                    center: "title",
                    end: ""
                },
                editable: true, // 드래그 앤 드롭 및 크기 조정 활성화
                contentHeight: 500,
                locale: "ko",
                firstDay: 1, //월요일을 시작일로 설정
                dateClick: this.handleDateClick // 날짜 클릭 이벤트 핸들러 추가
            },

            //날짜,시간관련
            isAllDayCheck: false,
            selectedDays: [], // 선택된 요일 인덱스, 다중 선택이 가능하기 위해 배열로 설정
            workDays: ['월', '화', '수', '목', '금'],
            allDays: ['월', '화', '수', '목', '금', '토', '일'],  // 전체 요일 목록
            selectedDate: '',
            selectedStartDate: '', // 일괄 등록시 시작 날짜
            selectedEndDate: '' // 일괄 등록시 종료 날짜
        };
    },
    methods: {
        // 달력 클릭시 input창에 해당 날짜 할당
        handleDateClick(info) {
            console.log(info); // 클릭 이벤트 확인용
            if (!this.isAllDayCheck) {
                this.selectedDate = info.dateStr;
            } else {
                this.selectedStartDate = info.dateStr;

                // 선택한 날짜의 일요일 날짜 계산하여 할당
                const clickedDate = new Date(info.dateStr);
                const day = clickedDate.getDay();
                
                // 수정된 부분: 일요일을 선택했을 때 - 다음주 일요일이 안찍히게 
                if (day === 0) {
                    this.selectedEndDate = info.dateStr;
                } else {
                    const diffToSaturday = 7 - day;
                    const saturdayDate = new Date(clickedDate);
                    saturdayDate.setDate(clickedDate.getDate() + diffToSaturday);

                    this.selectedEndDate = saturdayDate.toISOString().split('T')[0];
                }
            }
        },
        updateDate(date) {
            this.selectedDate = date;
        },
        updateStartDate(date) {
            this.selectedStartDate = date;
        },
        updateEndDate(date) {
            this.selectedEndDate = date;
        },
        // 요일 선택(다중 선택 가능)
        selectDay(index) {
            if (index === 'lunch' || index === 'sun' || index === 'sat') {
                const selectedIndex = this.selectedDays.indexOf(index);
                if (selectedIndex === -1) {
                    this.selectedDays.push(index); // 선택 추가
                } else {
                    this.selectedDays.splice(selectedIndex, 1); // 선택 취소
                }
            } else {
                const selectedIndex = this.selectedDays.indexOf(index);
                if (selectedIndex === -1) {
                    this.selectedDays.push(index); // 선택 추가
                } else {
                    this.selectedDays.splice(selectedIndex, 1); // 선택 취소
                }
            }
        },
        getDayName(dateStr) {
            const date = new Date(dateStr);
            const days = ['일', '월', '화', '수', '목', '금', '토'];
            return days[date.getDay()];
        },
        getDayIndex(dateStr) {
            const date = new Date(dateStr);
            return date.getDay();
        }
    },
    watch:{
        isAllDayCheck(newVal) {
            if (!newVal) {
                this.selectedStartDate = '';
                this.selectedEndDate = '';
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
            }
        }
    },
    created() {},
};
</script>