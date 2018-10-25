# Alexa ハンズオントレーニング 演習テキストとサンプルコード

## Makefile

配布用のAlexa ハンズオントレーニング用テキストPDFと、サンプルコードZIPファイルをビルドするためのZIPファイル
`make`だけで、Alexa_HandOnTraining_TextBook.pdf と SampleCodes.zip、及びHTML参照用の index.html を生成します。

* `make pdf` は Alexa_HandOnTraining_TextBook.pdf を出力します。
* `make html` は index.html を出力します。
* `make samples` は SampleCodes.zip を出力します。SampleCodes.zip の中にはUTF-8のコードからSJIS用のコードを自動生成して収録します。
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

「課題1」のasciidocファイル

## EX2.adoc

「課題2」のasciidocファイル

## EX3.adoc

「課題3」のasciidocファイル

## EX4.adoc

「課題4」のasciidocファイル

## Sample_Codes.adoc

サンプルコードのasciidocファイル。srcディレクトリ内の UTF-8/xxx.js ファイルを直接読み込んでいる。

## References.adoc

リファレンスのasciidocファイル

## src

サンプルコードが格納されている。Node.jsのコードと対話モデルのJSONコードがあるが、テキストで読み込んでいるのはNode.jsコードのみ。
ソースコードはUTF-8で書かれているが、Windows環境の受講者ようにSJISファイルも用意する必要がある。`make samples`では、自動的にSJISフォルダを生成し、UTF-8フォルダに格納されているコードを全て`nkf`でSJISに変換したものをZIPファイル内に格納している。ZIPファイルが作成されるとSJISフォルダは削除される。最終的に配布用のサンプルコード SampleCodes.zip は distフォルダに作成される。

## fonts

TTFフォントが格納されている。デフォルトでは Noto Sans を使っている。
Noto Sansの濁点の位置が気に入らないので、GenShinGothicフォントを使いたかったが、なぜかGenShinGothicだと、インラインの画像表示（アイコンなど）が二重に表示されてしまうバグがあるようなので断念。調査中。

## dist

最新の出力PDFとサンプルコードのZIPファイルが格納される。通常これらのファイルをS3においてダウンロードしてもらう。

## images

ドキュメントで使用する画像ファイルが格納されている。
