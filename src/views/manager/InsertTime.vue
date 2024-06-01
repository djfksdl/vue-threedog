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
                            <input type="date" :value="selectedDate" @input="updateDate($event.target.value)" >
                        </div>
                        <div v-else>
                            <input type="date" :value="selectedStartDate" @input="updateStartDate($event.target.value)">~<input type="date" :value="selectedEndDate" @input="updateEndDate($event.target.value)">
                        </div>
                        <div class="weekAllDayCheck">
                            <label id="checkAllDay" >일괄등록하기</label>
                            <input id="checkAllDay" type="checkbox" v-model="isAllDayCheck"> 
                        </div>
                    </div>

                    <!-- 시간 선택 -->
                    <div class="selectWorkTimeContainer"> 
                        <div v-if="isAllDayCheck">
                            <div class="selectWorkTime" v-for="(day, index) in days" :key="day">
                                <div :class="{'selectWorkDay': true, 'selected': selectedDays.includes(index)}" @click="selectDay(index)">
                                    {{ day }}
                                </div>
                                <div>
                                    <input type="time"> ~ <input type="time">
                                </div>
                            </div>
                            <!-- '점심' 시간 선택 -->
                            <div class="selectWorkTime">
                                <div class="selectWorkDay" @click="selectDay('lunch')" :class="{'selected': selectedDays.includes('lunch')}">
                                    점심
                                </div>
                                <div>
                                    <input type="time"> ~ <input type="time">
                                </div>
                            </div>
                        </div>
                        <div v-else class="selectWorkTime">
                            <div :class="{'selectWorkDay': true, 'selected': selectedDays.includes(0)}" @click="selectDay(0)">
                                월
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
    import dayGridPlugin from "@fullcalendar/daygrid";

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
                    plugins: [dayGridPlugin], 
                    initialView: "dayGridMonth",
                    headerToolbar: {
                        start: "prev,next today",
                        center: "title",
                        end: ""
                    },
                    editable: true, // 드래그 앤 드롭 및 크기 조정 활성화
                    contentHeight: 500,
                    locale: "ko",
                },

                //날짜,시간관련
                isAllDayCheck:false,
                selectedDays: [], // 선택된 요일 인덱스, 다중 선택이 가능하기 위해 배열로 설정
                days: ['월', '화', '수', '목', '금', '토'],  // 요일 목록
                selectedDate:'',
                selectedStartDate:'',//일괄 등록시 시작 날짜
                selectedEndDate:''// 일괄 등록시 종료 날짜
            };
        },
        methods: {

            //달력 클릭시 input창에 해당 날짜 
            handleDateClick(info) {
                if (!this.isAllDayCheck) {
                    this.selectedDate = info.dateStr;
                } else {
                    this.selectedStartDate = info.dateStr;
                    this.selectedEndDate = '';
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
            //요일 선택(다중 선택 가능)
            selectDay(index) {
                if (index === 'lunch') {
                    const selectedIndex = this.selectedDays.indexOf('lunch');
                    if (selectedIndex === -1) {
                        this.selectedDays.push('lunch'); // '점심' 선택 추가
                    } else {
                        this.selectedDays.splice(selectedIndex, 1); // '점심' 선택 취소
                    }
                } else {
                    const selectedIndex = this.selectedDays.indexOf(index);
                    if (selectedIndex === -1) {
                        this.selectedDays.push(index); // 선택 추가
                    } else {
                        this.selectedDays.splice(selectedIndex, 1); // 선택 취소
                    }
                }
            }
        },
        created(){}
    };
</script>
<style></style>