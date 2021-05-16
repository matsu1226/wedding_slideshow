'use strict'

{
    const images = [
        './SlideShowImgs/dress (1).jpg',
        './SlideShowImgs/dress (2).jpg',
        './SlideShowImgs/dress (3).jpg',
        './SlideShowImgs/dress (4).jpg',
        './SlideShowImgs/dress (5).jpg',
        './SlideShowImgs/dress (6).jpg',
        './SlideShowImgs/dress (7).jpg',
        './SlideShowImgs/dress (8).jpg',
        './SlideShowImgs/dress (9).jpg',
        './SlideShowImgs/dress (10).jpg',
        './SlideShowImgs/dress (11).jpg',
        './SlideShowImgs/dress_vertical (1).jpg',
        './SlideShowImgs/dress_vertical (2).jpg',
        './SlideShowImgs/dress_vertical (3).jpg',
        './SlideShowImgs/dress_vertical (4).jpg',
        './SlideShowImgs/dress_vertical (5).jpg',
        './SlideShowImgs/dress_vertical (6).jpg',
        './SlideShowImgs/dress_vertical (7).jpg',
        './SlideShowImgs/ja (1).jpg',
        './SlideShowImgs/ja (2).jpg',
        './SlideShowImgs/ja (3).jpg',
        './SlideShowImgs/ja (4).jpg',
        './SlideShowImgs/ja (5).jpg',
        './SlideShowImgs/ja (6).jpg',
        './SlideShowImgs/ja (7).jpg',
        './SlideShowImgs/ja (8).jpg',
        './SlideShowImgs/ja (9).jpg',
        './SlideShowImgs/ja (10).jpg',
        './SlideShowImgs/ja (11).jpg',
        './SlideShowImgs/ja (12).jpg',
        './SlideShowImgs/ja (13).jpg',
        './SlideShowImgs/ja_vertical (1).jpg',
        './SlideShowImgs/ja_vertical (2).jpg',
        './SlideShowImgs/ja_vertical (3).jpg',
        './SlideShowImgs/ja_vertical (4).jpg',
        './SlideShowImgs/ja_vertical (5).jpg',
        './SlideShowImgs/ja_vertical (6).jpg',
        './SlideShowImgs/ja_vertical (7).jpg',
        './SlideShowImgs/ja_vertical (8).jpg',
    ]
    //現在表示されている画像のindex
    let currentIndex = 0;

    const mainImg = document.getElementById('main');


    //main画像の表示
    mainImg.src = images[currentIndex];


    //サムネイルの表示
    images.forEach((image, index) => {    //images配列の各要素に処理を行う ※forEachの第２引数は第２引数のindexを指す
        const img = document.createElement('img');  //img要素の生成を宣言する定数
        img.src = image;    //img要素のsrcをimages配列から生成

        const li = document.createElement('li');    //li要素の生成を宣言する定数

        if (index === currentIndex) {     //imageのindexが現在表示されている画像のindexと等しければ、
            li.classList.add('current')     //そのliにcurrentクラス（opacity:1）を付与
        }

        //サムネイル画像をクリックしたときのイベント記述
        li.addEventListener('click', () => {    //サムネイル画像をクリックしたら、
            mainImg.src = image;    //メイン画像をそのimageに変える

            //以下で、サムネイルのcurrentクラスの付け替えを実施
            const thumbnails = document.querySelectorAll('.thumbnails > li');   //thumbnails配下のli要素全てをthumbnails配列に格納
            thumbnails[currentIndex].classList.remove('current');   //thumbnails配列の画像のうち現在メイン表示されているのと同じ画像（currentがついているはず）のcurrentを外す
            currentIndex = index;                                   //クリックしたサムネイル画像のインデックスをメイン表示のインデックスと同じにする
            thumbnails[currentIndex].classList.add('current');  //そのindexのサムネイルにcurrentを付与する
        })

        li.appendChild(img);    //li要素の子要素にimg要素を。
        document.querySelector('.thumbnails').appendChild(li);     //thumbnails要素の子要素にli要素を。
    })


    //nextをクリックしたときのイベント記述
    const next = document.getElementById('next');
    next.addEventListener('click', () => {
        let target = currentIndex + 1;   //currentIndexの次の画像indexを定数targetとして宣言
        if (target === images.length) {     //サムネイルの最後までいったら、最初に戻す
            target = 0;
        }

        document.querySelectorAll('.thumbnails > li')[target].click();  //target番目のサムネイル画像を表示、elm.click() => elmをクリックしたとみなした処理を行う
    })

    //prevをクリックしたときのイベント記述
    const prev = document.getElementById('prev');
    prev.addEventListener('click', () => {
        let target = currentIndex - 1;   //currentIndexの前の画像indexを定数targetとして宣言
        if (target < 0) {
            target = images.length - 1;
        }

        document.querySelectorAll('.thumbnails > li')[target].click();  //target番目のサムネイル画像を表示、elm.click() => elmをクリックしたとみなした処理を行う
    })

    let timeoutId;

    //スライドショーを動作する関数を定義
    function playSlideshow(){
        timeoutId = setTimeout(()=>{    //この関数自体を2s毎に実行
            next.click();       //次の画像へ
            playSlideshow();
        },2500)
    }

let isPlaying = false;  //スライドショーが動作中かを確認する変数（play - pauseボタンの切り替え等）

    //playをクリックしたときのイベント記述
    const play = document.getElementById('play');
    play.addEventListener('click', () => {
        if(isPlaying === false){    //スライドショーが動作中でない場合、
            playSlideshow();
            play.textContent = 'Pause';
            play.classList.add('isPlaying');
        }else{                      //スライドショーが動作の場合、
            clearTimeout(timeoutId);    //スライドショー（setTimeout）を停止
            play.textContent = 'Play';
            play.classList.remove('isPlaying');
        }

        isPlaying = !isPlaying;
    })

}