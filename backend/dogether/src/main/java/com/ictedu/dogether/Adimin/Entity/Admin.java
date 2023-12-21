package com.ictedu.dogether.Adimin.Entity;

import com.ictedu.dogether.adoptContract.Entity.AdoptContract;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Admin {


    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    @Column(name = "admin_id")
    private String adminId; //상태 아이디



    // 관리자가 처리한 입양 신청서들과의 관계
    @OneToMany(mappedBy = "admin")
    private List<AdoptContract> adoptContracts;












}
