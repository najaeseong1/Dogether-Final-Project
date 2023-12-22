package com.ictedu.dogether.adoptApi.WishDto.response;

import com.ictedu.dogether.adoptApi.Entity.Wish;
import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WishRegisterResponseDTO {


    private int wishNo;

    private String userId;

    private String desertionNo;


    public WishRegisterResponseDTO(Wish wish) {
        this.wishNo = wish.getWishNo();
        this.userId = wish.getUser().getUserId();
        this.desertionNo = wish.getAdopt().getDesertionNo();

    }
}
