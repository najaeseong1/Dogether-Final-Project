package com.ictedu.dogether.Board.dto.page;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class PageCreator {

    //한 화면에 배치할 버튼 개수
    private static final int BUTTON_NUM =5;

    //화면 랜더링 시 페이지의 시작값과 끝값.
    private int begin, end ;

    //이전, 다음 버튼 활성화 여부
    private boolean prev, next;

    //현재 요청 페이지 정보
    private Page page; //외부데이터 필요

    //총 게시물 수
    private int articleTotalCount; //외부 데이터 필요

    // 페이징 알고리즘을 수행하기 위해 외부로부터 필요한 데이터 전달받는 생성자!
    public PageCreator(Page page, int articleTotalCount) {
        this.page = page;
        //사용자의 요청 페이지 번호, 한화면의 보여질 게시물 수, 사용자가 입력한 keyword, condition
        this.articleTotalCount = articleTotalCount; //총 게시물 수
        calcDataOfPage(); //전달 완료후 알고리즘 수행하려고 !
    }

    private void calcDataOfPage() {
        //끝 페이지 계산(한 화면에 보여질 끝 버튼 번호 계산임)
        this.end = (int) (Math.ceil(page.getPageNo()/(double)BUTTON_NUM)*BUTTON_NUM);
        //시작 페이지 계산 (한 화면에 보여질 시작 버튼 번호 계산)
        this.begin = (this.end-BUTTON_NUM)+1;

        //이전 버튼의 활성화 여부
        this.prev = begin >1; // begin = 1 -> false 되서 이전버튼 비 활성화

        //다음 버튼의 활성화 여부
        this.next = (articleTotalCount <= (end*page.getAmount()))? false:true;

        if(!this.next) {
            this.end = (int) Math.ceil(articleTotalCount/(double)page.getAmount());
        }
    }



}