package com.ictedu.dogether.Board.dto.page;

import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@Builder
public class Page {

    private int pageNo; //클라이언트가 보낸 페이지 번호
    private int amount; //한 페이지에 보여질 게시물 수

    //검색 요청에 필요한 필드 추가!
    private String keyword, condition; //검색 안하면 null값이 들어있음

    public Page() { //기본 생성자 생성
        this.pageNo = 1;
        this.amount = 10; //디폴트 값임
        //사용자가 처음 들어왔을 때 pageNo과 amount를 줄수 없기에!


    }


    public void setPageNo(int pageNo) {
        if(pageNo < 1 || pageNo > Integer.MAX_VALUE) {//int가 허용하는 가장 큰 값
            this.pageNo = 1;
            return;
        }
        this.pageNo = pageNo;
    }

    public void setAmount(int amount) {
        if(amount < 10 || amount > 30 || (amount % 10 != 0)) {
            this.amount = 10;
            return;
        }
        this.amount = amount;
    }

    public int getPageStart() { //sql문에 쓰일 메서드 !
      /*
       pageNo : 1-> return 0
       pageNo : 2 -> return 10
       pageNo : 3 -> return 20
       pageNo : 4 -> return 30
       */
        return (pageNo-1)*amount;
    }


    public int getPageEnd() {
        return pageNo * amount;
    }


}