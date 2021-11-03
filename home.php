<form>
	<div class="row 50%">
		<div class="4u 6u(mobilep)">
			<div class="12u">기간<br>
				<select id="season">
					<option value="전체">전체</option>
					<option value="봄">봄</option>
					<option value="여름">여름</option>
					<option value="가을">가을</option>
					<option value="겨울">겨울</option>
				</select>
			</div>
		</div>
		<div class="4u 6u(mobilep)">
			<div class="12u">연령<br>
				<select id="age">
					<option value="전체">전체</option>
					<option value="10">10대</option>
					<option value="20">20대</option>
					<option value="30">30대</option>
					<option value="40">40대</option>
					<option value="50">50대</option>
					<option value="60">60대</option>
				</select>
			</div>
		</div>
		<div class="4u 12u(mobilep)">
			<div class="12u">기념일<br>
				<select id="anniversary">
					<option value="전체">전체</option>
					<option value="n일 기념일">n일 기념일</option>
					<option value="n주년 기념일">n주년 기념일</option>
					<option value="결혼 기념일">결혼 기념일</option>
					<option value="생일">생일</option>
					<option value="프로포즈">프로포즈</option>
					<option value="발렌타인 데이">발렌타인 데이</option>
					<option value="화이트 데이">화이트 데이</option>
					<option value="빼빼로 데이">빼빼로 데이</option>
					<option value="크리스마스">크리스마스</option>
					<option value="기타">기타</option>
				</select>
			</div>
		</div>
		<div class="4u 12u(mobilep)">
			<div class="12u">지역<br>
				<input list="addr" id="location" placeholder="전체">
				<datalist id="addr">
					<option value="서울">
					<option value="부산">
					<option value="인천">
					<option value="대구">
					<option value="대전">
					<option value="광주">
					<option value="울산">
					<option value="수원">
					<option value="창원">
					<option value="고양">
					<option value="성남">
					<option value="부천">
					<option value="청주">
					<option value="안산">
					<option value="전주">
					<option value="천안">
					<option value="남양주">
					<option value="화성">
					<option value="안양">
					<option value="김해">
					<option value="포항">
					<option value="평택">
					<option value="제주">
					<option value="시흥">
					<option value="구미">
					<option value="파주">
					<option value="김포">
					<option value="진주">
					<option value="광명">
					<option value="원주">
					<option value="아산">
					<option value="광주">
					<option value="익산">
					<option value="양산">
					<option value="군포">
					<option value="춘천">
					<option value="경산">
					<option value="군산">
					<option value="여수">
					<option value="순천">
					<option value="경주">
					<option value="거제">
					<option value="목포">
					<option value="강릉">
					<option value="오산">
					<option value="충주">
					<option value="이천">
					<option value="양주">
					<option value="세종">
					<option value="안성">
					<option value="구리">
					<option value="서산">
					<option value="안동">
					<option value="당진">
					<option value="포천">
					<option value="의왕">
					<option value="하남">
					<option value="서귀포">
					<option value="광양">
					<option value="김천">
					<option value="통영">
					<option value="제천">
					<option value="논산">
					<option value="공주">
					<option value="사천">
					<option value="정읍">
					<option value="여주">
					<option value="영주">
					<option value="밀양">
					<option value="보령">
					<option value="상주">
					<option value="영천">
					<option value="동두천">
					<option value="나주">
					<option value="동해">
					<option value="김제">
					<option value="남원">
					<option value="속초">
					<option value="문경">
					<option value="삼척">
					<option value="과천">
					<option value="태백">
					<option value="계룡">
				</datalist>
			</div>
		</div>
		<div class="4u 12u(mobilep)">
			<div class="12u">비용(단위:만원)<br>
				<input type="range" id="price" value="100" min="0" max="100" step="1" onInput="rangeout.value=this.value">
				<output name="rangeout" for="range"></output>
			</div>
		</div>
		<div class="4u">
			<ul>
				<li>
					<input type="button" class="button alt" id="search" value="검색">
				</li>
			</ul>
		</div>
	</div>
</form>
<div class="12u" id="contents"></div>
<div class="12u" id="comment"></div>
<div class="12u" id="subtitle">인기글</div>
<div class="12u" id="postlist"></div>
<script>
$(document).ready(function() {
	$.post("post_list.php",function(data) {
		$("#postlist").html(data); // 게시글 list를 불러옴
	});
	$("#search").click(function() {
		$("#contents").empty();
		$("#comment").empty();
		$.post("post_list.php",{ // post로 form의 데이터를 보낸다
			season:$("#season").val(),
			age:$("#age").val(),
			anniversary:$("#anniversary").val(),
			location:$("#location").val(),
			price:$("#price").val()},
			function(data) {
				$("#subtitle").text("검색 결과");
				$("#postlist").html(data); // 게시글 list를 불러옴
		});
	});
});
function Page(no) {
	$.post("post_list.php",{
		season:$("#season").val(),
		age:$("#age").val(),
		anniversary:$("#anniversary").val(),
		location:$("#location").val(),
		price:$("#price").val(),
		page:no},
		function(data) {
			$("#postlist").html(data);
	});
}
</script>
