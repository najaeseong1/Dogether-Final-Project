import Swal from 'sweetalert2';

//경고 alert
export const WarningAlert = (warning_text, footer, title) => {
  Swal.fire({
    title: title,
    text: warning_text,
    icon: 'warning',
    confirmButtonColor: '#FE7968',
    footer: footer,
  });
};

export const WarningAlert2 = (html_text, footer, title) => {
  Swal.fire({
    title: title,
    html: html_text,
    icon: 'warning',
    confirmButtonColor: '#FE7968',
    footer: footer,
  });
};

//성공 alert
export const SuccessAlert = (success_text) => {
  Swal.fire({
    text: success_text,
    icon: 'success',
    confirmButtonColor: '#e89b93',
  });
};

//성공 alert (줄바꿈가능)
export const SuccessAlert2 = (html_text) => {
  Swal.fire({
    html: html_text,
    icon: 'success',
    confirmButtonColor: '#e89b93',
  });
};

//에러 alert
export const ErrorAlert = (error_text, position_text) => {
  Swal.fire({
    text: error_text,
    position: position_text,
    icon: 'error',
    confirmButtonColor: '#e89b93',
    confirmButtonBorder: 'none',
  });
};
//에러 alert (줄바꿈가능)
export const ErrorAlert2 = (html_text) => {
  Swal.fire({
    html: html_text,
    // text: error_text,
    // position: position_text,
    // customClass: 'swal-font',
    icon: 'error',
    confirmButtonColor: '#FE7968',
  });
};
// 이미지 추가 로그아웃 alert
export const ImageSuccessAlert = (html_text, image) => {
  Swal.fire({
    // title: html_text,
    html: html_text,
    imageUrl: image,
    imageWidth: 150,
    imageHeight: 150,
    imageAlt: 'Custom image',
    confirmButtonColor: '#FE7968',
    customClass: 'swal-font',
  });
};

// 신중한 선택 버튼
export const a = () => {
  Swal.fire({
    title: '입양을 신청하시면 되돌릴 수 없습니다',
    text: '신중하게 선택해주세요:)',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: '승인',
    cancelButtonText: '취소',
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        '입양신청이 완료되었습니다.',
        '임보자님의 연락을 기다려주세요!',
        'success'
      );
    }
  });
};

// 관리자 페이지에서 거절 누르면 뜨는 창
export const rejectedAdoption = () => {
  Swal.fire({
    title: '입양 거절',
    input: 'textarea',
    inputLabel: '거절 이유를 입력하세요',
    inputPlaceholder: '거절 이유를 자세히 적어주세요...',
    showCancelButton: true,
    confirmButtonText: '입력 완료',
    cancelButtonText: '취소',
    inputValidator: (value) => {
      // 거절 이유가 입력되었는지 확인
      if (!value) {
        return '거절 이유를 입력해야 합니다!';
      }
    },
  }).then((result) => {
    if (result.isConfirmed) {
      const rejectionReason = result.value;
      // 여기서 거절 이유를 서버로 보내거나 처리할 수 있습니다.
      console.log('거절 이유:', rejectionReason);
      Swal.fire(
        '입양이 거절되었습니다!',
        '거절 이유: ' + rejectionReason,
        'success'
      );
    }
  });
};

// 입양 승인하였을 때 confirm
export const approvedAdoption = () => {
  const result = Swal.fire({
    title: '입양신청을 승인하시겠습니까?',
    showCancelButton: true,
    confirmButtonText: '승인',
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire('입양이 승인되었습니다!', '', 'success');
    }
  });
};
