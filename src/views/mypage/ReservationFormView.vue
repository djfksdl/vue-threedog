<template>
    <div id="wrap">
        <AppHeader />
        <div id="reservationForm">
            <div class="container">
                <div>
                    
                </div>
                <form>
                    <h2>📅날짜와 시간을 선택해주세요</h2>
                    <div class="choiceBox">
                        <div class="calendar">
                            <DatePicker />
                        </div>
                        <div class="time">
                            <button type="button">10:00</button>
                            <button type="button">11:00</button>
                            <button type="button">12:00</button>
                            <button type="button">13:00</button>
                            <button type="button">14:00</button>
                            <button type="button">15:00</button>
                            <button type="button">16:00</button>
                            <button type="button">17:00</button>

                        </div>
                    </div>
                    <div class="petChoice">
                        <label>반려견 선택</label>
                        <button type="button">코코</button>
                        <button type="button">구름이</button>
                    </div>
                    <div class="petKgChoice">
                        <label>몸무게</label>
                        <p>3.2kg</p>
                    </div>
                    <div class="character">
                        <button type="button">피부병</button>
                        <button type="button">심장질환</button>
                        <button type="button">마킹</button>
                        <button type="button">마운팅</button>
                        <div class="bite">
                            <div class="biteRange">
                                <label>입질정도</label>
                                <div class="biteRange2">
                                    <input type="range" min="1" max="3" step="1" list="tickmarks">
                                    <datalist id="tickmarks">
                                        <option value="1"></option>
                                        <option value="2"></option>
                                        <option value="3"></option>
                                    </datalist>
                                </div>
                            </div>
                            <div class="pbox">
                                <p>하</p>
                                <p>중</p>
                                <p>상</p>
                            </div>



                        </div>
                        <textarea placeholder="기타 특이사항을 적어주세요."></textarea>
                    </div>
                    <div class="point">
                        <label>포인트</label>
                        <input type="text">
                        <button type="button">사용</button>
                        <p>1500P 사용가능</p>
                    </div>
                    <div class="cal">
                        <p>노쇼방지를 위해 예약금 20,000원을 받고 있습니다.</p>
                        <button type="button">휴대폰</button>
                        <button type="button">무통장입금</button>
                    </div>
                    <div class="price">
                        <label for="small">소형견</label><input id="small" type="radio" name="size" value="1">
                        <label for="middle">중형견</label><input id="middle" type="radio" name="size" value="2">
                        <label for="big">대형견</label><input id="big" type="radio" name="size" value="3">
                        <table border="1">
                            <!-- 소형견 -->
                            <tr>
                                <th colspan="7" class="eNonBorder">소형견(말티즈, 요크셔, 시츄, 푸들 등...)</th>
                            </tr>
                            <tr>
                                <th>몸무게</th>
                                <th>목욕</th>
                                <th>부분</th>
                                <th>목욕+부분</th>
                                <th>얼굴+부분+목욕</th>
                                <th colspan="2">기본전체미용</th>
                            </tr>
                            <tr>
                                <th>2kg이하</th>
                                <td><button type="button">12,000</button></td>
                                <td><button type="button">12,000</button></td>
                                <td><button type="button">15,000</button></td>
                                <td><button type="button">20,000</button></td>
                                <td colspan="2"><button type="button">25,000</button></td>
                            </tr>
                            <tr>
                                <th>2kg~5kg</th>
                                <td><button type="button">15,000</button></td>
                                <td><button type="button">15,000</button></td>
                                <td><button type="button">20,000</button></td>
                                <td><button type="button">25,000</button></td>
                                <td colspan="2"><button type="button">30,000</button></td>
                            </tr>
                            <tr>
                                <th>5kg~8kg</th>
                                <td><button type="button">20,000</button></td>
                                <td><button type="button">25,000</button></td>
                                <td><button type="button">25,000</button></td>
                                <td><button type="button">30,000</button></td>
                                <td colspan="2"><button type="button">35,000</button></td>
                            </tr>
                            <tr>
                                <th>8kg~10kg</th>
                                <td><button type="button">25,000</button></td>
                                <td><button type="button">25,000</button></td>
                                <td><button type="button">30,000</button></td>
                                <td><button type="button">35,000</button></td>
                                <td colspan="2"><button type="button">40,000</button></td>
                            </tr>
                            <!-- 중형견 -->
                            <tr>
                                <th colspan="7" class="eNonBorder">중형견(슈나, 코카 등...)</th>
                            </tr>
                            <tr>
                                <th>5kg이하</th>
                                <td>20,000</td>
                                <td>20,000</td>
                                <td>25,000</td>
                                <td>30,000</td>
                                <td colspan="2">35,000</td>
                            </tr>
                            <tr>
                                <th>5kg~8kg</th>
                                <td>25,000</td>
                                <td>25,000</td>
                                <td>30,000</td>
                                <td>35,000</td>
                                <td colspan="2">40,000</td>
                            </tr>
                            <tr>
                                <th>8kg~10kg</th>
                                <td>30,000</td>
                                <td>30,000</td>
                                <td>35,000</td>
                                <td>40,000</td>
                                <td colspan="2">45,000</td>
                            </tr>
                            <tr>
                                <th>10kg~12kg</th>
                                <td>35,000</td>
                                <td>35,000</td>
                                <td>40,000</td>
                                <td>45,000</td>
                                <td colspan="2">50,000</td>
                            </tr>
                            <tr>
                                <th>12kg이상</th>
                                <td colspan="6">초과 1kg당 5,000원 추가</td>

                            </tr>
                            <!-- 특수견 -->
                            <tr>
                                <th colspan="7" class="eNonBorder">특수견(비숑. 베들링턴 등...)</th>
                            </tr>
                            <tr>
                                <th>몸무게</th>
                                <th>목욕</th>
                                <th>부분</th>
                                <th>목욕+부분</th>
                                <th>얼굴+부분+목욕</th>
                                <th>스포팅</th>
                                <th>가위컷</th>
                            </tr>
                            <tr>
                                <th>5kg이하</th>
                                <td>20,000</td>
                                <td>20,000</td>
                                <td>25,000</td>
                                <td>30,000</td>
                                <td>35,000</td>
                                <td>60,000</td>
                            </tr>
                            <tr>
                                <th>5kg~8kg</th>
                                <td>25,000</td>
                                <td>25,000</td>
                                <td>30,000</td>
                                <td>35,000</td>
                                <td>40,000</td>
                                <td>60,000</td>
                            </tr>
                            <tr>
                                <th>8kg이상</th>
                                <td>30,000</td>
                                <td>30,000</td>
                                <td>35,000</td>
                                <td>40,000</td>
                                <td>45,000</td>
                                <td>60,000</td>
                            </tr>
                            <!-- 추가요금 -->
                            <tr>
                                <th colspan="7">&nbsp;</th>
                            </tr>
                            <tr>
                                <th rowspan="4" class="eNonBorder2">추가요금</th>
                                <th>가위컷</th>
                                <td>25,000</td>
                                <th>특수얼굴컷</th>
                                <td colspan="3">5,000</td>
                            </tr>
                            <tr>
                                <th>엉킴</th>
                                <td>5,000</td>
                                <th>투톤 염색</th>
                                <td colspan="3">10,000</td>
                            </tr>
                            <tr>
                                <th>기장</th>
                                <td>5,000</td>
                                <th>염색</th>
                                <td colspan="3">5,000</td>
                            </tr>
                        </table>

                    </div>
                    <div class="expectPrice">
                        <p>예상가격 30,000원</p>
                    </div>
                    <div class="notice">
                        안내문어쩌구저쩌구
                    </div>
                    <div class="signBox">
                        <label>전자서명</label>
                        <div class="sign"></div>
                    </div>
                </form>
                <div  >
                    <button type="submit">예약</button>
                </div>
            </div>
        </div>


        <AppFooter />
    </div><!-- wrap -->
</template>

<script>
import AppFooter from "@/components/AppFooter.vue"
import AppHeader from "@/components/AppHeader.vue"

import '@/assets/css/mypage/mypage.css'

import DatePicker from '@/components/DatePicker.vue'




export default {
    name: "ReservationFormView",
    components: {
        AppHeader,
        AppFooter,
        DatePicker

    },
    data() {
        return {
            date:null,
        };
    },
    methods: {

    },
};
</script>