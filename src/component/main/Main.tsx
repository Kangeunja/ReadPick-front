import React from "react";

const Main = () => {
  return (
    <>
      <div className="main-img"></div>
      <div className="top-content">
        <div className="content-wrap">
          <div className="keyword">키워드</div>
          <div className="text-wrap">
            <p>키워드별로 찾아볼수 있습니다.</p>
            <p>#디자인</p>
          </div>
        </div>
      </div>
      <div className="book-content">
        <div className="today-wrap">
          <div className="book-icon"></div>
          <p className="book-text">오늘의 책</p>
        </div>
        <div className="sub-text">
          <span>Read Pick</span> 이 추천하는 오늘의 책을 만나보세요!
        </div>
        <div className="book-img"></div>
      </div>
      <div className="center-content">
        <div className="center-wrap">
          <div className="center-text">
            차별화된 도서 리뷰 시스템, <br />
            지금 바로 만나보세요!
          </div>
          <p>책의 간단한 줄거리와 리뷰를 통해 취향껏 만나볼수 있습니다.</p>
        </div>
        <div className="center-sub-content">
          <div className="center-left-wrap">
            <div className="center-book"></div>
            <div className="center-title-wrap">
              <p className="center-title">책제목</p>
              <div className="center-icon-wrap">
                <div className="bottom-icons icon-good"></div>
                <div className="bottom-icons icon-like"></div>
              </div>
            </div>
            <p>저자</p>
          </div>
          <div className="center-right-wrap">
            <p>
              책의 간단한 줄거리 책의 간단한 줄거리책의 간단한 줄거리책의 간단한
              줄거리 책의 간단한 줄거리 <br />
              책의 간단한 줄거리 책의 간단한 줄거리책의 간단한 줄거리책의 간단한
              줄거리 책의 간단한 줄거리 <br />
              책의 간단한 줄거리 책의 간단한 줄거리책의 간단한 줄거리책의 간단한
              줄거리 책의 간단한 줄거리 <br />
              책의 간단한 줄거리 책의 간단한 줄거리책의 간단한 줄거리책의 간단한
              줄거리 책의 간단한 줄거리 <br />
            </p>
            <div className="center-right-title">이 책을 읽은 사람들의 리뷰</div>
            <div className="center-right-box">
              <div className="center-right-p"></div>
              <div className="center-right-text">
                <p>아이디</p>
                <p>#직종 #학생</p>
                <p>
                  리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰
                  <br />
                  리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰
                  <br />
                  리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰
                  <br />
                </p>
              </div>
            </div>

            <div className="center-right-box">
              <div className="center-right-p"></div>
              <div className="center-right-text">
                <p>아이디</p>
                <p>#직종 #학생</p>
                <p>
                  리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰
                  <br />
                  리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰
                  <br />
                  리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰
                  <br />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-content">
        <div className="bottom-sub-content">
          <div className="bottom-left-wrap">
            <div className="bottom-title-wrap">
              <div className="bottom-left-icon"></div>
              <div className="bottom-left-title">찜기능</div>
            </div>
            <div className="bottom-left-text">
              책의 리뷰와 줄거리를 통해
              <br />
              맘에 들면 저장할수 있습니다.
            </div>
          </div>
          <div className="bottom-right-wrap">
            <div className="bottom-book"></div>
            <div className="bottom-book-wrap">
              <p className="bottom-title">책제목</p>
              <p>저자</p>
            </div>
            <div className="icon-like-color"></div>
            <div className="icon-pointer"></div>
          </div>
        </div>
      </div>
      <div className="user-content">
        <div className="user-title">유저가 선택한 추천책 목록</div>
        <div className="user-book-wrap">
          <div className="user-sub-content">
            <div className="user-book"></div>
            <div className="user-sub-title">책제목</div>
            <p>저자</p>
          </div>
          <div className="user-sub-content">
            <div className="user-book"></div>
            <div className="user-sub-title">책제목</div>
            <p>저자</p>
          </div>
          <div className="user-sub-content">
            <div className="user-book"></div>
            <div className="user-sub-title">책제목</div>
            <p>저자</p>
          </div>
          <div className="user-sub-content">
            <div className="user-book"></div>
            <div className="user-sub-title">책제목</div>
            <p>저자</p>
          </div>
        </div>
        <button type="button" className="add-button">
          추천책 더 보러 가기
        </button>
      </div>
    </>
  );
};

export default Main;
