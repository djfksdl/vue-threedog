<template>
    <div id="wrap">
        <div class="headerSideBar">
            <div class="sidebar">
                <div class="profile">
                    <div class="profileImg">
                        <img src="@/assets/images/dog2.jpg">
                    </div>
                    <div class="profileId">
                        <label>dddddd</label> 님 <br>
                        <label>1500</label> P
                    </div>
                </div>
                <div class="profileTitle">
                    <p>반려견</p>
                    <button type="button">+</button>
                </div>
                <div class="profilePet">
                    <img src="@/assets/images/dog.jpg">
                    <p>마리(3세)</p>
                </div>
                <div class="profilePet">
                    <img src="@/assets/images/dog.jpg">
                    <p>마리(3세)</p>
                </div>
            </div>
            <div>
                <AppHeader />
                <div id="">
                    <div class="container">
                        <form>
                            <div>
                                <h2>📅날짜와 시간을 선택해주세요</h2>
                                <div>
                                    달력놓는자리
                                </div>
                                <div>
                                    시간선택자리
                                </div>
                            </div>
                            <div>
                                <label>반려견 선택</label>
                                <button type="button">코코</button>
                                <button type="button">구름이</button>
                            </div>
                            <div>
                                <label>몸무게</label>
                                <p>3.2kg</p>
                            </div>
                            <div>
                                <button type="button">1</button>
                                <button type="button">2</button>
                                <button type="button">3</button>
                                <button type="button">4</button>
                                <input type="range">
                                <textarea placeholder="기타 특이사항을 적어주세요."></textarea>
                            </div>
                            <div>
                                <label>포인트</label>
                                <button type="button">사용</button>
                                <p>1500P 사용가능</p>
                            </div>
                            <p>노쇼방지를 위해 예약금 20,000원을 받고 있습니다.</p>
                            <button type="button">휴대폰</button>
                            <button type="button">무통장입금</button>
                            <div>
                                <label>소형견</label><input type="radio">
                                <label>중형견</label><input type="radio">
                                <label>대형견</label><input type="radio">
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
                            <div>
                                <p>예상가격 30,000원</p>
                            </div>
                            <div>
                                안내문어쩌구저쩌구
                            </div>
                            <div>
                                전자서명
                            </div>
                            
                        </form>
                        <button>예약</button>

                    </div>
                </div>
            </div>
        </div>


        <AppFooter />
    </div><!-- wrap -->
</template>

<script>
import AppFooter from "@/components/AppFooter.vue"
import AppHeader from "@/components/AppHeader.vue"
export default {
    name: "ReservationFormView",
    components: {
        AppHeader,
        AppFooter,
    },
    data() {
        return {

        };
    },
    methods: {

    },
};
</script>