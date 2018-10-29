# Alexa ハンズオントレーニング 演習テキストとサンプルコード

## Makefile

配布用のAlexa ハンズオントレーニング用テキストPDFと、サンプルコードZIPファイルをビルドするためのZIPファイル
`make`だけで、画面表示用のPDF「AlexaBasicTextBook.pdf」、印刷用のPDF「AlexaBasicTextBook_Print.pdf」、ダウンロード用のサンプルコードパッケージ「Alexa_SampleCode_Basic.zip」を生成します。

* `make pdf` は Alexa_HandOnTraining_TextBook.pdf を出力します。
* `make html` は index.html を出力します。
* `make sample` は Alexa_SampleCode_Basic.zip を出力します。
* `make s3` は *dist* フォルダー内に生成された出力PDFとサンプルコードを S3 にアップロードし公開します。
* `make claen` で作成した出力ファイルを削除します。

## style/alexa_style.yml

asciidoctor-pdf が PDF を出力する際のスタイル設定ファイル

## index.adoc

メインのasciidocファイル。内容は全体の初期設定とChapter毎に分けられたファイルをインクルードしているだけ。

## index.html

ascoiidoctor が index.adoc をHTML変換した出力ファイル。このまま使える。

## Introduction.adoc

「はじめに」の章が書かれたasciidocファイル

## EX1.adoc

「実習1」のasciidocファイル

## EX2.adoc

「実習2」のasciidocファイル

## EX3.adoc

「実習3」のasciidocファイル

## EX4.adoc

「実習4」のasciidocファイル

## References.adoc

リファレンスのasciidocファイル

## src

サンプルコードがASK CLIのフォルダツリーで格納されている。
`lambda/custom` 配下のサブMakefileで、最新の ask-sdk-core パッケージをダウンロードし、デプロイ用zip ファイル Coffeeshop.zip を生成し dist フォルダーにコピーしている。

## fonts

TTFフォントが格納されている。デフォルトでは Noto Sans を使っている。
Noto Sansの濁点の位置が気に入らないので、GenShinGothicフォントを使いたかったが、なぜかGenShinGothicだと、インラインの画像表示（アイコンなど）が二重に表示されてしまうバグがあるようなので断念。調査中。

## dist

最新の出力PDFとサンプルコードのZIPファイルが格納される。通常これらのファイルをS3においてダウンロードしてもらう。

## images

ドキュメントで使用する画像ファイルが格納されている。
