SRC_FILE=index.adoc
PDF_STYLE_FILE=alexa_style.yml
FONTS_DIR=fonts
STYLE_DIR=style
DIST_DIR=dist
SRC_DIR=src
PDF_FILE=Alexa_HOT4Beginners_TextBook.pdf
PRINT_FILE=Alexa_HOT4Beginners_TextBook_for_Printing.pdf
EPUB_FILE=Alexa_HOT4Beginners_TextBook.epub
REDPEN_CONF=redpen-conf.xml
S3_BUCKET=alexatrainingassets
AWS_PROFILE=default

.PHONY: all
all: html pdf print samples s3

html: *.adoc
		asciidoctor $(SRC_FILE)

pdf: *.adoc
		asciidoctor-pdf $(SRC_FILE) -a pdf-style=./$(STYLE_DIR)/$(PDF_STYLE_FILE) -a pdf-fontsdir=$(FONTS_DIR) -r ./$(STYLE_DIR)/rouge_custom.rb -r asciidoctor-pdf-cjk  -o $(DIST_DIR)/$(PDF_FILE)

print: *.adoc
		asciidoctor-pdf $(SRC_FILE) -a pdf-style=./$(STYLE_DIR)/$(PDF_STYLE_FILE) -a pdf-fontsdir=$(FONTS_DIR) -a media=print -r ./$(STYLE_DIR)/rouge_custom.rb -r asciidoctor-pdf-cjk  -o $(DIST_DIR)/$(PRINT_FILE)

epub3: *.adoc
		asciidoctor-epub3 $(SRC_FILE) -o $(DIST_DIR)/$(EPUB_FILE)

samples: $(SRC_DIR)/UTF-8
	mkdir -p $(SRC_DIR)/SJIS 2>/dev/null
	cp $(SRC_DIR)/UTF-8/* $(SRC_DIR)/SJIS/
	nkf -sLw --overwrite $(SRC_DIR)/SJIS/*
	zip -r $(DIST_DIR)/SampleCodes_BGN.zip $(SRC_DIR) -x "*.DS_Store"
	rm -r $(SRC_DIR)/SJIS

s3: $(DIST_DIR)
	aws s3 sync $(DIST_DIR) s3://${S3_BUCKET}/handsontraining/2018/ --include "*" --exclude "*.DS_Store" --exact-timestamps --acl public-read --cache-control "max-age=3600" --profile=${AWS_PROFILE}


redpen: *.adoc
	redpen -c $(REDPEN_CONF) *.adoc

clean:
	rm $(DIST_DIR)/*
	rm index.html